/**
 * Encoder for the CSS-only LQIP technique used by nldd-image.
 *
 * Takes an image (File, ImageBitmap, or HTMLImageElement) and returns the
 * 20-bit integer the `lqip` attribute expects. The encoding matches the
 * decoder in image.styles.ts, which follows the scheme from
 * https://leanrada.com/notes/css-only-lqip/:
 *
 *   - Six 2-bit greyscale cells (3×2 grid downsample of the source image)
 *   - One 2-bit luminance + 3-bit a + 3-bit b Oklab base colour (1×1 average)
 *   - Packed into 20 bits, offset by 2^19 so the on-disk integer is signed
 *
 * Bundled with a small `<nldd-lqip-encoder>` element that wraps the function
 * in a file-picker UI. The element is registered for use in our Storybook so
 * consumers can encode their own images without relying on the original
 * leanrada.com tool.
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './image.js';

/* --------------------------------------------------------------------- *
 *  i18n
 * --------------------------------------------------------------------- */

export const nlddLqipEncoderTranslations = {
	'components.lqip-encoder.upload-label': 'Kies een afbeelding',
	'components.lqip-encoder.file-prefix-text': 'Bestand:',
	'components.lqip-encoder.copy-instruction-text': 'Kopieer deze waarde naar je lqip attribuut:',
	'components.lqip-encoder.preview-heading-text': 'Visuele controle:',
	'components.lqip-encoder.preview-lqip-label': 'LQIP placeholder',
	'components.lqip-encoder.preview-image-label': 'Originele afbeelding',
};

export type NLDDLqipEncoderTranslations = typeof nlddLqipEncoderTranslations;

/* --------------------------------------------------------------------- *
 *  Encoder
 *
 *  The math runs in TWO improvements over a naive canvas-based encoder:
 *
 *   1. Linear-light averaging. sRGB pixel values are gamma-encoded, so
 *      averaging them directly under-weights highlights. We convert each
 *      pixel to linear-light (via a 256-entry LUT), average, then map back
 *      to sRGB / Oklab. This matches how a photon-correct downsample would
 *      behave and represents bright local features (e.g. lights against a
 *      dark sky) more faithfully.
 *
 *   2. Manual per-cell sampling. We don't rely on canvas drawImage()
 *      down-resampling — different browsers and platforms use different
 *      kernels (bilinear / bicubic / Lanczos) and would produce different
 *      LQIP integers for the same image. Looping the pixel data ourselves
 *      makes the encoder identical across browser, Node, and any other
 *      runtime that can give us a Uint8ClampedArray of RGBA bytes.
 *
 *  The pure entry point is `encodePixelDataToLqip(data, width, height)`. The
 *  async `encodeLqip(source)` is a browser wrapper that gets pixels via
 *  canvas getImageData and forwards them. Node users can build their own
 *  wrapper using sharp / pngjs / etc. — same pure function, same result.
 * --------------------------------------------------------------------- */

/** sRGB byte (0-255) → linear-light (0-1) lookup table. Precomputed because
 *  large images run this hundreds of thousands of times. */
const SRGB_TO_LINEAR_LUT = new Float32Array(256);
for (let i = 0; i < 256; i++) {
	const n = i / 255;
	SRGB_TO_LINEAR_LUT[i] = n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

/** linear-light (0-1) → sRGB byte (0-255). */
function linearToSrgb(n: number): number {
	const clamped = Math.max(0, Math.min(1, n));
	const v = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
	return Math.round(v * 255);
}

/** Linear-light RGB triplet (0-1 per channel) → Oklab. Same constants as the
 *  spec, but skips the sRGB→linear step since the input is already linear. */
function linearRgbToOklab(rl: number, gl: number, bl: number): { L: number; a: number; b: number } {
	const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
	const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
	const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;
	const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
	return {
		L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
		a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
		b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
	};
}

function clamp(v: number, lo: number, hi: number): number {
	return Math.max(lo, Math.min(hi, v));
}

/** Quantise a chroma value with a small bias *away* from the neutral midpoint
 *  bucket. Round-to-nearest creates a "dead zone" around the midpoint where
 *  any value within half a step gets rounded to neutral grey — visually losing
 *  faint tints (slight blue, slight amber). With this helper, the encoder only
 *  picks the neutral bucket when the input is essentially at it; otherwise we
 *  snap to the adjacent non-neutral bucket so the tint is preserved. */
function quantiseChromaAwayFromMid(value: number, midBucket: number, lo: number, hi: number): number {
	const offset = value - midBucket;
	// Genuinely-neutral threshold: 15% of a quantisation step. Anything inside
	// the threshold snaps to the neutral bucket — this keeps near-neutral
	// images (snow, neutral indoor scenes, B&W photos) from being pushed into
	// a misleading colour cast. Anything outside the threshold snaps to the
	// next bucket in the appropriate direction so genuine tints survive.
	if (Math.abs(offset) < 0.15) return midBucket;
	return offset > 0 ? clamp(Math.ceil(value), lo, hi) : clamp(Math.floor(value), lo, hi);
}

/**
 * Pure LQIP encoder. Operates on a raw RGBA pixel buffer (no DOM, no Node
 * APIs) so the same function can be called from a browser, a Node script,
 * a Worker, or any other runtime. Returns the signed 20-bit integer the
 * CSS decoder expects (range [-524288, 524287]).
 *
 * The buffer layout is the same as ImageData.data: 4 bytes per pixel, in
 * RGBA order, row-major.
 */
export function encodePixelDataToLqip(
	data: Uint8ClampedArray | Uint8Array,
	width: number,
	height: number,
): number {
	if (width < 3 || height < 2) {
		throw new Error(`encodePixelDataToLqip: image must be at least 3×2, got ${width}×${height}`);
	}
	const cells: number[] = [];
	let totalR = 0, totalG = 0, totalB = 0, totalCount = 0;

	// 3 columns × 2 rows. Cell bounds use floor() so a 1200×799 image still
	// partitions cleanly into 6 contiguous regions.
	for (let cellRow = 0; cellRow < 2; cellRow++) {
		const yStart = Math.floor(cellRow * height / 2);
		const yEnd = Math.floor((cellRow + 1) * height / 2);
		for (let cellCol = 0; cellCol < 3; cellCol++) {
			const xStart = Math.floor(cellCol * width / 3);
			const xEnd = Math.floor((cellCol + 1) * width / 3);
			let cellR = 0, cellG = 0, cellB = 0, cellCount = 0;
			for (let y = yStart; y < yEnd; y++) {
				for (let x = xStart; x < xEnd; x++) {
					const i = (y * width + x) * 4;
					cellR += SRGB_TO_LINEAR_LUT[data[i]];
					cellG += SRGB_TO_LINEAR_LUT[data[i + 1]];
					cellB += SRGB_TO_LINEAR_LUT[data[i + 2]];
					cellCount++;
				}
			}
			totalR += cellR; totalG += cellG; totalB += cellB; totalCount += cellCount;

			// Cell quantisation: take linear-light average, convert back to
			// sRGB bytes, then Rec.709 luma. The CSS renders each cell as a
			// hsl(0 0% calc(c/3 * 60% + 20%)) grey, so we mirror that scaling
			// at encode time — c/3 * 60 + 20 covers the [20%, 80%] band.
			const avgR = linearToSrgb(cellR / cellCount);
			const avgG = linearToSrgb(cellG / cellCount);
			const avgB = linearToSrgb(cellB / cellCount);
			const luma = (0.2126 * avgR + 0.7152 * avgG + 0.0722 * avgB) / 255;
			cells.push(clamp(Math.round((luma - 0.2) / 0.6 * 3), 0, 3));
		}
	}

	// Base colour: linear-light average over the WHOLE image (the cell sums
	// already partition every pixel exactly once). Convert to Oklab and
	// quantise L / a / b.
	const lab = linearRgbToOklab(totalR / totalCount, totalG / totalCount, totalB / totalCount);

	// CSS maps the quantised triplet back to:
	//   L: ll/3 * 0.6 + 0.2          → invert: (L - 0.2) / 0.6 * 3
	//   a: aaa/8 * 0.7 - 0.35        → invert: (a + 0.35) / 0.7 * 8 (clamped to 7)
	//   b: (bbb+1)/8 * 0.7 - 0.35    → invert: ((b + 0.35) / 0.7 * 8) - 1 (clamped 0-7)
	const ll = clamp(Math.round((lab.L - 0.2) / 0.6 * 3), 0, 3);
	// For a/b, bias away from the neutral midpoint (aaa=4 / bbb=3 both
	// decode to exactly 0). Round-to-nearest would round subtle chroma to
	// grey within ~half a quantisation step around zero — visually that
	// reads as "this image has no tint" even when the average is genuinely
	// a faint blue / amber. Snap to the nearest *non-neutral* bucket
	// instead unless the input really is dead-on neutral.
	const aaa = quantiseChromaAwayFromMid((lab.a + 0.35) / 0.7 * 8, 4, 0, 7);
	const bbb = quantiseChromaAwayFromMid((lab.b + 0.35) / 0.7 * 8 - 1, 3, 0, 7);

	let packed = 0;
	packed |= cells[0] << 18;
	packed |= cells[1] << 16;
	packed |= cells[2] << 14;
	packed |= cells[3] << 12;
	packed |= cells[4] << 10;
	packed |= cells[5] << 8;
	packed |= ll << 6;
	packed |= aaa << 3;
	packed |= bbb;
	return packed - (1 << 19);
}

/**
 * Browser-friendly wrapper around `encodePixelDataToLqip`. Accepts a File
 * (e.g. from <input type="file">), an HTMLImageElement, or an ImageBitmap;
 * decodes it to pixels via the Canvas API; and forwards to the pure encoder.
 *
 * When passing an HTMLImageElement loaded from a different origin, set
 * `img.crossOrigin = 'anonymous'` BEFORE assigning `src` — otherwise the
 * underlying canvas read taints and throws a SecurityError. Files and
 * same-origin ImageBitmaps are unaffected.
 */
export async function encodeLqip(source: File | HTMLImageElement | ImageBitmap): Promise<number> {
	let bitmap: ImageBitmap;
	if (source instanceof File || source instanceof HTMLImageElement) {
		bitmap = await createImageBitmap(source);
	} else {
		bitmap = source;
	}

	const canvas = document.createElement('canvas');
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('encodeLqip: could not acquire a 2D canvas context');
	ctx.drawImage(bitmap, 0, 0);
	const { data } = ctx.getImageData(0, 0, bitmap.width, bitmap.height);

	return encodePixelDataToLqip(data, bitmap.width, bitmap.height);
}


/* --------------------------------------------------------------------- *
 *  Storybook tool element
 * --------------------------------------------------------------------- */

/**
 * Self-contained UI wrapper around `encodeLqip()` for our Storybook docs.
 * Drop an image, see the computed integer and a live preview using nldd-image.
 *
 * Intentionally NOT exported from `src/components/index.ts` — this is a
 * developer tool, not a design-system component.
 */
@customElement('nldd-lqip-encoder')
export class NLDDLqipEncoder extends LitElement {
	@property({ type: Object })
	translations: Partial<NLDDLqipEncoderTranslations> = {};

	@state() private _lqip: number | null = null;
	@state() private _imageUrl = '';
	@state() private _filename = '';
	@state() private _aspectRatio = '16/9';
	@state() private _error = '';

	public _t(key: keyof NLDDLqipEncoderTranslations): string {
		return this.translations[key] ?? nlddLqipEncoderTranslations[key];
	}

	static override styles = css`
		:host {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-16);
			padding: var(--primitives-space-16);
			border: var(--primitives-border-width-thin) solid var(--semantics-content-secondary-color);
			border-radius: var(--primitives-corner-radius-md);
			background-color: var(--semantics-surfaces-background-color);
			color: var(--semantics-content-color);
			font: var(--primitives-font-body-md-regular-snug);
		}

		.encoder__upload-label {
			display: inline-block;
			padding: var(--primitives-space-8) var(--primitives-space-16);
			border-radius: var(--primitives-corner-radius-md);
			background-color: var(--semantics-buttons-accent-filled-background-color);
			color: var(--semantics-buttons-accent-filled-content-color);
			cursor: pointer;
			font: var(--primitives-font-body-md-regular-snug);
		}

		.encoder__upload-input {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}

		.encoder__result {
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-8);
		}

		.encoder__code {
			padding: var(--primitives-space-8) var(--primitives-space-12);
			border-radius: var(--primitives-corner-radius-sm);
			background-color: var(--semantics-surfaces-tinted-background-color);
			font: var(--primitives-font-monospace-sm-regular-snug);
			user-select: all;
			word-break: break-all;
		}

		.encoder__preview {
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-8);
		}

		.encoder__preview-pair {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: var(--primitives-space-16);
			max-width: calc(var(--primitives-area-480) * 2 + var(--primitives-space-16));
		}

		.encoder__preview-item {
			display: flex;
			flex-direction: column;
			gap: var(--primitives-space-4);
			min-width: 0;
		}

		.encoder__preview-item-label {
			font: var(--primitives-font-body-sm-regular-tight);
			color: var(--semantics-content-secondary-color);
		}

		.encoder__error {
			color: var(--semantics-content-color);
			background-color: var(--semantics-buttons-critical-tinted-background-color);
			padding: var(--primitives-space-8) var(--primitives-space-12);
			border-radius: var(--primitives-corner-radius-sm);
		}
	`;

	private _handleFileChange = async (e: Event): Promise<void> => {
		const input = e.target as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		this._error = '';
		try {
			// Free the previous object URL before allocating a new one.
			if (this._imageUrl) URL.revokeObjectURL(this._imageUrl);
			this._imageUrl = URL.createObjectURL(file);
			this._filename = file.name;
			// Decode once to read dimensions for the comparison preview, then
			// reuse the bitmap for the actual encode so the file isn't decoded
			// twice.
			const bitmap = await createImageBitmap(file);
			this._aspectRatio = `${bitmap.width}/${bitmap.height}`;
			this._lqip = await encodeLqip(bitmap);
			bitmap.close();
		} catch (err) {
			this._error = err instanceof Error ? err.message : String(err);
			this._lqip = null;
		}
	};

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this._imageUrl) URL.revokeObjectURL(this._imageUrl);
	}

	override render() {
		return html`
			<div>
				<label class="encoder__upload-label">
					${this._t('components.lqip-encoder.upload-label')}
					<input class="encoder__upload-input"
						type="file"
						accept="image/*"
						@change=${this._handleFileChange}
					>
				</label>
			</div>
			${this._error ? html`<div class="encoder__error">${this._error}</div>` : ''}
			${this._lqip !== null ? html`
				<div class="encoder__result">
					<div>${this._t('components.lqip-encoder.file-prefix-text')} <strong>${this._filename}</strong></div>
					<div>${this._t('components.lqip-encoder.copy-instruction-text')}</div>
					<div class="encoder__code">lqip="${this._lqip}"</div>
				</div>
				<div class="encoder__preview">
					<div>${this._t('components.lqip-encoder.preview-heading-text')}</div>
					<div class="encoder__preview-pair">
						<div class="encoder__preview-item">
							<nldd-image
								alt=${this._t('components.lqip-encoder.preview-lqip-label')}
								aspect-ratio=${this._aspectRatio}
								lqip=${this._lqip}
							></nldd-image>
							<span class="encoder__preview-item-label">${this._t('components.lqip-encoder.preview-lqip-label')}</span>
						</div>
						<div class="encoder__preview-item">
							<nldd-image
								src=${this._imageUrl}
								alt=${this._filename}
								aspect-ratio=${this._aspectRatio}
								lqip=${this._lqip}
							></nldd-image>
							<span class="encoder__preview-item-label">${this._t('components.lqip-encoder.preview-image-label')}</span>
						</div>
					</div>
				</div>
			` : ''}
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-lqip-encoder': NLDDLqipEncoder;
	}
}

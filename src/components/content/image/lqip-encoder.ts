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
 *  Extends Lean Rada's CSS-only LQIP technique with per-cell colour.
 *  Lean's original format packs 6 × 2-bit greyscale cells + 1 × 8-bit
 *  Oklab base colour into 20 bits, then uses CSS blend modes to fake
 *  multi-colour from a greyscale payload. The cells can only modulate
 *  the base's lightness — there is no actual hue variation across the
 *  placeholder, so a photo with blue sky + warm lights collapses to "a
 *  bit darker / a bit lighter than that one dominant blue".
 *
 *  This encoder gives every cell its own 8-bit Oklab triplet (2 bits L,
 *  3 bits a, 3 bits b) — the same resolution Lean uses for his single
 *  global base — plus an 8-bit base colour for pixels outside the cell
 *  gradients. Total payload: 7 × 8 = 56 bits, serialised as a
 *  comma-separated string "base,c1,c2,c3,c4,c5,c6" (each int 0-255).
 *
 *  Trade-off: wire-incompatible with Lean's reference tool. In exchange
 *  the CSS decoder is simpler (no blend modes), and the placeholder
 *  carries genuine multi-hue information.
 *
 *  Key implementation choices:
 *
 *   1. Per cell: linear-light average → Oklab → findOklabBits. Same
 *      brute-force scaled-Euclidean quantiser used for the base, applied
 *      6 more times.
 *
 *   2. Base colour: histogram-dominant Oklab bucket → findOklabBits.
 *      The base shows through cell-gradient edges and outside the
 *      gradient radii, so it sets the "overall mood" of the placeholder.
 *
 *   3. Linear-light averaging via a 256-entry LUT keeps per-cell mean
 *      colour photonically correct.
 *
 *  Pure entry point: `encodePixelDataToLqip(data, width, height)` →
 *  string. Async `encodeLqip(source)` is a browser wrapper that gets
 *  pixels via canvas getImageData. Node users can build their own
 *  wrapper using sharp / pngjs / etc.
 * --------------------------------------------------------------------- */

/** sRGB byte (0-255) → linear-light (0-1) lookup table. Precomputed because
 *  large images run this hundreds of thousands of times. */
const SRGB_TO_LINEAR_LUT = new Float32Array(256);
for (let i = 0; i < 256; i++) {
	const n = i / 255;
	SRGB_TO_LINEAR_LUT[i] = n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
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

/** Decode an 8-bit base-colour triplet (2 + 3 + 3 bits) back to the Oklab
 *  L/a/b values the CSS decoder will reconstruct. Used both by the brute-force
 *  quantiser below to evaluate candidates and by the cell encoder to know the
 *  base lightness it should subtract. Mirrors Lean's reference implementation
 *  exactly so wire integers are interchangeable with his tool. */
function bitsToLab(ll: number, aaa: number, bbb: number): { L: number; a: number; b: number } {
	return {
		L: (ll / 0b11) * 0.6 + 0.2,
		a: (aaa / 0b1000) * 0.7 - 0.35,
		b: ((bbb + 1) / 0b1000) * 0.7 - 0.35,
	};
}

/** Find the 2 + 3 + 3 bit Oklab triplet whose decoded colour is visually
 *  closest to the target. Brute-forces all 256 combinations because the
 *  search space is tiny and round-to-nearest under-performs near the
 *  quantisation boundaries.
 *
 *  Distance is *scaled* Euclidean: a/b are divided by sqrt(chroma) before
 *  comparison so that vivid targets aren't crushed in favour of nearby
 *  lower-chroma buckets that happen to have a smaller raw delta. Matches
 *  Lean's reference implementation. */
function findOklabBits(targetL: number, targetA: number, targetB: number): { ll: number; aaa: number; bbb: number } {
	const targetChroma = Math.hypot(targetA, targetB);
	const scaledTargetA = targetA / (1e-6 + Math.pow(targetChroma, 0.5));
	const scaledTargetB = targetB / (1e-6 + Math.pow(targetChroma, 0.5));
	let bestBits: [number, number, number] = [0, 0, 0];
	let bestDifference = Infinity;
	for (let lli = 0; lli <= 0b11; lli++) {
		for (let aaai = 0; aaai <= 0b111; aaai++) {
			for (let bbbi = 0; bbbi <= 0b111; bbbi++) {
				const { L, a, b } = bitsToLab(lli, aaai, bbbi);
				const chroma = Math.hypot(a, b);
				const scaledA = a / (1e-6 + Math.pow(chroma, 0.5));
				const scaledB = b / (1e-6 + Math.pow(chroma, 0.5));
				const difference = Math.hypot(L - targetL, scaledA - scaledTargetA, scaledB - scaledTargetB);
				if (difference < bestDifference) {
					bestDifference = difference;
					bestBits = [lli, aaai, bbbi];
				}
			}
		}
	}
	return { ll: bestBits[0], aaa: bestBits[1], bbb: bestBits[2] };
}

/** Find the dominant colour in the image by histogram bucketing in Oklab
 *  space. Quantises every pixel into an 8×8×8 grid (512 buckets), then
 *  returns the linear-RGB mean of the most-populated bucket.
 *
 *  Using "dominant" instead of "average" is what makes the placeholder pick
 *  up the subject's colour (sky blue, foliage green, the pier's amber
 *  lights) rather than collapsing foreground and background into a muddy
 *  midpoint. The bucket grid resolution is intentionally coarse so that
 *  perceptually-similar tones share a bucket — fine quantisation would
 *  scatter near-identical pixels across many tiny buckets and lose the
 *  dominance signal we want. */
function findDominantColor(
	data: Uint8ClampedArray | Uint8Array,
	width: number,
	height: number,
): { rl: number; gl: number; bl: number } {
	const L_BUCKETS = 8, A_BUCKETS = 8, B_BUCKETS = 8;
	const TOTAL = L_BUCKETS * A_BUCKETS * B_BUCKETS;
	const counts = new Uint32Array(TOTAL);
	const sumR = new Float64Array(TOTAL);
	const sumG = new Float64Array(TOTAL);
	const sumB = new Float64Array(TOTAL);
	const pixelCount = width * height;
	for (let p = 0; p < pixelCount; p++) {
		const i = p * 4;
		const rl = SRGB_TO_LINEAR_LUT[data[i]];
		const gl = SRGB_TO_LINEAR_LUT[data[i + 1]];
		const bl = SRGB_TO_LINEAR_LUT[data[i + 2]];
		const { L, a, b } = linearRgbToOklab(rl, gl, bl);
		// L is roughly [0, 1]; a/b for sRGB stay roughly within [-0.4, 0.4].
		const li = clamp(Math.floor(L * L_BUCKETS), 0, L_BUCKETS - 1);
		const ai = clamp(Math.floor((a + 0.4) / 0.8 * A_BUCKETS), 0, A_BUCKETS - 1);
		const bi = clamp(Math.floor((b + 0.4) / 0.8 * B_BUCKETS), 0, B_BUCKETS - 1);
		const idx = li * A_BUCKETS * B_BUCKETS + ai * B_BUCKETS + bi;
		counts[idx]++;
		sumR[idx] += rl;
		sumG[idx] += gl;
		sumB[idx] += bl;
	}
	let bestIdx = 0, bestCount = 0;
	for (let i = 0; i < TOTAL; i++) {
		if (counts[i] > bestCount) {
			bestCount = counts[i];
			bestIdx = i;
		}
	}
	const n = counts[bestIdx];
	return { rl: sumR[bestIdx] / n, gl: sumG[bestIdx] / n, bl: sumB[bestIdx] / n };
}

/** Pack a quantised Oklab triplet into a single byte: 2 bits L (high), 3 bits
 *  a, 3 bits b (low). Matches the format Lean uses for his global base
 *  colour, so the CSS decoder for each cell uses the same maths as Lean's
 *  base decoder — just one byte at a time, seven times. */
function packLab(ll: number, aaa: number, bbb: number): number {
	return (ll << 6) | (aaa << 3) | bbb;
}

/**
 * Pure LQIP encoder. Operates on a raw RGBA pixel buffer (no DOM, no Node
 * APIs) so the same function can be called from a browser, a Node script,
 * a Worker, or any other runtime.
 *
 * Returns a comma-separated string `"base,c1,c2,c3,c4,c5,c6"` where each
 * value is an integer 0-255 packing 2 bits L + 3 bits a + 3 bits b. The
 * `nldd-image` component parses this string into seven CSS variables; its
 * decoder turns each one back into an `oklab()` colour.
 *
 * Buffer layout matches ImageData.data: 4 bytes per pixel in RGBA, row-major.
 *
 * Algorithm:
 *   1. Per cell: linear-light average → Oklab → findOklabBits → packed byte.
 *   2. Base: histogram-dominant linear-RGB → Oklab → findOklabBits → packed
 *      byte. The base shows through cell-gradient transparent edges and
 *      sets the placeholder's overall mood; the cells carry the per-zone
 *      hue variation.
 */
export function encodePixelDataToLqip(
	data: Uint8ClampedArray | Uint8Array,
	width: number,
	height: number,
): string {
	if (width < 3 || height < 2) {
		throw new Error(`encodePixelDataToLqip: image must be at least 3×2, got ${width}×${height}`);
	}

	// Per-cell quantised Oklab bytes.
	const cellBytes: number[] = [];
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
			const { L, a, b } = linearRgbToOklab(cellR / cellCount, cellG / cellCount, cellB / cellCount);
			const { ll, aaa, bbb } = findOklabBits(L, a, b);
			cellBytes.push(packLab(ll, aaa, bbb));
		}
	}

	// Base: dominant Oklab bucket → quantised byte.
	const dom = findDominantColor(data, width, height);
	const domLab = linearRgbToOklab(dom.rl, dom.gl, dom.bl);
	const base = findOklabBits(domLab.L, domLab.a, domLab.b);
	const baseByte = packLab(base.ll, base.aaa, base.bbb);

	return [baseByte, ...cellBytes].join(',');
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
export async function encodeLqip(source: File | HTMLImageElement | ImageBitmap): Promise<string> {
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

	@state() private _lqip: string | null = null;
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

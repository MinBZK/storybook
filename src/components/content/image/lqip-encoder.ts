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
	'components.lqip-encoder.preview-label': 'Voorbeeld (refresh om het LQIP placeholder opnieuw te zien):',
};

export type NLDDLqipEncoderTranslations = typeof nlddLqipEncoderTranslations;

/* --------------------------------------------------------------------- *
 *  Encoder
 * --------------------------------------------------------------------- */

/** sRGB (0-255) → linear-light (0-1). */
function srgbToLinear(c: number): number {
	const n = c / 255;
	return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}

/** sRGB triplet → Oklab. Constants from the Oklab spec. */
function rgbToOklab(r: number, g: number, b: number): { L: number; a: number; b: number } {
	const rl = srgbToLinear(r);
	const gl = srgbToLinear(g);
	const bl = srgbToLinear(b);

	const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
	const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
	const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

	const l_ = Math.cbrt(l);
	const m_ = Math.cbrt(m);
	const s_ = Math.cbrt(s);

	return {
		L: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
		a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
		b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
	};
}

function clamp(v: number, lo: number, hi: number): number {
	return Math.max(lo, Math.min(hi, v));
}

/**
 * Encode an image into the 20-bit LQIP integer.
 *
 * The source can be a File (e.g. from <input type="file">), an HTMLImageElement,
 * or an ImageBitmap. Returns a number in [-524288, 524287].
 */
export async function encodeLqip(source: File | HTMLImageElement | ImageBitmap): Promise<number> {
	let bitmap: ImageBitmap;
	if (source instanceof File) {
		bitmap = await createImageBitmap(source);
	} else if (source instanceof HTMLImageElement) {
		bitmap = await createImageBitmap(source);
	} else {
		bitmap = source;
	}

	// Cell colours: 3×2 downsample, take greyscale per pixel.
	const cellCanvas = document.createElement('canvas');
	cellCanvas.width = 3;
	cellCanvas.height = 2;
	const cellCtx = cellCanvas.getContext('2d');
	if (!cellCtx) throw new Error('encodeLqip: could not acquire a 2D canvas context');
	cellCtx.drawImage(bitmap, 0, 0, 3, 2);
	const cellData = cellCtx.getImageData(0, 0, 3, 2).data;

	const cells: number[] = [];
	for (let i = 0; i < 6; i++) {
		const r = cellData[i * 4];
		const g = cellData[i * 4 + 1];
		const b = cellData[i * 4 + 2];
		// Rec.709 luminance gives a perceptually decent greyscale.
		const gray = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
		// CSS maps quantised cell value c (0-3) to lightness c/3 * 60% + 20%,
		// i.e. the 0.2-0.8 range. Invert that mapping to quantise the source.
		const c = clamp(Math.round((gray - 0.2) / 0.6 * 3), 0, 3);
		cells.push(c);
	}

	// Base colour: 1×1 downsample = average pixel.
	const avgCanvas = document.createElement('canvas');
	avgCanvas.width = 1;
	avgCanvas.height = 1;
	const avgCtx = avgCanvas.getContext('2d');
	if (!avgCtx) throw new Error('encodeLqip: could not acquire a 2D canvas context');
	avgCtx.drawImage(bitmap, 0, 0, 1, 1);
	const avgData = avgCtx.getImageData(0, 0, 1, 1).data;
	const lab = rgbToOklab(avgData[0], avgData[1], avgData[2]);

	// CSS maps the quantised triplet back to:
	//   L: ll/3 * 0.6 + 0.2          → invert: (L - 0.2) / 0.6 * 3
	//   a: aaa/8 * 0.7 - 0.35        → invert: (a + 0.35) / 0.7 * 8 (clamped to 7)
	//   b: (bbb+1)/8 * 0.7 - 0.35    → invert: ((b + 0.35) / 0.7 * 8) - 1 (clamped 0-7)
	const ll = clamp(Math.round((lab.L - 0.2) / 0.6 * 3), 0, 3);
	const aaa = clamp(Math.round((lab.a + 0.35) / 0.7 * 8), 0, 7);
	const bbb = clamp(Math.round((lab.b + 0.35) / 0.7 * 8 - 1), 0, 7);

	// Pack: ca | cb | cc | cd | ce | cf | ll | aaa | bbb
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

	// The CSS decoder adds 2^19 back, so subtract it here for a signed result.
	return packed - (1 << 19);
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
			max-width: var(--primitives-area-480);
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
			this._lqip = await encodeLqip(file);
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
					<div>${this._t('components.lqip-encoder.preview-label')}</div>
					<nldd-image
						src=${this._imageUrl}
						alt=${this._filename}
						aspect-ratio="16/9"
						lqip=${this._lqip}
					></nldd-image>
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

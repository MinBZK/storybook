/**
 * Nederlandse Digitale Dienst Image Component (Lit + TypeScript)
 *
 * Wraps a native `<img>` with design-system styling: corner radius variants,
 * aspect-ratio reservation, object-fit/position control, optional caption +
 * credit. Renders as `<figure>` + `<figcaption>` only when a caption or credit
 * is set — otherwise just the image, no extra wrapping.
 *
 * Hybrid source: the `src` attribute renders an internal `<img>`. To use a
 * custom `<img>` or `<picture>` (e.g. with art-direction sources), slot it
 * into the default slot and we'll style and wrap it like our own image.
 *
 * @element nldd-image
 *
 * @attr {string}  src - Image URL
 * @attr {string}  alt - Alt text. Required unless `decorative`.
 * @attr {string}  srcset - Responsive source set
 * @attr {string}  sizes - Source sizes hint
 * @attr {number|'full'} width - Display width. `full` (default) fills the parent.
 *   A numeric value sets host `max-width` AND the `<img>` layout-hint width.
 * @attr {number}  height - Intrinsic height (for layout reservation)
 * @attr {'lazy'|'eager'} loading - Loading strategy (default: 'lazy')
 * @attr {'async'|'sync'|'auto'} decoding - Decoding hint (default: 'async')
 * @attr {'high'|'low'|'auto'} fetchpriority - Fetch priority hint
 * @attr {string}  aspect-ratio - Aspect ratio in CSS form (e.g. "16/9", "1/1", "4/3").
 *   "16:9" colon notation is also accepted for convenience.
 * @attr {'cover'|'contain'|'fill'|'scale-down'|'none'} object-fit - default: 'cover'
 * @attr {'center'|'top'|'bottom'|'left'|'right'} object-position - default: 'center'
 * @attr {'square'|'rounded'|'circle'} shape - Corner shape (default: 'rounded')
 * @attr {string}  caption - Caption text shown below the image
 * @attr {string}  credit - Smaller credit/attribution text shown beside the caption
 * @attr {boolean} decorative - Decorative image: alt is forced empty + aria-hidden
 * @attr {string}  lqip - Low-quality image placeholder as a CSV string
 *   `"base,c1,c2,c3,c4,c5,c6"` — seven 0-255 bytes, each packing an 8-bit
 *   Oklab triplet (2 bits L, 3 bits a, 3 bits b). The first is the base
 *   colour shown outside the cell gradients; the other six are per-cell
 *   colours in row-major 3×2 order. Generate via the encoder in
 *   `lqip-encoder.ts` or via the "LQIP encoder tool" Storybook story.
 *   Extends Lean Rada's CSS-only LQIP (https://leanrada.com/notes/css-only-lqip/)
 *   with per-cell hue — Lean's original format encodes greyscale cells only;
 *   ours encodes a colour per cell so multi-colour subjects survive the
 *   placeholder.
 *
 * @slot - Custom `<img>` or `<picture>` (overrides the src-based default).
 *   The internal `error` listener is attached only to the built-in `<img>`, so
 *   slotted content does not trigger the error-state overlay automatically.
 *   Consumers slotting their own image are responsible for handling its
 *   error state (e.g. swapping the slot content or styling a fallback).
 * @slot caption - Rich caption content (overrides the `caption` attribute)
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { imageStyles } from './image.styles.js';
import { imageTemplate } from './image.template.js';
import '../icon/icon.js';

export type ImageShape = 'square' | 'rounded' | 'circle';
export type ImageObjectFit = 'cover' | 'contain' | 'fill' | 'scale-down' | 'none';
export type ImageObjectPosition = 'center' | 'top' | 'bottom' | 'left' | 'right';
export type ImageLoading = 'lazy' | 'eager';
export type ImageDecoding = 'async' | 'sync' | 'auto';
export type ImageFetchPriority = 'high' | 'low' | 'auto';

@customElement('nldd-image')
export class NLDDImage extends LitElement {
	static override styles = imageStyles;

	@property({ type: String, reflect: true })
	src = '';

	@property({ type: String })
	alt = '';

	@property({ type: String })
	srcset = '';

	@property({ type: String })
	sizes = '';

	@property({ type: String, reflect: true })
	width: number | 'full' = 'full';

	@property({ type: Number })
	height?: number;

	@property({ type: String })
	loading: ImageLoading = 'lazy';

	@property({ type: String })
	decoding: ImageDecoding = 'async';

	@property({ type: String, attribute: 'fetchpriority' })
	fetchPriority?: ImageFetchPriority;

	@property({ type: String, attribute: 'aspect-ratio', reflect: true })
	aspectRatio = '';

	@property({ type: String, attribute: 'object-fit', reflect: true })
	objectFit: ImageObjectFit = 'cover';

	@property({ type: String, attribute: 'object-position', reflect: true })
	objectPosition: ImageObjectPosition = 'center';

	@property({ type: String, reflect: true })
	shape: ImageShape = 'rounded';

	@property({ type: String })
	caption = '';

	@property({ type: String })
	credit = '';

	@property({ type: Boolean, reflect: true })
	decorative = false;

	@property({ type: String })
	lqip = '';

	/** Cache key — the raw lqip attribute string at the time of the last
	 *  parse. Lit dirty-checks by reference, so without caching every render
	 *  would emit a fresh object + array and force downstream re-evaluation
	 *  even when the attribute hasn't changed. Matters when many images live
	 *  in a virtualised list. */
	private _parsedLqipKey?: string;
	private _parsedLqipValue: { base: number; cells: number[] } | null = null;

	/** Parsed LQIP: 7 numbers in [0, 255] — base + 6 cells — or null when the
	 *  attribute is empty or malformed. Memoised against the raw lqip string,
	 *  so successive reads return the same object reference until the
	 *  attribute changes. */
	get _parsedLqip(): { base: number; cells: number[] } | null {
		if (this._parsedLqipKey === this.lqip) return this._parsedLqipValue;
		this._parsedLqipKey = this.lqip;
		if (!this.lqip) {
			this._parsedLqipValue = null;
			return null;
		}
		const parts = this.lqip.split(',').map(s => s.trim());
		if (parts.length !== 7) {
			this._parsedLqipValue = null;
			return null;
		}
		const nums = parts.map(s => {
			const n = Number(s);
			return Number.isInteger(n) && n >= 0 && n <= 255 ? n : NaN;
		});
		this._parsedLqipValue = nums.some(Number.isNaN)
			? null
			: { base: nums[0], cells: nums.slice(1) };
		return this._parsedLqipValue;
	}

	@state()
	_hasSlottedCaption = false;

	/** Tracks whether the internal <img> has finished loading. While false and
	 *  an LQIP value is set, the image stays hidden so the placeholder shows. */
	@state()
	_imageLoaded = false;

	/** Set when the internal <img> fires an error event (404, network error,
	 *  decode failure, …). The template uses this to render a fallback UI
	 *  with an icon + the alt text. */
	@state()
	_imageErrored = false;

	/** Convert "16:9" → "16/9" so the CSS `aspect-ratio` parser accepts it.
	 *  Already-slashed values pass through untouched. */
	get _cssAspectRatio(): string {
		if (!this.aspectRatio) return '';
		return this.aspectRatio.replace(':', '/');
	}

	/** Width parsed as a positive number if it isn't 'full'. Undefined when
	 *  the host should fill its parent (no max-width and no <img width> hint).
	 *  Empty / NaN / non-positive values fall back to undefined.
	 *
	 *  Sentinel behaviour: `width="0"` (and any other non-positive value)
	 *  silently behaves as `width="full"`. A zero-width image is meaningless,
	 *  so we treat the input as the consumer's mistake rather than a literal
	 *  request — a DEV-mode warn flags it during development. */
	get _numericWidth(): number | undefined {
		if (this.width === 'full') return undefined;
		const n = Number(this.width);
		if (Number.isFinite(n) && n > 0) return n;
		if (import.meta.env?.DEV && this.width != null && String(this.width) !== '' && !this._warnedWidth) {
			this._warnedWidth = true;
			console.warn(`<nldd-image>: width="${this.width}" is not a positive number. Falling back to "full".`);
		}
		return undefined;
	}

	/** DEV-only "bad width" warning latch; see _numericWidth. */
	private _warnedWidth = false;

	get _hasCaption(): boolean {
		return !!this.caption || !!this.credit || this._hasSlottedCaption;
	}

	override willUpdate(changed: Map<string, unknown>): void {
		// Reset load/error flags when the src changes so the LQIP shows again
		// for the new image until it finishes loading (or errors out anew).
		// Also re-arm the alt-warning latch so swapping to a new src with a
		// missing alt warns again instead of staying silent after the first hit.
		if (changed.has('src')) {
			this._imageLoaded = false;
			this._imageErrored = false;
			this._warnedAlt = false;
		}
	}

	override updated(changed: Map<string, unknown>): void {
		// Apply the numeric `width` as a custom property the stylesheet picks
		// up. Setting style.maxWidth directly would override any consumer CSS
		// targeting the host's max-width; routing through --_max-width lets
		// the consumer's cascade win for the rare case where they need a
		// different cap. 'full' clears the constraint.
		if (changed.has('width')) {
			const n = this._numericWidth;
			if (n !== undefined) {
				this.style.setProperty('--_max-width', `${n}px`);
			} else {
				this.style.removeProperty('--_max-width');
			}
		}
		// Non-decorative images without alt text are a silent a11y failure
		// (WCAG H37). Warn once in dev so the issue surfaces during build /
		// Storybook, but stay quiet in production. Reset the flag when the
		// situation is resolved so re-introducing the bug warns again.
		if (import.meta.env?.DEV) {
			const inaccessible = !this.decorative && !this.alt.trim();
			if (inaccessible && !this._warnedAlt) {
				this._warnedAlt = true;
				console.warn('<nldd-image>: Non-decorative images need a non-empty `alt`. Set `decorative` if the image conveys no information.');
			} else if (!inaccessible) {
				this._warnedAlt = false;
			}
		}
	}

	/** DEV-only "missing alt" warning latch; see updated(). */
	private _warnedAlt = false;

	override firstUpdated(): void {
		// If the image was cached or already loaded by the time the listener
		// attached, the load event won't fire — sync state directly.
		const img = this.shadowRoot?.querySelector<HTMLImageElement>('.image__img');
		if (img?.complete && img.naturalWidth > 0) {
			this._imageLoaded = true;
		}
		// Sync the slotted-caption flag from the initial assignment. Without
		// this, consumer-provided `<span slot="caption">` content in the
		// page's initial HTML wouldn't show up until the FIRST slotchange
		// (which doesn't fire for static initial content) — producing a
		// flash of no figure / caption on first paint.
		const captionSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="caption"]');
		if (captionSlot) this._onCaptionSlotChange({ target: captionSlot } as unknown as Event);
	}

	_onImageLoad = (): void => {
		this._imageLoaded = true;
		this._imageErrored = false;
	};

	_onImageError = (): void => {
		this._imageErrored = true;
		this._imageLoaded = false;
	};

	_onCaptionSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		this._hasSlottedCaption = slot.assignedNodes({ flatten: true })
			.some(node => {
				if (node.nodeType === Node.TEXT_NODE) {
					return (node.textContent || '').trim() !== '';
				}
				return true;
			});
	};

	override render() {
		return imageTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-image': NLDDImage;
	}
}

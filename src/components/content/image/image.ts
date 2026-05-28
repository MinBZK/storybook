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
 * @attr {'square'|'rounded'|'circle'} shape - Corner shape (default: 'square')
 * @attr {string}  caption - Caption text shown below the image
 * @attr {string}  credit - Smaller credit/attribution text shown beside the caption
 * @attr {boolean} decorative - Decorative image: alt is forced empty + aria-hidden
 * @attr {number}  lqip - Low-quality image placeholder encoded as a 20-bit integer
 *   (see https://leanrada.com/notes/css-only-lqip/). Renders a tiny gradient
 *   thumbnail while the real image loads, then the image fades in over it.
 *
 * @slot - Custom `<img>` or `<picture>` (overrides the src-based default)
 * @slot caption - Rich caption content (overrides the `caption` attribute)
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { imageStyles } from './image.styles.js';
import { imageTemplate } from './image.template.js';

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

	@property({ type: Number })
	lqip?: number;

	@state()
	_hasSlottedCaption = false;

	/** Tracks whether the internal <img> has finished loading. While false and
	 *  an LQIP value is set, the image stays hidden so the placeholder shows. */
	@state()
	_imageLoaded = false;

	/** Convert "16:9" → "16/9" so the CSS `aspect-ratio` parser accepts it.
	 *  Already-slashed values pass through untouched. */
	get _cssAspectRatio(): string {
		if (!this.aspectRatio) return '';
		return this.aspectRatio.replace(':', '/');
	}

	/** Width parsed as a positive number if it isn't 'full'. Undefined when
	 *  the host should fill its parent (no max-width and no <img width> hint).
	 *  Empty / NaN / non-positive values fall back to undefined. */
	get _numericWidth(): number | undefined {
		if (this.width === 'full') return undefined;
		const n = Number(this.width);
		return Number.isFinite(n) && n > 0 ? n : undefined;
	}

	get _hasCaption(): boolean {
		return !!this.caption || !!this.credit || this._hasSlottedCaption;
	}

	override willUpdate(changed: Map<string, unknown>): void {
		// Reset the loaded flag when the src changes so the LQIP shows again
		// for the new image until it finishes loading.
		if (changed.has('src')) {
			this._imageLoaded = false;
		}
	}

	override updated(changed: Map<string, unknown>): void {
		// Apply the numeric `width` as the host's max-width so the image (and
		// its caption) stay within that limit. 'full' clears the constraint.
		if (changed.has('width')) {
			const n = this._numericWidth;
			if (n !== undefined) {
				this.style.maxWidth = `${n}px`;
			} else {
				this.style.removeProperty('max-width');
			}
		}
	}

	override firstUpdated(): void {
		// If the image was cached or already loaded by the time the listener
		// attached, the load event won't fire — sync state directly.
		const img = this.shadowRoot?.querySelector<HTMLImageElement>('.image__img');
		if (img?.complete && img.naturalWidth > 0) {
			this._imageLoaded = true;
		}
	}

	_onImageLoad = (): void => {
		this._imageLoaded = true;
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

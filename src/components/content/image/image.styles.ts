import { css } from 'lit';

export const imageStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--components-image-corner-radius);
		--_background-color: var(--components-image-background-color);
		--_caption-gap: var(--components-image-caption-gap);
		--_caption-color: var(--components-image-caption-color);
		--_caption-font: var(--components-image-caption-font);
		--_credit-color: var(--components-image-credit-color);
		--_credit-font: var(--components-image-credit-font);
		--_error-text-color: var(--components-image-error-text-color);
		--_error-font: var(--components-image-error-font);
		--_error-padding: var(--primitives-space-8);
		--_error-card-padding-block: var(--primitives-space-12);
		--_error-card-padding-inline: var(--primitives-space-16);
		--_error-card-gap: var(--primitives-space-2);
		--_error-card-corner-radius: var(--primitives-corner-radius-md);
		--_caption-row-gap: var(--primitives-space-8);
		--_object-fit: cover;
		--_object-position: center;

		box-sizing: border-box;
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Object-fit variants
	   Driven by the reflected attribute so we can also style slotted img/picture
	   via ::slotted() with the same CSS var. */

	:host([object-fit="contain"]) { --_object-fit: contain; }
	:host([object-fit="fill"]) { --_object-fit: fill; }
	:host([object-fit="scale-down"]) { --_object-fit: scale-down; }
	:host([object-fit="none"]) { --_object-fit: none; }


	/* ## Object-position variants */

	:host([object-position="top"]) { --_object-position: top; }
	:host([object-position="bottom"]) { --_object-position: bottom; }
	:host([object-position="left"]) { --_object-position: left; }
	:host([object-position="right"]) { --_object-position: right; }


	/* ## Shape variants
	   Rounded is the default (already set via the --_corner-radius in :host
	   pointing at the design-system token). Square overrides to 0, circle to
	   50% for avatar-style use (combine with aspect-ratio 1/1 for a true circle). */

	:host([shape="square"]) { --_corner-radius: 0; }
	:host([shape="circle"]) { --_corner-radius: 50%; }


	/* # Figure
	   Only rendered when caption or credit is present. Acts as the layout
	   wrapper holding image + figcaption with a small gap. */

	.image__figure {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		margin: 0;
		gap: var(--_caption-gap);
	}


	/* # Media wrapper
	   The box that constrains the image. aspect-ratio is set as an inline style
	   from the component when provided, so we don't need a CSS var. The
	   background acts as a placeholder while the image loads. */

	.image__media {
		display: block;
		position: relative;
		overflow: hidden;
		background-color: var(--_background-color);
		max-width: 100%;
		border-radius: var(--_corner-radius);
	}


	/* # Image element
	   Both the internal img and any slotted img/picture get the same styling
	   so the wrapper behaves identically in both cases. ::slotted() can't
	   reach descendants, so a slotted <picture> works for source switching
	   but consumers must put any extra styling on the inner <img> themselves. */

	.image__img,
	::slotted(img),
	::slotted(picture) {
		display: block;
		width: 100%;
		height: 100%;
		max-width: 100%;
		object-fit: var(--_object-fit);
		object-position: var(--_object-position);
	}


	/* # LQIP placeholder
	   Implements Lean Rada's CSS-only LQIP: a single 20-bit integer in
	   --context-lqip encodes a 3×2 grayscale grid + an Oklab base colour.
	   Six radial-gradients compose the thumbnail behind the image; the
	   image fades in on load. The component sets --context-lqip as an
	   inline style from the lqip attribute — it crosses the shadow
	   boundary so it uses the --context-* prefix, not --_.
	   See https://leanrada.com/notes/css-only-lqip/ for the encoding details. */

	.image__media--lqip {
		--_lqip-ca: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 18))), 4);
		--_lqip-cb: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 16))), 4);
		--_lqip-cc: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 14))), 4);
		--_lqip-cd: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 12))), 4);
		--_lqip-ce: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 10))), 4);
		--_lqip-cf: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 8))), 4);
		--_lqip-ll: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 6))), 4);
		--_lqip-aaa: mod(round(down, calc((var(--context-lqip) + pow(2, 19)) / pow(2, 3))), 8);
		--_lqip-bbb: mod(calc(var(--context-lqip) + pow(2, 19)), 8);

		/* Cells render in Oklab with each cell's own quantised luminance but
		   a damped version of the base colour's hue (a/b). This deviates
		   from Lean Rada's exact technique — his version uses hsl(0 0% X%)
		   which is pure grey and visibly washes out the base tint with six
		   grey overlays. Using the base hue per cell preserves the overall
		   colour cast while still modulating brightness, so the placeholder
		   reads as "muted blue sunset" instead of "muted grey". Cell chroma
		   is multiplied by --_lqip-cell-chroma-scale (0..1) so the cell
		   highlights stay softer than the base; a value of 1.0 would match
		   the base hue exactly, 0.0 is back to pure grey. The encoded LQIP
		   integers are unchanged — only the decoder gets warmer output. */
		--_lqip-cell-chroma-scale: 0.7;
		--_lqip-base-a: calc(var(--_lqip-aaa) / 8 * 0.7 - 0.35);
		--_lqip-base-b: calc((var(--_lqip-bbb) + 1) / 8 * 0.7 - 0.35);
		--_lqip-cell-a: calc(var(--_lqip-base-a) * var(--_lqip-cell-chroma-scale));
		--_lqip-cell-b: calc(var(--_lqip-base-b) * var(--_lqip-cell-chroma-scale));

		--_lqip-ca-clr: oklab(calc(var(--_lqip-ca) / 3 * 0.6 + 0.2) var(--_lqip-cell-a) var(--_lqip-cell-b));
		--_lqip-cb-clr: oklab(calc(var(--_lqip-cb) / 3 * 0.6 + 0.2) var(--_lqip-cell-a) var(--_lqip-cell-b));
		--_lqip-cc-clr: oklab(calc(var(--_lqip-cc) / 3 * 0.6 + 0.2) var(--_lqip-cell-a) var(--_lqip-cell-b));
		--_lqip-cd-clr: oklab(calc(var(--_lqip-cd) / 3 * 0.6 + 0.2) var(--_lqip-cell-a) var(--_lqip-cell-b));
		--_lqip-ce-clr: oklab(calc(var(--_lqip-ce) / 3 * 0.6 + 0.2) var(--_lqip-cell-a) var(--_lqip-cell-b));
		--_lqip-cf-clr: oklab(calc(var(--_lqip-cf) / 3 * 0.6 + 0.2) var(--_lqip-cell-a) var(--_lqip-cell-b));
		--_lqip-base-clr: oklab(calc(var(--_lqip-ll) / 3 * 0.6 + 0.2) var(--_lqip-base-a) var(--_lqip-base-b));

		background-color: transparent;
		background-image:
			radial-gradient(50% 75% at 16.67% 25%, var(--_lqip-ca-clr), transparent),
			radial-gradient(50% 75% at 50% 25%, var(--_lqip-cb-clr), transparent),
			radial-gradient(50% 75% at 83.33% 25%, var(--_lqip-cc-clr), transparent),
			radial-gradient(50% 75% at 16.67% 75%, var(--_lqip-cd-clr), transparent),
			radial-gradient(50% 75% at 50% 75%, var(--_lqip-ce-clr), transparent),
			radial-gradient(50% 75% at 83.33% 75%, var(--_lqip-cf-clr), transparent),
			linear-gradient(0deg, var(--_lqip-base-clr), var(--_lqip-base-clr));
	}

	.image__media--lqip .image__img {
		opacity: 0;
		transition: opacity 300ms ease-out;
	}

	.image__media--lqip .image__img--loaded {
		opacity: 1;
	}


	/* # Errored image
	   Hide the broken <img> entirely so the browser's native fallback rendering
	   (alt text leaking out + broken-image icon/border) doesn't show through
	   underneath our own error overlay. visibility:hidden keeps the element
	   in the layout flow and preserves the load/error listeners. */

	.image__img--errored {
		visibility: hidden;
	}


	/* # Error state
	   Centred card with icon + alt-text shown when the image fails to load.
	   Sits over whatever background --_background-color provides (the LQIP
	   gradient when present, otherwise the neutral fallback colour). The
	   card has its own neutral background so the icon + label stay legible
	   against the LQIP behind it. */

	.image__error {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--_error-padding);
	}

	.image__error-card {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		max-width: 100%;
		padding: var(--_error-card-padding-block) var(--_error-card-padding-inline);
		gap: var(--_error-card-gap);
		background-color: var(--_background-color);
		border-radius: var(--_error-card-corner-radius);
		color: var(--_error-text-color);
		font: var(--_error-font);
		text-align: center;
	}

	.image__error-text {
		max-width: 100%;
		overflow-wrap: anywhere;
	}


	/* # Caption */

	.image__caption {
		display: flex;
		flex-wrap: wrap;
		gap: var(--_caption-row-gap);
		color: var(--_caption-color);
		font: var(--_caption-font);
	}

	.image__credit {
		color: var(--_credit-color);
		font: var(--_credit-font);
	}


	/* # Accessibility */

	@media (prefers-reduced-motion: reduce) {
		.image__media--lqip .image__img {
			transition: none;
		}
	}

	@media (forced-colors: active) {
		.image__media {
			border: 1px solid CanvasText;
		}
	}
`;

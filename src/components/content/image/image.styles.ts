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
	   Square: no radius. Rounded: design-system corner radius. Circle: 50%
	   for avatar-style use (combine with aspect-ratio 1/1 for a true circle). */

	:host([shape="rounded"]) { --_corner-radius: var(--components-image-corner-radius); }
	:host([shape="circle"]) { --_corner-radius: 50%; }
	:host(:not([shape="rounded"]):not([shape="circle"])) { --_corner-radius: 0; }


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
	   Implements Lean Rada's CSS-only LQIP: a single 20-bit integer in --lqip
	   encodes a 3×2 grayscale grid + an Oklab base colour. Six radial-gradients
	   compose the thumbnail behind the image; the image fades in on load.
	   See https://leanrada.com/notes/css-only-lqip/ for the encoding details.

	   When --lqip is set we hide the regular placeholder background so the
	   gradient shows through; the image starts at opacity 0 and crossfades
	   to 1 when the load event fires. */

	.image__media--lqip {
		--_lqip-ca: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 18))), 4);
		--_lqip-cb: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 16))), 4);
		--_lqip-cc: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 14))), 4);
		--_lqip-cd: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 12))), 4);
		--_lqip-ce: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 10))), 4);
		--_lqip-cf: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 8))), 4);
		--_lqip-ll: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 6))), 4);
		--_lqip-aaa: mod(round(down, calc((var(--lqip) + pow(2, 19)) / pow(2, 3))), 8);
		--_lqip-bbb: mod(calc(var(--lqip) + pow(2, 19)), 8);

		--_lqip-ca-clr: hsl(0 0% calc(var(--_lqip-ca) / 3 * 60% + 20%));
		--_lqip-cb-clr: hsl(0 0% calc(var(--_lqip-cb) / 3 * 60% + 20%));
		--_lqip-cc-clr: hsl(0 0% calc(var(--_lqip-cc) / 3 * 60% + 20%));
		--_lqip-cd-clr: hsl(0 0% calc(var(--_lqip-cd) / 3 * 60% + 20%));
		--_lqip-ce-clr: hsl(0 0% calc(var(--_lqip-ce) / 3 * 60% + 20%));
		--_lqip-cf-clr: hsl(0 0% calc(var(--_lqip-cf) / 3 * 60% + 20%));
		--_lqip-base-clr: oklab(
			calc(var(--_lqip-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-bbb) + 1) / 8 * 0.7 - 0.35)
		);

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


	/* # Caption */

	.image__caption {
		display: flex;
		flex-wrap: wrap;
		gap: var(--primitives-space-8);
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

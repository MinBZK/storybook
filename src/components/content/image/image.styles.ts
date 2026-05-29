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
		--_max-width: 100%;

		box-sizing: border-box;
		display: block;
		max-width: var(--_max-width);
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
	   Both the internal img and any slotted img get the same styling so the
	   wrapper behaves identically in both cases. ::slotted() can't reach
	   descendants, so a slotted <picture> works for source switching but
	   consumers must put any extra styling on the inner <img> themselves —
	   object-fit / object-position aren't inheritable into <picture>'s child
	   <img>, so we don't bother targeting <picture> here. */

	.image__img,
	::slotted(img) {
		display: block;
		width: 100%;
		height: 100%;
		max-width: 100%;
		object-fit: var(--_object-fit);
		object-position: var(--_object-position);
	}

	/* <picture> is a wrapper that picks the right <source>; layout properties
	   like width/height DO apply to it directly even though object-fit doesn't.
	   Size it so the slotted picture fills the media wrapper, then let the
	   consumer style the inner <img> for fit/position. */
	::slotted(picture) {
		display: block;
		width: 100%;
		height: 100%;
		max-width: 100%;
	}


	/* # LQIP placeholder
	   Per-cell Oklab LQIP — extends Lean Rada's CSS-only LQIP technique
	   (https://leanrada.com/notes/css-only-lqip/) with one quantised
	   colour per cell instead of greyscale-only cells. The component
	   parses lqip="base,c1,c2,c3,c4,c5,c6" and forwards each byte as an
	   inline --context-lqip-* variable (crosses the shadow boundary;
	   hence the --context-* prefix, not --_).
	   Each byte packs 2 bits L + 3 bits a + 3 bits b — the same format
	   Lean uses for his single base colour, applied 7 times. The base
	   shows through cell-gradient transparent edges; the six cells carry
	   the per-zone hue. No blend modes are needed because every cell
	   already has its own real colour — overlap zones blend naturally
	   through the smooth alpha falloff (stop10/20/30/40).
	   Browser support: depends on CSS mod() (Chrome 113+, Safari 15.4+,
	   Firefox 118+, May 2023 baseline) and CSS round(down, ...) (Chrome
	   111+, Safari 15.4+, Firefox 118+). Older engines drop the
	   .image__media--lqip background and fall through to the neutral
	   --_background-color set on .image__media — degraded but harmless
	   (the placeholder is a "nice to have", not a load-bearing element). */

	.image__media--lqip {
		--_lqip-base-ll: mod(round(down, var(--context-lqip-base) / 64), 4);
		--_lqip-base-aaa: mod(round(down, var(--context-lqip-base) / 8), 8);
		--_lqip-base-bbb: mod(var(--context-lqip-base), 8);
		--_lqip-c1-ll: mod(round(down, var(--context-lqip-c1) / 64), 4);
		--_lqip-c1-aaa: mod(round(down, var(--context-lqip-c1) / 8), 8);
		--_lqip-c1-bbb: mod(var(--context-lqip-c1), 8);
		--_lqip-c2-ll: mod(round(down, var(--context-lqip-c2) / 64), 4);
		--_lqip-c2-aaa: mod(round(down, var(--context-lqip-c2) / 8), 8);
		--_lqip-c2-bbb: mod(var(--context-lqip-c2), 8);
		--_lqip-c3-ll: mod(round(down, var(--context-lqip-c3) / 64), 4);
		--_lqip-c3-aaa: mod(round(down, var(--context-lqip-c3) / 8), 8);
		--_lqip-c3-bbb: mod(var(--context-lqip-c3), 8);
		--_lqip-c4-ll: mod(round(down, var(--context-lqip-c4) / 64), 4);
		--_lqip-c4-aaa: mod(round(down, var(--context-lqip-c4) / 8), 8);
		--_lqip-c4-bbb: mod(var(--context-lqip-c4), 8);
		--_lqip-c5-ll: mod(round(down, var(--context-lqip-c5) / 64), 4);
		--_lqip-c5-aaa: mod(round(down, var(--context-lqip-c5) / 8), 8);
		--_lqip-c5-bbb: mod(var(--context-lqip-c5), 8);
		--_lqip-c6-ll: mod(round(down, var(--context-lqip-c6) / 64), 4);
		--_lqip-c6-aaa: mod(round(down, var(--context-lqip-c6) / 8), 8);
		--_lqip-c6-bbb: mod(var(--context-lqip-c6), 8);

		--_lqip-base-clr: oklab(
			calc(var(--_lqip-base-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-base-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-base-bbb) + 1) / 8 * 0.7 - 0.35)
		);
		--_lqip-c1-clr: oklab(
			calc(var(--_lqip-c1-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-c1-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-c1-bbb) + 1) / 8 * 0.7 - 0.35)
		);
		--_lqip-c2-clr: oklab(
			calc(var(--_lqip-c2-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-c2-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-c2-bbb) + 1) / 8 * 0.7 - 0.35)
		);
		--_lqip-c3-clr: oklab(
			calc(var(--_lqip-c3-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-c3-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-c3-bbb) + 1) / 8 * 0.7 - 0.35)
		);
		--_lqip-c4-clr: oklab(
			calc(var(--_lqip-c4-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-c4-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-c4-bbb) + 1) / 8 * 0.7 - 0.35)
		);
		--_lqip-c5-clr: oklab(
			calc(var(--_lqip-c5-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-c5-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-c5-bbb) + 1) / 8 * 0.7 - 0.35)
		);
		--_lqip-c6-clr: oklab(
			calc(var(--_lqip-c6-ll) / 3 * 0.6 + 0.2)
			calc(var(--_lqip-c6-aaa) / 8 * 0.7 - 0.35)
			calc((var(--_lqip-c6-bbb) + 1) / 8 * 0.7 - 0.35)
		);

		--_lqip-stop10: 2%;
		--_lqip-stop20: 8%;
		--_lqip-stop30: 18%;
		--_lqip-stop40: 32%;

		background-color: transparent;
		background-image:
			radial-gradient(50% 75% at 16.67% 25%,
				var(--_lqip-c1-clr),
				rgb(from var(--_lqip-c1-clr) r g b / calc(100% - var(--_lqip-stop10))) 10%,
				rgb(from var(--_lqip-c1-clr) r g b / calc(100% - var(--_lqip-stop20))) 20%,
				rgb(from var(--_lqip-c1-clr) r g b / calc(100% - var(--_lqip-stop30))) 30%,
				rgb(from var(--_lqip-c1-clr) r g b / calc(100% - var(--_lqip-stop40))) 40%,
				rgb(from var(--_lqip-c1-clr) r g b / var(--_lqip-stop40)) 60%,
				rgb(from var(--_lqip-c1-clr) r g b / var(--_lqip-stop30)) 70%,
				rgb(from var(--_lqip-c1-clr) r g b / var(--_lqip-stop20)) 80%,
				rgb(from var(--_lqip-c1-clr) r g b / var(--_lqip-stop10)) 90%,
				transparent),
			radial-gradient(50% 75% at 50% 25%,
				var(--_lqip-c2-clr),
				rgb(from var(--_lqip-c2-clr) r g b / calc(100% - var(--_lqip-stop10))) 10%,
				rgb(from var(--_lqip-c2-clr) r g b / calc(100% - var(--_lqip-stop20))) 20%,
				rgb(from var(--_lqip-c2-clr) r g b / calc(100% - var(--_lqip-stop30))) 30%,
				rgb(from var(--_lqip-c2-clr) r g b / calc(100% - var(--_lqip-stop40))) 40%,
				rgb(from var(--_lqip-c2-clr) r g b / var(--_lqip-stop40)) 60%,
				rgb(from var(--_lqip-c2-clr) r g b / var(--_lqip-stop30)) 70%,
				rgb(from var(--_lqip-c2-clr) r g b / var(--_lqip-stop20)) 80%,
				rgb(from var(--_lqip-c2-clr) r g b / var(--_lqip-stop10)) 90%,
				transparent),
			radial-gradient(50% 75% at 83.33% 25%,
				var(--_lqip-c3-clr),
				rgb(from var(--_lqip-c3-clr) r g b / calc(100% - var(--_lqip-stop10))) 10%,
				rgb(from var(--_lqip-c3-clr) r g b / calc(100% - var(--_lqip-stop20))) 20%,
				rgb(from var(--_lqip-c3-clr) r g b / calc(100% - var(--_lqip-stop30))) 30%,
				rgb(from var(--_lqip-c3-clr) r g b / calc(100% - var(--_lqip-stop40))) 40%,
				rgb(from var(--_lqip-c3-clr) r g b / var(--_lqip-stop40)) 60%,
				rgb(from var(--_lqip-c3-clr) r g b / var(--_lqip-stop30)) 70%,
				rgb(from var(--_lqip-c3-clr) r g b / var(--_lqip-stop20)) 80%,
				rgb(from var(--_lqip-c3-clr) r g b / var(--_lqip-stop10)) 90%,
				transparent),
			radial-gradient(50% 75% at 16.67% 75%,
				var(--_lqip-c4-clr),
				rgb(from var(--_lqip-c4-clr) r g b / calc(100% - var(--_lqip-stop10))) 10%,
				rgb(from var(--_lqip-c4-clr) r g b / calc(100% - var(--_lqip-stop20))) 20%,
				rgb(from var(--_lqip-c4-clr) r g b / calc(100% - var(--_lqip-stop30))) 30%,
				rgb(from var(--_lqip-c4-clr) r g b / calc(100% - var(--_lqip-stop40))) 40%,
				rgb(from var(--_lqip-c4-clr) r g b / var(--_lqip-stop40)) 60%,
				rgb(from var(--_lqip-c4-clr) r g b / var(--_lqip-stop30)) 70%,
				rgb(from var(--_lqip-c4-clr) r g b / var(--_lqip-stop20)) 80%,
				rgb(from var(--_lqip-c4-clr) r g b / var(--_lqip-stop10)) 90%,
				transparent),
			radial-gradient(50% 75% at 50% 75%,
				var(--_lqip-c5-clr),
				rgb(from var(--_lqip-c5-clr) r g b / calc(100% - var(--_lqip-stop10))) 10%,
				rgb(from var(--_lqip-c5-clr) r g b / calc(100% - var(--_lqip-stop20))) 20%,
				rgb(from var(--_lqip-c5-clr) r g b / calc(100% - var(--_lqip-stop30))) 30%,
				rgb(from var(--_lqip-c5-clr) r g b / calc(100% - var(--_lqip-stop40))) 40%,
				rgb(from var(--_lqip-c5-clr) r g b / var(--_lqip-stop40)) 60%,
				rgb(from var(--_lqip-c5-clr) r g b / var(--_lqip-stop30)) 70%,
				rgb(from var(--_lqip-c5-clr) r g b / var(--_lqip-stop20)) 80%,
				rgb(from var(--_lqip-c5-clr) r g b / var(--_lqip-stop10)) 90%,
				transparent),
			radial-gradient(50% 75% at 83.33% 75%,
				var(--_lqip-c6-clr),
				rgb(from var(--_lqip-c6-clr) r g b / calc(100% - var(--_lqip-stop10))) 10%,
				rgb(from var(--_lqip-c6-clr) r g b / calc(100% - var(--_lqip-stop20))) 20%,
				rgb(from var(--_lqip-c6-clr) r g b / calc(100% - var(--_lqip-stop30))) 30%,
				rgb(from var(--_lqip-c6-clr) r g b / calc(100% - var(--_lqip-stop40))) 40%,
				rgb(from var(--_lqip-c6-clr) r g b / var(--_lqip-stop40)) 60%,
				rgb(from var(--_lqip-c6-clr) r g b / var(--_lqip-stop30)) 70%,
				rgb(from var(--_lqip-c6-clr) r g b / var(--_lqip-stop20)) 80%,
				rgb(from var(--_lqip-c6-clr) r g b / var(--_lqip-stop10)) 90%,
				transparent),
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
	   underneath our own error overlay. display:none also drops the element
	   from the accessibility tree, so its alt isn't announced alongside the
	   error overlay's role=img / aria-label (which already carries the same
	   text). Box dimensions are preserved by aspect-ratio on .image__media,
	   not by the img itself. Listeners stay attached — only DOM removal
	   detaches them — so the next src change still triggers load/error. */

	.image__img--errored {
		display: none;
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

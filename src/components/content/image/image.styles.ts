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

	@media (forced-colors: active) {
		.image__media {
			border: 1px solid CanvasText;
		}
	}
`;

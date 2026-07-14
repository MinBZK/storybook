import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const avatarStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_size: 100%;
		--_corner-radius: var(--primitives-corner-radius-full);
		--_background-color: light-dark(var(--primitives-color-neutral-100), var(--primitives-color-neutral-300));
		--_content-color: var(--primitives-color-neutral-800);
		--_border-width: var(--primitives-border-width-regular);
		--_icon-scale: 0.6;
		--_initials-scale: 0.55;
		--_initials-fit: 1;
		--_content-scale: 1;

		${inheritedTextReset}
		display: inline-flex;
		width: var(--_size);
		aspect-ratio: 1;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([hidden]) {
		display: none;
	}

	:host([type="organization"]) {
		--_corner-radius: var(--primitives-corner-radius-md);
	}

	/* Fill tracks the shared content-colour channel (set by list-item / table /
	   menu), falling back to currentColor for buttons / standalone — mirrors
	   nldd-activity-indicator. The fill (not the text) colour must resolve here,
	   so .avatar keeps its inherited colour and the contrast text lives on the
	   child elements. */
	:host([color="inherit"]) {
		--_background-color: var(--context-content-color, currentColor);
		--_content-color: var(--semantics-content-contrast-color);
	}

	/* Shrink the visible disc to 5/6 of the host (centred), so the avatar lines
	   up optically with an icon on the same grid (an icon glyph has built-in
	   padding). The host keeps the grid cell size. */
	:host([icon-aligned]) {
		--_content-scale: calc(5 / 6);
	}


	/* # Size — spacer-aligned, mirrors nldd-icon */

	:host([size="16"]) { --_size: var(--primitives-space-16); }
	:host([size="20"]) { --_size: var(--primitives-space-20); }
	:host([size="24"]) { --_size: var(--primitives-space-24); }
	:host([size="28"]) { --_size: var(--primitives-space-28); }
	:host([size="32"]) { --_size: var(--primitives-space-32); }
	:host([size="40"]) { --_size: var(--primitives-space-40); }
	:host([size="44"]) { --_size: var(--primitives-space-44); }
	:host([size="48"]) { --_size: var(--primitives-space-48); }
	:host([size="56"]) { --_size: var(--primitives-space-56); }
	:host([size="64"]) { --_size: var(--primitives-space-64); }
	:host([size="80"]) { --_size: var(--primitives-space-80); }
	:host([size="96"]) { --_size: var(--primitives-space-96); }


	/* # Avatar */

	/* container-type: inline-size lets the initials and icon scale (cqi) with the
	   avatar's rendered width, so a fixed size and a filled (100%) size both work.
	   inline-size (not size) leaves the block axis free, so aspect-ratio can drive
	   the height without the box collapsing in flex/grid. color stays inherited
	   here so --_background-color's currentColor (color="inherit") resolves to the
	   surrounding colour, not the content colour. */
	.avatar {
		container-type: inline-size;
		display: flex;
		width: calc(100% * var(--_content-scale));
		height: calc(100% * var(--_content-scale));
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
	}


	/* # Content */

	.avatar__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.avatar__initials {
		font-family: var(--primitives-font-family-body);
		font-weight: 600;
		font-size: calc(var(--_initials-scale) * 100cqi);
		line-height: 1;
		color: var(--_content-color);
		/* fit-initials shrinks wide initials via this factor (measured in JS);
		   transform (not font-size) so scrollWidth stays the natural width. */
		transform: scale(var(--_initials-fit));
		user-select: none;
	}

	.avatar__icon {
		width: calc(var(--_icon-scale) * 100cqi);
		color: var(--_content-color);
	}

	@media (forced-colors: active) {
		.avatar {
			border: var(--_border-width) solid CanvasText;
		}
	}
`;

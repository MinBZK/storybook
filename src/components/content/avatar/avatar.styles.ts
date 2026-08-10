import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

export const avatarStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_size: 100%;
		--_corner-radius: var(--components-avatar-corner-radius);
		--_background-color: var(--components-avatar-background-color);
		--_content-color: var(--components-avatar-content-color);
		--_icon-scale: 0.6;
		--_initials-scale: 0.52;
		--_initials-font-weight: 500;
		--_initials-fit: 1;
		--_initials-optical-shift: 0.02em;
		--_shape-scale: 1;

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
		--_corner-radius: var(--components-avatar-organization-corner-radius);
	}

	/* Fill tracks the shared content-color channel (set by list-item / table /
	   menu), falling back to currentColor for buttons / standalone — mirrors
	   nldd-activity-indicator. The fill (not the text) color must resolve here,
	   so .avatar keeps its inherited color and the contrast text lives on the
	   child elements. */
	:host([color="inherit"]) {
		--_background-color: var(--context-content-color, currentColor);
		--_content-color: var(--semantics-content-contrast-color);
	}

	/* Shrink the visible shape to 5/6 of the host (centered), so the avatar lines
	   up optically with an icon on the same grid (an icon glyph has built-in
	   padding). The host keeps the grid cell size. */
	:host([icon-aligned]) {
		--_shape-scale: calc(5 / 6);
	}


	/* # Size — spacer-aligned, mirrors nldd-icon */

	:host([size="full"]) { --_size: 100%; }
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
	   surrounding color, not the content color. */
	.avatar {
		container-type: inline-size;
		display: flex;
		width: calc(100% * var(--_shape-scale));
		height: calc(100% * var(--_shape-scale));
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		-webkit-user-select: none;
		user-select: none;
	}

	/* # Interactive — the shape itself is the link or button */

	.avatar--interactive {
		padding: 0;
		border: none;
		cursor: var(--semantics-controls-link-cursor);
		color: inherit;
		font: inherit;
		text-decoration: none;
	}

	.avatar--interactive:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
	}

	/* Darkening the image or fill reads as "this reacts" on a shape too small
	   for a border or shadow to register. */
	.avatar--interactive:hover .avatar__image,
	.avatar--interactive:active .avatar__image {
		opacity: 0.85;
	}

	.avatar--interactive:hover {
		filter: brightness(0.95);
	}

	.avatar--interactive:active {
		filter: brightness(0.9);
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
		font-weight: var(--_initials-font-weight);
		font-size: calc(var(--_initials-scale) * 100cqi);
		line-height: 1;
		color: var(--_content-color);
		/* fit-initials shrinks wide initials via this factor (measured in JS);
		   transform (not font-size) so scrollWidth stays the natural width. The
		   optical shift rides along in the same transform — scale is applied
		   first, so the translate stays in unscaled em. */
		transform: translateY(var(--_initials-optical-shift)) scale(var(--_initials-fit));
	}

	.avatar__icon {
		width: calc(var(--_icon-scale) * 100cqi);
		color: var(--_content-color);
	}

	@media (forced-colors: active) {
		.avatar {
			border: var(--primitives-border-width-regular) solid CanvasText;
		}
	}
`;

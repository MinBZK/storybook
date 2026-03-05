import { css } from 'lit';

export const menuStyles = css`
	/* # host */

	:host {
		display: block;
		padding: 0;
		border: none;
		background: transparent;
		margin: 0;
		position: absolute;
		overflow: visible;
	}

	:host(:not(:popover-open)) {
		display: none;
	}

	/* # menu */

	.menu {
		display: flex;
		flex-direction: column;
		padding: var(--primitives-space-8);
		background: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--primitives-box-shadows-level-5);
		box-sizing: border-box;
		width: var(--primitives-area-280);

		@media (pointer: fine) {
			padding: var(--primitives-space-6);
		}
	}
`;

export const menuItemStyles = css`
	/* # host */

	:host {
		display: block;
		font-family: var(--rr-font-family-body);
	}

	:host([hidden]) {
		display: none;
	}

	/* # menu__item */

	.menu__item {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8);
		box-sizing: border-box;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: transparent;
		text-align: start;
		appearance: none;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);

		@media (pointer: fine) {
			min-height: var(--semantics-controls-sm-min-size);
			padding: var(--primitives-space-4) var(--primitives-space-8);
			border-radius: var(--semantics-controls-sm-corner-radius);
		}
	}

	/* # hover */

	.menu__item:hover:not(:disabled) {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		color: var(--components-menu-item-is-highlighted-content-color);
		--semantics-content-secondary-color: var(--components-menu-item-is-highlighted-content-color);
	}

	/* # focus */

	.menu__item:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* # disabled */

	:host([disabled]) .menu__item {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	/* # reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.menu__item {
			transition: none;
		}
	}

	/* # forced-colors */

	@media (forced-colors: active) {
		.menu__item:hover {
			background-color: Highlight;
			color: HighlightText;
		}

		.menu__item:focus-visible {
			outline: 2px solid CanvasText;
		}
	}
`;

export const menuDividerStyles = css`
	/* # host */

	:host {
		display: block;
		padding: var(--primitives-space-4) 0;
	}

	:host([hidden]) {
		display: none;
	}

	/* # menu__divider */

	.menu__divider {
		height: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
	}
`;

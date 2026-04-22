import { css } from 'lit';

export const menuStyles = css`


	/* # Host */

	:host {
		display: block;
		padding: 0;
		border: none;
		background: transparent;
		margin: 0;
		position: absolute;
		overflow: visible;
		--_viewport-margin: 16px;
		--_menu-width: var(--primitives-area-280);
		--_menu-max-height: calc(infinity * 1px);
		--_menu-max-items: 9999;
		--_menu-item-size: var(--semantics-controls-md-min-size);
		--_menu-padding: var(--primitives-space-8);
		@media (pointer: fine) {
			--_menu-item-size: var(--semantics-controls-sm-min-size);
			--_menu-padding: var(--primitives-space-6);
		}
		-webkit-tap-highlight-color: transparent;
	}

	:host(:not(:popover-open)) {
		display: none;
	}


	/* # Block */

	.menu {
		display: flex;
		flex-direction: column;
		padding: var(--_menu-padding);
		background: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--components-menu-box-shadow);
		box-sizing: border-box;
		width: var(--_menu-width);
		max-height: min(
			var(--_menu-max-height),
			calc(var(--_menu-max-items) * var(--_menu-item-size) + var(--_menu-padding) * 2)
		);
		overflow-y: auto;
		outline: none;
	}

	.menu:focus-visible:not(.is-pointer-focus) {
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--components-menu-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Empty */

	.menu__empty {
		padding: var(--primitives-space-8);
	}
`;

export const menuItemStyles = css`


	/* # Host */

	:host {
		display: block;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.menu__item {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		min-height: var(--_menu-item-size);
		padding: var(--primitives-space-8);
		box-sizing: border-box;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: transparent;
		text-align: start;
		appearance: none;
		@media (pointer: fine) {
			padding: var(--primitives-space-4) var(--primitives-space-8);
			border-radius: var(--semantics-controls-sm-corner-radius);
		}
	}


	/* # Highlighted */

	:host([highlighted]) .menu__item {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-menu-item-is-highlighted-content-color);
		--context-cell-content-secondary-color: var(--components-menu-item-is-highlighted-content-color);
	}


	/* # Focus */

	.menu__item:focus-visible {
		position: relative;
		z-index: 1;
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Disabled */

	:host([disabled]) .menu__item {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.menu__item {
			transition: none;
		}
	}


	/* # Forced colors */

	@media (forced-colors: active) {
		:host([highlighted]) .menu__item {
			background-color: Highlight;
			color: HighlightText;
		}

		.menu__item:focus-visible {
			outline: 2px solid CanvasText;
		}
	}
`;

export const menuDividerStyles = css`


	/* # Host */

	:host {
		display: block;
		padding: var(--primitives-space-4) 0;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Divider */

	.menu__divider {
		height: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
	}
`;

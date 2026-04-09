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


	/* # Menu */

	.menu {
		display: flex;
		flex-direction: column;
		padding: var(--_menu-padding);
		background: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--primitives-box-shadows-level-5);
		box-sizing: border-box;
		width: var(--_menu-width);
		max-height: min(
			var(--_menu-max-height),
			calc(var(--_menu-max-items) * var(--_menu-item-size) + var(--_menu-padding) * 2)
		);
		overflow-y: auto;
	}


	/* # Empty text */

	.menu__empty-text {
		padding: var(--primitives-space-8);
		color: var(--semantics-content-secondary-color);
		font: var(--primitives-font-body-md-regular-tight);
		text-align: center;
	}
`;

export const menuItemStyles = css`
	/* # Host */

	:host {
		display: block;
		font-family: var(--ndd-font-family-body);
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
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);
		@media (pointer: fine) {
			padding: var(--primitives-space-4) var(--primitives-space-8);
			border-radius: var(--semantics-controls-sm-corner-radius);
		}
	}


	/* # Highlighted */

	:host([highlighted]) .menu__item {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		color: var(--components-menu-item-is-highlighted-content-color);
		--semantics-content-secondary-color: var(--components-menu-item-is-highlighted-content-color);
	}


	/* # Focus */

	.menu__item:focus-visible {
		position: relative;
		z-index: 1;
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
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

import { css } from 'lit';

export const menuStyles = css`


	/* # Host */

	:host {
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

		display: block;
		padding: 0;
		border: none;
		background: transparent;
		margin: 0;
		position: absolute;
		overflow: visible;
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
		outline-offset: var(--semantics-focus-ring-outline-offset);
	}


	/* # Empty */

	.menu__empty {
		padding: var(--primitives-space-8);
	}


	/* # Back button — drill-in mode header */

	.menu__back {
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
		--context-cell-content-color: var(--semantics-content-secondary-color);

		@media (pointer: fine) {
			padding: var(--primitives-space-4) var(--primitives-space-8);
			border-radius: var(--semantics-controls-sm-corner-radius);
		}
	}

	.menu__back:hover,
	.menu__back:active {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-menu-item-is-highlighted-content-color);
	}

	.menu__back:focus-visible {
		position: relative;
		z-index: 1;
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.menu__back-divider {
		height: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
		margin: var(--primitives-space-4) 0;
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


	/* # Open submenu opener
	 *
	 * Lighter, neutral background while the opener's submenu is open and the
	 * cursor has moved into the submenu. The currently-active item is the
	 * one in the submenu; the opener just shows "this branch is active".
	 * macOS-style: subtle, not competing with the highlight.
	 *
	 * When the cursor moves back over the opener (or it's keyboard-focused),
	 * the highlighted/hover rule below upgrades it to the bold accent. */

	.menu__item[aria-expanded="true"] {
		background-color: var(--components-menu-item-is-open-background-color);
		--context-cell-content-color: var(--components-menu-item-is-open-content-color);
		--context-cell-content-secondary-color: var(--components-menu-item-is-open-content-color);
	}


	/* # Highlighted or pressed
	 *
	 * [highlighted] always upgrades to the bold accent — including on openers
	 * with an open submenu. The menu component keeps [highlighted] in sync
	 * with where the user is logically navigating (set by mouseenter,
	 * keyboard nav, or the safe-triangle while in transit; cleared on
	 * peer-hover, submenu-entry, mouseleave, submenu-close), so a stale
	 * highlighted attr on an opener shouldn't occur. The :hover branch
	 * additionally covers the case where the cursor sits directly on an
	 * open opener (since [highlighted] gets cleared at submenu-open time). */

	:host([highlighted]) .menu__item,
	.menu__item[aria-expanded="true"]:hover,
	.menu__item:active {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-menu-item-is-highlighted-content-color);
		--context-cell-content-secondary-color: var(--components-menu-item-is-highlighted-content-color);
	}


	/* # Focus */

	.menu__item:focus-visible {
		position: relative;
		z-index: 1;
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
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
		/* In forced-colors there's no neutral lighter palette, so mark the
		 * open opener with a 1px outline instead of a fill — visibly "active"
		 * without competing with the actual Highlight that lives in the
		 * submenu. The hovered/highlighted branch promotes it back to the
		 * full Highlight fill. */
		.menu__item[aria-expanded="true"] {
			outline: 1px solid CanvasText;
			outline-offset: -1px;
		}

		:host([highlighted]) .menu__item,
		.menu__item[aria-expanded="true"]:hover {
			background-color: Highlight;
			color: HighlightText;
			outline: none;
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

export const menuGroupStyles = css`


	/* # Host
	 *
	 * Renders an automatic divider above the group via border-top, except when
	 * the group is the first child of the menu (then no divider is needed).
	 * The padding-top below the divider provides generous breathing room above
	 * the title — paired with the tighter margin-bottom on the title itself
	 * this gives the "more space above than below" rhythm that visually binds
	 * the title to the items it labels rather than to whatever sits above.
	 */

	:host {
		display: block;
		border-top: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
		padding-top: var(--primitives-space-6);
		margin-top: var(--primitives-space-4);
	}

	:host(:first-child) {
		border-top: none;
		padding-top: var(--primitives-space-2);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Title */

	.menu-group__title {
		margin: 0;
		padding-top: 0;
		padding-right: var(--primitives-space-8);
		padding-bottom: var(--primitives-space-1);
		padding-left: var(--primitives-space-4);
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--semantics-content-secondary-color);
	}


	/* # Items wrapper */

	.menu-group__items {
		display: contents;
	}
`;

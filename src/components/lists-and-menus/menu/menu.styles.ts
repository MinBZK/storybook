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

		/* Press-flash colours for .menu__item:active:hover. Defined here on
		 * the menu host so they inherit across the shadow boundary into the
		 * slotted nldd-menu-item subtree (same channel as
		 * --context-cell-content-color). While a touch-scroll is in
		 * progress they're neutralised (see :host([scroll-active]) below)
		 * so a finger that started on an item and then panned doesn't
		 * leave it highlighted for the whole gesture. */
		--_item-press-bg: var(--components-menu-item-is-highlighted-background-color);
		--_item-press-fg: var(--components-menu-item-is-highlighted-content-color);

		@media (pointer: fine) {
			--_menu-item-size: var(--semantics-controls-sm-min-size);
			--_menu-padding: var(--primitives-space-6);
		}

		display: block;
		position: absolute;
		margin: 0;
		border: none;
		background: transparent;
		overflow: visible;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
	}

	:host(:not(:popover-open)) {
		display: none;
	}

	/* Touch-scroll in progress (set by nldd-menu's touch handlers): kill
	 * the item press-flash. transparent bg + initial content colour
	 * (guaranteed-invalid, so cells fall back to their default) means the
	 * still-matching .menu__item:active:hover rule paints nothing. */
	:host([scroll-active]) {
		--_item-press-bg: transparent;
		--_item-press-fg: initial;
	}


	/* # Block */

	.menu {
		display: flex;
		box-sizing: border-box;
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--components-menu-box-shadow);
		background: var(--semantics-surfaces-background-color);
		width: var(--_menu-width);
		padding: var(--_menu-padding);
		flex-direction: column;
		max-height: min(
			var(--_menu-max-height),
			calc(var(--_menu-max-items) * var(--_menu-item-size) + var(--_menu-padding) * 2)
		);
		outline: none;
		overflow-y: auto;
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

	.menu__back-button {
		display: flex;
		box-sizing: border-box;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: transparent;
		width: 100%;
		min-height: var(--_menu-item-size);
		padding: var(--primitives-space-8);
		flex-direction: row;
		align-items: center;
		text-align: start;
		appearance: none;
		--context-cell-content-color: var(--semantics-content-secondary-color);

		@media (pointer: fine) {
			border-radius: var(--semantics-controls-sm-corner-radius);
			padding: var(--primitives-space-4) var(--primitives-space-8);
		}
	}

	/* Hover gated behind a real hover-capable pointer: touch emulates a
	 * sticky :hover on the last-tapped point, so opening a drill-in
	 * submenu with the back button under the finger would otherwise
	 * leave it highlighted. :active:hover gives press feedback without
	 * the sticky-hover trap (the synthetic hover never coincides with
	 * an active press on the back button itself). Mirrors the
	 * .menu__item:active:hover pattern. */
	@media (hover: hover) {
		.menu__back-button:hover {
			background-color: var(--components-menu-item-is-highlighted-background-color);
			--context-cell-content-color: var(--components-menu-item-is-highlighted-content-color);
		}
	}

	.menu__back-button:active:hover {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-menu-item-is-highlighted-content-color);
	}

	.menu__back-button:focus-visible {
		position: relative;
		z-index: 1;
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.menu__back-button-divider {
		margin: var(--primitives-space-4) 0;
		background-color: var(--semantics-dividers-color);
		height: var(--semantics-dividers-thickness);
	}


	/* # Live region — drill-in view-change announcements (WCAG 4.1.3)
	 *
	 * Sibling of .menu (not a child): .menu carries role="menu", whose
	 * required-owned children are menuitem/group/separator only — a
	 * role="status" node inside it would violate that. Visually hidden
	 * but kept in the a11y tree so screen readers announce the swapped
	 * view; out of the focus order (no tabindex). */
	.menu__live-region {
		position: absolute;
		margin: -1px;
		border: 0;
		width: 1px;
		height: 1px;
		overflow: hidden;
		padding: 0;
		white-space: nowrap;
		clip-path: inset(50%);
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
		box-sizing: border-box;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: transparent;
		width: 100%;
		min-height: var(--_menu-item-size);
		padding: var(--primitives-space-8);
		flex-direction: row;
		align-items: center;
		text-align: start;
		appearance: none;
		@media (pointer: fine) {
			border-radius: var(--semantics-controls-sm-corner-radius);
			padding: var(--primitives-space-4) var(--primitives-space-8);
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
		background-color: var(--components-menu-item-is-expanded-background-color);
		--context-cell-content-color: var(--components-menu-item-is-expanded-content-color);
		--context-cell-content-secondary-color: var(--components-menu-item-is-expanded-content-color);
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
	.menu__item[aria-expanded="true"]:hover {
		background-color: var(--components-menu-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-menu-item-is-highlighted-content-color);
		--context-cell-content-secondary-color: var(--components-menu-item-is-highlighted-content-color);
	}

	/* Press flash via host-inherited vars so a touch-scroll can neutralise
	 * it (see --_item-press-* / :host([scroll-active]) in menuStyles).
	 * On mouse these vars are the highlight colours, identical to the
	 * rule above. */
	.menu__item:active:hover {
		background-color: var(--_item-press-bg);
		--context-cell-content-color: var(--_item-press-fg);
		--context-cell-content-secondary-color: var(--_item-press-fg);
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


	@media (prefers-reduced-motion: reduce) {
		.menu__item {
			transition: none;
		}
	}

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
			outline: none;
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
		background-color: var(--semantics-dividers-color);
		height: var(--semantics-dividers-thickness);
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
		margin-top: var(--primitives-space-4);
		border-top: var(--semantics-dividers-thickness) solid var(--semantics-dividers-color);
		padding-top: var(--primitives-space-6);
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


	/* # Items wrapper
	 *
	 * display: block keeps the role="group" wrapper as a real box so the
	 * accessibility tree reliably exposes role + aria-labelledby across all
	 * supported engines (display: contents has historical a11y-tree bugs in
	 * older WebKit/Chromium that drop these). The extra container has no
	 * visual impact: .menu is a flex column, and a block child stacks the
	 * group's items the same as if they were direct children.
	 */
	.menu-group__items {
		display: block;
	}
`;

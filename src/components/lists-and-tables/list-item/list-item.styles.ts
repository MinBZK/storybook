import { css } from 'lit';

export const listItemStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_background-color: transparent;
		--_z-index-content: 0;
		--_z-index-focus: 1;
		--_z-index-indicator: calc(var(--_z-index-content) - 1);
		--_focus-outline-offset: 6px;

		--context-list-item-padding-block: var(--components-list-item-md-padding-block);

		container-type: inline-size;
		display: block;
		width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([size="sm"]) {
		--context-list-item-padding-block: var(--components-list-item-sm-padding-block);
	}

	:host([hidden]) {
		display: none;
	}

	:host(:focus-within) {
		position: relative;
		z-index: var(--_z-index-focus);
	}

	:host(.is-dragging) {
		opacity: var(--semantics-controls-is-dragging-opacity);
	}

	:host(.is-dragging-pointer) {
		display: none;
	}

	:host(:not([reorderable])) ::slotted([reorderable-only]) {
		display: none;
	}

	:host([reorderable]) ::slotted([reorderable-only]) {
		cursor: grab;
		touch-action: none;
	}

	:host(.is-dragging) ::slotted([reorderable-only]) {
		cursor: grabbing;
	}


	/* # Block */

	.list-item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		width: 100%;
		min-height: var(--semantics-controls-md-min-size);
		flex-direction: row;
		align-items: stretch;
		isolation: isolate;
	}

	:host([size="sm"]) .list-item {
		min-height: var(--semantics-controls-sm-min-size);
	}


	/* # Action */

	.list-item__action {
		display: flex;
		margin: 0;
		outline: none;
		border: none;
		background: none;
		width: 100%;
		padding: 0;
		flex-direction: row;
		align-items: stretch;
		text-align: start;
		color: inherit;
		text-decoration: none;
	}

	a.list-item__action {
		cursor: var(--semantics-controls-link-cursor);
	}

	.list-item__opens-in-new-tab-hint {
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


	/* # Indicator */

	/* The selection / state fill. Non-interactive items carry it on .list-item
	   (driven only by :host([selected])); interactive items carry it on
	   .list-item__action (and respond to hover / focus / press below). */
	.list-item:not(:has(.list-item__action))::before,
	.list-item__action::before {
		content: '';
		display: block;
		position: absolute;
		inset-block: 0;
		inset-inline: calc(-1 * var(--components-list-item-indicator-inline-inset));
		z-index: var(--_z-index-indicator);
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--_background-color);
		pointer-events: none;
	}

	:host([selected]) {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-content-color: var(--components-list-item-is-selected-content-color);
		--context-content-secondary-color: var(--components-list-item-is-selected-content-color);
	}

	/* hover only on hover-capable devices: avoids touch-scroll flashing the
	   hover state on the row under the finger */
	@media (hover: hover) {
		.list-item__action:hover {
			--_background-color: var(--components-list-item-is-hovered-background-color);
			--context-content-color: var(--components-list-item-is-hovered-content-color);
			--context-content-secondary-color: var(--components-list-item-is-hovered-content-color);
		}

		:host([selected]) .list-item__action:hover {
			--_background-color: var(--components-list-item-is-selected-background-color);
			--context-content-color: var(--components-list-item-is-selected-content-color);
			--context-content-secondary-color: var(--components-list-item-is-selected-content-color);
		}

		:host([selected]) .list-item__action:focus:hover {
			--_background-color: var(--components-list-item-is-highlighted-background-color);
			--context-content-color: var(--components-list-item-is-highlighted-content-color);
			--context-content-secondary-color: var(--components-list-item-is-highlighted-content-color);
		}
	}

	/* Press feedback — works on touch where :hover doesn't. Same visual as
	   :hover (the gated mouse rule above) so it reads consistently across input
	   modes. JS-driven (.is-pressed) rather than :active so a touch that turns
	   into a scroll clears the press (pointercancel) instead of flashing it. */
	.list-item__action.is-pressed {
		--_background-color: var(--components-list-item-is-hovered-background-color);
		--context-content-color: var(--components-list-item-is-hovered-content-color);
		--context-content-secondary-color: var(--components-list-item-is-hovered-content-color);
	}

	:host([selected]) .list-item__action {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-content-color: var(--components-list-item-is-selected-content-color);
		--context-content-secondary-color: var(--components-list-item-is-selected-content-color);
	}

	/* Highlight accent — the strongest fill. Shown for a selected item that is
	   pressed or focused, for the listbox active descendant (.is-highlighted —
	   the option the search input's aria-activedescendant points at), and for a
	   selected active descendant (.is-highlighted on the action, to outweigh the
	   selected fill). The hover+focus variant sits in the @media block above. */
	:host([selected]) .list-item__action.is-pressed,
	:host([selected]) .list-item__action:focus,
	.list-item.is-highlighted,
	:host([selected]) .list-item.is-highlighted .list-item__action {
		--_background-color: var(--components-list-item-is-highlighted-background-color);
		--context-content-color: var(--components-list-item-is-highlighted-content-color);
		--context-content-secondary-color: var(--components-list-item-is-highlighted-content-color);
	}


	/* # Focus */

	.list-item__action:focus-visible:not(.is-pointer-focus)::after {
		content: '';
		display: block;
		position: absolute;
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
		pointer-events: none;
	}

	:host(:not(.is-boxed)) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		inset-block: 0;
		inset-inline: calc(-1 * var(--components-list-item-indicator-inline-inset));
		border-radius: var(--components-list-item-indicator-corner-radius);
	}

	:host(.is-boxed) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		inset: var(--_focus-outline-offset);
	}

	:host(.is-boxed:first-child) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		border-top-left-radius: calc(var(--components-list-corner-radius) - var(--_focus-outline-offset));
		border-top-right-radius: calc(var(--components-list-corner-radius) - var(--_focus-outline-offset));
	}

	:host(.is-boxed:last-child) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		border-bottom-left-radius: calc(var(--components-list-corner-radius) - var(--_focus-outline-offset));
		border-bottom-right-radius: calc(var(--components-list-corner-radius) - var(--_focus-outline-offset));
	}


	/* # Boxed indicator + first/last corners
	   In a box the rows fill the frame edge-to-edge, so the indicator drops its
	   outward inline bleed and pill radius (inset-inline / border-radius 0).
	   Without this, overflow-x: hidden on .list__items clips the bled-out rounded
	   corners back to a square edge. The first/last VISIBLE row then rounds its
	   outer corners to the box radius, so the fill follows the frame (and bounce /
	   overscroll, where the rounded clip can leak, shows rounded rows). Visible-
	   aware via .is-first / .is-last (set by the list), so it tracks the filtered
	   set in a listbox. */

	:host(.is-boxed) .list-item__action::before,
	:host(.is-boxed) .list-item:not(:has(.list-item__action))::before {
		inset-inline: 0;
		border-radius: 0;
	}

	:host(.is-boxed.is-first) .list-item__action::before,
	:host(.is-boxed.is-first) .list-item:not(:has(.list-item__action))::before {
		border-top-left-radius: var(--components-list-corner-radius);
		border-top-right-radius: var(--components-list-corner-radius);
	}

	:host(.is-boxed.is-last) .list-item__action::before,
	:host(.is-boxed.is-last) .list-item:not(:has(.list-item__action))::before {
		border-bottom-left-radius: var(--components-list-corner-radius);
		border-bottom-right-radius: var(--components-list-corner-radius);
	}


	/* # Start & end area */

	.list-item__start-area,
	.list-item__end-area {
		display: none;
		position: relative;
		z-index: var(--_z-index-content);
		padding-block: var(--context-list-item-padding-block);
		flex-direction: row;
		flex-shrink: 0;
		align-items: center;
	}

	.list-item__start-area.is-visible,
	.list-item__end-area.is-visible {
		display: flex;
	}


	/* # Main area */

	.list-item__main-area {
		display: flex;
		position: relative;
		z-index: var(--_z-index-content);
		min-width: 0;
		padding-block: var(--context-list-item-padding-block);
		flex-direction: row;
		flex-grow: 1;
		align-items: center;
	}


	/* # Divider */

	.list-item__divider {
		display: var(--context-list-divider-display, block);
		position: absolute;
		inset-block-end: 0;
		inset-inline: 0;
		background-color: var(--semantics-dividers-color);
		height: var(--semantics-dividers-thickness);
	}

	:host([selected]) .list-item__divider,
	:host(.is-boxed.is-last) .list-item__divider,
	.list-item.is-highlighted .list-item__divider {
		display: none;
	}
`;

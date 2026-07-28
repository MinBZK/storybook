import { css } from 'lit';

export const listItemStyles = css`
	:host {
		box-sizing: border-box;
	}



	:host {
		--_background-color: transparent;
		--_content-z-index: 0;
		--_focus-z-index: 1;
		--_indicator-z-index: calc(var(--_content-z-index) - 1);
		/* Set from JS by the divider-start/divider-end markers; initial keeps
		   them guaranteed-invalid so the var() fallbacks below apply. */
		--_divider-inset-start: initial;
		--_divider-inset-end: initial;

		--context-list-item-size: var(--semantics-controls-md-min-size);
		--context-cell-padding-block: var(--components-list-item-md-padding-block);
		container-type: inline-size;
		display: block;
		width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([size="sm"]) {
		--context-cell-padding-block: var(--components-list-item-sm-padding-block);
		--context-list-item-size: var(--semantics-controls-sm-min-size);
	}

	/* An interactive row widens by the indicator inset and pads the block back,
	   so the content stays on the grid while the fill covers the wider box. */
	:host(.is-interactive) {
		/* Not the host's 100%: a width plus negative margins is over-constrained
		   in block layout, so the row would shift instead of widen. */
		width: auto;
		margin-inline: calc(-1 * var(--components-list-item-indicator-inline-inset));
	}

	:host(.is-interactive) .list-item {
		padding-inline: var(--components-list-item-indicator-inline-inset);
	}

	:host(.is-interactive) .list-item:has(> .list-item__action) {
		padding-inline: 0;
	}

	/* A segmented action at a row edge already owns the padding for that side,
	   so the row drops its own there. Mid-row it claims nothing. */
	:host(.is-interactive.has-leading-action) .list-item {
		padding-inline-start: 0;
	}

	:host(.is-interactive.has-trailing-action) .list-item {
		padding-inline-end: 0;
	}

	:host([hidden]) {
		display: none;
	}

	:host(:focus-within) {
		position: relative;
		z-index: var(--_focus-z-index);
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



	/* The row reserves the divider's line below itself, rather than the host
	   doing it: on a branch the children group follows the row inside the host,
	   so a margin on the host would land after the whole subtree — leaving the
	   divider to overlap the first child and an extra line's worth of space
	   under the last one. */
	.list-item {
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin-block-end: var(--semantics-dividers-thickness);
		width: 100%;
		min-height: var(--context-list-item-size);
		flex-direction: row;
		align-items: stretch;
		isolation: isolate;
	}



	.list-item__action {
		box-sizing: border-box;
		display: flex;
		margin: 0;
		outline: none;
		border: none;
		background: none;
		width: 100%;
		padding: 0;
		padding-inline: var(--components-list-item-indicator-inline-inset);
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



	/* The fill always covers the widened geometry: an interactive row is already
	   widened, a plain row bleeds outward by the same amount. It sits on the
	   control when the row is one, so hover / focus / press can drive it. */
	.list-item:not(:has(.list-item__action))::before,
	.list-item__action::before {
		content: '';
		display: block;
		position: absolute;
		inset-block: 0;
		inset-inline: calc(-1 * var(--components-list-item-indicator-inline-inset));
		z-index: var(--_indicator-z-index);
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--_background-color);
		pointer-events: none;
	}

	:host(.is-interactive) .list-item:not(:has(.list-item__action))::before,
	.list-item__action::before {
		inset-inline: 0;
	}

	:host([selected]) {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-content-color: var(--components-list-item-is-selected-content-color);
		--context-content-secondary-color: var(--components-list-item-is-selected-content-color);
	}

	/* A checked checkbox action selects the whole row, so the fill runs across
	   the disclosure action too instead of stopping at its boundary. */
	.list-item.is-action-checked {
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

	/* JS-driven rather than :active, so a touch that turns into a scroll clears
	   the press (pointercancel) instead of flashing it. */
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

	/* The strongest fill: a selected row that is pressed or focused, and the
	   listbox active descendant (.is-highlighted, set by the list because focus
	   stays in the search input). */
	:host([selected]) .list-item__action.is-pressed,
	:host([selected]) .list-item__action:focus,
	.list-item.is-highlighted,
	:host([selected]) .list-item.is-highlighted .list-item__action {
		--_background-color: var(--components-list-item-is-highlighted-background-color);
		--context-content-color: var(--components-list-item-is-highlighted-content-color);
		--context-content-secondary-color: var(--components-list-item-is-highlighted-content-color);
	}



	/* The ring follows the real (widened) box: inset 0 against the row block,
	   painting outward like every other control. */
	.list-item__action:focus-visible:not(.is-pointer-focus)::after {
		content: '';
		display: block;
		position: absolute;
		inset: 0;
		border-radius: var(--components-list-item-indicator-corner-radius);
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
		pointer-events: none;
	}

	/* A row that is itself the disclosure control turns the chevron: mark its
	   icon-cell disclosure. The cell rotates, not the icon — ::slotted reaches a
	   direct child only, and rotating the cell turns the glyph in place. */
	::slotted(nldd-icon-cell[disclosure]) {
		rotate: 0deg;
		transition: rotate var(--primitives-transition-duration-fast) var(--primitives-transition-easing-default);
	}

	:host([expanded]) ::slotted(nldd-icon-cell[disclosure]) {
		rotate: 90deg;
	}

	@media (prefers-reduced-motion: reduce) {
		::slotted(nldd-icon-cell[disclosure]) {
			transition: none;
		}
	}


	/* Indentation is the consumer's. Re-inset a widened parent's strip, or each
	   nested level would bleed a further inset outward. */

	.list-item__children {
		display: block;
	}

	:host(.is-interactive) .list-item__children {
		padding-inline: var(--components-list-item-indicator-inline-inset);
	}

	.list-item__children[hidden] {
		display: none;
	}


	/* Content-wide by default; the divider-start/divider-end cell markers
	   override it through the measured --_divider-inset-* vars. */

	.list-item__divider {
		display: var(--context-list-divider-display, block);
		position: absolute;
		/* Hangs in the row's bottom margin: the boundary band belongs to the pair
		   of rows, not to either one. */
		inset-block-end: calc(-1 * var(--semantics-dividers-thickness));
		inset-inline: var(--_divider-inset-start, 0px) var(--_divider-inset-end, 0px);
		background-color: var(--semantics-dividers-color);
		height: var(--semantics-dividers-thickness);
	}

	:host(.is-interactive) .list-item__divider {
		inset-inline:
			var(--_divider-inset-start, var(--components-list-item-indicator-inline-inset))
			var(--_divider-inset-end, var(--components-list-item-indicator-inline-inset));
	}

	:host(.is-boxed.is-last) .list-item {
		margin-block-end: 0;
	}

	:host(.is-boxed.is-last) .list-item__divider,
	:host(.is-dragging) .list-item__divider,
	:host([data-nldd-clone]) .list-item__divider {
		display: none;
	}
`;

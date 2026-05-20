import { css } from 'lit';

export const listItemStyles = css`


	/* # Host */

	:host {
		--_background-color: transparent;
		--_z-index-content: 0;
		--_z-index-focus: 1;
		--_z-index-indicator: calc(var(--_z-index-content) - 1);
		--_focus-outline-offset: 6px;

		display: block;
		container-type: inline-size;
		container-name: list-item;
		width: 100%;
		-webkit-tap-highlight-color: transparent;
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


	/* # Indicator */

	/* Non-interactive: items without an inner action get the selection
	   indicator directly on .list-item, driven only by :host([selected]) */

	.list-item:not(:has(.list-item__action))::before {
		content: '';
		display: block;
		position: absolute;
		inset-block: 0;
		inset-inline: min(calc(var(--primitives-space-8) * -1), calc(var(--components-list-item-indicator-corner-radius) * -1));
		z-index: var(--_z-index-indicator);
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--_background-color);
		pointer-events: none;
	}

	:host([selected]) {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-cell-content-color: var(--components-list-item-is-selected-content-color);
	}

	/* Interactive: items with a link/button inner element; indicator responds
	   to hover and focus on top of the selected state */

	.list-item__action::before {
		content: '';
		display: block;
		position: absolute;
		inset-block: 0;
		inset-inline: min(calc(var(--primitives-space-8) * -1), calc(var(--components-list-item-indicator-corner-radius) * -1));
		z-index: var(--_z-index-indicator);
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--_background-color);
		pointer-events: none;
	}

	/* hover only on hover-capable devices: avoids touch-scroll flashing the
	   hover state on the row under the finger */
	@media (hover: hover) {
		.list-item__action:hover {
			--_background-color: var(--components-list-item-is-hovered-background-color);
			--context-cell-content-color: var(--components-list-item-is-hovered-content-color);
		}

		:host([selected]) .list-item__action:hover {
			--_background-color: var(--components-list-item-is-selected-background-color);
			--context-cell-content-color: var(--components-list-item-is-selected-content-color);
		}

		:host([selected]) .list-item__action:focus:hover {
			--_background-color: var(--components-list-item-is-highlighted-background-color);
			--context-cell-content-color: var(--components-list-item-is-highlighted-content-color);
		}
	}

	/* Press feedback — works on touch where :hover doesn't. Same visual as
	   :hover (the gated mouse rule above) so it reads consistently across
	   input modes. */
	.list-item__action:active {
		--_background-color: var(--components-list-item-is-hovered-background-color);
		--context-cell-content-color: var(--components-list-item-is-hovered-content-color);
	}

	:host([selected]) .list-item__action:active {
		--_background-color: var(--components-list-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-list-item-is-highlighted-content-color);
	}

	:host([selected]) .list-item__action {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-cell-content-color: var(--components-list-item-is-selected-content-color);
	}

	:host([selected]) .list-item__action:focus {
		--_background-color: var(--components-list-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-list-item-is-highlighted-content-color);
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
		inset-inline: min(calc(var(--primitives-space-8) * -1), calc(var(--components-list-item-indicator-corner-radius) * -1));
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


	/* # Start & end area */

	.list-item__start-area,
	.list-item__end-area {
		display: none;
		position: relative;
		z-index: var(--_z-index-content);
		padding-block: var(--components-list-item-md-padding-block);
		flex-direction: row;
		flex-shrink: 0;
		align-items: center;
	}

	.list-item__start-area.is-visible,
	.list-item__end-area.is-visible {
		display: flex;
	}

	:host([size="sm"]) .list-item__start-area,
	:host([size="sm"]) .list-item__end-area {
		padding-block: var(--components-list-item-sm-padding-block);
	}


	/* # Main area */

	.list-item__main-area {
		display: flex;
		position: relative;
		z-index: var(--_z-index-content);
		min-width: 0;
		padding-block: var(--components-list-item-md-padding-block);
		flex-direction: row;
		flex-grow: 1;
		align-items: center;
	}

	:host([size="sm"]) .list-item__main-area {
		padding-block: var(--components-list-item-sm-padding-block);
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
	:host(.is-boxed.is-last) .list-item__divider {
		display: none;
	}
`;

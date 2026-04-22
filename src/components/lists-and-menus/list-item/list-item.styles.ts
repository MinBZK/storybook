import { css } from 'lit';

export const listItemStyles = css`


	/* # Host */

	:host {
		display: block;
		width: 100%;
		-webkit-tap-highlight-color: transparent;
		container-type: inline-size;
		container-name: list-item;
		--_background-color: transparent;
		--_z-index-content: 0;
		--_z-index-focus: 1;
		--_z-index-indicator: calc(var(--_z-index-content) - 1);
		--_focus-outline-offset: 6px;
	}

	:host([hidden]) {
		display: none;
	}

	:host(:focus-within) {
		position: relative;
		z-index: var(--_z-index-focus);
	}

	:host(.is-dragging) {
		opacity: var(--components-list-item-is-dragging-opacity);
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
		min-height: var(--semantics-controls-md-min-size);
		flex-direction: row;
		align-items: stretch;
		position: relative;
		isolation: isolate;
		width: 100%;
	}

	:host([size='sm']) .list-item {
		min-height: var(--semantics-controls-sm-min-size);
	}


	/* # Action */

	.list-item__action {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		width: 100%;
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		text-align: start;
		text-decoration: none;
		color: inherit;
		outline: none;
	}

	a.list-item__action {
		cursor: var(--semantics-controls-link-cursor);
	}


	/* ## Indicator */

	.list-item__action::before {
		content: '';
		display: block;
		position: absolute;
		inset-block: 0;
		inset-inline: min(calc(var(--primitives-space-8) * -1), calc(var(--components-list-item-indicator-corner-radius) * -1));
		border-radius: var(--components-list-item-indicator-corner-radius);
		background-color: var(--_background-color);
		z-index: var(--_z-index-indicator);
		pointer-events: none;
	}

	/* # Content color context
	   Expose the current content color as a CSS custom property so slotted
	   cells can render with the matching color without knowing list-item state.
	   Order matters: selected and highlighted must win over hover. */

	.list-item__action:hover {
		--_background-color: var(--components-list-item-is-hovered-background-color);
		--context-cell-content-color: var(--components-list-item-is-hovered-content-color);
	}

	:host([selected]) .list-item__action {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-cell-content-color: var(--components-list-item-is-selected-content-color);
	}

	:host([selected]) .list-item__action:hover {
		--_background-color: var(--components-list-item-is-selected-background-color);
		--context-cell-content-color: var(--components-list-item-is-selected-content-color);
	}

	:host([highlighted]) .list-item__action,
	:host([selected]) .list-item__action:focus {
		--_background-color: var(--components-list-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-list-item-is-highlighted-content-color);
	}

	:host([highlighted]) .list-item__action:hover,
	:host([selected]) .list-item__action:focus:hover {
		--_background-color: var(--components-list-item-is-highlighted-background-color);
		--context-cell-content-color: var(--components-list-item-is-highlighted-content-color);
	}


	/* ## Focus */

	.list-item__action:focus-visible:not(.is-pointer-focus)::after {
		content: '';
		display: block;
		position: absolute;
		pointer-events: none;
		outline: var(--semantics-focus-ring-outline);
		box-shadow: var(--semantics-focus-ring-box-shadow);
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
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		position: relative;
		z-index: var(--_z-index-content);
		padding-block: var(--components-list-item-md-padding-block);
	}

	.list-item__start-area.is-visible,
	.list-item__end-area.is-visible {
		display: flex;
	}

	:host([size='sm']) .list-item__start-area,
	:host([size='sm']) .list-item__end-area {
		padding-block: var(--components-list-item-sm-padding-block);
	}


	/* # Main area */

	.list-item__main-area {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		min-width: 0;
		position: relative;
		z-index: var(--_z-index-content);
		padding-block: var(--components-list-item-md-padding-block);
	}

	:host([size='sm']) .list-item__main-area {
		padding-block: var(--components-list-item-sm-padding-block);
	}


	/* # Divider */

	.list-item__divider {
		display: var(--context-list-divider-display, block);
		position: absolute;
		inset-block-end: 0;
		inset-inline: 0;
		height: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
	}

	:host([selected]) .list-item__divider,
	:host([highlighted]) .list-item__divider,
	:host(.is-boxed.is-last) .list-item__divider {
		display: none;
	}
`;

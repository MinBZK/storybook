import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: block;
		width: 100%;
		-webkit-tap-highlight-color: transparent;
		--_z-index-content: 0;
		--_z-index-focus: 1;
		--_z-index-indicator: calc(var(--_z-index-content) - 1);
		--_focus-outline-offset: 6px;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Content color context
	   Expose the current content color as a CSS custom property so slotted
	   cells can render with the matching color without knowing list-item state.
	   Order matters: selected and highlighted must win over hover. */

	:host([type="button"]:hover),
	:host([href]:hover) {
		--context-list-item-content-color: var(--components-list-item-is-hovered-content-color);
	}

	:host([selected]),
	:host([selected][type="button"]:hover),
	:host([selected][href]:hover) {
		--context-list-item-content-color: var(--components-list-item-is-selected-content-color);
	}

	:host([highlighted]),
	:host([highlighted][type="button"]:hover),
	:host([highlighted][href]:hover),
	:host([selected]:focus-within),
	:host([selected]:focus-within[type="button"]:hover),
	:host([selected]:focus-within[href]:hover) {
		--context-list-item-content-color: var(--components-list-item-is-highlighted-content-color);
	}

	:host(:focus-within) {
		position: relative;
		z-index: var(--_z-index-focus);
	}


	/* ## Dragging */

	:host(.is-dragging) {
		opacity: var(--components-list-item-is-dragging-opacity);
	}

	:host(.is-dragging-pointer) {
		display: none;
	}

	:host(:not([reorderable])) ::slotted([draggable-only]) {
		display: none;
	}

	:host([reorderable]) ::slotted([draggable-only]) {
		cursor: grab;
		touch-action: none;
	}

	:host(.is-dragging) ::slotted([draggable-only]) {
		cursor: grabbing;
	}


	/* # List item */

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


	/* # Indicator */

	.list-item::before {
		content: '';
		display: none;
		position: absolute;
		inset-block: 0;
		inset-inline: min(calc(var(--primitives-space-8) * -1), calc(var(--components-list-item-indicator-corner-radius) * -1));
		border-radius: var(--components-list-item-indicator-corner-radius);
		z-index: var(--_z-index-indicator);
	}

	.list-item:has(.list-item__action:hover)::before {
		display: block;
		background-color: var(--components-list-item-is-hovered-background-color);
	}

	:host([selected]) .list-item::before {
		display: block;
		background-color: var(--components-list-item-is-selected-background-color);
	}

	:host([selected]) .list-item:has(.list-item__action:hover)::before {
		display: block;
		background-color: var(--components-list-item-is-selected-background-color);
	}

	:host([highlighted]) .list-item::before,
	:host([selected]:focus-within) .list-item::before {
		display: block;
		background-color: var(--components-list-item-is-highlighted-background-color);
	}

	:host([highlighted]) .list-item:has(.list-item__action:hover)::before,
	:host([selected]:focus-within) .list-item:has(.list-item__action:hover)::before {
		display: block;
		background-color: var(--components-list-item-is-highlighted-background-color);
	}

	/* # Focus */

	/* Boxed items use the ::after ring on the action; exclude them here to
	   avoid a double focus ring. */

	:host(:not(.is-boxed)) .list-item:has(.list-item__action:focus-visible:not(.is-pointer-focus))::before {
		display: block;
		outline: var(--semantics-focus-ring-outline);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host(.is-boxed) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		content: '';
		display: block;
		position: absolute;
		left: var(--_focus-outline-offset);
		top: var(--_focus-outline-offset);
		right: var(--_focus-outline-offset);
		bottom: var(--_focus-outline-offset);
		outline: var(--semantics-focus-ring-outline);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host(.is-boxed:first-child) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		border-radius: calc(var(--components-list-corner-radius) - var(--_focus-outline-offset)) calc(var(--components-list-corner-radius) - var(--_focus-outline-offset)) 0 0;
	}

	:host(.is-boxed:last-child) .list-item__action:focus-visible:not(.is-pointer-focus)::after {
		border-radius: 0 0 calc(var(--components-list-corner-radius) - var(--_focus-outline-offset)) calc(var(--components-list-corner-radius) - var(--_focus-outline-offset));
	}
`;

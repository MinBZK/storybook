import { css } from 'lit';

export const styles = css`
	/* # Host */

	:host {
		display: contents;
		--_z-index-content: 1;
		--_z-index-indicator: calc(var(--_z-index-content) - 1);
	}

	:host([hidden]) {
		display: none;
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
	}

	.list-item__action:focus-visible {
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		border-radius: var(--primitives-corner-radius-xxs);
	}

	:host(.is-boxed) .list-item__action:focus-visible {
		outline: none;
		box-shadow: none;
	}

	:host(.is-boxed) .list-item__action:focus-visible:after {
		content: '';
		display: block;
		position: absolute;
		left: var(--semantics-focus-ring-edge-thickness);
		top: var(--semantics-focus-ring-edge-thickness);
		right: var(--semantics-focus-ring-edge-thickness);
		bottom: var(--semantics-focus-ring-edge-thickness);
		border-radius: calc(var(--components-list-corner-radius) - var(--semantics-focus-ring-edge-thickness));
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
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
		position: absolute;
		inset-block-end: 0;
		inset-inline: 0;
		height: var(--semantics-dividers-thickness);
		background-color: var(--semantics-dividers-color);
	}

	:host([selected]) .list-item__divider,
	:host(.is-boxed.is-last) .list-item__divider {
		display: none;
	}


	/* # Indicator */

	.list-item__indicator {
		display: none;
		position: absolute;
		inset-block: 0;
		inset-inline: min(calc(var(--primitives-space-8) * -1), calc(var(--components-list-item-indicator-corner-radius) * -1));
		border-radius: var(--components-list-item-indicator-corner-radius);
		z-index: var(--_z-index-indicator);
	}

	:host([selected]) .list-item__indicator {
		display: block;
		background-color: var(--components-list-item-is-selected-background-color);
	}

	.list-item__action:hover .list-item__indicator {
		display: block;
		background-color: var(--components-list-item-is-hovered-background-color);
	}

	:host([selected]) .list-item__action:hover .list-item__indicator {
		background-color: var(--components-list-item-is-selected-background-color);
	}
`;

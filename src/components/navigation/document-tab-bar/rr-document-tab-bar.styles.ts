import { css } from 'lit';

export const documentTabBarStyles = css`

	/* # Host */

	:host {
		display: block;
		position: relative;
		--_drag-clone-top: 0px;
		--_drag-clone-left: 0px;
		--_drag-clone-width: 0px;
		--_drag-clone-height: 0px;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Document tab bar */

	.document-tab-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--primitives-space-8);
		padding: var(--primitives-space-8) var(--primitives-space-16);
		container-name: document-tab-bar;
		container-type: inline-size;
	}

	.document-tab-bar__items {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--primitives-space-8);
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
	}

	::slotted(rr-document-tab-bar-item) {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 100px;
	}

	::slotted(rr-document-tab-bar-item[hidden]) {
		display: none;
	}

	.document-tab-bar__items.is-measuring slot {
		flex-grow: 0;
	}

	.document-tab-bar__overflow {
		flex-grow: 0;
		flex-shrink: 0;
	}

	.document-tab-bar__overflow.is-hidden {
		display: none;
	}

	.document-tab-bar__end {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--primitives-space-8);
		flex-grow: 0;
		flex-shrink: 0;
	}


	/* # Focus */

	::slotted(rr-document-tab-bar-item:focus-within) {
		position: relative;
		z-index: 4;
	}


	/* # Drag states */

	::slotted(rr-document-tab-bar-item.is-dragging-pointer) {
		display: none;
	}

	::slotted(rr-document-tab-bar-item.is-dragging) {
		opacity: 0.5;
	}


	/* # Drag placeholder */

	::slotted(.rr-document-tab-bar-drag-placeholder) {
		box-sizing: border-box;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		pointer-events: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		height: var(--semantics-controls-md-min-size);
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 100px;
		opacity: 0.4;
	}


	/* # Drag clone */

	.document-tab-bar__drag-clone {
		position: absolute;
		top: var(--_drag-clone-top);
		left: var(--_drag-clone-left);
		width: var(--_drag-clone-width);
		height: var(--_drag-clone-height);
		display: flex;
		flex-direction: row;
		align-items: stretch;
		pointer-events: none;
		opacity: 0.95;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: var(--semantics-buttons-neutral-tinted-background-color);
		z-index: 100;
		overflow: hidden;
		cursor: grabbing;
	}


	/* # Announcers */

	.document-tab-bar__polite-announcer,
	.document-tab-bar__assertive-announcer {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

`;

export const documentTabBarItemStyles = css`

	/* # Host */

	:host {
		display: block;
		min-width: 0;
		container-type: inline-size;
		--_short-label-threshold: 200;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.document-tab-bar__item {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--primitives-space-6);
		padding-block: var(--primitives-space-6);
		padding-inline-start: var(--primitives-space-10);
		padding-inline-end: var(--primitives-space-6);
		height: var(--semantics-controls-md-min-size);
		width: 100%;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		box-sizing: border-box;
	}

	.document-tab-bar__item:hover {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
	}

	:host([selected]) .document-tab-bar__item {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	:host([selected]) .document-tab-bar__item:hover {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	:host([disabled]) .document-tab-bar__item {
		opacity: var(--primitives-opacity-disabled);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* ## Focus */

	.document-tab-bar__item:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Item title area */

	.document-tab-bar__item-label-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Item title */

	/* # Item label */

	.document-tab-bar__item-label {
		font: var(--components-document-tab-bar-tab-title-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-label {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__item-short-label {
		display: none;
		font: var(--components-document-tab-bar-tab-title-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-short-label {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	@container document-tab-bar (max-width: 200px) {
		.document-tab-bar__item-label {
			display: none;
		}

		.document-tab-bar__item-short-label {
			display: block;
		}
	}


	/* # Item supporting label */

	.document-tab-bar__item-supporting-label {
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-supporting-label {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__item-short-supporting-label {
		display: none;
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-short-supporting-label {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	@container document-tab-bar (max-width: 200px) {
		.document-tab-bar__item-supporting-label {
			display: none;
		}

		.document-tab-bar__item-short-supporting-label {
			display: block;
		}
	}


	/* # Item dismiss button */

	.document-tab-bar__item-dismiss-button {
		appearance: none;
		border: none;
		background: none;
		margin: 0;
		padding: var(--primitives-space-4);
		cursor: default;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--semantics-controls-sm-min-size);
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		flex-grow: 0;
		flex-shrink: 0;
	}

	.document-tab-bar__item-dismiss-button:hover {
		background-color: var(--primitives-color-neutral-200);
	}

	:host([selected]) .document-tab-bar__item-dismiss-button {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	:host([selected]) .document-tab-bar__item-dismiss-button:hover {
		background-color: var(--primitives-color-accent-700);
	}

	.document-tab-bar__item-dismiss-button:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Item dismiss icon */

	.document-tab-bar__item-dismiss-icon {
		display: flex;
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

`;

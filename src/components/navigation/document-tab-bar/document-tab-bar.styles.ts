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
		--_drag-clone-opacity: 0.95;
		--_drag-clone-z-index: 100;
		--_short-text-threshold: 200px;
		--_item-min-width: 100px;
		--_overflow-button-reserve: 52px; /* Used for overflowButtonReserve. Overflow button width + spacing */
		-webkit-tap-highlight-color: transparent;
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

	::slotted(ndd-document-tab-bar-item) {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: var(--_item-min-width);
	}

	::slotted(ndd-document-tab-bar-item[hidden]) {
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

	.document-tab-bar__end[hidden] {
		display: none;
	}


	/* # Focus */

	::slotted(ndd-document-tab-bar-item:focus-within) {
		position: relative;
		z-index: 4;
	}


	/* # Drag states */

	::slotted(ndd-document-tab-bar-item.is-dragging) {
		display: none;
	}


	/* # Drag placeholder */

	::slotted(.ndd-document-tab-bar-drag-placeholder) {
		box-sizing: border-box;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		pointer-events: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		height: var(--semantics-controls-md-min-size);
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		min-width: var(--_item-min-width);
		opacity: var(--primitives-opacity-dragging);
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
		opacity: var(--_drag-clone-opacity);
		border-radius: var(--semantics-controls-md-corner-radius);
		background: var(--semantics-buttons-neutral-tinted-background-color);
		z-index: var(--_drag-clone-z-index);
		overflow: hidden;
		cursor: grabbing;
	}

	.document-tab-bar__drag-clone .document-tab-bar__item {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		position: relative;
	}

	.document-tab-bar__drag-clone .document-tab-bar__item-tab {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-width: 0;
		border-radius: var(--semantics-controls-md-corner-radius);
		padding-block: var(--primitives-space-6);
		padding-inline-start: var(--primitives-space-10);
		padding-inline-end: calc(var(--semantics-controls-sm-min-size) + var(--primitives-space-6) * 2);
		box-sizing: border-box;
		overflow: hidden;
	}

	.document-tab-bar__drag-clone .document-tab-bar__item-text {
		font: var(--components-document-tab-bar-tab-title-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.document-tab-bar__drag-clone.is-selected .document-tab-bar__item-tab {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	.document-tab-bar__drag-clone.is-selected .document-tab-bar__item-text,
	.document-tab-bar__drag-clone.is-selected .document-tab-bar__item-supporting-text {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__drag-clone .document-tab-bar__item-supporting-text {
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		container-name: document-tab-bar;
		container-type: inline-size;
		touch-action: pan-y;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Item */

	.document-tab-bar__item {
		position: relative;
		height: var(--semantics-controls-md-min-size);
		width: 100%;
		box-sizing: border-box;
	}


	/* # Item tab */

	.document-tab-bar__item-tab {
		appearance: none;
		border: none;
		margin: 0;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		height: 100%;
		min-width: 0;
		border-radius: var(--semantics-controls-md-corner-radius);
		padding-block: var(--primitives-space-6);
		padding-inline-start: var(--primitives-space-10);
		padding-inline-end: calc(var(--semantics-controls-sm-min-size) + var(--primitives-space-6));
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		box-sizing: border-box;
		overflow: hidden;
		text-decoration: none;
	}

	.document-tab-bar__item-tab:hover {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
	}

	.document-tab-bar__item-tab:active {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
	}

	:host([selected]) .document-tab-bar__item-tab {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	:host([selected]) .document-tab-bar__item-tab:hover {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	/* ## Focus */

	.document-tab-bar__item-tab:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Item text wrappers */

	.document-tab-bar__item-normal {
		display: contents;

		@container document-tab-bar (max-width: 200px) {
			display: none;
		}
	}

	.document-tab-bar__item-short {
		display: none;

		@container document-tab-bar (max-width: 200px) {
			display: contents;
		}
	}


	/* # Item label */

	.document-tab-bar__item-text {
		padding-inline-end: var(--primitives-space-6);
		font: var(--components-document-tab-bar-tab-title-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-text {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__item-short-text {
		padding-inline-end: var(--primitives-space-6);
		font: var(--components-document-tab-bar-tab-title-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-short-text {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}


	/* # Item supporting label */

	.document-tab-bar__item-supporting-text {
		padding-inline-end: var(--primitives-space-6);
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-supporting-text {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__item-short-supporting-text {
		padding-inline-end: var(--primitives-space-6);
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-short-supporting-text {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}


	/* # Item dismiss button */

	.document-tab-bar__item-dismiss-button {
		position: absolute;
		right: var(--primitives-space-6);
		top: 50%;
		transform: translateY(-50%);
		appearance: none;
		border: none;
		background: none;
		margin: 0;
		padding: var(--primitives-space-4);
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--semantics-controls-sm-min-size);
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	.document-tab-bar__item-dismiss-button:hover {
		background-color: var(--primitives-color-neutral-150);
	}

	.document-tab-bar__item-dismiss-button:active {
		background-color: var(--primitives-color-neutral-200);
	}

	:host([selected]) .document-tab-bar__item-dismiss-button {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	:host([selected]) .document-tab-bar__item-dismiss-button:hover {
		background-color: var(--primitives-color-accent-650);
	}

	:host([selected]) .document-tab-bar__item-dismiss-button:active {
		background-color: var(--primitives-color-accent-600);
	}

	.document-tab-bar__item-dismiss-button:focus-visible {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Item dismiss icon */

	.document-tab-bar__item-dismiss-icon {
		display: flex;
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}

`;

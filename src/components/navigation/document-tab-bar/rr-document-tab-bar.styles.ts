import { css } from 'lit';

export const documentTabBarStyles = css`

	/* # Host */

	:host {
		display: block;
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
		overflow: hidden;
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

`;

export const documentTabBarItemStyles = css`

	/* # Host */

	:host {
		display: block;
		min-width: 0;
		container-type: inline-size;
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
		cursor: default;
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

	.document-tab-bar__item-title-area {
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

	.document-tab-bar__item-title {
		font: var(--components-document-tab-bar-tab-title-font);
		color: var(--semantics-buttons-neutral-tinted-content-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-title {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__item-title--short {
		display: none;
	}

	@container (max-width: 200px) {
		.document-tab-bar__item-title--regular {
			display: none;
		}

		.document-tab-bar__item-title--short {
			display: block;
		}
	}


	/* # Item subtitle */

	.document-tab-bar__item-subtitle {
		font: var(--primitives-font-body-xs-regular-flat);
		color: var(--semantics-content-secondary-color);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:host([selected]) .document-tab-bar__item-subtitle {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	.document-tab-bar__item-subtitle--short {
		display: none;
	}

	@container (max-width: 200px) {
		.document-tab-bar__item-subtitle--regular {
			display: none;
		}

		.document-tab-bar__item-subtitle--short {
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
		width: 28px;
		height: 28px;
		border-radius: var(--primitives-corner-radius-sm);
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
		width: 14px;
		height: 14px;
	}

`;

import { css } from 'lit';

export const dropDownFieldStyles = css`
	/* # Host */

	:host {
		display: block;
		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Container */

	.drop-down-field {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([size='md']) .drop-down-field,
	:host(:not([size])) .drop-down-field {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([size='sm']) .drop-down-field {
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	.drop-down-field:focus-within {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Native select */

	.drop-down-field__select {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: transparent;
		outline: none;
		box-sizing: border-box;
	}

	:host([size='md']) .drop-down-field__select,
	:host(:not([size])) .drop-down-field__select {
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) .drop-down-field__select {
		font: var(--semantics-input-fields-sm-text-font);
	}


	/* # Value */

	.drop-down-field__value {
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: inherit;
	}

	:host([size='md']) .drop-down-field__value,
	:host(:not([size])) .drop-down-field__value {
		padding: 0 var(--primitives-space-12);
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) .drop-down-field__value {
		padding: 0 var(--primitives-space-10);
		font: var(--semantics-input-fields-sm-text-font);
	}


	/* # Icon */

	.drop-down-field__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: inherit;
	}

	:host([size='md']) .drop-down-field__icon,
	:host(:not([size])) .drop-down-field__icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--primitives-space-24)) / 2);
	}

	:host([size='sm']) .drop-down-field__icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--primitives-space-20)) / 2);
	}


	/* # Slot */

	slot {
		display: none;
	}
`;

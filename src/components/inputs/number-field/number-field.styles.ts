import { css } from 'lit';

export const numberFieldStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		--_width: auto;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([disabled]) nldd-icon-button {
		opacity: 1;
	}

	:host([full-width]) {
		display: block;
		width: 100%;
	}

	:host([width]) {
		width: var(--_width);
	}


	/* # Block */

	.number-field {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		background-color: var(--semantics-input-fields-background-color);
		border: var(--semantics-input-fields-border);
		box-sizing: border-box;
	}

	:host([size='sm']) .number-field {
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .number-field,
	:host(:not([size])) .number-field {
		height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([full-width]) .number-field,
	:host([width]) .number-field {
		width: 100%;
	}

	.number-field:has(.number-field__input:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Controls */

	.number-field__decrement-button,
	.number-field__increment-button {
		display: flex;
		align-items: center;
		height: 100%;
	}

	:host([size='sm']) .number-field__decrement-button {
		padding-left: calc((var(--semantics-controls-sm-min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	:host([size='sm']) .number-field__increment-button {
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	:host([size='md']) .number-field__decrement-button,
	:host(:not([size])) .number-field__decrement-button {
		padding-left: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	:host([size='md']) .number-field__increment-button,
	:host(:not([size])) .number-field__increment-button {
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}


	/* # Input */

	.number-field__input {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0 var(--primitives-space-6);
		outline: none;
		box-sizing: border-box;
		color: var(--semantics-content-color);
		text-align: center;
	}

	:host([size='sm']) .number-field__input {
		font: var(--semantics-input-fields-sm-text-font);
		min-width: var(--semantics-controls-sm-min-size);
	}

	:host([size='md']) .number-field__input,
	:host(:not([size])) .number-field__input {
		font: var(--semantics-input-fields-md-text-font);
		min-width: var(--semantics-controls-md-min-size);
	}

	.number-field__input[type='number'] {
		-moz-appearance: textfield;
	}

	.number-field__input::-webkit-outer-spin-button,
	.number-field__input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	:host([hide-spin-buttons]) .number-field__input {
		min-width: var(--primitives-space-80);
		text-align: left;
	}

	:host([hide-spin-buttons][size='sm']) .number-field__input {
		padding-inline: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
	}

	:host([hide-spin-buttons][size='md']) .number-field__input,
	:host([hide-spin-buttons]:not([size])) .number-field__input {
		padding-inline: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
	}

	:host([full-width]) .number-field__input,
	:host([width]) .number-field__input {
		flex-grow: 1;
		min-width: 0;
	}
`;

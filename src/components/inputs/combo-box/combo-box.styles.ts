import { css } from 'lit';

export const comboBoxStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--semantics-input-fields-background-color);
		--_z-index-button-focus: 1;

		display: block;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.combo-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--_background-color);
		border: var(--semantics-input-fields-border);
	}

	:host([size='sm']) .combo-box {
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .combo-box,
	:host(:not([size])) .combo-box {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([valid]) .combo-box {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .combo-box {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	.combo-box:has(input:-webkit-autofill),
	.combo-box:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.combo-box:has(.combo-box__input:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Input */

	.combo-box__input {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		outline: none;
		box-sizing: border-box;
		flex: 1;
		min-width: 0;
		width: 100%;
		color: var(--semantics-content-color);
	}

	:host([size='sm']) .combo-box__input {
		padding-left: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .combo-box__input,
	:host(:not([size])) .combo-box__input {
		padding-left: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
		font: var(--semantics-input-fields-md-text-font);
	}

	.combo-box__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.combo-box__input:-webkit-autofill,
	.combo-box__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}


	/* # Input fade */

	.combo-box__input-fade {
		position: relative;
		flex-shrink: 0;
		align-self: stretch;
		width: 0;
	}

	.combo-box__input-fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: var(--primitives-space-8);
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
	}


	/* # End */

	.combo-box__end {
		display: flex;
		flex-shrink: 0;
		align-items: center;
	}

	:host([size='sm']) .combo-box__end {
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	:host([size='md']) .combo-box__end,
	:host(:not([size])) .combo-box__end {
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}


	/* # Clear button */

	.combo-box__clear-button:focus-within {
		position: relative;
		z-index: var(--_z-index-button-focus);
	}


	/* # Validation icon */

	.combo-box__validation-icon-area {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 100%;
	}

	:host([valid]) .combo-box__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .combo-box__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	:host([size='sm']) .combo-box__validation-icon {
		width: var(--semantics-input-fields-sm-validation-icon-size);
		height: var(--semantics-input-fields-sm-validation-icon-size);
	}

	:host([size='md']) .combo-box__validation-icon,
	:host(:not([size])) .combo-box__validation-icon {
		width: var(--semantics-input-fields-md-validation-icon-size);
		height: var(--semantics-input-fields-md-validation-icon-size);
	}

	/* # Picker button */

	.combo-box__picker-button {
		margin-left: var(--primitives-space-6);
	}

	.combo-box__picker-button:focus-within {
		position: relative;
		z-index: var(--_z-index-button-focus);
	}
`;

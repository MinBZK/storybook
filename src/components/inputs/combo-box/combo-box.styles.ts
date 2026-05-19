import { css } from 'lit';

export const comboBoxStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--semantics-input-fields-background-color);
		--_z-index-button-focus: 1;
		--_width: 100%;

		display: block;
		width: var(--_width);
		max-width: 100%;
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
		box-sizing: border-box;
		border: var(--semantics-input-fields-border);
		background-color: var(--_background-color);
		width: 100%;
		flex-direction: row;
		align-items: center;
	}

	:host([size='sm']) .combo-box {
		border-radius: var(--semantics-controls-sm-corner-radius);
		min-height: var(--semantics-controls-sm-min-size);
	}

	:host([size='md']) .combo-box,
	:host(:not([size])) .combo-box {
		border-radius: var(--semantics-controls-md-corner-radius);
		min-height: var(--semantics-controls-md-min-size);
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
		box-sizing: border-box;
		margin: 0;
		border: none;
		outline: none;
		background: transparent;
		min-width: 0;
		width: 100%;
		flex: 1;
		color: var(--semantics-content-color);
		appearance: none;
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
		width: 0;
		flex-shrink: 0;
		align-self: stretch;
	}

	.combo-box__input-fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
		width: var(--primitives-space-8);
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
		height: 100%;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
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

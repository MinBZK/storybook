import { css } from 'lit';

export const textFieldStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--semantics-input-fields-background-color);
		--_width: auto;

		display: block;
		width: var(--_width);
		max-width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.text-field {
		display: flex;
		box-sizing: border-box;
		border: var(--semantics-input-fields-border);
		background-color: var(--_background-color);
		overflow: hidden;
		flex-direction: row;
		align-items: center;
	}

	:host([size='sm']) .text-field {
		border-radius: var(--semantics-controls-sm-corner-radius);
		min-height: var(--semantics-controls-sm-min-size);
		padding-left: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
	}

	:host([size='md']) .text-field,
	:host(:not([size])) .text-field {
		border-radius: var(--semantics-controls-md-corner-radius);
		min-height: var(--semantics-controls-md-min-size);
		padding-left: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
	}

	:host([valid]) .text-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .text-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .text-field {
		border-color: var(--semantics-input-fields-is-read-only-border-color);
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
	}

	:host([disabled]) .text-field {
		opacity: var(--primitives-opacity-disabled);
	}

	.text-field:has(input:-webkit-autofill),
	.text-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.text-field:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Input */

	.text-field__input {
		box-sizing: border-box;
		margin: 0;
		border: none;
		outline: none;
		background: transparent;
		min-width: 0;
		overflow: hidden;
		padding: 0;
		flex-grow: 1;
		color: var(--semantics-content-color);
		appearance: none;
	}

	:host([size='sm']) .text-field__input {
		min-height: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .text-field__input,
	:host(:not([size])) .text-field__input {
		min-height: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([disabled]) .text-field__input {
		pointer-events: none;
	}

	.text-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.text-field__input:-webkit-autofill,
	.text-field__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}


	/* # Input fade */

	.text-field__input-fade {
		position: relative;
		width: 0;
		flex-shrink: 0;
		align-self: stretch;
	}

	.text-field__input-fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
		width: var(--primitives-space-8);
	}

	:host([size='sm']) .text-field__input-fade::after {
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .text-field__input-fade::after,
	:host(:not([size])) .text-field__input-fade::after {
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* # Validation icon area */

	.text-field__validation-icon-area {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	:host([size='sm']) .text-field__validation-icon-area {
		width: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([size='md']) .text-field__validation-icon-area,
	:host(:not([size])) .text-field__validation-icon-area {
		width: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([valid]) .text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}


	/* # Validation icon */

	:host([size='sm']) .text-field__validation-icon {
		width: var(--semantics-input-fields-sm-validation-icon-size);
		height: var(--semantics-input-fields-sm-validation-icon-size);
	}

	:host([size='md']) .text-field__validation-icon,
	:host(:not([size])) .text-field__validation-icon {
		width: var(--semantics-input-fields-md-validation-icon-size);
		height: var(--semantics-input-fields-md-validation-icon-size);
	}
`;

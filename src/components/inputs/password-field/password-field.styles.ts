import { css } from 'lit';

export const passwordFieldStyles = css`


	/* # Host */

	:host {
		display: block;
		--_background-color: var(--semantics-input-fields-background-color);
		--_z-index-button-focus: 1;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.password-field {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		box-sizing: border-box;
		border: var(--semantics-input-fields-border);
		background-color: var(--_background-color);
	}

	:host([size='sm']) .password-field {
		padding-left: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .password-field,
	:host(:not([size])) .password-field {
		padding-left: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([valid]) .password-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .password-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .password-field {
		border-color: var(--semantics-input-fields-is-read-only-border-color);
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
	}

	:host([disabled]) .password-field {
		opacity: var(--primitives-opacity-disabled);
	}

	.password-field:has(input:-webkit-autofill),
	.password-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.password-field:focus-within:not(:has(.password-field__visibility-toggle-button:focus-within)) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.password-field:has(.password-field__visibility-toggle-button:focus-within) {
		overflow: visible;
	}


	/* # Input */

	.password-field__input {
		flex-grow: 1;
		min-width: 0;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		color: var(--semantics-content-color);
		background: transparent;
		border: none;
		outline: none;
		appearance: none;
	}

	:host([size='sm']) .password-field__input {
		min-height: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .password-field__input,
	:host(:not([size])) .password-field__input {
		min-height: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) .password-field__input.is-masked {
		font: var(--semantics-input-fields-sm-mask-font);
	}

	:host([size='md']) .password-field__input.is-masked,
	:host(:not([size])) .password-field__input.is-masked {
		font: var(--semantics-input-fields-md-mask-font);
	}

	.password-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	:host([size='sm']) .password-field__input::placeholder {
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .password-field__input::placeholder,
	:host(:not([size])) .password-field__input::placeholder {
		font: var(--semantics-input-fields-md-text-font);
	}

	.password-field__input:-webkit-autofill,
	.password-field__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}

	:host([disabled]) .password-field__input {
		pointer-events: none;
	}


	/* # Input fade */

	.password-field__input-fade {
		position: relative;
		flex-shrink: 0;
		align-self: stretch;
		width: 0;
	}

	.password-field__input-fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: var(--primitives-space-8);
		border-radius: var(--semantics-controls-md-corner-radius);
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
	}


	/* # Validation icon */

	.password-field__validation-icon-area {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 100%;
	}

	:host([size='sm']) .password-field__validation-icon-area {
		width: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([size='md']) .password-field__validation-icon-area,
	:host(:not([size])) .password-field__validation-icon-area {
		width: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([valid]) .password-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .password-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	:host([size='sm']) .password-field__validation-icon {
		width: var(--semantics-input-fields-sm-validation-icon-size);
		height: var(--semantics-input-fields-sm-validation-icon-size);
	}

	:host([size='md']) .password-field__validation-icon,
	:host(:not([size])) .password-field__validation-icon {
		width: var(--semantics-input-fields-md-validation-icon-size);
		height: var(--semantics-input-fields-md-validation-icon-size);
	}


	/* # Visibility toggle button */

	.password-field__visibility-toggle-button {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 100%;
	}

	:host([size='sm']) .password-field__visibility-toggle-button {
		padding-block: calc((var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-xs-min-size)) / 2);
		padding-inline-end: calc((var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-xs-min-size)) / 2);
	}

	:host([size='md']) .password-field__visibility-toggle-button,
	:host(:not([size])) .password-field__visibility-toggle-button {
		padding-block: calc((var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-sm-min-size)) / 2);
		padding-inline-end: calc((var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-sm-min-size)) / 2);
	}

	.password-field__visibility-toggle-button:focus-within {
		position: relative;
		z-index: var(--_z-index-button-focus);
	}
`;

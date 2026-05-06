import { css } from 'lit';

export const multiLineTextFieldStyles = css`


	/* # Host */

	:host {
		display: block;
		--_background-color: var(--semantics-input-fields-background-color);
		-webkit-tap-highlight-color: transparent;
	}

	:host([size='sm']) {
		--_inline-padding: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
		--_icon-area-size: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([size='md']),
	:host(:not([size])) {
		--_inline-padding: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
		--_icon-area-size: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.multi-line-text-field {
		position: relative;
		display: block;
		box-sizing: border-box;
		border: var(--semantics-input-fields-border);
		background-color: var(--_background-color);
		overflow: hidden;
	}

	:host([size='sm']) .multi-line-text-field {
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .multi-line-text-field,
	:host(:not([size])) .multi-line-text-field {
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([valid]) .multi-line-text-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .multi-line-text-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .multi-line-text-field {
		border-color: var(--semantics-input-fields-is-read-only-border-color);
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
	}

	:host([disabled]) .multi-line-text-field {
		opacity: var(--primitives-opacity-disabled);
	}

	.multi-line-text-field:has(textarea:-webkit-autofill),
	.multi-line-text-field:has(textarea:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.multi-line-text-field:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Input */

	.multi-line-text-field__input {
		display: block;
		width: 100%;
		box-sizing: border-box;
		margin: 0;
		color: var(--semantics-content-color);
		background: transparent;
		border: none;
		outline: none;
		appearance: none;
		resize: vertical;
		padding-inline: var(--_inline-padding);
	}

	:host([resize='none']) .multi-line-text-field__input {
		resize: none;
	}

	:host([resize='auto']) .multi-line-text-field__input {
		resize: none;
		field-sizing: content;
	}

	:host([size='sm']) .multi-line-text-field__input {
		font: var(--semantics-input-fields-sm-text-font);
		padding-block: calc((var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2 - 1lh) / 2);
		min-height: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([size='md']) .multi-line-text-field__input,
	:host(:not([size])) .multi-line-text-field__input {
		font: var(--semantics-input-fields-md-text-font);
		padding-block: calc((var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2 - 1lh) / 2);
		min-height: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([valid]) .multi-line-text-field__input,
	:host([invalid]) .multi-line-text-field__input {
		padding-inline-end: var(--_icon-area-size);
	}

	:host([disabled]) .multi-line-text-field__input {
		pointer-events: none;
	}

	.multi-line-text-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.multi-line-text-field__input:-webkit-autofill,
	.multi-line-text-field__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}


	/* # Validation icon area */

	.multi-line-text-field__validation-icon-area {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--_icon-area-size);
		height: var(--_icon-area-size);
		pointer-events: none;
	}

	:host([valid]) .multi-line-text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .multi-line-text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}


	/* # Validation icon */

	:host([size='sm']) .multi-line-text-field__validation-icon {
		width: var(--semantics-input-fields-sm-validation-icon-size);
		height: var(--semantics-input-fields-sm-validation-icon-size);
	}

	:host([size='md']) .multi-line-text-field__validation-icon,
	:host(:not([size])) .multi-line-text-field__validation-icon {
		width: var(--semantics-input-fields-md-validation-icon-size);
		height: var(--semantics-input-fields-md-validation-icon-size);
	}
`;

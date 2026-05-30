import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const multiLineTextFieldStyles = css`


	/* # Host */

	:host {
		--_width: 100%;
		--_background-color: var(--semantics-input-fields-background-color);
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_inline-padding: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
		--_min-size: var(--semantics-controls-md-min-size);
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_icon-area-size: calc(var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2);
		--_validation-icon-size: var(--semantics-input-fields-md-validation-icon-size);

		${inheritedTextReset}
		display: block;
		width: var(--_width);
		max-width: 100%;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_inline-padding: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
		--_min-size: var(--semantics-controls-sm-min-size);
		--_text-font: var(--semantics-input-fields-sm-text-font);
		--_validation-icon-size: var(--semantics-input-fields-sm-validation-icon-size);
	}


	/* # Block */

	.multi-line-text-field {
		box-sizing: border-box;
		display: block;
		position: relative;
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		overflow: hidden;
	}

	:host([valid]) .multi-line-text-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .multi-line-text-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .multi-line-text-field {
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
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


	/* # Elements */

	.multi-line-text-field__input {
		box-sizing: border-box;
		display: block;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		width: 100%;
		min-height: calc(var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2);
		padding-block: calc((var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2 - 1lh) / 2);
		padding-inline: var(--_inline-padding);
		color: var(--semantics-content-color);
		font: var(--_text-font);
		appearance: none;
	}

	:host([resize="vertical"]) .multi-line-text-field__input {
		resize: vertical;
	}

	:host([resize="none"]) .multi-line-text-field__input {
		resize: none;
	}

	:host([resize="auto"]) .multi-line-text-field__input {
		resize: none;
		field-sizing: content;
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
	.multi-line-text-field__input:autofill,
	.multi-line-text-field__input:-webkit-autofill:disabled,
	.multi-line-text-field__input:autofill:disabled {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
		-webkit-text-fill-color: var(--semantics-content-color);
	}

	.multi-line-text-field__validation-icon-area {
		display: flex;
		position: absolute;
		top: 0;
		right: 0;
		pointer-events: none;
		width: var(--_icon-area-size);
		height: var(--_icon-area-size);
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .multi-line-text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .multi-line-text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.multi-line-text-field__validation-icon {
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}
`;

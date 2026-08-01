import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

export const textFieldStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_width: 100%;
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-input-fields-background-color);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: var(--semantics-controls-md-inline-padding);
		--_text-font: var(--semantics-input-fields-md-text-font);
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
		--_min-size: var(--semantics-controls-sm-min-size);
		--_inline-padding: var(--semantics-controls-sm-inline-padding);
		--_text-font: var(--semantics-input-fields-sm-text-font);
		--_validation-icon-size: var(--semantics-input-fields-sm-validation-icon-size);
	}


	/* # Block */

	.text-field {
		box-sizing: border-box;
		display: flex;
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		min-height: var(--_min-size);
		overflow: hidden;
		padding-left: calc(var(--_inline-padding) - var(--semantics-input-fields-border-width));
		flex-direction: row;
		align-items: center;
	}

	:host([valid]) .text-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .text-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .text-field {
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
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


	/* # Elements */

	.text-field__input {
		box-sizing: border-box;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		min-width: 0;
		min-height: calc(var(--_min-size) - var(--semantics-input-fields-border-width) * 2);
		overflow: hidden;
		padding: 0;
		flex-grow: 1;
		color: var(--semantics-content-color);
		font: var(--_text-font);
		appearance: none;
	}

	:host([disabled]) .text-field__input {
		pointer-events: none;
	}

	.text-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.text-field__input:-webkit-autofill,
	.text-field__input:autofill,
	.text-field__input:-webkit-autofill:disabled,
	.text-field__input:autofill:disabled {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
		-webkit-text-fill-color: var(--semantics-input-fields-is-autofill-content-color);
	}

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
		right: 0;
		bottom: 0;
		border-radius: var(--_corner-radius);
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
		width: var(--primitives-space-8);
	}

	.text-field__validation-icon-area {
		display: flex;
		width: calc(var(--_min-size) - var(--semantics-input-fields-border-width) * 2);
		height: 100%;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .text-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.text-field__validation-icon {
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}
`;

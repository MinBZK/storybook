import { css } from 'lit';

export const passwordFieldStyles = css`


	/* # Host */

	:host {
		--_width: 100%;
		--_background-color: var(--semantics-input-fields-background-color);
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: var(--semantics-controls-md-inline-padding);
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_mask-font: var(--semantics-input-fields-md-mask-font);
		--_validation-icon-size: var(--semantics-input-fields-md-validation-icon-size);
		--_visibility-toggle-padding: calc((var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-sm-min-size)) / 2);
		--_z-index-button-focus: 1;

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
		--_mask-font: var(--semantics-input-fields-sm-mask-font);
		--_validation-icon-size: var(--semantics-input-fields-sm-validation-icon-size);
		--_visibility-toggle-padding: calc((var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-xs-min-size)) / 2);
	}


	/* # Block */

	.password-field {
		box-sizing: border-box;
		display: flex;
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		min-height: var(--_min-size);
		overflow: hidden;
		padding-left: calc(var(--_inline-padding) - var(--semantics-input-fields-border-thickness));
		flex-direction: row;
		align-items: center;
	}

	:host([valid]) .password-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .password-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .password-field {
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
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


	/* # Elements */

	.password-field__input {
		box-sizing: border-box;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		min-width: 0;
		min-height: calc(var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2);
		overflow: hidden;
		padding: 0;
		flex-grow: 1;
		color: var(--semantics-content-color);
		font: var(--_text-font);
		appearance: none;
	}

	.password-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
		font: var(--_text-font);
	}

	.password-field__input.is-masked {
		font: var(--_mask-font);
	}

	:host([disabled]) .password-field__input {
		pointer-events: none;
	}

	.password-field__input:-webkit-autofill,
	.password-field__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}

	.password-field__input-fade {
		position: relative;
		width: 0;
		flex-shrink: 0;
		align-self: stretch;
	}

	.password-field__input-fade::after {
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

	.password-field__validation-icon-area {
		display: flex;
		width: calc(var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2);
		height: 100%;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .password-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .password-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.password-field__validation-icon {
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}

	.password-field__visibility-toggle-button {
		display: flex;
		height: 100%;
		padding-block: var(--_visibility-toggle-padding);
		padding-inline-end: var(--_visibility-toggle-padding);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.password-field__visibility-toggle-button:focus-within {
		position: relative;
		z-index: var(--_z-index-button-focus);
	}
`;

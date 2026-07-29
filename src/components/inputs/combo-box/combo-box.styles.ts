import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const comboBoxStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_width: 100%;
		--_background-color: var(--semantics-input-fields-background-color);
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-width));
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_end-padding-right: calc((var(--_min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-width));
		--_button-focus-z-index: 1;
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
		--_inline-padding: calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-width));
		--_text-font: var(--semantics-input-fields-sm-text-font);
		--_end-padding-right: calc((var(--_min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-width));
		--_validation-icon-size: var(--semantics-input-fields-sm-validation-icon-size);
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.combo-box {
		box-sizing: border-box;
		display: flex;
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		width: 100%;
		min-height: var(--_min-size);
		flex-direction: row;
		align-items: center;
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


	/* # Elements */

	.combo-box__input {
		box-sizing: border-box;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		min-width: 0;
		width: 100%;
		padding-left: var(--_inline-padding);
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
		align-self: stretch;
		color: var(--semantics-content-color);
		font: var(--_text-font);
		appearance: none;
	}

	.combo-box__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.combo-box__input:-webkit-autofill,
	.combo-box__input:autofill,
	.combo-box__input:-webkit-autofill:disabled,
	.combo-box__input:autofill:disabled {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
		-webkit-text-fill-color: var(--semantics-input-fields-is-autofill-content-color);
	}

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
		right: 0;
		bottom: 0;
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
		width: var(--primitives-space-8);
	}

	.combo-box__end {
		display: flex;
		padding-right: var(--_end-padding-right);
		flex-shrink: 0;
		align-items: center;
	}

	.combo-box__clear-button:focus-within {
		position: relative;
		z-index: var(--_button-focus-z-index);
	}

	.combo-box__validation-icon-area {
		display: flex;
		height: 100%;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .combo-box__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .combo-box__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.combo-box__validation-icon {
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}

	.combo-box__picker-button {
		margin-left: var(--primitives-space-6);
	}

	.combo-box__picker-button:focus-within {
		position: relative;
		z-index: var(--_button-focus-z-index);
	}
`;

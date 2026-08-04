import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

export const timeFieldStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		/* Ruimer dan de tekst meet. Niet om afkappen te voorkomen (de cijfers zijn
		   tabulair, dus elke tijd meet hetzelfde), maar als lucht rond de tijd en als
		   greep om te selecteren en te slepen. */
		--_time-width: 6.5ch;
		/* Linkerkant van het veld: het is een border-box, en padding-left trekt er al
		   een rand vanaf, dus tellen beide randen samen voor één rand extra. */
		--_edge-width: calc(var(--_inline-padding) + var(--semantics-input-fields-border-width));
		--_validation-icon-area-width: calc(var(--_min-size) - var(--semantics-input-fields-border-width) * 2);
		/* Alles wat niet kan krimpen; tevens de ondergrens van het veld. */
		--_fixed-width: calc(var(--_edge-width) + var(--_inline-padding) + var(--_validation-icon-area-width));
		--_width: calc(var(--_fixed-width) + var(--_time-width));
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-input-fields-background-color);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: var(--semantics-controls-md-inline-padding);
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_validation-icon-size: var(--semantics-input-fields-md-validation-icon-size);

		${inheritedTextReset}
		display: block;
		width: var(--_width);
		min-width: var(--_fixed-width);
		max-width: 100%;
		font: var(--_text-font);
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

	.time-field {
		box-sizing: border-box;
		display: flex;
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		min-height: var(--_min-size);
		padding-left: calc(var(--_inline-padding) - var(--semantics-input-fields-border-width));
		flex-direction: row;
		align-items: center;
	}

	:host([valid]) .time-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .time-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .time-field {
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
	}

	:host([disabled]) .time-field {
		opacity: var(--primitives-opacity-disabled);
	}

	.time-field:has(input:-webkit-autofill),
	.time-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.time-field:has(.time-field__input:focus) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Elements */

	.time-field__input {
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

	:host([disabled]) .time-field__input {
		pointer-events: none;
	}

	.time-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.time-field__input:-webkit-autofill,
	.time-field__input:autofill,
	.time-field__input:-webkit-autofill:disabled,
	.time-field__input:autofill:disabled {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
		-webkit-text-fill-color: var(--semantics-input-fields-is-autofill-content-color);
	}

	.time-field__input-fade {
		position: relative;
		width: 0;
		flex-shrink: 0;
		align-self: stretch;
	}

	.time-field__input-fade::after {
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

	.time-field__validation-icon-area {
		display: flex;
		width: var(--_validation-icon-area-width);
		height: 100%;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .time-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .time-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.time-field__validation-icon {
		display: flex;
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}
`;

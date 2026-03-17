import { css } from 'lit';

export const comboBoxFieldStyles = css`
	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Container */

	.combo-box-field {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		min-height: var(--semantics-controls-md-min-size);
		background-color: var(--_background-color);
		border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-input-fields-background-color);
	}

	.combo-box-field:has(input:-webkit-autofill),
	.combo-box-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.combo-box-field:focus-within {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Input */

	.combo-box-field__input {
		flex: 1;
		min-width: 0;
		padding: 0 var(--primitives-space-12);
	}

	.combo-box-field__native {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0;
		outline: none;
		box-sizing: border-box;
		width: 100%;
		font: var(--semantics-input-fields-md-text-font);
		color: var(--semantics-content-color);
	}

	.combo-box-field__native::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.combo-box-field__native:-webkit-autofill,
	.combo-box-field__native:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}


	/* # Picker */

	.combo-box-field__picker {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}
`;

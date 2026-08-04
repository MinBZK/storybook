import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

export const timePickerStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_option-min-size: var(--semantics-controls-md-min-size);
		--_option-corner-radius: var(--semantics-controls-md-corner-radius);
		--_option-font: var(--primitives-font-body-sm-medium-flat);
		--_option-is-selected-background-color: var(--semantics-controls-is-highlighted-indicator-color);
		--_option-is-selected-content-color: var(--semantics-controls-is-highlighted-contrast-color);
		--_option-is-hovered-background-color: light-dark(var(--primitives-color-neutral-100), var(--primitives-color-neutral-150));
		--_column-width: calc(var(--_option-min-size) * 1.5);
		/* Zeven waarden in beeld, dus een oneven aantal: dan staat de gekozen
		   waarde in het midden als de kolom hem in beeld scrolt. */
		--_column-height: calc(var(--_option-min-size) * 7);
		--_column-gap: var(--primitives-space-4);
		--_separator-content-color: var(--semantics-content-secondary-color);
		/* Vanuit JS gezet door het width-attribuut; initial houdt hem
		   gegarandeerd-ongeldig, zodat de breedte anders op auto uitkomt. */
		--_width: initial;

		${inheritedTextReset}
		display: inline-block;
		width: var(--_width);
		max-width: 100%;
		font: var(--_option-font);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.time-picker {
		display: flex;
		height: var(--_column-height);
		gap: var(--_column-gap);
		align-items: stretch;
		justify-content: center;
	}


	/* # Elements */

	.time-picker__column {
		display: flex;
		width: var(--_column-width);
		overflow-y: auto;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		/* Zonder dit rekt een korte kolom (bij een grote stap zijn het er soms
		   maar vier) zijn waarden uit tot de volle hoogte. */
		justify-content: flex-start;
		scrollbar-width: thin;
	}

	.time-picker__option {
		box-sizing: border-box;
		display: flex;
		margin: 0;
		outline: none;
		border: none;
		border-radius: var(--_option-corner-radius);
		background: none;
		min-height: var(--_option-min-size);
		padding: 0;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		color: var(--semantics-content-color);
		font: var(--_option-font);
		font-variant-numeric: tabular-nums;
		appearance: none;
	}

	.time-picker__option:hover {
		background-color: var(--_option-is-hovered-background-color);
		cursor: pointer;
	}

	.time-picker__option[aria-selected="true"] {
		background-color: var(--_option-is-selected-background-color);
		color: var(--_option-is-selected-content-color);
	}

	.time-picker__option:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.time-picker__separator {
		display: flex;
		align-items: center;
		color: var(--_separator-content-color);
		font-variant-numeric: tabular-nums;
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.time-picker__option[aria-selected="true"] {
			outline: 2px solid CanvasText;
		}
	}
`;

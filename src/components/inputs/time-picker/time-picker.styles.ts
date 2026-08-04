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
	}

:host(:not([variant="wheel"])) .time-picker__option[data-selected] {
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
		:host(:not([variant="wheel"])) .time-picker__option[data-selected] {
			outline: 2px solid CanvasText;
		}
	}

	/* # Wiel */

	/* De kolom is even hoog als in de lijst, maar de waarden schuiven langs een
	   vaste band in het midden. De padding boven en onder is precies de halve
	   kolom min een halve rij, zodat ook de eerste en de laatste waarde het
	   midden kunnen bereiken. */
	:host([variant="wheel"]) .time-picker {
		position: relative;
	}

	:host([variant="wheel"]) .time-picker__column {
		padding-block: calc((var(--_column-height) - var(--_option-min-size)) / 2);
		scroll-snap-type: y mandatory;
		/* De randen vervagen, zodat de band in het midden het brandpunt is en de
		   lijst niet abrupt afkapt. */
		mask-image: linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%);
		scrollbar-width: none;
	}

	:host([variant="wheel"]) .time-picker__column::-webkit-scrollbar {
		display: none;
	}

	:host([variant="wheel"]) .time-picker__option {
		scroll-snap-align: center;
	}

	/* Dekkend en bovenop, met de waarde erin. Wat eronder in de kolommen staat
	   hoeft daardoor niet aangepast te worden: het valt toch weg achter de band.
	   De kolommen hebben een mask-image en dus een eigen stapelcontext, en ze
	   staan hierna in de DOM, dus zonder z-index schilderen hun cijfers eroverheen
	   en zie je het getal dubbel. */
	.time-picker__band {
		display: flex;
		z-index: 1;
		position: absolute;
		top: 50%;
		right: 0;
		left: 0;

		border-radius: var(--_option-corner-radius);
		background-color: var(--_option-is-selected-background-color);
		/* De band ligt over het midden van beide kolommen. Zou hij de muis vangen,
		   dan scrolt een veeg precies dáár niet de kolom eronder, en dat is nou net
		   de plek waar je hem neerzet. Tab-focus werkt hier gewoon doorheen, en een
		   klik komt bij de optie eronder terecht, wat die waarde kiest. */
		pointer-events: none;
		height: var(--_option-min-size);
		gap: var(--_column-gap);
		align-items: center;
		color: var(--_option-is-selected-content-color);
		font-variant-numeric: tabular-nums;
		transform: translateY(-50%);
	}

	.time-picker__band-value {
		display: flex;
		outline: none;
		border-radius: var(--_option-corner-radius);
		width: var(--_column-width);
		height: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		align-items: center;
		justify-content: center;
	}

	.time-picker__band-value:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.time-picker__band-separator {
		flex-shrink: 0;
	}

	@media (forced-colors: active) {
		.time-picker__band {
			outline: 2px solid CanvasText;
		}
	}
`;

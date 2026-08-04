import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/shadow-resets.js';

export const timePickerStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_control-min-size: var(--semantics-controls-md-min-size);
		--_control-corner-radius: var(--semantics-controls-md-corner-radius);
		--_list-item-font: var(--primitives-font-body-md-medium-flat);
		--_list-item-is-hovered-background-color: light-dark(var(--primitives-color-neutral-100), var(--primitives-color-neutral-150));
		--_selection-background-color: var(--semantics-controls-is-highlighted-indicator-color);
		--_selection-content-color: var(--semantics-controls-is-highlighted-contrast-color);
		--_list-width: calc(var(--_control-min-size) * 1.5);
		--_rows: 7;
		--_list-height: calc(var(--_control-min-size) * var(--_rows));
		--_list-gap: var(--primitives-space-4);
		/* initial houdt hem gegarandeerd-ongeldig, zodat width op auto uitkomt
		   zolang het attribuut niets zet. */
		--_width: initial;

		@media (pointer: fine) {
			--_control-min-size: var(--semantics-controls-sm-min-size);
			--_control-corner-radius: var(--semantics-controls-sm-corner-radius);
		}

		${inheritedTextReset}
		display: inline-block;
		width: var(--_width);
		max-width: 100%;
		font: var(--_list-item-font);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.time-picker {
		display: flex;
		position: relative;
		height: var(--_list-height);
		gap: var(--_list-gap);
		align-items: stretch;
		justify-content: center;
	}


	/* # Lijsten */

	.time-picker__list {
		display: flex;
		width: var(--_list-width);
		overflow-y: auto;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		/* Zonder dit rekken de waarden van een korte lijst uit tot de volle
		   hoogte. */
		justify-content: flex-start;
		scrollbar-width: none;
		/* Niet mandatory: dan moet de browser altijd op een snappunt uitkomen en
		   kan een korte lijst weigeren te scrollen. */
		scroll-snap-type: y proximity;
		mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
	}

	.time-picker__list::-webkit-scrollbar {
		display: none;
	}

	/* Ruimte zodat de eerste en de laatste waarde het midden kunnen bereiken. Als
	   lege vakken en niet als padding-block: Safari telt de onderste padding van
	   een scrollcontainer niet mee in de scrollbare overflow, en bij een korte
	   lijst valt daarmee alle overflow weg. */
	.time-picker__list::before,
	.time-picker__list::after {
		content: '';
		display: block;
		flex-shrink: 0;
		height: calc((var(--_list-height) - var(--_control-min-size)) / 2);
	}

	.time-picker__list-item {
		box-sizing: border-box;
		display: flex;
		margin: 0;
		outline: none;
		border: none;
		border-radius: var(--_control-corner-radius);
		background: none;
		min-height: var(--_control-min-size);
		padding: 0;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		color: var(--semantics-content-color);
		font: var(--_list-item-font);
		font-variant-numeric: tabular-nums;
		scroll-snap-align: center;
		appearance: none;
	}

	.time-picker__list-item:hover {
		background-color: var(--_list-item-is-hovered-background-color);
	}

	/* Tijdens het scrollen schuiven de waarden onder een stilstaande cursor door
	   en zou er telkens een andere oplichten. Ook een tik halverwege een veeg
	   hoort de scroll te stoppen, niet een waarde te kiezen.
	   De achtergrond apart uitzetten: pointer-events houdt alleen nieuwe hover
	   tegen, en een al staande :hover blijft tot de browser de hit-test opnieuw
	   doet. */
	:host([data-scrolling]) .time-picker__list-item {
		pointer-events: none;
	}

	:host([data-scrolling]) .time-picker__list-item:hover {
		background-color: transparent;
	}

	.time-picker__gap {
		flex-shrink: 0;
		width: 1ch;
	}


	/* # Selectie */

	/* De lijsten hebben een mask-image en dus een eigen stapelcontext, en ze staan
	   hierna in de DOM: zonder z-index schilderen hun cijfers hieroverheen. */
	.time-picker__selection {
		display: flex;
		z-index: 1;
		position: absolute;
		top: 50%;
		right: 0;
		left: 0;
		border-radius: var(--_control-corner-radius);
		background-color: var(--_selection-background-color);
		/* Anders vangt dit vlak de veeg die de lijst eronder hoort te scrollen,
		   precies op de plek waar je de muis neerzet. */
		pointer-events: none;
		height: var(--_control-min-size);
		gap: var(--_list-gap);
		align-items: center;
		color: var(--_selection-content-color);
		font-variant-numeric: tabular-nums;
		transform: translateY(-50%);
	}

	.time-picker__value {
		display: flex;
		outline: none;
		border-radius: var(--_control-corner-radius);
		width: var(--_list-width);
		height: 100%;
		flex-grow: 1;
		flex-shrink: 1;
		align-items: center;
		justify-content: center;
	}

	.time-picker__value:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.time-picker__value-separator {
		flex-shrink: 0;
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.time-picker__selection {
			outline: 2px solid CanvasText;
		}
	}
`;

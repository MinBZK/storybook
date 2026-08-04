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
		--_option-is-hovered-background-color: light-dark(var(--primitives-color-neutral-100), var(--primitives-color-neutral-150));
		--_band-background-color: var(--semantics-controls-is-highlighted-indicator-color);
		--_band-content-color: var(--semantics-controls-is-highlighted-contrast-color);
		--_column-width: calc(var(--_option-min-size) * 1.5);
		/* Hoogte in rijen; vanuit JS gezet door het rows-attribuut. De gekozen
		   waarde staat altijd in het midden, dus een oneven aantal levert hele
		   rijen op en een even aantal een halve rij aan beide randen. Dat laatste
		   is wat het wiel z'n vorm geeft: een doorlopend oppervlak in plaats van
		   een lijst met een vervaging eroverheen. */
		--_rows: 7;
		--_column-height: calc(var(--_option-min-size) * var(--_rows));
		--_column-gap: var(--primitives-space-4);
		/* Vanuit JS gezet door het width-attribuut; initial houdt hem
		   gegarandeerd-ongeldig, zodat de breedte anders op auto uitkomt. */
		--_width: initial;

		/* Een vinger heeft de volle 44px nodig, een muis niet. Compacter met een
		   fijne aanwijzer scheelt hoogte en zet meer waarden in beeld bij hetzelfde
		   aantal rijen. Alles hierboven rekent vanaf deze maat, dus de kolombreedte,
		   de hoogte, de ruimte aan de randen en de band schalen mee. Zelfde
		   verdeling als nldd-menu. */
		@media (pointer: fine) {
			--_option-min-size: var(--semantics-controls-sm-min-size);
			--_option-corner-radius: var(--semantics-controls-sm-corner-radius);
		}

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
		position: relative;
		height: var(--_column-height);
		gap: var(--_column-gap);
		align-items: stretch;
		justify-content: center;
	}


	/* # Kolommen */

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
		scrollbar-width: none;
		/* proximity, niet mandatory: bij mandatory moet de browser altijd op een
		   snappunt uitkomen, en een korte kolom kan daardoor helemaal weigeren te
		   scrollen. Proximity snapt als je in de buurt komt en laat de kolom
		   verder met rust. */
		scroll-snap-type: y proximity;
		/* De vervaging loopt over de afgekapte rand: die halve waarde hoort te
		   vervagen, niet gelezen te worden. */
		mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
	}

	.time-picker__column::-webkit-scrollbar {
		display: none;
	}

	/* De ruimte waarin de eerste en de laatste waarde het midden kunnen bereiken:
	   precies de halve kolom min een halve rij. Als lege flex-items en niet als
	   padding-block, want Safari telt de onderste padding van een scrollcontainer
	   niet mee in de scrollbare overflow. Bij een korte kolom (vier minuten bij
	   stap 15) valt daarmee de hele overflow weg en is er niets te scrollen. */
	.time-picker__column::before,
	.time-picker__column::after {
		content: '';
		display: block;
		flex-shrink: 0;
		height: calc((var(--_column-height) - var(--_option-min-size)) / 2);
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
		scroll-snap-align: center;
		appearance: none;
	}

	.time-picker__option:hover {
		background-color: var(--_option-is-hovered-background-color);
	}

	/* Houdt de kolommen uit elkaar op de plek waar de dubbele punt van de band
	   valt; die draagt het teken zelf, dus hier staat niets. */
	.time-picker__gap {
		flex-shrink: 0;
		width: 1ch;
	}


	/* # Band */

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
		background-color: var(--_band-background-color);
		/* De band ligt over het midden van beide kolommen. Zou hij de muis vangen,
		   dan scrolt een veeg precies dáár niet de kolom eronder, en dat is nou net
		   de plek waar je hem neerzet. Tab-focus werkt hier gewoon doorheen, en een
		   klik komt bij de optie eronder terecht, wat die waarde kiest. */
		pointer-events: none;
		height: var(--_option-min-size);
		gap: var(--_column-gap);
		align-items: center;
		color: var(--_band-content-color);
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


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.time-picker__band {
			outline: 2px solid CanvasText;
		}
	}
`;

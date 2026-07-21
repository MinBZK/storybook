import { css, unsafeCSS } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

const mdMin = unsafeCSS(breakpoints.mdMin);

export const dateFieldStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		/* Ruimer dan de tekst meet. Niet om afkappen te voorkomen (de cijfers zijn
		   tabulair, dus elke datum meet hetzelfde), maar als lucht rond de datum en
		   als greep om te selecteren en te slepen. */
		--_date-width: 10.5ch;
		/* Ruimte gereserveerd voor het scheidingsteken. Het teken zelf krijgt zijn
		   eigen breedte, want het is vertaalbaar en zou in een vast vak afkappen; wat
		   die reservering misgokt, vangt het einddatumveld op. */
		--_separator-width: 3.5ch;
		--_separator-padding-right: var(--primitives-space-6);
		/* Linkerkant van het veld: het is een border-box, en padding-left trekt er al
		   een rand vanaf, dus tellen beide randen samen voor één rand extra. */
		--_edge-width: calc(var(--_inline-padding) + var(--semantics-input-fields-border-thickness));
		/* Alles wat niet kan krimpen. Enkel het laatste datumveld rekt mee, dus dit is
		   tevens de ondergrens: eronder zou de kalenderknop het veld uit lopen. */
		--_fixed-width: calc(var(--_edge-width) + var(--_trailing-width));
		--_width: calc(var(--_fixed-width) + var(--_date-width));
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_background-color: var(--semantics-input-fields-background-color);
		--_min-size: var(--semantics-controls-md-min-size);
		--_inline-padding: var(--semantics-controls-md-inline-padding);
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_validation-icon-size: var(--semantics-input-fields-md-validation-icon-size);
		/* Even veel lucht rechts van de knop als erboven en eronder, dus afgeleid van
		   het hoogteverschil tussen veld en knop in plaats van een vaste waarde. */
		--_end-padding-right: calc((var(--_min-size) - var(--_button-size)) / 2 - var(--semantics-input-fields-border-thickness));
		--_button-size: var(--semantics-controls-sm-min-size);
		--_validation-icon-area-width: calc(var(--_min-size) - var(--semantics-input-fields-border-thickness) * 2);
		--_trailing-width: calc(var(--_validation-icon-area-width) + var(--_button-size) + var(--_end-padding-right));

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

	/* The default width reserves a slot for both the picker button and the
	   validation icon, so the field never resizes when a validation state appears.
	   Without the button one slot is enough. */
	:host([no-picker]) {
		--_fixed-width: calc(var(--_edge-width) + var(--_inline-padding) + var(--_validation-icon-area-width));
	}

	:host([range]) {
		--_fixed-width: calc(var(--_edge-width) + var(--_date-width) + var(--_separator-width) + var(--_trailing-width));
	}

	:host([range][no-picker]) {
		--_fixed-width: calc(var(--_edge-width) + var(--_inline-padding) + var(--_date-width) + var(--_separator-width) + var(--_validation-icon-area-width));
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_inline-padding: var(--semantics-controls-sm-inline-padding);
		--_text-font: var(--semantics-input-fields-sm-text-font);
		--_validation-icon-size: var(--semantics-input-fields-sm-validation-icon-size);
		--_button-size: var(--semantics-controls-xs-min-size);
	}


	/* # Block */

	.date-field {
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

	:host([valid]) .date-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .date-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .date-field {
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
	}

	:host([disabled]) .date-field {
		opacity: var(--primitives-opacity-disabled);
	}

	.date-field:has(input:-webkit-autofill),
	.date-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	/* Keyed on the text input, not :focus-within: the calendar button and the
	   popover live inside this box too, so focus-within would draw a second ring
	   around the whole field while the button already has its own. */
	.date-field:has(.date-field__input:focus) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Elements */

	.date-field__input {
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

	:host([disabled]) .date-field__input {
		pointer-events: none;
	}

	.date-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.date-field__input:-webkit-autofill,
	.date-field__input:autofill,
	.date-field__input:-webkit-autofill:disabled,
	.date-field__input:autofill:disabled {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
		-webkit-text-fill-color: var(--semantics-input-fields-is-autofill-content-color);
	}

	/* Vaste maat: groeit of krimpt het startveld mee, dan verspringen het
	   scheidingsteken en de einddatum zodra het validatie-icoon zijn ruimte opeist
	   of het veld smaller wordt gezet. */
	:host([range]) .date-field__input {
		width: var(--_date-width);
		flex-grow: 0;
		flex-shrink: 0;
	}

	/* De einddatum rekt en krimpt wel mee, net als in een gewoon datumveld: hij
	   staat na de scheiding, dus daarvoor verschuift er niets. */
	:host([range]) .date-field__input:last-of-type {
		flex-grow: 1;
		flex-shrink: 1;
	}

	/* Alleen ruimte erná: het startveld is iets ruimer dan zijn tekst, en die
	   speling levert de ruimte ervóór al. Aan beide kanten padding zetten maakt het
	   op het scherm juist scheef. */
	.date-field__separator {
		flex-shrink: 0;
		padding-right: var(--_separator-padding-right);
		color: var(--semantics-content-secondary-color);
	}

	.date-field__input-fade {
		position: relative;
		width: 0;
		flex-shrink: 0;
		align-self: stretch;
	}

	.date-field__input-fade::after {
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

	.date-field__validation-icon-area {
		display: flex;
		width: var(--_validation-icon-area-width);
		height: 100%;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	:host([valid]) .date-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .date-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.date-field__validation-icon {
		display: flex;
		width: var(--_validation-icon-size);
		height: var(--_validation-icon-size);
	}

	.date-field__picker-button {
		position: relative;
		flex-shrink: 0;
		padding-right: var(--_end-padding-right);
		display: flex;
		align-items: center;
	}


	/* The sheet's title bar only makes sense on a small screen, where the popover
	   becomes a bottom sheet. It shows by default and is hidden from md up. */
	@media (min-width: ${mdMin}) {
		.date-field__picker-button nldd-top-title-bar {
			display: none;
		}
	}
`;

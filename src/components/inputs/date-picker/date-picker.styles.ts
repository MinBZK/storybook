import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const datePickerStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_header-margin-bottom: var(--primitives-space-16);
		--_footer-margin-top: var(--primitives-space-8);
		--_title-font: var(--primitives-font-display-5-sm);
		--_title-button-corner-radius: var(--semantics-controls-sm-corner-radius);
		--_title-chevron-size: var(--primitives-space-20);
		--_weekday-font: var(--primitives-font-body-xs-regular-flat);
		--_weekday-content-color: var(--semantics-content-secondary-color);
		--_divider-color: light-dark(var(--primitives-color-neutral-75), var(--primitives-color-neutral-150));
		--_divider-thickness: var(--semantics-dividers-thickness);
		--_week-number-column-width: var(--primitives-space-32);
		--_week-number-font: var(--primitives-font-body-xs-regular-flat);
		--_week-number-content-color: var(--semantics-content-secondary-color);
		--_day-size: var(--semantics-controls-md-min-size);
		--_day-corner-radius: var(--semantics-controls-md-corner-radius);
		--_day-font: var(--primitives-font-body-sm-regular-flat);
		--_day-indicator-inset: var(--primitives-space-2);
		--_day-indicator-size: calc(var(--_day-size) - var(--_day-indicator-inset) * 2);
		--_day-indicator-corner-radius: 50%;
		--_day-is-in-range-background-color: var(--semantics-categories-accent-tinted-background-color);
		--_day-is-in-range-content-color: var(--semantics-content-color);
		--_day-is-today-background-color: var(--semantics-buttons-neutral-tinted-background-color);
		--_day-is-hovered-background-color: light-dark(var(--primitives-color-accent-100), var(--primitives-color-accent-150));
		--_day-is-selected-background-color: var(--semantics-controls-is-highlighted-indicator-color);
		--_day-is-selected-content-color: var(--semantics-controls-is-highlighted-contrast-color);
		--_day-is-outside-month-content-color: var(--semantics-content-secondary-color);
		--_day-is-unavailable-content-color: var(--semantics-content-secondary-color);

		${inheritedTextReset}
		display: block;
		/* Stated, not fit-content: the calendar inside is sized in percentages, so
		   measuring it from here is circular and resolves to the container. */
		width: calc(var(--_day-size) * 7);
		color: var(--semantics-content-color);
		-webkit-tap-highlight-color: transparent;
	}

	:host([week-numbers]) {
		width: calc(var(--_day-size) * 7 + var(--_week-number-column-width));
	}

	:host([compact]) {
		--_title-font: var(--primitives-font-display-4-sm);

		width: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.date-picker {
		display: flex;
		width: 100%;
		flex-direction: column;
	}


	/* # Header */

	.date-picker__header {
		display: flex;
		margin-bottom: var(--_header-margin-bottom);
		align-items: center;
		justify-content: space-between;
		gap: var(--primitives-space-8);
	}

	.date-picker__title {
		margin: 0;
		font: var(--_title-font);
	}

	.date-picker__title-button {
		box-sizing: border-box;
		display: flex;
		margin: 0;
		outline: none;
		border: none;
		border-radius: var(--_title-button-corner-radius);
		background: none;
		padding: 0;
		align-items: center;
		color: inherit;
		font: inherit;
		appearance: none;
	}

	.date-picker__title-chevron {
		display: flex;
		width: var(--_title-chevron-size);
		height: var(--_title-chevron-size);
		flex-shrink: 0;
		align-items: center;
	}

	.date-picker__title-button:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.date-picker__pagination {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: var(--primitives-space-2);
	}


	/* # Calendar */

	.date-picker__calendar {
		border-collapse: collapse;
		width: 100%;
		table-layout: fixed;
		/* Dragging a range would otherwise select the day numbers as text. */
		-webkit-user-select: none;
		user-select: none;
	}

	.date-picker__weekday-header-cell,
	.date-picker__week-header-cell {
		border-block-end: var(--_divider-thickness) solid var(--_divider-color);
		padding: 0 0 var(--primitives-space-4);
		width: var(--_day-size);
		color: var(--_weekday-content-color);
		font: var(--_weekday-font);
	}

	.date-picker__day-cell,
	.date-picker__week-cell {
		border-block-end: var(--_divider-thickness) solid var(--_divider-color);
		padding: 0;
	}

	tbody tr:last-child .date-picker__day-cell,
	tbody tr:last-child .date-picker__week-cell {
		border-block-end: none;
	}

	.date-picker__week-cell,
	.date-picker__week-header-cell {
		/* Table cells do not inherit the host's border-box, so the padding and rule
		   below would otherwise be added on top of the stated width. */
		box-sizing: border-box;
		border-inline-end: var(--_divider-thickness) solid var(--_divider-color);
		/* Stated rather than auto: an auto column under table-layout: fixed takes
		   all the surplus width and pushes the dates aside. */
		width: var(--_week-number-column-width);
		padding-right: var(--primitives-space-8);
		text-align: right;
		color: var(--_week-number-content-color);
		font: var(--_week-number-font);
	}


	/* # Day */

	.date-picker__day {
		box-sizing: border-box;
		display: flex;
		position: relative;
		margin: 0;
		outline: none;
		border: none;
		background: none;
		width: 100%;
		height: var(--_day-size);
		padding: 0;
		align-items: center;
		justify-content: center;
		color: inherit;
		font: var(--_day-font);
		appearance: none;
	}

	.date-picker__day-range-indicator {
		position: absolute;
		inset-inline: 0;
		inset-block: var(--_day-indicator-inset);
		background-color: var(--_day-is-in-range-background-color);
		pointer-events: none;
	}

	.date-picker__day-range-indicator.is-start {
		inset-inline: 50% 0;
	}

	.date-picker__day-range-indicator.is-end {
		inset-inline: 0 50%;
	}

	.date-picker__day-indicator {
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		border-radius: var(--_day-indicator-corner-radius);
		background-color: transparent;
		pointer-events: none;
		width: var(--_day-indicator-size);
		height: var(--_day-indicator-size);
		transform: translate(-50%, -50%);
	}

	.date-picker__day-number {
		position: relative;
	}

	.date-picker__day.is-today .date-picker__day-indicator {
		background-color: var(--_day-is-today-background-color);
	}

	.date-picker__day:hover .date-picker__day-indicator {
		background-color: var(--_day-is-hovered-background-color);
	}

	/* :focus, not :focus-visible. Arrow keys move focus programmatically, and the
	   browser keeps judging the session by the click that opened the calendar, so
	   focus-visible never matches while navigating. The modality class carries that
	   decision instead - and while it is absent the ring shows, so a failure leaves
	   focus visible rather than hidden.

	   Raised above its neighbours: the ring sits outside the indicator, so an
	   adjacent selected day would paint over part of it. */
	.date-picker__day:focus:not(.is-pointer-focus) {
		z-index: 1;
	}

	.date-picker__day:focus:not(.is-pointer-focus) .date-picker__day-indicator {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	/* These four all set the colour at equal specificity, so the order is what
	   decides: outside the month is the weakest, chosen the strongest. */
	.date-picker__day.is-outside-month {
		color: var(--_day-is-outside-month-content-color);
	}

	.date-picker__day.is-in-range {
		color: var(--_day-is-in-range-content-color);
	}

	.date-picker__day.is-selected {
		color: var(--_day-is-selected-content-color);
	}

	/* Repeated for :hover, which carries a pseudo-class and would otherwise
	   outweigh the plain selected rule. */
	.date-picker__day.is-selected .date-picker__day-indicator,
	.date-picker__day.is-selected:hover .date-picker__day-indicator {
		background-color: var(--_day-is-selected-background-color);
	}

	.date-picker__day.is-unavailable {
		color: var(--_day-is-unavailable-content-color);
		text-decoration: line-through;
	}

	.date-picker__day.is-unavailable:hover .date-picker__day-indicator {
		background-color: transparent;
	}


	/* # Footer */

	.date-picker__footer {
		display: flex;
		margin-top: var(--_footer-margin-top);
		align-items: center;
		justify-content: space-between;
		gap: var(--primitives-space-8);
	}

	/* Holds its corner when today is out of reach and the button is gone. */
	.date-picker__footer-today {
		display: flex;
	}


	/* # Announcer */

	.date-picker__announcer {
		position: absolute;
		clip-path: inset(50%);
		margin: -1px;
		width: 1px;
		height: 1px;
		overflow: hidden;
		white-space: nowrap;
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.date-picker__day.is-selected .date-picker__day-indicator {
			outline: 2px solid CanvasText;
		}

		.date-picker__day:focus:not(.is-pointer-focus) .date-picker__day-indicator {
			outline: 2px solid CanvasText;
		}
	}
`;

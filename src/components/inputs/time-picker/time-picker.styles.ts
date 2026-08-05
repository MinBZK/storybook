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
		/* initial keeps it guaranteed-invalid, so width lands on auto as long as
		   the attribute sets nothing. */
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


	/* # Lists */

	.time-picker__list {
		display: flex;
		width: var(--_list-width);
		overflow-y: auto;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		/* Without this the values of a short list stretch to the full height. */
		justify-content: flex-start;
		scrollbar-width: none;
		/* Not mandatory: then the browser always has to land on a snap point, and a
		   short list can refuse to scroll. */
		scroll-snap-type: y proximity;
		mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
	}

	.time-picker__list::-webkit-scrollbar {
		display: none;
	}

	/* Room for the first and last value to reach the middle. As empty boxes and
	   not as padding-block: Safari does not count the bottom padding of a scroll
	   container towards the scrollable overflow, and on a short list that wipes
	   out all overflow. */
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

	/* While scrolling, the values slide past under a stationary cursor and a
	   different one would light up every time. A tap halfway through a swipe
	   should also stop the scroll, not pick a value.
	   Turning the background off separately: pointer-events only holds off new
	   hover, and a :hover already in place stays until the browser redoes the
	   hit test. */
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


	/* # Selection */

	/* The lists have a mask-image and therefore their own stacking context, and
	   they come after this in the DOM: without z-index their digits paint over
	   it. */
	.time-picker__selection {
		display: flex;
		z-index: 1;
		position: absolute;
		top: 50%;
		right: 0;
		left: 0;
		border-radius: var(--_control-corner-radius);
		background-color: var(--_selection-background-color);
		/* Otherwise this surface catches the swipe meant to scroll the list beneath
		   it, exactly where you put the mouse down. */
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


	/* # High Contrast */

	@media (forced-colors: active) {
		.time-picker__selection {
			outline: 2px solid CanvasText;
		}
	}
`;

import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const justInTimeEducationStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_arrow-length: var(--primitives-space-64); /* JS overrides this with the arrow-length attribute when valid */
		--_desired-arrow-length: max(var(--primitives-space-40), var(--_arrow-length));
		--_no-arrow-gap: var(--primitives-space-16);
		--_gap: min(var(--_desired-arrow-length), var(--_available-distance));
		--_available-distance: 9999px; /* JS sets the px distance to the viewport/document edge; default = no clamp */
		--_background-blur: var(--primitives-space-8);
		--_background-z-index: -1;
		--_corner-radius: var(--primitives-space-40);
		--_text-width: var(--primitives-area-320);
		--_min-text-width: var(--primitives-area-200);
		--_dismiss-width: var(--semantics-controls-md-min-size);
		--_main-width: var(--_text-width);
		--_max-width: var(--_main-width);
		--_show-duration: var(--primitives-transition-duration-fast);
		--_hide-duration: var(--primitives-transition-duration-medium);
		--_offset: 0; /* px, unitless — read by JS */
		--_shift-padding: 8; /* px, unitless — read by JS */
		--_main-padding: var(--primitives-space-16);
		--_main-background-color: color-mix(in srgb, var(--semantics-surfaces-base-background-color) 90%, transparent);
		--_text-color: var(--semantics-content-color);
		--_text-font: var(--primitives-font-body-lg-bold-tight);
		--_supporting-text-color: var(--semantics-content-color);
		--_supporting-text-font: var(--primitives-font-body-md-regular-tight);
		--_arrow-color: var(--semantics-content-color);

		${inheritedTextReset}
		display: contents;
	}

	:host([hidden]) {
		display: none;
	}

	/* no-arrow (consumer) or the auto-collapsed state (JS sets it when the gap would
	 * fall below its minimum): drop to a small fixed gap, with no arrow drawn. */
	:host([no-arrow]),
	:host([data-arrow-collapsed]) {
		--_gap: var(--_no-arrow-gap);
	}

	/* Horizontal placement: the arrow gap is horizontal here (unlike vertical), so
	 * the container is the main plus the arrow length. (Vertical keeps the base
	 * --_max-width = --_main-width.) */
	:host([data-arrow-side="left"]),
	:host([data-arrow-side="right"]) {
		--_max-width: calc(var(--_main-width) + var(--_desired-arrow-length));
	}

	/* The dismiss button widens the main — it sits beside the text — for horizontal
	 * placement only; vertical stacks it below. --_max-width follows via --_main-width. */
	:host([dismissable][data-arrow-side="left"]),
	:host([dismissable][data-arrow-side="right"]) {
		--_main-width: calc(var(--_text-width) + var(--_dismiss-width));
	}

	/* Horizontal placement near a viewport edge: --_available-distance (JS) is the
	 * distance to that edge. Reserve the main's width (--_main-width) so the arrow
	 * gap absorbs the first shrink and falls to 0; the container cap then narrows
	 * the main itself. Skipped for no-arrow, which keeps its fixed gap. */
	:host(:not([no-arrow]):not([data-arrow-collapsed])[data-arrow-side="left"]),
	:host(:not([no-arrow]):not([data-arrow-collapsed])[data-arrow-side="right"]) {
		--_gap: clamp(0px, var(--_desired-arrow-length), calc(var(--_available-distance) - var(--_main-width)));
	}


	/* # Container */

	/* Transparent top-layer wrapper. It carries the arrow gap as padding on the
	 * side facing the control (so the arrow lives INSIDE the box and is never
	 * clipped); the other sides keep a small margin for the blurred background.
	 * pointer-events are off so clicks on the empty padding fall through to the
	 * page (counted as "outside"). The whole thing fades as one on open/close;
	 * the base rule holds the (slower) hide timing, :popover-open the show. */
	.just-in-time-education {
		box-sizing: border-box;
		position: absolute;
		opacity: 0;
		margin: 0;
		border: none;
		background: none;
		width: max-content;
		max-width: var(--_max-width);
		padding: var(--_background-blur);
		pointer-events: none;
		overflow: visible;
		transition:
			opacity var(--_hide-duration) ease,
			display var(--_hide-duration) allow-discrete,
			overlay var(--_hide-duration) allow-discrete;
		/* Force a GPU layer so Safari paints the freshly-opened top-layer popover
		 * (blurred background + SVG arrow) correctly instead of leaving it stale
		 * until a manual resize. */
		transform: translate3d(0, 0, 0);
	}

	/* Horizontal placement: never exceed the room to the viewport edge. Once the
	 * arrow gap has shrunk to 0, this is what makes the main itself narrower. */
	:host([data-arrow-side="left"]) .just-in-time-education,
	:host([data-arrow-side="right"]) .just-in-time-education {
		max-width: min(var(--_max-width), var(--_available-distance));
	}


	/* ## Arrow-side padding (only the side facing the control needs the gap) */

	:host([data-arrow-side="bottom"]) .just-in-time-education {
		padding-block-start: var(--_gap);
	}

	:host([data-arrow-side="top"]) .just-in-time-education {
		padding-block-end: var(--_gap);
	}

	:host([data-arrow-side="left"]) .just-in-time-education {
		padding-inline-end: var(--_gap);
	}

	:host([data-arrow-side="right"]) .just-in-time-education {
		padding-inline-start: var(--_gap);
	}


	/* ## Fade */

	.just-in-time-education:popover-open {
		opacity: 1;
		transition:
			opacity var(--_show-duration) ease,
			display var(--_show-duration) allow-discrete,
			overlay var(--_show-duration) allow-discrete;
	}

	/* Stay invisible (no fade) until Floating UI has placed it, so the fade-in plays at
	   the control rather than flashing at the popover's default spot. The positioned
	   attribute is set once _updatePosition writes the coordinates. */
	.just-in-time-education:popover-open:not([positioned]) {
		opacity: 0;
		transition: none;
	}

	@starting-style {
		.just-in-time-education:popover-open {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.just-in-time-education {
			transition: none;
		}
	}


	/* # Main */

	.just-in-time-education__main {
		box-sizing: border-box;
		position: relative;
		isolation: isolate;
		pointer-events: auto;
		padding: var(--_main-padding);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	/* The dismiss sits on the side away from the arrow: below the text for bottom,
	 * above it for top, beside it (on the placement's own side) for left/right —
	 * so the text always leans toward the control. */
	:host([data-arrow-side="top"]) .just-in-time-education__main {
		flex-direction: column-reverse;
	}

	:host([data-arrow-side="left"]) .just-in-time-education__main {
		flex-direction: row-reverse;
		align-items: center;
	}

	:host([data-arrow-side="right"]) .just-in-time-education__main {
		flex-direction: row;
		align-items: center;
	}

	/* Horizontal placement floor: as the room narrows the main (after the arrow
	 * has collapsed), keep it usable at this minimum — the card overflows the
	 * viewport edge rather than shrinking further. */
	:host([data-arrow-side="left"]) .just-in-time-education__main,
	:host([data-arrow-side="right"]) .just-in-time-education__main {
		min-width: var(--_min-text-width);
	}

	/* ...plus the dismiss button when dismissable: it sits beside the text, so the
	 * text keeps its 200px floor with the button next to it. */
	:host([dismissable][data-arrow-side="left"]) .just-in-time-education__main,
	:host([dismissable][data-arrow-side="right"]) .just-in-time-education__main {
		min-width: calc(var(--_min-text-width) + var(--_dismiss-width));
	}

	/* Background lives on a blurred pseudo-element so its edges fade softly (no
	 * hard border, no drop shadow). The radius is a local, free value because
	 * this surface has a different function than the standard surfaces. The
	 * element is grown by the blur radius so the solid centre still covers the
	 * content after blurring. */
	.just-in-time-education__main::before {
		content: '';
		position: absolute;
		z-index: var(--_background-z-index);
		inset: calc(-1 * var(--_background-blur));
		border-radius: var(--_corner-radius);
		background-color: var(--_main-background-color);
		filter: blur(var(--_background-blur));
		transform: translate3d(0, 0, 0);
	}


	/* ## Text */

	.just-in-time-education__text-area {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	:host([data-arrow-side="left"]) .just-in-time-education__text-area {
		text-align: right;
	}

	:host([data-arrow-side="right"]) .just-in-time-education__text-area {
		text-align: left;
	}

	.just-in-time-education__text {
		margin: 0;
		color: var(--_text-color);
		font: var(--_text-font);
		font-style: italic;
		text-wrap: pretty;
	}

	.just-in-time-education__supporting-text {
		margin: 0;
		color: var(--_supporting-text-color);
		font: var(--_supporting-text-font);
		font-style: italic;
		text-wrap: pretty;
	}


	/* ## Dismiss button */

	.just-in-time-education__dismiss-button {
		display: flex;
	}


	/* # Arrow */

	.just-in-time-education__arrow {
		position: absolute;
		pointer-events: none;
		overflow: visible;
		color: var(--_arrow-color);
		transform: translate3d(0, 0, 0);
	}

	/* Auto-collapsed (gap below its minimum near an edge): hide the arrow; the gap
	 * has already dropped to the small no-arrow value. */
	:host([data-arrow-collapsed]) .just-in-time-education__arrow {
		display: none;
	}

	.just-in-time-education__arrow-path {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: butt;
		stroke-dasharray: 5 3;
	}

	.just-in-time-education__arrow-head {
		fill: currentColor;
	}


	/* # Live-region announcer */

	/* Visually hidden but present in the a11y tree, so the polite announcement set
	 * on open reaches assistive tech without moving focus into the callout. */
	.just-in-time-education__announcer {
		position: absolute;
		margin: -1px;
		border: 0;
		width: 1px;
		height: 1px;
		overflow: hidden;
		padding: 0;
		white-space: nowrap;
		clip-path: inset(50%);
	}
`;

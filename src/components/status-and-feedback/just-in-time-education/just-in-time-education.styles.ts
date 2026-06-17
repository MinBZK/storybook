import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const justInTimeEducationStyles = css`


	/* # Host */

	:host {
		--_arrow-gap: min(max(var(--primitives-space-40), var(--components-just-in-time-education-arrow-length)), var(--_available-room));
		--_available-room: 9999px; /* JS sets the px room left to the document edge; default = no clamp */
		--_background-blur: var(--primitives-space-8);
		--_background-z-index: -1;
		--_corner-radius: var(--primitives-space-40);
		--_max-width: var(--primitives-area-320);
		--_show-duration: var(--primitives-transition-duration-fast);
		--_hide-duration: var(--primitives-transition-duration-medium);
		--_offset: 0; /* px, unitless — read by JS */
		--_shift-padding: 8; /* px, unitless — read by JS */

		${inheritedTextReset}
		display: contents;
	}

	:host([hidden]) {
		display: none;
	}

	:host([no-arrow]) {
		--_arrow-gap: var(--primitives-space-16);
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
		position: fixed;
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


	/* ## Arrow-side padding (only the side facing the control needs the gap) */

	:host([data-arrow-side="bottom"]) .just-in-time-education {
		padding-block-start: var(--_arrow-gap);
	}

	:host([data-arrow-side="top"]) .just-in-time-education {
		padding-block-end: var(--_arrow-gap);
	}

	:host([data-arrow-side="left"]) .just-in-time-education {
		padding-inline-end: var(--_arrow-gap);
	}

	:host([data-arrow-side="right"]) .just-in-time-education {
		padding-inline-start: var(--_arrow-gap);
	}


	/* ## Fade */

	.just-in-time-education:popover-open {
		opacity: 1;
		transition:
			opacity var(--_show-duration) ease,
			display var(--_show-duration) allow-discrete,
			overlay var(--_show-duration) allow-discrete;
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
		padding: var(--components-just-in-time-education-main-padding);
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
		align-items: flex-start;
	}

	:host([data-arrow-side="right"]) .just-in-time-education__main {
		flex-direction: row;
		align-items: flex-start;
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
		background-color: var(--components-just-in-time-education-main-background-color);
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
		color: var(--components-just-in-time-education-text-color);
		font: var(--components-just-in-time-education-text-font);
		font-style: italic;
		text-wrap: pretty;
	}

	.just-in-time-education__supporting-text {
		margin: 0;
		color: var(--components-just-in-time-education-supporting-text-color);
		font: var(--components-just-in-time-education-supporting-text-font);
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
		color: var(--components-just-in-time-education-arrow-color);
		transform: translate3d(0, 0, 0);
	}

	.just-in-time-education__arrow-path {
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-dasharray: 3 4;
	}

	.just-in-time-education__arrow-head {
		fill: currentColor;
	}
`;

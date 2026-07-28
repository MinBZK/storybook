import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../assets/styles/breakpoints.js';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

const smMax = unsafeCSS(breakpoints.smMax);

export const stepIndicatorStyles = css`
	:host {
		box-sizing: border-box;
	}

	:host {
		--_compact-text-gap: var(--primitives-space-8);
		--_compact-text-color: var(--semantics-content-color);
		--_compact-count-color: var(--semantics-content-secondary-color);
		--_compact-bar-gap: var(--primitives-space-4);
		--_compact-bar-segment-gap: var(--primitives-space-2);
		--_compact-bar-corner-radius: var(--primitives-corner-radius-full);
		--_track-color: light-dark(var(--primitives-color-neutral-100), var(--primitives-color-neutral-200));
		--_compact-bar-height: var(--primitives-space-6);
		--_progress-color: var(--semantics-content-accent-color);
		--_item-gap: var(--primitives-space-4);
		--_marker-size: var(--primitives-space-24);
		--_track-thickness: var(--primitives-space-2);
		--_marker-z-index: 1;
		--_marker-corner-radius: var(--primitives-corner-radius-full);
		--_ring-thickness: var(--primitives-space-2);
		--_ring-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));
		--_marker-content-color: var(--semantics-content-secondary-color);
		--_progress-content-color: var(--semantics-content-contrast-color);
		--_current-fill-color: light-dark(var(--primitives-color-accent-100), var(--primitives-color-accent-150));
		--_icon-size: var(--primitives-space-16);
		--_title-color: var(--semantics-content-secondary-color);
		--_current-title-color: var(--semantics-content-color);
		--_control-corner-radius: var(--semantics-controls-md-corner-radius);
		--_control-bleed-block: var(--primitives-space-4);
		--_control-bleed-inline: var(--primitives-space-8);
		--_control-fill-z-index: -1;
		--_control-ring-z-index: 1;
		--_control-hover-background-color: light-dark(var(--primitives-color-neutral-50), var(--primitives-color-neutral-150));

		${inheritedTextReset}
		isolation: isolate;
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}

	.step-indicator__items {
		display: flex;
		align-items: start;

		/* Stays in the DOM for assistive tech when the compact view takes over.
		   Standard visually-hidden recipe. */
		@container (max-width: ${smMax}) {
			position: absolute;
			width: 1px;
			height: 1px;
			overflow: hidden;
			clip-path: inset(50%);
			white-space: nowrap;
		}
	}

	.step-indicator__compact-text {
		display: none;
		margin: 0;
		gap: var(--_compact-text-gap);
		justify-content: space-between;
		align-items: baseline;
		color: var(--_compact-text-color);
		font: var(--primitives-font-body-md-regular-flat);

		@container (max-width: ${smMax}) {
			display: flex;
		}
	}

	.step-indicator__compact-count {
		color: var(--_compact-count-color);
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}

	.step-indicator__compact-bar {
		display: none;
		margin-top: var(--_compact-bar-gap);
		gap: var(--_compact-bar-segment-gap);

		@container (max-width: ${smMax}) {
			display: flex;
		}
	}

	.step-indicator__compact-bar-segment {
		flex: 1;
		border-radius: var(--_compact-bar-corner-radius);
		background-color: var(--_track-color);
		height: var(--_compact-bar-height);
	}

	.step-indicator__compact-bar-segment[data-filled] {
		background-color: var(--_progress-color);
	}
`;

export const stepIndicatorItemStyles = css`
	:host {
		box-sizing: border-box;
	}

	:host {
		${inheritedTextReset}
		display: block;
		flex: 1;
		min-width: 0;
	}

	:host([hidden]) {
		display: none;
	}

	.step-indicator__item {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--_item-gap);
		text-align: center;
	}

	.step-indicator__item::before,
	.step-indicator__item::after {
		position: absolute;
		top: calc(var(--_marker-size) / 2 - var(--_track-thickness) / 2);
		height: var(--_track-thickness);
		content: "";
		background-color: var(--_track-color);
	}

	.step-indicator__item::before {
		left: 0;
		right: 50%;
	}

	.step-indicator__item::after {
		left: 50%;
		right: 0;
	}

	:host(:first-of-type) .step-indicator__item::before {
		content: none;
	}

	:host(:last-of-type) .step-indicator__item::after {
		content: none;
	}

	.step-indicator__item.is-past::before {
		background-color: var(--_progress-color);
	}

	.step-indicator__item.is-past::after {
		background-color: var(--_progress-color);
	}

	.step-indicator__item.is-current::before {
		background-color: var(--_progress-color);
	}

	.step-indicator__item-marker {
		box-sizing: border-box;
		position: relative;
		z-index: var(--_marker-z-index);
		display: flex;
		width: var(--_marker-size);
		height: var(--_marker-size);
		align-items: center;
		justify-content: center;
		border-radius: var(--_marker-corner-radius);
		/* Ring in the background color: masks the track running underneath, so
		   the marker gets breathing room without shortening the track. */
		box-shadow: 0 0 0 var(--_ring-thickness) var(--_ring-color);
		background-color: var(--_track-color);
		color: var(--_marker-content-color);
		font: var(--primitives-font-body-sm-regular-flat);

		@media (forced-colors: active) {
			border: var(--primitives-border-width-regular) solid CanvasText;
		}
	}

	.step-indicator__item.is-past .step-indicator__item-marker {
		background-color: var(--_progress-color);
		color: var(--_progress-content-color);
	}

	.step-indicator__item.is-current .step-indicator__item-marker {
		border: var(--_track-thickness) solid var(--_progress-color);
		background-color: var(--_current-fill-color);
		color: var(--_progress-color);
	}

	.step-indicator__item-icon {
		width: var(--_icon-size);
		height: var(--_icon-size);
	}

	.step-indicator__item-title {
		color: var(--_title-color);
		font: var(--primitives-font-body-sm-regular-flat);
		overflow-wrap: anywhere;
	}

	.step-indicator__item.is-current .step-indicator__item-title {
		color: var(--_current-title-color);
	}

	/* Standard visually-hidden recipe. */
	.step-indicator__item-status {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.step-indicator__item-control {
		position: relative;
		display: flex;
		width: fit-content;
		max-width: 100%;
		flex-direction: column;
		align-items: center;
		gap: var(--_item-gap);
		padding: 0;
		border: none;
		border-radius: var(--_control-corner-radius);
		background: none;
		color: inherit;
		cursor: var(--semantics-controls-link-cursor);
		font: inherit;
		text-decoration: none;
	}

	/* Two layers on the same box, bleeding past the control rather than padding
	   it: padding would move the marker down while the track sits at a fixed
	   offset, and the two would no longer line up. ::before carries the fill and
	   stays under the track; ::after carries the focus ring and goes over it. */
	.step-indicator__item-control::before,
	.step-indicator__item-control::after {
		position: absolute;
		inset: calc(var(--_control-bleed-block) * -1) calc(var(--_control-bleed-inline) * -1);
		border-radius: var(--_control-corner-radius);
		content: "";
		pointer-events: none;
	}

	.step-indicator__item-control::before {
		z-index: var(--_control-fill-z-index);
	}

	.step-indicator__item-control::after {
		z-index: var(--_control-ring-z-index);
	}

	.step-indicator__item-control:focus-visible {
		/* The ring lives on ::after, so the control's own must go — two rings on
		   one control is what the browser default would add here. */
		outline: none;
	}

	.step-indicator__item-control:focus-visible::after {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	/* Hover only on hover-capable devices: keeps a touch-scroll from lighting up
	   the step under the finger. */
	@media (hover: hover) {
		.step-indicator__item-control:hover {
			/* The marker's ring masks the track in the surrounding color, so it
			   has to follow the hover fill or it paints a halo on top of it. */
			--_ring-color: var(--_control-hover-background-color);
		}

		.step-indicator__item-control:hover::before {
			background-color: var(--_control-hover-background-color);
		}
	}
`;

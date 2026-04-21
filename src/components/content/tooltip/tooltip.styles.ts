import { css } from 'lit';

export const tooltipStyles = css`


	/* # Host */

	:host {
		display: contents;
		--_z-index: 10000;
		--_show-delay: 700ms;
		--_show-duration: 150ms;
		--_hide-delay: 50; /* unitless ms, read by JavaScript */
		--_hide-duration: 150ms;
		--_offset: 4; /* px, unitless — read by JS */
		--_shift-padding: 8; /* px, unitless — read by JS */
		--_max-width: var(--primitives-area-280);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.tooltip {
		position: fixed;
		z-index: var(--_z-index);
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		transition:
			opacity var(--_hide-duration) ease,
			visibility 0ms linear var(--_hide-duration),
			pointer-events 0ms linear var(--_hide-duration);
	}

	.tooltip.is-visible {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transition:
			opacity var(--_show-duration) ease var(--_show-delay),
			visibility 0ms linear,
			pointer-events 0ms linear var(--_show-delay);
	}

	/* Focus triggers: geen show delay */
	.tooltip.is-focus-visible {
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transition:
			opacity var(--_show-duration) ease,
			visibility 0ms linear,
			pointer-events 0ms linear;
	}


	/* ## Tooltip body */

	.tooltip__body {
		background-color: var(--components-tooltip-background-color);
		color: var(--components-tooltip-content-color);
		font: var(--primitives-font-body-xs-regular-tight);
		padding-block: var(--primitives-space-4);
		padding-inline: var(--primitives-space-8);
		width: max-content;
		max-width: var(--_max-width);
		overflow-wrap: break-word;
		box-shadow: var(--components-tooltip-box-shadow);
		border-radius: var(--primitives-corner-radius-xs);
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.tooltip__body {
			border: 1px solid CanvasText;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip,
		.tooltip.is-visible,
		.tooltip.is-focus-visible {
			transition: none;
		}
	}
`;

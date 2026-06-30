import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const tooltipStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_hide-duration: var(--primitives-transition-duration-fast);
		--_show-duration: var(--primitives-transition-duration-fast);
		--_max-width: var(--primitives-area-280);
		--_z-index: 10000;
		--_show-delay: 700ms;
		--_hide-delay: 50; /* unitless ms, read by JavaScript */
		--_offset: 4; /* px, unitless — read by JS */
		--_shift-padding: 8; /* px, unitless — read by JS */

		${inheritedTextReset}
		display: contents;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.tooltip {
		position: fixed;
		opacity: 0;
		margin: 0;
		border: none;
		background: none;
		padding: 0;
		transition:
			opacity var(--_hide-duration) ease,
			display var(--_hide-duration) allow-discrete,
			overlay var(--_hide-duration) allow-discrete;
	}

	.tooltip:popover-open {
		opacity: 1;
		transition:
			opacity var(--_show-duration) ease,
			display var(--_show-duration) allow-discrete,
			overlay var(--_show-duration) allow-discrete;
	}

	@starting-style {
		.tooltip:popover-open {
			opacity: 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip,
		.tooltip.is-visible,
		.tooltip.is-focus-visible {
			transition: none;
		}
	}


	/* ## Tooltip body */

	.tooltip__body {
		border-radius: var(--primitives-corner-radius-xs);
		box-shadow: var(--components-tooltip-box-shadow);
		background-color: var(--components-tooltip-background-color);
		width: max-content;
		max-width: var(--_max-width);
		padding-block: var(--primitives-space-4);
		padding-inline: var(--primitives-space-8);
		color: var(--components-tooltip-content-color);
		font: var(--primitives-font-body-xs-regular-tight);
		overflow-wrap: break-word;
	}

	@media (forced-colors: active) {
		.tooltip__body {
			border: 1px solid CanvasText;
		}
	}
`;

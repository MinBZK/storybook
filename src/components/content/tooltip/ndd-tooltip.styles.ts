import { css } from 'lit';

export const tooltipStyles = css`


	/* # Host */

	:host {
		display: contents;
		--_show-delay: 400ms;
		--_show-duration: 50ms;
		--_box-shadow: var(--primitives-box-shadows-level-2);
		--_max-width: var(--primitives-area-280);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Tooltip */

	.tooltip {
		position: fixed;
		z-index: 10000;
		pointer-events: none;
		opacity: 0;
	}

	.tooltip.is-visible {
		animation: tooltip-show var(--_show-duration) ease var(--_show-delay) forwards;
	}

	@keyframes tooltip-show {
		to { opacity: 1; }
	}


	/* ## Tooltip body */

	.tooltip__body {
		background-color: var(--semantics-surfaces-background-color);
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-xs-regular-tight);
		padding-block: var(--primitives-space-4);
		padding-inline: var(--primitives-space-8);
		max-width: var(--_max-width);
		white-space: normal;
		box-shadow: var(--_box-shadow);
		border-radius: var(--primitives-corner-radius-xs);
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.tooltip__body {
			border: 1px solid CanvasText;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tooltip.is-visible {
			animation: none;
			opacity: 1;
		}
	}
`;

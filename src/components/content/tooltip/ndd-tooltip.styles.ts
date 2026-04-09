import { css } from 'lit';

export const tooltipStyles = css`


	/* # Host */

	:host {
		display: contents;
		--_z-index: 10000;
		--_show-delay: 400ms;
		--_show-duration: 50ms;
		--_hide-duration: 50ms;
		--_background-color: light-dark(var(--primitives-color-neutral-600), var(--primitives-color-neutral-750));
		--_content-color: var(--primitives-color-neutral-0);
		--_box-shadow: var(--primitives-box-shadows-level-2);
		--_max-width: var(--primitives-area-280);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Tooltip */

	.tooltip {
		position: fixed;
		z-index: var(--_z-index);
		opacity: 0;
		pointer-events: none;
		transition: opacity var(--_hide-duration) ease;
	}

	.tooltip.is-visible {
		pointer-events: auto;
		animation: tooltip-show var(--_show-duration) ease var(--_show-delay) forwards;
	}

	@keyframes tooltip-show {
		to { opacity: 1; }
	}


	/* ## Tooltip body */

	.tooltip__body {
		background-color: var(--_background-color);
		color: var(--_content-color);
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
		.tooltip {
			transition: none;
		}

		.tooltip.is-visible {
			animation: none;
			opacity: 1;
		}
	}
`;

import { css } from 'lit';

export const tooltipStyles = css`


	/* # Host */

	:host {
		display: contents;
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
		transition: opacity 0.15s ease;
	}

	.tooltip.is-visible {
		opacity: 1;
	}


	/* ## Tooltip body */

	.tooltip__body {
		background-color: var(--primitives-color-neutral-0);
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-xs-regular-tight);
		padding-block: var(--primitives-space-4);
		padding-inline: var(--primitives-space-8);
		white-space: nowrap;
		box-shadow: var(--primitives-box-shadows-level-2);
		border-radius: var(--primitives-corner-radius-sm);
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
	}
`;

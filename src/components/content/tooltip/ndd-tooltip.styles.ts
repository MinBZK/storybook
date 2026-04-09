import { css } from 'lit';

export const tooltipStyles = css`


	/* # Host */

	:host {
		display: contents;
		--_z-index: 10000;
		--_show-delay: 700ms;
		--_show-duration: 150ms;
		--_hide-duration: 150ms;
		--_background-color: light-dark(var(--primitives-color-neutral-600), var(--primitives-color-neutral-750));
		--_content-color: var(--primitives-color-neutral-0);
		--_offset: var(--primitives-space-4);
		--_shift-padding: var(--primitives-space-8);
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
		transition: opacity var(--_hide-duration) ease, visibility 0ms linear var(--_hide-duration);
		visibility: hidden;
	}

	.tooltip.is-visible {
		pointer-events: auto;
		opacity: 1;
		visibility: visible;
		transition: opacity var(--_show-duration) ease var(--_show-delay), visibility 0ms linear;
	}


	/* ## Tooltip body */

	.tooltip__body {
		background-color: var(--_background-color);
		color: var(--_content-color);
		font: var(--primitives-font-body-xs-regular-tight);
		padding-block: var(--primitives-space-4);
		padding-inline: var(--primitives-space-8);
		max-width: var(--_max-width);
		white-space: nowrap;
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
		.tooltip,
		.tooltip.is-visible {
			transition: none;
		}
	}
`;

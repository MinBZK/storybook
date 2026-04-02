import { css } from 'lit';

export const paginationStyles = css`


	/* # Host */

	:host {
		display: block;
		container-type: inline-size;
	}

	:host([hidden]) {
		display: none;
	}

	:host([full-width]) {
		display: flex;
		justify-content: center;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Container */

	.pagination {
		display: inline-flex;
		align-items: center;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* # Page button */

	.pagination__page-button {
		appearance: none;
		border: none;
		background: transparent;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		padding-block: var(--primitives-space-8);
		padding-inline: var(--primitives-space-12);
		font: var(--semantics-buttons-md-font);
		color: inherit;
		box-sizing: border-box;
		position: relative;
		margin: 0;
	}

	a.pagination__page-button {
		text-decoration: none;
		color: inherit;
	}

	.pagination__page-button:hover,
	.pagination__page-button:focus-visible {
		z-index: 1;
	}

	.pagination__page-button:focus-visible {
		outline: none;
	}

	.pagination__page-button.is-current {
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}


	/* ## Page button indicator */

	.pagination__page-button-indicator {
		position: absolute;
		inset: var(--primitives-space-4);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - var(--primitives-space-4) / 2);
		background-color: transparent;
		pointer-events: none;
	}

	.pagination__page-button:hover:not(.is-current) .pagination__page-button-indicator {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
	}

	.pagination__page-button.is-current .pagination__page-button-indicator {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
	}

	.pagination__page-button:focus-visible .pagination__page-button-indicator {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* ## Page button text */

	.pagination__page-button-text {
		position: relative;
		z-index: 1;
		pointer-events: none;
	}


	/* # Ellipsis */

	.pagination__ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		padding-block: var(--primitives-space-8);
		padding-inline: var(--primitives-space-12);
		font: var(--semantics-buttons-md-font);
		color: inherit;
		box-sizing: border-box;
		pointer-events: none;
	}


	/* # Divider */

	.pagination__divider {
		display: flex;
		align-items: center;
		justify-content: center;
		height: var(--semantics-controls-md-min-size);
		flex-shrink: 0;
	}

	.pagination__divider-line {
		width: var(--semantics-dividers-thickness);
		height: var(--semantics-buttons-md-divider-length);
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
	}


	/* # Select (compact fallback) */

	.pagination__select-wrapper {
		position: relative;
		display: inline-flex;
		align-items: center;
	}

	.pagination__select {
		appearance: none;
		border: none;
		background: transparent;
		height: var(--semantics-controls-md-min-size);
		padding-block: var(--primitives-space-8);
		padding-inline-start: var(--primitives-space-12);
		padding-inline-end: calc(var(--primitives-space-24) + var(--primitives-space-12));
		font: var(--semantics-buttons-md-font);
		color: inherit;
		box-sizing: border-box;
		margin: 0;
		position: relative;
		z-index: 1;
	}

	.pagination__select:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - var(--primitives-space-4) / 2);
	}

	.pagination__select-picker-icon {
		position: absolute;
		inset-inline-end: var(--primitives-space-8);
		pointer-events: none;
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}


	/* # Responsive */

	.pagination__page-buttons {
		display: contents;
	}

	.pagination__compact {
		display: none;
	}

	@container (max-width: 400px) {
		.pagination__page-buttons {
			display: none;
		}

		.pagination__compact {
			display: contents;
		}
	}


	/* # High contrast */

	@media (forced-colors: active) {
		.pagination {
			border: 1px solid CanvasText;
		}

		.pagination__page-button.is-current {
			color: HighlightText;
		}

		.pagination__page-button.is-current .pagination__page-button-indicator {
			background-color: Highlight;
		}

		.pagination__page-button:focus-visible .pagination__page-button-indicator {
			outline: 2px solid CanvasText;
		}
	}
`;

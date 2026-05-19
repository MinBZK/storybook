import { css } from 'lit';

export const paginationStyles = css`


	/* # Host */

	:host {
		display: block;
		container-type: inline-size;
		isolation: isolate;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([centered]) {
		display: flex;
		justify-content: center;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.pagination {
		display: inline-flex;
		border-radius: var(--semantics-controls-md-corner-radius);
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		align-items: center;
	}

	@media (forced-colors: active) {
		.pagination {
			border: 1px solid CanvasText;
		}
	}

	.pagination__previous-button:focus-within,
	.pagination__next-button:focus-within {
		position: relative;
		z-index: 1;
	}


	/* # Page button */

	.pagination__page-button {
		box-sizing: border-box;
		display: inline-flex;
		position: relative;
		margin: 0;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: transparent;
		min-width: var(--semantics-controls-md-min-size);
		height: var(--semantics-controls-md-min-size);
		padding-block: var(--primitives-space-8);
		padding-inline: var(--primitives-space-12);
		align-items: center;
		justify-content: center;
		color: inherit;
		font: var(--semantics-buttons-md-font);
		appearance: none;
	}

	a.pagination__page-button {
		text-decoration: none;
	}

	@media (hover: hover) {
		.pagination__page-button:hover:not(.is-current) {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		}
	}

	.pagination__page-button.is-current {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	@media (forced-colors: active) {
		.pagination__page-button.is-current {
			background-color: Highlight;
			color: HighlightText;
		}
	}

	.pagination__page-button:focus-visible {
		z-index: 1;
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	@media (forced-colors: active) {
		.pagination__page-button:focus-visible {
			outline: 2px solid CanvasText;
		}
	}


	/* # Ellipsis */

	.pagination__ellipsis {
		box-sizing: border-box;
		display: inline-flex;
		pointer-events: none;
		min-width: var(--semantics-controls-md-min-size);
		height: var(--semantics-controls-md-min-size);
		padding-block: var(--primitives-space-8);
		padding-inline: var(--primitives-space-12);
		align-items: center;
		justify-content: center;
		color: inherit;
		font: var(--semantics-buttons-md-font);
	}


	/* # Divider */

	.pagination__divider {
		display: flex;
		height: var(--semantics-controls-md-min-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
	}

	.pagination__divider-line {
		background-color: var(--semantics-buttons-neutral-tinted-divider-color);
		width: var(--semantics-dividers-thickness);
		height: var(--semantics-buttons-md-divider-length);
	}


	/* # Select (compact fallback) */

	.pagination__select-wrapper {
		display: inline-flex;
		position: relative;
		align-items: center;
	}

	.pagination__select {
		box-sizing: border-box;
		position: relative;
		z-index: 1;
		margin: 0;
		border: none;
		background: transparent;
		height: var(--semantics-controls-md-min-size);
		padding-block: var(--primitives-space-8);
		padding-inline-start: var(--primitives-space-12);
		padding-inline-end: calc(var(--primitives-space-24) + var(--primitives-space-4));
		color: inherit;
		font: var(--semantics-buttons-md-font);
		appearance: none;
	}

	.pagination__select:focus {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		border-radius: calc(var(--semantics-controls-md-corner-radius) - var(--primitives-space-4) / 2);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host([is-pointer-focus]) .pagination__select:focus {
		outline: none;
		box-shadow: none;
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

		@container (max-width: 400px) {
			display: none;
		}
	}

	.pagination__compact {
		display: none;

		@container (max-width: 400px) {
			display: contents;
		}
	}
`;

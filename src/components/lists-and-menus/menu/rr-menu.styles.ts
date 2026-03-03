import { css } from 'lit';

export const menuStyles = css`
	/* # host */

	:host {
		display: block;
		padding: 0;
		border: none;
		background: transparent;
		margin: 0;
		position: absolute;
		overflow: visible;
	}

	:host(:not(:popover-open)) {
		display: none;
	}

	/* # menu */

	.menu {
		display: flex;
		flex-direction: column;
		padding: var(--primitives-space-8);
		gap: var(--primitives-space-2);
		background: var(--semantics-surfaces-background-color);
		border-radius: var(--semantics-overlays-corner-radius);
		box-shadow: var(--primitives-box-shadows-level-5);
		box-sizing: border-box;
		min-width: 200px;
	}
`;

export const menuItemStyles = css`
	/* # host */

	:host {
		display: block;
		font-family: var(--rr-font-family-body);
	}

	:host([hidden]) {
		display: none;
	}

	/* # item */

	.item {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8);
		box-sizing: border-box;
		border: none;
		border-radius: var(--semantics-controls-md-corner-radius);
		background: transparent;
		text-align: start;
		appearance: none;
		color: var(--semantics-content-color);
		font: var(--primitives-font-body-md-regular-tight);
	}

	/* # variant: danger */

	:host([variant="danger"]) .item {
		color: var(--primitives-color-danger-500);
	}

	/* # hover */

	.item:hover:not(:disabled) {
		background-color: var(--primitives-color-accent-700);
		color: var(--primitives-color-neutral-0);
	}

	:host([variant="danger"]) .item:hover:not(:disabled) {
		background-color: var(--primitives-color-danger-500);
		color: var(--primitives-color-neutral-0);
	}

	/* # focus */

	.item:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* # disabled */

	:host([disabled]) .item {
		opacity: var(--primitives-opacity-disabled);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* # reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.item {
			transition: none;
		}
	}

	/* # forced-colors */

	@media (forced-colors: active) {
		.item:hover {
			background-color: Highlight;
			color: HighlightText;
		}

		.item:focus-visible {
			outline: 2px solid CanvasText;
		}
	}
`;

export const menuDividerStyles = css`
	/* # host */

	:host {
		display: block;
		padding: var(--primitives-space-4) 0;
	}

	:host([hidden]) {
		display: none;
	}

	/* # divider */

	.divider {
		height: 1px;
		background-color: var(--semantics-dividers-color);
	}
`;

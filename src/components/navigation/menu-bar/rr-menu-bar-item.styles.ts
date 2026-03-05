import { css } from 'lit';

export const styles = css`

	/* # Host */

	:host {
		display: inline-block;
		position: relative;
		width: fit-content;
		font-family: var(--rr-font-family-body);
		--_color: var(--components-menu-bar-menu-item-color);
	}

	:host([hidden]) {
		display: none;
	}

	/* # Item */

	.menu-bar-item {
		appearance: none;
		border: none;
		margin: 0;
		background: none;
		text-decoration: none;
		display: flex;
		position: relative;
		height: 44px;
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		font: var(--components-menu-bar-menu-item-font);
		color: var(--rr-menu-bar-item-color, var(--_color));
		text-align: center;
		padding: 0 var(--primitives-space-8);
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	:host([selected]) .menu-bar-item {
		color: var(--_color);
	}

	/* # Hover indicator */

	.hover-indicator {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0;
		background-color: var(--components-menu-bar-menu-item-is-hovered-indicator-background-color);
		transition: height 0.15s ease;
		pointer-events: none;
		z-index: 0;
	}

	.menu-bar-item:hover:not(:disabled) .hover-indicator {
		height: var(--components-menu-bar-menu-item-is-hovered-indicator-height);
	}

	/* # Selection indicator */

	.selection-indicator {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0;
		background-color: var(--components-menu-bar-menu-item-is-selected-indicator-background-color);
		transition: height 0.15s ease;
		pointer-events: none;
		z-index: 1;
	}

	:host([selected]) .selection-indicator {
		height: var(--components-menu-bar-menu-item-is-selected-indicator-height);
	}

	/* # Content */

	.content {
		position: relative;
		z-index: 2;
	}

	/* # Focus */

	.menu-bar-item:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* # Disabled */

	:host([disabled]) .menu-bar-item {
		opacity: var(--primitives-opacity-disabled);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.menu-bar-item,
		.hover-indicator,
		.selection-indicator {
			transition: none;
		}
	}
`;

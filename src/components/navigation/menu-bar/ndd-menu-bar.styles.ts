import { css } from 'lit';

export const menuBarItemStyles = css`

	/* # Host */

	:host {
		display: inline-block;
		position: relative;
		width: fit-content;
		font-family: var(--ndd-font-family-body);
		--_color: var(--components-menu-bar-menu-item-color);
		-webkit-tap-highlight-color: transparent;
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
		color: var(--ndd-menu-bar-item-color, var(--_color));
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

export const styles = css`

	/* # Host */

	:host {
		display: block;
		font-family: var(--ndd-font-family-body);
		width: 100%;
		min-width: 0;
	}

	:host([hidden]) {
		display: none;
	}

	/* # Container */

	.container {
		display: flex;
		flex-direction: column;
		width: 100%;
		min-width: 0;
	}

	/* # Title */

	.title {
		padding: var(--primitives-space-8) var(--primitives-space-16);
		margin: 0;
		color: var(--components-menu-bar-menu-item-color);
	}

	:host([size="s"]) .title {
		font: var(--components-menu-bar-title-item-s-font);
	}

	:host([size="m"]) .title,
	:host(:not([size])) .title {
		font: var(--components-menu-bar-title-item-m-font);
	}

	:host([size="l"]) .title {
		font: var(--components-menu-bar-title-item-l-font);
	}

	::slotted([slot="title"]) {
		color: inherit;
	}

	/* # Menu */

	.menu {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		border-bottom: var(
			--ndd-menu-bar-border,
			var(--semantics-dividers-thickness) solid var(--semantics-dividers-color)
		);
		position: relative;
		width: 100%;
		min-width: 0;
	}

	::slotted(ndd-menu-bar-item) {
		flex: 0 0 auto;
	}

	/* # Overflow wrapper */

	.overflow-wrapper {
		position: relative;
		flex-shrink: 0;
	}

	/* # Overflow button */

	.overflow-button {
		display: none;
		align-items: center;
		gap: var(--primitives-space-4);
		padding: var(--primitives-space-8) var(--primitives-space-16);
		background: none;
		border: none;
		color: var(--components-menu-bar-menu-item-color);
		font: var(--components-menu-bar-menu-item-font);
		cursor: pointer;
		white-space: nowrap;
	}

	.overflow-button:hover {
		background-color: var(--primitives-color-neutral-100);
	}

	.overflow-button:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	.overflow-icon {
		width: 16px;
		height: 16px;
		transition: transform 0.2s ease;
	}

	.overflow-button[aria-expanded="true"] .overflow-icon {
		transform: rotate(180deg);
	}

	/* # Overflow dropdown */

	.overflow-dropdown {
		display: none;
		position: absolute;
		top: 100%;
		right: 0;
		margin-top: var(--primitives-space-4);
		min-width: 200px;
		background: var(--primitives-color-neutral-0);
		border: 1px solid var(--semantics-dividers-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		box-shadow: var(--primitives-box-shadows-level-3);
		z-index: 10000;
		padding: var(--primitives-space-4) 0;
	}

	.overflow-dropdown.open {
		display: block;
	}

	/* # Overflow item */

	.overflow-item {
		display: block;
		width: 100%;
		padding: var(--primitives-space-8) var(--primitives-space-16);
		background: none;
		border: none;
		color: var(--components-menu-bar-menu-item-color);
		font: var(--components-menu-bar-menu-item-font);
		text-align: left;
		cursor: pointer;
		white-space: nowrap;
	}

	.overflow-item:hover {
		background-color: var(--primitives-color-neutral-100);
	}

	.overflow-item:focus-visible {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* # Reduced motion */

	@media (prefers-reduced-motion: reduce) {
		.overflow-icon {
			transition: none;
		}
	}
`;

import { css } from 'lit';

export const styles = css`


	/* # Host */

	:host {
		--_indicator-z-index: 0;
		--_content-z-index: 1;
		--_focus-z-index: 1;
		display: inline-block;
		position: relative;
		flex-grow: 0;
		flex-shrink: 0;
		flex-basis: auto;
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
		height: var(--semantics-controls-md-min-size);
		min-width: var(--semantics-controls-md-min-size);
		box-sizing: border-box;
		justify-content: center;
		align-items: center;
		gap: var(--primitives-space-4);
		font: var(--components-menu-bar-item-font);
		color: var(--components-menu-bar-item-content-color);
		text-align: center;
		padding: 0 var(--components-menu-bar-item-inline-padding);
		white-space: nowrap;
	}

	/* ## Hover indicator (::before) */

	.menu-bar-item::before {
		content: '';
		position: absolute;
		top: var(--primitives-space-6);
		bottom: var(--primitives-space-6);
		left: 0;
		right: 0;
		border-radius: var(--semantics-controls-sm-corner-radius);
		pointer-events: none;
		z-index: var(--_indicator-z-index);
	}

	.menu-bar-item:hover::before {
		background-color: var(--components-menu-bar-item-is-hovered-indicator-background-color);
	}

	:host([open]) .menu-bar-item::before {
		background-color: var(--components-menu-bar-item-is-open-indicator-background-color);
	}

	:host([open]) .menu-bar-item:hover::before {
		background-color: var(--components-menu-bar-item-is-hovered-indicator-background-color);
	}

	/* ## Current indicator (::after) */

	:host([current]) .menu-bar-item::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: var(--primitives-space-8);
		right: var(--primitives-space-8);
		height: var(--components-menu-bar-item-is-current-indicator-height);
		background-color: var(--components-menu-bar-item-is-current-indicator-background-color);
		pointer-events: none;
		z-index: var(--_indicator-z-index);
	}

	/* ## Text */

	.menu-bar-item__text {
		position: relative;
		z-index: var(--_content-z-index);
	}

	/* ## Icon */

	.menu-bar-item__icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		flex-shrink: 0;
		z-index: var(--_content-z-index);
	}

	/* ## Disclosure icon */

	.menu-bar-item__disclosure-icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
		z-index: var(--_content-z-index);
	}


	/* # Focus */

	:host(:focus-within) {
		z-index: var(--_focus-z-index);
	}

	.menu-bar-item:focus-visible {
		outline: none;
	}

	.menu-bar-item:focus-visible::before {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Slotted */

	::slotted(nldd-menu-item),
	::slotted(nldd-menu-divider) {
		display: none;
	}


	/* # Disabled */

	:host([disabled]) .menu-bar-item {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Icon-only */

	:host([icon-only]) .menu-bar-item,
	:host([content-priority="icon"][compact][icon]:not([icon=""])) .menu-bar-item {
		padding: var(--primitives-space-8);
	}

	:host([icon-only]) .menu-bar-item__text,
	:host([content-priority="icon"][compact][icon]:not([icon=""])) .menu-bar-item__text {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	/* ## Text-only when compact */

	:host([content-priority="text"][compact]) .menu-bar-item__icon {
		display: none;
	}
`;

import { css } from 'lit';

export const toggleButtonStyles = css`


	/* # Host */

	:host {
		display: inline-block;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.toggle-button {
		/* Reset */
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: none;
		font: inherit;

		/* Layout */
		position: relative;
		box-sizing: border-box;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		text-decoration: none;

		/* Appearance */
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	/* ## Sizes */

	:host([size="xs"]) .toggle-button {
		min-height: var(--semantics-controls-xs-min-size);
		padding: var(--semantics-controls-xs-block-padding) var(--semantics-controls-xs-inline-padding);
		font: var(--semantics-buttons-xs-font);
		border-radius: var(--semantics-controls-xs-corner-radius);
		gap: var(--semantics-buttons-xs-gap);
	}

	:host([size="sm"]) .toggle-button {
		min-height: var(--semantics-controls-sm-min-size);
		padding: var(--semantics-controls-sm-block-padding) var(--semantics-controls-sm-inline-padding);
		font: var(--semantics-buttons-sm-font);
		border-radius: var(--semantics-controls-sm-corner-radius);
		gap: var(--semantics-buttons-sm-gap);
	}

	:host([size="md"]) .toggle-button,
	:host(:not([size])) .toggle-button {
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--semantics-controls-md-block-padding) var(--semantics-controls-md-inline-padding);
		font: var(--semantics-buttons-md-font);
		border-radius: var(--semantics-controls-md-corner-radius);
		gap: var(--semantics-buttons-md-gap);
	}

	/* ## Icon-only sizes */

	:host([icon-only][size="xs"]) .toggle-button {
		width: var(--semantics-controls-xs-min-size);
		padding: 0;
	}

	:host([icon-only][size="sm"]) .toggle-button {
		width: var(--semantics-controls-sm-min-size);
		padding: 0;
	}

	:host([icon-only][size="md"]) .toggle-button,
	:host([icon-only]:not([size])) .toggle-button {
		width: var(--semantics-controls-md-min-size);
		padding: 0;
	}

	/* ## Hover */

	.toggle-button:hover,
	.toggle-button:has(.toggle-button__input:hover) {
		background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
	}

	/* ## Selected */

	:host([selected]) .toggle-button {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	:host([selected]) .toggle-button:hover,
	:host([selected]) .toggle-button:has(.toggle-button__input:hover) {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-content-color);
	}

	/* ## Focus */

	.toggle-button:focus-visible,
	.toggle-button:has(.toggle-button__input:focus-visible) {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}

	.toggle-button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Icon */

	/* Hide the original nldd-icon in the slot — it is re-rendered in the shadow DOM */
	::slotted(nldd-icon) {
		display: none;
	}

	.toggle-button__icon {
		display: block;
		flex-shrink: 0;
	}

	:host([size="md"]) .toggle-button__icon,
	:host(:not([size])) .toggle-button__icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	:host([size="sm"]) .toggle-button__icon {
		width: var(--primitives-space-18);
		height: var(--primitives-space-18);
	}

	:host([size="xs"]) .toggle-button__icon {
		width: var(--primitives-space-16);
		height: var(--primitives-space-16);
	}


	/* # Input */

	.toggle-button__input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		z-index: 1;
	}
`;

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


	/* # Base */

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
		padding: var(--primitives-space-4) var(--primitives-space-6);
		font: var(--semantics-buttons-xs-font);
		border-radius: var(--semantics-controls-xs-corner-radius);
		gap: var(--primitives-space-2);
	}

	:host([size="sm"]) .toggle-button {
		min-height: var(--semantics-controls-sm-min-size);
		padding: var(--primitives-space-6) var(--primitives-space-8);
		font: var(--semantics-buttons-sm-font);
		border-radius: var(--semantics-controls-sm-corner-radius);
		gap: var(--primitives-space-2);
	}

	:host([size="md"]) .toggle-button,
	:host(:not([size])) .toggle-button {
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--primitives-space-8) var(--primitives-space-14);
		font: var(--semantics-buttons-md-font);
		border-radius: var(--semantics-controls-md-corner-radius);
		gap: var(--primitives-space-4);
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
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	.toggle-button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Icon */

	/* Hide the original ndd-icon in the slot — it is re-rendered in the shadow DOM */
	::slotted(ndd-icon) {
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

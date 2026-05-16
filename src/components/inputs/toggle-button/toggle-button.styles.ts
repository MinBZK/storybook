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
		margin: 0;
		border: none;
		background: none;
		padding: 0;
		font: inherit;
		appearance: none;

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
		border-radius: var(--semantics-controls-xs-corner-radius);
		min-height: var(--semantics-controls-xs-min-size);
		padding: var(--semantics-controls-xs-block-padding) var(--semantics-controls-xs-inline-padding);
		gap: var(--semantics-buttons-xs-gap);
		font: var(--semantics-buttons-xs-font);
	}

	:host([size="sm"]) .toggle-button {
		border-radius: var(--semantics-controls-sm-corner-radius);
		min-height: var(--semantics-controls-sm-min-size);
		padding: var(--semantics-controls-sm-block-padding) var(--semantics-controls-sm-inline-padding);
		gap: var(--semantics-buttons-sm-gap);
		font: var(--semantics-buttons-sm-font);
	}

	:host([size="md"]) .toggle-button,
	:host(:not([size])) .toggle-button {
		border-radius: var(--semantics-controls-md-corner-radius);
		min-height: var(--semantics-controls-md-min-size);
		padding: var(--semantics-controls-md-block-padding) var(--semantics-controls-md-inline-padding);
		gap: var(--semantics-buttons-md-gap);
		font: var(--semantics-buttons-md-font);
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

	@media (hover: hover) {
		.toggle-button:hover,
		.toggle-button:has(.toggle-button__input:hover) {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}
	}

	/* ## Selected */

	:host([selected]) .toggle-button {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-content-color);
	}

	@media (hover: hover) {
		:host([selected]) .toggle-button:hover,
		:host([selected]) .toggle-button:has(.toggle-button__input:hover) {
			background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-selected-is-hovered-content-color);
		}
	}

	/* ## Focus */

	.toggle-button:focus-visible,
	.toggle-button:has(.toggle-button__input:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
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

	/* ## Icon size — naast tekst (default) */

	:host([size="md"]) .toggle-button__icon,
	:host(:not([size])) .toggle-button__icon {
		width: var(--semantics-buttons-md-icon-size);
		height: var(--semantics-buttons-md-icon-size);
	}

	:host([size="sm"]) .toggle-button__icon {
		width: var(--semantics-buttons-sm-icon-size);
		height: var(--semantics-buttons-sm-icon-size);
	}

	:host([size="xs"]) .toggle-button__icon {
		width: var(--semantics-buttons-xs-icon-size);
		height: var(--semantics-buttons-xs-icon-size);
	}

	/* ## Icon size — icon-only mode */

	:host([icon-only][size="md"]) .toggle-button__icon,
	:host([icon-only]:not([size])) .toggle-button__icon {
		width: var(--semantics-buttons-md-icon-only-icon-size);
		height: var(--semantics-buttons-md-icon-only-icon-size);
	}

	:host([icon-only][size="sm"]) .toggle-button__icon {
		width: var(--semantics-buttons-sm-icon-only-icon-size);
		height: var(--semantics-buttons-sm-icon-only-icon-size);
	}

	:host([icon-only][size="xs"]) .toggle-button__icon {
		width: var(--semantics-buttons-xs-icon-only-icon-size);
		height: var(--semantics-buttons-xs-icon-only-icon-size);
	}


	/* # Input */

	.toggle-button__input {
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: 1;
		margin: 0;
		width: 100%;
		height: 100%;
	}
`;

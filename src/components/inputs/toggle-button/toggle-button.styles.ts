import { css } from 'lit';

export const toggleButtonStyles = css`


	/* # Host */

	:host {
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_padding: var(--semantics-controls-md-block-padding) var(--semantics-controls-md-inline-padding);
		--_gap: var(--semantics-buttons-md-gap);
		--_font: var(--semantics-buttons-md-font);
		--_icon-size: var(--semantics-buttons-md-icon-size);
		--_icon-only-icon-size: var(--semantics-buttons-md-icon-only-icon-size);

		display: inline-block;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_padding: var(--semantics-controls-sm-block-padding) var(--semantics-controls-sm-inline-padding);
		--_gap: var(--semantics-buttons-sm-gap);
		--_font: var(--semantics-buttons-sm-font);
		--_icon-size: var(--semantics-buttons-sm-icon-size);
		--_icon-only-icon-size: var(--semantics-buttons-sm-icon-only-icon-size);
	}

	:host([size="xs"]) {
		--_corner-radius: var(--semantics-controls-xs-corner-radius);
		--_min-size: var(--semantics-controls-xs-min-size);
		--_padding: var(--semantics-controls-xs-block-padding) var(--semantics-controls-xs-inline-padding);
		--_gap: var(--semantics-buttons-xs-gap);
		--_font: var(--semantics-buttons-xs-font);
		--_icon-size: var(--semantics-buttons-xs-icon-size);
		--_icon-only-icon-size: var(--semantics-buttons-xs-icon-only-icon-size);
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Block */

	.toggle-button {
		box-sizing: border-box;
		display: inline-flex;
		position: relative;
		margin: 0;
		border: none;
		border-radius: var(--_corner-radius);
		background: none;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		width: var(--_min-size);
		min-height: var(--_min-size);
		padding: 0;
		gap: var(--_gap);
		align-items: center;
		justify-content: center;
		color: var(--semantics-buttons-neutral-tinted-content-color);
		font: var(--_font);
		white-space: nowrap;
		text-decoration: none;
		appearance: none;
	}

	.toggle-button:has(.toggle-button__text) {
		width: auto;
		padding: var(--_padding);
	}

	@media (hover: hover) {
		.toggle-button:hover,
		.toggle-button:has(.toggle-button__input:hover) {
			background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
			color: var(--semantics-buttons-neutral-tinted-is-hovered-content-color);
		}
	}

	.toggle-button:active,
	.toggle-button:has(.toggle-button__input:active) {
		background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-active-content-color);
	}

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

	:host([selected]) .toggle-button:active,
	:host([selected]) .toggle-button:has(.toggle-button__input:active) {
		background-color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-background-color);
		color: var(--semantics-buttons-neutral-tinted-is-selected-is-active-content-color);
	}

	.toggle-button:focus-visible,
	.toggle-button:has(.toggle-button__input:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.toggle-button:focus:not(:focus-visible) {
		outline: none;
	}


	/* # Elements */

	::slotted(nldd-icon) {
		display: none;
	}

	.toggle-button__icon,
	::slotted([slot="icon"]) {
		display: block;
		width: var(--_icon-only-icon-size);
		height: var(--_icon-only-icon-size);
		flex-shrink: 0;
	}

	.toggle-button:has(.toggle-button__text) .toggle-button__icon,
	.toggle-button:has(.toggle-button__text) ::slotted([slot="icon"]) {
		width: var(--_icon-size);
		height: var(--_icon-size);
	}

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

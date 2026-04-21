import { css } from 'lit';

export const comboBoxStyles = css`


	/* # Host */

	:host {
		display: block;
		--_background-color: var(--semantics-input-fields-background-color);
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

	.combo-box {
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--_background-color);
		border: var(--semantics-input-fields-border);
	}

	:host([size='sm']) .combo-box {
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .combo-box,
	:host(:not([size])) .combo-box {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	.combo-box:has(input:-webkit-autofill),
	.combo-box:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.combo-box:has(.combo-box__input:focus-visible) {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Input */

	.combo-box__input {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		outline: none;
		box-sizing: border-box;
		flex: 1;
		min-width: 0;
		width: 100%;
		color: var(--semantics-content-color);
	}

	:host([size='sm']) .combo-box__input {
		padding: 0 calc(var(--semantics-controls-sm-inline-padding) - var(--semantics-input-fields-border-thickness));
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .combo-box__input,
	:host(:not([size])) .combo-box__input {
		padding: 0 calc(var(--semantics-controls-md-inline-padding) - var(--semantics-input-fields-border-thickness));
		font: var(--semantics-input-fields-md-text-font);
	}

	.combo-box__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.combo-box__input:-webkit-autofill,
	.combo-box__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}


	/* # Actions */

	.combo-box__actions {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		gap: var(--primitives-space-6);
	}

	:host([size='sm']) .combo-box__actions {
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	:host([size='md']) .combo-box__actions,
	:host(:not([size])) .combo-box__actions {
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	.combo-box__clear-action:focus-within,
	.combo-box__picker:focus-within {
		position: relative;
		z-index: 1;
	}
`;

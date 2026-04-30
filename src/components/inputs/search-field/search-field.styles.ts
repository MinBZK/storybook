import { css } from 'lit';

export const searchFieldStyles = css`


	/* # Host */

	:host {
		display: block;
		--_background-color: var(--semantics-input-fields-background-color);
		--_z-index-button-focus: 1;
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

	.search-field {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--_background-color);
		border: var(--semantics-input-fields-border);
	}

	:host([size='sm']) .search-field {
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .search-field,
	:host(:not([size])) .search-field {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	.search-field:has(.search-field__input:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.search-field:has(input:-webkit-autofill),
	.search-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}


	/* # Search icon */

	.search-field__search-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--semantics-content-secondary-color);
	}

	:host([size='sm']) .search-field__search-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		margin-inline: calc((var(--semantics-controls-sm-min-size) - var(--primitives-space-20)) / 2 - var(--semantics-input-fields-border-thickness));
	}

	:host([size='md']) .search-field__search-icon,
	:host(:not([size])) .search-field__search-icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
		margin-inline: calc((var(--semantics-controls-md-min-size) - var(--primitives-space-24)) / 2 - var(--semantics-input-fields-border-thickness));
	}


	/* # Input */

	.search-field__input {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0;
		outline: none;
		box-sizing: border-box;
		flex: 1;
		min-width: 0;
		color: var(--semantics-content-color);
	}

	:host([size='sm']) .search-field__input {
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .search-field__input,
	:host(:not([size])) .search-field__input {
		font: var(--semantics-input-fields-md-text-font);
	}

	.search-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	.search-field__input:-webkit-autofill,
	.search-field__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}

	.search-field__input::-webkit-search-cancel-button {
		-webkit-appearance: none;
	}


	/* # Input fade */

	.search-field__input-fade {
		position: relative;
		flex-shrink: 0;
		align-self: stretch;
		width: 0;
	}

	.search-field__input-fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: var(--primitives-space-8);
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
	}

	:host([size='sm']) .search-field__input-fade::after {
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([size='md']) .search-field__input-fade::after,
	:host(:not([size])) .search-field__input-fade::after {
		border-radius: var(--semantics-controls-md-corner-radius);
	}


	/* # End */

	.search-field__end {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		position: relative;
	}

	:host([size='sm']) .search-field__end {
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
		gap: var(--primitives-space-4);
	}

	:host([size='md']) .search-field__end,
	:host(:not([size])) .search-field__end {
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
		gap: var(--primitives-space-6);
	}

	.search-field__clear-button:focus-within,
	.search-field__search-button:focus-within {
		position: relative;
		z-index: var(--_z-index-button-focus);
	}
`;

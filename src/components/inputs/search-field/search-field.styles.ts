import { css } from 'lit';

export const searchFieldStyles = css`


	/* # Host */

	:host {
		--_width: 100%;
		--_background-color: var(--semantics-input-fields-background-color);
		--_corner-radius: var(--semantics-controls-md-corner-radius);
		--_min-size: var(--semantics-controls-md-min-size);
		--_search-icon-size: var(--primitives-space-24);
		--_text-font: var(--semantics-input-fields-md-text-font);
		--_end-padding-right: calc((var(--_min-size) - var(--semantics-controls-sm-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
		--_end-gap: var(--primitives-space-6);
		--_z-index-button-focus: 1;

		display: block;
		width: var(--_width);
		max-width: 100%;
		min-width: 0;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([size="sm"]) {
		--_corner-radius: var(--semantics-controls-sm-corner-radius);
		--_min-size: var(--semantics-controls-sm-min-size);
		--_search-icon-size: var(--primitives-space-20);
		--_text-font: var(--semantics-input-fields-sm-text-font);
		--_end-padding-right: calc((var(--_min-size) - var(--semantics-controls-xs-min-size)) / 2 - var(--semantics-input-fields-border-thickness));
		--_end-gap: var(--primitives-space-4);
	}


	/* # Block */

	.search-field {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border: var(--semantics-input-fields-border);
		border-radius: var(--_corner-radius);
		background-color: var(--_background-color);
		width: 100%;
		min-height: var(--_min-size);
		flex-direction: row;
		align-items: center;
	}

	.search-field:has(input:-webkit-autofill),
	.search-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.search-field:has(.search-field__input:focus-visible) {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Elements */

	.search-field__search-icon {
		display: flex;
		margin-inline: calc((var(--_min-size) - var(--_search-icon-size)) / 2 - var(--semantics-input-fields-border-thickness));
		width: var(--_search-icon-size);
		height: var(--_search-icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		color: var(--semantics-content-secondary-color);
	}

	.search-field__input {
		box-sizing: border-box;
		margin: 0;
		outline: none;
		border: none;
		background: transparent;
		min-width: 0;
		padding: 0;
		flex: 1;
		color: var(--semantics-content-color);
		font: var(--_text-font);
		appearance: none;
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

	.search-field__input-fade {
		position: relative;
		width: 0;
		flex-shrink: 0;
		align-self: stretch;
	}

	.search-field__input-fade::after {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		border-radius: var(--_corner-radius);
		background: linear-gradient(90deg, color-mix(in oklch, var(--_background-color) 0%, transparent) 0%, var(--_background-color) 100%);
		pointer-events: none;
		width: var(--primitives-space-8);
	}

	.search-field__end {
		display: flex;
		position: relative;
		padding-right: var(--_end-padding-right);
		flex-shrink: 0;
		gap: var(--_end-gap);
		align-items: center;
	}

	.search-field__clear-button:focus-within,
	.search-field__search-button:focus-within {
		position: relative;
		z-index: var(--_z-index-button-focus);
	}
`;

import { css } from 'lit';

export const searchFieldStyles = css`
	/* # Host */

	:host {
		display: block;
		--_background-color: var(--semantics-input-fields-background-color);
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	/* # Container */

	.search-field {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--_background-color);
		border: var(--semantics-input-fields-border-thickness) solid
			var(--semantics-input-fields-border-color);
	}

	:host([size='md']) .search-field,
	:host(:not([size])) .search-field {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([size='sm']) .search-field {
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	.search-field:has(.search-field__input:focus-visible) {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness)
			var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double
			var(--semantics-focus-ring-edge-color);
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

	:host([size='md']) .search-field__search-icon,
	:host(:not([size])) .search-field__search-icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
		margin-inline: calc(
			(var(--semantics-controls-md-min-size) - var(--primitives-space-24)) /
				2 - var(--semantics-input-fields-border-thickness)
		);
	}

	:host([size='sm']) .search-field__search-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		margin-inline: calc(
			(var(--semantics-controls-sm-min-size) - var(--primitives-space-20)) /
				2 - var(--semantics-input-fields-border-thickness)
		);
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

	:host([size='md']) .search-field__input,
	:host(:not([size])) .search-field__input {
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) .search-field__input {
		font: var(--semantics-input-fields-sm-text-font);
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

	/* # Fade */

	.search-field__fade {
		position: relative;
		flex-shrink: 0;
		align-self: stretch;
		width: 0;
	}

	.search-field__fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: var(--primitives-space-8);
		border-radius: var(--semantics-controls-md-corner-radius);
		background: linear-gradient(
			90deg,
			color-mix(in oklch, var(--_background-color) 0%, transparent) 0%,
			var(--_background-color) 100%
		);
		pointer-events: none;
	}

	/* # Actions */

	.search-field__actions {
		display: flex;
		flex-shrink: 0;
		align-items: center;
		position: relative;
		z-index: 1;
	}

	:host([size='md']) .search-field__actions,
	:host(:not([size])) .search-field__actions {
		padding-right: calc(
			(var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size)) /
				2 - var(--semantics-input-fields-border-thickness)
		);
		gap: var(--primitives-space-6);
	}

	:host([size='sm']) .search-field__actions {
		padding-right: calc(
			(var(--semantics-controls-sm-min-size) - var(--semantics-controls-xs-min-size)) /
				2 - var(--semantics-input-fields-border-thickness)
		);
		gap: var(--primitives-space-4);
	}

	.search-field__dismiss-action:focus-within,
	.search-field__search-action:focus-within {
		position: relative;
		z-index: 1;
	}
`;

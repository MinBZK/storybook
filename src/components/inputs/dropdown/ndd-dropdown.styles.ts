import { css } from 'lit';

export const dropdownStyles = css`
	/* # Host */

	:host {
		display: block;
		--_md-icon-size: var(--primitives-space-24);
		--_sm-icon-size: var(--primitives-space-20);
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}


	/* # Container */

	.dropdown {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([size='md']) .dropdown,
	:host(:not([size])) .dropdown {
		min-height: var(--semantics-controls-md-min-size);
		border-radius: var(--semantics-controls-md-corner-radius);
	}

	:host([size='sm']) .dropdown {
		min-height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	.dropdown:focus-within {
		box-shadow: var(--semantics-focus-ring-box-shadow);
		outline: var(--semantics-focus-ring-outline);
	}


	/* # Slotted select */

	::slotted(select) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		appearance: none;
		border: none;
		margin: 0;
		padding: 0;
		background: transparent;
		outline: none;
		box-sizing: border-box;
	}

	:host([size='md']) ::slotted(select),
	:host(:not([size])) ::slotted(select) {
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) ::slotted(select) {
		font: var(--semantics-input-fields-sm-text-font);
	}


	/* # Value */

	.dropdown__value {
		flex: 1;
		min-width: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: inherit;
	}

	:host([size='md']) .dropdown__value,
	:host(:not([size])) .dropdown__value {
		padding: 0 var(--primitives-space-12);
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) .dropdown__value {
		padding: 0 var(--primitives-space-10);
		font: var(--semantics-input-fields-sm-text-font);
	}


	/* # Picker icon */

	.dropdown__picker-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: inherit;
	}

	:host([size='md']) .dropdown__picker-icon,
	:host(:not([size])) .dropdown__picker-icon {
		width: var(--_md-icon-size);
		height: var(--_md-icon-size);
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--_md-icon-size)) / 2);
	}

	:host([size='sm']) .dropdown__picker-icon {
		width: var(--_sm-icon-size);
		height: var(--_sm-icon-size);
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--_sm-icon-size)) / 2);
	}
`;

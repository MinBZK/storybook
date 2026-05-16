import { css } from 'lit';

export const dropdownStyles = css`


	/* # Host */

	:host {
		--_xs-picker-icon-size: var(--primitives-space-16);
		--_sm-picker-icon-size: var(--primitives-space-20);
		--_md-picker-icon-size: var(--primitives-space-24);
		--_width: auto;

		display: block;
		width: var(--_width);
		max-width: 100%;
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

	.dropdown {
		position: relative;
		display: flex;
		box-sizing: border-box;
		background-color: var(--semantics-buttons-neutral-tinted-background-color);
		width: 100%;
		flex-direction: row;
		align-items: center;
		color: var(--semantics-buttons-neutral-tinted-content-color);
	}

	:host([size='xs']) .dropdown {
		border-radius: var(--semantics-controls-xs-corner-radius);
		min-height: var(--semantics-controls-xs-min-size);
	}

	:host([size='sm']) .dropdown {
		border-radius: var(--semantics-controls-sm-corner-radius);
		min-height: var(--semantics-controls-sm-min-size);
	}

	:host([size='md']) .dropdown,
	:host(:not([size])) .dropdown {
		border-radius: var(--semantics-controls-md-corner-radius);
		min-height: var(--semantics-controls-md-min-size);
	}

	.dropdown:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	:host([is-pointer-focus]) .dropdown:focus-within {
		outline: none;
		box-shadow: none;
	}


	/* # Slotted select */

	::slotted(select) {
		position: absolute;
		inset: 0;
		box-sizing: border-box;
		opacity: 0;
		margin: 0;
		border: none;
		outline: none;
		background: transparent;
		width: 100%;
		height: 100%;
		padding: 0;
		font: var(--semantics-input-fields-native-select-font);
		appearance: none;
	}


	/* # Value */

	.dropdown__value {
		min-width: 0;
		overflow: hidden;
		flex-grow: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: inherit;
	}

	:host([size='xs']) .dropdown__value {
		padding: 0 var(--semantics-controls-xs-inline-padding);
		font: var(--semantics-input-fields-xs-text-font);
	}

	:host([size='sm']) .dropdown__value {
		padding: 0 var(--semantics-controls-sm-inline-padding);
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='md']) .dropdown__value,
	:host(:not([size])) .dropdown__value {
		padding: 0 var(--semantics-controls-md-inline-padding);
		font: var(--semantics-input-fields-md-text-font);
	}


	/* # Validation icon */

	.dropdown__validation-icon-area {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	:host([size='xs']) .dropdown__validation-icon-area {
		padding-right: var(--primitives-space-0);
	}

	:host([size='sm']) .dropdown__validation-icon-area {
		padding-right: var(--primitives-space-2);
	}

	:host([size='md']) .dropdown__validation-icon-area,
	:host(:not([size])) .dropdown__validation-icon-area {
		padding-right: var(--primitives-space-4);
	}

	:host([valid]) .dropdown__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .dropdown__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	:host([size='xs']) .dropdown__validation-icon {
		width: var(--semantics-input-fields-xs-validation-icon-size);
		height: var(--semantics-input-fields-xs-validation-icon-size);
	}

	:host([size='sm']) .dropdown__validation-icon {
		width: var(--semantics-input-fields-sm-validation-icon-size);
		height: var(--semantics-input-fields-sm-validation-icon-size);
	}

	:host([size='md']) .dropdown__validation-icon,
	:host(:not([size])) .dropdown__validation-icon {
		width: var(--semantics-input-fields-md-validation-icon-size);
		height: var(--semantics-input-fields-md-validation-icon-size);
	}


	/* # Picker icon */

	.dropdown__picker-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: inherit;
	}

	:host([size='xs']) .dropdown__picker-icon {
		width: var(--_xs-picker-icon-size);
		height: var(--_xs-picker-icon-size);
		padding-right: calc((var(--semantics-controls-xs-min-size) - var(--_xs-picker-icon-size)) / 2);
	}

	:host([size='sm']) .dropdown__picker-icon {
		width: var(--_sm-picker-icon-size);
		height: var(--_sm-picker-icon-size);
		padding-right: calc((var(--semantics-controls-sm-min-size) - var(--_sm-picker-icon-size)) / 2);
	}

	:host([size='md']) .dropdown__picker-icon,
	:host(:not([size])) .dropdown__picker-icon {
		width: var(--_md-picker-icon-size);
		height: var(--_md-picker-icon-size);
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--_md-picker-icon-size)) / 2);
	}
`;

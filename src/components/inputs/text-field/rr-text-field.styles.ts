import { css } from 'lit';

export const textFieldStyles = css`
	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	/* # Container */

	.text-field {
		display: flex;
		padding-left: var(--primitives-space-12);
		flex-direction: row;
		align-items: center;
		height: var(--semantics-controls-md-min-size);
		background-color: var(--semantics-input-fields-background-color);
		border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		box-sizing: border-box;
		overflow: hidden;
	}

	:host([size='sm']) .text-field {
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
		padding-left: var(--primitives-space-8);
	}

	:host([valid]) .text-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .text-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .text-field {
		background-color: var(--semantics-input-fields-is-read-only-background-color);
		border-color: var(--semantics-input-fields-is-read-only-border-color);
	}

	:host([disabled]) .text-field {
		opacity: var(--primitives-opacity-disabled);
		cursor: not-allowed;
	}

	.text-field:focus-within {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}

	/* # Input */

	.text-field__input {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0;
		outline: none;
		box-sizing: border-box;
		flex-grow: 1;
		min-width: 0;
		font: var(--semantics-input-fields-md-text-font);
		color: var(--semantics-content-color);
		height: 100%;
	}

	:host([size='sm']) .text-field__input {
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([disabled]) .text-field__input {
		cursor: not-allowed;
		pointer-events: none;
	}

	.text-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	/* # Validation icon */

	.text-field__validation-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 100%;
		width: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([size='sm']) .text-field__validation-icon {
		width: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([valid]) .text-field__validation-icon {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .text-field__validation-icon {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	.text-field__validation-icon rr-icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([size='sm']) .text-field__validation-icon rr-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}
`;

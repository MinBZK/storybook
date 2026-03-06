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
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: var(--primitives-space-12);
		height: var(--semantics-controls-md-min-size);
		border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		background-color: var(--semantics-input-fields-background-color);
	}

	:host([size='sm']) .text-field {
		padding-left: var(--primitives-space-8);
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([valid]) .text-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .text-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .text-field {
		border-color: var(--semantics-input-fields-is-read-only-border-color);
		background-color: var(--semantics-input-fields-is-read-only-background-color);
	}

	:host([disabled]) .text-field {
		opacity: var(--primitives-opacity-disabled);
		cursor: not-allowed;
	}

	.text-field:focus-within {
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
	}

	/* # Input */

	.text-field__input {
		flex-grow: 1;
		min-width: 0;
		overflow: hidden;
		box-sizing: border-box;
		padding: 0 var(--primitives-space-4) 0 0;
		margin: 0;
		height: var(--semantics-controls-md-min-size);
		font: var(--semantics-input-fields-md-text-font);
		color: var(--semantics-content-color);
		background: transparent;
		border: none;
		outline: none;
		appearance: none;
	}

	:host([size='sm']) .text-field__input {
		height: var(--semantics-controls-sm-min-size);
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([disabled]) .text-field__input {
		pointer-events: none;
		cursor: not-allowed;
	}

	.text-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
	}

	/* # Fade */

	.text-field__fade {
		position: relative;
		flex-shrink: 0;
		align-self: stretch;
		width: 0;
	}

	.text-field__fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: var(--primitives-space-4);
		width: var(--primitives-space-8);
		border-radius: var(--semantics-controls-md-corner-radius);
		background: linear-gradient(-90deg, var(--semantics-input-fields-end-fade-end-color) 0%, var(--semantics-input-fields-end-fade-start-color) 100%);
		pointer-events: none;
	}

	/* # Validation icon */

	.text-field__validation-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
		height: 100%;
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

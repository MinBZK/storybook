import { css } from 'lit';

export const passwordFieldStyles = css`
	/* # Host */

	:host {
		display: block;
		--_background-color: var(--semantics-input-fields-background-color);
	}

	:host([hidden]) {
		display: none;
	}

	/* # Container */

	.password-field {
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		box-sizing: border-box;
		padding-left: var(--primitives-space-12);
		height: var(--semantics-controls-md-min-size);
		border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		background-color: var(--_background-color);
	}

	:host([size='sm']) .password-field {
		padding-left: var(--primitives-space-8);
		height: var(--semantics-controls-sm-min-size);
		border-radius: var(--semantics-controls-sm-corner-radius);
	}

	:host([valid]) .password-field {
		border-color: var(--semantics-input-fields-is-valid-border-color);
	}

	:host([invalid]) .password-field {
		border-color: var(--semantics-input-fields-is-invalid-border-color);
	}

	:host([readonly]) .password-field {
		border-color: var(--semantics-input-fields-is-read-only-border-color);
		--_background-color: var(--semantics-input-fields-is-read-only-background-color);
	}

	:host([disabled]) .password-field {
		opacity: var(--primitives-opacity-disabled);
		cursor: not-allowed;
	}

	.password-field:has(input:-webkit-autofill),
	.password-field:has(input:autofill) {
		--_background-color: var(--semantics-input-fields-is-autofill-background-color);
	}

	.password-field:focus-within:not(:has(.password-field__visibility-toggle:focus-within)) {
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
	}

	.password-field:has(.password-field__visibility-toggle:focus-within) {
		overflow: visible;
	}

	/* # Input */

	.password-field__input {
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

	.password-field__input.is-masked {
		font: var(--semantics-input-fields-md-mask-font);
	}

	:host([size='sm']) .password-field__input {
		height: var(--semantics-controls-sm-min-size);
		font: var(--semantics-input-fields-sm-text-font);
	}

	:host([size='sm']) .password-field__input.is-masked {
		font: var(--semantics-input-fields-sm-mask-font);
	}

	:host([disabled]) .password-field__input {
		pointer-events: none;
		cursor: not-allowed;
	}

	.password-field__input::placeholder {
		color: var(--semantics-input-fields-placeholder-color);
		/* Always use text font for placeholder, regardless of masked state */
		font: var(--semantics-input-fields-md-text-font);
	}

	:host([size='sm']) .password-field__input::placeholder {
		font: var(--semantics-input-fields-sm-text-font);
	}

	.password-field__input:-webkit-autofill,
	.password-field__input:autofill {
		box-shadow: 0 0 0 999px var(--_background-color) inset;
	}

	/* # Fade */

	.password-field__fade {
		position: relative;
		flex-shrink: 0;
		align-self: stretch;
		width: 0;
	}

	.password-field__fade::after {
		content: '';
		position: absolute;
		top: 0;
		bottom: 0;
		right: var(--primitives-space-4);
		width: var(--primitives-space-8);
		border-radius: var(--semantics-controls-md-corner-radius);
		background: linear-gradient(90deg, transparent 0%, var(--_background-color) 100%);
		pointer-events: none;
	}

	/* # Validation icon area */

	.password-field__validation-icon-area {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: calc(var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2);
		height: 100%;
	}

	:host([size='sm']) .password-field__validation-icon-area {
		width: calc(var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2);
	}

	:host([valid]) .password-field__validation-icon-area {
		color: var(--semantics-input-fields-is-valid-icon-color);
	}

	:host([invalid]) .password-field__validation-icon-area {
		color: var(--semantics-input-fields-is-invalid-icon-color);
	}

	/* # Validation icon */

	.password-field__validation-icon {
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
	}

	:host([size='sm']) .password-field__validation-icon {
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
	}

	/* # Toggle button */

	.password-field__visibility-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: 100%;
		/* (field height - 2 x border - sm button height) / 2 */
		padding-block: calc((var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-sm-min-size)) / 2);
		padding-inline-end: calc((var(--semantics-controls-md-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-sm-min-size)) / 2);
	}

	:host([size='sm']) .password-field__visibility-toggle {
		/* (field height - 2 x border - xs button height) / 2 */
		padding-block: calc((var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-xs-min-size)) / 2);
		padding-inline-end: calc((var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness) * 2 - var(--semantics-controls-xs-min-size)) / 2);
	}
`;

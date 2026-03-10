import { css } from 'lit';

export const checkboxStyles = css`

	/* # Host */

	:host {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Native input */

	.checkbox__input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		z-index: 1;
	}


	/* # Visual box */

	.checkbox__box {
		position: relative;
		box-sizing: border-box;
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
		border-radius: var(--semantics-controls-xs-corner-radius);
		border: var(--components-checkbox-border-thickness) solid var(--components-checkbox-border-color);
		background-color: var(--components-checkbox-background-color);
		color: transparent;
	}


	/* # Selected */

	.checkbox__input:checked ~ .checkbox__box,
	.checkbox__input:indeterminate ~ .checkbox__box {
		border-color: var(--components-checkbox-is-selected-border-color);
		background-color: var(--components-checkbox-is-selected-background-color);
		color: var(--components-checkbox-is-selected-icon-color);
	}


	/* # Hover */

	.checkbox__input:hover:not(:disabled) ~ .checkbox__box {
		border-color: var(--components-checkbox-is-hovered-border-color);
	}

	.checkbox__input:checked:hover:not(:disabled) ~ .checkbox__box,
	.checkbox__input:indeterminate:hover:not(:disabled) ~ .checkbox__box {
		border-color: var(--components-checkbox-is-selected-is-hovered-border-color);
		background-color: var(--components-checkbox-is-selected-is-hovered-background-color);
		color: var(--components-checkbox-is-selected-is-hovered-icon-color);
	}


	/* # Active */

	.checkbox__input:active:not(:disabled) ~ .checkbox__box {
		border-color: var(--components-checkbox-is-active-border-color);
	}

	.checkbox__input:checked:active:not(:disabled) ~ .checkbox__box,
	.checkbox__input:indeterminate:active:not(:disabled) ~ .checkbox__box {
		border-color: var(--components-checkbox-is-selected-is-active-border-color);
		background-color: var(--components-checkbox-is-selected-is-active-background-color);
		color: var(--components-checkbox-is-selected-is-active-icon-color);
	}


	/* # Focus */

	.checkbox__input:focus-visible ~ .checkbox__box {
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
	}


	/* # Disabled */

	.checkbox__input:disabled ~ .checkbox__box {
		opacity: var(--primitives-opacity-disabled);
	}


	/* # Icons */

	.checkbox__check-icon,
	.checkbox__indeterminate-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
		display: none;
	}

	.checkbox__input:checked ~ .checkbox__box .checkbox__check-icon {
		display: block;
	}

	.checkbox__input:indeterminate ~ .checkbox__box .checkbox__indeterminate-icon {
		display: block;
	}
`;

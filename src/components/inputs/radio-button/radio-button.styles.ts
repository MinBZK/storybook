import { css } from 'lit';

export const radioButtonStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		position: relative;
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Native input */

	.radio-button__input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
		z-index: 1;
	}


	/* # Outer shape */

	.radio-button__outer-shape {
		position: relative;
		box-sizing: border-box;
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
		border-radius: 50%;
		border: var(--components-radio-button-border-thickness) solid var(--components-radio-button-border-color);
		background-color: var(--components-radio-button-background-color);
	}


	/* # Inner shape */

	.radio-button__inner-shape {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0);
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		border-radius: 50%;
		border: var(--components-radio-button-is-selected-inner-shape-border-thickness) solid var(--components-radio-button-is-selected-inner-shape-border-color);
		box-sizing: border-box;
	}


	/* # Selected */

	.radio-button__input:checked ~ .radio-button__outer-shape {
		border-color: var(--components-radio-button-is-selected-border-color);
		background-color: var(--components-radio-button-is-selected-background-color);
	}

	.radio-button__input:checked ~ .radio-button__outer-shape .radio-button__inner-shape {
		transform: translate(-50%, -50%) scale(1);
	}


	/* # Hover */

	.radio-button__input:hover:not(:disabled) ~ .radio-button__outer-shape {
		border-color: var(--components-radio-button-is-hovered-border-color);
	}

	.radio-button__input:checked:hover:not(:disabled) ~ .radio-button__outer-shape {
		border-color: var(--components-radio-button-is-selected-is-hovered-border-color);
		background-color: var(--components-radio-button-is-selected-is-hovered-background-color);
	}

	.radio-button__input:checked:hover:not(:disabled) ~ .radio-button__outer-shape .radio-button__inner-shape {
		border-color: var(--components-radio-button-is-selected-is-hovered-inner-shape-border-color);
	}


	/* # Active */

	.radio-button__input:active:not(:disabled) ~ .radio-button__outer-shape {
		border-color: var(--components-radio-button-is-active-border-color);
	}

	.radio-button__input:checked:active:not(:disabled) ~ .radio-button__outer-shape {
		border-color: var(--components-radio-button-is-selected-is-active-border-color);
		background-color: var(--components-radio-button-is-selected-is-active-background-color);
	}

	.radio-button__input:checked:active:not(:disabled) ~ .radio-button__outer-shape .radio-button__inner-shape {
		border-color: var(--components-radio-button-is-selected-is-active-inner-shape-border-color);
	}


	/* # Focus */

	.radio-button__input:focus-visible ~ .radio-button__outer-shape {
		outline: var(--semantics-focus-ring-outline);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}


	/* # Disabled */

	.radio-button__input:disabled ~ .radio-button__outer-shape {
		opacity: var(--primitives-opacity-disabled);
	}
`;

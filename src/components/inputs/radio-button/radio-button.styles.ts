import { css } from 'lit';

export const radioButtonStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		position: relative;
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
		align-items: center;
		justify-content: center;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Elements */

	.radio-button__input {
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: 1;
		margin: 0;
		width: 100%;
		height: 100%;
	}

	.radio-button__outer-shape {
		box-sizing: border-box;
		position: relative;
		border: var(--components-radio-button-border-thickness) solid var(--components-radio-button-border-color);
		border-radius: 50%;
		background-color: var(--components-radio-button-background-color);
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
	}

	.radio-button__inner-shape {
		box-sizing: border-box;
		position: absolute;
		top: 50%;
		left: 50%;
		border: var(--components-radio-button-is-selected-inner-shape-border-thickness) solid var(--components-radio-button-is-selected-inner-shape-border-color);
		border-radius: 50%;
		width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		transform: translate(-50%, -50%) scale(0);
	}

	.radio-button__input:checked ~ .radio-button__outer-shape {
		border-color: var(--components-radio-button-is-selected-border-color);
		background-color: var(--components-radio-button-is-selected-background-color);
	}

	.radio-button__input:checked ~ .radio-button__outer-shape .radio-button__inner-shape {
		transform: translate(-50%, -50%) scale(1);
	}

	@media (hover: hover) {
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
	}

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

	.radio-button__input:focus-visible ~ .radio-button__outer-shape {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.radio-button__input:disabled ~ .radio-button__outer-shape {
		opacity: var(--primitives-opacity-disabled);
	}
`;

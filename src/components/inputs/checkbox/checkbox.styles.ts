import { css } from 'lit';

export const checkboxStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		display: inline-flex;
		position: relative;
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
		align-items: center;
		justify-content: center;
		-webkit-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Elements */

	.checkbox__input {
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: 1;
		margin: 0;
		width: 100%;
		height: 100%;
	}

	.checkbox__box {
		box-sizing: border-box;
		position: relative;
		border: var(--components-checkbox-border-width) solid var(--components-checkbox-border-color);
		border-radius: var(--semantics-controls-xs-corner-radius);
		background-color: var(--components-checkbox-background-color);
		width: var(--semantics-controls-xs-min-size);
		height: var(--semantics-controls-xs-min-size);
		color: transparent;
	}

	.checkbox__input:checked ~ .checkbox__box,
	.checkbox__input:indeterminate ~ .checkbox__box {
		border-color: var(--components-checkbox-is-selected-border-color);
		background-color: var(--components-checkbox-is-selected-background-color);
		color: var(--components-checkbox-is-selected-icon-color);
	}

	@media (hover: hover) {
		.checkbox__input:hover:not(:disabled) ~ .checkbox__box {
			border-color: var(--components-checkbox-is-hovered-border-color);
		}

		.checkbox__input:checked:hover:not(:disabled) ~ .checkbox__box,
		.checkbox__input:indeterminate:hover:not(:disabled) ~ .checkbox__box {
			border-color: var(--components-checkbox-is-selected-is-hovered-border-color);
			background-color: var(--components-checkbox-is-selected-is-hovered-background-color);
			color: var(--components-checkbox-is-selected-is-hovered-icon-color);
		}
	}

	.checkbox__input:active:not(:disabled) ~ .checkbox__box {
		border-color: var(--components-checkbox-is-active-border-color);
	}

	.checkbox__input:checked:active:not(:disabled) ~ .checkbox__box,
	.checkbox__input:indeterminate:active:not(:disabled) ~ .checkbox__box {
		border-color: var(--components-checkbox-is-selected-is-active-border-color);
		background-color: var(--components-checkbox-is-selected-is-active-background-color);
		color: var(--components-checkbox-is-selected-is-active-icon-color);
	}

	.checkbox__input:focus-visible ~ .checkbox__box {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.checkbox__input:disabled ~ .checkbox__box {
		opacity: var(--primitives-opacity-disabled);
	}

	.checkbox__check-icon,
	.checkbox__indeterminate-icon {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		width: var(--primitives-space-24);
		height: var(--primitives-space-24);
		transform: translate(-50%, -50%);
	}

	.checkbox__input:checked ~ .checkbox__box .checkbox__check-icon {
		display: block;
	}

	.checkbox__input:checked:indeterminate ~ .checkbox__box .checkbox__check-icon {
		display: none;
	}

	.checkbox__input:indeterminate ~ .checkbox__box .checkbox__indeterminate-icon {
		display: block;
	}

	/* Decorative has no input to hang :checked on, so the state comes from the
	   host attributes instead. */
	:host([decorative][checked]) .checkbox__box,
	:host([decorative][indeterminate]) .checkbox__box {
		border-color: var(--components-checkbox-is-selected-border-color);
		background-color: var(--components-checkbox-is-selected-background-color);
		color: var(--components-checkbox-is-selected-icon-color);
	}

	:host([decorative][checked]:not([indeterminate])) .checkbox__check-icon {
		display: block;
	}

	:host([decorative][indeterminate]) .checkbox__indeterminate-icon {
		display: block;
	}
`;

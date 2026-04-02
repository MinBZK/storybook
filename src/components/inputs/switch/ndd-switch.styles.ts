import { css } from 'lit';

export const switchStyles = css`
	/* # Host */

	:host {
		display: inline-block;
		position: relative;
		flex-shrink: 0;
		--_switch-xs-width: var(--semantics-controls-md-min-size);
		--_switch-xs-height: var(--semantics-controls-xs-min-size);
		--_switch-sm-width: var(--semantics-controls-lg-min-size);
		--_switch-sm-height: var(--semantics-controls-sm-min-size);
		--_switch-padding: var(--primitives-space-2);
		--_switch-xs-thumb-size: calc(
			var(--_switch-xs-height) - var(--_switch-padding) *
				2 - var(--components-switch-thumb-border-thickness) * 2
		);
		--_switch-sm-thumb-size: calc(
			var(--_switch-sm-height) - var(--_switch-padding) *
				2 - var(--components-switch-thumb-border-thickness) * 2
		);
		--_transition-duration: 150ms;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
	}

	:host([size='xs']) {
		width: var(--_switch-xs-width);
		height: var(--_switch-xs-height);
	}

	:host([size='sm']),
	:host(:not([size])) {
		width: var(--_switch-sm-width);
		height: var(--_switch-sm-height);
	}

	/* # Input */

	.switch__input {
		position: absolute;
		inset: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		margin: 0;
		opacity: 0;
	}

	/* # Track */

	.switch__track {
		position: relative;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		padding: var(--_switch-padding);
		background-color: var(--components-switch-background-color);
		border: var(--components-switch-border-thickness) solid var(--components-switch-border-color);
		transition:
			background-color var(--_transition-duration) ease,
			border-color var(--_transition-duration) ease;
	}

	:host([size='xs']) .switch__track {
		border-radius: calc(var(--semantics-controls-xs-min-size) / 2);
	}

	:host([size='sm']) .switch__track,
	:host(:not([size])) .switch__track {
		border-radius: calc(var(--semantics-controls-sm-min-size) / 2);
	}

	.switch__input:checked ~ .switch__track {
		background-color: var(--components-switch-is-selected-background-color);
		border-color: var(--components-switch-is-selected-background-color);
	}

	.switch__input:focus-visible ~ .switch__track {
		outline: var(--semantics-focus-ring-edge-thickness) double
			var(--semantics-focus-ring-edge-color);
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness)
			var(--semantics-focus-ring-center-color);
	}

	/* # Thumb */

	.switch__thumb {
		position: absolute;
		left: var(--_switch-padding);
		box-sizing: border-box;
		border-radius: 50%;
		background-color: var(--components-switch-thumb-background-color);
		border: var(--components-switch-thumb-border-thickness) solid
			var(--components-switch-thumb-border-color);
		transition:
			width var(--_transition-duration) ease,
			height var(--_transition-duration) ease,
			left var(--_transition-duration) ease,
			background-color var(--_transition-duration) ease,
			border-color var(--_transition-duration) ease;
		will-change: width, height, left;
	}

	:host([size='xs']) .switch__thumb {
		width: var(--_switch-xs-thumb-size);
		height: var(--_switch-xs-thumb-size);
	}

	:host([size='sm']) .switch__thumb,
	:host(:not([size])) .switch__thumb {
		width: var(--_switch-sm-thumb-size);
		height: var(--_switch-sm-thumb-size);
	}

	.switch__input:checked ~ .switch__track .switch__thumb {
		background-color: var(--components-switch-is-selected-thumb-background-color);
		border-color: var(--components-switch-is-selected-thumb-background-color);
	}

	:host([size='xs']) .switch__input:checked ~ .switch__track .switch__thumb {
		left: calc(
			var(--_switch-xs-width) - var(--components-switch-thumb-border-thickness) *
				2 - var(--_switch-xs-thumb-size) - var(--_switch-padding) * 2
		);
		width: calc(var(--_switch-xs-thumb-size) + var(--_switch-padding) * 2);
		height: calc(var(--_switch-xs-thumb-size) + var(--_switch-padding) * 2);
	}

	:host([size='sm']) .switch__input:checked ~ .switch__track .switch__thumb,
	:host(:not([size])) .switch__input:checked ~ .switch__track .switch__thumb {
		left: calc(
			var(--_switch-sm-width) - var(--components-switch-thumb-border-thickness) *
				2 - var(--_switch-sm-thumb-size) - var(--_switch-padding) * 2
		);
		width: calc(var(--_switch-sm-thumb-size) + var(--_switch-padding) * 2);
		height: calc(var(--_switch-sm-thumb-size) + var(--_switch-padding) * 2);
	}

	/* # Check */

	.switch__check {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: calc(100% + var(--components-switch-thumb-border-thickness) * 2);
		height: calc(100% + var(--components-switch-thumb-border-thickness) * 2);
		color: var(--components-switch-is-selected-background-color);
		opacity: 0;
		pointer-events: none;
		transition: opacity var(--_transition-duration) ease;
	}

	.switch__input:checked ~ .switch__track .switch__check {
		opacity: 1;
	}
`;

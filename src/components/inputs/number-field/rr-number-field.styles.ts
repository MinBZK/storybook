import { css } from 'lit';

export const numberFieldStyles = css`
	/* # Host */

	:host {
		display: inline-block;
	}

	:host([hidden]) {
		display: none;
	}

	:host([disabled]) {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	:host([disabled]) rr-icon-button {
		opacity: 1;
	}


	/* # Container */

	.number-field {
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		height: var(--semantics-controls-md-min-size);
		background-color: var(--semantics-input-fields-background-color);
		border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
		border-radius: var(--semantics-controls-md-corner-radius);
		box-sizing: border-box;
	}

	.number-field:has(input:focus-visible) {
		box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
		outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
	}


	/* # Controls */

	.number-field__decrement-control {
		display: flex;
		align-items: center;
		height: 100%;
		padding-left: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness)) / 2);
	}

	.number-field__increment-control {
		display: flex;
		align-items: center;
		height: 100%;
		padding-right: calc((var(--semantics-controls-md-min-size) - var(--semantics-controls-sm-min-size) - var(--semantics-input-fields-border-thickness)) / 2);
	}


	/* # Input */

	.number-field__input {
		display: flex;
		justify-content: center;
		padding: 0 var(--primitives-space-6);
	}

	.number-field__native {
		appearance: none;
		border: none;
		background: transparent;
		margin: 0;
		padding: 0;
		outline: none;
		box-sizing: border-box;
		font: var(--semantics-input-fields-md-text-font);
		color: var(--semantics-content-color);
		text-align: center;
		min-width: var(--semantics-controls-md-min-size);
	}

	.number-field__native::-webkit-outer-spin-button,
	.number-field__native::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.number-field__native[type='number'] {
		-moz-appearance: textfield;
	}
`;

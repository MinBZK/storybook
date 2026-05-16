import { css } from 'lit';

export const radioButtonFieldStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.radio-button-field {
		display: flex;
		min-height: var(--semantics-controls-md-min-size);
		flex-direction: row;
		align-items: flex-start;
		gap: var(--primitives-space-8);
	}


	/* # Control */

	.radio-button-field__control {
		display: flex;
		min-height: var(--semantics-controls-md-min-size);
		flex-shrink: 0;
		align-items: center;
	}


	/* # Label */

	.radio-button-field__label {
		display: flex;
		cursor: default;
		padding-top: calc((var(--semantics-controls-md-min-size) - 1em * var(--primitives-line-height-snug)) / 2);
		flex-grow: 1;
		font: var(--primitives-font-body-md-regular-snug);
		color: var(--semantics-content-color);
	}

	:host([disabled]) .radio-button-field__label {
		opacity: var(--primitives-opacity-disabled);
	}
`;

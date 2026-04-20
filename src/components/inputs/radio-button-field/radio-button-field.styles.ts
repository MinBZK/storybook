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
		flex-direction: row;
		align-items: flex-start;
		gap: var(--primitives-space-8);
		min-height: var(--semantics-controls-md-min-size);
	}


	/* # Control */

	.radio-button-field__control {
		display: flex;
		flex-shrink: 0;
		min-height: var(--semantics-controls-md-min-size);
		align-items: center;
	}


	/* # Label */

	.radio-button-field__label {
		padding-top: calc((var(--semantics-controls-md-min-size) - 1em * var(--primitives-line-height-snug)) / 2);
		display: flex;
		flex-grow: 1;
		font: var(--primitives-font-body-md-regular-snug);
		color: var(--semantics-content-color);
		cursor: default;
	}

	:host([disabled]) .radio-button-field__label {
		opacity: var(--primitives-opacity-disabled);
	}
`;

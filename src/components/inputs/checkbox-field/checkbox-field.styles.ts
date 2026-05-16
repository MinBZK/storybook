import { css } from 'lit';

export const checkboxFieldStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.checkbox-field {
		display: flex;
		min-height: var(--semantics-controls-md-min-size);
		flex-direction: row;
		align-items: flex-start;
		gap: var(--primitives-space-8);
	}


	/* # Control */

	.checkbox-field__control {
		display: flex;
		min-height: var(--semantics-controls-md-min-size);
		flex-shrink: 0;
		align-items: center;
	}


	/* # Label */

	.checkbox-field__label {
		display: flex;
		cursor: default;
		padding-top: calc((var(--semantics-controls-md-min-size) - 1em * var(--primitives-line-height-snug)) / 2);
		flex-grow: 1;
		font: var(--primitives-font-body-md-regular-snug);
		color: var(--semantics-content-color);
	}

	:host([disabled]) .checkbox-field__label {
		opacity: var(--primitives-opacity-disabled);
	}
`;

import { css } from 'lit';

export const checkboxFieldStyles = css`
	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Container */

	.checkbox-field {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--primitives-space-8);
		min-height: var(--semantics-controls-md-min-size);
	}


	/* # Control */

	.checkbox-field__control {
		display: flex;
		flex-shrink: 0;
		min-height: var(--semantics-controls-md-min-size);
		align-items: center;
	}


	/* # Label */

	.checkbox-field__label {
		padding-top: calc((var(--semantics-controls-md-min-size) - 1em * var(--primitives-line-height-snug)) / 2);
		display: flex;
		flex-grow: 1;
		font: var(--primitives-font-body-md-regular-snug);
		color: var(--semantics-content-color);
		cursor: default;
	}

	:host([disabled]) .checkbox-field__label {
		opacity: var(--primitives-opacity-disabled);
	}
`;

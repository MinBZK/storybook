import { css } from 'lit';

export const radioButtonFieldStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Container */

	.radio-button-field {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: var(--primitives-space-8);
	}


	/* # Label */

	.radio-button-field__label {
		display: flex;
		flex: 1;
		font: var(--primitives-font-body-md-regular-snug);
		color: var(--semantics-content-color);
		cursor: default;
	}

	:host([disabled]) .radio-button-field__label {
		opacity: var(--primitives-opacity-disabled);
	}
`;

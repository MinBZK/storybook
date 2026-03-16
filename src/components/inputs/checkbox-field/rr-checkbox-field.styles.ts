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
		align-items: center;
		gap: var(--primitives-space-8);
		min-height: var(--semantics-controls-md-min-size);
	}


	/* # Label */

	.checkbox-field__label {
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

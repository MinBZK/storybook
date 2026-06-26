import { css } from 'lit';
import { boxSizingReset, inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const radioButtonGroupStyles = css`
	${boxSizingReset}


	/* # Host */

	:host {
		${inheritedTextReset}
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.radio-button-group {
		display: flex;
		flex-direction: column;
	}
`;

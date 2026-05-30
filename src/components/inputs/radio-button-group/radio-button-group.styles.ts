import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const radioButtonGroupStyles = css`


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

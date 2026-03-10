import { css } from 'lit';

export const radioButtonGroupStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Group */

	.radio-button-group {
		display: flex;
		flex-direction: column;
	}
`;

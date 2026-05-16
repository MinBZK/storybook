import { css } from 'lit';

export const boxStyles = css`


	/* # Host */

	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.box {
		box-sizing: border-box;
		border-radius: var(--components-box-corner-radius);
		background-color: var(--components-box-background-color);
		padding: var(--components-box-padding);
	}
`;

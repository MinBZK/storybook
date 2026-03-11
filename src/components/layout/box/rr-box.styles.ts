import { css } from 'lit';

export const boxStyles = css`
	:host {
		display: block;
	}

	:host([hidden]) {
		display: none;
	}

	.box {
		background-color: var(--components-box-background-color);
		border-radius: var(--components-box-corner-radius);
		padding: var(--components-box-padding);
		box-sizing: border-box;
	}
`;

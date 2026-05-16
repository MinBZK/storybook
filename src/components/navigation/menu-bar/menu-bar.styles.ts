import { css } from 'lit';

export const menuBarStyles = css`


	/* # Host */

	:host {
		display: flex;
		min-width: 0;
		flex-grow: 1;
		flex-shrink: 1;
	}

	:host([hidden]),
	:host([empty]) {
		display: none;
	}


	/* # Block */

	.menu-bar {
		display: flex;
		min-width: 0;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		flex-shrink: 1;
	}

	/* ## Overflow button */

	.menu-bar__overflow-button {
		display: none;
	}
`;

import { css } from 'lit';

export const styles = css`

	/* ## Host */

	:host {
		display: flex;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
	}

	:host([hidden]),
	:host([empty]) {
		display: none;
	}

	/* ## Block */

	.menu-bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-grow: 1;
		flex-shrink: 1;
		min-width: 0;
	}

	/* ## Overflow button */

	.menu-bar__overflow-button {
		display: none;
	}
`;

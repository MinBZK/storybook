import { css } from 'lit';


/* # rr-app-view styles */

export const appViewStyles = css`
	:host {
		display: flex;
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # App view */

	.app-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

import { css } from 'lit';


/* # rr-split-view-pane styles */

export const splitViewPaneStyles = css`
	:host {
		display: flex;
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([hide-back]) {
		--back-button-display: none;
	}


	/* # Pane */

	.split-view-pane {
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

import { css } from 'lit';


/* # rr-stacked-split-view styles */

export const stackedSplitViewStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # Split view */

	.split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Pane */

	.split-view__pane {
		display: flex;
		flex-direction: column;
		flex: var(--_pane-flex, 1);
		min-height: var(--primitives-area-320);
		min-width: 0;
		overflow: hidden;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

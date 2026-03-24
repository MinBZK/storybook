import { css } from 'lit';


/* # rr-stacked-split-view styles */

export const stackedSplitViewStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;

		/* Pane min-height — read by JS via getComputedStyle in firstUpdated */
		--_pane-min-height: var(--primitives-area-200);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Split view */

	.stacked-split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Pane */

	.stacked-split-view__pane {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: var(--_pane-min-height);
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}

	.stacked-split-view__pane[hidden] {
		display: none;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

import { css } from 'lit';


/* # rr-vertical-split-view styles */

export const verticalSplitViewStyles = css`
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

	.vertical-split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Toolbar */

	.vertical-split-view__header {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Content */

	.vertical-split-view__main {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: var(--primitives-area-320);
		min-width: 0;
		overflow: hidden;
	}


	/* # Accessory */

	.vertical-split-view__footer {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

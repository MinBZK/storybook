import { css } from 'lit';


/* # rr-bar-split-view styles */

export const barSplitViewStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}


	/* # App view */

	.bar-split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Primary bar */

	.bar-split-view__primary-bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}


	/* # Main */

	.bar-split-view__main {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}


	/* # Secondary bar */

	.bar-split-view__secondary-bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: layout-area;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

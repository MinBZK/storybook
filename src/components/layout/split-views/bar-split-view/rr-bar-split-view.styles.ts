import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const smMax = unsafeCSS(breakpoints.smMax);


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


	/* # Bar split view */

	.bar-split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		container-type: inline-size;
		container-name: bar-split-view;
	}


	/* # Primary bar */

	.bar-split-view__primary-bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		order: 1;
		container-type: inline-size;
		container-name: layout-area;

		@container bar-split-view (max-width: ${smMax}) {
			order: 5;
		}
	}


	/* # Primary bar divider */

	.bar-split-view__primary-bar-divider {
		flex-shrink: 0;
		order: 2;

		@container bar-split-view (max-width: ${smMax}) {
			order: 4;
		}
	}


	/* # Main */

	.bar-split-view__main {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		order: 3;
		container-type: inline-size;
		container-name: layout-area;

		@container bar-split-view (max-width: ${smMax}) {
			order: 1;
		}
	}


	/* # Secondary bar divider */

	.bar-split-view__secondary-bar-divider {
		flex-shrink: 0;
		order: 4;

		@container bar-split-view (max-width: ${smMax}) {
			order: 2;
		}
	}


	/* # Secondary bar */

	.bar-split-view__secondary-bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
		order: 5;
		container-type: inline-size;
		container-name: layout-area;

		@container bar-split-view (max-width: ${smMax}) {
			order: 3;
		}
	}


	/* # Slotted */

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

import { css } from 'lit';


/* # rr-stacked-split-view styles */

export const stackedSplitViewStyles = css`
	:host {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: var(--_background-color);

		--_pane-min-height: var(--primitives-area-200); /* Pane min-height — read by JS via getComputedStyle in firstUpdated */
		--_background-color: var(--context-background-color, var(--semantics-surfaces-background-color));
	}

	:host([background="default"]) {
		--context-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-background-color);
	}

	:host([background="tinted"]) {
		--context-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-background-color);
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

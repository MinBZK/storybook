import { css } from 'lit';

export const stackedSplitViewStyles = css`


	/* # Host */

	:host {
		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
		flex-direction: column;

		--_pane-min-height: var(--primitives-area-200); /* Pane min-height — read by JS via getComputedStyle in firstUpdated */
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));
	}

	:host([background="default"]) {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.stacked-split-view {
		display: flex;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex: 1;
	}


	/* # Pane */

	.stacked-split-view__pane {
		display: flex;
		min-height: var(--_pane-min-height);
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex: 1;
	}

	.stacked-split-view__pane[hidden] {
		display: none;
	}

	::slotted(*) {
		min-height: 0;
		flex: 1;
	}
`;

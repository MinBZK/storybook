import { css } from 'lit';

export const sideBySideSplitViewStyles = css`


	/* # Host */

	:host {
		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;

		--_pane-min-width: var(--primitives-area-320); /* Pane min-width — read by JS via getComputedStyle in firstUpdated */
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

	.side-by-side-split-view {
		display: flex;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		flex-direction: row;
		flex: 1;
	}


	/* # Pane */

	.side-by-side-split-view__pane {
		display: flex;
		min-height: 0;
		min-width: var(--_pane-min-width);
		overflow: hidden;
		flex-direction: column;
		flex: 1;
	}

	.side-by-side-split-view__pane[hidden] {
		display: none;
	}

	::slotted(*) {
		min-height: 0;
		flex: 1;
	}
`;

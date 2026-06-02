import { css } from 'lit';

export const stackedSplitViewStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-base-background-color));
		/* Pane min-height — read by JS via getComputedStyle in firstUpdated */
		--_pane-min-height: var(--primitives-area-200);

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
		flex-direction: column;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="base"]) {
		--context-parent-background-color: var(--semantics-surfaces-base-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}


	/* # Block */

	.stacked-split-view {
		display: flex;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}


	/* # Elements */

	.stacked-split-view__pane {
		display: flex;
		min-width: 0;
		min-height: var(--_pane-min-height);
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	.stacked-split-view__pane[hidden] {
		display: none;
	}

	::slotted(*) {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;

import { css } from 'lit';

export const sideBySideSplitViewStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));
		/* Pane min-width — read by JS via getComputedStyle in firstUpdated */
		--_pane-min-width: var(--primitives-area-320);

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="default"]) {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--context-parent-background-color);
	}


	/* # Block */

	.side-by-side-split-view {
		display: flex;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		flex-direction: row;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}


	/* # Elements */

	.side-by-side-split-view__pane {
		display: flex;
		min-width: var(--_pane-min-width);
		min-height: 0;
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	.side-by-side-split-view__pane[hidden] {
		display: none;
	}

	::slotted(*) {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;

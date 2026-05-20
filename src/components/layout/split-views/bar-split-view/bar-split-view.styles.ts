import { css } from 'lit';

export const barSplitViewStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
		flex-direction: column;
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

	.bar-split-view {
		display: flex;
		min-width: 0;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}


	/* # Elements */

	.bar-split-view__bar {
		display: flex;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 0;
	}

	.bar-split-view__divider {
		flex-shrink: 0;
	}

	.bar-split-view__main {
		display: flex;
		min-width: 0;
		min-height: 0;
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}

	::slotted(*) {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;

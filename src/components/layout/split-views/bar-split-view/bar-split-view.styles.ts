import { css } from 'lit';

export const barSplitViewStyles = css`


	/* # Host */

	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));

		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: var(--_background-color);
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

	.bar-split-view {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
	}


	/* # Bar */

	.bar-split-view__bar {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Divider */

	.bar-split-view__divider {
		flex-shrink: 0;
	}


	/* # Main */

	.bar-split-view__main {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}


	/* # Slotted */

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

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
		min-height: 0;
		min-width: 0;
		flex-direction: column;
		flex: 1;
	}


	/* # Bar */

	.bar-split-view__bar {
		display: flex;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex-shrink: 0;
	}


	/* # Divider */

	.bar-split-view__divider {
		flex-shrink: 0;
	}


	/* # Main */

	.bar-split-view__main {
		display: flex;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex: 1;
	}


	/* # Slotted */

	::slotted(*) {
		min-height: 0;
		flex: 1;
	}
`;

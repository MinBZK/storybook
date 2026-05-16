import { css } from 'lit';

export const appViewStyles = css`


	/* # Host */

	:host {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
	}


	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Block */

	.app-view {
		display: flex;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
		flex-direction: column;
		flex: 1;
	}

	::slotted(*) {
		min-height: 0;
		flex: 1;
	}
`;

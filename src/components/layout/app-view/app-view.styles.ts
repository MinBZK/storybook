import { css } from 'lit';

export const appViewStyles = css`


	/* # Host */

	:host {
		--context-parent-background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--context-parent-background-color);

		display: flex;
		width: 100%;
		height: 100%;
		background-color: var(--_background-color);
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
		flex-direction: column;
		flex: 1;
		min-height: 0;
		min-width: 0;
		overflow: hidden;
	}

	::slotted(*) {
		flex: 1;
		min-height: 0;
	}
`;

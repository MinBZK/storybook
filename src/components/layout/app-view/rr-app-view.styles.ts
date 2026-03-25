import { css } from 'lit';


/* # rr-app-view styles */

export const appViewStyles = css`
	:host {
		--background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--background-color);

		display: flex;
		width: 100%;
		height: 100%;
		background-color: var(--_background-color);
	}


	:host([background="tinted"]) {
		--background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # App view */

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

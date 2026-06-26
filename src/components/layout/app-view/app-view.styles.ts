import { css } from 'lit';
import { boxSizingReset } from '../../../assets/styles/style-resets.js';

export const appViewStyles = css`
	${boxSizingReset}


	/* # Host */

	:host {
		--context-parent-background-color: var(--semantics-surfaces-base-background-color);
		--_background-color: var(--context-parent-background-color);

		display: flex;
		background-color: var(--_background-color);
		width: 100%;
		height: 100%;
	}

	:host([hidden]) {
		display: none;
	}

	:host([background="tinted"]) {
		--context-parent-background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
	}


	/* # Block */

	.app-view {
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

	::slotted(*) {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0;
	}
`;

import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const mdMin = unsafeCSS(breakpoints.mdMin);


/* # rr-split-view-pane styles */

export const splitViewPaneStyles = css`
	:host {
		--_background-color: var(--background-color, var(--semantics-surfaces-background-color));

		display: flex;
		width: 100%;
		height: 100%;

		@media (min-width: ${mdMin}) {
			background-color: var(--_background-color);
		}
	}

	:host([background="default"]) {
		--background-color: var(--semantics-surfaces-background-color);
		--_background-color: var(--background-color);
	}

	:host([background="tinted"]) {
		--background-color: var(--semantics-surfaces-tinted-background-color);
		--_background-color: var(--background-color);
	}

	:host([hidden]) {
		display: none;
	}

	:host([hide-back]) {
		--back-button-display: none;
	}


	/* # Pane */

	.split-view-pane {
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

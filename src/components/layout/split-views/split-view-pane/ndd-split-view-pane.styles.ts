import { css, unsafeCSS } from 'lit';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const mdMin = unsafeCSS(breakpoints.mdMin);


/* # ndd-split-view-pane styles */

export const splitViewPaneStyles = css`
	:host {
		--_background-color: var(--context-parent-background-color, var(--semantics-surfaces-background-color));

		display: flex;
		width: 100%;
		height: 100%;

		@media (min-width: ${mdMin}) {
			background-color: var(--_background-color);
		}
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

	:host([hide-back]) {
		--context-back-button-display: none;
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

import { css } from 'lit';

export const buttonGroupStyles = css`


	/* # Host */

	:host {
		--_width: 100%;
		--_flex-direction: column;
		--_flex-wrap: nowrap;
		--_gap: var(--components-button-group-md-gap);

		display: flex;
		width: 100%;
		justify-content: flex-start;
	}

	:host([size="sm"]) {
		--_gap: var(--components-button-group-sm-gap);
	}

	/* ## Horizontal */

	:host([orientation="horizontal"]) {
		--_width: auto;
		--_flex-direction: row;
		--_flex-wrap: wrap;
	}

	:host([hidden]) {
		display: none;
	}

	::slotted([hidden]) {
		display: none !important;
	}


	/* # Block */

	.button-group {
		display: flex;
		width: var(--_width);
		flex-direction: var(--_flex-direction);
		flex-wrap: var(--_flex-wrap);
		gap: var(--_gap);
	}
`;

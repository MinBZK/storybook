import { css } from 'lit';

export const buttonGroupStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
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
		justify-content: center;
	}


	/* # Orientation: Horizontal */

	:host([orientation="horizontal"]) .button-group {
		flex-direction: row;
		flex-wrap: wrap;
	}


	/* # Orientation: Vertical */

	:host([orientation="vertical"]) {
		display: flex;
		width: 100%;
	}

	:host([orientation="vertical"]) .button-group {
		flex-direction: column;
		width: 100%;
	}


	/* # Size: S */

	:host([size="sm"]) .button-group {
		gap: var(--components-button-group-sm-gap);
	}


	/* # Size: M (default) */

	:host([size="md"]) .button-group,
	:host(:not([size])) .button-group {
		gap: var(--components-button-group-md-gap);
	}
`;

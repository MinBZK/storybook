import { css } from 'lit';

export const styles = css`
	:host {
		display: inline-flex;
	}

	:host([hidden]) {
		display: none;
	}

	::slotted([hidden]) {
		display: none !important;
	}

	.button-group {
		display: flex;
		justify-content: center;
	}

	/* # Flow: Horizontal */

	:host([orientation="horizontal"]) .button-group,
	:host(:not([orientation])) .button-group {
		flex-direction: row;
		flex-wrap: wrap;
	}

	/* # Flow: Vertical */

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

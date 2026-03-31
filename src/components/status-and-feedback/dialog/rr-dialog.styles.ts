import { css } from 'lit';

/* # rr-dialog styles */

export const dialogStyles = css`

	/* # Host */

	:host {
		display: flex;
		justify-content: center;

		--_icon-color: var(--semantics-content-color);
	}

	:host([hidden]) {
		display: none;
	}

	:host([variant='alert']) {
		--_icon-color: var(--primitives-color-warning-350);
	}


	/* # Body */

	.dialog__body {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
		box-sizing: border-box;
		max-width: var(--primitives-area-480);
	}


	/* # Icon */

	.dialog__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--primitives-space-48);
		height: var(--primitives-space-48);
		color: var(--_icon-color);
		flex-shrink: 0;
	}


	/* # Text */

	.dialog__text {
		margin: 0;
		font: var(--primitives-font-body-md-bold-tight);
		color: var(--semantics-content-color);
		text-align: center;
	}

	.dialog__text:focus-visible {
		box-shadow: none;
		outline: none;
	}


	/* # Supporting text */

	.dialog__supporting-text {
		margin: 0;
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--semantics-content-color);
		text-align: center;
	}


	/* # Content */

	.dialog__content {
		width: 100%;
	}

	.dialog__content:not(:has(*)) {
		display: none;
	}


	/* # Actions */

	.dialog__actions {
		width: 100%;
		padding-top: var(--primitives-space-16);
	}

	.dialog__actions:not(:has(*)) {
		display: none;
	}
`;

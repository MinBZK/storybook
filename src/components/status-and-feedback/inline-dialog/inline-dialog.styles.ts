import { css } from 'lit';

export const inlineDialogStyles = css`


	/* # Host */

	:host {
		--_icon-color: var(--semantics-content-color);

		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	:host([hidden]) {
		display: none;
	}

	:host([variant='alert']) {
		--_icon-color: light-dark(var(--primitives-color-warning-350), var(--primitives-color-warning-650));
	}


	/* # Body */

	.inline-dialog__body {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
		box-sizing: border-box;
		max-width: var(--primitives-area-480);
	}


	/* # Icon */

	.inline-dialog__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--primitives-space-48);
		height: var(--primitives-space-48);
		color: var(--_icon-color);
		flex-shrink: 0;
	}


	/* # Text */

	.inline-dialog__text {
		margin: 0;
		font: var(--primitives-font-body-md-bold-tight);
		color: var(--semantics-content-color);
		text-align: center;
		text-wrap: pretty;
	}

	.inline-dialog__text:focus-visible {
		box-shadow: none;
		outline: none;
	}


	/* # Supporting text */

	.inline-dialog__supporting-text {
		margin: 0;
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--semantics-content-color);
		text-align: center;
		text-wrap: pretty;
	}


	/* # Content */

	.inline-dialog__content {
		width: 100%;
	}

	.inline-dialog__content[hidden] {
		display: none;
	}


	/* # Actions */

	.inline-dialog__actions {
		width: 100%;
		padding-top: var(--primitives-space-16);
	}

	.inline-dialog__actions[hidden] {
		display: none;
	}
`;

import { css } from 'lit';

export const inlineDialogStyles = css`


	/* # Host */

	:host {
		--_icon-size: var(--primitives-space-48);
		--_icon-color: var(--components-inline-dialog-icon-color);

		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	:host([hidden]) {
		display: none;
	}

	:host([variant='alert']) {
		--_icon-color: var(--components-inline-dialog-icon-warning-color);
	}

	:host([variant='success']) {
		--_icon-color: var(--components-inline-dialog-icon-success-color);
	}

	:host([icon-color='secondary']) { --_icon-color: var(--components-inline-dialog-icon-secondary-color); }
	:host([icon-color='accent'])    { --_icon-color: var(--components-inline-dialog-icon-accent-color); }
	:host([icon-color='critical'])  { --_icon-color: var(--components-inline-dialog-icon-critical-color); }
	:host([icon-color='warning'])   { --_icon-color: var(--components-inline-dialog-icon-warning-color); }
	:host([icon-color='success'])   { --_icon-color: var(--components-inline-dialog-icon-success-color); }


	/* # Body */

	.inline-dialog__body {
		display: flex;
		box-sizing: border-box;
		max-width: var(--primitives-area-480);
		flex-direction: column;
		align-items: center;
		flex-grow: 1;
	}


	/* # Icon */

	.inline-dialog__icon {
		display: flex;
		width: var(--_icon-size);
		height: var(--_icon-size);
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		color: var(--_icon-color);
	}


	/* # Text */

	.inline-dialog__text {
		margin: 0;
		text-align: center;
		font: var(--primitives-font-body-md-bold-tight);
		color: var(--semantics-content-color);
		text-wrap: pretty;
	}

	.inline-dialog__text:focus-visible {
		box-shadow: none;
		outline: none;
	}


	/* # Supporting text */

	.inline-dialog__supporting-text {
		margin: 0;
		text-align: center;
		font: var(--primitives-font-body-sm-regular-tight);
		color: var(--semantics-content-color);
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

import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const inlineDialogStyles = css`


	/* # Host */

	:host {
		--_icon-size: var(--primitives-space-40);
		--_icon-color: var(--components-inline-dialog-icon-color);
		--_text-font: var(--primitives-font-body-md-bold-tight);
		--_supporting-text-font: var(--primitives-font-body-sm-regular-tight);

		${inheritedTextReset}
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: center;
	}

	:host([size="lg"]) {
		--_icon-size: var(--primitives-space-48);
		--_text-font: var(--primitives-font-body-lg-bold-tight);
		--_supporting-text-font: var(--primitives-font-body-md-regular-tight);
	}

	:host([variant="alert"]) {
		--_icon-color: var(--components-inline-dialog-icon-warning-color);
	}

	:host([variant="success"]) {
		--_icon-color: var(--components-inline-dialog-icon-success-color);
	}

	:host([icon-color="secondary"]) {
		--_icon-color: var(--components-inline-dialog-icon-secondary-color);
	}

	:host([icon-color="accent"]) {
		--_icon-color: var(--components-inline-dialog-icon-accent-color);
	}

	:host([icon-color="critical"]) {
		--_icon-color: var(--components-inline-dialog-icon-critical-color);
	}

	:host([icon-color="warning"]) {
		--_icon-color: var(--components-inline-dialog-icon-warning-color);
	}

	:host([icon-color="success"]) {
		--_icon-color: var(--components-inline-dialog-icon-success-color);
	}

	:host([hidden]) {
		display: none;
	}


	/* # Elements */

	.inline-dialog__body {
		box-sizing: border-box;
		display: flex;
		max-width: var(--primitives-area-480);
		flex-direction: column;
		flex-grow: 1;
		align-items: center;
	}

	.inline-dialog__main {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		gap: var(--primitives-space-2);
	}

	.inline-dialog__icon {
		display: flex;
		width: var(--_icon-size);
		height: var(--_icon-size);
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		color: var(--_icon-color);
	}

	.inline-dialog__text {
		margin: 0;
		text-align: center;
		color: var(--semantics-content-color);
		font: var(--_text-font);
		text-wrap: pretty;
	}

	.inline-dialog__text:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.inline-dialog__supporting-text {
		margin: 0;
		text-align: center;
		color: var(--semantics-content-color);
		font: var(--_supporting-text-font);
		text-wrap: pretty;
	}

	.inline-dialog__content {
		width: 100%;
	}

	.inline-dialog__content[hidden] {
		display: none;
	}

	.inline-dialog__footer {
		width: 100%;
		padding-top: var(--primitives-space-16);
	}

	.inline-dialog__footer[hidden] {
		display: none;
	}
`;

import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const keyboardShortcutStyles = css`


	/* # Host */

	:host {
		--_size: var(--components-keyboard-shortcut-md-size);
		--_inline-padding: var(--primitives-space-6);
		--_font: var(--primitives-font-body-xs-regular-flat);

		${inheritedTextReset}
		display: inline-flex;
		vertical-align: middle;
	}

	:host([size="sm"]) {
		--_size: var(--components-keyboard-shortcut-sm-size);
		--_inline-padding: var(--primitives-space-4);
		--_font: var(--primitives-font-body-xxs-regular-flat);
	}

	:host([hidden]) {
		display: none;
	}

	@media (any-hover: none) {
		:host(:not([always-visible])) {
			display: none;
		}
	}


	/* # Block */

	.keyboard-shortcut {
		display: inline-flex;
		gap: var(--primitives-space-4);
		align-items: center;
	}


	/* # Elements */

	.keyboard-shortcut__key {
		box-sizing: border-box;
		display: inline-flex;
		border: var(--components-keyboard-shortcut-border-thickness) solid var(--components-keyboard-shortcut-border-color);
		border-radius: var(--components-keyboard-shortcut-corner-radius);
		background-color: var(--components-keyboard-shortcut-background-color);
		min-width: var(--_size);
		height: var(--_size);
		padding: 0 var(--_inline-padding);
		align-items: center;
		justify-content: center;
		color: var(--components-keyboard-shortcut-content-color);
		font: var(--_font);
		white-space: nowrap;
	}

	@media (forced-colors: active) {
		.keyboard-shortcut__key {
			border-color: CanvasText;
			background-color: Canvas;
			color: CanvasText;
		}
	}

	.keyboard-shortcut__separator {
		color: var(--components-keyboard-shortcut-separator-color);
		font: var(--_font);
	}
`;

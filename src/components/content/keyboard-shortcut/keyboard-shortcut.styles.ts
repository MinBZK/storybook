import { css } from 'lit';

export const keyboardShortcutStyles = css`


	/* # Host */

	:host {
		--_size: var(--components-keyboard-shortcut-md-size);
		--_inline-padding: var(--primitives-space-6);
		--_font: var(--primitives-font-body-xs-regular-flat);

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

	/* Hide on touch-only devices (no hover capability anywhere) since the
	   shortcut cannot be invoked. Override with [always-visible] when the
	   shortcut is shown for informational purposes. */
	@media (any-hover: none) {
		:host(:not([always-visible])) {
			display: none;
		}
	}


	/* # Block */

	.keyboard-shortcut {
		display: inline-flex;
		align-items: center;
		gap: var(--primitives-space-4);
	}


	/* # Elements */

	.keyboard-shortcut__key {
		display: inline-flex;
		box-sizing: border-box;
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

	.keyboard-shortcut__separator {
		color: var(--components-keyboard-shortcut-separator-color);
		font: var(--_font);
	}


	/* # Toegankelijkheid */

	@media (forced-colors: active) {
		.keyboard-shortcut__key {
			border-color: CanvasText;
			background-color: Canvas;
			color: CanvasText;
		}
	}
`;

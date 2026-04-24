import { css } from 'lit';

export const keyboardShortcutStyles = css`


	/* # Host */

	:host {
		display: inline-flex;
		vertical-align: middle;
	}

	:host([hidden]) {
		display: none;
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
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		background-color: var(--primitives-color-neutral-50);
		color: var(--primitives-color-neutral-800);
		border: 1px solid var(--primitives-color-neutral-150);
		border-radius: var(--primitives-corner-radius-xs);
		font-family: var(--primitives-font-family-body);
		font-weight: var(--primitives-font-weight-body-regular);
		white-space: nowrap;
	}

	:host([size="sm"]) .keyboard-shortcut__key {
		min-width: var(--primitives-space-20);
		height: var(--primitives-space-20);
		padding: 0 var(--primitives-space-4);
		font-size: var(--primitives-font-size-70);
	}

	:host([size="md"]) .keyboard-shortcut__key,
	:host(:not([size])) .keyboard-shortcut__key {
		min-width: var(--primitives-space-24);
		height: var(--primitives-space-24);
		padding: 0 var(--primitives-space-6);
		font-size: var(--primitives-font-size-80);
	}

	.keyboard-shortcut__separator {
		color: var(--semantics-content-secondary-color);
	}

	:host([size="sm"]) .keyboard-shortcut__separator {
		font-size: var(--primitives-font-size-70);
	}

	:host([size="md"]) .keyboard-shortcut__separator,
	:host(:not([size])) .keyboard-shortcut__separator {
		font-size: var(--primitives-font-size-80);
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

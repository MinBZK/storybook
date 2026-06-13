import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const keyboardShortcutStyles = css`


	/* # Host */

	:host {
		--_size: var(--components-keyboard-shortcut-md-size);
		--_inline-padding: var(--primitives-space-4);
		--_font: var(--primitives-font-body-xs-regular-flat);
		--_content-color: var(--components-keyboard-shortcut-content-color);
		--_separator-color: var(--components-keyboard-shortcut-separator-color);
		--_highlight-border-color: var(--components-keyboard-shortcut-border-color);
		--_background-color: var(--components-keyboard-shortcut-background-color);

		${inheritedTextReset}
		display: inline-flex;
		vertical-align: middle;
	}

	/* color="inherit": the keys follow the surrounding text color (a filled
	   panel, a highlighted menu item, …) — text and separators take currentColor,
	   while the fill and highlight border become a translucent contrast overlay,
	   exactly like the button's inherit-tinted variant. The forced-colors block
	   below still wins with system colors. */
	:host([color="inherit"]) {
		--_content-color: currentColor;
		--_separator-color: currentColor;
		--_highlight-border-color: color-mix(in oklab, var(--semantics-content-contrast-color) 10%, transparent);
		--_background-color: color-mix(in oklab, var(--semantics-content-contrast-color) 20%, transparent);
	}

	:host([size="sm"]) {
		--_size: var(--components-keyboard-shortcut-sm-size);
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
		gap: var(--primitives-space-2);
		align-items: center;
	}


	/* # Elements */

	.keyboard-shortcut__key {
		box-sizing: border-box;
		display: inline-flex;
		/* Highlight border as an inset shadow (no layout box), like the button —
		   the key reads as a subtle inner outline rather than a hard border. */
		box-shadow: inset 0 0 0 var(--components-keyboard-shortcut-border-thickness) var(--_highlight-border-color);
		border-radius: var(--components-keyboard-shortcut-corner-radius);
		background-color: var(--_background-color);
		min-width: var(--_size);
		height: var(--_size);
		padding: 0 var(--_inline-padding);
		align-items: center;
		justify-content: center;
		color: var(--_content-color);
		font: var(--_font);
		white-space: nowrap;
	}

	/* Forced colors strip box-shadows, so the inset highlight border disappears —
	   fall back to a real border in system colors to keep the key outlined. */
	@media (forced-colors: active) {
		.keyboard-shortcut__key {
			border: var(--components-keyboard-shortcut-border-thickness) solid CanvasText;
			background-color: Canvas;
			color: CanvasText;
		}
	}

	.keyboard-shortcut__separator {
		color: var(--_separator-color);
		font: var(--_font);
	}
`;

import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const keyboardShortcutStyles = css`


	/* # Host */

	:host {
		--_size: var(--components-keyboard-shortcut-md-size);
		--_inline-padding: var(--primitives-space-4);
		--_font: var(--primitives-font-body-md-regular-flat);
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
		--_font: var(--primitives-font-body-sm-regular-flat);
	}

	/* size="inherit": scale with the surrounding text. The font is inherited
	   from the container, and the box keycaps are sized in em so they stay
	   proportional to — and aligned with — their context (e.g. a keycap beside
	   body text, or a shortcut hint in a menu item). */
	:host([size="inherit"]) {
		--_size: 1.5em;
		--_inline-padding: 0.35em;
		--_font: inherit;
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

	/* 'simple' variant: drop the keycap box and render each key as plain inline
	   text — a lighter hint for inline use (e.g. a menu item). No gap between
	   keys/separators so it reads as one run of text ("Ctrl+C", "⌘K"). */
	:host([variant="simple"]) .keyboard-shortcut {
		gap: 0;
	}

	:host([variant="simple"]) .keyboard-shortcut__key {
		box-shadow: none;
		background-color: transparent;
		border-radius: 0;
		min-width: 0;
		height: auto;
		padding: 0;
	}

	/* Forced colors strip box-shadows, so the box variant's inset highlight
	   border disappears — fall back to a real border there. The simple variant
	   has no box, so it stays plain text in system colors. */
	@media (forced-colors: active) {
		.keyboard-shortcut__key {
			color: CanvasText;
		}

		:host(:not([variant="simple"])) .keyboard-shortcut__key {
			border: var(--components-keyboard-shortcut-border-thickness) solid CanvasText;
			background-color: Canvas;
		}
	}

	.keyboard-shortcut__separator {
		color: var(--_separator-color);
		font: var(--_font);
	}
`;

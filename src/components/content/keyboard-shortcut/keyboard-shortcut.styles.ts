import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const keyboardShortcutStyles = css`


	/* # Host */

	:host {
		--_size: var(--components-keyboard-shortcut-md-size);
		--_inline-padding: var(--primitives-space-4);
		/* box (default): monospace keys at a reduced size — the keycap box makes
		   them read larger, and monospace renders large, so md uses size-80 and
		   sm size-70. The simple variant overrides to the body font at full size. */
		--_font-family: var(--primitives-font-family-monospace);
		--_font-size: var(--primitives-font-size-80);
		--_font-weight: var(--primitives-font-weight-body-regular);
		--_line-height: var(--primitives-line-height-flat);
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
		--_font-size: var(--primitives-font-size-70);
	}

	/* size="inherit": scale with the surrounding text. The box keycaps are sized
	   in em so they stay proportional to their context; the font is reduced to
	   0.75em because monospace renders large. */
	:host([size="inherit"]) {
		--_size: 1.5em;
		--_inline-padding: 0.35em;
		--_font-size: 0.75em;
	}

	/* simple variant: the body font at full size (no keycap to compensate for). */
	:host([variant="simple"]) {
		--_font-family: var(--primitives-font-family-body);
		--_font-size: var(--primitives-font-size-100);
	}

	:host([variant="simple"][size="sm"]) {
		--_font-size: var(--primitives-font-size-90);
	}

	/* simple + inherit: take only the font-size from the container, keeping the
	   component's own (body) family — so it never picks up an unexpected font. */
	:host([variant="simple"][size="inherit"]) {
		--_font-size: inherit;
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
		font-family: var(--_font-family);
		font-size: var(--_font-size);
		font-weight: var(--_font-weight);
		line-height: var(--_line-height);
		white-space: nowrap;
	}

	/* 'simple' variant: drop the keycap box and render each key as plain inline
	   text — a lighter hint for inline use (e.g. a menu item). No gap between
	   keys/separators so it reads as one run of text ("Ctrl+C"). */
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
		font-family: var(--_font-family);
		font-size: var(--_font-size);
		font-weight: var(--_font-weight);
		line-height: var(--_line-height);
	}
`;

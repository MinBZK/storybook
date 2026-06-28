import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const codeEditorStyles = css`
	:host {
		box-sizing: border-box;
	}


	/* # Host */

	:host {
		--_corner-radius: 0;
		--_background-color: transparent;
		--_border-color: transparent;
		--_border-shadow: none;
		--_padding-block: 0px;
		--_padding-inline: 0px;
		--_content-color: var(--semantics-content-color);
		--_font: var(--primitives-font-monospace-sm-regular-snug);
		--_rows: 6;

		/* iOS Safari auto-zooms a focused field rendered under 16px (sm is ~14px).
		   Bump to the 16px md size on touch to prevent it; non-touch keeps the
		   compact size, and pinch-zoom stays available (no maximum-scale hack). */
		@media (pointer: coarse) {
			--_font: var(--primitives-font-monospace-md-regular-snug);
		}

		${inheritedTextReset}
		display: flex;
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		-webkit-tap-highlight-color: transparent;
	}

	:host([hidden]) {
		display: none;
	}


	/* ## Variant — box adds the framed surface + a default content padding */

	:host([variant="box"]) {
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_border-color: var(--semantics-surfaces-tinted-border-color);
		--_border-shadow: inset 0 0 0 1px var(--_border-color);
		--_padding-block: var(--primitives-space-16);
		--_padding-inline: var(--primitives-space-16);
	}


	/* # Block — the frame only; CodeMirror fills it, padding lives on the content */

	.code-editor {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border-radius: var(--_corner-radius);
		box-shadow: var(--_border-shadow);
		background-color: var(--_background-color);
		min-height: 0;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		color: var(--_content-color);
		font: var(--_font);
	}

	:host([disabled]) .code-editor {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	/* Focus ring only on the box variant. The simple variant relies on a
	   prominent caret and lets a wrapping composition own its focus treatment. */
	:host([variant="box"]) .code-editor:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--_border-shadow);
	}


	/* # CodeMirror surface */

	/* Padding lives on the content so the whole padded area is clickable and a
	   click maps to the nearest line — no dead zone around the text. */
	/* :host bumps specificity above the shared theme's .cm-content reset. */
	:host .cm-content {
		padding: var(--_padding-block) var(--_padding-inline);
		min-height: calc(var(--_rows) * 1lh);
		tab-size: 2;
	}

	/* Simple variant has no focus ring, so the caret is the focus cue: make it
	   a prominent accent and a touch thicker. */
	:host([variant="simple"]) .cm-cursor {
		border-left-color: var(--primitives-color-accent-600);
		border-left-width: 2px;
	}

	/* Resize model — rows is the floor in every mode:
	   none = fixed height, vertical = drag up from the floor, auto = grow. */
	:host([resize="none"]) .cm-editor {
		height: calc(var(--_rows) * 1lh + 2 * var(--_padding-block));
	}

	:host([resize="vertical"]) .cm-scroller {
		resize: vertical;
		min-height: calc(var(--_rows) * 1lh + 2 * var(--_padding-block));
	}
`;

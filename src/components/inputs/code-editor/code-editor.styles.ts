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
		--_block-padding: 0;
		--_inline-padding: 0;
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


	/* ## Variant — box adds the framed surface (border ring, fill, padding, radius) */

	:host([variant="box"]) {
		--_corner-radius: var(--primitives-corner-radius-lg);
		--_background-color: var(--semantics-surfaces-tinted-background-color);
		--_border-color: var(--semantics-surfaces-tinted-border-color);
		--_border-shadow: inset 0 0 0 1px var(--_border-color);
		--_block-padding: var(--primitives-space-16);
		--_inline-padding: var(--primitives-space-16);
	}


	/* # Block */

	.code-editor {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border-radius: var(--_corner-radius);
		box-shadow: var(--_border-shadow);
		background-color: var(--_background-color);
		min-height: 0;
		overflow: hidden;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		padding: var(--_block-padding) var(--_inline-padding);
		color: var(--_content-color);
		font: var(--_font);
	}

	:host([disabled]) .code-editor {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	.code-editor:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		/* Comma-compose so the focus ring layers over the box variant's inset
		   border ring instead of replacing it (none in the simple variant). */
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--_border-shadow);
	}


	/* # CodeMirror surface */

	.cm-editor {
		min-height: 0;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: auto;
		height: 100%;
	}

	.cm-content {
		min-height: calc(var(--_rows) * 1lh);
		tab-size: 2;
	}

	:host([resize="vertical"]) .cm-scroller {
		resize: vertical;
	}
`;

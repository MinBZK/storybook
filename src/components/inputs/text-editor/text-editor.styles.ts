import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/slotted-reset.js';

export const textEditorStyles = css`


	/* # Host */

	:host {
		--_corner-radius: 0;
		--_background-color: transparent;
		--_border-color: transparent;
		--_border-shadow: none;
		--_padding-block: 0px;
		--_padding-inline: 0px;
		--_content-color: var(--semantics-content-color);
		--_font: var(--semantics-input-fields-md-text-font);
		--_rows: 6;

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

	/* Monospace option (default is the sans body font, best for prose). */
	:host([font="mono"]) {
		--_font: var(--primitives-font-monospace-md-regular-snug);
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


	/* # Block — the frame only; CodeMirror fills it */

	.text-editor {
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

	:host([disabled]) .text-editor {
		opacity: var(--primitives-opacity-disabled);
		pointer-events: none;
	}

	/* Focus ring only on the box variant; simple relies on the accent caret and
	   lets a wrapping composition own its focus treatment. */
	:host([variant="box"]) .text-editor:focus-within {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--_border-shadow);
	}


	/* # CodeMirror surface */

	/* Inline padding on the scroller (left of any future gutter), block + right
	   on the content for click mapping + scroll-end padding. :host beats the
	   shared theme's .cm-content reset. */
	:host .cm-scroller {
		padding-left: var(--_padding-inline);
	}

	:host .cm-content {
		padding-block: var(--_padding-block);
		padding-right: var(--_padding-inline);
		min-height: calc(var(--_rows) * 1lh);
	}

	:host([variant="simple"]) .cm-cursor {
		border-left-color: var(--primitives-color-accent-600);
		border-left-width: 2px;
	}

	:host([resize="none"]) .cm-editor {
		height: calc(var(--_rows) * 1lh + 2 * var(--_padding-block));
	}

	:host([resize="vertical"]) .cm-scroller {
		resize: vertical;
		min-height: calc(var(--_rows) * 1lh + 2 * var(--_padding-block));
	}


	/* # Hybrid markdown decorations
	   Sizes are em-relative so they scale with the editor font; markers are
	   dimmed (not hidden) so the markdown source stays legible. */

	.cm-md-h1 { font-size: 1.6em; font-weight: 700; line-height: 1.3; }
	.cm-md-h2 { font-size: 1.4em; font-weight: 700; line-height: 1.3; }
	.cm-md-h3 { font-size: 1.2em; font-weight: 700; }
	.cm-md-h4 { font-weight: 700; }
	.cm-md-h5 { font-weight: 700; }
	.cm-md-h6 { font-weight: 700; }
	.cm-md-strong { font-weight: 700; }
	.cm-md-emphasis { font-style: italic; }
	.cm-md-strike { text-decoration: line-through; }
	/* Code uses the 16px monospace step so it sits next to the 18px body. */
	.cm-md-code {
		background-color: var(--semantics-surfaces-tinted-background-color);
		padding: 0 0.2em;
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--primitives-font-size-90);
	}
	.cm-md-codeblock {
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--primitives-font-size-90);
	}
	.cm-md-link { color: var(--semantics-links-color); }
	.cm-md-url { color: var(--semantics-input-fields-placeholder-color); }
	/* Blockquote reads at the lg (20px) step. */
	.cm-md-quote { color: var(--semantics-input-fields-placeholder-color); font-style: italic; font-size: var(--primitives-font-size-200); }
	.cm-md-mark { opacity: 0.45; }
`;

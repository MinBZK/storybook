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
		/* Prose: 18px body at 1.5 line-height (snug) for readability. */
		--_font: var(--primitives-font-body-md-regular-snug);
		--_base-font-size: var(--primitives-font-size-100);
		/* JetBrains Mono advance (600/1000 em). Leading list/quote markers render
		   in mono so the hanging indent equals their width exactly. */
		--_marker-advance: 0.6em;
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
		--_base-font-size: var(--primitives-font-size-90);
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
	   Headings follow rich-text's display scale at its sm step. Markers are kept
	   visible but dimmed in monospace, which also gives the leading list/quote
	   prefix a predictable width for the hanging indent (see --_marker-advance). */

	.cm-md-h1 { font: var(--primitives-font-display-1-sm); }
	.cm-md-h2 { font: var(--primitives-font-display-2-sm); }
	.cm-md-h3 { font: var(--primitives-font-display-3-sm); }
	.cm-md-h4 { font: var(--primitives-font-display-4-sm); }
	.cm-md-h5 { font: var(--primitives-font-display-5-sm); }
	.cm-md-h6 { font: var(--primitives-font-display-6-sm); }
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
	/* Blockquote reads at the lg (20px) step, in the primary content colour. */
	.cm-md-quote { color: var(--semantics-content-color); font-style: italic; font-size: var(--primitives-font-size-200); }
	/* Markers: dimmed (secondary colour, not opacity, so contrast holds) and
	   monospace at the base text size — tidy, and a fixed-width leading prefix. */
	.cm-md-mark {
		color: var(--semantics-content-secondary-color);
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--_base-font-size);
	}
	/* The leading prefix (and anything nested in it, e.g. a blockquote's own
	   span) renders at the base size, so its width stays prefixLength × the mono
	   advance and the hanging indent lines up exactly. */
	.cm-md-listprefix,
	.cm-md-listprefix * {
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--_base-font-size);
	}
`;

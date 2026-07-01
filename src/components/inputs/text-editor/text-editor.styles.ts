import { css } from 'lit';
import { inheritedTextReset } from '../../../assets/styles/style-resets.js';

export const textEditorStyles = css`


	/* # Host */

	:host {
		--_corner-radius: 0;
		--_background-color: transparent;
		--_highlight-border-color: transparent;
		--_highlight-border-shadow: none;
		--_padding-block: 0px;
		--_padding-inline: 0px;
		--_content-color: var(--semantics-content-color);
		/* Prose: 18px body at 1.5 line-height (snug) for readability. */
		--_font: var(--primitives-font-body-md-regular-snug);
		--_code-font: var(--primitives-font-monospace-md-regular-snug);
		/* Markers render one step down (16px mono): monospace reads larger than
		   the sans body beside it, matching the DS mono/body pairing. */
		--_marker-font-size: var(--primitives-font-size-90);
		/* JetBrains Mono advance (600/1000 em) at the marker size; leading
		   list/quote markers are mono so the hanging indent equals their width. */
		--_marker-advance: calc(0.6 * var(--_marker-font-size));
		--_heading-marker-scale: 75%;
		--_token-corner-radius: var(--primitives-corner-radius-sm);
		--_token-block-padding: 0.15em;
		--_token-inline-padding: 0.3em;
		--_code-token-background: light-dark(var(--primitives-color-neutral-50), var(--primitives-color-neutral-150));
		--_code-token-background-is-selected: light-dark(var(--primitives-color-neutral-200), var(--primitives-color-neutral-300));
		--_annotation-token-background: light-dark(var(--primitives-color-mark-75), var(--primitives-color-mark-150));
		--_annotation-token-background-is-selected: light-dark(var(--primitives-color-mark-200), var(--primitives-color-mark-400));
		--_annotation-token-badge-content-color: var(--primitives-color-mark-1000);
		--_annotation-token-badge-background: light-dark(var(--primitives-color-mark-250), var(--primitives-color-mark-300));
		--_annotation-token-badge-highlight-border: light-dark(var(--primitives-color-mark-300), var(--primitives-color-mark-350));
		--_annotation-token-badge-background-hover: light-dark(var(--primitives-color-mark-300), var(--primitives-color-mark-350));
		--_annotation-token-badge-highlight-border-hover: light-dark(var(--primitives-color-mark-350), var(--primitives-color-mark-400));
		--_annotation-token-badge-background-active: light-dark(var(--primitives-color-mark-350), var(--primitives-color-mark-400));
		--_annotation-token-badge-highlight-border-active: light-dark(var(--primitives-color-mark-400), var(--primitives-color-mark-450));
		--_annotation-token-badge-background-selected: light-dark(var(--primitives-color-mark-450), var(--primitives-color-mark-950));
		--_annotation-token-badge-highlight-border-selected: light-dark(var(--primitives-color-mark-500), var(--primitives-color-mark-1000));
		--_mention-token-background: var(--semantics-categories-accent-tinted-background-color);
		--_mention-token-content-color: var(--semantics-categories-accent-tinted-primary-content-color);
		--_mention-token-background-is-selected: var(--semantics-categories-accent-filled-background-color);
		--_mention-token-content-color-is-selected: var(--semantics-categories-accent-filled-primary-content-color);
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
		--_highlight-border-color: var(--semantics-surfaces-tinted-border-color);
		--_highlight-border-shadow: inset 0 0 0 1px var(--_highlight-border-color);
		--_padding-block: var(--primitives-space-16);
		--_padding-inline: var(--primitives-space-16);
	}


	/* # Block — the frame only; CodeMirror fills it */

	.text-editor {
		box-sizing: border-box;
		display: flex;
		position: relative;
		border-radius: var(--_corner-radius);
		box-shadow: var(--_highlight-border-shadow);
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
		box-shadow: var(--semantics-focus-ring-box-shadow), var(--_highlight-border-shadow);
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

	/* Prominent accent caret in both variants (box additionally has the focus
	   ring). The [variant] attribute is always present, so this outweighs the
	   theme's default cursor colour. */
	:host([variant]) .cm-cursor {
		/* accent-700: it keeps a >=525 lightness gap from both the base and tinted
		   surfaces in light and dark (accent-600 fell just short on white), so the
		   caret stays clearly visible without washing out. */
		border-left-color: var(--primitives-color-accent-700);
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

	.cm-md-h1 {
		font: var(--primitives-font-display-1-sm);
	}

	.cm-md-h2 {
		font: var(--primitives-font-display-2-sm);
	}

	.cm-md-h3 {
		font: var(--primitives-font-display-3-sm);
	}

	.cm-md-h4 {
		font: var(--primitives-font-display-4-sm);
	}

	.cm-md-h5 {
		font: var(--primitives-font-display-5-sm);
	}

	.cm-md-h6 {
		font: var(--primitives-font-display-6-sm);
	}

	/* The # marker grows with its heading (a fraction of it) so it reads as part
	   of the heading without dominating. Headings aren't a hanging-indent prefix,
	   so this size is free to vary. */
	:is(.cm-md-h1, .cm-md-h2, .cm-md-h3, .cm-md-h4, .cm-md-h5, .cm-md-h6) .cm-md-mark {
		font-size: var(--_heading-marker-scale);
	}
	.cm-md-strong {
		font-weight: bold;
	}
	.cm-md-emphasis {
		font-style: italic;
	}
	.cm-md-strike {
		text-decoration: line-through;
	}

	/* Inline code: 16px monospace step (sits next to the 18px body) on a subtle
	   chip background. The selected run is darkened with a decoration (see
	   cm-md-code-selected below), since drawSelection hides the native selection. */
	.cm-md-code {
		padding-block: var(--_token-block-padding);
		padding-inline: var(--_token-inline-padding);
		font: var(--_code-font);
		background-color: var(--_code-token-background);
		border-radius: var(--_token-corner-radius);
	}

	/* Code block: a full-width line background per content line, so consecutive
	   lines form one filled surface (the fence lines stay clean). The first and
	   last content lines round the top and bottom corners. */
	.cm-md-codeblock {
		padding-inline: var(--_token-inline-padding);
		font: var(--_code-font);
		background-color: var(--_code-token-background);
	}

	.cm-md-codeblock-first {
		padding-top: var(--_token-block-padding);
		border-start-start-radius: var(--_token-corner-radius);
		border-start-end-radius: var(--_token-corner-radius);
	}

	.cm-md-codeblock-last {
		padding-bottom: var(--_token-block-padding);
		border-end-start-radius: var(--_token-corner-radius);
		border-end-end-radius: var(--_token-corner-radius);
	}

	/* Selected slice of a code span — drawSelection hides the native ::selection,
	   so a decoration (cm-md-code-selected / cm-md-codeblock-selected) paints the
	   darker tint over the part that's selected. */
	.cm-md-code-selected,
	.cm-md-codeblock-selected {
		background-color: var(--_code-token-background-is-selected);
	}
	/* CM nests the base code mark inside the selected one, so the inner base tint
	   would paint over the darker selected tint (leaving the token light, or split
	   on a partial overlap). Clear it so the whole selected run reads as one block. */
	.cm-md-code-selected .cm-md-code {
		background-color: transparent;
	}

	/* @-mention: accent + semibold (shown only in the brief pre-parse state;
	   normally the whole token collapses to the rendered token below). */

	.cm-md-mention {
		color: var(--semantics-content-accent-color);
		font-weight: 600;
	}

	/* @-mention token: the collapsed, atomic pill the mention markdown renders as.
	   It uses the same inline-tag treatment as the annotation marker (display: inline with
	   visual block padding, so it never grows the line) — so the two tags match in
	   size, shape and position and align with the selection the same way. */
	.cm-md-mention-token {
		padding-block: var(--_token-block-padding);
		padding-inline: var(--_token-inline-padding);
		color: var(--_mention-token-content-color);
		background-color: var(--_mention-token-background);
		border-radius: var(--_token-corner-radius);
		font-weight: 600;
		white-space: nowrap;
		/* It's an atomic token, not editable text — show the default arrow, not the
		   text I-beam. */
		cursor: default;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
		/* List/quote lines carry a negative text-indent (the hanging indent), which
		   is inherited; Safari applies it to the token and shoves the @ over the
		   name. Reset it so the token lays out the same everywhere. */
		text-indent: 0;
	}

	/* The @ icon: a fixed-size inline prefix, nudged to sit on the text centre. */
	.cm-md-mention-token-icon {
		width: 0.95em;
		height: 0.95em;
		margin-inline-end: 0.1em;
		vertical-align: -0.16em;
	}

	/* Selected mention (clicked, or covered by the selection): solid dark accent. */
	.cm-md-mention-token[data-selected] {
		color: var(--_mention-token-content-color-is-selected);
		background-color: var(--_mention-token-background-is-selected);
	}

	/* A native selection over a mention keeps its text light on the filled accent.
	   :host bumps specificity so it wins over .cm-content ::selection wherever it sits. */
	:host .cm-md-mention-token ::selection {
		color: var(--_mention-token-content-color-is-selected);
	}

	.cm-md-link {
		color: var(--semantics-links-color);
	}

	.cm-md-url {
		color: var(--semantics-content-secondary-color);
	}

	/* The markdown highlight style tints the URL token (teal); make its span inherit
	   the dimmed colour so the address reads as secondary, like the surrounding marks. */
	.cm-md-url span {
		color: inherit;
	}

	/* Blockquote reads at the lg (20px) step in sans, primary content colour; in
	   the mono variant it stays at the 16px body size. */
	.cm-md-quote {
		color: var(--semantics-content-color);
		font-style: italic;
		font-size: var(--primitives-font-size-200);
	}

	:host([font="mono"]) .cm-md-quote {
		font-size: var(--primitives-font-size-90);
	}

	/* Markers: dimmed (secondary colour, not opacity, so contrast holds) and
	   monospace at the 16px marker size — tidy, and a fixed-width leading prefix. */
	.cm-md-mark {
		color: var(--semantics-content-secondary-color);
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--_marker-font-size);
	}

	/* The leading prefix (and anything nested in it, e.g. a blockquote's own
	   span) renders at the marker size, so its width stays prefixLength × the
	   mono advance and the hanging indent lines up exactly. */
	.cm-md-listprefix,
	.cm-md-listprefix * {
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--_marker-font-size);
	}


	/* # Annotation overlay
	   A light body tint + a dashed underline mark the annotated text; a solid
	   badge (the nub) sits at the end carrying the count. One role for all
	   annotations — the type is communicated by the consumer's pane, not colour.
	   The dashed line is a non-colour cue (with the badge) for accessibility. */

	/* One cohesive yellow block: the light tint with rounded corners and a reserved
	   space on the right for the solid nub (which lives inside this run, so it
	   shares the tint and wraps with the text). The dashed underline stays as a
	   non-colour cue. box-decoration-break keeps the tint + rounding on every
	   wrapped fragment; padding-block extends the tint without growing the line
	   (vertical padding on an inline box is visual only). */
	.cm-annotation {
		background-color: var(--_annotation-token-background);
		border-radius: var(--_token-corner-radius);
		padding-block: var(--_token-block-padding);
		padding-inline: var(--_token-inline-padding) 0;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}

	/* Selected slice within an annotation: a darker yellow (drawSelection's layer
	   sits behind the tint, so this stands in for the hidden selection) with the
	   text at the strongest content colour, like the rest of the selection. */
	.cm-annotation-selected {
		background-color: var(--_annotation-token-background-is-selected);
		color: var(--primitives-color-neutral-950);
	}

	/* Selected text takes the strongest content colour (more contrast on the
	   selection). Plain text goes fully dark; a selected annotation sits a step
	   lower (it has its own tinted marker). */
	.cm-content ::selection {
		color: var(--primitives-color-neutral-1000);
	}

	.cm-annotation ::selection {
		color: var(--primitives-color-neutral-950);
	}

	/* Solid nub, centred in the reserved right space (a small gap before it). A
	   badge-component-style chip: one step below the filled colour, a highlight
	   border, the dark filled content colour for the count, darkening on
	   hover/active. The default cursor (it's not a link), and a ::before that
	   enlarges the hit area into the reserved space around it. */
	.cm-annotation-badge {
		box-sizing: border-box;
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: center;
		min-width: 1.5em;
		height: 1.5em;
		margin-inline: 0.4em 0.3em;
		padding-inline: 0.3em;
		border: 0;
		border-radius: var(--primitives-corner-radius-full);
		background-color: var(--_annotation-token-badge-background);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_annotation-token-badge-highlight-border);
		color: var(--_annotation-token-badge-content-color);
		/* vertical-align: middle lands the nub on the line-box centre, which reads a
		   touch high next to the ink (glyphs sit lower, toward the baseline); nudge
		   down onto the text's optical middle. */
		vertical-align: middle;
		transform: translateY(0.1em);
		font-family: var(--primitives-font-family-body);
		font-size: 0.62em;
		font-weight: 700;
		line-height: 1;
		cursor: default;
	}

	.cm-annotation-badge::before {
		content: '';
		position: absolute;
		inset-block: -0.3em;
		inset-inline: -0.55em -0.45em;
	}

	@media (hover: hover) {
		.cm-annotation-badge:hover {
			background-color: var(--_annotation-token-badge-background-hover);
			box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_annotation-token-badge-highlight-border-hover);
		}
	}

	.cm-annotation-badge:active {
		background-color: var(--_annotation-token-badge-background-active);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_annotation-token-badge-highlight-border-active);
	}

	/* In a fully-selected annotation the nub darkens with the block, its border one
	   step above the fill. */
	.cm-annotation-selected .cm-annotation-badge {
		background-color: var(--_annotation-token-badge-background-selected);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) var(--_annotation-token-badge-highlight-border-selected);
	}

	/* The same focus ring as the rest of the system, on keyboard focus only. */
	.cm-annotation-badge:focus-visible {
		outline: var(--semantics-focus-ring-outline);
		outline-offset: var(--semantics-focus-ring-outline-offset);
		box-shadow: var(--semantics-focus-ring-box-shadow);
	}

	.cm-annotation-badge:focus:not(:focus-visible) {
		outline: none;
	}

	@media (forced-colors: active) {
		.cm-annotation,
		.cm-md-mention-token {
			outline: 1px solid currentColor;
		}
	}

	/* Drop cursor shown while dragging selected text to a new spot. */
	.cm-drag-drop-cursor {
		display: inline-block;
		width: 0;
		height: 1.1em;
		margin-inline: -1px;
		border-left: var(--primitives-border-width-regular) solid var(--primitives-color-accent-600);
		vertical-align: text-bottom;
		pointer-events: none;
	}

	/* A translucent copy of the dragged text, trailing the pointer (bottom-right).
	   Carries the selection colour so it reads as the picked-up selection. */
	.cm-drag-ghost {
		position: fixed;
		z-index: 5;
		max-width: 24ch;
		padding: 0 var(--primitives-space-4);
		border-radius: var(--_token-corner-radius);
		background-color: light-dark(var(--primitives-color-accent-150), var(--primitives-color-accent-250));
		color: var(--_content-color);
		font: var(--_font);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 0.65;
		pointer-events: none;
	}

	/* CodeMirror's floating panels — currently the @mention picker. */
	.cm-tooltip {
		border: var(--primitives-border-width-thin) solid var(--semantics-surfaces-base-border-color);
		border-radius: var(--primitives-corner-radius-sm);
		background-color: var(--semantics-surfaces-base-background-color);
		box-shadow: var(--components-tooltip-box-shadow);
	}

	/* "Open link" badge rendered inline right after every real link: a dimmed
	   external-link icon that brightens to the link colour on hover. */
	.cm-link-open {
		display: inline-flex;
		align-items: center;
		vertical-align: text-bottom;
		margin-inline-start: var(--primitives-space-4);
		color: var(--semantics-content-secondary-color);
		text-decoration: none;
		cursor: pointer;
	}

	.cm-link-open:hover {
		color: var(--semantics-links-color);
	}

	.cm-link-open nldd-icon {
		flex: none;
		width: 1em;
		height: 1em;
	}
`;

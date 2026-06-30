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
		/* Markers render one step down (16px mono): monospace reads larger than
		   the sans body beside it, matching the DS mono/body pairing. */
		--_marker-font-size: var(--primitives-font-size-90);
		/* JetBrains Mono advance (600/1000 em) at the marker size; leading
		   list/quote markers are mono so the hanging indent equals their width. */
		--_marker-advance: calc(0.6 * var(--_marker-font-size));
		/* The # marker scales to this fraction of its heading (see below). */
		--_heading-marker-scale: 75%;
		/* Annotation overlay: one role for all annotations (type is shown via
		   text by the consumer, not via colour). */
		--_annotation-tint: var(--semantics-categories-geel-tinted-background-color);
		/* A clearly darker yellow for the selected slice within an annotation. */
		--_annotation-selected: var(--semantics-categories-geel-filled-background-color);
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

	/* Prominent accent caret in both variants (box additionally has the focus
	   ring). The [variant] attribute is always present, so this outweighs the
	   theme's default cursor colour. */
	:host([variant]) .cm-cursor {
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
	/* The # marker grows with its heading (a fraction of it) so it reads as part
	   of the heading without dominating. Headings aren't a hanging-indent prefix,
	   so this size is free to vary. */
	:is(.cm-md-h1, .cm-md-h2, .cm-md-h3, .cm-md-h4, .cm-md-h5, .cm-md-h6) .cm-md-mark {
		font-size: var(--_heading-marker-scale);
	}
	.cm-md-strong { font-weight: 700; }
	.cm-md-emphasis { font-style: italic; }
	.cm-md-strike { text-decoration: line-through; }
	/* Inline code: 16px monospace step (sits next to the 18px body). No
	   background — it would paint over the selection layer drawn beneath the text
	   and hide it; the monospace font and dimmed backticks keep it recognisable. */
	.cm-md-code {
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--primitives-font-size-90);
	}
	.cm-md-codeblock {
		font-family: var(--primitives-font-family-monospace);
		font-size: var(--primitives-font-size-90);
	}
	.cm-md-link { color: var(--semantics-links-color); }
	/* @-mention: accent + semibold (shown only in the brief pre-parse state;
	   normally the whole token collapses to the chip below). */
	.cm-md-mention { color: var(--semantics-content-accent-color); font-weight: 600; }
	/* @-mention chip: the collapsed, atomic pill that replaces the token. It uses
	   the same inline-tag treatment as the annotation marker (display: inline with
	   visual block padding, so it never grows the line) — so the two tags match in
	   size, shape and position and align with the selection the same way. */
	.cm-md-mention-chip {
		padding-block: 0.15em;
		padding-inline: 0.3em;
		color: var(--semantics-categories-accent-tinted-primary-content-color);
		background-color: var(--semantics-categories-accent-tinted-background-color);
		border-radius: var(--primitives-corner-radius-sm);
		font-weight: 600;
		white-space: nowrap;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
		/* List/quote lines carry a negative text-indent (the hanging indent), which
		   is inherited; Safari applies it to the chip and shoves the @ over the
		   name. Reset it so the chip lays out the same everywhere. */
		text-indent: 0;
	}
	/* The @ icon: a fixed-size inline prefix, nudged to sit on the text centre. */
	.cm-md-mention-chip__at {
		width: 0.95em;
		height: 0.95em;
		margin-inline-end: 0.1em;
		vertical-align: -0.16em;
	}
	/* Selected mention (clicked, or covered by the selection): solid dark accent. */
	.cm-md-mention-chip[data-selected] {
		color: var(--semantics-categories-accent-filled-primary-content-color);
		background-color: var(--semantics-categories-accent-filled-background-color);
	}
	.cm-md-url { color: var(--semantics-input-fields-placeholder-color); }
	/* Blockquote reads at the lg (20px) step in sans, primary content colour; in
	   the mono variant it stays at the 16px body size. */
	.cm-md-quote { color: var(--semantics-content-color); font-style: italic; font-size: var(--primitives-font-size-200); }
	:host([font="mono"]) .cm-md-quote { font-size: var(--primitives-font-size-90); }
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
		background-color: var(--_annotation-tint);
		border-radius: var(--primitives-corner-radius-sm);
		padding-block: 0.15em;
		/* No trailing padding: the right-hand space is the nub's margin instead, so
		   it can't wrap to a fragment of its own (margins don't break). */
		padding-inline: 0.3em 0;
		-webkit-box-decoration-break: clone;
		box-decoration-break: clone;
	}

	/* Selected slice within an annotation: a darker yellow (drawSelection's layer
	   sits behind the tint, so this stands in for the hidden selection). */
	.cm-annotation-selected {
		background-color: var(--_annotation-selected);
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
		background-color: var(--semantics-categories-geel-tinted-highlight-border-color);
		/* A 1px inset highlight border one small step above the fill, applied as a
		   box-shadow like nldd-badge. */
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) light-dark(var(--primitives-color-geel-150), var(--primitives-color-geel-350));
		color: light-dark(var(--primitives-color-mark-1000), var(--primitives-color-mark-0));
		/* vertical-align: middle centres on the text x-height, which sits a hair
		   below the tinted block's true centre; nudge up to sit dead-centre. */
		vertical-align: middle;
		transform: translateY(-0.12em);
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
			background-color: var(--semantics-categories-geel-filled-background-color);
		}
	}

	.cm-annotation-badge:active {
		background-color: var(--semantics-categories-geel-filled-highlight-border-color);
	}

	/* In a fully-selected annotation the nub darkens with the block, and its border
	   steps up with it (one step above the fill — the geel scale has no geel-500,
	   so this uses the next step). */
	.cm-annotation-selected .cm-annotation-badge {
		background-color: var(--semantics-categories-geel-filled-highlight-border-color);
		box-shadow: inset 0 0 0 var(--primitives-border-width-thin) light-dark(var(--primitives-color-geel-650), var(--primitives-color-geel-1000));
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
		.cm-md-mention-chip {
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
`;

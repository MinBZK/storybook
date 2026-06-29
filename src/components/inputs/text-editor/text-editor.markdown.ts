import { ViewPlugin, Decoration, type DecorationSet, EditorView, WidgetType, type ViewUpdate } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { markdown } from '@codemirror/lang-markdown';
import { GFM } from '@lezer/markdown';
import { StateField, type EditorState, type Extension, type Range } from '@codemirror/state';
import type { SyntaxNode } from '@lezer/common';
import { MENTION_HREF_PREFIX } from './text-editor.mentions.js';
import '../../content/icon/icon.js';

/* Hybrid markdown rendering: the document stays plain markdown text, but the
 * formatting is shown inline (bold is bold, headings are larger, links are
 * coloured) while the syntax markers stay visible, only dimmed — the iA Writer
 * / Kirby approach. Implemented as decorations over the Lezer syntax tree. */

// Lezer node name → CSS class applied to that node's whole range (the content).
const NODE_CLASS: Record<string, string> = {
	ATXHeading1: 'cm-md-h1',
	ATXHeading2: 'cm-md-h2',
	ATXHeading3: 'cm-md-h3',
	ATXHeading4: 'cm-md-h4',
	ATXHeading5: 'cm-md-h5',
	ATXHeading6: 'cm-md-h6',
	StrongEmphasis: 'cm-md-strong',
	Emphasis: 'cm-md-emphasis',
	Strikethrough: 'cm-md-strike',
	InlineCode: 'cm-md-code',
	FencedCode: 'cm-md-codeblock',
	CodeBlock: 'cm-md-codeblock',
	URL: 'cm-md-url',
	Blockquote: 'cm-md-quote',
};

// Syntax markers — kept visible but dimmed so the source stays legible.
const MARK_NODES = new Set([
	'HeaderMark', 'EmphasisMark', 'StrikethroughMark', 'CodeMark',
	'QuoteMark', 'ListMark', 'LinkMark',
]);

const dimDeco = Decoration.mark({ class: 'cm-md-mark' });
const classDecoCache: Record<string, Decoration> = {};
function classDeco(cls: string): Decoration {
	return (classDecoCache[cls] ??= Decoration.mark({ class: cls }));
}

function linkTextRange(link: SyntaxNode): { from: number; to: number } | null {
	const marks: SyntaxNode[] = [];
	for (let child = link.firstChild; child; child = child.nextSibling) {
		if (child.name === 'LinkMark') marks.push(child);
	}
	if (marks.length < 2) return null;
	const from = marks[0].to; // after the opening '['
	const to = marks[1].from; // before the closing ']'
	return to > from ? { from, to } : null;
}

// A mention link (`[@Naam](user:id)`) gets a chip on its @Naam text; a normal
// link is coloured across its whole range. Either way the markers and URL are
// still visited as children and dimmed.
function decorateLink(state: EditorState, link: SyntaxNode, ranges: Range<Decoration>[]): void {
	let url: SyntaxNode | null = null;
	for (let child = link.firstChild; child; child = child.nextSibling) {
		if (child.name === 'URL') { url = child; break; }
	}
	const isMention = url !== null && state.sliceDoc(url.from, url.to).startsWith(MENTION_HREF_PREFIX);
	if (isMention) {
		const text = linkTextRange(link);
		if (text) ranges.push(classDeco('cm-md-mention').range(text.from, text.to));
	} else {
		ranges.push(classDeco('cm-md-link').range(link.from, link.to));
	}
}

// Inline/content styling — no layout change, so a viewport-scoped plugin.
function buildMarkDecorations(view: EditorView): DecorationSet {
	const ranges: Range<Decoration>[] = [];
	for (const { from, to } of view.visibleRanges) {
		syntaxTree(view.state).iterate({
			from,
			to,
			enter: (node) => {
				if (node.from >= node.to) return;
				if (node.name === 'Link') {
					decorateLink(view.state, node.node, ranges);
					return;
				}
				const cls = NODE_CLASS[node.name];
				if (cls) ranges.push(classDeco(cls).range(node.from, node.to));
				else if (MARK_NODES.has(node.name)) ranges.push(dimDeco.range(node.from, node.to));
			},
		});
	}
	return Decoration.set(ranges, true);
}

const markDecorationPlugin = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = buildMarkDecorations(view);
		}

		update(update: ViewUpdate): void {
			if (update.docChanged || update.viewportChanged) {
				this.decorations = buildMarkDecorations(update.view);
			}
		}
	},
	{ decorations: (plugin) => plugin.decorations },
);

/* Hanging indent: wrapped continuation lines of a list item or blockquote align
 * under the first line's text. The leading marker prefix is rendered in
 * monospace (cm-md-listprefix), so its width is exactly prefixLength × the mono
 * advance (--_marker-advance). The indent uses that same product, so the first
 * line's text and every wrapped line line up — no per-line measurement, and it
 * holds in both the sans and mono body fonts. Layout-affecting → a StateField. */
const HANGING_RE = /^(\s*(?:[-*+]|\d+[.)])\s+|\s*>+\s?)/;
const prefixMonoDeco = Decoration.mark({ class: 'cm-md-listprefix' });
const hangingLineCache: Record<number, Decoration> = {};
function hangingLineDeco(length: number): Decoration {
	return (hangingLineCache[length] ??= Decoration.line({
		attributes: {
			style: `text-indent:calc(${length} * var(--_marker-advance) * -1);padding-left:calc(${length} * var(--_marker-advance))`,
		},
	}));
}

function buildHangingIndent(state: EditorState): DecorationSet {
	const ranges: Range<Decoration>[] = [];
	for (let i = 1; i <= state.doc.lines; i++) {
		const line = state.doc.line(i);
		const match = line.text.match(HANGING_RE);
		if (match && match[1].length) {
			const length = match[1].length;
			ranges.push(hangingLineDeco(length).range(line.from));
			ranges.push(prefixMonoDeco.range(line.from, line.from + length));
		}
	}
	return Decoration.set(ranges, true);
}

const hangingIndentField = StateField.define<DecorationSet>({
	create: (state) => buildHangingIndent(state),
	update: (value, tr) => (tr.docChanged ? buildHangingIndent(tr.state) : value),
	provide: (field) => EditorView.decorations.from(field),
});

/* @-mentions collapse fully: the whole `[@Naam](user:id)` token is replaced by
 * an atomic chip widget — the syntax is hidden, the id is protected, and the
 * cursor steps over it (backspace removes the whole mention). */
class MentionWidget extends WidgetType {
	constructor(readonly label: string, readonly id: string, readonly selected: boolean) {
		super();
	}

	eq(other: MentionWidget): boolean {
		return other.label === this.label && other.id === this.id && other.selected === this.selected;
	}

	toDOM(): HTMLElement {
		const chip = document.createElement('span');
		chip.className = 'cm-md-mention-chip';
		chip.setAttribute('data-user', this.id);
		if (this.selected) chip.setAttribute('data-selected', '');
		// The @ is rendered as the DS 'at' icon — a separate, vertically-centred
		// prefix that aligns cleanly with the name.
		const at = document.createElement('nldd-icon');
		at.className = 'cm-md-mention-chip__at';
		at.setAttribute('name', 'at');
		at.setAttribute('aria-hidden', 'true');
		const name = document.createElement('span');
		name.textContent = this.label;
		chip.append(at, name);
		return chip;
	}
}

function buildMentionChips(state: EditorState): DecorationSet {
	const ranges: Range<Decoration>[] = [];
	const sel = state.selection.main;
	syntaxTree(state).iterate({
		enter: (node) => {
			if (node.name !== 'Link') return;
			const link = node.node;
			let url: SyntaxNode | null = null;
			for (let child = link.firstChild; child; child = child.nextSibling) {
				if (child.name === 'URL') { url = child; break; }
			}
			if (!url || !state.sliceDoc(url.from, url.to).startsWith(MENTION_HREF_PREFIX)) return;
			const text = linkTextRange(link);
			if (!text) return;
			const label = state.sliceDoc(text.from, text.to).replace(/^@/, '');
			const id = state.sliceDoc(url.from, url.to).slice(MENTION_HREF_PREFIX.length);
			const selected = !sel.empty && sel.from <= link.from && sel.to >= link.to;
			ranges.push(Decoration.replace({ widget: new MentionWidget(label, id, selected) }).range(link.from, link.to));
		},
	});
	return Decoration.set(ranges, true);
}

const mentionChipField = StateField.define<DecorationSet>({
	create: (state) => buildMentionChips(state),
	// Rebuild on doc changes and on selection changes (the latter drives the
	// selected/darker state of a covered mention).
	update: (value, tr) => (tr.docChanged || !tr.startState.selection.eq(tr.state.selection) ? buildMentionChips(tr.state) : value),
	provide: (field) => EditorView.decorations.from(field),
});

// Treat each chip as one unit so the cursor steps over it and backspace removes
// the whole mention rather than breaking the hidden (user:id) syntax.
const mentionAtomicRanges = EditorView.atomicRanges.of(
	(view) => view.state.field(mentionChipField, false) ?? Decoration.none,
);

/** Markdown language (with GFM) plus the hybrid inline-styling decorations. */
export const markdownEditing: Extension = [
	markdown({ extensions: GFM }),
	markDecorationPlugin,
	hangingIndentField,
	mentionChipField,
	mentionAtomicRanges,
];

/** Find the document range of the mention token whose chip contains `pos`, or
 *  null. Used by the component to select a mention on click. */
export function mentionRangeAt(state: EditorState, pos: number): { from: number; to: number } | null {
	let node: SyntaxNode | null = syntaxTree(state).resolveInner(pos, 1);
	for (; node; node = node.parent) {
		if (node.name === 'Link') {
			let url: SyntaxNode | null = null;
			for (let child = node.firstChild; child; child = child.nextSibling) {
				if (child.name === 'URL') { url = child; break; }
			}
			if (url && state.sliceDoc(url.from, url.to).startsWith(MENTION_HREF_PREFIX)) {
				return { from: node.from, to: node.to };
			}
		}
	}
	return null;
}

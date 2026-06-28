import { ViewPlugin, Decoration, type DecorationSet, EditorView, type ViewUpdate } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { markdown } from '@codemirror/lang-markdown';
import { GFM } from '@lezer/markdown';
import { StateField, type EditorState, type Extension, type Range } from '@codemirror/state';

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
	Link: 'cm-md-link',
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

// Inline/content styling — no layout change, so a viewport-scoped plugin.
function buildMarkDecorations(view: EditorView): DecorationSet {
	const ranges: Range<Decoration>[] = [];
	for (const { from, to } of view.visibleRanges) {
		syntaxTree(view.state).iterate({
			from,
			to,
			enter: (node) => {
				if (node.from >= node.to) return;
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

/** Markdown language (with GFM) plus the hybrid inline-styling decorations. */
export const markdownEditing: Extension = [
	markdown({ extensions: GFM }),
	markDecorationPlugin,
	hangingIndentField,
];

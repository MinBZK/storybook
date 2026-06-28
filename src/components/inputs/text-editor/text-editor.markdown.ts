import { ViewPlugin, Decoration, type DecorationSet, EditorView, type ViewUpdate } from '@codemirror/view';
import { syntaxTree } from '@codemirror/language';
import { markdown } from '@codemirror/lang-markdown';
import { GFM } from '@lezer/markdown';
import type { Extension, Range } from '@codemirror/state';

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

function buildDecorations(view: EditorView): DecorationSet {
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
	// Decoration.set sorts the (possibly overlapping) ranges for us.
	return Decoration.set(ranges, true);
}

const hybridMarkdownPlugin = ViewPlugin.fromClass(
	class {
		decorations: DecorationSet;

		constructor(view: EditorView) {
			this.decorations = buildDecorations(view);
		}

		update(update: ViewUpdate): void {
			if (update.docChanged || update.viewportChanged) {
				this.decorations = buildDecorations(update.view);
			}
		}
	},
	{ decorations: (plugin) => plugin.decorations },
);

/** Markdown language (with GFM) plus the hybrid inline-styling decorations. */
export const markdownEditing: Extension = [
	markdown({ extensions: GFM }),
	hybridMarkdownPlugin,
];

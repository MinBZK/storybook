import type { EditorView } from '@codemirror/view';
import { EditorSelection } from '@codemirror/state';
import { syntaxTree } from '@codemirror/language';
import type { SyntaxNode } from '@lezer/common';

/* Markdown editing operations for the headless command API. Each works on the
 * current selection (multi-range aware) and leaves focus on the editor, so a
 * consumer toolbar can drive formatting without owning any editor internals. */

export type HeadingLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface TextEditorActiveFormats {
	bold: boolean;
	italic: boolean;
	inlineCode: boolean;
	strikethrough: boolean;
	link: boolean;
	bulletList: boolean;
	orderedList: boolean;
	quote: boolean;
	heading: HeadingLevel;
}

export interface TextEditorState {
	active: TextEditorActiveFormats;
	/** Whether the selection is collapsed (a caret, no range). */
	empty: boolean;
}

export const EMPTY_FORMATS: TextEditorActiveFormats = {
	bold: false,
	italic: false,
	inlineCode: false,
	strikethrough: false,
	link: false,
	bulletList: false,
	orderedList: false,
	quote: false,
	heading: 0,
};

function enclosing(view: EditorView, pos: number, nodeName: string): SyntaxNode | null {
	for (let n: SyntaxNode | null = syntaxTree(view.state).resolveInner(pos, 1); n; n = n.parent) {
		if (n.name === nodeName) return n;
	}
	return null;
}

/** Wrap (or, if already wrapped, unwrap) each selection range with `marker`. */
export function toggleInlineWrap(view: EditorView, marker: string, nodeName: string): void {
	const len = marker.length;
	view.dispatch(view.state.changeByRange((range) => {
		const wrap = enclosing(view, range.from, nodeName);
		if (wrap) {
			return {
				changes: [
					{ from: wrap.from, to: wrap.from + len },
					{ from: wrap.to - len, to: wrap.to },
				],
				range: EditorSelection.range(
					Math.max(wrap.from, range.from - len),
					Math.max(wrap.from, range.to - len),
				),
			};
		}
		return {
			changes: [
				{ from: range.from, insert: marker },
				{ from: range.to, insert: marker },
			],
			range: EditorSelection.range(range.from + len, range.to + len),
		};
	}));
	view.focus();
}

function mapSelectedLines(view: EditorView, transform: (text: string) => string): void {
	const { state } = view;
	const { from, to } = state.selection.main;
	const first = state.doc.lineAt(from).number;
	const last = state.doc.lineAt(to).number;
	const changes: { from: number; to: number; insert: string }[] = [];
	for (let i = first; i <= last; i++) {
		const line = state.doc.line(i);
		const next = transform(line.text);
		if (next !== line.text) changes.push({ from: line.from, to: line.to, insert: next });
	}
	if (changes.length) view.dispatch({ changes });
	view.focus();
}

function everySelectedLine(view: EditorView, predicate: (text: string) => boolean): boolean {
	const { state } = view;
	const { from, to } = state.selection.main;
	const first = state.doc.lineAt(from).number;
	const last = state.doc.lineAt(to).number;
	for (let i = first; i <= last; i++) {
		if (!predicate(state.doc.line(i).text)) return false;
	}
	return true;
}

/** Set the selected lines to heading `level`, or toggle them back to body. */
export function toggleHeading(view: EditorView, level: HeadingLevel): void {
	mapSelectedLines(view, (text) => {
		const match = text.match(/^(#{1,6})\s+/);
		const current = match ? match[1].length : 0;
		const body = match ? text.slice(match[0].length) : text;
		if (level === 0 || current === level) return body;
		return `${'#'.repeat(level)} ${body}`;
	});
}

/** Set the selected lines to heading `level` (0 = paragraph), without toggling.
 *  Suited to a picker where choosing a level always applies it. */
export function setHeading(view: EditorView, level: HeadingLevel): void {
	mapSelectedLines(view, (text) => {
		const body = text.replace(/^#{1,6}\s+/, '');
		return level === 0 ? body : `${'#'.repeat(level)} ${body}`;
	});
}

export function toggleBulletList(view: EditorView): void {
	const re = /^(\s*)[-*]\s+/;
	const allBulleted = everySelectedLine(view, (t) => re.test(t) || t.trim() === '');
	mapSelectedLines(view, (t) => {
		if (t.trim() === '') return t;
		if (allBulleted) return t.replace(re, '$1');
		return re.test(t) ? t : t.replace(/^(\s*)/, '$1- ');
	});
}

const LIST_STRIP_RE = /^(\s*)(?:[-*+]|\d+[.)])\s+/;

/** Set the selected lines to a list of `type`, replacing any existing list
 *  marker; `'none'` strips it. Ordered items are numbered within the selection.
 *  Unlike the toggles, this cleanly switches between list types (for a picker). */
export function setList(view: EditorView, type: 'none' | 'bullet' | 'ordered'): void {
	const { state } = view;
	const { from, to } = state.selection.main;
	const first = state.doc.lineAt(from).number;
	const last = state.doc.lineAt(to).number;
	const changes: { from: number; to: number; insert: string }[] = [];
	let number = 0;
	for (let i = first; i <= last; i++) {
		const line = state.doc.line(i);
		const stripped = line.text.replace(LIST_STRIP_RE, '$1');
		let next = stripped;
		if (type !== 'none' && stripped.trim() !== '') {
			number += 1;
			const marker = type === 'bullet' ? '- ' : `${number}. `;
			next = stripped.replace(/^(\s*)/, `$1${marker}`);
		}
		if (next !== line.text) changes.push({ from: line.from, to: line.to, insert: next });
	}
	if (changes.length) view.dispatch({ changes });
	view.focus();
}

export function toggleQuote(view: EditorView): void {
	const re = /^(\s*)>\s?/;
	const allQuoted = everySelectedLine(view, (t) => re.test(t) || t.trim() === '');
	mapSelectedLines(view, (t) => {
		if (t.trim() === '') return t;
		if (allQuoted) return t.replace(re, '$1');
		return re.test(t) ? t : t.replace(/^(\s*)/, '$1> ');
	});
}

/** Wrap the selection as a markdown link. Caret lands where the user types next:
 *  inside `[]` if there's no text, inside `()` if there's no href, else after. */
export function toggleLink(view: EditorView, href = ''): void {
	view.dispatch(view.state.changeByRange((range) => {
		const text = view.state.sliceDoc(range.from, range.to);
		const insert = `[${text}](${href})`;
		let caret: number;
		if (!text) caret = range.from + 1;
		else if (!href) caret = range.from + 1 + text.length + 2;
		else caret = range.from + insert.length;
		return { changes: { from: range.from, to: range.to, insert }, range: EditorSelection.cursor(caret) };
	}));
	view.focus();
}

export function readActiveFormats(view: EditorView): TextEditorActiveFormats {
	const { state } = view;
	const pos = state.selection.main.head;
	const has = (name: string) => enclosing(view, pos, name) !== null;
	const headingMatch = state.doc.lineAt(pos).text.match(/^(#{1,6})\s/);
	return {
		bold: has('StrongEmphasis'),
		italic: has('Emphasis'),
		inlineCode: has('InlineCode'),
		strikethrough: has('Strikethrough'),
		link: has('Link'),
		bulletList: has('BulletList'),
		orderedList: has('OrderedList'),
		quote: has('Blockquote'),
		heading: (headingMatch ? headingMatch[1].length : 0) as HeadingLevel,
	};
}

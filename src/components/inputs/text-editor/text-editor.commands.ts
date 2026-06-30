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
	codeBlock: boolean;
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
	codeBlock: false,
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

/** Build a change that turns `line.text` into `next` by touching only the span
 *  that differs (shared prefix and suffix are left untouched). Replacing the whole
 *  line would collapse any annotation anchored inside it — its offsets map to the
 *  line boundary. Returns null when nothing changed. */
function minimalLineChange(
	line: { from: number; text: string },
	next: string,
): { from: number; to: number; insert: string } | null {
	const old = line.text;
	if (next === old) return null;
	let p = 0;
	while (p < old.length && p < next.length && old[p] === next[p]) p++;
	let s = 0;
	while (s < old.length - p && s < next.length - p && old[old.length - 1 - s] === next[next.length - 1 - s]) s++;
	return { from: line.from + p, to: line.from + old.length - s, insert: next.slice(p, next.length - s) };
}

function mapSelectedLines(view: EditorView, transform: (text: string) => string): void {
	const { state } = view;
	const { from, to } = state.selection.main;
	const first = state.doc.lineAt(from).number;
	const last = state.doc.lineAt(to).number;
	const changes: { from: number; to: number; insert: string }[] = [];
	for (let i = first; i <= last; i++) {
		const line = state.doc.line(i);
		const change = minimalLineChange(line, transform(line.text));
		if (change) changes.push(change);
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
		// Only rewrite the marker, not the whole line — keeps annotations alive.
		const change = minimalLineChange(line, next);
		if (change) changes.push(change);
	}
	// Removing a marker from a line that still sits against a list item would leave
	// it a lazy continuation (markdown keeps parsing it as part of the list, so the
	// toolbar stays "list"). Insert blank lines to break it out into a paragraph.
	if (type === 'none') {
		const isListLine = (n: number) =>
			n >= 1 && n <= state.doc.lines && /^\s*(?:[-*+]|\d+[.)])\s+/.test(state.doc.line(n).text);
		if (first > 1 && isListLine(first - 1) && state.doc.line(first).text.trim() !== '') {
			changes.push({ from: state.doc.line(first - 1).to, to: state.doc.line(first - 1).to, insert: '\n' });
		}
		if (last < state.doc.lines && isListLine(last + 1)) {
			changes.push({ from: state.doc.line(last).to, to: state.doc.line(last).to, insert: '\n' });
		}
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
// The non-mention Link node enclosing `pos`, or null. Mentions own their click,
// so they don't count as a "link" for the link button.
function realLinkAt(view: EditorView, pos: number): SyntaxNode | null {
	const link = enclosing(view, pos, 'Link');
	if (!link) return null;
	for (let child = link.firstChild; child; child = child.nextSibling) {
		if (child.name === 'URL' && view.state.sliceDoc(child.from, child.to).startsWith('user:')) return null;
	}
	return link;
}

export function toggleLink(view: EditorView, href = ''): void {
	// In a link already → unwrap it (drop the [ ]( ) markers, keep the text).
	const link = realLinkAt(view, view.state.selection.main.head);
	if (link) {
		const text = view.state.sliceDoc(link.from, link.to).replace(/^\[(.*)\]\([^)]*\)$/, '$1');
		view.dispatch({
			changes: { from: link.from, to: link.to, insert: text },
			selection: EditorSelection.range(link.from, link.from + text.length),
		});
		view.focus();
		return;
	}
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

/** Wrap the selected lines in a ``` fenced code block, or unwrap if already in one. */
export function toggleCodeBlock(view: EditorView): void {
	const { state } = view;
	const { from, to } = state.selection.main;
	const first = state.doc.lineAt(from);
	const last = state.doc.lineAt(to);
	const prev = first.number > 1 ? state.doc.line(first.number - 1) : null;
	const next = last.number < state.doc.lines ? state.doc.line(last.number + 1) : null;
	const fenced = !!prev?.text.trim().startsWith('```') && !!next?.text.trim().startsWith('```');
	if (fenced && prev && next) {
		view.dispatch({ changes: [{ from: prev.from, to: first.from }, { from: last.to, to: next.to }] });
	} else {
		view.dispatch({ changes: [{ from: first.from, insert: '```\n' }, { from: last.to, insert: '\n```' }] });
	}
	view.focus();
}

export function readActiveFormats(view: EditorView): TextEditorActiveFormats {
	const { state } = view;
	const pos = state.selection.main.head;
	const has = (name: string) => enclosing(view, pos, name) !== null;
	const lineText = state.doc.lineAt(pos).text;
	const lineStart = state.doc.lineAt(pos).from;
	const headingMatch = lineText.match(/^(#{1,6})\s/);
	return {
		bold: has('StrongEmphasis'),
		italic: has('Emphasis'),
		inlineCode: has('InlineCode'),
		// In a code block on any of its lines (fences or content), read at line.from
		// so it's stable and covers every line — like the quote detection.
		codeBlock: enclosing(view, lineStart, 'FencedCode') !== null || enclosing(view, lineStart, 'CodeBlock') !== null,
		strikethrough: has('Strikethrough'),
		link: realLinkAt(view, pos) !== null,
		// Lists from the line's own marker. (Resolving the tree at a line-end caret
		// can spill into the next line and flip-flop the toolbar state.)
		bulletList: /^\s*[-*+]\s/.test(lineText),
		orderedList: /^\s*\d+[.)]\s/.test(lineText),
		// Quote from the Blockquote node at the line's *start* — that catches lazy
		// continuation lines (part of the quote but with no '>') too, while resolving
		// at line.from (not the caret) keeps it stable at the line end.
		quote: enclosing(view, lineStart, 'Blockquote') !== null,
		heading: (headingMatch ? headingMatch[1].length : 0) as HeadingLevel,
	};
}

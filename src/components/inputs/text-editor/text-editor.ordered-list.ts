import { EditorState } from '@codemirror/state';

/* Keeps an ordered list's numbers running in sequence. Markdown renders `1. 3. 5.`
 * as 1, 2, 3 regardless, but the *source* reads better when the digits actually
 * follow each other — so as soon as a line is recognised as an ordered item, the
 * whole list is renumbered. Every ordered list starts at 1 and each item increments.
 * Nested lists (deeper indent) number independently; returning to the parent indent
 * resumes its count. A run stays one list across a single blank line (a loose list),
 * but two or more blank lines end it — the next item starts a fresh list at 1, matching
 * CommonMark. Fenced code blocks are skipped (a `1.` there is literal). */

// A leading ordered-list marker: optional indent, digits, `.` or `)`, then a space
// or the line end (an empty item). The lookahead keeps the marker out of the match
// so only the digits are captured for a minimal, caret-friendly replacement.
const ORDERED_RE = /^(\s*)(\d+)[.)](?=\s|$)/;
const FENCE_RE = /^\s*(?:```|~~~)/;

export interface RenumberChange {
	from: number;
	to: number;
	insert: string;
}

/** Minimal digit-only changes that renumber every ordered list in `doc` so its
 *  items run in sequence. Empty when everything is already in order. */
export function renumberOrderedLists(doc: string): RenumberChange[] {
	const changes: RenumberChange[] = [];
	// A stack of the open list levels, deepest last: the indent that opened each and
	// the number its next item should take.
	const levels: { indent: number; next: number }[] = [];
	let offset = 0;
	let inFence = false;
	let blanks = 0; // consecutive blank lines seen (two in a row end a list)

	for (const line of doc.split('\n')) {
		const lineStart = offset;
		offset += line.length + 1; // + newline

		if (FENCE_RE.test(line)) {
			inFence = !inFence;
			levels.length = 0; // a code fence breaks any open list
			blanks = 0;
			continue;
		}
		if (inFence) continue;

		const match = ORDERED_RE.exec(line);
		if (!match) {
			if (line.trim() === '') {
				// One blank line keeps a loose list together; a second ends it.
				if (++blanks >= 2) levels.length = 0;
				continue;
			}
			blanks = 0;
			// Any other line ends the lists at its indent and shallower.
			const indent = /^\s*/.exec(line)![0].length;
			while (levels.length && levels[levels.length - 1].indent >= indent) levels.pop();
			continue;
		}

		blanks = 0;
		const indent = match[1].length;
		const typed = match[2];
		while (levels.length && levels[levels.length - 1].indent > indent) levels.pop();

		const top = levels[levels.length - 1];
		let target: number;
		if (top && top.indent === indent) {
			target = top.next;
			top.next += 1;
		} else {
			// First item of a new (sub)list: every ordered list starts at 1.
			target = 1;
			levels.push({ indent, next: 2 });
		}

		const targetStr = String(target);
		if (targetStr !== typed) {
			const numStart = lineStart + indent;
			changes.push({ from: numStart, to: numStart + typed.length, insert: targetStr });
		}
	}

	return changes;
}

/** Renumbers ordered lists in the same transaction as the edit that disturbed them,
 *  so it's one atomic (single-undo) step and the caret/selection maps through it. */
export const orderedListRenumber = EditorState.transactionFilter.of((tr) => {
	if (!tr.docChanged) return tr;
	const changes = renumberOrderedLists(tr.newDoc.toString());
	if (changes.length === 0) return tr;
	return [tr, { changes, sequential: true }];
});

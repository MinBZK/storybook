/* Annotation sentinels — the "fake character" machinery.
 *
 * To let the caret rest on BOTH sides of an annotation edge (outside it and just
 * inside it), each annotation group carries a zero-width sentinel character in the
 * document at its start and end: one real document offset on either side of the
 * boundary, so the caret has two stops. The end sentinel is rendered as the count
 * badge; the start sentinel is invisible.
 *
 * U+2060 (WORD JOINER) is the sentinel: zero-width, and CommonMark treats it as an
 * ordinary character, so it does not break inline emphasis/code/links. (It DOES
 * break a few constructs — GFM strikethrough, and line-start block markers when it
 * sits right before them — so placement is guarded; see `canPlaceSentinel`.)
 *
 * The sentinel lives only in the CodeMirror document; it must never reach the
 * exposed `value`, the clipboard, or the form. Everything here is pure and
 * DOM-free so it can be unit-tested in isolation. */

export const ANNOTATION_SENTINEL = '⁠';

/** Remove every sentinel from a string (doc text -> clean value). */
export function stripSentinels(text: string): string {
	return text.split(ANNOTATION_SENTINEL).join('');
}

/** Whether `text` contains a sentinel. */
export function hasSentinel(text: string): boolean {
	return text.includes(ANNOTATION_SENTINEL);
}

/** Doc-offset positions of every sentinel in `doc`. */
export function sentinelPositions(doc: string): number[] {
	const out: number[] = [];
	for (let i = 0; i < doc.length; i++) if (doc[i] === ANNOTATION_SENTINEL) out.push(i);
	return out;
}

/** An annotation group's boundary in CLEAN (sentinel-free) offsets. */
export interface CleanGroup {
	from: number;
	to: number;
}

/** Number of sentinels at doc positions strictly before `docPos`. */
export function sentinelsBefore(doc: string, docPos: number): number {
	let n = 0;
	for (let i = 0; i < docPos && i < doc.length; i++) if (doc[i] === ANNOTATION_SENTINEL) n++;
	return n;
}

/** Doc offset -> clean offset (subtract the sentinels before it). */
export function docToClean(doc: string, docPos: number): number {
	return docPos - sentinelsBefore(doc, docPos);
}

/** Clean offset -> doc offset, given the doc's sorted sentinel positions. Sentinels
 *  at or before the growing doc position push it further right. */
export function cleanToDoc(sortedSentinelPositions: number[], cleanPos: number): number {
	let docPos = cleanPos;
	for (const s of sortedSentinelPositions) if (s <= docPos) docPos++;
	return docPos;
}

/** A single desired sentinel: its clean offset and which edge it marks. */
export interface DesiredSentinel {
	pos: number;
	kind: 'start' | 'end';
}

/** Predicate: may a sentinel be placed at this clean offset? Guards the parser
 *  breakages (line-start block markers, inside GFM strikethrough). Defaults to the
 *  real guard; injectable for tests. */
export type CanPlace = (cleanText: string, pos: number, kind: 'start' | 'end') => boolean;

/** The sentinels a set of groups wants, in clean offsets (start before the first
 *  char, end after the last), filtered by the guard. Positions may repeat when two
 *  groups touch (end of one, start of the next). */
export function desiredSentinels(groups: CleanGroup[], cleanText: string, canPlace: CanPlace = canPlaceSentinel): DesiredSentinel[] {
	const out: DesiredSentinel[] = [];
	for (const g of groups) {
		if (g.to <= g.from) continue;
		if (canPlace(cleanText, g.from, 'start')) out.push({ pos: g.from, kind: 'start' });
		if (canPlace(cleanText, g.to, 'end')) out.push({ pos: g.to, kind: 'end' });
	}
	return out;
}

/** Build the desired doc text: `cleanText` with a sentinel inserted at each desired
 *  position (multiplicity honoured for touching groups). */
export function buildDesiredDoc(cleanText: string, desired: DesiredSentinel[]): string {
	const counts = new Map<number, number>();
	for (const d of desired) counts.set(d.pos, (counts.get(d.pos) ?? 0) + 1);
	let out = '';
	for (let i = 0; i <= cleanText.length; i++) {
		const n = counts.get(i) ?? 0;
		if (n) out += ANNOTATION_SENTINEL.repeat(n);
		if (i < cleanText.length) out += cleanText[i];
	}
	return out;
}

/** A CodeMirror change spec (subset). */
export interface SentinelChange {
	from: number;
	to: number;
	insert?: string;
}

/** Minimal changes (in current-doc coords) to turn `doc` into a document that holds
 *  exactly the sentinels the groups want — touching only sentinel characters, never
 *  the real text. `doc` and the target share the same clean text, so a two-pointer
 *  walk yields sentinel-only inserts/deletes. */
export function reconcileSentinels(doc: string, groups: CleanGroup[], canPlace: CanPlace = canPlaceSentinel): SentinelChange[] {
	const cleanText = stripSentinels(doc);
	const desired = buildDesiredDoc(cleanText, desiredSentinels(groups, cleanText, canPlace));
	const changes: SentinelChange[] = [];
	let i = 0; // over doc
	let j = 0; // over desired
	while (i < doc.length || j < desired.length) {
		const dc = i < doc.length ? doc[i] : '';
		const ec = j < desired.length ? desired[j] : '';
		if (dc === ec) {
			i++;
			j++;
		} else if (dc === ANNOTATION_SENTINEL) {
			changes.push({ from: i, to: i + 1 }); // stray sentinel -> delete
			i++;
		} else if (ec === ANNOTATION_SENTINEL) {
			changes.push({ from: i, to: i, insert: ANNOTATION_SENTINEL }); // missing -> insert
			j++;
		} else {
			// Non-sentinel mismatch should be impossible (clean text is identical).
			i++;
			j++;
		}
	}
	return changes;
}

const LINE_START_MARKER = /^(\s*)(#{1,6}\s|[-*+]\s|\d+[.)]\s|>|`{3,}|~{3,})/;

/** Default placement guard. Blocks the sentinel where U+2060 would break the
 *  markdown parse: right before a line-start block marker, and inside a GFM
 *  strikethrough run (`~~...~~`). Blocked edges fall back to a single caret stop. */
export function canPlaceSentinel(cleanText: string, pos: number, _kind: 'start' | 'end'): boolean {
	// Line start (or the whole leading marker) directly ahead -> a sentinel here
	// pushes the marker off column 0 (or between marker and text) and kills the block.
	const lineStart = cleanText.lastIndexOf('\n', pos - 1) + 1;
	const rest = cleanText.slice(lineStart);
	const marker = rest.match(LINE_START_MARKER);
	if (marker) {
		const markerEnd = lineStart + marker[0].length;
		// Block only positions *within* the marker (before it, or between the marker
		// char and its required space) — those push the marker off column 0 or split
		// it and kill the block. A sentinel exactly at markerEnd sits at the start of
		// the content, after the marker and its space, so the block stays intact and
		// an annotation opening the line (e.g. right after "- ") keeps both caret stops.
		if (pos < markerEnd) return false;
	}
	// Inside a strikethrough run on this line: count unescaped `~~` before pos.
	const lineText = cleanText.slice(lineStart, cleanText.indexOf('\n', pos) === -1 ? undefined : cleanText.indexOf('\n', pos));
	const rel = pos - lineStart;
	const before = lineText.slice(0, rel);
	const strikes = (before.match(/~~/g) ?? []).length;
	if (strikes % 2 === 1) return false; // odd number of ~~ before -> inside a run
	return true;
}

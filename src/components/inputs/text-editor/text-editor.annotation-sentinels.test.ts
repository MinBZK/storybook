import { describe, it, expect } from 'vitest';
import {
	ANNOTATION_SENTINEL as S,
	stripSentinels,
	sentinelPositions,
	reconcileSentinels,
	desiredSentinels,
	buildDesiredDoc,
	canPlaceSentinel,
} from './text-editor.annotation-sentinels.ts';

// Apply a list of {from,to,insert} changes to a string (mimics CM's atomic apply:
// all offsets are in the ORIGINAL string; apply right-to-left to keep them valid).
function applyChanges(doc: string, changes: { from: number; to: number; insert?: string }[]): string {
	const sorted = [...changes].sort((a, b) => b.from - a.from);
	let out = doc;
	for (const c of sorted) out = out.slice(0, c.from) + (c.insert ?? '') + out.slice(c.to);
	return out;
}

const allow = () => true;

describe('annotation sentinels — pure core', () => {
	it('strips sentinels', () => {
		expect(stripSentinels(`a${S}b${S}${S}c`)).toBe('abc');
		expect(stripSentinels('abc')).toBe('abc');
	});

	it('places start+end sentinels around a group', () => {
		const doc = 'abcdef';
		const changes = reconcileSentinels(doc, [{ from: 2, to: 4 }], allow);
		const next = applyChanges(doc, changes);
		expect(next).toBe(`ab${S}cd${S}ef`);
		expect(stripSentinels(next)).toBe('abcdef');
		expect(sentinelPositions(next)).toEqual([2, 5]);
	});

	it('is idempotent (no changes when already correct)', () => {
		const doc = `ab${S}cd${S}ef`;
		expect(reconcileSentinels(doc, [{ from: 2, to: 4 }], allow)).toEqual([]);
	});

	it('removes stray sentinels when the annotation is gone', () => {
		const doc = `ab${S}cd${S}ef`;
		const changes = reconcileSentinels(doc, [], allow);
		expect(applyChanges(doc, changes)).toBe('abcdef');
	});

	it('moves sentinels when the group shrinks', () => {
		const doc = `ab${S}cd${S}ef`; // group [2,4]
		const changes = reconcileSentinels(doc, [{ from: 2, to: 3 }], allow); // now [2,3]
		const next = applyChanges(doc, changes);
		expect(next).toBe(`ab${S}c${S}def`);
		expect(stripSentinels(next)).toBe('abcdef');
	});

	it('handles two touching groups (two sentinels at the seam)', () => {
		const doc = 'abcdef';
		const changes = reconcileSentinels(doc, [{ from: 1, to: 3 }, { from: 3, to: 5 }], allow);
		const next = applyChanges(doc, changes);
		// end of group1 and start of group2 both at clean offset 3
		expect(next).toBe(`a${S}bc${S}${S}de${S}f`);
		expect(stripSentinels(next)).toBe('abcdef');
	});

	it('maps doc<->clean offsets around sentinels', async () => {
		const { docToClean, cleanToDoc, sentinelPositions } = await import('./text-editor.annotation-sentinels.ts');
		const doc = `ab${S}cd${S}ef`; // sentinels at doc 2 and 5; clean = "abcdef"
		const sents = sentinelPositions(doc);
		expect(sents).toEqual([2, 5]);
		// doc->clean
		expect(docToClean(doc, 0)).toBe(0);
		expect(docToClean(doc, 3)).toBe(2); // 'c' at doc 3 = clean 2
		expect(docToClean(doc, 6)).toBe(4); // 'e' at doc 6 = clean 4
		// clean->doc round-trips
		expect(cleanToDoc(sents, 2)).toBe(3);
		expect(cleanToDoc(sents, 4)).toBe(6);
		expect(cleanToDoc(sents, 0)).toBe(0);
	});

	it('buildDesiredDoc honours multiplicity', () => {
		expect(buildDesiredDoc('abc', [{ pos: 1, kind: 'end' }, { pos: 1, kind: 'start' }])).toBe(`a${S}${S}bc`);
	});

	describe('placement guard', () => {
		it('blocks a sentinel before a line-start heading/list/quote marker', () => {
			expect(canPlaceSentinel('# Kop', 0, 'start')).toBe(false);
			expect(canPlaceSentinel('- item', 0, 'start')).toBe(false);
			expect(canPlaceSentinel('> quote', 0, 'start')).toBe(false);
			// after the marker (inside the text) is fine
			expect(canPlaceSentinel('# Kop', 4, 'end')).toBe(true);
			// exactly at the marker end — the first content char — is allowed, so an
			// annotation opening a bullet ("- item") still gets its start sentinel.
			expect(canPlaceSentinel('- item', 2, 'start')).toBe(true);
			expect(canPlaceSentinel('# Kop', 2, 'start')).toBe(true);
			// but between the marker char and its space is still blocked
			expect(canPlaceSentinel('- item', 1, 'start')).toBe(false);
		});

		it('blocks a sentinel inside a strikethrough run', () => {
			// "a ~~struck~~ b" — offset 5 is inside the ~~...~~
			const t = 'a ~~struck~~ b';
			expect(canPlaceSentinel(t, 5, 'end')).toBe(false);
			// offset 1 (before the run) and 13 (after) are fine
			expect(canPlaceSentinel(t, 1, 'end')).toBe(true);
			expect(canPlaceSentinel(t, 13, 'end')).toBe(true);
		});

		it('allows ordinary inline positions', () => {
			expect(canPlaceSentinel('een **vette** zin', 8, 'end')).toBe(true);
			expect(canPlaceSentinel('gewone tekst', 6, 'start')).toBe(true);
		});

		it('reconcile skips guarded edges', () => {
			// group covers "Kop" in "# Kop": clean [2,5]. start at 2 is after the marker
			// (ok), end at 5 ok. But a group starting at 0 would be blocked at start.
			const doc = '# Kop';
			const changes = reconcileSentinels(doc, [{ from: 0, to: 5 }]);
			const next = applyChanges(doc, changes);
			// start (0) blocked -> only the end sentinel lands
			expect(next).toBe(`# Kop${S}`);
		});
	});
});

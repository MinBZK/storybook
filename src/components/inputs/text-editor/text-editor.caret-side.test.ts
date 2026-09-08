import { describe, it, expect, afterEach } from 'vitest';
import type { EditorView } from '@codemirror/view';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './text-editor.js';
import { drawnAssoc } from './text-editor.cursor.js';
import { ANNOTATION_SENTINEL as S } from './text-editor.annotation-sentinels.js';

/* Which side the caret is drawn on at a position that has two: a plain-text
 * position (the sides are the same place), the end of a link (the badge sits
 * between them), and the end of an annotation (the tint's padding did). */

type El = HTMLElement & { value: string; annotatable: boolean; annotations: unknown[]; updateComplete: Promise<unknown>; view: EditorView };

async function make(value: string, anns: unknown[] = []): Promise<El> {
	const attrs = anns.length ? ' annotatable' : '';
	const el = await fixture<El>(`<nldd-text-editor accessible-label="t"${attrs}></nldd-text-editor>`);
	el.value = value;
	if (anns.length) el.annotations = anns;
	await el.updateComplete;
	await waitForUpdate(el);
	return el;
}

function backspace(view: EditorView): void {
	view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', code: 'Backspace', bubbles: true, cancelable: true }));
}

/** The side the layer will draw the main caret on, from the live selection. */
function drawn(view: EditorView): -1 | 1 {
	const { head, assoc } = view.state.selection.main;
	return drawnAssoc(view, head, assoc);
}

describe('nldd-text-editor caret side', () => {
	let el: El;
	afterEach(() => cleanup(el));

	it('draws the caret on one side of a plain-text position, whichever way it arrived', async () => {
		el = await make('Een blockquote met toelichting.');
		const pos = el.value.indexOf('toelichting') + 3;
		// The two measured edges are the same place; the rule collapses them.
		expect(drawnAssoc(el.view, pos, -1)).toBe(1);
		expect(drawnAssoc(el.view, pos, 1)).toBe(1);
		expect(drawnAssoc(el.view, pos, 0)).toBe(1);
	});

	it('takes over from drawSelection: its cursor layer is hidden, ours is there', async () => {
		el = await make('tekst');
		const sr = el.shadowRoot!;
		expect(sr.querySelector('.cm-nldd-cursorLayer')).not.toBeNull();
		const own = sr.querySelector('.cm-cursorLayer') as HTMLElement | null;
		expect(own).not.toBeNull();
		expect(getComputedStyle(own!).display).toBe('none');
	});

	// #214: the caret at the end of a URL has a place on either side of the badge.
	it('keeps the arrival direction at a link end, where the badge is in between', async () => {
		el = await make('Zie https://example.com nu');
		const to = el.value.indexOf('.com') + 4;
		const badge = el.shadowRoot!.querySelector('.cm-link-badge')!.getBoundingClientRect();
		const left = el.view.coordsAtPos(to, -1)!.left;
		const right = el.view.coordsAtPos(to, 1)!.left;
		expect(left).toBeLessThanOrEqual(badge.left);
		expect(right).toBeGreaterThanOrEqual(badge.right);
		expect(drawnAssoc(el.view, to, -1)).toBe(-1);
		expect(drawnAssoc(el.view, to, 1)).toBe(1);
	});

	it('after deleting the last character of a URL the caret is drawn on the URL side', async () => {
		el = await make('Zie https://example.com nu');
		const to = el.value.indexOf('.com') + 4;
		el.view.dispatch({ selection: { anchor: to } });
		backspace(el.view);
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.co nu');
		expect(el.view.state.selection.main.head).toBe(to - 1);
		// The delete leaves no arrival direction; the layer still puts the caret
		// against the URL, since that is what was just edited.
		expect(drawn(el.view)).toBe(-1);
	});

	it('a following move to the right lands after the badge again', async () => {
		el = await make('Zie https://example.com nu');
		const to = el.value.indexOf('.com') + 4;
		el.view.dispatch({ selection: { anchor: to } });
		backspace(el.view);
		await waitForUpdate(el);
		// Arrow right past the badge, then left back onto the link end: arrived from
		// the right, so it sits after the badge.
		el.view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', bubbles: true, cancelable: true }));
		el.view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', code: 'ArrowLeft', bubbles: true, cancelable: true }));
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to - 1);
		expect(drawn(el.view)).toBe(1);
	});

	it('measures the same place on both sides of an annotation end', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc = el.view.state.doc.toString();
		const outside = doc.lastIndexOf(S) + 1;
		const fromBadge = el.view.coordsAtPos(outside, -1)!.left;
		const fromText = el.view.coordsAtPos(outside, 1)!.left;
		// The badge's outside edge is the tint's right edge, where " ghi" begins; the
		// tint's inline padding used to sit between the two and move the caret.
		expect(Math.abs(fromBadge - fromText)).toBeLessThanOrEqual(1);
	});
});

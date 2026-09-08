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

function key(view: EditorView, name: string): void {
	view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: name, code: name, bubbles: true, cancelable: true }));
}

/** Type `text` at the caret, the way a keystroke does. */
function type(view: EditorView, text: string): void {
	const { head } = view.state.selection.main;
	view.dispatch({ changes: { from: head, insert: text }, selection: { anchor: head + text.length }, userEvent: 'input.type' });
}

/** The side the layer will draw the main caret on, from the live selection. */
function drawn(view: EditorView): -1 | 1 {
	const { head, assoc } = view.state.selection.main;
	return drawnAssoc(view, head, assoc);
}

const URL_DOC = 'Zie https://example.com nu';
const URL_END = URL_DOC.indexOf('.com') + 4;

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
		el = await make(URL_DOC);
		const badge = el.shadowRoot!.querySelector('.cm-link-badge')!.getBoundingClientRect();
		const left = el.view.coordsAtPos(URL_END, -1)!.left;
		const right = el.view.coordsAtPos(URL_END, 1)!.left;
		expect(left).toBeLessThanOrEqual(badge.left);
		expect(right).toBeGreaterThanOrEqual(badge.right);
		expect(drawnAssoc(el.view, URL_END, -1)).toBe(-1);
		expect(drawnAssoc(el.view, URL_END, 1)).toBe(1);
	});

	// The badge feels like a character of its own: the arrows step from one side
	// of it to the other without moving in the document.
	it('ArrowLeft right of the badge puts the caret left of it, at the same position', async () => {
		el = await make(URL_DOC);
		el.view.dispatch({ selection: { anchor: URL_END } });
		expect(drawn(el.view)).toBe(1);
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END);
		expect(drawn(el.view)).toBe(-1);
		// The next ArrowLeft moves in the text again.
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END - 1);
	});

	it('ArrowRight left of the badge puts the caret right of it, then moves on', async () => {
		el = await make(URL_DOC);
		el.view.dispatch({ selection: { anchor: URL_END - 1 } });
		key(el.view, 'ArrowRight');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END);
		expect(drawn(el.view)).toBe(-1);
		key(el.view, 'ArrowRight');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END);
		expect(drawn(el.view)).toBe(1);
		key(el.view, 'ArrowRight');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END + 1);
	});

	it('typing left of the badge keeps the caret left of it as the URL grows', async () => {
		el = await make(URL_DOC);
		el.view.dispatch({ selection: { anchor: URL_END } });
		key(el.view, 'ArrowLeft');
		type(el.view, 'x');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.comx nu');
		expect(el.view.state.selection.main.head).toBe(URL_END + 1);
		expect(drawn(el.view)).toBe(-1);
	});

	it('Backspace right of the badge steps over it instead of eating the URL', async () => {
		el = await make(URL_DOC);
		el.view.dispatch({ selection: { anchor: URL_END } });
		key(el.view, 'Backspace');
		await waitForUpdate(el);
		expect(el.value).toBe(URL_DOC);
		expect(el.view.state.selection.main.head).toBe(URL_END);
		expect(drawn(el.view)).toBe(-1);
		// Now against the URL, the next Backspace deletes its last character and
		// the caret stays against it.
		key(el.view, 'Backspace');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.co nu');
		expect(el.view.state.selection.main.head).toBe(URL_END - 1);
		expect(drawn(el.view)).toBe(-1);
	});

	it('Delete left of the badge steps over it, and right of it deletes the next character', async () => {
		el = await make(URL_DOC);
		el.view.dispatch({ selection: { anchor: URL_END } });
		key(el.view, 'ArrowLeft');
		key(el.view, 'Delete');
		await waitForUpdate(el);
		expect(el.value).toBe(URL_DOC);
		expect(drawn(el.view)).toBe(1);
		key(el.view, 'Delete');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.comnu');
	});

	it('a [text](url) link has no inside: its badge sits after the ) and the caret goes past it', async () => {
		el = await make('Zie [voorbeeld](https://example.com) nu');
		const to = el.value.indexOf(')') + 1;
		const badge = el.shadowRoot!.querySelector('.cm-link-badge')!.getBoundingClientRect();
		expect(el.view.coordsAtPos(to, -1)!.left).toBeGreaterThanOrEqual(badge.right);
		expect(drawnAssoc(el.view, to, -1)).toBe(1);
		el.view.dispatch({ selection: { anchor: to } });
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to - 1);
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

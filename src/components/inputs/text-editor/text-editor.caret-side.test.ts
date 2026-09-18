import { describe, it, expect, afterEach } from 'vitest';
import { EditorView } from '@codemirror/view';
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

/** A keystroke: the input handlers get first say, and the plain insert runs when
 *  none of them claims the character. */
function keystroke(view: EditorView, text: string): void {
	const { head } = view.state.selection.main;
	const handled = view.state.facet(EditorView.inputHandler)
		.some((handle) => handle(view, head, head, text, () => view.state.update()));
	if (!handled) type(view, text);
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

	it('a click lands on the side of the badge it was on', async () => {
		el = await make(URL_DOC);
		const badge = el.shadowRoot!.querySelector('.cm-link-badge')!.getBoundingClientRect();
		const y = badge.top + badge.height / 2;
		// detail: 1 makes it a single click; CodeMirror reads the click count from it.
		const click = (x: number): void => {
			el.view.contentDOM.dispatchEvent(new MouseEvent('mousedown', { clientX: x, clientY: y, bubbles: true, cancelable: true, button: 0, detail: 1 }));
			document.dispatchEvent(new MouseEvent('mouseup', { clientX: x, clientY: y, bubbles: true, button: 0, detail: 1 }));
		};
		// CodeMirror reads the side of a click from the line, not from the pointer,
		// and put a click right of the badge on its left.
		click(badge.right + 2);
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END);
		expect(drawn(el.view)).toBe(1);
		click(badge.left - 1);
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(URL_END);
		expect(drawn(el.view)).toBe(-1);
	});

	it('text typed right of the badge lands right of it, behind the space the URL needs', async () => {
		el = await make(URL_DOC);
		el.view.dispatch({ selection: { anchor: URL_END } });
		expect(drawn(el.view)).toBe(1);
		// What a keystroke hands the input handlers; the default insert is not used.
		const typed = (text: string): boolean =>
			el.view.state.facet(EditorView.inputHandler).some((handle) => handle(el.view, URL_END, URL_END, text, () => el.view.state.update()));
		expect(typed('x')).toBe(true);
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.com x nu');
		expect(el.view.state.selection.main.head).toBe(URL_END + 2);
		// Punctuation that ends a URL by itself needs no space: the usual insert runs.
		el.view.dispatch({ changes: { from: URL_END, to: URL_END + 2 }, selection: { anchor: URL_END } });
		expect(typed('.')).toBe(false);
		// Nor does text typed on the URL's side: that extends the URL.
		key(el.view, 'ArrowLeft');
		expect(drawn(el.view)).toBe(-1);
		expect(typed('x')).toBe(false);
	});

	it('the badge of a [text](url) link has the same two stops, between the ) and the badge and after it', async () => {
		el = await make('Zie [voorbeeld](https://example.com) nu');
		const to = el.value.indexOf(')') + 1;
		const badge = el.shadowRoot!.querySelector('.cm-link-badge')!.getBoundingClientRect();
		expect(el.view.coordsAtPos(to, -1)!.left).toBeLessThanOrEqual(badge.left);
		expect(el.view.coordsAtPos(to, 1)!.left).toBeGreaterThanOrEqual(badge.right);
		el.view.dispatch({ selection: { anchor: to } });
		expect(drawn(el.view)).toBe(1);
		// One ArrowLeft: left of the badge, still after the ). The next: before the ).
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to);
		expect(drawn(el.view)).toBe(-1);
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to - 1);
		// Text typed left of the badge lands after the link, and so after the badge.
		el.view.dispatch({ selection: { anchor: to } });
		key(el.view, 'ArrowLeft');
		type(el.view, 'x');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie [voorbeeld](https://example.com)x nu');
		expect(el.view.state.selection.main.head).toBe(to + 1);
	});

	it('steps over the badge on a wrapped line with a period after it, as in the sample text', async () => {
		el = await fixture<El>('<nldd-text-editor accessible-label="t" style="width: 360px"></nldd-text-editor>');
		el.value = 'Een **vetgedrukte** en *cursieve* zin met `inline code` en een [link](https://www.rijksoverheid.nl).';
		await el.updateComplete;
		await waitForUpdate(el);
		const to = el.value.indexOf(')') + 1;
		// The line wraps before the link, so the badge sits on the second visual line.
		expect(el.view.coordsAtPos(to, 1)!.top).toBeGreaterThan(el.view.coordsAtPos(0, 1)!.top + 10);
		el.view.dispatch({ selection: { anchor: to + 1 } });
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to);
		expect(drawn(el.view)).toBe(1);
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to);
		expect(drawn(el.view)).toBe(-1);
		key(el.view, 'ArrowLeft');
		await waitForUpdate(el);
		expect(el.view.state.selection.main.head).toBe(to - 1);
	});

	it('deleting the character after a link leaves the caret right of the badge', async () => {
		el = await make('Zie [voorbeeld](https://example.com) nu.');
		const to = el.value.indexOf(')') + 1;
		// The caret sits at the very end, after the period; Backspace takes the period
		// and the caret comes back to the badge from the right, so it stays there.
		el.view.dispatch({ selection: { anchor: el.value.length } });
		for (let i = el.value.length; i > to; i--) key(el.view, 'Backspace');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie [voorbeeld](https://example.com)');
		expect(el.view.state.selection.main.head).toBe(to);
		expect(drawn(el.view)).toBe(1);
		// The next Backspace steps over the badge before touching the link.
		key(el.view, 'Backspace');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie [voorbeeld](https://example.com)');
		expect(drawn(el.view)).toBe(-1);
	});

	it('the same at the end of a bare URL', async () => {
		el = await make('Zie https://example.com.');
		const to = el.value.indexOf('.com') + 4;
		el.view.dispatch({ selection: { anchor: to + 1 } });
		key(el.view, 'Backspace');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.com');
		expect(drawn(el.view)).toBe(1);
		// Deleting a character of the URL itself keeps the caret against the URL.
		key(el.view, 'Backspace');
		key(el.view, 'Backspace');
		await waitForUpdate(el);
		expect(el.value).toBe('Zie https://example.co');
		expect(drawn(el.view)).toBe(-1);
	});

	// #244: a URL parses as a whole link well before it is finished, and the caret
	// went outside it there, so the rest of the address landed behind a space.
	it('typing a bare URL keeps every letter in it, and a space is what ends it', async () => {
		el = await make('');
		for (const ch of 'www.apple.com') {
			keystroke(el.view, ch);
			await waitForUpdate(el);
		}
		expect(el.value).toBe('www.apple.com');
		expect(drawn(el.view)).toBe(-1);

		// A space is the boundary, and the editor does not write one of its own.
		keystroke(el.view, ' ');
		keystroke(el.view, 'x');
		await waitForUpdate(el);
		expect(el.value).toBe('www.apple.com x');
	});

	it('typing a [tekst](url) link leaves it whole, and what follows needs no space', async () => {
		el = await make('');
		for (const ch of '[Apple](https://apple.com)') {
			keystroke(el.view, ch);
			await waitForUpdate(el);
		}
		expect(el.value).toBe('[Apple](https://apple.com)');

		// The `)` ended the link, so the next character is outside it already and
		// the editor has no boundary to write.
		keystroke(el.view, 'x');
		await waitForUpdate(el);
		expect(el.value).toBe('[Apple](https://apple.com)x');
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

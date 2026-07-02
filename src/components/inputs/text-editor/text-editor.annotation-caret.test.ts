import { describe, it, expect, afterEach } from 'vitest';
import { EditorView } from '@codemirror/view';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './text-editor.ts';
import { ANNOTATION_SENTINEL as S } from './text-editor.annotation-sentinels.ts';

/* Caret behaviour around an annotation edge. Each edge has two stops — just inside
 * (grows on typing) and just outside (does not) — thanks to a sentinel character.
 * See text-editor.annotation-sentinels.ts. */

type El = HTMLElement & { value: string; annotatable: boolean; annotations: unknown[]; updateComplete: Promise<boolean>; view: any };

async function make(value: string, anns: unknown[]): Promise<El> {
	const el = await fixture<El>('<nldd-text-editor accessible-label="t" annotatable></nldd-text-editor>');
	el.value = value;
	el.annotations = anns;
	await el.updateComplete;
	await waitForUpdate(el);
	return el;
}

/** The annotated text (the tint span, minus the trailing count badge and sentinels). */
function annotatedText(el: El): string {
	const tint = el.shadowRoot!.querySelector('.cm-annotation');
	if (!tint) return '';
	const badge = tint.querySelector('.cm-annotation-badge')?.textContent ?? '';
	const full = (tint.textContent ?? '').replace(new RegExp(S, 'g'), '');
	return badge ? full.slice(0, full.length - badge.length) : full;
}

describe('nldd-text-editor annotation caret', () => {
	let el: El;
	afterEach(() => cleanup(el));

	it('keeps sentinels in the document but out of the value', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		expect(el.value).toBe('abc def ghi');
		expect(el.view.state.doc.toString()).toBe(`abc ${S}def${S} ghi`);
	});

	it('typing just outside the END does not grow the annotation', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc: string = el.view.state.doc.toString();
		el.view.dispatch({ selection: { anchor: doc.indexOf('f') + 2 } }); // after the sentinel
		el.view.dispatch(el.view.state.replaceSelection('X'));
		await el.updateComplete;
		expect(el.value).toBe('abc defX ghi');
		expect(annotatedText(el)).toBe('def');
	});

	it('typing just inside the END grows the annotation', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc: string = el.view.state.doc.toString();
		el.view.dispatch({ selection: { anchor: doc.indexOf('f') + 1 } }); // before the sentinel
		el.view.dispatch(el.view.state.replaceSelection('X'));
		await el.updateComplete;
		expect(el.value).toBe('abc defX ghi');
		expect(annotatedText(el)).toBe('defX');
	});

	it('typing just outside the START does not grow the annotation', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc: string = el.view.state.doc.toString();
		el.view.dispatch({ selection: { anchor: doc.indexOf('d') - 1 } }); // before the start sentinel
		el.view.dispatch(el.view.state.replaceSelection('X'));
		await el.updateComplete;
		expect(annotatedText(el)).toBe('def');
	});

	it('typing just inside the START grows the annotation', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc: string = el.view.state.doc.toString();
		el.view.dispatch({ selection: { anchor: doc.indexOf('d') } }); // after the start sentinel
		el.view.dispatch(el.view.state.replaceSelection('X'));
		await el.updateComplete;
		expect(annotatedText(el)).toBe('Xdef');
	});

	// An annotation opening a bullet ("- item") must still get its start sentinel:
	// the guard only blocks *inside* the marker, not the first content char. Without
	// it there'd be a single stop and typing before the token would grow it.
	it('gives both caret stops when the annotation opens a bullet item', async () => {
		el = await make('- item', [{ id: 'a1', start: 2, end: 6, quote: 'item' }]);
		const doc: string = el.view.state.doc.toString();
		expect(doc).toBe(`- ${S}item${S}`); // start sentinel sits right after "- "
		// Just outside the START (before the sentinel): typing stays out of the token.
		el.view.dispatch({ selection: { anchor: doc.indexOf('item') - 1 } });
		el.view.dispatch(el.view.state.replaceSelection('X'));
		await el.updateComplete;
		expect(el.value).toBe('- Xitem');
		expect(annotatedText(el)).toBe('item');
	});

	it('typing just inside a bullet-opening annotation grows it', async () => {
		el = await make('- item', [{ id: 'a1', start: 2, end: 6, quote: 'item' }]);
		const doc: string = el.view.state.doc.toString();
		el.view.dispatch({ selection: { anchor: doc.indexOf('item') } }); // after the start sentinel
		el.view.dispatch(el.view.state.replaceSelection('X'));
		await el.updateComplete;
		expect(el.value).toBe('- Xitem');
		expect(annotatedText(el)).toBe('Xitem');
	});

	const pressBackspace = (el: El) =>
		el.view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }));

	// A mention sitting inside an annotation edge is the tightest interplay: its
	// delete-select must still fire even though a sentinel hugs the mention's far
	// side. The mention-adjacent caret stop equals link.to, so the sentinel never
	// blocks it — two-step deletion works and no sentinel leaks out.
	it('deletes an annotated mention in two steps without leaking a sentinel', async () => {
		const token = '[@Anouk](user:1)';
		el = await make(`hi ${token}`, [{ id: 'a', start: 3, end: 3 + token.length, quote: token }]);
		const to: number = el.view.state.doc.toString().indexOf(token) + token.length; // inner stop, before the badge
		el.view.dispatch({ selection: { anchor: to } });
		pressBackspace(el);
		await waitForUpdate(el);
		expect(el.value).toContain(token); // first press only selects the token
		expect(el.shadowRoot!.querySelector('.cm-md-mention-token[data-selected]')).not.toBeNull();
		pressBackspace(el);
		await waitForUpdate(el);
		expect(el.value).not.toContain(token); // second press removes it
		expect(el.view.state.doc.toString()).not.toContain(S); // annotation collapsed, no orphan sentinel
	});

	// Deletion guard: removing the whole annotated word collapses the annotation and
	// must clear both its sentinels, leaving the document (and value) clean.
	it('deleting the annotated word leaves no orphan sentinel', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc: string = el.view.state.doc.toString();
		const from = doc.indexOf('def');
		el.view.dispatch({ selection: { anchor: from, head: from + 3 } });
		el.view.dispatch(el.view.state.replaceSelection(''));
		await waitForUpdate(el);
		expect(el.value).toBe('abc  ghi');
		expect(el.view.state.doc.toString()).not.toContain(S);
	});

	// Deletion guard: the badge (end sentinel) is atomic and app-owned — a backspace
	// landing on it from the outer stop can't corrupt the annotation; the filter
	// self-heals and the value stays intact and sentinel-free.
	it('backspace onto the badge from outside does not corrupt the annotation', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const outer: number = el.view.state.doc.toString().lastIndexOf(S) + 1; // just after the badge
		el.view.dispatch({ selection: { anchor: outer } });
		pressBackspace(el);
		await waitForUpdate(el);
		expect(el.value).toBe('abc def ghi');
		expect(annotatedText(el)).toBe('def');
	});

	// cut() removes the selection regardless of clipboard availability, and the
	// removed text is taken sentinel-free (the copy path already strips them).
	it('cut removes the current selection from the document', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const doc: string = el.view.state.doc.toString();
		const from = doc.indexOf('def');
		el.view.dispatch({ selection: { anchor: from, head: from + 3 } });
		await (el as unknown as { cut(): Promise<void> }).cut();
		await waitForUpdate(el);
		expect(el.value).toBe('abc  ghi');
		expect(el.view.state.doc.toString()).not.toContain(S);
	});

	// The badge must never wrap onto a line by itself: its last word and the badge
	// share a nowrap span, so they wrap together. Structural check — the badge sits
	// inside a .cm-annotation-tail that also holds the annotation's last word.
	it('keeps the badge in a nowrap span with the last word', async () => {
		el = await make('alpha beta gamma', [{ id: 'a1', start: 0, end: 16, quote: 'alpha beta gamma' }]);
		const tail = el.shadowRoot!.querySelector('.cm-annotation-tail');
		expect(tail).not.toBeNull();
		expect(tail!.querySelector('.cm-annotation-badge')).not.toBeNull(); // badge lives in the tail
		const tailText = (tail!.textContent ?? '').replace(new RegExp(S, 'g'), '').replace(/\d+$/, '');
		expect(tailText).toBe('gamma'); // only the last word, not the whole annotation
	});

	// a11y: sentinels are replace-widgets, so the raw U+2060 never reaches the
	// rendered text a screen reader linearizes; the start widget announces nothing.
	it('never exposes the sentinel character to assistive tech', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const content = el.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		expect(content.textContent).not.toContain(S);
		const start = el.shadowRoot!.querySelector('.cm-annotation-start');
		expect(start?.textContent).toBe(''); // the start sentinel renders nothing to read
	});

	// Sentinels live only in the CM document — copy/cut must not leak them onto the
	// clipboard, and paste must not carry a stray one in from another instance.
	it('strips sentinels from clipboard output and input', async () => {
		el = await make('abc def ghi', [{ id: 'a1', start: 4, end: 7, quote: 'def' }]);
		const raw = el.view.state.doc.toString();
		expect(raw).toContain(S); // the document is sentinel-bearing
		const apply = (facet: typeof EditorView.clipboardOutputFilter, text: string) =>
			(el.view.state.facet(facet) as ((t: string, state: unknown) => string)[])
				.reduce((t, f) => f(t, el.view.state), text);
		expect(apply(EditorView.clipboardOutputFilter, raw)).toBe('abc def ghi');
		expect(apply(EditorView.clipboardInputFilter, `X${S}Y`)).toBe('XY');
	});
});

// Undo/redo re-anchoring. The sentinel filter doesn't run on history transactions,
// so the document (and its sentinels) revert while the clean anchors would drift —
// invertedEffects restores the anchors in step. And loading annotations must not
// create an undo step, so the first undo reverts a real edit, not the annotations.
describe('nldd-text-editor annotation history', () => {
	let el: HistoryEl;
	afterEach(() => cleanup(el));

	type HistoryEl = El & { undo(): void; redo(): void; getState(): { canUndo: boolean } };

	// Value set via the attribute so the loaded document is the history baseline
	// (a value set as a property would itself be an undoable transaction).
	async function loaded(value: string, anns: unknown[]): Promise<HistoryEl> {
		const node = await fixture<HistoryEl>(`<nldd-text-editor accessible-label="t" annotatable value="${value}"></nldd-text-editor>`);
		node.annotations = anns;
		await node.updateComplete;
		await waitForUpdate(node);
		return node;
	}

	it('does not put loading annotations on the undo stack', async () => {
		el = await loaded('AAAA leidend BBBB', [{ id: 'a', start: 5, end: 12, quote: 'leidend' }]);
		expect(el.getState().canUndo).toBe(false);
		el.undo(); // a stray undo must not strip the annotation
		await waitForUpdate(el);
		expect(annotatedText(el)).toBe('leidend');
		expect(el.value).toBe('AAAA leidend BBBB');
	});

	it('keeps annotations anchored across undo and redo of an edit', async () => {
		el = await loaded('AAAA leidend BBBB', [{ id: 'a', start: 5, end: 12, quote: 'leidend' }]);
		el.view.dispatch({ changes: { from: 0, insert: 'XX ' }, userEvent: 'input.type' });
		await waitForUpdate(el);
		expect(annotatedText(el)).toBe('leidend'); // still on its text after the edit

		el.undo();
		await waitForUpdate(el);
		expect(el.value).toBe('AAAA leidend BBBB');
		expect(annotatedText(el)).toBe('leidend'); // re-anchored, not drifted

		el.redo();
		await waitForUpdate(el);
		expect(el.value).toBe('XX AAAA leidend BBBB');
		expect(annotatedText(el)).toBe('leidend');
	});
});

import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './text-editor.js';
import { renumberOrderedLists } from './text-editor.ordered-list.js';

/** Apply the renumber changes to a string (highest offset first, so earlier edits
 *  don't shift later ones). */
function apply(doc: string): string {
	const changes = [...renumberOrderedLists(doc)].sort((a, b) => b.from - a.from);
	let out = doc;
	for (const c of changes) out = out.slice(0, c.from) + c.insert + out.slice(c.to);
	return out;
}

describe('renumberOrderedLists', () => {
	it('forces a gap back into sequence (1, 3 → 1, 2)', () => {
		expect(apply('1. een\n3. twee')).toBe('1. een\n2. twee');
	});

	it('renumbers a whole run', () => {
		expect(apply('1. a\n3. b\n5. c')).toBe('1. a\n2. b\n3. c');
	});

	it('forces the first item to 1', () => {
		expect(apply('5. a\n8. b\n9. c')).toBe('1. a\n2. b\n3. c');
		expect(apply('3. only')).toBe('1. only');
	});

	it('leaves an already-correct list untouched', () => {
		expect(renumberOrderedLists('1. a\n2. b\n3. c')).toEqual([]);
	});

	it('handles the ) marker', () => {
		expect(apply('1) a\n3) b')).toBe('1) a\n2) b');
	});

	it('numbers nested lists independently and resumes the parent', () => {
		expect(apply('1. a\n   1. x\n   5. y\n2. b')).toBe('1. a\n   1. x\n   2. y\n2. b');
	});

	it('treats a single blank line as a loose-list continuation', () => {
		expect(apply('1. a\n\n5. b')).toBe('1. a\n\n2. b');
	});

	it('restarts after two or more blank lines (CommonMark ends the list)', () => {
		expect(apply('1. a\n3. b\n\n\n5. c')).toBe('1. a\n2. b\n\n\n1. c');
	});

	it('starts a new list after a paragraph', () => {
		expect(apply('1. a\n3. b\n\ntekst\n\n1. c\n4. d')).toBe('1. a\n2. b\n\ntekst\n\n1. c\n2. d');
	});

	it('does not renumber inside a fenced code block (and the fence breaks the list)', () => {
		const doc = '1. a\n3. b\n\n```\n1. x\n3. y\n```\n\n1. c\n3. d';
		// Lists on either side renumber independently; the code lines stay literal, and
		// the fence breaks the list so the run after it restarts.
		expect(apply(doc)).toBe('1. a\n2. b\n\n```\n1. x\n3. y\n```\n\n1. c\n2. d');
	});

	it('grows the digit across the ten boundary', () => {
		const doc = Array.from({ length: 10 }, () => '7. x').join('\n');
		const result = apply(doc);
		expect(result.split('\n')[0]).toBe('1. x');
		expect(result.split('\n')[9]).toBe('10. x');
	});
});

describe('nldd-text-editor ordered-list renumbering (integration)', () => {
	type El = HTMLElement & { value: string; updateComplete: Promise<boolean>; view: any };
	let el: El;
	afterEach(() => cleanup(el));

	it('renumbers as an out-of-order item is typed', async () => {
		el = await fixture<El>('<nldd-text-editor accessible-label="t"></nldd-text-editor>');
		el.value = '1. een';
		await el.updateComplete; await waitForUpdate(el);
		// Add a second item numbered "3." at the end.
		el.view.dispatch({ changes: { from: el.view.state.doc.length, insert: '\n3. twee' } });
		await waitForUpdate(el);
		expect(el.value).toBe('1. een\n2. twee');
	});

	it('keeps annotations anchored while renumbering', async () => {
		const elA = await fixture<El & { annotatable: boolean; annotations: unknown[] }>(
			'<nldd-text-editor accessible-label="t" annotatable></nldd-text-editor>',
		);
		elA.value = '1. alpha\n3. beta';
		elA.annotations = [{ id: 'a', start: 3, end: 8, quote: 'alpha' }];
		await elA.updateComplete; await waitForUpdate(elA);
		// Trigger a renumber by inserting another out-of-order item.
		elA.view.dispatch({ changes: { from: elA.view.state.doc.length, insert: '\n9. gamma' } });
		await waitForUpdate(elA);
		expect(elA.value).toBe('1. alpha\n2. beta\n3. gamma');
		const tint = elA.shadowRoot!.querySelector('.cm-annotation');
		expect(tint?.textContent?.replace(/⁠/g, '').replace(/\d+$/, '')).toBe('alpha');
		cleanup(elA);
	});

	// Backspacing a non-first marker must clear it as cleanly as the first item, not
	// leave the alignment whitespace CodeMirror's deleteMarkupBackward would insert.
	it('clears a non-first list marker without leaving whitespace', async () => {
		const elB = await fixture<El>('<nldd-text-editor accessible-label="t"></nldd-text-editor>');
		elB.value = '1. a\n2. ';
		await elB.updateComplete; await waitForUpdate(elB);
		elB.view.dispatch({ selection: { anchor: elB.view.state.doc.length } }); // end of "2. "
		elB.view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }));
		await waitForUpdate(elB);
		expect(elB.value).toBe('1. a\n'); // marker gone, no stray leading space
		cleanup(elB);
	});

	// The renumber filter runs before the annotation filter (Prec.low), so a marker
	// that changes width maps the token on its line too instead of drifting it.
	it('does not drift an annotation when a marker would grow', async () => {
		const elA = await fixture<El & { annotatable: boolean; annotations: unknown[] }>(
			'<nldd-text-editor accessible-label="t" annotatable></nldd-text-editor>',
		);
		elA.value = '1. alpha\n2. beta gamma';
		const f = elA.value.indexOf('beta gamma');
		elA.annotations = [{ id: 'a', start: f, end: f + 'beta gamma'.length, quote: 'beta gamma' }];
		await elA.updateComplete; await waitForUpdate(elA);
		// Try to widen the first marker (1 -> 91); the forced-1 rule reverts it, but the
		// annotation on the next line must not shift in the churn.
		const doc = elA.view.state.doc.toString();
		elA.view.dispatch({ changes: { from: doc.indexOf('1.') + 1, insert: '9' }, userEvent: 'input.type' });
		await waitForUpdate(elA);
		expect(elA.value).toBe('1. alpha\n2. beta gamma'); // marker forced back to 1
		const tint = elA.shadowRoot!.querySelector('.cm-annotation');
		expect(tint?.textContent?.replace(/⁠/g, '').replace(/\d+$/, '')).toBe('beta gamma');
		cleanup(elA);
	});
});

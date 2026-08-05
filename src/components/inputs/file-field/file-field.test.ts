import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDFileField } from './file-field.js';
import './file-field.js';

/** Puts a FileList on the inner input, the way a real pick would, and fires the
 *  change the component listens for. `input.files` is settable from script; only
 *  a *selection* the user did not make is refused. */
function choose(el: NLDDFileField, ...files: File[]): void {
	const input = el.shadowRoot!.querySelector('input')!;
	const transfer = new DataTransfer();
	for (const file of files) transfer.items.add(file);
	input.files = transfer.files;
	input.dispatchEvent(new Event('change', { bubbles: true }));
}

const txt = (name: string) => new File(['x'], name, { type: 'text/plain' });

describe('nldd-file-field', () => {
	let el: NLDDFileField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('shows the empty text and no clear button before a file is chosen', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.file-field__value')!.textContent!.trim())
			.toBe('Geen bestand gekozen');
		expect(el.shadowRoot!.querySelector('nldd-icon-button')).toBeNull();
	});

	it('shows the file name after one file is chosen', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		await waitForUpdate(el);
		choose(el, txt('rapport.pdf'));
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.file-field__value')!.textContent!.trim())
			.toBe('rapport.pdf');
		expect(el.files.map((f) => f.name)).toEqual(['rapport.pdf']);
	});

	it('summarizes two or more files as a count instead of listing them', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field multiple></nldd-file-field>');
		await waitForUpdate(el);
		choose(el, txt('a.txt'), txt('b.txt'), txt('c.txt'));
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.file-field__value')!.textContent!.trim())
			.toBe('3 bestanden');
	});

	it('names the button after the multiple attribute', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field multiple></nldd-file-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-button')!.getAttribute('text'))
			.toBe('Bestanden kiezen');
	});

	it('fires change with the chosen files', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		await waitForUpdate(el);
		const listener = vi.fn();
		el.addEventListener('change', listener);
		choose(el, txt('rapport.pdf'));
		expect(listener).toHaveBeenCalledOnce();
		expect(listener.mock.calls[0][0].detail.files.map((f: File) => f.name)).toEqual(['rapport.pdf']);
	});

	it('clears the input as well as the list, so the same file can be chosen again', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		await waitForUpdate(el);
		choose(el, txt('rapport.pdf'));
		await waitForUpdate(el);

		el.shadowRoot!.querySelector('nldd-icon-button')!.dispatchEvent(new Event('click'));
		await waitForUpdate(el);

		expect(el.files).toEqual([]);
		expect(el.shadowRoot!.querySelector('input')!.files!.length).toBe(0);
		expect(el.shadowRoot!.querySelector('.file-field__value')!.textContent!.trim())
			.toBe('Geen bestand gekozen');
	});

	it('is invalid while required and empty, and valid once a file is chosen', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field required></nldd-file-field>');
		await waitForUpdate(el);
		expect(el.internals.validity.valueMissing).toBe(true);

		choose(el, txt('rapport.pdf'));
		await waitForUpdate(el);
		expect(el.internals.validity.valueMissing).toBe(false);
	});

	it('submits nothing without a name', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		await waitForUpdate(el);
		choose(el, txt('rapport.pdf'));
		expect(el.formValue()).toBeNull();
	});

	it('submits a single file as itself and several as FormData', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field multiple name="bijlage"></nldd-file-field>');
		await waitForUpdate(el);

		choose(el, txt('a.txt'));
		expect(el.formValue()).toBeInstanceOf(File);

		choose(el, txt('a.txt'), txt('b.txt'));
		const value = el.formValue();
		expect(value).toBeInstanceOf(FormData);
		expect((value as FormData).getAll('bijlage')).toHaveLength(2);
	});

	it('takes an override for a translation key', async () => {
		el = await fixture<NLDDFileField>('<nldd-file-field></nldd-file-field>');
		el.translations = { 'components.file-field.no-file-chosen-text': 'No file chosen' };
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.file-field__value')!.textContent!.trim())
			.toBe('No file chosen');
	});
});

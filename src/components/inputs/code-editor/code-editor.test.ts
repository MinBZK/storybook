import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './code-editor.ts';

describe('nldd-code-editor', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert een textarea', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea.code-editor__input');
		expect(textarea).not.toBeNull();
	});

	it('zet spellcheck en autocomplete uit by default', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		expect(textarea.spellcheck).toBe(false);
		expect(textarea.autocomplete).toBe('off');
	});

	it('reflects the wrap attribute', async () => {
		el = await fixture('<nldd-code-editor wrap accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
	});

	it('emits input event with value', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		const textarea = el.shadowRoot!.querySelector('textarea')!;
		let received: string | undefined;
		el.addEventListener('input', ((e: CustomEvent) => { received = e.detail.value; }) as EventListener);
		textarea.value = 'foo: bar';
		textarea.dispatchEvent(new Event('input'));
		expect(received).toBe('foo: bar');
	});
});

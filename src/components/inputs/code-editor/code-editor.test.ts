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

	it('formResetCallback restores the initial value', async () => {
		const el2 = await fixture<HTMLElement & { formResetCallback: () => void; value: string }>(
			'<nldd-code-editor accessible-label="Code" value="initial"></nldd-code-editor>',
		);
		await waitForUpdate(el2);
		el2.value = 'edited';
		await waitForUpdate(el2);
		expect(el2.value).toBe('edited');
		el2.formResetCallback();
		expect(el2.value).toBe('initial');
		cleanup(el2);
	});

	it('formStateRestoreCallback applies a string state', async () => {
		const el2 = await fixture<HTMLElement & { formStateRestoreCallback: (state: unknown) => void; value: string }>(
			'<nldd-code-editor accessible-label="Code"></nldd-code-editor>',
		);
		await waitForUpdate(el2);
		el2.formStateRestoreCallback('restored');
		expect(el2.value).toBe('restored');
		cleanup(el2);
	});

	it('formStateRestoreCallback ignores non-string state', async () => {
		const el2 = await fixture<HTMLElement & { formStateRestoreCallback: (state: unknown) => void; value: string }>(
			'<nldd-code-editor accessible-label="Code" value="kept"></nldd-code-editor>',
		);
		await waitForUpdate(el2);
		el2.formStateRestoreCallback(new FormData());
		expect(el2.value).toBe('kept');
		cleanup(el2);
	});
});

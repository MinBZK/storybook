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

	it('mount een CodeMirror editor', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.cm-editor')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.cm-content')).not.toBeNull();
	});

	it('toont de initiële waarde in de editor', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code" value="foo: bar"></nldd-code-editor>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content')!;
		expect(content.textContent).toContain('foo: bar');
	});

	it('synct de value-property naar de editor', async () => {
		const el2 = await fixture<HTMLElement & { value: string }>('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el2);
		el2.value = 'changed: true';
		await waitForUpdate(el2);
		const content = el2.shadowRoot!.querySelector('.cm-content')!;
		expect(content.textContent).toContain('changed: true');
		cleanup(el2);
	});

	it('reflects the wrap attribute', async () => {
		el = await fixture('<nldd-code-editor wrap accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		expect(el.hasAttribute('wrap')).toBe(true);
	});

	it('default variant is simple', async () => {
		el = await fixture('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		expect((el as unknown as { variant: string }).variant).toBe('simple');
		expect(el.hasAttribute('variant')).toBe(false);
	});

	it('readonly blijft focusbaar (content editable, niet "false")', async () => {
		el = await fixture('<nldd-code-editor readonly value="x" accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		expect(content.getAttribute('contenteditable')).not.toBe('false');
	});

	it('disabled maakt de content niet-bewerkbaar', async () => {
		el = await fixture('<nldd-code-editor disabled accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		expect(content.getAttribute('contenteditable')).toBe('false');
	});

	it('emits input event en synct value bij typen', async () => {
		const el2 = await fixture<HTMLElement & { value: string }>('<nldd-code-editor accessible-label="Code"></nldd-code-editor>');
		await waitForUpdate(el2);
		let received: string | undefined;
		el2.addEventListener('input', ((e: CustomEvent) => { received = e.detail.value; }) as EventListener);
		const content = el2.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		content.focus();
		document.execCommand('insertText', false, 'foo: bar');
		await waitForUpdate(el2);
		expect(received).toBe('foo: bar');
		expect(el2.value).toBe('foo: bar');
		cleanup(el2);
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
		await waitForUpdate(el2);
		expect(el2.value).toBe('initial');
		cleanup(el2);
	});

	it('formStateRestoreCallback applies a string state', async () => {
		const el2 = await fixture<HTMLElement & { formStateRestoreCallback: (state: unknown) => void; value: string }>(
			'<nldd-code-editor accessible-label="Code"></nldd-code-editor>',
		);
		await waitForUpdate(el2);
		el2.formStateRestoreCallback('restored');
		await waitForUpdate(el2);
		expect(el2.value).toBe('restored');
		cleanup(el2);
	});

	it('formStateRestoreCallback ignores non-string state', async () => {
		const el2 = await fixture<HTMLElement & { formStateRestoreCallback: (state: unknown) => void; value: string }>(
			'<nldd-code-editor accessible-label="Code" value="kept"></nldd-code-editor>',
		);
		await waitForUpdate(el2);
		el2.formStateRestoreCallback(new FormData());
		await waitForUpdate(el2);
		expect(el2.value).toBe('kept');
		cleanup(el2);
	});
});

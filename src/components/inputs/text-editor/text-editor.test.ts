import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './text-editor.ts';

type TextEditorEl = HTMLElement & { value: string; updateComplete: Promise<boolean> };

async function withValue(markdown: string): Promise<TextEditorEl> {
	const el = await fixture<TextEditorEl>('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
	el.value = markdown;
	await el.updateComplete;
	await waitForUpdate(el);
	return el;
}

describe('nldd-text-editor', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('mount een CodeMirror editor', async () => {
		el = await fixture('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.cm-editor')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('.cm-content')).not.toBeNull();
	});

	it('toont de markdown-inhoud', async () => {
		const el2 = await withValue('Hallo **wereld**');
		expect(el2.shadowRoot!.querySelector('.cm-content')!.textContent).toContain('Hallo');
		cleanup(el2);
	});

	it('synct de value-property naar de editor', async () => {
		el = await fixture('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		(el as TextEditorEl).value = 'nieuwe tekst';
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.cm-content')!.textContent).toContain('nieuwe tekst');
	});

	it('rendert hybride decoraties (kop, vet, marker-dim)', async () => {
		const el2 = await withValue('# Kop\n\nEen **vet** woord.');
		const sr = el2.shadowRoot!;
		expect(sr.querySelector('.cm-md-h1')).not.toBeNull();
		expect(sr.querySelector('.cm-md-strong')).not.toBeNull();
		// The ** markers are kept but dimmed.
		expect(sr.querySelector('.cm-md-mark')).not.toBeNull();
		cleanup(el2);
	});

	it('rendert inline code en links', async () => {
		const el2 = await withValue('Tekst met `code` en [link](https://example.org).');
		const sr = el2.shadowRoot!;
		expect(sr.querySelector('.cm-md-code')).not.toBeNull();
		expect(sr.querySelector('.cm-md-link')).not.toBeNull();
		cleanup(el2);
	});

	it('default variant simple en font sans', async () => {
		el = await fixture('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('simple');
		expect(el.getAttribute('font')).toBe('sans');
	});

	it('reflects font="mono"', async () => {
		el = await fixture('<nldd-text-editor font="mono" accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		expect(el.getAttribute('font')).toBe('mono');
	});

	it('wrap staat standaard aan', async () => {
		el = await fixture('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		expect((el as HTMLElement & { wrap: boolean }).wrap).toBe(true);
	});

	it('disabled maakt de content niet-bewerkbaar', async () => {
		el = await fixture('<nldd-text-editor disabled accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		expect(content.getAttribute('contenteditable')).toBe('false');
	});

	it('emits input event en synct value bij typen', async () => {
		const el2 = await fixture<TextEditorEl>('<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>');
		await waitForUpdate(el2);
		let received: string | undefined;
		el2.addEventListener('input', ((e: CustomEvent) => { received = e.detail.value; }) as EventListener);
		const content = el2.shadowRoot!.querySelector('.cm-content') as HTMLElement;
		content.focus();
		document.execCommand('insertText', false, 'hoi');
		await waitForUpdate(el2);
		expect(received).toBe('hoi');
		expect(el2.value).toBe('hoi');
		cleanup(el2);
	});

	it('formResetCallback restores the initial value', async () => {
		const el2 = await fixture<HTMLElement & { formResetCallback: () => void; value: string }>(
			'<nldd-text-editor accessible-label="Tekst" value="start"></nldd-text-editor>',
		);
		await waitForUpdate(el2);
		el2.value = 'gewijzigd';
		await waitForUpdate(el2);
		expect(el2.value).toBe('gewijzigd');
		el2.formResetCallback();
		await waitForUpdate(el2);
		expect(el2.value).toBe('start');
		cleanup(el2);
	});

	it('formStateRestoreCallback applies a string state', async () => {
		const el2 = await fixture<HTMLElement & { formStateRestoreCallback: (s: unknown) => void; value: string }>(
			'<nldd-text-editor accessible-label="Tekst"></nldd-text-editor>',
		);
		await waitForUpdate(el2);
		el2.formStateRestoreCallback('hersteld');
		await waitForUpdate(el2);
		expect(el2.value).toBe('hersteld');
		cleanup(el2);
	});
});

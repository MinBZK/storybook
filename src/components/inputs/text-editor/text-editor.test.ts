import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './text-editor.ts';
import { mentionToken } from './text-editor.mentions.ts';

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


	/* ============================================================
	   Headless command / state API
	   ============================================================ */

	it('toggleBold wraps and unwraps the selection', async () => {
		const el2 = await withValue('woord');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; toggleBold(): void };
		api.view.dispatch({ selection: { anchor: 0, head: 5 } });
		api.toggleBold();
		await waitForUpdate(el2);
		expect(el2.value).toBe('**woord**');
		api.toggleBold();
		await waitForUpdate(el2);
		expect(el2.value).toBe('woord');
		cleanup(el2);
	});

	it('toggleHeading sets and toggles a heading prefix', async () => {
		const el2 = await withValue('Titel');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; toggleHeading(l: number): void };
		api.view.dispatch({ selection: { anchor: 0 } });
		api.toggleHeading(2);
		await waitForUpdate(el2);
		expect(el2.value).toBe('## Titel');
		api.toggleHeading(2);
		await waitForUpdate(el2);
		expect(el2.value).toBe('Titel');
		cleanup(el2);
	});

	it('toggleBulletList prefixes the line', async () => {
		const el2 = await withValue('punt');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; toggleBulletList(): void };
		api.view.dispatch({ selection: { anchor: 0 } });
		api.toggleBulletList();
		await waitForUpdate(el2);
		expect(el2.value).toBe('- punt');
		cleanup(el2);
	});

	it('getState reports the active formats at the selection', async () => {
		const el2 = await withValue('**vet**');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; getState(): { active: { bold: boolean; italic: boolean } } };
		api.view.dispatch({ selection: { anchor: 3 } });
		const state = api.getState();
		expect(state.active.bold).toBe(true);
		expect(state.active.italic).toBe(false);
		cleanup(el2);
	});

	it('emits nldd-text-editor-state on selection change', async () => {
		const el2 = await withValue('# Kop');
		let detail: { active: { heading: number } } | undefined;
		el2.addEventListener('nldd-text-editor-state', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		(el2 as unknown as { view: { dispatch(spec: unknown): void } }).view.dispatch({ selection: { anchor: 3 } });
		await waitForUpdate(el2);
		expect(detail?.active.heading).toBe(1);
		cleanup(el2);
	});

	it('runCommand dispatches by name', async () => {
		const el2 = await withValue('tekst');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; runCommand(name: string, payload?: unknown): void };
		api.view.dispatch({ selection: { anchor: 0, head: 5 } });
		api.runCommand('italic');
		await waitForUpdate(el2);
		expect(el2.value).toBe('*tekst*');
		cleanup(el2);
	});

	it('setList sets and switches list types', async () => {
		const el2 = await withValue('punt');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; setList(t: string): void };
		api.view.dispatch({ selection: { anchor: 0 } });
		api.setList('bullet');
		await waitForUpdate(el2);
		expect(el2.value).toBe('- punt');
		api.setList('ordered');
		await waitForUpdate(el2);
		expect(el2.value).toBe('1. punt');
		api.setList('none');
		await waitForUpdate(el2);
		expect(el2.value).toBe('punt');
		cleanup(el2);
	});

	it('setHeading sets a level without toggling off', async () => {
		const el2 = await withValue('Titel');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; setHeading(l: number): void };
		api.view.dispatch({ selection: { anchor: 0 } });
		api.setHeading(2);
		await waitForUpdate(el2);
		expect(el2.value).toBe('## Titel');
		api.setHeading(2);
		await waitForUpdate(el2);
		expect(el2.value).toBe('## Titel');
		api.setHeading(0);
		await waitForUpdate(el2);
		expect(el2.value).toBe('Titel');
		cleanup(el2);
	});

	it('getState reports the ordered-list type', async () => {
		const el2 = await withValue('1. een');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; getState(): { active: { orderedList: boolean; bulletList: boolean } } };
		api.view.dispatch({ selection: { anchor: 3 } });
		const active = api.getState().active;
		expect(active.orderedList).toBe(true);
		expect(active.bulletList).toBe(false);
		cleanup(el2);
	});


	/* ============================================================
	   @-mentions
	   ============================================================ */

	it('klapt een @-mention volledig weg tot een chip', async () => {
		const el2 = await withValue('Hoi [@Anouk](user:1), kijk even.');
		const chip = el2.shadowRoot!.querySelector('.cm-md-mention-chip');
		expect(chip).not.toBeNull();
		// the @ is the 'at' icon, followed by the name; raw syntax is replaced
		expect(chip!.querySelector('.cm-md-mention-chip__at')).not.toBeNull();
		expect(chip!.textContent).toContain('Anouk');
		expect(el2.shadowRoot!.querySelector('.cm-content')!.textContent).not.toContain('(user:1)');
		cleanup(el2);
	});

	it('een gewone link is geen mention-chip', async () => {
		const el2 = await withValue('Zie [site](https://example.org).');
		const sr = el2.shadowRoot!;
		expect(sr.querySelector('.cm-md-link')).not.toBeNull();
		expect(sr.querySelector('.cm-md-mention-chip')).toBeNull();
		cleanup(el2);
	});

	it('mentionToken bouwt een markdown-link met user-id', () => {
		expect(mentionToken({ id: '42', label: 'Anouk' })).toBe('[@Anouk](user:42)');
	});

	it('markeert een mention als geselecteerd wanneer de selectie het token dekt', async () => {
		const el2 = await withValue('Hoi [@Anouk](user:1).');
		const view = (el2 as unknown as { view: { state: { doc: { toString(): string } }; dispatch(spec: unknown): void } }).view;
		const text = view.state.doc.toString();
		const from = text.indexOf('[@Anouk');
		const to = text.indexOf(')', text.indexOf('(user:1')) + 1;
		view.dispatch({ selection: { anchor: from, head: to } });
		await waitForUpdate(el2);
		expect(el2.shadowRoot!.querySelector('.cm-md-mention-chip[data-selected]')).not.toBeNull();
		cleanup(el2);
	});
});

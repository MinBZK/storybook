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
		const te = el as unknown as { variant: string; font: string };
		expect(te.variant).toBe('simple');
		expect(te.font).toBe('sans');
		expect(el.hasAttribute('variant')).toBe(false);
		expect(el.hasAttribute('font')).toBe(false);
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

	it('setList none strips only the marker, no blank lines inserted', async () => {
		const el2 = await withValue('- een\n- twee\n- drie');
		const api = el2 as unknown as { view: { state: { doc: { toString(): string } }; dispatch(s: unknown): void }; setList(t: string): void };
		const pos = api.view.state.doc.toString().indexOf('twee');
		api.view.dispatch({ selection: { anchor: pos } });
		api.setList('none');
		await waitForUpdate(el2);
		// Just removes the marker, like deleting it by hand — no surrounding blank
		// lines. The toolbar reads "no list" from the (now marker-less) line.
		expect(el2.value).toBe('- een\ntwee\n- drie');
		cleanup(el2);
	});

	it('setList none verwijdert ook de inspring van een genest item', async () => {
		const el2 = await withValue('- ouder\n  - kind');
		const api = el2 as unknown as { view: { state: { doc: { toString(): string } }; dispatch(s: unknown): void }; setList(t: string): void };
		const pos = api.view.state.doc.toString().indexOf('kind');
		api.view.dispatch({ selection: { anchor: pos } });
		api.setList('none');
		await waitForUpdate(el2);
		// The child loses its marker AND its indent — bare text can't be list-indented.
		expect(el2.value).toBe('- ouder\nkind');
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

	it('toggleLink unwraps a link the caret is in', async () => {
		const el2 = await withValue('Zie [site](https://example.org) hier.');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; toggleLink(): void };
		api.view.dispatch({ selection: { anchor: el2.value.indexOf('site') + 1 } });
		api.toggleLink();
		await waitForUpdate(el2);
		expect(el2.value).toBe('Zie site hier.');
		cleanup(el2);
	});

	it('getState detecteert een blockquote met de caret aan het regeleinde', async () => {
		const el2 = await withValue('> Een citaat');
		const api = el2 as unknown as { view: { dispatch(spec: unknown): void }; getState(): { active: { quote: boolean } } };
		api.view.dispatch({ selection: { anchor: el2.value.length } });
		expect(api.getState().active.quote).toBe(true);
		cleanup(el2);
	});

	it('getState detecteert een blockquote op een lazy-continuation-regel (geen >)', async () => {
		// The second line has no '>' but is part of the quote (a lazy continuation),
		// so the quote button should still light up there.
		const el2 = await withValue('> Eerste regel\nTweede regel zonder marker');
		const api = el2 as unknown as {
			view: { dispatch(spec: unknown): void; state: { doc: { line(n: number): { from: number } } } };
			getState(): { active: { quote: boolean } };
		};
		api.view.dispatch({ selection: { anchor: api.view.state.doc.line(2).from + 3 } });
		expect(api.getState().active.quote).toBe(true);
		cleanup(el2);
	});

	it('getState detecteert een codeblok op de fence- en inhoudsregels', async () => {
		const el2 = await withValue('```\nconst x = 1;\n```');
		const api = el2 as unknown as {
			view: { dispatch(spec: unknown): void; state: { doc: { line(n: number): { from: number } } } };
			getState(): { active: { codeBlock: boolean } };
		};
		api.view.dispatch({ selection: { anchor: api.view.state.doc.line(2).from + 2 } }); // content
		expect(api.getState().active.codeBlock).toBe(true);
		api.view.dispatch({ selection: { anchor: api.view.state.doc.line(1).from } }); // opening fence
		expect(api.getState().active.codeBlock).toBe(true);
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

	it('clearHistory leegt de undo-stack maar laat het document staan', async () => {
		const el2 = await withValue('hello');
		const api = el2 as unknown as {
			view: { dispatch(spec: unknown): void };
			getState(): { canUndo: boolean };
			clearHistory(): void;
			value: string;
		};
		// A user-like edit so history has something to undo.
		api.view.dispatch({ changes: { from: 5, insert: ' world' } });
		await waitForUpdate(el2);
		expect(api.getState().canUndo).toBe(true);

		api.clearHistory();
		await waitForUpdate(el2);
		expect(api.getState().canUndo).toBe(false);
		expect(api.value).toBe('hello world');
		cleanup(el2);
	});

	it('getSelection geeft clean offsets, de quote en empty', async () => {
		const el2 = await withValue('hello world');
		const api = el2 as unknown as {
			view: { dispatch(s: unknown): void };
			getSelection(): { start: number; end: number; quote: string; empty: boolean; rect: DOMRect | null };
		};
		api.view.dispatch({ selection: { anchor: 0, head: 5 } });
		const sel = api.getSelection();
		expect(sel.start).toBe(0);
		expect(sel.end).toBe(5);
		expect(sel.quote).toBe('hello');
		expect(sel.empty).toBe(false);
		// The selection carries a viewport rect so a consumer can anchor a popover
		// to the selected text rather than to its own button.
		expect(sel.rect).toBeInstanceOf(DOMRect);
		api.view.dispatch({ selection: { anchor: 3 } });
		expect(api.getSelection().empty).toBe(true);
		cleanup(el2);
	});

	it('getAnnotations geeft de mee-geschoven annotaties met een verse quote', async () => {
		const el2 = await fixture<TextEditorEl & { annotatable: boolean; annotations: unknown[] }>(
			'<nldd-text-editor accessible-label="Tekst" annotatable></nldd-text-editor>',
		);
		el2.value = 'hello world';
		el2.annotations = [{ id: 'n1', start: 6, end: 11, quote: 'world' }];
		await el2.updateComplete;
		await waitForUpdate(el2);
		const api = el2 as unknown as {
			view: { dispatch(s: unknown): void };
			getAnnotations(): { id: string; start: number; end: number; quote: string }[];
		};
		expect(api.getAnnotations()).toEqual([{ id: 'n1', start: 6, end: 11, quote: 'world' }]);
		// Insert before the annotation → its clean offsets shift right, quote unchanged.
		api.view.dispatch({ changes: { from: 0, insert: 'Xy ' } });
		await waitForUpdate(el2);
		expect(api.getAnnotations()).toEqual([{ id: 'n1', start: 9, end: 14, quote: 'world' }]);
		cleanup(el2);
	});

	it('klik op de annotatie-badge emit annotation-click met de id(s)', async () => {
		const el2 = await fixture<TextEditorEl & { annotatable: boolean; annotations: unknown[] }>(
			'<nldd-text-editor accessible-label="Tekst" annotatable></nldd-text-editor>',
		);
		el2.value = 'hello world';
		el2.annotations = [{ id: 'n1', start: 6, end: 11, quote: 'world' }];
		await el2.updateComplete;
		await waitForUpdate(el2);
		const badge = el2.shadowRoot!.querySelector('.cm-annotation-badge') as HTMLElement | null;
		expect(badge).not.toBeNull();
		let detail: { ids: string[]; rect: DOMRect } | null = null;
		el2.addEventListener('nldd-text-editor-annotation-click', (e) => {
			detail = (e as CustomEvent<{ ids: string[]; rect: DOMRect }>).detail;
		});
		badge!.click();
		expect(detail!.ids).toEqual(['n1']);
		// The badge's viewport rect rides along so a consumer can anchor its note UI.
		expect(typeof detail!.rect.top).toBe('number');
		expect(typeof detail!.rect.left).toBe('number');
		cleanup(el2);
	});

	it('indent nestelt onder een vorig item en maakt van een los item geen codeblok', async () => {
		type IndentApi = {
			view: { dispatch(s: unknown): void; state: { doc: { line(n: number): { text: string; from: number } } } };
			indent(): void;
		};
		// A standalone first item has no parent, so indenting must not add 4 spaces
		// (which markdown would read as an indented code block).
		const standalone = await withValue('Tekst.\n\n- Los item');
		const a1 = standalone as unknown as IndentApi;
		a1.view.dispatch({ selection: { anchor: a1.view.state.doc.line(3).from + 2 } });
		a1.indent();
		a1.indent();
		expect(a1.view.state.doc.line(3).text).toBe('- Los item');
		cleanup(standalone);
		// An item with a sibling above nests one level, and no deeper.
		const nested = await withValue('- a\n- b');
		const a2 = nested as unknown as IndentApi;
		a2.view.dispatch({ selection: { anchor: a2.view.state.doc.line(2).from + 2 } });
		a2.indent();
		expect(a2.view.state.doc.line(2).text).toBe('  - b');
		a2.view.dispatch({ selection: { anchor: a2.view.state.doc.line(2).from + 4 } });
		a2.indent();
		expect(a2.view.state.doc.line(2).text).toBe('  - b');
		cleanup(nested);
	});

	it('getState meldt canIndent/canOutdent (drijft de indent-knoppen)', async () => {
		const el2 = await withValue('- a\n- b');
		const api = el2 as unknown as {
			view: { dispatch(s: unknown): void; state: { doc: { line(n: number): { from: number } } } };
			getState(): { canIndent: boolean; canOutdent: boolean };
			indent(): void;
		};
		// First item: no parent to nest under, not nested.
		api.view.dispatch({ selection: { anchor: api.view.state.doc.line(1).from + 2 } });
		expect(api.getState().canIndent).toBe(false);
		expect(api.getState().canOutdent).toBe(false);
		// Second item: can nest under the first, not nested yet.
		api.view.dispatch({ selection: { anchor: api.view.state.doc.line(2).from + 2 } });
		expect(api.getState().canIndent).toBe(true);
		expect(api.getState().canOutdent).toBe(false);
		// Once nested: no deeper parent, but it can be outdented.
		api.indent();
		api.view.dispatch({ selection: { anchor: api.view.state.doc.line(2).from + 4 } });
		expect(api.getState().canIndent).toBe(false);
		expect(api.getState().canOutdent).toBe(true);
		cleanup(el2);
	});


	/* ============================================================
	   @-mentions
	   ============================================================ */

	it('klapt een @-mention volledig weg tot een chip', async () => {
		const el2 = await withValue('Hoi [@Anouk](user:1), kijk even.');
		const chip = el2.shadowRoot!.querySelector('.cm-md-mention-token');
		expect(chip).not.toBeNull();
		// the @ is the 'at' icon, followed by the name; raw syntax is replaced
		expect(chip!.querySelector('.cm-md-mention-token-icon')).not.toBeNull();
		expect(chip!.textContent).toContain('Anouk');
		expect(el2.shadowRoot!.querySelector('.cm-content')!.textContent).not.toContain('(user:1)');
		cleanup(el2);
	});

	it('een gewone link is geen mention-chip', async () => {
		const el2 = await withValue('Zie [site](https://example.org).');
		const sr = el2.shadowRoot!;
		expect(sr.querySelector('.cm-md-link')).not.toBeNull();
		expect(sr.querySelector('.cm-md-mention-token')).toBeNull();
		cleanup(el2);
	});

	it('toont een open-link badge na een echte link, niet na een mention', async () => {
		const el2 = await withValue('Zie [site](https://example.org) en [@Anouk](user:1).');
		const badges = el2.shadowRoot!.querySelectorAll('.cm-link-badge');
		expect(badges.length).toBe(1); // the mention owns its own click, so it's skipped
		expect(badges[0].getAttribute('href')).toBe('https://example.org');
		expect(badges[0].getAttribute('target')).toBe('_blank');
		cleanup(el2);
	});

	it('toont de open-link badge ook na een reference-style link', async () => {
		const el2 = await withValue('Zie [site][ref] hier.\n\n[ref]: https://example.org');
		const badges = el2.shadowRoot!.querySelectorAll('.cm-link-badge');
		expect(badges.length).toBe(1); // only the [site][ref] link, not the definition
		expect(badges[0].getAttribute('href')).toBe('https://example.org');
		cleanup(el2);
	});

	it('mentionToken bouwt een markdown-link met user-id', () => {
		expect(mentionToken({ id: '42', label: 'Anouk' })).toBe('[@Anouk](user:42)');
	});

	it('verwijdert een mention in twee stappen (backspace selecteert, dan verwijdert)', async () => {
		const el2 = await withValue('Hoi [@Anouk](user:1) daar.');
		const view = (el2 as unknown as { view: { state: { doc: { toString(): string } }; dispatch(s: unknown): void; contentDOM: HTMLElement } }).view;
		const token = '[@Anouk](user:1)';
		const to = view.state.doc.toString().indexOf(token) + token.length;
		view.dispatch({ selection: { anchor: to } });
		const backspace = () => view.contentDOM.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }));
		backspace();
		await waitForUpdate(el2);
		// First press selects the whole token (shown as selected), without deleting.
		expect(el2.value).toContain(token);
		expect(el2.shadowRoot!.querySelector('.cm-md-mention-token[data-selected]')).not.toBeNull();
		backspace();
		await waitForUpdate(el2);
		// Second press removes it.
		expect(el2.value).not.toContain(token);
		cleanup(el2);
	});

	it('markeert een mention als geselecteerd wanneer de selectie het token dekt', async () => {
		const el2 = await withValue('Hoi [@Anouk](user:1).');
		const view = (el2 as unknown as { view: { state: { doc: { toString(): string } }; dispatch(spec: unknown): void } }).view;
		const text = view.state.doc.toString();
		const from = text.indexOf('[@Anouk');
		const to = text.indexOf(')', text.indexOf('(user:1')) + 1;
		view.dispatch({ selection: { anchor: from, head: to } });
		await waitForUpdate(el2);
		expect(el2.shadowRoot!.querySelector('.cm-md-mention-token[data-selected]')).not.toBeNull();
		cleanup(el2);
	});


	/* ============================================================
	   Annotations
	   ============================================================ */

	async function withAnnotations(markdown: string, list: unknown[]): Promise<TextEditorEl> {
		const el2 = await withValue(markdown);
		(el2 as unknown as { annotatable: boolean }).annotatable = true;
		(el2 as unknown as { annotations: unknown[] }).annotations = list;
		await el2.updateComplete;
		await waitForUpdate(el2);
		return el2;
	}

	it('rendert geen annotaties zonder het annotatable-attribuut', async () => {
		const el2 = await withValue('Een zin met tekst.');
		(el2 as unknown as { annotations: unknown[] }).annotations = [{ id: 'a1', start: 4, end: 7, quote: 'zin' }];
		await el2.updateComplete;
		await waitForUpdate(el2);
		expect(el2.shadowRoot!.querySelector('.cm-annotation')).toBeNull();
		(el2 as unknown as { annotatable: boolean }).annotatable = true;
		await el2.updateComplete;
		await waitForUpdate(el2);
		expect(el2.shadowRoot!.querySelector('.cm-annotation')).not.toBeNull();
		cleanup(el2);
	});

	it('rendert een annotatie als dashed-underline + badge met telling 1', async () => {
		const el2 = await withAnnotations('Een zin met tekst.', [{ id: 'a1', start: 4, end: 7, quote: 'zin' }]);
		const sr = el2.shadowRoot!;
		expect(sr.querySelector('.cm-annotation')).not.toBeNull();
		const badge = sr.querySelector('.cm-annotation-badge');
		expect(badge).not.toBeNull();
		expect(badge!.textContent).toBe('1');
		// The nub lives inside the tinted block (one cohesive element).
		expect(badge!.closest('.cm-annotation')).not.toBeNull();
		cleanup(el2);
	});

	it('merget overlappende annotaties tot een badge met telling', async () => {
		const el2 = await withAnnotations('Een zin met tekst hier.', [
			{ id: 'a1', start: 4, end: 12 },
			{ id: 'a2', start: 8, end: 17 },
		]);
		const badges = el2.shadowRoot!.querySelectorAll('.cm-annotation-badge');
		expect(badges.length).toBe(1);
		expect(badges[0].textContent).toBe('2');
		cleanup(el2);
	});

	it('mapt annotatie-ankers mee door bewerkingen heen', async () => {
		const el2 = await withAnnotations('xy tekst hier.', [{ id: 'a1', start: 3, end: 8, quote: 'tekst' }]);
		const view = (el2 as unknown as { view: { dispatch(spec: unknown): void } }).view;
		view.dispatch({ changes: { from: 0, insert: 'AB' } });
		await waitForUpdate(el2);
		// Still anchored (shifted right by the insertion), so it keeps rendering.
		expect(el2.shadowRoot!.querySelector('.cm-annotation')).not.toBeNull();
		cleanup(el2);
	});

	it('behoudt een annotatie als de lijst-marker via setList wordt verwijderd', async () => {
		// The annotated word sits after the "- " marker. setList('none') must touch
		// only the marker, not rewrite the whole line (which would collapse the anchor).
		const el2 = await withAnnotations('- Een actiepunt hier.', [{ id: 'a1', start: 6, end: 15, quote: 'actiepunt' }]);
		const sr = el2.shadowRoot!;
		expect(sr.querySelector('.cm-annotation')).not.toBeNull();
		const api = el2 as unknown as {
			view: { dispatch(s: unknown): void; state: { doc: { toString(): string } } };
			setList(t: string): void;
		};
		api.view.dispatch({ selection: { anchor: 8 } });
		api.setList('none');
		await waitForUpdate(el2);
		// Check the clean value (the document carries annotation sentinels).
		expect((el2 as unknown as { value: string }).value.startsWith('Een actiepunt')).toBe(true); // marker stripped
		expect(sr.querySelector('.cm-annotation')).not.toBeNull(); // annotation survived
		cleanup(el2);
	});
});

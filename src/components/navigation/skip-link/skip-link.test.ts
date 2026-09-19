import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { page } from 'vitest/browser';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './skip-link.js';

describe('nldd-skip-link', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-skip-link></nldd-skip-link>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el).toBeInstanceOf(customElements.get('nldd-skip-link'));
	});

	it('toont default tekst uit i18n', async () => {
		el = await fixture('<nldd-skip-link></nldd-skip-link>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.skip-link__control');
		expect(button!.textContent!.trim()).toBe('Sla over');
	});

	it('toont custom tekst via text attribuut', async () => {
		el = await fixture('<nldd-skip-link text="Ga naar inhoud"></nldd-skip-link>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.skip-link__control');
		expect(button!.textContent!.trim()).toBe('Ga naar inhoud');
	});

	it('rendert een button element zonder href', async () => {
		el = await fixture('<nldd-skip-link></nldd-skip-link>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('.skip-link__control');
		expect(button!.tagName).toBe('BUTTON');
	});

	it('rendert een anchor element met href', async () => {
		el = await fixture('<nldd-skip-link href="#main"></nldd-skip-link>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('.skip-link__control');
		expect(anchor!.tagName).toBe('A');
		expect(anchor!.getAttribute('href')).toBe('#main');
	});

	it('rendert button wanneer href een javascript: URI is', async () => {
		el = await fixture('<nldd-skip-link href="javascript:void(0)"></nldd-skip-link>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.skip-link__control');
		expect(control!.tagName).toBe('BUTTON');
	});

	it('rendert button wanneer href een javascript:alert URI is', async () => {
		el = await fixture('<nldd-skip-link href="javascript:alert(1)"></nldd-skip-link>');
		await waitForUpdate(el);
		const control = el.shadowRoot!.querySelector('.skip-link__control');
		expect(control!.tagName).toBe('BUTTON');
	});

	it('focust volgende sibling bij klik zonder href', async () => {
		el = await fixture('<div><nldd-skip-link></nldd-skip-link><main tabindex="-1">Content</main></div>');
		const skipLink = el.querySelector('nldd-skip-link')!;
		await waitForUpdate(skipLink);
		const btn = skipLink.shadowRoot!.querySelector('button') as HTMLButtonElement;
		btn.click();
		expect(document.activeElement).toBe(el.querySelector('main'));
	});

	// WCAG 1.4.10. The label is long enough to overflow in any font, since the
	// test environment loads neither the tokens nor RijksSans.
	describe('reflow op 320px', () => {
		const text = 'Ga direct naar de hoofdinhoud van deze pagina en sla de navigatie over';
		let viewport: { width: number; height: number };

		const layouts = {
			'host over de volle breedte': `<div><nldd-skip-link text="${text}"></nldd-skip-link></div>`,
			'host verschoven door een marge': `<div style="margin-left: 250px"><nldd-skip-link text="${text}"></nldd-skip-link></div>`,
			'lege host in een flex-rij': `<div style="display: flex"><nldd-skip-link text="${text}"></nldd-skip-link><main tabindex="-1">x</main></div>`,
		};

		const mount = async (html: string) => {
			el = await fixture(html);
			const skipLink = el.querySelector('nldd-skip-link')!;
			await waitForUpdate(skipLink);
			return {
				block: skipLink.shadowRoot!.querySelector<HTMLElement>('.skip-link')!,
				control: skipLink.shadowRoot!.querySelector<HTMLElement>('.skip-link__control')!,
			};
		};

		beforeEach(async () => {
			viewport = { width: window.innerWidth, height: window.innerHeight };
			await page.viewport(320, 800);
		});

		afterEach(async () => {
			await page.viewport(viewport.width, viewport.height);
		});

		it.each(Object.entries(layouts))('%s: verborgen maakt de pagina niet breder', async (_, html) => {
			await mount(html);
			expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(320);
		});

		it.each(Object.entries(layouts))('%s: gefocust past het label binnen de viewport', async (_, html) => {
			const { block, control } = await mount(html);
			control.focus();
			expect(control.matches(':focus-visible')).toBe(true);

			const label = control.getBoundingClientRect();
			const box = block.getBoundingClientRect();
			expect(label.left).toBeGreaterThanOrEqual(0);
			expect(label.right).toBeLessThanOrEqual(320);
			// the block's background has to sit behind the whole label
			expect(box.width).toBeGreaterThanOrEqual(label.width);
			expect(box.height).toBeGreaterThanOrEqual(label.height);
			expect(document.documentElement.scrollWidth).toBeLessThanOrEqual(320);
		});
	});
});

import { describe, it, expect, afterEach } from 'vitest';
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
});

import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './form-section.js';

describe('nldd-form-section', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('rendert zonder fouten', async () => {
		el = await fixture('<nldd-form-section></nldd-form-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('rendert fieldset + legend bij text', async () => {
		el = await fixture('<nldd-form-section text="Persoonsgegevens"></nldd-form-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('fieldset')).not.toBeNull();
		const legend = el.shadowRoot!.querySelector('legend');
		expect(legend?.textContent).toContain('Persoonsgegevens');
	});

	it('rendert geen legend zonder text', async () => {
		el = await fixture('<nldd-form-section></nldd-form-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('legend')).toBeNull();
	});

	it('rendert supporting-text als <p>', async () => {
		el = await fixture('<nldd-form-section supporting-text="Vul je gegevens in."></nldd-form-section>');
		await waitForUpdate(el);
		const p = el.shadowRoot!.querySelector('.form-section__subtitle');
		expect(p?.textContent).toContain('Vul je gegevens in.');
	});

	it('slot rendert content binnen fieldset', async () => {
		el = await fixture('<nldd-form-section text="Group"><div data-testid="child">Inhoud</div></nldd-form-section>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
		const assigned = slot.assignedElements();
		expect(assigned.length).toBe(1);
		expect((assigned[0] as HTMLElement).getAttribute('data-testid')).toBe('child');
	});
});

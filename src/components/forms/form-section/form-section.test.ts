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

	it('rendert geen legend zonder text en zonder supporting-text', async () => {
		el = await fixture('<nldd-form-section></nldd-form-section>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('legend')).toBeNull();
	});

	it('rendert supporting-text als <span> binnen legend', async () => {
		el = await fixture('<nldd-form-section text="Persoonsgegevens" supporting-text="Vul je gegevens in."></nldd-form-section>');
		await waitForUpdate(el);
		const legend = el.shadowRoot!.querySelector('legend')!;
		const subtitle = legend.querySelector('.form-section__subtitle');
		// Subtitle moet binnen legend staan zodat SR 'm meeleest als group label
		expect(subtitle).not.toBeNull();
		expect(subtitle?.textContent).toContain('Vul je gegevens in.');
	});

	it('rendert legend met enkel supporting-text als text leeg is', async () => {
		// Edge case: alleen supporting-text. Render toch een legend zodat SR
		// een group label krijgt.
		el = await fixture('<nldd-form-section supporting-text="Beschrijving"></nldd-form-section>');
		await waitForUpdate(el);
		const legend = el.shadowRoot!.querySelector('legend');
		expect(legend).not.toBeNull();
		expect(legend!.querySelector('.form-section__title')).toBeNull();
		expect(legend!.querySelector('.form-section__subtitle')?.textContent).toContain('Beschrijving');
	});

	it('slot rendert content binnen fieldset', async () => {
		el = await fixture('<nldd-form-section text="Group"><div data-testid="child">Inhoud</div></nldd-form-section>');
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector('slot') as HTMLSlotElement;
		const assigned = slot.assignedElements();
		expect(assigned.length).toBe(1);
		expect((assigned[0] as HTMLElement).getAttribute('data-testid')).toBe('child');
	});

	it('legend is direct child van fieldset (vereist door SR a11y)', async () => {
		el = await fixture('<nldd-form-section text="Persoonsgegevens"></nldd-form-section>');
		await waitForUpdate(el);
		const fieldset = el.shadowRoot!.querySelector('fieldset')!;
		const legend = fieldset.querySelector('legend')!;
		// HTML spec + screen-reader requirement: <legend> moet directe child van <fieldset> zijn
		expect(legend.parentElement).toBe(fieldset);
		expect(fieldset.firstElementChild).toBe(legend);
	});

	it('title én subtitle staan samen IN dezelfde legend', async () => {
		el = await fixture('<nldd-form-section text="Persoonsgegevens" supporting-text="Vul je gegevens in."></nldd-form-section>');
		await waitForUpdate(el);
		const legend = el.shadowRoot!.querySelector('legend')!;
		const title = legend.querySelector('.form-section__title');
		const subtitle = legend.querySelector('.form-section__subtitle');
		// Beide moeten binnen één legend staan zodat SR ze samen als group label leest
		expect(title?.textContent).toContain('Persoonsgegevens');
		expect(subtitle?.textContent).toContain('Vul je gegevens in.');
	});
});

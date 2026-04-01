import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRRadioButtonField } from './rr-radio-button-field.ts';
import './rr-radio-button-field.ts';
import '../radio-button/rr-radio-button.ts';

describe('rr-radio-button-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-radio-button-field></rr-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label element', async () => {
		el = await fixture('<rr-radio-button-field label="Optie 1"></rr-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.radio-button-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<rr-radio-button-field label="Optie 1"></rr-radio-button-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.radio-button-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders rr-radio-button in shadow DOM', async () => {
		el = await fixture('<rr-radio-button-field></rr-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-radio-button')).not.toBeNull();
	});

	it('forwards label as accessible-label to rr-radio-button', async () => {
		el = await fixture('<rr-radio-button-field label="Optie A"></rr-radio-button-field>');
		await waitForUpdate(el);
		const radio = el.shadowRoot!.querySelector('rr-radio-button')!;
		expect(radio.getAttribute('accessible-label')).toBe('Optie A');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-radio-button-field – state', () => {
	let el: RRRadioButtonField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<RRRadioButtonField>('<rr-radio-button-field></rr-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<RRRadioButtonField>('<rr-radio-button-field checked></rr-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRRadioButtonField>('<rr-radio-button-field disabled></rr-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('rr-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.disabled).toBe(true);
	});

	it('forwards value to rr-radio-button', async () => {
		el = await fixture<RRRadioButtonField>('<rr-radio-button-field value="option-a"></rr-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('rr-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.value).toBe('option-a');
	});
});

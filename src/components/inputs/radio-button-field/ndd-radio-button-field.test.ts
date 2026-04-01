import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDRadioButtonField } from './ndd-radio-button-field.ts';
import './ndd-radio-button-field.ts';
import '../radio-button/ndd-radio-button.ts';

describe('ndd-radio-button-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-radio-button-field></ndd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label element', async () => {
		el = await fixture('<ndd-radio-button-field label="Optie 1"></ndd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.radio-button-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<ndd-radio-button-field label="Optie 1"></ndd-radio-button-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.radio-button-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders ndd-radio-button in shadow DOM', async () => {
		el = await fixture('<ndd-radio-button-field></ndd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-radio-button')).not.toBeNull();
	});

	it('forwards label as accessible-label to ndd-radio-button', async () => {
		el = await fixture('<ndd-radio-button-field label="Optie A"></ndd-radio-button-field>');
		await waitForUpdate(el);
		const radio = el.shadowRoot!.querySelector('ndd-radio-button')!;
		expect(radio.getAttribute('accessible-label')).toBe('Optie A');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('ndd-radio-button-field – state', () => {
	let el: NDDRadioButtonField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NDDRadioButtonField>('<ndd-radio-button-field></ndd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NDDRadioButtonField>('<ndd-radio-button-field checked></ndd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NDDRadioButtonField>('<ndd-radio-button-field disabled></ndd-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('ndd-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.disabled).toBe(true);
	});

	it('forwards value to ndd-radio-button', async () => {
		el = await fixture<NDDRadioButtonField>('<ndd-radio-button-field value="option-a"></ndd-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('ndd-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.value).toBe('option-a');
	});
});

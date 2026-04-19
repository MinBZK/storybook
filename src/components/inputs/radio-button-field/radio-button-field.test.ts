import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDRadioButtonField } from './radio-button-field.js';
import './radio-button-field.ts';
import '../radio-button/radio-button.ts';

describe('nldd-radio-button-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-radio-button-field></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label element', async () => {
		el = await fixture('<nldd-radio-button-field label="Optie 1"></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.radio-button-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<nldd-radio-button-field label="Optie 1"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.radio-button-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders nldd-radio-button in shadow DOM', async () => {
		el = await fixture('<nldd-radio-button-field></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-radio-button')).not.toBeNull();
	});

	it('forwards label as accessible-label to nldd-radio-button', async () => {
		el = await fixture('<nldd-radio-button-field label="Optie A"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const radio = el.shadowRoot!.querySelector('nldd-radio-button')!;
		expect(radio.getAttribute('accessible-label')).toBe('Optie A');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-radio-button-field – state', () => {
	let el: NLDDRadioButtonField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field checked></nldd-radio-button-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field disabled></nldd-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('nldd-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.disabled).toBe(true);
	});

	it('forwards value to nldd-radio-button', async () => {
		el = await fixture<NLDDRadioButtonField>('<nldd-radio-button-field value="option-a"></nldd-radio-button-field>');
		await waitForUpdate(el);
		const radioButton = el.shadowRoot!.querySelector('nldd-radio-button') as any;
		await waitForUpdate(radioButton);
		expect(radioButton.value).toBe('option-a');
	});
});

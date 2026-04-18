import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDCheckboxField } from './ndd-checkbox-field.ts';
import './ndd-checkbox-field.ts';
import '../checkbox/ndd-checkbox.ts';

describe('ndd-checkbox-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-checkbox-field></ndd-checkbox-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label span element', async () => {
		el = await fixture('<ndd-checkbox-field label="Optie 1"></ndd-checkbox-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.checkbox-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<ndd-checkbox-field label="Optie 1"></ndd-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.checkbox-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders ndd-checkbox in shadow DOM', async () => {
		el = await fixture('<ndd-checkbox-field></ndd-checkbox-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-checkbox')).not.toBeNull();
	});

	it('forwards label as accessible-label to ndd-checkbox', async () => {
		el = await fixture('<ndd-checkbox-field label="Akkoord"></ndd-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox')!;
		expect(checkbox.getAttribute('accessible-label')).toBe('Akkoord');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('ndd-checkbox-field – state', () => {
	let el: NDDCheckboxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field></ndd-checkbox-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field checked></ndd-checkbox-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is indeterminate when indeterminate attribute is set', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field indeterminate></ndd-checkbox-field>');
		await waitForUpdate(el);
		expect(el.indeterminate).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field disabled></ndd-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox') as any;
		await waitForUpdate(checkbox);
		expect(checkbox.disabled).toBe(true);
	});

	it('forwards value to ndd-checkbox', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field value="agree"></ndd-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox') as any;
		await waitForUpdate(checkbox);
		expect(checkbox.value).toBe('agree');
	});

	it('forwards name to ndd-checkbox', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field name="terms"></ndd-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox') as any;
		await waitForUpdate(checkbox);
		expect(checkbox.name).toBe('terms');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('ndd-checkbox-field – change event', () => {
	let el: NDDCheckboxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked when ndd-checkbox fires change', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field value="agree"></ndd-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox')!;
		checkbox.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: 'agree' },
			bubbles: true,
		}));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked and value detail', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field value="agree"></ndd-checkbox-field>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox')!;
		checkbox.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: 'agree' },
			bubbles: true,
		}));

		expect(detail).toBeDefined();
		expect(detail.checked).toBe(true);
		expect(detail.value).toBe('agree');
	});

	it('clears indeterminate when change fires', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field indeterminate></ndd-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('ndd-checkbox')!;
		checkbox.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: 'on' },
			bubbles: true,
		}));
		await waitForUpdate(el);
		expect(el.indeterminate).toBe(false);
		expect(el.checked).toBe(true);
	});
});


/* ============================================================
   Label click
   ============================================================ */

describe('ndd-checkbox-field – label click', () => {
	let el: NDDCheckboxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggles checked when label is clicked', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field label="Optie 1"></ndd-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.checkbox-field__label')!;
		label.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('does not toggle when disabled and label is clicked', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field label="Optie 1" disabled></ndd-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.checkbox-field__label')!;
		label.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('clears indeterminate when label is clicked', async () => {
		el = await fixture<NDDCheckboxField>('<ndd-checkbox-field label="Optie 1" indeterminate></ndd-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.checkbox-field__label')!;
		label.click();
		await waitForUpdate(el);
		expect(el.indeterminate).toBe(false);
	});
});

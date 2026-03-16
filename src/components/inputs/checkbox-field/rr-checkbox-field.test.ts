import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRCheckboxField } from './rr-checkbox-field.ts';
import './rr-checkbox-field.ts';
import '../checkbox/rr-checkbox.ts';

describe('rr-checkbox-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-checkbox-field></rr-checkbox-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label element', async () => {
		el = await fixture('<rr-checkbox-field>Optie 1</rr-checkbox-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('label')).not.toBeNull();
	});

	it('renders rr-checkbox in shadow DOM', async () => {
		el = await fixture('<rr-checkbox-field></rr-checkbox-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-checkbox')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-checkbox-field – state', () => {
	let el: RRCheckboxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field></rr-checkbox-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field checked></rr-checkbox-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is indeterminate when indeterminate attribute is set', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field indeterminate></rr-checkbox-field>');
		await waitForUpdate(el);
		expect(el.indeterminate).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field disabled></rr-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('rr-checkbox') as any;
		await waitForUpdate(checkbox);
		expect(checkbox.disabled).toBe(true);
	});

	it('forwards value to rr-checkbox', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field value="agree"></rr-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('rr-checkbox') as any;
		await waitForUpdate(checkbox);
		expect(checkbox.value).toBe('agree');
	});

	it('forwards name to rr-checkbox', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field name="terms"></rr-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('rr-checkbox') as any;
		await waitForUpdate(checkbox);
		expect(checkbox.name).toBe('terms');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-checkbox-field – change event', () => {
	let el: RRCheckboxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked when rr-checkbox fires change', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field value="agree"></rr-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('rr-checkbox')!;
		checkbox.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: 'agree' },
			bubbles: true,
		}));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked and value detail', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field value="agree"></rr-checkbox-field>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const checkbox = el.shadowRoot!.querySelector('rr-checkbox')!;
		checkbox.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: 'agree' },
			bubbles: true,
		}));

		expect(detail).toBeDefined();
		expect(detail.checked).toBe(true);
		expect(detail.value).toBe('agree');
	});

	it('clears indeterminate when change fires', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field indeterminate></rr-checkbox-field>');
		await waitForUpdate(el);
		const checkbox = el.shadowRoot!.querySelector('rr-checkbox')!;
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

describe('rr-checkbox-field – label click', () => {
	let el: RRCheckboxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggles checked when label is clicked', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field>Optie 1</rr-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('label')!;
		label.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('does not toggle when disabled and label is clicked', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field disabled>Optie 1</rr-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('label')!;
		label.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('clears indeterminate when label is clicked', async () => {
		el = await fixture<RRCheckboxField>('<rr-checkbox-field indeterminate>Optie 1</rr-checkbox-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('label')!;
		label.click();
		await waitForUpdate(el);
		expect(el.indeterminate).toBe(false);
	});
});

import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDSwitchField } from './ndd-switch-field.ts';
import './ndd-switch-field.ts';
import '../switch/ndd-switch.ts';

describe('ndd-switch-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-switch-field></ndd-switch-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label span element', async () => {
		el = await fixture('<ndd-switch-field label="Optie 1"></ndd-switch-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.switch-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<ndd-switch-field label="Optie 1"></ndd-switch-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.switch-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders ndd-switch in shadow DOM', async () => {
		el = await fixture('<ndd-switch-field></ndd-switch-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-switch')).not.toBeNull();
	});

	it('forwards label as accessible-label to ndd-switch', async () => {
		el = await fixture('<ndd-switch-field label="Meldingen"></ndd-switch-field>');
		await waitForUpdate(el);
		const switchEl = el.shadowRoot!.querySelector('ndd-switch')!;
		expect(switchEl.getAttribute('accessible-label')).toBe('Meldingen');
	});
});

/* ============================================================
   State
   ============================================================ */

describe('ndd-switch-field – state', () => {
	let el: NDDSwitchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field></ndd-switch-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field checked></ndd-switch-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field disabled></ndd-switch-field>');
		await waitForUpdate(el);
		const switchEl = el.shadowRoot!.querySelector('ndd-switch') as any;
		await waitForUpdate(switchEl);
		expect(switchEl.disabled).toBe(true);
	});

	it('forwards value in change event detail', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field value="meldingen"></ndd-switch-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);
		const switchEl = el.shadowRoot!.querySelector('ndd-switch')!;
		switchEl.dispatchEvent(
			new CustomEvent('change', {
				detail: { checked: true },
				bubbles: true,
			})
		);
		expect(detail?.value).toBe('meldingen');
	});
});

/* ============================================================
   Change event
   ============================================================ */

describe('ndd-switch-field – change event', () => {
	let el: NDDSwitchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked when ndd-switch fires change', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field></ndd-switch-field>');
		await waitForUpdate(el);
		const switchEl = el.shadowRoot!.querySelector('ndd-switch')!;
		switchEl.dispatchEvent(
			new CustomEvent('change', {
				detail: { checked: true },
				bubbles: true,
			})
		);
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked and value detail', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field value="aan"></ndd-switch-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);
		const switchEl = el.shadowRoot!.querySelector('ndd-switch')!;
		switchEl.dispatchEvent(
			new CustomEvent('change', {
				detail: { checked: true },
				bubbles: true,
			})
		);
		expect(detail).toBeDefined();
		expect(detail.checked).toBe(true);
		expect(detail.value).toBe('aan');
	});
});

/* ============================================================
   Label click
   ============================================================ */

describe('ndd-switch-field – label click', () => {
	let el: NDDSwitchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggles checked when label span is clicked', async () => {
		el = await fixture<NDDSwitchField>('<ndd-switch-field label="Optie 1"></ndd-switch-field>');
		await waitForUpdate(el);
		const labelSpan = el.shadowRoot!.querySelector<HTMLElement>('.switch-field__label')!;
		labelSpan.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('does not toggle when disabled and label span is clicked', async () => {
		el = await fixture<NDDSwitchField>(
			'<ndd-switch-field label="Optie 1" disabled></ndd-switch-field>'
		);
		await waitForUpdate(el);
		const labelSpan = el.shadowRoot!.querySelector<HTMLElement>('.switch-field__label')!;
		labelSpan.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});
});

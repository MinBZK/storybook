import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRSwitchField } from './rr-switch-field.ts';
import './rr-switch-field.ts';
import '../switch/rr-switch.ts';

describe('rr-switch-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-switch-field></rr-switch-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a label span element', async () => {
		el = await fixture('<rr-switch-field label="Optie 1"></rr-switch-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.switch-field__label')).not.toBeNull();
	});

	it('renders label text from attribute', async () => {
		el = await fixture('<rr-switch-field label="Optie 1"></rr-switch-field>');
		await waitForUpdate(el);
		const label = el.shadowRoot!.querySelector('.switch-field__label')!;
		expect(label.textContent).toBe('Optie 1');
	});

	it('renders rr-switch in shadow DOM', async () => {
		el = await fixture('<rr-switch-field></rr-switch-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-switch')).not.toBeNull();
	});

	it('forwards label as accessible-label to rr-switch', async () => {
		el = await fixture('<rr-switch-field label="Meldingen"></rr-switch-field>');
		await waitForUpdate(el);
		const switchEl = el.shadowRoot!.querySelector('rr-switch')!;
		expect(switchEl.getAttribute('accessible-label')).toBe('Meldingen');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-switch-field – state', () => {
	let el: RRSwitchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field></rr-switch-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field checked></rr-switch-field>');
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field disabled></rr-switch-field>');
		await waitForUpdate(el);
		const switchEl = el.shadowRoot!.querySelector('rr-switch') as any;
		await waitForUpdate(switchEl);
		expect(switchEl.disabled).toBe(true);
	});

	it('forwards value in change event detail', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field value="meldingen"></rr-switch-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		const switchEl = el.shadowRoot!.querySelector('rr-switch')!;
		switchEl.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true },
			bubbles: true,
		}));
		expect(detail?.value).toBe('meldingen');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-switch-field – change event', () => {
	let el: RRSwitchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked when rr-switch fires change', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field></rr-switch-field>');
		await waitForUpdate(el);
		const switchEl = el.shadowRoot!.querySelector('rr-switch')!;
		switchEl.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true },
			bubbles: true,
		}));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked and value detail', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field value="aan"></rr-switch-field>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		const switchEl = el.shadowRoot!.querySelector('rr-switch')!;
		switchEl.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true },
			bubbles: true,
		}));
		expect(detail).toBeDefined();
		expect(detail.checked).toBe(true);
		expect(detail.value).toBe('aan');
	});
});


/* ============================================================
   Label click
   ============================================================ */

describe('rr-switch-field – label click', () => {
	let el: RRSwitchField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggles checked when label span is clicked', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field label="Optie 1"></rr-switch-field>');
		await waitForUpdate(el);
		const labelSpan = el.shadowRoot!.querySelector<HTMLElement>('.switch-field__label')!;
		labelSpan.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('does not toggle when disabled and label span is clicked', async () => {
		el = await fixture<RRSwitchField>('<rr-switch-field label="Optie 1" disabled></rr-switch-field>');
		await waitForUpdate(el);
		const labelSpan = el.shadowRoot!.querySelector<HTMLElement>('.switch-field__label')!;
		labelSpan.click();
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});
});

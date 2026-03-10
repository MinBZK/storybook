import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRRadioButton } from './rr-radio-button.ts';
import './rr-radio-button.ts';

describe('rr-radio-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-radio-button></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native radio input', async () => {
		el = await fixture('<rr-radio-button></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="radio"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-radio-button – state', () => {
	let el: RRRadioButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button checked></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button disabled></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
	});

	it('forwards value to the native input', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button value="option-a"></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.value).toBe('option-a');
	});

	it('forwards name to the native input', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button name="group1"></rr-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.name).toBe('group1');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-radio-button – change event', () => {
	let el: RRRadioButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked property when native input changes', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button></rr-radio-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked, value and name detail', async () => {
		el = await fixture<RRRadioButton>('<rr-radio-button name="group1" value="option-a"></rr-radio-button>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));

		expect(detail).toBeDefined();
		expect(detail.checked).toBe(true);
		expect(detail.value).toBe('option-a');
		expect(detail.name).toBe('group1');
	});
});

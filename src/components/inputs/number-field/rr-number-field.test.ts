import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRNumberField } from './rr-number-field.ts';
import './rr-number-field.ts';

describe('rr-number-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-number-field></rr-number-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders two rr-icon-button elements', async () => {
		el = await fixture('<rr-number-field></rr-number-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('rr-icon-button').length).toBe(2);
	});

	it('renders a native number input', async () => {
		el = await fixture('<rr-number-field></rr-number-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="number"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-number-field – state', () => {
	let el: RRNumberField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('has default value of 0', async () => {
		el = await fixture<RRNumberField>('<rr-number-field></rr-number-field>');
		await waitForUpdate(el);
		expect(el.value).toBe(0);
	});

	it('reflects value attribute', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5"></rr-number-field>');
		await waitForUpdate(el);
		expect(el.value).toBe(5);
	});

	it('forwards name to native input', async () => {
		el = await fixture<RRNumberField>('<rr-number-field name="aantal"></rr-number-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.name).toBe('aantal');
	});

	it('disables native input when disabled', async () => {
		el = await fixture<RRNumberField>('<rr-number-field disabled></rr-number-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('disables decrement button at minimum value', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="0" min="0"></rr-number-field>');
		await waitForUpdate(el);
		const [decrement] = el.shadowRoot!.querySelectorAll('rr-icon-button');
		await waitForUpdate(decrement);
		expect((decrement as any).disabled).toBe(true);
	});

	it('disables increment button at maximum value', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="10" max="10"></rr-number-field>');
		await waitForUpdate(el);
		const buttons = el.shadowRoot!.querySelectorAll('rr-icon-button');
		const increment = buttons[1];
		await waitForUpdate(increment);
		expect((increment as any).disabled).toBe(true);
	});

	it('disables both buttons when component is disabled', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" disabled></rr-number-field>');
		await waitForUpdate(el);
		const [decrement, increment] = el.shadowRoot!.querySelectorAll('rr-icon-button');
		await waitForUpdate(decrement);
		await waitForUpdate(increment);
		expect((decrement as any).disabled).toBe(true);
		expect((increment as any).disabled).toBe(true);
	});
});


/* ============================================================
   Increment & decrement
   ============================================================ */

describe('rr-number-field – increment & decrement', () => {
	let el: RRNumberField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('increments value by step', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" step="1"></rr-number-field>');
		await waitForUpdate(el);
		el._handleIncrease();
		expect(el.value).toBe(6);
	});

	it('decrements value by step', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" step="1"></rr-number-field>');
		await waitForUpdate(el);
		el._handleDecrease();
		expect(el.value).toBe(4);
	});

	it('respects custom step size', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="0" step="5"></rr-number-field>');
		await waitForUpdate(el);
		el._handleIncrease();
		expect(el.value).toBe(5);
	});

	it('clamps value to max on increment', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="9" max="10"></rr-number-field>');
		await waitForUpdate(el);
		el._handleIncrease();
		expect(el.value).toBe(10);
		el._handleIncrease();
		expect(el.value).toBe(10);
	});

	it('clamps value to min on decrement', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="1" min="0"></rr-number-field>');
		await waitForUpdate(el);
		el._handleDecrease();
		expect(el.value).toBe(0);
		el._handleDecrease();
		expect(el.value).toBe(0);
	});

	it('does not increment when disabled', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" disabled></rr-number-field>');
		await waitForUpdate(el);
		el._handleIncrease();
		expect(el.value).toBe(5);
	});

	it('does not decrement when disabled', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" disabled></rr-number-field>');
		await waitForUpdate(el);
		el._handleDecrease();
		expect(el.value).toBe(5);
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-number-field – change event', () => {
	let el: RRNumberField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches input and change events on increment', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" max="10"></rr-number-field>');
		await waitForUpdate(el);
		let inputDetail: any;
		let changeDetail: any;
		el.addEventListener('input', ((e: CustomEvent) => { inputDetail = e.detail; }) as EventListener);
		el.addEventListener('change', ((e: CustomEvent) => { changeDetail = e.detail; }) as EventListener);
		el._handleIncrease();
		expect(inputDetail?.value).toBe(6);
		expect(changeDetail?.value).toBe(6);
	});

	it('dispatches input and change events on decrement', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="5" min="0"></rr-number-field>');
		await waitForUpdate(el);
		let inputDetail: any;
		let changeDetail: any;
		el.addEventListener('input', ((e: CustomEvent) => { inputDetail = e.detail; }) as EventListener);
		el.addEventListener('change', ((e: CustomEvent) => { changeDetail = e.detail; }) as EventListener);
		el._handleDecrease();
		expect(inputDetail?.value).toBe(4);
		expect(changeDetail?.value).toBe(4);
	});

	it('does not dispatch events when value would not change', async () => {
		el = await fixture<RRNumberField>('<rr-number-field value="10" max="10"></rr-number-field>');
		await waitForUpdate(el);
		let eventFired = false;
		el.addEventListener('input', () => { eventFired = true; });
		el._handleIncrease();
		expect(eventFired).toBe(false);
	});
});


/* ============================================================
   Accessibility
   ============================================================ */

describe('rr-number-field – accessibility', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('warns when accessible-label is not provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture('<rr-number-field></rr-number-field>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(
			expect.stringContaining('accessible-label')
		);
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture('<rr-number-field accessible-label="Aantal"></rr-number-field>');
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});
});

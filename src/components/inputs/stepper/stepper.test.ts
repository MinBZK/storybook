import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDStepper } from './ndd-stepper.ts';
import './ndd-stepper.ts';

describe('ndd-stepper', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-stepper></ndd-stepper>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders two ndd-icon-button elements', async () => {
		el = await fixture('<ndd-stepper></ndd-stepper>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('ndd-icon-button').length).toBe(2);
	});
});


/* ============================================================
   State
   ============================================================ */

describe('ndd-stepper – state', () => {
	let el: NDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('has default value of 0', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper></ndd-stepper>');
		await waitForUpdate(el);
		expect(el.value).toBe(0);
	});

	it('reflects value attribute', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5"></ndd-stepper>');
		await waitForUpdate(el);
		expect(el.value).toBe(5);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper disabled></ndd-stepper>');
		await waitForUpdate(el);
		const buttons = el.shadowRoot!.querySelectorAll('ndd-icon-button');
		buttons.forEach(async btn => {
			await waitForUpdate(btn);
			expect((btn as any).disabled).toBe(true);
		});
	});

	it('disables decrement button at minimum value', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="0" min="0"></ndd-stepper>');
		await waitForUpdate(el);
		const [decrement] = el.shadowRoot!.querySelectorAll('ndd-icon-button');
		await waitForUpdate(decrement);
		expect((decrement as any).disabled).toBe(true);
	});

	it('disables increment button at maximum value', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="10" max="10"></ndd-stepper>');
		await waitForUpdate(el);
		const buttons = el.shadowRoot!.querySelectorAll('ndd-icon-button');
		const increment = buttons[1];
		await waitForUpdate(increment);
		expect((increment as any).disabled).toBe(true);
	});
});


/* ============================================================
   Increment & decrement
   ============================================================ */

describe('ndd-stepper – increment & decrement', () => {
	let el: NDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('increments value by step', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5" step="1" max="10"></ndd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(6);
	});

	it('decrements value by step', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5" step="1" min="0"></ndd-stepper>');
		await waitForUpdate(el);
		el._decrement();
		expect(el.value).toBe(4);
	});

	it('does not exceed max on increment', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="10" max="10"></ndd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(10);
	});

	it('does not go below min on decrement', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="0" min="0"></ndd-stepper>');
		await waitForUpdate(el);
		el._decrement();
		expect(el.value).toBe(0);
	});

	it('does not increment when disabled', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5" disabled></ndd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(5);
	});

	it('does not decrement when disabled', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5" disabled></ndd-stepper>');
		await waitForUpdate(el);
		el._decrement();
		expect(el.value).toBe(5);
	});

	it('respects custom step size', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="0" step="5" max="100"></ndd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(5);
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('ndd-stepper – change event', () => {
	let el: NDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches change event on increment with value detail', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5" max="10"></ndd-stepper>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._increment();
		expect(detail).toBeDefined();
		expect(detail.value).toBe(6);
	});

	it('dispatches change event on decrement with value detail', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="5" min="0"></ndd-stepper>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._decrement();
		expect(detail).toBeDefined();
		expect(detail.value).toBe(4);
	});

	it('does not dispatch change when value is already at max', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="10" max="10"></ndd-stepper>');
		await waitForUpdate(el);
		let changeFired = false;
		el.addEventListener('change', () => { changeFired = true; });
		el._increment();
		expect(changeFired).toBe(false);
	});

	it('does not dispatch change when value is already at min', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper value="0" min="0"></ndd-stepper>');
		await waitForUpdate(el);
		let changeFired = false;
		el.addEventListener('change', () => { changeFired = true; });
		el._decrement();
		expect(changeFired).toBe(false);
	});
});


/* ============================================================
   Translations
   ============================================================ */

describe('ndd-stepper – translations', () => {
	let el: NDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses Dutch defaults when no translations are set', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper></ndd-stepper>');
		await waitForUpdate(el);
		expect(el._t('components.stepper.decrement-action')).toBe('Verlaag aantal');
		expect(el._t('components.stepper.increment-action')).toBe('Verhoog aantal');
		expect(el._t('components.stepper.to-adjust-value-action')).toBe('Aantal aanpassen');
	});

	it('overrides a single translation key', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper></ndd-stepper>');
		await waitForUpdate(el);
		el.translations = { 'components.stepper.decrement-action': 'Decrease' };
		expect(el._t('components.stepper.decrement-action')).toBe('Decrease');
	});

	it('falls back to Dutch for keys not present in translations override', async () => {
		el = await fixture<NDDStepper>('<ndd-stepper></ndd-stepper>');
		await waitForUpdate(el);
		el.translations = { 'components.stepper.decrement-action': 'Decrease' };
		expect(el._t('components.stepper.increment-action')).toBe('Verhoog aantal');
	});
});

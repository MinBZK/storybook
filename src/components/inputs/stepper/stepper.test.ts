import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDStepper } from './stepper.js';
import './stepper.js';

describe('nldd-stepper', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders two nldd-icon-button elements', async () => {
		el = await fixture('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelectorAll('nldd-icon-button').length).toBe(2);
	});
});


/* ============================================================
   Size
   ============================================================ */

describe('nldd-stepper – size', () => {
	let el: NLDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('defaults size to md', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		expect(el.size).toBe('md');
	});

	it('reflects size="xs" to host and propagates to icon buttons', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper size="xs"></nldd-stepper>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('xs');
		const buttons = el.shadowRoot!.querySelectorAll('nldd-icon-button');
		expect(buttons[0].getAttribute('size')).toBe('xs');
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-stepper – state', () => {
	let el: NLDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('has default value of 0', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		expect(el.value).toBe(0);
	});

	it('reflects value attribute', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5"></nldd-stepper>');
		await waitForUpdate(el);
		expect(el.value).toBe(5);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper disabled></nldd-stepper>');
		await waitForUpdate(el);
		const buttons = el.shadowRoot!.querySelectorAll('nldd-icon-button');
		buttons.forEach(async btn => {
			await waitForUpdate(btn);
			expect((btn as any).disabled).toBe(true);
		});
	});

	it('disables decrement button at minimum value', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="0" min="0"></nldd-stepper>');
		await waitForUpdate(el);
		const [decrement] = el.shadowRoot!.querySelectorAll('nldd-icon-button');
		await waitForUpdate(decrement);
		expect((decrement as any).disabled).toBe(true);
	});

	it('disables increment button at maximum value', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="10" max="10"></nldd-stepper>');
		await waitForUpdate(el);
		const buttons = el.shadowRoot!.querySelectorAll('nldd-icon-button');
		const increment = buttons[1];
		await waitForUpdate(increment);
		expect((increment as any).disabled).toBe(true);
	});
});


/* ============================================================
   Increment & decrement
   ============================================================ */

describe('nldd-stepper – increment & decrement', () => {
	let el: NLDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('increments value by step', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5" step="1" max="10"></nldd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(6);
	});

	it('decrements value by step', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5" step="1" min="0"></nldd-stepper>');
		await waitForUpdate(el);
		el._decrement();
		expect(el.value).toBe(4);
	});

	it('does not exceed max on increment', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="10" max="10"></nldd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(10);
	});

	it('does not go below min on decrement', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="0" min="0"></nldd-stepper>');
		await waitForUpdate(el);
		el._decrement();
		expect(el.value).toBe(0);
	});

	it('does not increment when disabled', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5" disabled></nldd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(5);
	});

	it('does not decrement when disabled', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5" disabled></nldd-stepper>');
		await waitForUpdate(el);
		el._decrement();
		expect(el.value).toBe(5);
	});

	it('respects custom step size', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="0" step="5" max="100"></nldd-stepper>');
		await waitForUpdate(el);
		el._increment();
		expect(el.value).toBe(5);
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('nldd-stepper – change event', () => {
	let el: NLDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches change event on increment with value detail', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5" max="10"></nldd-stepper>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._increment();
		expect(detail).toBeDefined();
		expect(detail.value).toBe(6);
	});

	it('dispatches change event on decrement with value detail', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="5" min="0"></nldd-stepper>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		el._decrement();
		expect(detail).toBeDefined();
		expect(detail.value).toBe(4);
	});

	it('does not dispatch change when value is already at max', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="10" max="10"></nldd-stepper>');
		await waitForUpdate(el);
		let changeFired = false;
		el.addEventListener('change', () => { changeFired = true; });
		el._increment();
		expect(changeFired).toBe(false);
	});

	it('does not dispatch change when value is already at min', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper value="0" min="0"></nldd-stepper>');
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

describe('nldd-stepper – translations', () => {
	let el: NLDDStepper;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses Dutch defaults when no translations are set', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		expect(el._t('components.stepper.decrement-action')).toBe('Verlaag aantal');
		expect(el._t('components.stepper.increment-action')).toBe('Verhoog aantal');
		expect(el._t('components.stepper.to-adjust-value-action')).toBe('Aantal aanpassen');
	});

	it('overrides a single translation key', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		el.translations = { 'components.stepper.decrement-action': 'Decrease' };
		expect(el._t('components.stepper.decrement-action')).toBe('Decrease');
	});

	it('falls back to Dutch for keys not present in translations override', async () => {
		el = await fixture<NLDDStepper>('<nldd-stepper></nldd-stepper>');
		await waitForUpdate(el);
		el.translations = { 'components.stepper.decrement-action': 'Decrease' };
		expect(el._t('components.stepper.increment-action')).toBe('Verhoog aantal');
	});
});

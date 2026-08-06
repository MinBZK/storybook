import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDRadioButton } from './radio-button.js';
import './radio-button.js';

describe('nldd-radio-button', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-radio-button></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native radio input', async () => {
		el = await fixture('<nldd-radio-button></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="radio"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-radio-button – state', () => {
	let el: NLDDRadioButton;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button checked></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button disabled></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
	});

	it('forwards value to the native input', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button value="option-a"></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.value).toBe('option-a');
	});

	it('forwards name to the native input', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button name="group1"></nldd-radio-button>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.name).toBe('group1');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('nldd-radio-button – change event', () => {
	let el: NLDDRadioButton | HTMLFormElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked property when native input changes', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button></nldd-radio-button>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked, value and name detail', async () => {
		el = await fixture<NLDDRadioButton>('<nldd-radio-button name="group1" value="option-a"></nldd-radio-button>');
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

	it('participates in FormData when checked', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-radio-button name="opt" value="a" checked></nldd-radio-button></form>');
		el = form;
		const rb = form.querySelector('nldd-radio-button')!;
		await waitForUpdate(rb);
		expect(new FormData(form).get('opt')).toBe('a');
	});

	it('is omitted from FormData when unchecked', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-radio-button name="opt" value="a"></nldd-radio-button></form>');
		el = form;
		const rb = form.querySelector('nldd-radio-button')!;
		await waitForUpdate(rb);
		expect(new FormData(form).has('opt')).toBe(false);
	});

	it('resets to the HTML-declared initial checked state when the parent form is reset', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-radio-button name="opt" value="a" checked></nldd-radio-button></form>');
		el = form;
		const rb = form.querySelector<NLDDRadioButton>('nldd-radio-button')!;
		await waitForUpdate(rb);
		rb.checked = false;
		await waitForUpdate(rb);
		form.reset();
		expect(rb.checked).toBe(true);
	});
	// Decorative: the shape without a control, for a row that is the control.
	describe('decorative', () => {
		it('rendert geen input', async () => {
			el = await fixture(`<nldd-radio-button decorative checked></nldd-radio-button>`);
			await waitForUpdate(el);
			expect(el.shadowRoot!.querySelector('.radio-button__input')).toBeNull();
			expect(el.shadowRoot!.querySelector('input')).toBeNull();
		});

		it('is niet focusbaar', async () => {
			el = await fixture(`<nldd-radio-button decorative></nldd-radio-button>`);
			await waitForUpdate(el);
			expect(el.shadowRoot!.querySelector('[tabindex]')).toBeNull();
		});
	});

});

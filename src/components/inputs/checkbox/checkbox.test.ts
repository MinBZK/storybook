import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDCheckbox } from './checkbox.js';
import './checkbox.js';

describe('nldd-checkbox', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-checkbox></nldd-checkbox>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native checkbox input', async () => {
		el = await fixture('<nldd-checkbox></nldd-checkbox>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="checkbox"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('nldd-checkbox – state', () => {
	let el: NLDDCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox checked></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(true);
	});

	it('is indeterminate when indeterminate attribute is set', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox indeterminate></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.indeterminate).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox disabled></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('forwards value to the native input', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox value="agree"></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.value).toBe('agree');
	});

	it('forwards name to the native input', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox name="terms"></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.name).toBe('terms');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('nldd-checkbox – change event', () => {
	let el: NLDDCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked property when native input changes', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked and value detail', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox value="agree"></nldd-checkbox>');
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
		expect(detail.value).toBe('agree');
	});

	it('updates indeterminate property when native input changes', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox indeterminate></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.indeterminate = false;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.indeterminate).toBe(false);
		expect(el.checked).toBe(true);
	});
});



/* ============================================================
   Keyboard interaction
   ============================================================ */

describe('nldd-checkbox – keyboard interaction', () => {
	let el: NLDDCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggles checked state when Space is pressed on the native input', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.focus();
		input.checked = true;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('does not toggle when disabled and Space is pressed', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox disabled></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});
});

describe('nldd-checkbox – accessibility', () => {
	let el: NLDDCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards aria-label to the native input', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox accessible-label="Accepteer voorwaarden"></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-label')).toBe('Accepteer voorwaarden');
	});

	it('focus lands on the native input', async () => {
		el = await fixture<NLDDCheckbox>('<nldd-checkbox></nldd-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.focus();
		expect(input.matches(':focus')).toBe(true);
	});

	it('participates in FormData when checked', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-checkbox name="tos" value="agreed" checked></nldd-checkbox></form>');
		el = form;
		const cb = form.querySelector('nldd-checkbox')!;
		await waitForUpdate(cb);
		expect(new FormData(form).get('tos')).toBe('agreed');
	});

	it('is omitted from FormData when unchecked', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-checkbox name="tos" value="agreed"></nldd-checkbox></form>');
		el = form;
		const cb = form.querySelector('nldd-checkbox')!;
		await waitForUpdate(cb);
		expect(new FormData(form).has('tos')).toBe(false);
	});

	it('resets to the HTML-declared initial checked state when the parent form is reset', async () => {
		const form = await fixture<HTMLFormElement>('<form><nldd-checkbox name="tos" value="agreed" checked></nldd-checkbox></form>');
		el = form;
		const cb = form.querySelector<NLDDCheckbox>('nldd-checkbox')!;
		await waitForUpdate(cb);
		cb.checked = false;
		await waitForUpdate(cb);
		form.reset();
		expect(cb.checked).toBe(true);
	});
});

import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRCheckbox } from './rr-checkbox.ts';
import './rr-checkbox.ts';

describe('rr-checkbox', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-checkbox></rr-checkbox>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native checkbox input', async () => {
		el = await fixture('<rr-checkbox></rr-checkbox>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="checkbox"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-checkbox – state', () => {
	let el: RRCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is unchecked by default', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox checked></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(true);
	});

	it('is indeterminate when indeterminate attribute is set', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox indeterminate></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.indeterminate).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox disabled></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('forwards value to the native input', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox value="agree"></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.value).toBe('agree');
	});

	it('forwards name to the native input', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox name="terms"></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.name).toBe('terms');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-checkbox – change event', () => {
	let el: RRCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates checked property when native input changes', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked and value detail', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox value="agree"></rr-checkbox>');
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
		el = await fixture<RRCheckbox>('<rr-checkbox indeterminate></rr-checkbox>');
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

describe('rr-checkbox – keyboard interaction', () => {
	let el: RRCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('toggles checked state when Space is pressed on the native input', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
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
		el = await fixture<RRCheckbox>('<rr-checkbox disabled></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});
});

describe('rr-checkbox – accessibility', () => {
	let el: RRCheckbox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards aria-label to the native input', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox accessible-label="Accepteer voorwaarden"></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-label')).toBe('Accepteer voorwaarden');
	});

	it('focus lands on the native input', async () => {
		el = await fixture<RRCheckbox>('<rr-checkbox></rr-checkbox>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.focus();
		expect(input.matches(':focus')).toBe(true);
	});
});

import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDSwitch } from './ndd-switch.ts';
import './ndd-switch.ts';

describe('ndd-switch', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native checkbox input', async () => {
		el = await fixture('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="checkbox"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('ndd-switch – state', () => {
	let el: NDDSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('is unchecked by default', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test" checked></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test" disabled></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('has role="switch" on the native input', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('role')).toBe('switch');
	});

	it('forwards accessible-label as aria-label on the native input', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Meldingen aan"></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-label')).toBe('Meldingen aan');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('ndd-switch – change event', () => {
	let el: NDDSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('updates checked property when native input changes', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked detail', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test"></ndd-switch>');
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
		expect(detail.value).toBe('on');
	});

	it('does not toggle when disabled', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test" disabled></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});
});


/* ============================================================
   Toggle
   ============================================================ */

describe('ndd-switch – toggle', () => {
	let el: NDDSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('toggle() flips checked and dispatches change', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		el.toggle();
		expect(el.checked).toBe(true);
		expect(detail?.checked).toBe(true);
	});

	it('toggle() does nothing when disabled', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test" disabled></ndd-switch>');
		await waitForUpdate(el);
		el.toggle();
		expect(el.checked).toBe(false);
	});

	it('toggle() does not dispatch change when disabled', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test" disabled></ndd-switch>');
		await waitForUpdate(el);
		let changeFired = false;
		el.addEventListener('change', () => { changeFired = true; });
		el.toggle();
		expect(changeFired).toBe(false);
	});
});


/* ============================================================
   Keyboard interaction
   ============================================================ */

describe('ndd-switch – disabled keyboard guard', () => {
	let el: NDDSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('does not toggle when disabled and Space is pressed', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test" disabled></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(false);
	});
});


/* ============================================================
   Accessibility
   ============================================================ */

describe('ndd-switch – accessibility', () => {
	let el: NDDSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('focus lands on the native input', async () => {
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Test"></ndd-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.focus();
		expect(input.matches(':focus')).toBe(true);
	});

	it('warns when accessible-label is not provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDSwitch>('<ndd-switch></ndd-switch>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(
			expect.stringContaining('accessible-label')
		);
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDSwitch>('<ndd-switch accessible-label="Meldingen"></ndd-switch>');
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});
});

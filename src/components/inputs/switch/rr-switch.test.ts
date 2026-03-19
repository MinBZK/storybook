import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRSwitch } from './rr-switch.ts';
import './rr-switch.ts';

describe('rr-switch', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('renders without error', async () => {
		el = await fixture('<rr-switch accessible-label="Test"></rr-switch>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native checkbox input', async () => {
		el = await fixture('<rr-switch accessible-label="Test"></rr-switch>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="checkbox"]')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-switch – state', () => {
	let el: RRSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('is unchecked by default', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test"></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(false);
	});

	it('is checked when checked attribute is set', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test" checked></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.checked).toBe(true);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test" disabled></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.disabled).toBe(true);
	});

	it('has role="switch" on the native input', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test"></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('role')).toBe('switch');
	});

	it('forwards accessible-label as aria-label on the native input', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Meldingen aan"></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		expect(input.getAttribute('aria-label')).toBe('Meldingen aan');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-switch – change event', () => {
	let el: RRSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('updates checked property when native input changes', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test"></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.checked).toBe(true);
	});

	it('dispatches a change event with checked detail', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test"></rr-switch>');
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
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test" disabled></rr-switch>');
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

describe('rr-switch – toggle', () => {
	let el: RRSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('toggle() flips checked and dispatches change', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test"></rr-switch>');
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
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test" disabled></rr-switch>');
		await waitForUpdate(el);
		el.toggle();
		expect(el.checked).toBe(false);
	});

	it('toggle() does not dispatch change when disabled', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test" disabled></rr-switch>');
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

describe('rr-switch – disabled keyboard guard', () => {
	let el: RRSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('does not toggle when disabled and Space is pressed', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test" disabled></rr-switch>');
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

describe('rr-switch – accessibility', () => {
	let el: RRSwitch;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('focus lands on the native input', async () => {
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Test"></rr-switch>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		input.focus();
		expect(input.matches(':focus')).toBe(true);
	});

	it('warns when accessible-label is not provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRSwitch>('<rr-switch></rr-switch>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(
			expect.stringContaining('accessible-label')
		);
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRSwitch>('<rr-switch accessible-label="Meldingen"></rr-switch>');
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});
});

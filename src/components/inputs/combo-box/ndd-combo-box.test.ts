import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDComboBox } from './ndd-combo-box.ts';
import './ndd-combo-box.ts';
import '../../lists-and-menus/menu/ndd-menu.ts';

describe('ndd-combo-box', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native text input', async () => {
		el = await fixture('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="text"]')).not.toBeNull();
	});

	it('renders ndd-icon-button for the picker', async () => {
		el = await fixture('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-icon-button')).not.toBeNull();
	});
});


/* ============================================================
   ARIA
   ============================================================ */

describe('ndd-combo-box – ARIA', () => {
	let el: NDDComboBox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets role="combobox" on the native input', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('role')).toBe('combobox');
	});

	it('sets aria-expanded="false" when closed', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-expanded')).toBe('false');
	});

	it('sets aria-autocomplete="list"', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-autocomplete')).toBe('list');
	});

	it('sets aria-haspopup="listbox"', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-haspopup')).toBe('listbox');
	});

	it('sets aria-controls to the menu id', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-controls')).toBe(el._menuId);
	});
});


/* ============================================================
   State
   ============================================================ */

describe('ndd-combo-box – state', () => {
	let el: NDDComboBox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards placeholder to native input', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box placeholder="Zoek..."></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('placeholder')).toBe('Zoek...');
	});

	it('forwards name to native input', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box name="land"></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.name).toBe('land');
	});

	it('disables native input when disabled', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box disabled></ndd-combo-box>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
	});
});


/* ============================================================
   Input event
   ============================================================ */

describe('ndd-combo-box – input event', () => {
	let el: NDDComboBox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates _displayValue on input', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Neder';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(el._displayValue).toBe('Neder');
	});

	it('dispatches input event with displayValue detail', async () => {
		el = await fixture<NDDComboBox>('<ndd-combo-box></ndd-combo-box>');
		await waitForUpdate(el);
		let detail: any;
		el.addEventListener('input', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'test';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		expect(detail?.value).toBe('test');
	});
});


/* ============================================================
   Filtering
   ============================================================ */

describe('ndd-combo-box – filtering', () => {
	let el: NDDComboBox;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('filters ndd-menu-item elements on input', async () => {
		el = await fixture<NDDComboBox>(`
			<ndd-combo-box>
				<ndd-menu>
					<ndd-menu-item text="Nederland" value="nl"></ndd-menu-item>
					<ndd-menu-item text="België" value="be"></ndd-menu-item>
				</ndd-menu>
			</ndd-combo-box>
		`);
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Ned';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);

		const menu = document.getElementById(el._menuId)!;
		const items = menu.querySelectorAll('ndd-menu-item');
		expect(items[0].hasAttribute('hidden')).toBe(false);
		expect(items[1].hasAttribute('hidden')).toBe(true);
	});

	it('matches on search attribute', async () => {
		el = await fixture<NDDComboBox>(`
			<ndd-combo-box>
				<ndd-menu>
					<ndd-menu-item text="Nederland" value="nl" search="dutch holland"></ndd-menu-item>
					<ndd-menu-item text="België" value="be"></ndd-menu-item>
				</ndd-menu>
			</ndd-combo-box>
		`);
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'dutch';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);

		const menu = document.getElementById(el._menuId)!;
		const items = menu.querySelectorAll('ndd-menu-item');
		expect(items[0].hasAttribute('hidden')).toBe(false);
		expect(items[1].hasAttribute('hidden')).toBe(true);
	});
});


/* ============================================================
   Popover API
   ============================================================ */

describe('ndd-combo-box – Popover API', () => {
	let el: NDDComboBox;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('warns when Popover API is unavailable', async () => {
		el = await fixture<NDDComboBox>(`
			<ndd-combo-box>
				<ndd-menu>
					<ndd-menu-item text="Nederland" value="nl"></ndd-menu-item>
				</ndd-menu>
			</ndd-combo-box>
		`);
		await waitForUpdate(el);

		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

		// Simulate missing Popover API by deleting showPopover from the prototype
		const proto = HTMLElement.prototype;
		const original = proto.showPopover;
		// @ts-ignore
		delete proto.showPopover;

		el._openMenu(false);

		expect(warnSpy).toHaveBeenCalledWith(
			expect.stringContaining('Popover API')
		);

		proto.showPopover = original;
	});
});

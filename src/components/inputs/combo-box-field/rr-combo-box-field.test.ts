import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRComboBoxField } from './rr-combo-box-field.ts';
import './rr-combo-box-field.ts';
import '../../lists-and-menus/menu/rr-menu.ts';

describe('rr-combo-box-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native text input', async () => {
		el = await fixture('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input[type="text"]')).not.toBeNull();
	});

	it('renders rr-icon-button for the picker', async () => {
		el = await fixture('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-icon-button')).not.toBeNull();
	});
});


/* ============================================================
   ARIA
   ============================================================ */

describe('rr-combo-box-field – ARIA', () => {
	let el: RRComboBoxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets role="combobox" on the native input', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('role')).toBe('combobox');
	});

	it('sets aria-expanded="false" when closed', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-expanded')).toBe('false');
	});

	it('sets aria-autocomplete="list"', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-autocomplete')).toBe('list');
	});

	it('sets aria-haspopup="listbox"', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-haspopup')).toBe('listbox');
	});

	it('sets aria-controls to the menu id', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-controls')).toBe(el._menuId);
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-combo-box-field – state', () => {
	let el: RRComboBoxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards placeholder to native input', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field placeholder="Zoek..."></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('placeholder')).toBe('Zoek...');
	});

	it('forwards name to native input', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field name="land"></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.name).toBe('land');
	});

	it('disables native input when disabled', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field disabled></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.disabled).toBe(true);
	});
});


/* ============================================================
   Input event
   ============================================================ */

describe('rr-combo-box-field – input event', () => {
	let el: RRComboBoxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates _displayValue on input', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Neder';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(el._displayValue).toBe('Neder');
	});

	it('dispatches input event with displayValue detail', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
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

describe('rr-combo-box-field – filtering', () => {
	let el: RRComboBoxField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('filters rr-menu-item elements on input', async () => {
		el = await fixture<RRComboBoxField>(`
			<rr-combo-box-field>
				<rr-menu>
					<rr-menu-item text="Nederland" value="nl"></rr-menu-item>
					<rr-menu-item text="België" value="be"></rr-menu-item>
				</rr-menu>
			</rr-combo-box-field>
		`);
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Ned';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);

		const menu = document.getElementById(el._menuId)!;
		const items = menu.querySelectorAll('rr-menu-item');
		expect(items[0].hasAttribute('hidden')).toBe(false);
		expect(items[1].hasAttribute('hidden')).toBe(true);
	});

	it('matches on search attribute', async () => {
		el = await fixture<RRComboBoxField>(`
			<rr-combo-box-field>
				<rr-menu>
					<rr-menu-item text="Nederland" value="nl" search="dutch holland"></rr-menu-item>
					<rr-menu-item text="België" value="be"></rr-menu-item>
				</rr-menu>
			</rr-combo-box-field>
		`);
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'dutch';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);

		const menu = document.getElementById(el._menuId)!;
		const items = menu.querySelectorAll('rr-menu-item');
		expect(items[0].hasAttribute('hidden')).toBe(false);
		expect(items[1].hasAttribute('hidden')).toBe(true);
	});
});


/* ============================================================
   Popover API
   ============================================================ */

describe('rr-combo-box-field – Popover API', () => {
	let el: RRComboBoxField;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('warns when Popover API is unavailable', async () => {
		el = await fixture<RRComboBoxField>(`
			<rr-combo-box-field>
				<rr-menu>
					<rr-menu-item text="Nederland" value="nl"></rr-menu-item>
				</rr-menu>
			</rr-combo-box-field>
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

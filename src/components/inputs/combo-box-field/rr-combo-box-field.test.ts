import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRComboBoxField } from './rr-combo-box-field.ts';
import './rr-combo-box-field.ts';

const sampleOptions = [
	{ text: 'Nederland', value: 'nl' },
	{ text: 'België', value: 'be' },
	{ text: 'Duitsland', value: 'de' },
];

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

	it('sets aria-haspopup="menu"', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('input')!.getAttribute('aria-haspopup')).toBe('menu');
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

	it('creates rr-menu-item elements from options', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		(el as RRComboBoxField).options = sampleOptions;
		await waitForUpdate(el);
		const menu = document.getElementById((el as RRComboBoxField)._menuId);
		expect(menu?.querySelectorAll('rr-menu-item').length).toBe(3);
	});

	it('creates rr-menu-divider for divider options', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		(el as RRComboBoxField).options = [
			{ text: 'Nederland', value: 'nl' },
			{ type: 'divider' },
			{ text: 'België', value: 'be' },
		];
		await waitForUpdate(el);
		const menu = document.getElementById((el as RRComboBoxField)._menuId);
		expect(menu?.querySelector('rr-menu-divider')).not.toBeNull();
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

	it('updates value on input', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		await waitForUpdate(el);
		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Neder';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.value).toBe('Neder');
	});

	it('dispatches input event with value detail', async () => {
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

	it('hides non-matching items when filtering', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		(el as RRComboBoxField).options = sampleOptions;
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Ned';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);

		const menu = document.getElementById((el as RRComboBoxField)._menuId)!;
		const items = menu.querySelectorAll('rr-menu-item');
		expect(items[0].hasAttribute('hidden')).toBe(false);
		expect(items[1].hasAttribute('hidden')).toBe(true);
		expect(items[2].hasAttribute('hidden')).toBe(true);
	});

	it('shows all items when input is cleared', async () => {
		el = await fixture<RRComboBoxField>('<rr-combo-box-field></rr-combo-box-field>');
		(el as RRComboBoxField).options = sampleOptions;
		await waitForUpdate(el);

		const input = el.shadowRoot!.querySelector('input')!;
		(input as any).value = 'Ned';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		(input as any).value = '';
		input.dispatchEvent(new Event('input', { bubbles: true }));
		await waitForUpdate(el);

		const menu = document.getElementById((el as RRComboBoxField)._menuId)!;
		menu.querySelectorAll('rr-menu-item').forEach(item => {
			expect(item.hasAttribute('hidden')).toBe(false);
		});
	});
});

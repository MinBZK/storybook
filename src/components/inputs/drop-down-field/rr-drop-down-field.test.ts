import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRDropDownField } from './rr-drop-down-field.ts';
import './rr-drop-down-field.ts';

describe('rr-drop-down-field', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-drop-down-field></rr-drop-down-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a native select', async () => {
		el = await fixture('<rr-drop-down-field></rr-drop-down-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('select')).not.toBeNull();
	});

	it('renders rr-icon for the chevron', async () => {
		el = await fixture('<rr-drop-down-field></rr-drop-down-field>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('rr-icon')).not.toBeNull();
	});
});


/* ============================================================
   State
   ============================================================ */

describe('rr-drop-down-field – state', () => {
	let el: RRDropDownField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('is disabled when disabled attribute is set', async () => {
		el = await fixture<RRDropDownField>('<rr-drop-down-field disabled></rr-drop-down-field>');
		await waitForUpdate(el);
		const select = el.shadowRoot!.querySelector('select')!;
		expect(select.disabled).toBe(true);
	});

	it('forwards name to native select', async () => {
		el = await fixture<RRDropDownField>('<rr-drop-down-field name="land"></rr-drop-down-field>');
		await waitForUpdate(el);
		const select = el.shadowRoot!.querySelector('select')!;
		expect(select.name).toBe('land');
	});
});


/* ============================================================
   Slot & options
   ============================================================ */

describe('rr-drop-down-field – slot & options', () => {
	let el: RRDropDownField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('clones slotted options into the shadow select', async () => {
		el = await fixture<RRDropDownField>(`
			<rr-drop-down-field>
				<option value="nl">Nederland</option>
				<option value="be">België</option>
			</rr-drop-down-field>
		`);
		await waitForUpdate(el);
		const select = el.shadowRoot!.querySelector('select')!;
		expect(select.options.length).toBe(2);
		expect(select.options[0].value).toBe('nl');
		expect(select.options[1].value).toBe('be');
	});

	it('displays the selected option text', async () => {
		el = await fixture<RRDropDownField>(`
			<rr-drop-down-field value="nl">
				<option value="nl">Nederland</option>
				<option value="be">België</option>
			</rr-drop-down-field>
		`);
		await waitForUpdate(el);
		expect(el._displayValue).toBe('Nederland');
	});

	it('supports a placeholder option', async () => {
		el = await fixture<RRDropDownField>(`
			<rr-drop-down-field>
				<option value="" disabled selected>Selecteer een land</option>
				<option value="nl">Nederland</option>
			</rr-drop-down-field>
		`);
		await waitForUpdate(el);
		expect(el._displayValue).toBe('Selecteer een land');
	});
});


/* ============================================================
   Change event
   ============================================================ */

describe('rr-drop-down-field – change event', () => {
	let el: RRDropDownField;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates value and displayValue when native select changes', async () => {
		el = await fixture<RRDropDownField>(`
			<rr-drop-down-field>
				<option value="nl">Nederland</option>
				<option value="be">België</option>
			</rr-drop-down-field>
		`);
		await waitForUpdate(el);
		const select = el.shadowRoot!.querySelector('select')!;
		select.value = 'be';
		select.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el.value).toBe('be');
		expect(el._displayValue).toBe('België');
	});

	it('dispatches a change event with value detail', async () => {
		el = await fixture<RRDropDownField>(`
			<rr-drop-down-field>
				<option value="nl">Nederland</option>
				<option value="be">België</option>
			</rr-drop-down-field>
		`);
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		const select = el.shadowRoot!.querySelector('select')!;
		select.value = 'be';
		select.dispatchEvent(new Event('change', { bubbles: true }));

		expect(detail).toBeDefined();
		expect(detail.value).toBe('be');
	});
});

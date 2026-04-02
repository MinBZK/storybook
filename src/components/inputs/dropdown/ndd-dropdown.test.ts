import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDDropdown } from './ndd-dropdown.ts';
import './ndd-dropdown.ts';

function selectFixture(): string {
	return `
		<ndd-dropdown>
			<select name="land" aria-label="Land">
				<option value="" disabled selected>Selecteer een land</option>
				<option value="nl">Nederland</option>
				<option value="be">België</option>
			</select>
		</ndd-dropdown>
	`;
}

describe('ndd-dropdown', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-dropdown></ndd-dropdown>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders ndd-icon for the chevron', async () => {
		el = await fixture('<ndd-dropdown></ndd-dropdown>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('ndd-icon')).not.toBeNull();
	});
});

/* ============================================================
   State
   ============================================================ */

describe('ndd-dropdown – state', () => {
	let el: NDDDropdown;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('forwards disabled to slotted select', async () => {
		el = await fixture<NDDDropdown>(`
			<ndd-dropdown disabled>
				<select name="land" aria-label="Land">
					<option value="nl">Nederland</option>
				</select>
			</ndd-dropdown>
		`);
		await waitForUpdate(el);
		const select = el.querySelector('select')!;
		expect(select.disabled).toBe(true);
	});

	it('displays the selected option text', async () => {
		el = await fixture<NDDDropdown>(`
			<ndd-dropdown>
				<select name="land" aria-label="Land">
					<option value="nl" selected>Nederland</option>
					<option value="be">België</option>
				</select>
			</ndd-dropdown>
		`);
		await waitForUpdate(el);
		expect(el._displayValue).toBe('Nederland');
	});

	it('supports a placeholder option', async () => {
		el = await fixture<NDDDropdown>(`
			<ndd-dropdown>
				<select name="land" aria-label="Land">
					<option value="" disabled selected>Selecteer een land</option>
					<option value="nl">Nederland</option>
				</select>
			</ndd-dropdown>
		`);
		await waitForUpdate(el);
		expect(el._displayValue).toBe('Selecteer een land');
	});

	it('re-enables slotted select when disabled is removed', async () => {
		el = await fixture<NDDDropdown>(`
			<ndd-dropdown disabled>
				<select name="land" aria-label="Land">
					<option value="nl">Nederland</option>
				</select>
			</ndd-dropdown>
		`);
		await waitForUpdate(el);
		el.disabled = false;
		await waitForUpdate(el);
		const select = el.querySelector('select')!;
		expect(select.disabled).toBe(false);
	});
});

/* ============================================================
   Accessibility
   ============================================================ */

describe('ndd-dropdown – accessibility', () => {
	let el: NDDDropdown;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('warns when slotted select has no accessible name', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDDropdown>(`
			<ndd-dropdown>
				<select name="land">
					<option value="nl">Nederland</option>
				</select>
			</ndd-dropdown>
		`);
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible name'));
	});

	it('does not warn when slotted select has aria-label', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NDDDropdown>(`
			<ndd-dropdown>
				<select name="land" aria-label="Land">
					<option value="nl">Nederland</option>
				</select>
			</ndd-dropdown>
		`);
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});
});

/* ============================================================
   Change event
   ============================================================ */

describe('ndd-dropdown – change event', () => {
	let el: NDDDropdown;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('updates displayValue when slotted select changes', async () => {
		el = await fixture<NDDDropdown>(selectFixture());
		await waitForUpdate(el);
		const select = el.querySelector('select')!;
		select.value = 'be';
		select.dispatchEvent(new Event('change', { bubbles: true }));
		await waitForUpdate(el);
		expect(el._displayValue).toBe('België');
	});

	it('dispatches a change event with value detail', async () => {
		el = await fixture<NDDDropdown>(selectFixture());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('change', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const select = el.querySelector('select')!;
		select.value = 'be';
		select.dispatchEvent(new Event('change', { bubbles: true }));

		expect(detail).toBeDefined();
		expect(detail.value).toBe('be');
	});
});

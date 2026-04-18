import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import { _resetInputModalityForTesting, getInputModality } from '../../../utilities/input-modality.ts';
import './ndd-list-item.ts';
import '../list/ndd-list.ts';
import '../cells/text-cell/ndd-text-cell.ts';

describe('ndd-list-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-list-item></ndd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<ndd-list-item></ndd-list-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<ndd-list-item selected></ndd-list-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('renders a div by default', async () => {
		el = await fixture('<ndd-list-item></ndd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.list-item')).not.toBeNull();
	});

	it('renders a button when type="button"', async () => {
		el = await fixture('<ndd-list-item type="button"></ndd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button.list-item__action')).not.toBeNull();
	});

	it('renders an anchor when href is set', async () => {
		el = await fixture('<ndd-list-item href="/test"></ndd-list-item>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor).not.toBeNull();
		expect(anchor?.getAttribute('href')).toBe('/test');
	});

	it('sets is-boxed class when inside a box list', async () => {
		const wrapper = await fixture(`
			<ndd-list variant="box">
				<ndd-list-item></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('ndd-list-item')!;
		await waitForUpdate(el);
		expect(el.classList.contains('is-boxed')).toBe(true);
	});

	it('does not set is-boxed class when inside a simple list', async () => {
		const wrapper = await fixture(`
			<ndd-list variant="simple">
				<ndd-list-item></ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('ndd-list-item')!;
		await waitForUpdate(el);
		expect(el.classList.contains('is-boxed')).toBe(false);
	});

	it('shows end area when end slot is filled, start area stays hidden', async () => {
		const wrapper = await fixture(`
			<ndd-list variant="simple">
				<ndd-list-item>
					<span slot="end">›</span>
				</ndd-list-item>
			</ndd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('ndd-list-item')!;
		await waitForUpdate(el);
		const startArea = el.shadowRoot!.querySelector('.list-item__start-area');
		const endArea = el.shadowRoot!.querySelector('.list-item__end-area');
		expect(startArea?.classList.contains('is-visible')).toBe(false);
		expect(endArea?.classList.contains('is-visible')).toBe(true);
	});


	// — Highlighted ————————————————————————————————————————————————————————

	it('reflects highlighted attribute', async () => {
		el = await fixture('<ndd-list-item highlighted></ndd-list-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('highlighted')).toBe(true);
	});

	it('matches [selected]:focus-within when focused on the action', async () => {
		// The :host([selected]:focus-within) CSS rule promotes a selected item
		// to the highlighted state on focus. Verify the selector semantics
		// (which the CSS then keys off of).
		el = await fixture('<ndd-list-item type="button" selected></ndd-list-item>');
		await waitForUpdate(el);
		const action = el.shadowRoot!.querySelector<HTMLButtonElement>('.list-item__action')!;

		expect(el.matches('[selected]:focus-within')).toBe(false);
		action.focus();
		await waitForUpdate(el);
		expect(el.matches('[selected]:focus-within')).toBe(true);
		action.blur();
		await waitForUpdate(el);
		expect(el.matches('[selected]:focus-within')).toBe(false);
	});


	it('forces focus on the action on click (Safari/Firefox workaround)', async () => {
		el = await fixture('<ndd-list-item type="button"></ndd-list-item>');
		await waitForUpdate(el);
		const action = el.shadowRoot!.querySelector<HTMLButtonElement>('.list-item__action')!;
		action.click();
		await waitForUpdate(el);
		expect(el.shadowRoot!.activeElement).toBe(action);
	});


	// — Mouse-focus suppression ————————————————————————————————————————————

	describe('is-pointer-focus', () => {
		beforeEach(() => {
			_resetInputModalityForTesting();
			getInputModality(); // re-register document listeners
		});

		it('adds is-pointer-focus class on mouse focus', async () => {
			el = await fixture('<ndd-list-item type="button"></ndd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new MouseEvent('mousedown'));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(true);
		});

		it('does not add is-pointer-focus class on keyboard focus', async () => {
			el = await fixture('<ndd-list-item type="button"></ndd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(false);
		});

		it('removes is-pointer-focus class on blur', async () => {
			el = await fixture('<ndd-list-item type="button"></ndd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new MouseEvent('mousedown'));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			action.blur();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(false);
		});
	});
});

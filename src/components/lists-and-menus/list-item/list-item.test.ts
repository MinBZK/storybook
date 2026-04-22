import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import { _resetInputModalityForTesting, getInputModality } from '../../../utilities/input-modality.js';
import './list-item.js';
import '../list/list.js';
import '../cells/text-cell/text-cell.js';

describe('nldd-list-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<nldd-list-item selected></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('renders a div by default', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('div.list-item')).not.toBeNull();
	});

	it('renders a button when type="button"', async () => {
		el = await fixture('<nldd-list-item type="button"></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('button.list-item__action')).not.toBeNull();
	});

	it('renders an anchor when href is set', async () => {
		el = await fixture('<nldd-list-item href="/test"></nldd-list-item>');
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor).not.toBeNull();
		expect(anchor?.getAttribute('href')).toBe('/test');
	});

	it('sets is-boxed class when inside a box list', async () => {
		const wrapper = await fixture(`
			<nldd-list variant="box">
				<nldd-list-item></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.classList.contains('is-boxed')).toBe(true);
	});

	it('does not set is-boxed class when inside a simple list', async () => {
		const wrapper = await fixture(`
			<nldd-list variant="simple">
				<nldd-list-item></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.classList.contains('is-boxed')).toBe(false);
	});

	it('shows end area when end slot is filled, start area stays hidden', async () => {
		const wrapper = await fixture(`
			<nldd-list variant="simple">
				<nldd-list-item>
					<span slot="end">›</span>
				</nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		const startArea = el.shadowRoot!.querySelector('.list-item__start-area');
		const endArea = el.shadowRoot!.querySelector('.list-item__end-area');
		expect(startArea?.classList.contains('is-visible')).toBe(false);
		expect(endArea?.classList.contains('is-visible')).toBe(true);
	});


	// — Highlighted ————————————————————————————————————————————————————————

	it('reflects highlighted attribute', async () => {
		el = await fixture('<nldd-list-item highlighted></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('highlighted')).toBe(true);
	});

	it('matches [selected]:focus-within when focused on the action', async () => {
		// The :host([selected]:focus-within) CSS rule promotes a selected item
		// to the highlighted state on focus. Verify the selector semantics
		// (which the CSS then keys off of).
		el = await fixture('<nldd-list-item type="button" selected></nldd-list-item>');
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
		el = await fixture('<nldd-list-item type="button"></nldd-list-item>');
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
			el = await fixture('<nldd-list-item type="button"></nldd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new MouseEvent('mousedown'));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(true);
		});

		it('does not add is-pointer-focus class on keyboard focus', async () => {
			el = await fixture('<nldd-list-item type="button"></nldd-list-item>');
			await waitForUpdate(el);
			document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
			const action = el.shadowRoot!.querySelector('.list-item__action') as HTMLElement;
			action.focus();
			await waitForUpdate(el);
			expect(action.classList.contains('is-pointer-focus')).toBe(false);
		});

		it('removes is-pointer-focus class on blur', async () => {
			el = await fixture('<nldd-list-item type="button"></nldd-list-item>');
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


	// — Auto-id ——————————————————————————————————————————————————————————————

	it('auto-assigns an id when none is provided', async () => {
		el = await fixture('<nldd-list-item></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.id).toMatch(/^nldd-list-item-\d+$/);
	});

	it('keeps a consumer-provided id', async () => {
		el = await fixture('<nldd-list-item id="my-item"></nldd-list-item>');
		await waitForUpdate(el);
		expect(el.id).toBe('my-item');
	});


	// — Parent type sync: content (default) ——————————————————————————————————

	it('content parent: role="listitem", no aria-selected', async () => {
		const wrapper = await fixture(`
			<nldd-list>
				<nldd-list-item selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('nldd-list-item')!;
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('listitem');
		expect(el.hasAttribute('aria-selected')).toBe(false);
	});


	// — Parent type sync: listbox ——————————————————————————————————————————————

	it('listbox parent: role="option" and aria-selected reflects selected', async () => {
		const wrapper = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="a"></nldd-list-item>
				<nldd-list-item id="b" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		const a = wrapper.querySelector('#a') as HTMLElement;
		const b = wrapper.querySelector('#b') as HTMLElement;
		await waitForUpdate(a);
		await waitForUpdate(b);

		expect(a.getAttribute('role')).toBe('option');
		expect(a.getAttribute('aria-selected')).toBe('false');
		expect(b.getAttribute('role')).toBe('option');
		expect(b.getAttribute('aria-selected')).toBe('true');
	});

	it('listbox parent: forces div rendering even when type="button" or href is set', async () => {
		const wrapper = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="a" type="button"></nldd-list-item>
				<nldd-list-item id="b" href="/foo"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		const a = wrapper.querySelector('#a') as HTMLElement;
		const b = wrapper.querySelector('#b') as HTMLElement;
		await waitForUpdate(a);
		await waitForUpdate(b);

		expect(a.shadowRoot!.querySelector('button.list-item__action')).toBeNull();
		expect(b.shadowRoot!.querySelector('a.list-item__action')).toBeNull();
		expect(a.shadowRoot!.querySelector('div.list-item')).not.toBeNull();
		expect(b.shadowRoot!.querySelector('div.list-item')).not.toBeNull();
	});

	it('listbox parent: aria-selected updates when selected prop toggles', async () => {
		const wrapper = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="a"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		expect(el.getAttribute('aria-selected')).toBe('false');

		el.setAttribute('selected', '');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-selected')).toBe('true');
	});


	// — Parent type sync: navigation —————————————————————————————————————————

	it('navigation parent: aria-current="page" on inner anchor when selected', async () => {
		const wrapper = await fixture(`
			<nldd-list type="navigation">
				<nldd-list-item id="a" href="/a" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.getAttribute('aria-current')).toBe('page');
	});

	it('navigation parent: aria-current="page" on inner button when selected', async () => {
		const wrapper = await fixture(`
			<nldd-list type="navigation">
				<nldd-list-item id="a" type="button" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button.list-item__action');
		expect(button?.getAttribute('aria-current')).toBe('page');
	});

	it('navigation parent: removes aria-current when selected is toggled off', async () => {
		const wrapper = await fixture(`
			<nldd-list type="navigation">
				<nldd-list-item id="a" href="/a" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		const anchor = el.shadowRoot!.querySelector('a.list-item__action');
		expect(anchor?.getAttribute('aria-current')).toBe('page');

		el.removeAttribute('selected');
		await waitForUpdate(el);
		expect(anchor?.hasAttribute('aria-current')).toBe(false);
	});


	// — Parent type sync: switching at runtime ————————————————————————————————

	it('re-syncs ARIA when parent list type changes', async () => {
		const wrapper = await fixture(`
			<nldd-list>
				<nldd-list-item id="a" selected></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(wrapper);
		el = wrapper.querySelector('#a') as HTMLElement;
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('listitem');

		wrapper.setAttribute('type', 'listbox');
		// MutationObserver fires async — wait a tick
		await waitForUpdate(wrapper);
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('option');
		expect(el.getAttribute('aria-selected')).toBe('true');
	});
});

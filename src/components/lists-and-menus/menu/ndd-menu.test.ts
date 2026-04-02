import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-menu.ts';

function getButton(el: Element): HTMLElement {
	return el.shadowRoot?.querySelector('button') as HTMLElement;
}

describe('ndd-menu', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu></ndd-menu>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders slotted menu items', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		expect(el.querySelectorAll('ndd-menu-item').length).toBe(2);
	});

	it('renders slotted divider', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-divider></ndd-menu-divider>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('ndd-menu-divider')).not.toBeNull();
	});

	it('wraps around at bottom with ArrowDown', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-item');
		const spy = vi.spyOn(getButton(items[0]), 'focus');
		getButton(items[items.length - 1]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('wraps around at top with ArrowUp', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-item');
		const spy = vi.spyOn(getButton(items[items.length - 1]), 'focus');
		getButton(items[0]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses first item with ArrowDown when nothing focused', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-item');
		const spy = vi.spyOn(getButton(items[0]), 'focus');
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses last item with ArrowUp when nothing focused', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-item');
		const spy = vi.spyOn(getButton(items[items.length - 1]), 'focus');
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses first item with Home', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
				<ndd-menu-item text="Item 3"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-item');
		const spy = vi.spyOn(getButton(items[0]), 'focus');
		getButton(items[items.length - 1]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses last item with End', async () => {
		el = await fixture(`
			<ndd-menu>
				<ndd-menu-item text="Item 1"></ndd-menu-item>
				<ndd-menu-item text="Item 2"></ndd-menu-item>
				<ndd-menu-item text="Item 3"></ndd-menu-item>
			</ndd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('ndd-menu-item');
		const spy = vi.spyOn(getButton(items[items.length - 1]), 'focus');
		getButton(items[0]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});
});

describe('ndd-menu-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu-item></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects text attribute', async () => {
		el = await fixture('<ndd-menu-item text="Bewerk"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('text')).toBe('Bewerk');
	});

	it('reflects details attribute', async () => {
		el = await fixture('<ndd-menu-item details="Cmd+S"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('details')).toBe('Cmd+S');
	});

	it('defaults type to button', async () => {
		el = await fixture('<ndd-menu-item></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('button');
	});

	it('reflects type checkbox', async () => {
		el = await fixture('<ndd-menu-item type="checkbox"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('checkbox');
	});

	it('reflects type radio', async () => {
		el = await fixture('<ndd-menu-item type="radio"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('radio');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<ndd-menu-item></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<ndd-menu-item type="checkbox" selected></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('defaults disabled to false', async () => {
		el = await fixture('<ndd-menu-item></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(false);
	});

	it('reflects disabled attribute', async () => {
		el = await fixture('<ndd-menu-item disabled></ndd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
	});

	it('dispatches select event on click', async () => {
		el = await fixture('<ndd-menu-item text="Item"></ndd-menu-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		getButton(el)?.click();
		expect(fired).toBe(true);
	});

	it('does not dispatch select when disabled', async () => {
		el = await fixture('<ndd-menu-item text="Item" disabled></ndd-menu-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		getButton(el)?.click();
		expect(fired).toBe(false);
	});

	it('renders role menuitem for default type', async () => {
		el = await fixture('<ndd-menu-item text="Item"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('role')).toBe('menuitem');
	});

	it('renders role menuitemcheckbox for type checkbox', async () => {
		el = await fixture('<ndd-menu-item type="checkbox" text="Item"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('role')).toBe('menuitemcheckbox');
	});

	it('renders role menuitemradio for type radio', async () => {
		el = await fixture('<ndd-menu-item type="radio" text="Item"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('role')).toBe('menuitemradio');
	});

	it('sets aria-checked for checkbox type', async () => {
		el = await fixture('<ndd-menu-item type="checkbox" selected text="Item"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('aria-checked')).toBe('true');
	});

	it('does not set aria-checked for default type', async () => {
		el = await fixture('<ndd-menu-item text="Item"></ndd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('aria-checked')).toBeNull();
	});
});

describe('ndd-menu-divider', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu-divider></ndd-menu-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

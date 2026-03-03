import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-menu.ts';

describe('rr-menu', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-menu></rr-menu>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders slotted menu items', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		expect(items.length).toBe(2);
	});

	it('renders slotted divider', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-divider></rr-menu-divider>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const divider = el.querySelector('rr-menu-divider');
		expect(divider).not.toBeNull();
	});
});

describe('rr-menu-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-menu-item></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to neutral variant', async () => {
		el = await fixture('<rr-menu-item></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('neutral');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<rr-menu-item variant="danger"></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('danger');
	});

	it('reflects title attribute', async () => {
		el = await fixture('<rr-menu-item title="Bewerk"></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('title')).toBe('Bewerk');
	});

	it('reflects details attribute', async () => {
		el = await fixture('<rr-menu-item details="Cmd+S"></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('details')).toBe('Cmd+S');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<rr-menu-item></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<rr-menu-item selected></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('defaults disabled to false', async () => {
		el = await fixture('<rr-menu-item></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(false);
	});

	it('reflects disabled attribute', async () => {
		el = await fixture('<rr-menu-item disabled></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
	});

	it('defaults has-submenu to false', async () => {
		el = await fixture('<rr-menu-item></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('has-submenu')).toBe(false);
	});

	it('reflects has-submenu attribute', async () => {
		el = await fixture('<rr-menu-item has-submenu></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('has-submenu')).toBe(true);
	});

	it('dispatches rr-select event on click', async () => {
		el = await fixture('<rr-menu-item title="Item"></rr-menu-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('rr-select', () => { fired = true; });
		const button = el.shadowRoot?.querySelector('button');
		button?.click();
		expect(fired).toBe(true);
	});

	it('does not dispatch rr-select when disabled', async () => {
		el = await fixture('<rr-menu-item title="Item" disabled></rr-menu-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('rr-select', () => { fired = true; });
		const button = el.shadowRoot?.querySelector('button');
		button?.click();
		expect(fired).toBe(false);
	});
});

describe('rr-menu-divider', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-menu-divider></rr-menu-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

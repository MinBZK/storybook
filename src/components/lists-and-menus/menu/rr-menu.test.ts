import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRMenuItem } from './rr-menu.js';
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

	it('navigates down with ArrowDown', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const secondButton = items[1].shadowRoot?.querySelector('button') as HTMLElement;
		firstButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(document.activeElement).toBe(secondButton);
	});

	it('navigates up with ArrowUp', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const secondButton = items[1].shadowRoot?.querySelector('button') as HTMLElement;
		secondButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(document.activeElement).toBe(firstButton);
	});

	it('wraps around at bottom with ArrowDown', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const lastButton = items[items.length - 1].shadowRoot?.querySelector('button') as HTMLElement;
		lastButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(document.activeElement).toBe(firstButton);
	});

	it('wraps around at top with ArrowUp', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const lastButton = items[items.length - 1].shadowRoot?.querySelector('button') as HTMLElement;
		firstButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(document.activeElement).toBe(lastButton);
	});

	it('focuses first item with ArrowDown when nothing focused', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const firstButton = el.querySelector('rr-menu-item')?.shadowRoot?.querySelector('button') as HTMLElement;
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(document.activeElement).toBe(firstButton);
	});

	it('focuses last item with ArrowUp when nothing focused', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const lastButton = items[items.length - 1].shadowRoot?.querySelector('button') as HTMLElement;
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(document.activeElement).toBe(lastButton);
	});

	it('skips disabled items during navigation', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2" disabled></rr-menu-item>
				<rr-menu-item title="Item 3"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const thirdButton = items[2].shadowRoot?.querySelector('button') as HTMLElement;
		firstButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(document.activeElement).toBe(thirdButton);
	});

	it('focuses first item with Home', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
				<rr-menu-item title="Item 3"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const lastButton = items[items.length - 1].shadowRoot?.querySelector('button') as HTMLElement;
		lastButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		expect(document.activeElement).toBe(firstButton);
	});

	it('focuses last item with End', async () => {
		el = await fixture(`
			<rr-menu>
				<rr-menu-item title="Item 1"></rr-menu-item>
				<rr-menu-item title="Item 2"></rr-menu-item>
				<rr-menu-item title="Item 3"></rr-menu-item>
			</rr-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('rr-menu-item');
		const firstButton = items[0].shadowRoot?.querySelector('button') as HTMLElement;
		const lastButton = items[items.length - 1].shadowRoot?.querySelector('button') as HTMLElement;
		firstButton.focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
		expect(document.activeElement).toBe(lastButton);
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

	it('defaults selectable to false', async () => {
		el = await fixture('<rr-menu-item></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selectable')).toBe(false);
	});

	it('reflects selectable attribute', async () => {
		el = await fixture('<rr-menu-item selectable></rr-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selectable')).toBe(true);
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

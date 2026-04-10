import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NDDTopNavigationBar } from './ndd-top-navigation-bar.ts';
import './ndd-top-navigation-bar.ts';

function navWithItems(): string {
	return `
		<ndd-top-navigation-bar website-title="DigID">
			<ndd-menu-bar-item slot="global" text="Home"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="global" text="About"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="global" text="Contact"></ndd-menu-bar-item>
		</ndd-top-navigation-bar>
	`;
}

function navWithUtility(): string {
	return `
		<ndd-top-navigation-bar website-title="DigID">
			<ndd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier"></ndd-menu-bar-item>
			<ndd-menu-bar-item slot="utility" text="Account" icon="person" expandable></ndd-menu-bar-item>
		</ndd-top-navigation-bar>
	`;
}

describe('ndd-top-navigation-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-top-navigation-bar></ndd-top-navigation-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders logo by default', async () => {
		el = await fixture('<ndd-top-navigation-bar></ndd-top-navigation-bar>');
		await waitForUpdate(el);
		const logoBar = el.shadowRoot!.querySelector('.top-navigation-bar__logo-bar');
		expect(logoBar).not.toBeNull();
	});

	it('renders utility slot items', async () => {
		el = await fixture(navWithUtility());
		await waitForUpdate(el);
		const utilityItems = el.querySelectorAll('ndd-menu-bar-item[slot="utility"]');
		expect(utilityItems.length).toBe(2);
	});

	it('renders menu-bar-end for utility slot', async () => {
		el = await fixture(navWithUtility());
		await waitForUpdate(el);
		const menuBarEnd = el.shadowRoot!.querySelector('.top-navigation-bar__menu-bar-end');
		expect(menuBarEnd).not.toBeNull();
	});
});

describe('ndd-top-navigation-bar – menu item selection', () => {
	let el: NDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is current', async () => {
		el = await fixture<NDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		const items = el.querySelectorAll('ndd-menu-bar-item');
		items[0].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('current')).toBe(true);

		items[1].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('current')).toBe(false);
		expect(items[1].hasAttribute('current')).toBe(true);
	});

	it('dispatches itemselect event on item click', async () => {
		el = await fixture<NDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('itemselect', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		el.querySelectorAll('ndd-menu-bar-item')[1].click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el.querySelectorAll('ndd-menu-bar-item')[1]);
	});
});

describe('ndd-top-navigation-bar – back button', () => {
	let el: NDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders back button when back-text="Terug" is set', async () => {
		el = await fixture<NDDTopNavigationBar>(`
			<ndd-top-navigation-bar back-text="Terug"></ndd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const backBtn = el.shadowRoot!.querySelector('ndd-menu-bar-item[icon="arrow-left"]');
		expect(backBtn).not.toBeNull();
	});

	it('dispatches back-click when back button without href is clicked', async () => {
		el = await fixture<NDDTopNavigationBar>(`
			<ndd-top-navigation-bar back-text="Terug"></ndd-top-navigation-bar>
		`);
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('back-click', () => { fired = true; });

		const backBtn = el.shadowRoot!.querySelector('ndd-menu-bar-item[icon="arrow-left"]') as HTMLElement;
		backBtn?.click();
		expect(fired).toBe(true);
	});

	it('renders back button with href when back-href is set', async () => {
		el = await fixture<NDDTopNavigationBar>(`
			<ndd-top-navigation-bar back-href="/home" back-text="Home"></ndd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const backItem = el.shadowRoot!.querySelector('ndd-menu-bar-item[icon="arrow-left"]') as HTMLElement;
		expect(backItem).not.toBeNull();
		expect(backItem.getAttribute('href')).toBe('/home');
	});
});

describe('ndd-top-navigation-bar – i18n', () => {
	let el: NDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses default Dutch translations', async () => {
		el = await fixture<NDDTopNavigationBar>('<ndd-top-navigation-bar></ndd-top-navigation-bar>');
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('.top-navigation-bar__menu-bar');
		expect(nav!.getAttribute('aria-label')).toBe('Hoofdnavigatie');
	});

	it('accepts custom translations', async () => {
		el = await fixture<NDDTopNavigationBar>('<ndd-top-navigation-bar></ndd-top-navigation-bar>');
		(el as NDDTopNavigationBar).translations = {
			'components.top-navigation-bar.main-navigation-label': 'Main navigation',
		};
		await waitForUpdate(el);
		const nav = el.shadowRoot!.querySelector('.top-navigation-bar__menu-bar');
		expect(nav!.getAttribute('aria-label')).toBe('Main navigation');
	});
});

describe('ndd-menu-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<ndd-menu-bar-item text="Test"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders text from attribute', async () => {
		el = await fixture('<ndd-menu-bar-item text="Hello"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		const content = el.shadowRoot!.querySelector('.top-navigation-bar__menu-item-text');
		expect(content!.textContent).toBe('Hello');
	});

	it('does not set current on click', async () => {
		el = await fixture('<ndd-menu-bar-item text="Test"></ndd-menu-bar-item>');
		await waitForUpdate(el);
		el.click();
		await waitForUpdate(el);
		expect(el.hasAttribute('current')).toBe(false);
	});

	it('creates popover menu when expandable with menu items', async () => {
		el = await fixture(`
			<ndd-menu-bar-item text="NL" expandable>
				<ndd-menu-item text="Nederlands"></ndd-menu-item>
				<ndd-menu-item text="English"></ndd-menu-item>
			</ndd-menu-bar-item>
		`);
		await waitForUpdate(el);
		const menu = document.querySelector('ndd-menu');
		expect(menu).not.toBeNull();
		// Cleanup menu from body
		menu?.remove();
	});

	it('does not fire select when expandable with menu items', async () => {
		el = await fixture(`
			<ndd-menu-bar-item text="NL" expandable>
				<ndd-menu-item text="Nederlands"></ndd-menu-item>
			</ndd-menu-bar-item>
		`);
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		el.click();
		await waitForUpdate(el);
		expect(fired).toBe(false);
		document.querySelector('ndd-menu')?.remove();
	});
});

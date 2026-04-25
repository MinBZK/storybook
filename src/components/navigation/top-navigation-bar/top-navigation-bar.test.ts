import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDTopNavigationBar } from './top-navigation-bar.js';
import './top-navigation-bar.js';

function navWithItems(): string {
	return `
		<nldd-top-navigation-bar website-title="DigID">
			<nldd-menu-bar-item slot="global" text="Home"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="global" text="About"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="global" text="Contact"></nldd-menu-bar-item>
		</nldd-top-navigation-bar>
	`;
}

function navWithUtility(): string {
	return `
		<nldd-top-navigation-bar website-title="DigID">
			<nldd-menu-bar-item slot="utility" text="Zoeken" icon="magnifier"></nldd-menu-bar-item>
			<nldd-menu-bar-item slot="utility" text="Account" icon="person" expandable></nldd-menu-bar-item>
		</nldd-top-navigation-bar>
	`;
}

describe('nldd-top-navigation-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-top-navigation-bar></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
		expect(el).toBeInstanceOf(customElements.get('nldd-top-navigation-bar'));
	});

	it('renders logo by default', async () => {
		el = await fixture('<nldd-top-navigation-bar></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		const logoBar = el.shadowRoot!.querySelector('.top-navigation-bar__logo-bar');
		expect(logoBar).not.toBeNull();
	});

	it('renders utility slot items', async () => {
		el = await fixture(navWithUtility());
		await waitForUpdate(el);
		const utilityItems = el.querySelectorAll('nldd-menu-bar-item[slot="utility"]');
		expect(utilityItems.length).toBe(2);
	});

	it('renders menu-bar-end for utility slot', async () => {
		el = await fixture(navWithUtility());
		await waitForUpdate(el);
		const menuBarEnd = el.shadowRoot!.querySelector('.top-navigation-bar__menu-bar-end');
		expect(menuBarEnd).not.toBeNull();
	});
});

describe('nldd-top-navigation-bar – menu item selection', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is current', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		const items = el.querySelectorAll('nldd-menu-bar-item');
		items[0].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('current')).toBe(true);

		items[1].click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('current')).toBe(false);
		expect(items[1].hasAttribute('current')).toBe(true);
	});

	it('dispatches itemselect event on item click', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('itemselect', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		el.querySelectorAll('nldd-menu-bar-item')[1].click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el.querySelectorAll('nldd-menu-bar-item')[1]);
	});

	it('does not set current when itemselect is prevented', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		el.addEventListener('itemselect', ((e: CustomEvent) => {
			e.preventDefault();
		}) as EventListener);

		const items = el.querySelectorAll('nldd-menu-bar-item');
		items[1].click();
		await waitForUpdate(el);

		expect(items[1].hasAttribute('current')).toBe(false);
	});
});

describe('nldd-top-navigation-bar – compact breakpoint', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('sets compact on inner menu-bars at small breakpoint', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		// Mock container width below smMax (640px)
		const container = el.shadowRoot!.querySelector('.top-navigation-bar') as HTMLElement;
		vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(400);

		(el as any)._syncCompactAttribute();
		await waitForUpdate(el);

		const menuBars = el.shadowRoot!.querySelectorAll('nldd-menu-bar');
		for (const bar of menuBars) {
			expect(bar.hasAttribute('compact')).toBe(true);
		}
	});

	it('removes compact from inner menu-bars above small breakpoint', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithItems());
		await waitForUpdate(el);

		const container = el.shadowRoot!.querySelector('.top-navigation-bar') as HTMLElement;
		vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(900);

		(el as any)._syncCompactAttribute();
		await waitForUpdate(el);

		const menuBars = el.shadowRoot!.querySelectorAll('nldd-menu-bar');
		for (const bar of menuBars) {
			expect(bar.hasAttribute('compact')).toBe(false);
		}
	});
});

describe('nldd-top-navigation-bar – menu sheet async guards', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('nldd-sheet').forEach(s => s.remove());
	});

	it('does not create sheet after disconnect during async load', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar website-title="Test">
				<nldd-menu-bar-item slot="global" text="Home"></nldd-menu-bar-item>
			</nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);

		// Trigger menu button click (starts async load)
		const menuButton = el.shadowRoot!.querySelector('.top-navigation-bar__menu-button nldd-menu-bar-item') as HTMLElement;
		if (menuButton) {
			const clickPromise = (el as any)._onMenuButtonClick();
			// Disconnect before load resolves
			cleanup(el);
			el = null as any;
			await clickPromise.catch(() => {});
			// Sheet should not be appended to body
			expect(document.querySelector('nldd-sheet')).toBeNull();
		}
	});
});

describe('nldd-top-navigation-bar – back button', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders back button when back-text="Terug" is set', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar back-text="Terug"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const backBtn = el.shadowRoot!.querySelector('nldd-menu-bar-item[icon="arrow-left"]');
		expect(backBtn).not.toBeNull();
	});

	it('dispatches back-click when back button without href is clicked', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar back-text="Terug"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('back-click', () => { fired = true; });

		const backBtn = el.shadowRoot!.querySelector('nldd-menu-bar-item[icon="arrow-left"]') as HTMLElement;
		backBtn?.click();
		expect(fired).toBe(true);
	});

	it('renders back button with href when back-href is set', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar back-href="/home" back-text="Home"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const backItem = el.shadowRoot!.querySelector('nldd-menu-bar-item[icon="arrow-left"]') as HTMLElement;
		expect(backItem).not.toBeNull();
		expect(backItem.getAttribute('href')).toBe('/home');
	});
});

describe('nldd-top-navigation-bar – href sanitization', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders logo as non-link when logo-href is a javascript: URI', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar logo-href="javascript:alert(1)"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.top-navigation-bar__logo');
		expect(link).toBeNull();
	});

	it('renders title as non-link when website-href is a javascript: URI', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar website-title="Test" website-href="javascript:void(0)"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.top-navigation-bar__website-title');
		expect(link).toBeNull();
	});

	it('renders logo link with safe href and aria-label', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar logo-href="/"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.top-navigation-bar__logo');
		expect(link).not.toBeNull();
		expect(link!.getAttribute('href')).toBe('/');
		expect(link!.getAttribute('aria-label')).toBeTruthy();
	});

	it('renders logo+wordmark as combined link when both logo-title and logo-href are set', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar logo-title="DigID" logo-href="/"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.top-navigation-bar__logo-and-wordmark');
		expect(link).not.toBeNull();
		expect(link!.getAttribute('href')).toBe('/');
		const logo = link!.querySelector('.top-navigation-bar__logo');
		expect(logo!.getAttribute('aria-hidden')).toBe('true');
		const wordmark = link!.querySelector('.top-navigation-bar__wordmark-title');
		expect(wordmark!.textContent!.trim()).toBe('DigID');
	});

	it('renders logo+wordmark as non-link when logo-href is a javascript: URI', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar logo-title="DigID" logo-href="javascript:alert(1)"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const link = el.shadowRoot!.querySelector('a.top-navigation-bar__logo-and-wordmark');
		expect(link).toBeNull();
	});
});

describe('nldd-top-navigation-bar – i18n', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('uses default Dutch translations', async () => {
		el = await fixture<NLDDTopNavigationBar>('<nldd-top-navigation-bar></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		const menuBar = el.shadowRoot!.querySelector('.top-navigation-bar__global-menu-bar nldd-menu-bar');
		expect(menuBar!.getAttribute('accessible-label')).toBe('Hoofdnavigatie');
	});

	it('accepts custom translations', async () => {
		el = await fixture<NLDDTopNavigationBar>('<nldd-top-navigation-bar></nldd-top-navigation-bar>');
		(el as NLDDTopNavigationBar).translations = {
			'components.top-navigation-bar.global-menu-bar-label': 'Main navigation',
		};
		await waitForUpdate(el);
		const menuBar = el.shadowRoot!.querySelector('.top-navigation-bar__global-menu-bar nldd-menu-bar');
		expect(menuBar!.getAttribute('accessible-label')).toBe('Main navigation');
	});
});

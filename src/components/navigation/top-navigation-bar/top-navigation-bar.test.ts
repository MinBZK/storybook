import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import type { NLDDTopNavigationBar } from './top-navigation-bar.js';
import './top-navigation-bar.js';

function navWithGlobalItems(): string {
	return `
		<nldd-top-navigation-bar website-title="DigID">
			<nldd-menu-bar slot="global">
				<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="About"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Contact"></nldd-menu-bar-item>
			</nldd-menu-bar>
		</nldd-top-navigation-bar>
	`;
}

function navWithUtility(): string {
	return `
		<nldd-top-navigation-bar website-title="DigID">
			<nldd-menu-bar slot="utility">
				<nldd-menu-bar-item text="Zoeken" icon="magnifier"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Account" icon="person" expandable></nldd-menu-bar-item>
			</nldd-menu-bar>
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

	it('width="full" sets no --_max-width inline style', async () => {
		el = await fixture('<nldd-top-navigation-bar width="full"></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('');
	});

	it('a CSS-length width feeds --_max-width inline', async () => {
		el = await fixture('<nldd-top-navigation-bar width="800px"></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('800px');
	});

	it('an invalid width sets no --_max-width', async () => {
		el = await fixture('<nldd-top-navigation-bar width="not-a-length"></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		expect(el.style.getPropertyValue('--_max-width')).toBe('');
	});

	it('caps each bar to the content width and never overflows (page-section layout)', async () => {
		el = await fixture(navWithGlobalItems());
		await waitForUpdate(el);
		// settings.css tokens are not loaded in the unit-test page; inject the few
		// this layout reads (values mirror settings.css) so the var() lengths resolve.
		el.style.setProperty('--semantics-page-sections-sm-margin-inline', '16px');
		el.style.setProperty('--semantics-page-sections-md-margin-inline', '40px');
		el.style.setProperty('--semantics-page-sections-lg-margin-inline', '56px');
		el.style.setProperty('--semantics-page-sections-body-max-width', '1280px');
		el.style.setProperty('--components-menu-bar-item-inline-padding', '8px');
		const sr = el.shadowRoot!;
		const host = el.getBoundingClientRect();
		const logoBar = sr.querySelector('.top-navigation-bar__logo-bar')!.getBoundingClientRect();
		const mainBar = sr.querySelector('.top-navigation-bar__main-bar')!.getBoundingClientRect();
		// the wrapper inline margin insets every bar from the host edge
		expect(logoBar.left).toBeGreaterThan(host.left);
		expect(logoBar.right).toBeLessThan(host.right);
		// logo bar and main bar cap + centre to the same content box
		expect(Math.abs(logoBar.left - mainBar.left)).toBeLessThanOrEqual(1);
		expect(Math.abs(logoBar.right - mainBar.right)).toBeLessThanOrEqual(1);
		// the menu negative inline margin must not force a horizontal scrollbar
		expect(el.scrollWidth).toBeLessThanOrEqual(el.clientWidth + 1);
	});

	it('renders logo by default', async () => {
		el = await fixture('<nldd-top-navigation-bar></nldd-top-navigation-bar>');
		await waitForUpdate(el);
		const logoBar = el.shadowRoot!.querySelector('.top-navigation-bar__logo-bar');
		expect(logoBar).not.toBeNull();
	});

	it('renders utility slot items inside the slotted menu-bar', async () => {
		el = await fixture(navWithUtility());
		await waitForUpdate(el);
		const utilityMenuBar = el.querySelector('nldd-menu-bar[slot="utility"]');
		expect(utilityMenuBar).not.toBeNull();
		expect(utilityMenuBar!.querySelectorAll('nldd-menu-bar-item').length).toBe(2);
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
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);

		const items = el.querySelectorAll('nldd-menu-bar[slot="global"] > nldd-menu-bar-item');
		(items[0] as HTMLElement).click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('current')).toBe(true);

		(items[1] as HTMLElement).click();
		await waitForUpdate(el);
		expect(items[0].hasAttribute('current')).toBe(false);
		expect(items[1].hasAttribute('current')).toBe(true);
	});

	it('dispatches itemselect event on item click', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('itemselect', ((e: CustomEvent) => {
			detail = e.detail;
		}) as EventListener);

		const items = el.querySelectorAll('nldd-menu-bar[slot="global"] > nldd-menu-bar-item');
		(items[1] as HTMLElement).click();
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(items[1]);
	});

	it('does not set current when itemselect is prevented', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);

		el.addEventListener('itemselect', ((e: CustomEvent) => {
			e.preventDefault();
		}) as EventListener);

		const items = el.querySelectorAll('nldd-menu-bar[slot="global"] > nldd-menu-bar-item');
		(items[1] as HTMLElement).click();
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

	it('sets compact on slotted menu-bars at small breakpoint', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);

		// Mock container width below smMax (640px)
		const container = el.shadowRoot!.querySelector('.top-navigation-bar') as HTMLElement;
		vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(400);

		(el as any)._syncCompactAttribute();
		await waitForUpdate(el);

		const menuBars = el.querySelectorAll('nldd-menu-bar');
		expect(menuBars.length).toBeGreaterThan(0);
		for (const bar of menuBars) {
			expect(bar.hasAttribute('compact')).toBe(true);
		}
	});

	it('removes compact from slotted menu-bars above small breakpoint', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);

		const container = el.shadowRoot!.querySelector('.top-navigation-bar') as HTMLElement;
		vi.spyOn(container, 'clientWidth', 'get').mockReturnValue(900);

		(el as any)._syncCompactAttribute();
		await waitForUpdate(el);

		const menuBars = el.querySelectorAll('nldd-menu-bar');
		expect(menuBars.length).toBeGreaterThan(0);
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
				<nldd-menu-bar slot="global">
					<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				</nldd-menu-bar>
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

describe('nldd-top-navigation-bar – menu sheet items', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('nldd-sheet').forEach(s => s.remove());
	});

	it('renders non-link items as real buttons and link items as anchors', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar website-title="Test">
				<nldd-menu-bar slot="global">
					<nldd-menu-bar-item text="Home" href="/home"></nldd-menu-bar-item>
					<nldd-menu-bar-item text="Zoeken"></nldd-menu-bar-item>
				</nldd-menu-bar>
			</nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);

		// Opens the sheet (loads deps) and syncs the list items into it.
		await (el as any)._onMenuButtonClick();
		const list = (el as any)._globalMenuSheetList as HTMLElement;
		const listItems = Array.from(list.querySelectorAll('nldd-list-item')) as HTMLElement[];
		expect(listItems.length).toBe(2);
		await Promise.all(listItems.map(li => (li as any).updateComplete));

		const [linkItem, buttonItem] = listItems;

		// Link item → anchor, no bogus type attribute
		expect(linkItem.getAttribute('href')).toBe('/home');
		expect(linkItem.getAttribute('type')).toBeNull();
		expect(linkItem.shadowRoot!.querySelector('a.list-item__action')).not.toBeNull();

		// Non-link item → real <button type="button">, opted in via `button`
		expect(buttonItem.hasAttribute('button')).toBe(true);
		expect(buttonItem.getAttribute('type')).toBeNull();
		const btn = buttonItem.shadowRoot!.querySelector('button.list-item__action') as HTMLButtonElement;
		expect(btn).not.toBeNull();
		expect(btn.getAttribute('type')).toBe('button');
	});
});

describe('nldd-top-navigation-bar – menu sheet drill-down', () => {
	let el: NLDDTopNavigationBar;

	afterEach(() => {
		if (el) cleanup(el);
		document.querySelectorAll('nldd-sheet').forEach(s => s.remove());
	});

	const drillFixture = `
		<nldd-top-navigation-bar website-title="Test">
			<nldd-menu-bar slot="global">
				<nldd-menu-bar-item text="Home" href="/home"></nldd-menu-bar-item>
				<nldd-menu-bar-item text="Onderwerpen" expandable>
					<nldd-menu>
						<nldd-menu-item text="Zorg"></nldd-menu-item>
						<nldd-menu-item text="Wonen"></nldd-menu-item>
					</nldd-menu>
				</nldd-menu-bar-item>
			</nldd-menu-bar>
		</nldd-top-navigation-bar>
	`;

	async function openSheet(host: NLDDTopNavigationBar): Promise<HTMLElement> {
		// Call the menu-button handler directly rather than dispatching a DOM
		// click: it's async (it lazy-loads the sheet's dependencies) and returns a
		// promise we can await; a synthetic click gives no handle to await on.
		await (host as any)._onMenuButtonClick();
		const list = (host as any)._globalMenuSheetList as HTMLElement;
		await Promise.all(
			Array.from(list.querySelectorAll('nldd-list-item')).map(li => (li as any).updateComplete),
		);
		return list;
	}

	const labels = (list: HTMLElement): (string | null | undefined)[] =>
		Array.from(list.querySelectorAll('nldd-list-item'))
			.map(r => r.querySelector('nldd-text-cell')?.getAttribute('text'));

	it('shows a chevron on parent rows, drills into the submenu, and walks back', async () => {
		el = await fixture<NLDDTopNavigationBar>(drillFixture);
		await waitForUpdate(el);
		const list = await openSheet(el);
		const titleBar = (el as any)._globalMenuSheetTitleBar as HTMLElement;
		expect(titleBar).not.toBeNull();

		// Root: a link row + a submenu row with a chevron, no back button.
		expect(labels(list)).toEqual(['Home', 'Onderwerpen']);
		expect(titleBar.getAttribute('text')).toBe('Menu');
		expect(titleBar.hasAttribute('back-text')).toBe(false);
		const parentRow = list.querySelectorAll('nldd-list-item')[1] as HTMLElement;
		expect(parentRow.hasAttribute('button')).toBe(true);
		expect(parentRow.querySelector('nldd-icon-cell[slot="end"]')?.getAttribute('icon')).toBe('chevron-right-small');

		// Drill in → submenu items, title becomes the parent, back points home.
		parentRow.shadowRoot!.querySelector<HTMLButtonElement>('button.list-item__action')!.click();
		await waitForUpdate(el);
		expect(labels(list)).toEqual(['Zorg', 'Wonen']);
		expect(titleBar.getAttribute('text')).toBe('Onderwerpen');
		expect(titleBar.getAttribute('back-text')).toBe('Menu');

		// Back → root again.
		titleBar.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(labels(list)).toEqual(['Home', 'Onderwerpen']);
		expect(titleBar.hasAttribute('back-text')).toBe(false);
	});

	it('returns focus to the opener row when walking back (APG)', async () => {
		el = await fixture<NLDDTopNavigationBar>(drillFixture);
		await waitForUpdate(el);
		const list = await openSheet(el);
		// Drill into "Onderwerpen" (the second row).
		(list.querySelectorAll('nldd-list-item')[1] as HTMLElement)
			.shadowRoot!.querySelector<HTMLButtonElement>('button.list-item__action')!.click();
		await waitForUpdate(el);
		// Walk back to the root level.
		const titleBar = (el as any)._globalMenuSheetTitleBar as HTMLElement;
		expect(titleBar).not.toBeNull();
		titleBar.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
		await waitForUpdate(el);
		await new Promise(resolve => requestAnimationFrame(() => resolve(null)));
		// Focus lands on the "Onderwerpen" opener row, not the first ("Home") row.
		const rows = Array.from(list.querySelectorAll('nldd-list-item')) as HTMLElement[];
		expect(rows[1].matches(':focus-within')).toBe(true);
		expect(rows[0].matches(':focus-within')).toBe(false);
	});

	it('forwards a submenu leaf selection (without throwing on the closed popover)', async () => {
		el = await fixture<NLDDTopNavigationBar>(drillFixture);
		await waitForUpdate(el);
		const list = await openSheet(el);

		(list.querySelectorAll('nldd-list-item')[1] as HTMLElement)
			.shadowRoot!.querySelector<HTMLButtonElement>('button.list-item__action')!.click();
		await waitForUpdate(el);

		const zorgItem = el.querySelector('nldd-menu-item')!; // first submenu item
		let selected = false;
		zorgItem.addEventListener('select', () => { selected = true; });

		const zorgRow = list.querySelectorAll('nldd-list-item')[0] as HTMLElement;
		await (zorgRow as any).updateComplete;
		zorgRow.shadowRoot!.querySelector<HTMLButtonElement>('button.list-item__action')!.click();

		expect(selected).toBe(true);
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
		const backBtn = el.shadowRoot!.querySelector('nldd-menu-bar-item[icon="chevron-left"]');
		expect(backBtn).not.toBeNull();
	});

	it('dispatches back-click when back button without href is clicked', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar back-text="Terug"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('back-click', () => { fired = true; });

		const backBtn = el.shadowRoot!.querySelector('nldd-menu-bar-item[icon="chevron-left"]') as HTMLElement;
		backBtn?.click();
		expect(fired).toBe(true);
	});

	it('renders back button with href when back-href is set', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar back-href="/home" back-text="Home"></nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const backItem = el.shadowRoot!.querySelector('nldd-menu-bar-item[icon="chevron-left"]') as HTMLElement;
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

	it('applies default Dutch accessible-label to slotted global menu-bar', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);
		const menuBar = el.querySelector('nldd-menu-bar[slot="global"]')!;
		expect(menuBar.getAttribute('accessible-label')).toBe('Hoofdnavigatie');
	});

	it('does not override consumer-provided accessible-label on slotted menu-bar', async () => {
		el = await fixture<NLDDTopNavigationBar>(`
			<nldd-top-navigation-bar>
				<nldd-menu-bar slot="global" accessible-label="Custom label">
					<nldd-menu-bar-item text="Home"></nldd-menu-bar-item>
				</nldd-menu-bar>
			</nldd-top-navigation-bar>
		`);
		await waitForUpdate(el);
		const menuBar = el.querySelector('nldd-menu-bar[slot="global"]')!;
		expect(menuBar.getAttribute('accessible-label')).toBe('Custom label');
	});

	it('applies custom translations to slotted menu-bar', async () => {
		el = await fixture<NLDDTopNavigationBar>(navWithGlobalItems());
		await waitForUpdate(el);
		(el as NLDDTopNavigationBar).translations = {
			'components.top-navigation-bar.global-menu-bar-label': 'Main navigation',
		};
		await waitForUpdate(el);
		const menuBar = el.querySelector('nldd-menu-bar[slot="global"]')!;
		expect(menuBar.getAttribute('accessible-label')).toBe('Main navigation');
	});
});

import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRDocumentTabBar, RRDocumentTabBarItem } from './rr-document-tab-bar.ts';
import './rr-document-tab-bar.ts';

function threeTabBar(): string {
	return `
		<rr-document-tab-bar accessible-label="Documenten">
			<rr-document-tab-bar-item selected text="Artikel 1" supporting-text="Wet A"></rr-document-tab-bar-item>
			<rr-document-tab-bar-item text="Artikel 2" supporting-text="Wet B"></rr-document-tab-bar-item>
			<rr-document-tab-bar-item text="Artikel 3" supporting-text="Wet C"></rr-document-tab-bar-item>
		</rr-document-tab-bar>
	`;
}

function getItems(el: RRDocumentTabBar): RRDocumentTabBarItem[] {
	return Array.from(el.querySelectorAll('rr-document-tab-bar-item'));
}

function clickItem(item: Element) {
	item.shadowRoot!.querySelector('.document-tab-bar__item-tab')!.dispatchEvent(
		new MouseEvent('click', { bubbles: true, composed: true })
	);
}

function clickDismiss(item: Element) {
	item.shadowRoot!.querySelector('.document-tab-bar__item-dismiss-button')!.dispatchEvent(
		new MouseEvent('click', { bubbles: true, composed: true })
	);
}

function pressKey(target: Element, key: string) {
	target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}


/* ============================================================
   rr-document-tab-bar-item – render
   ============================================================ */

describe('rr-document-tab-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-document-tab-bar-item></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders subtitle when provided', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1" supporting-text="Wet A"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		const subtitle = el.shadowRoot!.querySelector('.document-tab-bar__item-supporting-text');
		expect(subtitle).not.toBeNull();
		expect(subtitle!.textContent?.trim()).toBe('Wet A');
	});

	it('does not render subtitle when not provided', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.document-tab-bar__item-supporting-text')).toBeNull();
	});

	it('renders short-title in short slot', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1" short-text="Art. 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.document-tab-bar__item-short-text')!.textContent?.trim()).toBe('Art. 1');
	});

	it('falls back to title in short slot when short-title not provided', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.document-tab-bar__item-short-text')!.textContent?.trim()).toBe('Artikel 1');
	});

	it('falls back to subtitle in short subtitle slot when short-subtitle not provided', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1" supporting-text="Wet A"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.document-tab-bar__item-short-supporting-text')!.textContent?.trim()).toBe('Wet A');
	});

	it('sets role="none" on host', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('none');
	});

	it('sets role="tab" on inner element', async () => {
		el = await fixture('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')).not.toBeNull();
	});
});


/* ============================================================
   rr-document-tab-bar-item – events
   ============================================================ */

describe('rr-document-tab-bar-item – events', () => {
	let el: RRDocumentTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('fires select event on click', async () => {
		el = await fixture<RRDocumentTabBarItem>('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		clickItem(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el);
	});

	it('does not fire select when disabled', async () => {
		el = await fixture<RRDocumentTabBarItem>('<rr-document-tab-bar-item text="Artikel 1" disabled></rr-document-tab-bar-item>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		clickItem(el);

		expect(fired).toBe(false);
	});

	it('does not set selected on itself after click', async () => {
		el = await fixture<RRDocumentTabBarItem>('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);

		clickItem(el);
		await waitForUpdate(el);

		expect(el.selected).toBe(false);
	});

	it('fires dismiss event on dismiss button click', async () => {
		el = await fixture<RRDocumentTabBarItem>('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('dismiss', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);
		clickDismiss(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el);
	});

	it('dismiss does not fire select', async () => {
		el = await fixture<RRDocumentTabBarItem>('<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>');
		await waitForUpdate(el);

		let selectFired = false;
		el.addEventListener('select', () => { selectFired = true; });
		clickDismiss(el);

		expect(selectFired).toBe(false);
	});
});


/* ============================================================
   rr-document-tab-bar – render & ARIA
   ============================================================ */

describe('rr-document-tab-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-document-tab-bar accessible-label="Docs"></rr-document-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a nav element', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
	});

	it('sets role="tablist" on items container', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.document-tab-bar__items')!.getAttribute('role')).toBe('tablist');
	});

	it('does not set role on host', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBeNull();
	});
});


/* ============================================================
   rr-document-tab-bar – accessible label
   ============================================================ */

describe('rr-document-tab-bar – accessible label', () => {
	let el: RRDocumentTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('falls back to "Tabbladen" when no accessible-label is provided', async () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRDocumentTabBar>('<rr-document-tab-bar></rr-document-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).toBe('Tabbladen');
	});

	it('warns once when no accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRDocumentTabBar>('<rr-document-tab-bar></rr-document-tab-bar>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledOnce();
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRDocumentTabBar>('<rr-document-tab-bar accessible-label="Documenten"></rr-document-tab-bar>');
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});

	it('forwards accessible-label to nav aria-label', async () => {
		el = await fixture<RRDocumentTabBar>('<rr-document-tab-bar accessible-label="Mijn documenten"></rr-document-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).toBe('Mijn documenten');
	});
});


/* ============================================================
   rr-document-tab-bar – item selection
   ============================================================ */

describe('rr-document-tab-bar – item selection', () => {
	let el: RRDocumentTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is selected', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		expect(items[0].selected).toBe(true);

		clickItem(items[1]);
		await waitForUpdate(el);

		expect(items[0].selected).toBe(false);
		expect(items[1].selected).toBe(true);
	});

	it('dispatches tabchange event with item detail', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('tabchange', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		clickItem(getItems(el)[1]);
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(getItems(el)[1]);
	});

	it('select event does not bubble past the tab bar', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		let selectBubbled = false;
		document.addEventListener('select', () => { selectBubbled = true; }, { once: true });

		clickItem(getItems(el)[0]);
		await waitForUpdate(el);

		expect(selectBubbled).toBe(false);
	});
});


/* ============================================================
   rr-document-tab-bar – dismiss
   ============================================================ */

describe('rr-document-tab-bar – dismiss', () => {
	let el: RRDocumentTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('dispatches tabdismiss with item and nextItem', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('tabdismiss', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		const items = getItems(el);
		clickDismiss(items[0]);
		await waitForUpdate(el);

		expect(detail.item).toBe(items[0]);
	});

	it('selects right neighbour when selected item is dismissed', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		expect(items[0].selected).toBe(true);

		let detail: any;
		el.addEventListener('tabdismiss', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		clickDismiss(items[0]);
		await waitForUpdate(el);

		expect(detail.nextItem).toBe(items[1]);
		expect(items[1].selected).toBe(true);
	});

	it('selects left neighbour when rightmost selected item is dismissed', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar accessible-label="Docs">
				<rr-document-tab-bar-item text="A"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item selected text="B"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);

		const items = getItems(el);
		let detail: any;
		el.addEventListener('tabdismiss', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		clickDismiss(items[1]);
		await waitForUpdate(el);

		expect(detail.nextItem).toBe(items[0]);
		expect(items[0].selected).toBe(true);
	});

	it('nextItem is null when unselected item is dismissed', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('tabdismiss', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		clickDismiss(getItems(el)[1]);
		await waitForUpdate(el);

		expect(detail.nextItem).toBeNull();
	});

	it('dispatches tabempty when last item is dismissed', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar accessible-label="Docs">
				<rr-document-tab-bar-item selected text="A"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);

		let emptyFired = false;
		el.addEventListener('tabempty', () => { emptyFired = true; });

		clickDismiss(getItems(el)[0]);
		await waitForUpdate(el);

		expect(emptyFired).toBe(true);
	});

	it('dismiss event does not bubble past the tab bar', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		let dismissBubbled = false;
		document.addEventListener('dismiss', () => { dismissBubbled = true; }, { once: true });

		clickDismiss(getItems(el)[0]);
		await waitForUpdate(el);

		expect(dismissBubbled).toBe(false);
	});
});


/* ============================================================
   rr-document-tab-bar – keyboard navigation
   ============================================================ */

describe('rr-document-tab-bar – keyboard navigation', () => {
	let el: RRDocumentTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('first item has tabindex="0" when no tab is selected', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar>
				<rr-document-tab-bar-item text="Artikel 1"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item text="Artikel 2"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		const tabA = items[0].shadowRoot!.querySelector('.document-tab-bar__item-tab')!;
		const tabB = items[1].shadowRoot!.querySelector('.document-tab-bar__item-tab')!;
		expect(tabA.getAttribute('tabindex')).toBe('0');
		expect(tabB.getAttribute('tabindex')).toBe('-1');
	});

	it('selected tab has tabindex="0"', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const inner = items[0].shadowRoot!.querySelector('.document-tab-bar__item-tab')!;
		expect(inner.getAttribute('tabindex')).toBe('0');
	});

	it('non-selected tabs have tabindex="-1"', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const innerB = items[1].shadowRoot!.querySelector('.document-tab-bar__item-tab')!;
		const innerC = items[2].shadowRoot!.querySelector('.document-tab-bar__item-tab')!;
		expect(innerB.getAttribute('tabindex')).toBe('-1');
		expect(innerC.getAttribute('tabindex')).toBe('-1');
	});

	it('focus moves to next selected tab after dismiss', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const spy = vi.spyOn(items[1] as HTMLElement, 'focus');
		clickDismiss(items[0]);
		await waitForUpdate(el);
		expect(spy).toHaveBeenCalled();
	});

	it('dismiss button of non-selected tab has tabindex="-1"', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const dismissBtn = items[1].shadowRoot!.querySelector('.document-tab-bar__item-dismiss-button')!;
		expect(dismissBtn.getAttribute('tabindex')).toBe('-1');
	});

	it('dismiss button of selected tab has tabindex="0"', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const dismissBtn = items[0].shadowRoot!.querySelector('.document-tab-bar__item-dismiss-button')!;
		expect(dismissBtn.getAttribute('tabindex')).toBe('0');
	});

	it('ArrowRight auto-activates next tab', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		pressKey(items[0], 'ArrowRight');
		await waitForUpdate(el);
		expect(items[1].selected).toBe(true);
		expect(items[0].selected).toBe(false);
	});

	it('ArrowLeft auto-activates previous tab', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		pressKey(items[1], 'ArrowLeft');
		await waitForUpdate(el);
		expect(items[0].selected).toBe(true);
		expect(items[1].selected).toBe(false);
	});

	it('ArrowRight calls focus on next item', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[1] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft calls focus on previous item', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[1], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowRight wraps from last to first', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('Home calls focus on first item', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'Home');
		expect(spy).toHaveBeenCalled();
	});

	it('End calls focus on last item', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'End');
		expect(spy).toHaveBeenCalled();
	});
});


/* ============================================================
   rr-document-tab-bar – navigation mode
   ============================================================ */

describe('rr-document-tab-bar – navigation mode', () => {
	let el: RRDocumentTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders a nav element when navigation is set', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar navigation accessible-label="Documenten">
				<rr-document-tab-bar-item text="Artikel 1" href="/artikel-1"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
	});

	it('does not render role="tablist" when navigation is set', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar navigation accessible-label="Documenten">
				<rr-document-tab-bar-item text="Artikel 1" href="/artikel-1"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tablist"]')).toBeNull();
	});

	it('renders an anchor when href is set on item', async () => {
		el = await fixture<RRDocumentTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		items[0].href = '/artikel-1';
		await waitForUpdate(el);
		expect(items[0].shadowRoot!.querySelector('a')).not.toBeNull();
	});

	it('sets aria-current="page" on selected item in navigation mode', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar navigation accessible-label="Documenten">
				<rr-document-tab-bar-item selected text="Artikel 1" href="/artikel-1"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item text="Artikel 2" href="/artikel-2"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		const linkA = items[0].shadowRoot!.querySelector('a')!;
		const linkB = items[1].shadowRoot!.querySelector('a')!;
		expect(linkA.getAttribute('aria-current')).toBe('page');
		expect(linkB.getAttribute('aria-current')).toBeNull();
	});

	it('does not auto-activate on ArrowRight in navigation mode', async () => {
		el = await fixture<RRDocumentTabBar>(`
			<rr-document-tab-bar navigation accessible-label="Documenten">
				<rr-document-tab-bar-item selected text="Artikel 1" href="/artikel-1"></rr-document-tab-bar-item>
				<rr-document-tab-bar-item text="Artikel 2" href="/artikel-2"></rr-document-tab-bar-item>
			</rr-document-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		pressKey(items[0], 'ArrowRight');
		await waitForUpdate(el);
		expect(items[0].selected).toBe(true);
		expect(items[1].selected).toBe(false);
	});
});

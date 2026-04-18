import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { NLDDTabBar, NLDDTabBarItem } from './tab-bar.ts';
import './tab-bar.ts';

function threeTabBar(): string {
	return `
		<nldd-tab-bar>
			<nldd-tab-bar-item text="Tab A"></nldd-tab-bar-item>
			<nldd-tab-bar-item selected text="Tab B"></nldd-tab-bar-item>
			<nldd-tab-bar-item text="Tab C"></nldd-tab-bar-item>
		</nldd-tab-bar>
	`;
}

function getItems(el: NLDDTabBar): NLDDTabBarItem[] {
	return Array.from(el.querySelectorAll('nldd-tab-bar-item'));
}

function clickInner(item: Element) {
	const inner = item.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
	inner.click();
}

function pressKey(target: Element, key: string) {
	target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}


/* ============================================================
   nldd-tab-bar-item – render
   ============================================================ */

describe('nldd-tab-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-tab-bar-item></nldd-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a button by default', async () => {
		el = await fixture('<nldd-tab-bar-item text="Tab"></nldd-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.tagName.toLowerCase()).toBe('button');
	});

	it('renders an anchor when href is provided', async () => {
		el = await fixture('<nldd-tab-bar-item href="/page">Tab</nldd-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.tagName.toLowerCase()).toBe('a');
	});

	it('does not render an anchor for unsafe hrefs', async () => {
		el = await fixture('<nldd-tab-bar-item href="javascript:void(0)">Tab</nldd-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.tagName.toLowerCase()).toBe('button');
	});
});


/* ============================================================
   nldd-tab-bar-item – content variant detection
   ============================================================ */

describe('nldd-tab-bar-item – content variant detection', () => {
	let el: NLDDTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets variant to icon-and-text when both text and icon are present', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item text="Tab">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('icon-and-text');
	});

	it('sets variant to text when only text attribute is present', async () => {
		el = await fixture<NLDDTabBarItem>('<nldd-tab-bar-item text="Tab"></nldd-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('text');
	});

	it('sets variant to icon when only an icon slot is filled', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item>
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('icon');
	});

	it('respects explicit variant="text" even when both text and icon are present', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item variant="text" text="Tab">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('text');
	});

	it('respects explicit variant="icon" even when both text and icon are present', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item variant="icon" text="Tab">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('icon');
	});

	it('sets variant to compact when compact attribute is set', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item compact text="Tab">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('compact');
	});

	it('compact overrides explicit variant', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item compact variant="text" text="Tab">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('compact');
	});
});


/* ============================================================
   nldd-tab-bar-item – icon variant accessibility
   ============================================================ */

describe('nldd-tab-bar-item – icon variant accessibility', () => {
	let el: NLDDTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets aria-label from text attribute when variant is icon', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item variant="icon" text="Home">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.getAttribute('aria-label')).toBe('Home');
	});

	it('wraps in nldd-tooltip when variant is icon', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item variant="icon" text="Home">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		const tooltip = el.shadowRoot!.querySelector('nldd-tooltip');
		expect(tooltip).not.toBeNull();
		expect(tooltip!.getAttribute('text')).toBe('Home');
	});

	it('does not set aria-label when variant is icon-and-text', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item text="Home">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.getAttribute('aria-label')).toBeNull();
	});

	it('does not wrap in nldd-tooltip when variant is text', async () => {
		el = await fixture<NLDDTabBarItem>(`
			<nldd-tab-bar-item variant="text" text="Home">
				<svg slot="icon"></svg>
			</nldd-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nldd-tooltip')).toBeNull();
	});
});


/* ============================================================
   nldd-tab-bar-item – events
   ============================================================ */

describe('nldd-tab-bar-item – events', () => {
	let el: NLDDTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('fires select event on click', async () => {
		el = await fixture<NLDDTabBarItem>('<nldd-tab-bar-item text="Tab"></nldd-tab-bar-item>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		el.shadowRoot!.querySelector('[role="tab"]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el);
	});

	it('does not set selected on itself after click', async () => {
		el = await fixture<NLDDTabBarItem>('<nldd-tab-bar-item text="Tab"></nldd-tab-bar-item>');
		await waitForUpdate(el);

		el.shadowRoot!.querySelector('[role="tab"]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(el.selected).toBe(false);
	});
});


/* ============================================================
   nldd-tab-bar – render & ARIA
   ============================================================ */

describe('nldd-tab-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-tab-bar></nldd-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a div container by default (not nav)', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.tab-bar')).not.toBeNull();
		expect(el.shadowRoot!.querySelector('nav')).toBeNull();
	});

	it('sets role="tablist" on tab-bar__items', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.tab-bar__items')!.getAttribute('role')).toBe('tablist');
	});

	it('does not set role on host', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBeNull();
	});
});


/* ============================================================
   nldd-tab-bar – accessible label
   ============================================================ */

describe('nldd-tab-bar – accessible label', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('falls back to "Tabs" when no accessible-label is provided', async () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDTabBar>('<nldd-tab-bar></nldd-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.tab-bar__items')!.getAttribute('aria-label')).toBe('Tabs');
	});

	it('warns once when no accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDTabBar>('<nldd-tab-bar></nldd-tab-bar>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledOnce();
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<NLDDTabBar>('<nldd-tab-bar accessible-label="Navigatie"></nldd-tab-bar>');
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});

	it('forwards accessible-label to the tablist aria-label', async () => {
		el = await fixture<NLDDTabBar>('<nldd-tab-bar accessible-label="Hoofdnavigatie"></nldd-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.tab-bar__items')!.getAttribute('aria-label')).toBe('Hoofdnavigatie');
	});
});


/* ============================================================
   nldd-tab-bar – item selection
   ============================================================ */

describe('nldd-tab-bar – item selection', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is selected', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		expect(items[1].hasAttribute('selected')).toBe(true);

		clickInner(items[2]);
		await waitForUpdate(el);

		expect(items[1].hasAttribute('selected')).toBe(false);
		expect(items[2].hasAttribute('selected')).toBe(true);
	});

	it('dispatches tabchange event with item detail', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('tabchange', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		clickInner(getItems(el)[0]);
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(getItems(el)[0]);
	});

	it('select event does not bubble past the tab bar', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		let selectBubbled = false;
		document.addEventListener('select', () => { selectBubbled = true; }, { once: true });

		clickInner(getItems(el)[0]);
		await waitForUpdate(el);

		expect(selectBubbled).toBe(false);
	});
});


/* ============================================================
   nldd-tab-bar – variant propagation
   ============================================================ */

describe('nldd-tab-bar – variant propagation', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('propagates variant="text" to all items as default', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar variant="text">
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
				<nldd-tab-bar-item><svg slot="icon"></svg>Zoeken</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.getAttribute('variant')).toBe('text');
		});
	});

	it('propagates variant="icon" to all items as default', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar variant="icon">
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
				<nldd-tab-bar-item><svg slot="icon"></svg>Zoeken</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.getAttribute('variant')).toBe('icon');
		});
	});

	it('item-level variant overrides parent variant', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar variant="text">
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
				<nldd-tab-bar-item variant="icon"><svg slot="icon"></svg>Zoeken</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].getAttribute('variant')).toBe('text');
		expect(items[1].getAttribute('variant')).toBe('icon');
	});

	it('compact still overrides parent variant', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar compact variant="text">
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		expect(getItems(el)[0].getAttribute('variant')).toBe('compact');
	});
});


/* ============================================================
   nldd-tab-bar – compact propagation
   ============================================================ */

describe('nldd-tab-bar – compact propagation', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('propagates compact to all items', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar compact>
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
				<nldd-tab-bar-item><svg slot="icon"></svg>Zoeken</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.hasAttribute('compact')).toBe(true);
		});
	});

	it('compact overrides explicit variant on items', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar compact>
				<nldd-tab-bar-item variant="text"><svg slot="icon"></svg>Home</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		expect(getItems(el)[0].getAttribute('variant')).toBe('compact');
	});

	it('removes compact from items when parent compact is removed', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar compact>
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		el.compact = false;
		await waitForUpdate(el);
		expect(getItems(el)[0].hasAttribute('compact')).toBe(false);
	});
});


/* ============================================================
   nldd-tab-bar – responsive propagation
   ============================================================ */

describe('nldd-tab-bar – responsive propagation', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('propagates responsive attribute to all items', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar responsive>
				<nldd-tab-bar-item><svg slot="icon"></svg>Home</nldd-tab-bar-item>
				<nldd-tab-bar-item><svg slot="icon"></svg>Zoeken</nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.hasAttribute('responsive')).toBe(true);
		});
	});

	it('removes responsive from items when parent responsive is removed', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar responsive>
				<nldd-tab-bar-item text="Home"></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		el.responsive = false;
		await waitForUpdate(el);
		expect(getItems(el)[0].hasAttribute('responsive')).toBe(false);
	});
});


/* ============================================================
   nldd-tab-bar – full-width
   ============================================================ */

describe('nldd-tab-bar – full-width', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('reflects full-width attribute on host', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar full-width>
				<nldd-tab-bar-item text="Home"></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('full-width')).toBe(true);
	});
});


/* ============================================================
   nldd-tab-bar – keyboard navigation
   ============================================================ */

describe('nldd-tab-bar – keyboard navigation', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('first enabled item has tabindex="0" when no tab is selected', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar>
				<nldd-tab-bar-item text="A"></nldd-tab-bar-item>
				<nldd-tab-bar-item text="B"></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		const innerA = items[0].shadowRoot!.querySelector('[role="tab"]')!;
		const innerB = items[1].shadowRoot!.querySelector('[role="tab"]')!;
		expect(innerA.getAttribute('tabindex')).toBe('0');
		expect(innerB.getAttribute('tabindex')).toBe('-1');
	});

	it('selected tab has tabindex="0"', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const inner = items[1].shadowRoot!.querySelector('[role="tab"]')!;
		expect(inner.getAttribute('tabindex')).toBe('0');
	});

	it('non-selected tabs have tabindex="-1"', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		const innerA = items[0].shadowRoot!.querySelector('[role="tab"]')!;
		const innerC = items[2].shadowRoot!.querySelector('[role="tab"]')!;
		expect(innerA.getAttribute('tabindex')).toBe('-1');
		expect(innerC.getAttribute('tabindex')).toBe('-1');
	});

	it('ArrowRight auto-activates next tab', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		pressKey(items[1], 'ArrowRight');
		await waitForUpdate(el);
		expect(items[2].selected).toBe(true);
		expect(items[1].selected).toBe(false);
	});

	it('ArrowLeft auto-activates previous tab', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);
		const items = getItems(el);
		pressKey(items[1], 'ArrowLeft');
		await waitForUpdate(el);
		expect(items[0].selected).toBe(true);
		expect(items[1].selected).toBe(false);
	});

	it('ArrowRight calls focus on next item', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[1] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft calls focus on previous item', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[1], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowRight wraps from last to first', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft wraps from first to last', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('Home calls focus on first item', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'Home');
		expect(spy).toHaveBeenCalled();
	});

	it('End calls focus on last item', async () => {
		el = await fixture<NLDDTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'End');
		expect(spy).toHaveBeenCalled();
	});

});

/* ============================================================
   nldd-tab-bar – navigation mode
   ============================================================ */

describe('nldd-tab-bar – navigation mode', () => {
	let el: NLDDTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('renders a nav element when navigation is set', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar navigation accessible-label="Navigatie">
				<nldd-tab-bar-item text="Home" href="/home" selected></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
	});

	it('does not render role="tablist" when navigation is set', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar navigation accessible-label="Navigatie">
				<nldd-tab-bar-item text="Home" href="/home"></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tablist"]')).toBeNull();
	});

	it('sets aria-current="page" on selected link item in navigation mode', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar navigation accessible-label="Navigatie">
				<nldd-tab-bar-item text="Home" href="/home" selected></nldd-tab-bar-item>
				<nldd-tab-bar-item text="Profiel" href="/profiel"></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		const linkA = items[0].shadowRoot!.querySelector('a')!;
		const linkB = items[1].shadowRoot!.querySelector('a')!;
		expect(linkA.getAttribute('aria-current')).toBe('page');
		expect(linkB.getAttribute('aria-current')).toBeNull();
	});

	it('does not set aria-selected on link items in navigation mode', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar navigation accessible-label="Navigatie">
				<nldd-tab-bar-item text="Home" href="/home" selected></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		const link = items[0].shadowRoot!.querySelector('a')!;
		expect(link.getAttribute('aria-selected')).toBeNull();
	});

	it('does not auto-activate on ArrowRight in navigation mode', async () => {
		el = await fixture<NLDDTabBar>(`
			<nldd-tab-bar navigation accessible-label="Navigatie">
				<nldd-tab-bar-item text="Home" href="/home" selected></nldd-tab-bar-item>
				<nldd-tab-bar-item text="Profiel" href="/profiel"></nldd-tab-bar-item>
			</nldd-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		pressKey(items[0], 'ArrowRight');
		await waitForUpdate(el);
		expect(items[0].selected).toBe(true);
		expect(items[1].selected).toBe(false);
	});
});

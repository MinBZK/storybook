import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import type { RRTabBar, RRTabBarItem } from './rr-tab-bar.ts';
import './rr-tab-bar.ts';

function threeTabBar(): string {
	return `
		<rr-tab-bar>
			<rr-tab-bar-item>Tab A</rr-tab-bar-item>
			<rr-tab-bar-item selected>Tab B</rr-tab-bar-item>
			<rr-tab-bar-item>Tab C</rr-tab-bar-item>
		</rr-tab-bar>
	`;
}

function getItems(el: RRTabBar): RRTabBarItem[] {
	return Array.from(el.querySelectorAll('rr-tab-bar-item'));
}

function clickInner(item: Element) {
	const inner = item.shadowRoot!.querySelector('[role="tab"]') as HTMLElement;
	inner.click();
}

function pressKey(target: Element, key: string) {
	target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, composed: true }));
}


/* ============================================================
   rr-tab-bar-item – render
   ============================================================ */

describe('rr-tab-bar-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-tab-bar-item></rr-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a button by default', async () => {
		el = await fixture('<rr-tab-bar-item>Tab</rr-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.tagName.toLowerCase()).toBe('button');
	});

	it('renders an anchor when href is provided', async () => {
		el = await fixture('<rr-tab-bar-item href="/page">Tab</rr-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.tagName.toLowerCase()).toBe('a');
	});

	it('does not render an anchor for unsafe hrefs', async () => {
		el = await fixture('<rr-tab-bar-item href="javascript:void(0)">Tab</rr-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.tagName.toLowerCase()).toBe('button');
	});
});


/* ============================================================
   rr-tab-bar-item – content variant detection
   ============================================================ */

describe('rr-tab-bar-item – content variant detection', () => {
	let el: RRTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets variant to icon-and-text when both slots are filled', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item>
				<svg slot="icon"></svg>
				Tab
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('icon-and-text');
	});

	it('sets variant to text when only text is present', async () => {
		el = await fixture<RRTabBarItem>('<rr-tab-bar-item>Tab</rr-tab-bar-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('text');
	});

	it('sets variant to icon when only an icon slot is filled', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item>
				<svg slot="icon"></svg>
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('icon');
	});

	it('respects explicit variant="text" even when both slots are filled', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item variant="text">
				<svg slot="icon"></svg>
				Tab
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('text');
	});

	it('respects explicit variant="icon" even when both slots are filled', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item variant="icon">
				<svg slot="icon"></svg>
				Tab
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('icon');
	});

	it('sets variant to compact when compact attribute is set', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item compact>
				<svg slot="icon"></svg>
				Tab
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('compact');
	});

	it('compact overrides explicit variant', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item compact variant="text">
				<svg slot="icon"></svg>
				Tab
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('compact');
	});
});


/* ============================================================
   rr-tab-bar-item – icon variant accessibility
   ============================================================ */

describe('rr-tab-bar-item – icon variant accessibility', () => {
	let el: RRTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets aria-label from text slot when variant is icon', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item variant="icon">
				<svg slot="icon"></svg>
				Home
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.getAttribute('aria-label')).toBe('Home');
	});

	it('sets title from text slot when variant is icon', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item variant="icon">
				<svg slot="icon"></svg>
				Home
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.getAttribute('title')).toBe('Home');
	});

	it('does not set aria-label when variant is icon-and-text', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item>
				<svg slot="icon"></svg>
				Home
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.getAttribute('aria-label')).toBeNull();
	});

	it('does not set title when variant is text', async () => {
		el = await fixture<RRTabBarItem>(`
			<rr-tab-bar-item variant="text">
				<svg slot="icon"></svg>
				Home
			</rr-tab-bar-item>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('[role="tab"]')!.getAttribute('title')).toBeNull();
	});
});


/* ============================================================
   rr-tab-bar-item – events
   ============================================================ */

describe('rr-tab-bar-item – events', () => {
	let el: RRTabBarItem;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('fires select event on click', async () => {
		el = await fixture<RRTabBarItem>('<rr-tab-bar-item>Tab</rr-tab-bar-item>');
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('select', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		el.shadowRoot!.querySelector('[role="tab"]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

		expect(detail).toBeDefined();
		expect(detail.item).toBe(el);
	});

	it('does not fire select event when disabled', async () => {
		el = await fixture<RRTabBarItem>('<rr-tab-bar-item disabled>Tab</rr-tab-bar-item>');
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('select', () => { fired = true; });

		el.shadowRoot!.querySelector('[role="tab"]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));

		expect(fired).toBe(false);
	});

	it('does not set selected on itself after click', async () => {
		el = await fixture<RRTabBarItem>('<rr-tab-bar-item>Tab</rr-tab-bar-item>');
		await waitForUpdate(el);

		el.shadowRoot!.querySelector('[role="tab"]')!.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(el.selected).toBe(false);
	});
});


/* ============================================================
   rr-tab-bar – render & ARIA
   ============================================================ */

describe('rr-tab-bar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<rr-tab-bar></rr-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders a nav element', async () => {
		el = await fixture(threeTabBar());
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')).not.toBeNull();
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
   rr-tab-bar – accessible label
   ============================================================ */

describe('rr-tab-bar – accessible label', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('falls back to "Tabs" when no accessible-label is provided', async () => {
		vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRTabBar>('<rr-tab-bar></rr-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).toBe('Tabs');
	});

	it('warns once when no accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRTabBar>('<rr-tab-bar></rr-tab-bar>');
		await waitForUpdate(el);
		expect(warnSpy).toHaveBeenCalledOnce();
		expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('accessible-label'));
	});

	it('does not warn when accessible-label is provided', async () => {
		const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		el = await fixture<RRTabBar>('<rr-tab-bar accessible-label="Navigatie"></rr-tab-bar>');
		await waitForUpdate(el);
		expect(warnSpy).not.toHaveBeenCalled();
	});

	it('forwards accessible-label to the nav aria-label', async () => {
		el = await fixture<RRTabBar>('<rr-tab-bar accessible-label="Hoofdnavigatie"></rr-tab-bar>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('nav')!.getAttribute('aria-label')).toBe('Hoofdnavigatie');
	});
});


/* ============================================================
   rr-tab-bar – item selection
   ============================================================ */

describe('rr-tab-bar – item selection', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('deselects other items when one is selected', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		expect(items[1].hasAttribute('selected')).toBe(true);

		clickInner(items[2]);
		await waitForUpdate(el);

		expect(items[1].hasAttribute('selected')).toBe(false);
		expect(items[2].hasAttribute('selected')).toBe(true);
	});

	it('dispatches tabchange event with item detail', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		let detail: any;
		el.addEventListener('tabchange', ((e: CustomEvent) => { detail = e.detail; }) as EventListener);

		clickInner(getItems(el)[0]);
		await waitForUpdate(el);

		expect(detail).toBeDefined();
		expect(detail.item).toBe(getItems(el)[0]);
	});

	it('does not dispatch tabchange when a disabled item is clicked', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar>
				<rr-tab-bar-item selected>A</rr-tab-bar-item>
				<rr-tab-bar-item disabled>B</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);

		let fired = false;
		el.addEventListener('tabchange', () => { fired = true; });

		clickInner(getItems(el)[1]);
		await waitForUpdate(el);

		expect(fired).toBe(false);
	});

	it('select event does not bubble past the tab bar', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		let selectBubbled = false;
		document.addEventListener('select', () => { selectBubbled = true; }, { once: true });

		clickInner(getItems(el)[0]);
		await waitForUpdate(el);

		expect(selectBubbled).toBe(false);
	});
});


/* ============================================================
   rr-tab-bar – variant propagation
   ============================================================ */

describe('rr-tab-bar – variant propagation', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('propagates variant="text" to all items as default', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar variant="text">
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
				<rr-tab-bar-item><svg slot="icon"></svg>Zoeken</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.getAttribute('variant')).toBe('text');
		});
	});

	it('propagates variant="icon" to all items as default', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar variant="icon">
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
				<rr-tab-bar-item><svg slot="icon"></svg>Zoeken</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.getAttribute('variant')).toBe('icon');
		});
	});

	it('item-level variant overrides parent variant', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar variant="text">
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
				<rr-tab-bar-item variant="icon"><svg slot="icon"></svg>Zoeken</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].getAttribute('variant')).toBe('text');
		expect(items[1].getAttribute('variant')).toBe('icon');
	});

	it('compact still overrides parent variant', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar compact variant="text">
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		expect(getItems(el)[0].getAttribute('variant')).toBe('compact');
	});
});


/* ============================================================
   rr-tab-bar – compact propagation
   ============================================================ */

describe('rr-tab-bar – compact propagation', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('propagates compact to all items', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar compact>
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
				<rr-tab-bar-item><svg slot="icon"></svg>Zoeken</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.hasAttribute('compact')).toBe(true);
		});
	});

	it('compact overrides explicit variant on items', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar compact>
				<rr-tab-bar-item variant="text"><svg slot="icon"></svg>Home</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		expect(getItems(el)[0].getAttribute('variant')).toBe('compact');
	});

	it('removes compact from items when parent compact is removed', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar compact>
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		el.compact = false;
		await waitForUpdate(el);
		expect(getItems(el)[0].hasAttribute('compact')).toBe(false);
	});
});


/* ============================================================
   rr-tab-bar – responsive propagation
   ============================================================ */

describe('rr-tab-bar – responsive propagation', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('propagates responsive attribute to all items', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar responsive>
				<rr-tab-bar-item><svg slot="icon"></svg>Home</rr-tab-bar-item>
				<rr-tab-bar-item><svg slot="icon"></svg>Zoeken</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => {
			expect(item.hasAttribute('responsive')).toBe(true);
		});
	});

	it('removes responsive from items when parent responsive is removed', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar responsive>
				<rr-tab-bar-item>Home</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		el.responsive = false;
		await waitForUpdate(el);
		expect(getItems(el)[0].hasAttribute('responsive')).toBe(false);
	});
});


/* ============================================================
   rr-tab-bar – full-width
   ============================================================ */

describe('rr-tab-bar – full-width', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('reflects full-width attribute on host', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar full-width>
				<rr-tab-bar-item>Home</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		expect(el.hasAttribute('full-width')).toBe(true);
	});
});


/* ============================================================
   rr-tab-bar – disabled propagation
   ============================================================ */

describe('rr-tab-bar – disabled propagation', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('disables all items when parent is disabled', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar disabled>
				<rr-tab-bar-item>A</rr-tab-bar-item>
				<rr-tab-bar-item>B</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		getItems(el).forEach(item => expect(item.disabled).toBe(true));
	});

	it('preserves item-level disabled when parent is not disabled', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar>
				<rr-tab-bar-item>A</rr-tab-bar-item>
				<rr-tab-bar-item disabled>B</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].disabled).toBe(false);
		expect(items[1].disabled).toBe(true);
	});

	it('re-enables group-disabled items when parent disabled is removed', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar disabled>
				<rr-tab-bar-item>A</rr-tab-bar-item>
				<rr-tab-bar-item>B</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		el.disabled = false;
		await waitForUpdate(el);
		getItems(el).forEach(item => expect(item.disabled).toBe(false));
	});

	it('does not re-enable individually disabled items when parent disabled is removed', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar disabled>
				<rr-tab-bar-item>A</rr-tab-bar-item>
				<rr-tab-bar-item disabled>B</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);
		el.disabled = false;
		await waitForUpdate(el);
		const items = getItems(el);
		expect(items[0].disabled).toBe(false);
		expect(items[1].disabled).toBe(true);
	});
});


/* ============================================================
   rr-tab-bar – keyboard navigation
   ============================================================ */

describe('rr-tab-bar – keyboard navigation', () => {
	let el: RRTabBar;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('ArrowRight calls focus on next item', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[1] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft calls focus on previous item', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[1], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowRight wraps from last to first', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});

	it('ArrowLeft wraps from first to last', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowLeft');
		expect(spy).toHaveBeenCalled();
	});

	it('Home calls focus on first item', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[0] as HTMLElement, 'focus');
		pressKey(items[2], 'Home');
		expect(spy).toHaveBeenCalled();
	});

	it('End calls focus on last item', async () => {
		el = await fixture<RRTabBar>(threeTabBar());
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'End');
		expect(spy).toHaveBeenCalled();
	});

	it('skips disabled items during navigation', async () => {
		el = await fixture<RRTabBar>(`
			<rr-tab-bar>
				<rr-tab-bar-item>A</rr-tab-bar-item>
				<rr-tab-bar-item disabled>B</rr-tab-bar-item>
				<rr-tab-bar-item>C</rr-tab-bar-item>
			</rr-tab-bar>
		`);
		await waitForUpdate(el);

		const items = getItems(el);
		const spy = vi.spyOn(items[2] as HTMLElement, 'focus');
		pressKey(items[0], 'ArrowRight');
		expect(spy).toHaveBeenCalled();
	});
});

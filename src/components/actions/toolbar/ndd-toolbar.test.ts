import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './ndd-toolbar.ts';

describe('ndd-toolbar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	// ## Smoke tests

	it('renders without error', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<ndd-toolbar size="sm"></ndd-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('defaults show-item-labels to false', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-item-labels')).toBe(false);
	});

	it('reflects show-item-labels attribute', async () => {
		el = await fixture('<ndd-toolbar show-item-labels></ndd-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-item-labels')).toBe(true);
	});

	it('registers ndd-toolbar-item and ndd-toolbar-title-group as custom elements', () => {
		expect(customElements.get('ndd-toolbar-item')).toBeDefined();
		expect(customElements.get('ndd-toolbar-title-group')).toBeDefined();
	});

	// ## Priority-based collapsing order

	it('collapses end items before start items (end has lower priority area order)', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Start" priority="1">
					<ndd-icon-button aria-label="Start"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Start"></ndd-menu-item>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="end" label="End" priority="1">
					<ndd-icon-button aria-label="End"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="End"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _getPrioritizedItems: () => { label: string }[] };
		const prioritized = toolbar._getPrioritizedItems();
		expect(prioritized[0].label).toBe('End');
		expect(prioritized[1].label).toBe('Start');
	});

	it('collapses lower priority number items first', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="High" priority="5">
					<ndd-icon-button aria-label="High"></ndd-icon-button>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Low" priority="1">
					<ndd-icon-button aria-label="Low"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_getPrioritizedItems: () => { label: string; priority: number }[];
		};
		const prioritized = toolbar._getPrioritizedItems();
		expect(prioritized[0].label).toBe('Low');
		expect(prioritized[1].label).toBe('High');
	});

	// ## Children building

	it('builds start children from slot="start"', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Item A">
					<ndd-icon-button aria-label="A"></ndd-icon-button>
				</ndd-toolbar-item>
				<ndd-toolbar-item slot="start" label="Item B">
					<ndd-icon-button aria-label="B"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { label: string }[] };
		expect(toolbar._startChildren.length).toBe(2);
		expect(toolbar._startChildren[0].label).toBe('Item A');
	});

	it('builds center children from slot="center"', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-title-group slot="center" text="Titel"></ndd-toolbar-title-group>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _centerChildren: { type: string }[] };
		expect(toolbar._centerChildren.length).toBe(1);
		expect(toolbar._centerChildren[0].type).toBe('title-group');
	});

	it('builds end children from slot="end"', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="end" label="End Item">
					<ndd-icon-button aria-label="End"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _endChildren: { label: string }[] };
		expect(toolbar._endChildren.length).toBe(1);
		expect(toolbar._endChildren[0].label).toBe('End Item');
	});

	// ## Overflow items

	it('separates overflow items from toolbar-item children', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Item">
					<ndd-icon-button aria-label="Item"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Item overflow"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { overflowItems: Element[] }[] };
		expect(toolbar._startChildren[0].overflowItems.length).toBe(1);
	});

	it('builds pinned overflow items from slot="overflow"', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-menu-item slot="overflow" text="Altijd zichtbaar"></ndd-menu-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _pinnedOverflowItems: Element[] };
		expect(toolbar._pinnedOverflowItems.length).toBe(1);
	});

	// ## Size propagation

	it('propagates size to toolbar item children', async () => {
		el = await fixture(`
			<ndd-toolbar size="sm">
				<ndd-toolbar-item slot="start" label="Item">
					<ndd-icon-button aria-label="Item"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const button = el.querySelector('ndd-icon-button');
		expect(button?.getAttribute('size')).toBe('sm');
	});

	it('does not propagate size to overflow slot children', async () => {
		el = await fixture(`
			<ndd-toolbar size="sm">
				<ndd-toolbar-item slot="start" label="Item">
					<ndd-icon-button aria-label="Item"></ndd-icon-button>
					<ndd-menu-item slot="overflow" text="Overflow"></ndd-menu-item>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const menuItem = el.querySelector('ndd-menu-item');
		expect(menuItem?.getAttribute('size')).toBeNull();
	});

	// ## MutationObserver

	it('rebuilds children when a new item is added', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Item A">
					<ndd-icon-button aria-label="A"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);

		const toolbar = el as unknown as { _startChildren: unknown[]; _buildChildren: () => void };
		expect(toolbar._startChildren.length).toBe(1);

		const spy = vi.spyOn(toolbar, '_buildChildren');
		const newItem = document.createElement('ndd-toolbar-item');
		newItem.setAttribute('label', 'Item B');
		newItem.setAttribute('slot', 'start');
		el.appendChild(newItem);

		await new Promise((resolve) => setTimeout(resolve, 50));
		expect(spy).toHaveBeenCalled();
	});

	it('preserves children when a descendant selected attribute changes', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Item">
					<button selected>Toggle</button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);

		const toolbar = el as unknown as { _startChildren: unknown[] };
		expect(toolbar._startChildren.length).toBe(1);

		const button = el.querySelector('button')!;
		button.removeAttribute('selected');
		await waitForUpdate(el);

		expect(toolbar._startChildren.length).toBe(1);

		const slot = el.shadowRoot?.querySelector('slot[name^="child-"]');
		expect(slot).not.toBeNull();
	});

	// ## _computeSpacerZeros

	it('returns both zeros true when start and end are both empty', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_computeSpacerZeros: (
				h: number,
				g: number,
				o: number,
				s: number,
				c: number,
				e: number
			) => { leftZero: boolean; rightZero: boolean };
		};
		const result = toolbar._computeSpacerZeros(800, 8, 0, 0, 200, 0);
		expect(result.leftZero).toBe(true);
		expect(result.rightZero).toBe(true);
	});

	it('returns leftZero true when start overflows into center', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_computeSpacerZeros: (
				h: number,
				g: number,
				o: number,
				s: number,
				c: number,
				e: number
			) => { leftZero: boolean; rightZero: boolean };
		};
		const result = toolbar._computeSpacerZeros(800, 8, 0, 500, 200, 100);
		expect(result.leftZero).toBe(true);
	});

	// ## Menu sync

	it('creates a menu element on connectedCallback', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as { _menu: Element | null };
		expect(toolbar._menu).not.toBeNull();
		expect(toolbar._menu?.tagName.toLowerCase()).toBe('ndd-menu');
		toolbar._menu?.remove();
	});

	it('removes menu on disconnectedCallback', async () => {
		el = await fixture('<ndd-toolbar></ndd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as { _menu: Element | null };
		const menu = toolbar._menu;
		expect(menu).not.toBeNull();
		cleanup(el);
		el = null as unknown as HTMLElement;
		expect(toolbar._menu).toBeNull();
	});

	// ## Fluid item detection

	it('marks item as fluid when min-width attribute is set', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Fluid" min-width="120px">
					<ndd-icon-button aria-label="Fluid"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(true);
	});

	it('does not mark item as fluid without min-width or width', async () => {
		el = await fixture(`
			<ndd-toolbar>
				<ndd-toolbar-item slot="start" label="Normal">
					<ndd-icon-button aria-label="Normal"></ndd-icon-button>
				</ndd-toolbar-item>
			</ndd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(false);
	});
});

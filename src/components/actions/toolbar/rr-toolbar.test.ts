import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.ts';
import './rr-toolbar.ts';

describe('rr-toolbar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	// ## Smoke tests

	it('renders without error', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<rr-toolbar size="sm"></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('defaults show-item-labels to false', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-item-labels')).toBe(false);
	});

	it('reflects show-item-labels attribute', async () => {
		el = await fixture('<rr-toolbar show-item-labels></rr-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-item-labels')).toBe(true);
	});

	it('registers marker elements as custom elements', () => {
		expect(customElements.get('rr-toolbar-item')).toBeDefined();
		expect(customElements.get('rr-toolbar-title-group')).toBeDefined();
		expect(customElements.get('rr-toolbar-start-area')).toBeDefined();
		expect(customElements.get('rr-toolbar-end-area')).toBeDefined();
		expect(customElements.get('rr-toolbar-overflow-area')).toBeDefined();
	});

	// ## Priority-based collapsing order

	it('collapses end items before start items (end has lower priority area order)', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Start" priority="1">
						<rr-icon-button aria-label="Start"></rr-icon-button>
						<rr-menu-item slot="overflow" text="Start"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
				<rr-toolbar-end-area>
					<rr-toolbar-item label="End" priority="1">
						<rr-icon-button aria-label="End"></rr-icon-button>
						<rr-menu-item slot="overflow" text="End"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-end-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _getPrioritizedItems: () => { label: string }[] };
		const prioritized = toolbar._getPrioritizedItems();
		expect(prioritized[0].label).toBe('End');
		expect(prioritized[1].label).toBe('Start');
	});

	it('collapses lower priority number items first', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="High" priority="5">
						<rr-icon-button aria-label="High"></rr-icon-button>
					</rr-toolbar-item>
					<rr-toolbar-item label="Low" priority="1">
						<rr-icon-button aria-label="Low"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _getPrioritizedItems: () => { label: string; priority: number }[] };
		const prioritized = toolbar._getPrioritizedItems();
		expect(prioritized[0].label).toBe('Low');
		expect(prioritized[1].label).toBe('High');
	});

	// ## Children building

	it('builds start children from rr-toolbar-start-area', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Item A">
						<rr-icon-button aria-label="A"></rr-icon-button>
					</rr-toolbar-item>
					<rr-toolbar-item label="Item B">
						<rr-icon-button aria-label="B"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { label: string }[] };
		expect(toolbar._startChildren.length).toBe(2);
		expect(toolbar._startChildren[0].label).toBe('Item A');
	});

	it('builds center children from rr-toolbar-center-area', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-center-area>
					<rr-toolbar-title-group text="Titel"></rr-toolbar-title-group>
				</rr-toolbar-center-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _centerChildren: { type: string }[] };
		expect(toolbar._centerChildren.length).toBe(1);
		expect(toolbar._centerChildren[0].type).toBe('title-group');
	});

	it('builds end children from rr-toolbar-end-area', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-end-area>
					<rr-toolbar-item label="End Item">
						<rr-icon-button aria-label="End"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-end-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _endChildren: { label: string }[] };
		expect(toolbar._endChildren.length).toBe(1);
		expect(toolbar._endChildren[0].label).toBe('End Item');
	});

	// ## Overflow items

	it('separates overflow items from toolbar-item children', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Item">
						<rr-icon-button aria-label="Item"></rr-icon-button>
						<rr-menu-item slot="overflow" text="Item overflow"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { overflowItems: Element[] }[] };
		expect(toolbar._startChildren[0].overflowItems.length).toBe(1);
	});

	it('builds pinned overflow items from rr-toolbar-overflow-area', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-overflow-area>
					<rr-menu-item text="Altijd zichtbaar"></rr-menu-item>
				</rr-toolbar-overflow-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _pinnedOverflowItems: Element[] };
		expect(toolbar._pinnedOverflowItems.length).toBe(1);
	});

	// ## Size propagation

	it('propagates size to toolbar item children', async () => {
		el = await fixture(`
			<rr-toolbar size="sm">
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Item">
						<rr-icon-button aria-label="Item"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const button = el.querySelector('rr-icon-button');
		expect(button?.getAttribute('size')).toBe('sm');
	});

	it('does not propagate size to overflow slot children', async () => {
		el = await fixture(`
			<rr-toolbar size="sm">
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Item">
						<rr-icon-button aria-label="Item"></rr-icon-button>
						<rr-menu-item slot="overflow" text="Overflow"></rr-menu-item>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const menuItem = el.querySelector('rr-menu-item');
		expect(menuItem?.getAttribute('size')).toBeNull();
	});

	// ## MutationObserver

	it('rebuilds children when a new item is added', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Item A">
						<rr-icon-button aria-label="A"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);

		const toolbar = el as unknown as { _startChildren: unknown[]; _buildChildren: () => void };
		expect(toolbar._startChildren.length).toBe(1);

		const spy = vi.spyOn(toolbar, '_buildChildren');
		const newItem = document.createElement('rr-toolbar-item');
		newItem.setAttribute('label', 'Item B');
		el.querySelector('rr-toolbar-start-area')!.appendChild(newItem);

		await new Promise(resolve => setTimeout(resolve, 50));
		expect(spy).toHaveBeenCalled();
	});

	// ## _computeSpacerZeros

	it('returns both zeros true when start and end are both empty', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_computeSpacerZeros: (h: number, g: number, o: number, s: number, c: number, e: number) => { leftZero: boolean; rightZero: boolean };
		};
		const result = toolbar._computeSpacerZeros(800, 8, 0, 0, 200, 0);
		expect(result.leftZero).toBe(true);
		expect(result.rightZero).toBe(true);
	});

	it('returns leftZero true when start overflows into center', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_computeSpacerZeros: (h: number, g: number, o: number, s: number, c: number, e: number) => { leftZero: boolean; rightZero: boolean };
		};
		// startWidth=500, centerWidth=200 — left spacer = 400 - 500 - 100 - 8 < 0
		const result = toolbar._computeSpacerZeros(800, 8, 0, 500, 200, 100);
		expect(result.leftZero).toBe(true);
	});

	// ## Menu sync

	it('creates a menu element on connectedCallback', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as { _menu: Element | null };
		expect(toolbar._menu).not.toBeNull();
		expect(toolbar._menu?.tagName.toLowerCase()).toBe('rr-menu');
		// cleanup menu from body
		toolbar._menu?.remove();
	});

	it('removes menu on disconnectedCallback', async () => {
		el = await fixture('<rr-toolbar></rr-toolbar>');
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
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Fluid" min-width="120px">
						<rr-icon-button aria-label="Fluid"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(true);
	});

	it('does not mark item as fluid without min-width or width', async () => {
		el = await fixture(`
			<rr-toolbar>
				<rr-toolbar-start-area>
					<rr-toolbar-item label="Normal">
						<rr-icon-button aria-label="Normal"></rr-icon-button>
					</rr-toolbar-item>
				</rr-toolbar-start-area>
			</rr-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(false);
	});
});

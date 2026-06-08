import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import { groupForOverflow } from './toolbar.js';

describe('nldd-toolbar', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	// ## Smoke tests

	it('renders without error', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to md size', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('md');
	});

	it('reflects size attribute', async () => {
		el = await fixture('<nldd-toolbar size="sm"></nldd-toolbar>');
		await waitForUpdate(el);
		expect(el.getAttribute('size')).toBe('sm');
	});

	it('defaults show-item-labels to false', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-item-labels')).toBe(false);
	});

	it('reflects show-item-labels attribute', async () => {
		el = await fixture('<nldd-toolbar show-item-labels></nldd-toolbar>');
		await waitForUpdate(el);
		expect(el.hasAttribute('show-item-labels')).toBe(true);
	});

	it('registers nldd-toolbar-item and nldd-toolbar-title as custom elements', () => {
		expect(customElements.get('nldd-toolbar-item')).toBeDefined();
		expect(customElements.get('nldd-toolbar-title')).toBeDefined();
	});

	// ## Priority-based collapsing order

	it('collapses end items before start items (end has lower priority area order)', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Start" priority="1">
					<nldd-icon-button aria-label="Start"></nldd-icon-button>
					<nldd-menu-item slot="overflow" text="Start"></nldd-menu-item>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="end" label="End" priority="1">
					<nldd-icon-button aria-label="End"></nldd-icon-button>
					<nldd-menu-item slot="overflow" text="End"></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _getPrioritizedItems: () => { label: string }[] };
		const prioritized = toolbar._getPrioritizedItems();
		expect(prioritized[0].label).toBe('End');
		expect(prioritized[1].label).toBe('Start');
	});

	it('collapses lower priority number items first', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="High" priority="5">
					<nldd-icon-button aria-label="High"></nldd-icon-button>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="start" label="Low" priority="1">
					<nldd-icon-button aria-label="Low"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _getPrioritizedItems: () => { label: string; priority: number }[] };
		const prioritized = toolbar._getPrioritizedItems();
		expect(prioritized[0].label).toBe('Low');
		expect(prioritized[1].label).toBe('High');
	});

	// ## Children building

	it('builds start children from slot="start"', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Item A">
					<nldd-icon-button aria-label="A"></nldd-icon-button>
				</nldd-toolbar-item>
				<nldd-toolbar-item slot="start" label="Item B">
					<nldd-icon-button aria-label="B"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { label: string }[] };
		expect(toolbar._startChildren.length).toBe(2);
		expect(toolbar._startChildren[0].label).toBe('Item A');
	});

	it('builds center children from slot="center"', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-title slot="center" text="Titel"></nldd-toolbar-title>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _centerChildren: { type: string }[] };
		expect(toolbar._centerChildren.length).toBe(1);
		expect(toolbar._centerChildren[0].type).toBe('title');
	});

	it('builds end children from slot="end"', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="end" label="End Item">
					<nldd-icon-button aria-label="End"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _endChildren: { label: string }[] };
		expect(toolbar._endChildren.length).toBe(1);
		expect(toolbar._endChildren[0].label).toBe('End Item');
	});

	// ## Title rendering

	it('item renders its own label in its shadow root', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Bewerken">
					<nldd-icon-button aria-label="Bewerken"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const item = el.querySelector('nldd-toolbar-item')!;
		const label = item.shadowRoot?.querySelector('.toolbar__item-label');
		expect(label?.textContent).toBe('Bewerken');
	});

	it('title renders text and supporting text in its shadow root', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-title slot="center" text="Titel" supporting-text="Subtitel"></nldd-toolbar-title>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const title = el.querySelector('nldd-toolbar-title')!;
		expect(title.shadowRoot?.querySelector('.toolbar__title')?.textContent).toBe('Titel');
		expect(title.shadowRoot?.querySelector('.toolbar__subtitle')?.textContent).toBe('Subtitel');
	});

	it('centers title text when align="center" (overriding the inherited-text reset)', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-title slot="center" text="Titel" align="center"></nldd-toolbar-title>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const title = el.querySelector('nldd-toolbar-title')!;
		const titleText = title.shadowRoot!.querySelector('.toolbar__title') as HTMLElement;
		expect(getComputedStyle(titleText).textAlign).toBe('center');
	});

	it('maps title min-width to --_title-group-min-width', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-title slot="center" text="Titel" min-width="300px"></nldd-toolbar-title>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const title = el.querySelector('nldd-toolbar-title') as HTMLElement;
		expect(title.style.getPropertyValue('--_title-group-min-width')).toBe('300px');
	});

	it('maps title width and max-width to custom properties', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-title slot="center" text="Titel" width="40%" max-width="480px"></nldd-toolbar-title>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const title = el.querySelector('nldd-toolbar-title')!;
		expect(title.style.getPropertyValue('--_title-width')).toBe('40%');
		expect(title.style.getPropertyValue('--_title-max-width')).toBe('480px');
	});

	// ## Overflow items

	it('separates overflow items from toolbar-item children', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Item">
					<nldd-icon-button aria-label="Item"></nldd-icon-button>
					<nldd-menu-item slot="overflow" text="Item overflow"></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { overflowItems: Element[] }[] };
		expect(toolbar._startChildren[0].overflowItems.length).toBe(1);
	});

	it('builds pinned overflow items from slot="overflow"', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-menu-item slot="overflow" text="Altijd zichtbaar"></nldd-menu-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _pinnedOverflowItems: Element[] };
		expect(toolbar._pinnedOverflowItems.length).toBe(1);
	});

	// ## Size propagation

	it('propagates size to toolbar item children', async () => {
		el = await fixture(`
			<nldd-toolbar size="sm">
				<nldd-toolbar-item slot="start" label="Item">
					<nldd-icon-button aria-label="Item"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const button = el.querySelector('nldd-icon-button');
		expect(button?.getAttribute('size')).toBe('sm');
	});

	it('does not propagate size to overflow slot children', async () => {
		el = await fixture(`
			<nldd-toolbar size="sm">
				<nldd-toolbar-item slot="start" label="Item">
					<nldd-icon-button aria-label="Item"></nldd-icon-button>
					<nldd-menu-item slot="overflow" text="Overflow"></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const menuItem = el.querySelector('nldd-menu-item');
		expect(menuItem?.getAttribute('size')).toBeNull();
	});

	it('propagates lg size to toolbar item children', async () => {
		el = await fixture(`
			<nldd-toolbar size="lg">
				<nldd-toolbar-item slot="start" label="Item">
					<nldd-icon-button aria-label="Item"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const button = el.querySelector('nldd-icon-button');
		expect(button?.getAttribute('size')).toBe('lg');
	});

	it('renders the overflow button at the toolbar size', async () => {
		el = await fixture(`
			<nldd-toolbar size="lg">
				<nldd-toolbar-item slot="start" label="Item">
					<nldd-icon-button aria-label="Item"></nldd-icon-button>
					<nldd-menu-item slot="overflow" text="Item"></nldd-menu-item>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const overflowButton = el.shadowRoot?.querySelector('.toolbar__overflow-button nldd-icon-button');
		expect(overflowButton?.getAttribute('size')).toBe('lg');
	});

	// ## MutationObserver

	it('rebuilds children when a new item is added', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Item A">
					<nldd-icon-button aria-label="A"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);

		const toolbar = el as unknown as { _startChildren: unknown[]; _buildChildren: () => void };
		expect(toolbar._startChildren.length).toBe(1);

		const spy = vi.spyOn(toolbar, '_buildChildren');
		const newItem = document.createElement('nldd-toolbar-item');
		newItem.setAttribute('label', 'Item B');
		newItem.setAttribute('slot', 'start');
		el.appendChild(newItem);

		await new Promise(resolve => setTimeout(resolve, 50));
		expect(spy).toHaveBeenCalled();
	});

	it('preserves children when a descendant selected attribute changes', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Item">
					<button selected>Toggle</button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);

		const toolbar = el as unknown as { _startChildren: unknown[] };
		expect(toolbar._startChildren.length).toBe(1);

		const button = el.querySelector('button')!;
		button.removeAttribute('selected');
		await waitForUpdate(el);

		expect(toolbar._startChildren.length).toBe(1);

		// The item host keeps its original slot assignment and stays projected
		// into the parent's named slot — it is not lost on a descendant change.
		const item = el.querySelector('nldd-toolbar-item')!;
		expect(item.getAttribute('slot')).toBe('start');
		const slot = el.shadowRoot?.querySelector('slot[name="start"]');
		expect(slot).not.toBeNull();
	});

	// ## _computeSpacerZeros

	it('returns both zeros true when start and end are both empty', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_computeSpacerZeros: (h: number, g: number, o: number, s: number, c: number, e: number) => { leftZero: boolean; rightZero: boolean };
		};
		const result = toolbar._computeSpacerZeros(800, 8, 0, 0, 200, 0);
		expect(result.leftZero).toBe(true);
		expect(result.rightZero).toBe(true);
	});

	it('returns leftZero true when start overflows into center', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as {
			_computeSpacerZeros: (h: number, g: number, o: number, s: number, c: number, e: number) => { leftZero: boolean; rightZero: boolean };
		};
		const result = toolbar._computeSpacerZeros(800, 8, 0, 500, 200, 100);
		expect(result.leftZero).toBe(true);
	});

	// ## Menu sync

	it('creates a menu element on connectedCallback', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
		await waitForUpdate(el);
		const toolbar = el as unknown as { _menu: Element | null };
		expect(toolbar._menu).not.toBeNull();
		expect(toolbar._menu?.tagName.toLowerCase()).toBe('nldd-menu');
		toolbar._menu?.remove();
	});

	it('removes menu on disconnectedCallback', async () => {
		el = await fixture('<nldd-toolbar></nldd-toolbar>');
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
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Fluid" min-width="120px">
					<nldd-icon-button aria-label="Fluid"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(true);
	});

	it('marks item as fluid when max-width attribute is set', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Capped" max-width="480px">
					<nldd-icon-button aria-label="Capped"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean; maxWidth: string }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(true);
		expect(toolbar._startChildren[0].maxWidth).toBe('480px');
	});

	it('does not mark item as fluid without min-width, max-width or width', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Normal">
					<nldd-icon-button aria-label="Normal"></nldd-icon-button>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { isFluid: boolean }[] };
		expect(toolbar._startChildren[0].isFluid).toBe(false);
	});

	it('treats a menu-group as an overflow item', async () => {
		el = await fixture(`
			<nldd-toolbar>
				<nldd-toolbar-item slot="start" label="Opmaak">
					<nldd-icon-button aria-label="Opmaak"></nldd-icon-button>
					<nldd-menu-group slot="overflow" text="Opmaak">
						<nldd-menu-item text="Vet"></nldd-menu-item>
					</nldd-menu-group>
				</nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		const toolbar = el as unknown as { _startChildren: { overflowItems: Element[] }[] };
		const overflow = toolbar._startChildren[0].overflowItems;
		expect(overflow.length).toBe(1);
		expect(overflow[0].tagName.toLowerCase()).toBe('nldd-menu-group');
	});

	it('overflows same-priority items together (whole groups)', async () => {
		el = await fixture(`
			<nldd-toolbar style="display:block;width:120px" label="T">
				<nldd-toolbar-item slot="start" priority="1"><div style="width:50px;height:24px"></div><nldd-menu-item slot="overflow" text="A"></nldd-menu-item></nldd-toolbar-item>
				<nldd-toolbar-item slot="start" priority="1"><div style="width:50px;height:24px"></div><nldd-menu-item slot="overflow" text="B"></nldd-menu-item></nldd-toolbar-item>
				<nldd-toolbar-item slot="start" priority="2"><div style="width:50px;height:24px"></div><nldd-menu-item slot="overflow" text="C"></nldd-menu-item></nldd-toolbar-item>
				<nldd-toolbar-item slot="start" priority="2"><div style="width:50px;height:24px"></div><nldd-menu-item slot="overflow" text="D"></nldd-menu-item></nldd-toolbar-item>
			</nldd-toolbar>
		`);
		await waitForUpdate(el);
		(el as unknown as { _measureAndUpdate(): void })._measureAndUpdate();
		const items = [...el.querySelectorAll('nldd-toolbar-item')] as HTMLElement[];
		const byPriority: Record<string, HTMLElement[]> = {};
		for (const item of items) {
			const p = item.getAttribute('priority')!;
			if (!byPriority[p]) byPriority[p] = [];
			byPriority[p].push(item);
		}
		for (const group of Object.values(byPriority)) {
			const hiddenCount = group.filter(i => i.hidden).length;
			expect(hiddenCount === 0 || hiddenCount === group.length).toBe(true);
		}
		expect(items.some(i => i.hidden)).toBe(true);
	});

	it('groups only explicit priorities for overflow (no priority attribute = individual)', () => {
		// Partial fixture cast to the item type: groupForOverflow only reads
		// type/priority/hasPriority, so the remaining ToolbarChild fields are
		// intentionally omitted. If that type gains a required field this cast hides
		// it — revisit when the groupForOverflow input changes.
		const item = (id: number, priority: number, hasPriority: boolean) =>
			({ type: 'item', id, priority, hasPriority }) as unknown as Parameters<typeof groupForOverflow>[0][number];
		const ids = (groups: ReturnType<typeof groupForOverflow>) => groups.map(g => g.map(c => c.id));
		// No priority attribute → each item is its own group (overflows individually).
		expect(ids(groupForOverflow([item(1, 0, false), item(2, 0, false)]))).toEqual([[1], [2]]);
		// Shared explicit priority → one group; a different priority → its own group.
		expect(ids(groupForOverflow([item(1, 1, true), item(2, 1, true), item(3, 2, true)]))).toEqual([[1, 2], [3]]);
		// Explicit and default-0 are never merged.
		expect(ids(groupForOverflow([item(1, 0, false), item(2, 1, true), item(3, 1, true)]))).toEqual([[1], [2, 3]]);
	});
});

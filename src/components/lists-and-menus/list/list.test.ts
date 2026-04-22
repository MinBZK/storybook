import { describe, it, expect, afterEach } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './list.js';
import '../list-item/list-item.js';

describe('nldd-list', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-list></nldd-list>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('defaults to simple variant', async () => {
		el = await fixture('<nldd-list></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('simple');
	});

	it('reflects variant attribute', async () => {
		el = await fixture('<nldd-list variant="box"></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('variant')).toBe('box');
	});

	it('renders header slot', async () => {
		el = await fixture(`
			<nldd-list>
				<span slot="header">Header content</span>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const header = el.querySelector('[slot="header"]');
		expect(header?.textContent).toBe('Header content');
	});

	it('reflects no-dividers attribute', async () => {
		el = await fixture('<nldd-list no-dividers></nldd-list>');
		await waitForUpdate(el);
		expect(el.hasAttribute('no-dividers')).toBe(true);
	});

	it('sets --context-list-divider-display when no-dividers is set', async () => {
		el = await fixture('<nldd-list no-dividers></nldd-list>');
		await waitForUpdate(el);
		expect(getComputedStyle(el).getPropertyValue('--context-list-divider-display').trim()).toBe('none');
	});

	it('renders footer slot', async () => {
		el = await fixture(`
			<nldd-list>
				<span slot="footer">Footer content</span>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const footer = el.querySelector('[slot="footer"]');
		expect(footer?.textContent).toBe('Footer content');
	});


	// — Drag: keyboard (direct arrow-reorder) ——————————————————————————————

	it('ArrowDown on a drag handle fires nldd-reorder with the target index', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('nldd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
		expect(reorderDetail!.toIndex).toBe(1);
	});

	it('ArrowUp on the first item is a no-op', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;
		let fired = false;
		el.addEventListener('nldd-reorder', () => { fired = true; });

		handle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('ArrowDown on the last item is a no-op', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only tabindex="0">handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handles = el.querySelectorAll('[reorderable-only]');
		const lastHandle = handles[handles.length - 1] as HTMLElement;
		let fired = false;
		el.addEventListener('nldd-reorder', () => { fired = true; });

		lastHandle.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});

	it('does nothing when the keydown path has no drag handle', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span tabindex="0">no handle</span></nldd-list-item>
				<nldd-list-item><span tabindex="0">no handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const span = el.querySelectorAll('span[tabindex]')[0] as HTMLElement;
		let fired = false;
		el.addEventListener('nldd-reorder', () => { fired = true; });

		span.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(fired).toBe(false);
	});


	// — Drag: pointer ————————————————————————————————————————————————————————

	it('fires nldd-reorder with correct indices after pointer drag', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;

		let reorderDetail: { fromIndex: number; toIndex: number } | null = null;
		el.addEventListener('nldd-reorder', (e: Event) => {
			reorderDetail = (e as CustomEvent).detail;
		});

		handle.dispatchEvent(new PointerEvent('pointerdown', { clientY: 10, pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		el.dispatchEvent(new PointerEvent('pointermove', { clientY: 100, pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		el.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(reorderDetail).not.toBeNull();
		expect(reorderDetail!.fromIndex).toBe(0);
	});

	it('pointer cancel cleans up is-dragging class and removes placeholder', async () => {
		el = await fixture(`
			<nldd-list reorderable>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
				<nldd-list-item><span reorderable-only>handle</span></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const handle = el.querySelectorAll('[reorderable-only]')[0] as HTMLElement;
		const firstItem = el.querySelectorAll('nldd-list-item')[0];

		handle.dispatchEvent(new PointerEvent('pointerdown', { clientY: 10, pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(true);

		el.dispatchEvent(new PointerEvent('pointercancel', { pointerId: 1, bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(firstItem.classList.contains('is-dragging')).toBe(false);
		expect(el.querySelector('.nldd-list-drag-placeholder')).toBeNull();
	});


	// — Type: content (default) ——————————————————————————————————————————————

	it('defaults to type="list" with role="list" on .list__items', async () => {
		el = await fixture('<nldd-list></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('list');
		const itemsEl = el.shadowRoot!.querySelector('.list__items');
		expect(itemsEl?.getAttribute('role')).toBe('list');
		expect(el.hasAttribute('role')).toBe(false);
	});


	// — Type: listbox ————————————————————————————————————————————————————————

	it('listbox: .list__items has role="listbox" and tabindex=0', async () => {
		el = await fixture('<nldd-list type="listbox"></nldd-list>');
		await waitForUpdate(el);
		const itemsEl = el.shadowRoot!.querySelector('.list__items');
		expect(itemsEl?.getAttribute('role')).toBe('listbox');
		expect(itemsEl?.getAttribute('tabindex')).toBe('0');
	});

	it('listbox: ArrowDown sets aria-activedescendant + highlights item', async () => {
		el = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
				<nldd-list-item id="opt-c"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.list__items')!;
		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(itemsEl.getAttribute('aria-activedescendant')).toBe('opt-a');
		expect(el.querySelector('#opt-a')?.hasAttribute('highlighted')).toBe(true);

		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(itemsEl.getAttribute('aria-activedescendant')).toBe('opt-b');
		expect(el.querySelector('#opt-b')?.hasAttribute('highlighted')).toBe(true);
		expect(el.querySelector('#opt-a')?.hasAttribute('highlighted')).toBe(false);
	});

	it('listbox: End jumps to last, Home jumps to first', async () => {
		el = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
				<nldd-list-item id="opt-c"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.list__items')!;
		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(itemsEl.getAttribute('aria-activedescendant')).toBe('opt-c');

		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(itemsEl.getAttribute('aria-activedescendant')).toBe('opt-a');
	});

	it('listbox: Enter dispatches nldd-select with the active item', async () => {
		el = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.list__items')!;
		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);

		let detail: { item: Element; selected: boolean } | null = null;
		el.addEventListener('nldd-select', (e: Event) => {
			detail = (e as CustomEvent).detail;
		});

		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true }));
		await waitForUpdate(el);

		expect(detail).not.toBeNull();
		expect(detail!.item.id).toBe('opt-a');
		expect(detail!.selected).toBe(true);
	});

	it('listbox: click on an item dispatches nldd-select', async () => {
		el = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		let detail: { item: Element; selected: boolean } | null = null;
		el.addEventListener('nldd-select', (e: Event) => {
			detail = (e as CustomEvent).detail;
		});

		const itemB = el.querySelector('#opt-b') as HTMLElement;
		itemB.click();
		await waitForUpdate(el);

		expect(detail).not.toBeNull();
		expect(detail!.item.id).toBe('opt-b');
	});

	it('listbox: ArrowDown wraps from the last to the first item', async () => {
		el = await fixture(`
			<nldd-list type="listbox">
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const itemsEl = el.shadowRoot!.querySelector<HTMLElement>('.list__items')!;
		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true, composed: true }));
		await waitForUpdate(el);
		itemsEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, composed: true }));
		await waitForUpdate(el);
		expect(itemsEl.getAttribute('aria-activedescendant')).toBe('opt-a');
	});


	// — Listbox: controlled (combobox) mode ——————————————————————————————————

	it('controlled listbox: .list__items has no tabindex', async () => {
		el = await fixture('<nldd-list type="listbox" controlled></nldd-list>');
		await waitForUpdate(el);
		const itemsEl = el.shadowRoot!.querySelector('.list__items');
		expect(itemsEl?.hasAttribute('tabindex')).toBe(false);
	});

	it('controlled listbox: no aria-activedescendant on .list__items', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		(el as HTMLElement & { moveHighlight: (dir: string) => void }).moveHighlight('next');
		await waitForUpdate(el);
		const itemsEl = el.shadowRoot!.querySelector('.list__items');
		expect(itemsEl?.hasAttribute('aria-activedescendant')).toBe(false);
	});

	it('moveHighlight("next") wraps at the last item', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const list = el as HTMLElement & { moveHighlight: (dir: string) => void; getHighlightedId: () => string };
		list.moveHighlight('next');
		expect(list.getHighlightedId()).toBe('opt-a');
		list.moveHighlight('next');
		expect(list.getHighlightedId()).toBe('opt-b');
		list.moveHighlight('next');
		expect(list.getHighlightedId()).toBe('opt-a');
	});

	it('moveHighlight("prev") wraps at the first item', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const list = el as HTMLElement & { moveHighlight: (dir: string) => void; getHighlightedId: () => string };
		list.moveHighlight('first');
		expect(list.getHighlightedId()).toBe('opt-a');
		list.moveHighlight('prev');
		expect(list.getHighlightedId()).toBe('opt-b');
	});

	it('moveHighlight skips hidden items', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b" hidden></nldd-list-item>
				<nldd-list-item id="opt-c"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const list = el as HTMLElement & { moveHighlight: (dir: string) => void; getHighlightedId: () => string };
		list.moveHighlight('first');
		list.moveHighlight('next');
		expect(list.getHighlightedId()).toBe('opt-c');
	});

	it('selectHighlighted dispatches nldd-select for the active item', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		let detail: { item: Element } | null = null;
		el.addEventListener('nldd-select', (e: Event) => {
			detail = (e as CustomEvent).detail;
		});

		const list = el as HTMLElement & { moveHighlight: (dir: string) => void; selectHighlighted: () => void };
		list.moveHighlight('last');
		list.selectHighlighted();

		expect(detail).not.toBeNull();
		expect(detail!.item.id).toBe('opt-b');
	});

	it('clears stale aria-activedescendant when the active item is removed', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const list = el as HTMLElement & {
			moveHighlight: (dir: string) => void;
			getHighlightedId: () => string;
		};
		list.moveHighlight('first');
		expect(list.getHighlightedId()).toBe('opt-a');

		// Consumer removes the active item (e.g. server returned new results)
		el.querySelector('#opt-a')!.remove();
		await waitForUpdate(el);

		expect(list.getHighlightedId()).toBe('');
	});

	it('clears stale aria-activedescendant when the active item is hidden', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
				<nldd-list-item id="opt-b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);

		const list = el as HTMLElement & {
			moveHighlight: (dir: string) => void;
			getHighlightedId: () => string;
		};
		list.moveHighlight('first');
		expect(list.getHighlightedId()).toBe('opt-a');

		el.querySelector('#opt-a')!.setAttribute('hidden', '');
		await waitForUpdate(el);

		expect(list.getHighlightedId()).toBe('');
	});

	it('clearHighlight removes highlight and id', async () => {
		el = await fixture(`
			<nldd-list type="listbox" controlled>
				<nldd-list-item id="opt-a"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const list = el as HTMLElement & {
			moveHighlight: (dir: string) => void;
			clearHighlight: () => void;
			getHighlightedId: () => string;
		};
		list.moveHighlight('first');
		expect(list.getHighlightedId()).toBe('opt-a');
		list.clearHighlight();
		expect(list.getHighlightedId()).toBe('');
		expect(el.querySelector('#opt-a')?.hasAttribute('highlighted')).toBe(false);
	});


	// — Type: navigation ——————————————————————————————————————————————————————

	it('navigation: host gets role="navigation" and a default aria-label', async () => {
		el = await fixture('<nldd-list type="navigation"></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('role')).toBe('navigation');
		expect(el.getAttribute('aria-label')).toBe('Navigatie');
	});

	it('navigation: respects a consumer-provided aria-label', async () => {
		el = await fixture('<nldd-list type="navigation" aria-label="Hoofdmenu"></nldd-list>');
		await waitForUpdate(el);
		expect(el.getAttribute('aria-label')).toBe('Hoofdmenu');
	});

	it('navigation: switching back to content removes role and auto-label', async () => {
		el = await fixture('<nldd-list type="navigation"></nldd-list>');
		await waitForUpdate(el);
		expect(el.hasAttribute('aria-label')).toBe(true);

		el.setAttribute('type', 'list');
		await waitForUpdate(el);
		expect(el.hasAttribute('role')).toBe(false);
		expect(el.hasAttribute('aria-label')).toBe(false);
	});


	// — Type / reorderable conflict ———————————————————————————————————————————

	it('does not set reorderable on items when type is not list', async () => {
		el = await fixture(`
			<nldd-list type="listbox" reorderable>
				<nldd-list-item id="a"></nldd-list-item>
				<nldd-list-item id="b"></nldd-list-item>
			</nldd-list>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('#a')?.hasAttribute('reorderable')).toBe(false);
		expect(el.querySelector('#b')?.hasAttribute('reorderable')).toBe(false);
	});


	// — Empty slot ————————————————————————————————————————————————————————————

	it('empty slot: hidden when items are present', async () => {
		el = await fixture(`
			<nldd-list>
				<nldd-list-item></nldd-list-item>
				<div slot="empty">No results</div>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const empty = el.shadowRoot!.querySelector<HTMLElement>('.list__empty')!;
		expect(empty.hasAttribute('hidden')).toBe(true);
	});

	it('empty slot: visible when there are no items', async () => {
		el = await fixture(`
			<nldd-list>
				<div slot="empty">No results</div>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const empty = el.shadowRoot!.querySelector<HTMLElement>('.list__empty')!;
		expect(empty.hasAttribute('hidden')).toBe(false);
	});

	it('empty slot: visible when all items are [hidden]', async () => {
		el = await fixture(`
			<nldd-list>
				<nldd-list-item hidden></nldd-list-item>
				<nldd-list-item hidden></nldd-list-item>
				<div slot="empty">No results</div>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const empty = el.shadowRoot!.querySelector<HTMLElement>('.list__empty')!;
		expect(empty.hasAttribute('hidden')).toBe(false);
	});

	it('empty slot: toggles when an item is hidden at runtime', async () => {
		el = await fixture(`
			<nldd-list>
				<nldd-list-item id="a"></nldd-list-item>
				<div slot="empty">No results</div>
			</nldd-list>
		`);
		await waitForUpdate(el);
		const empty = el.shadowRoot!.querySelector<HTMLElement>('.list__empty')!;
		expect(empty.hasAttribute('hidden')).toBe(true);

		el.querySelector('#a')!.setAttribute('hidden', '');
		await waitForUpdate(el);
		expect(empty.hasAttribute('hidden')).toBe(false);
	});


	// — Empty default inline-dialog ——————————————————————————————————————————

	it('empty default: renders nldd-inline-dialog with i18n text when no items', async () => {
		el = await fixture('<nldd-list></nldd-list>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(dialog).not.toBeNull();
		expect(dialog!.getAttribute('text')).toBe('Geen resultaten');
	});

	it('empty default: empty-text attribute overrides the i18n default', async () => {
		el = await fixture('<nldd-list empty-text="Niets gevonden"></nldd-list>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(dialog!.getAttribute('text')).toBe('Niets gevonden');
	});

	it('empty default: empty-supporting-text populates the inline-dialog', async () => {
		el = await fixture('<nldd-list empty-supporting-text="Probeer iets anders."></nldd-list>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(dialog!.getAttribute('supporting-text')).toBe('Probeer iets anders.');
	});

	it('empty default: slotted content replaces the default dialog', async () => {
		el = await fixture(`
			<nldd-list>
				<nldd-inline-dialog slot="empty" text="Custom"></nldd-inline-dialog>
			</nldd-list>
		`);
		await waitForUpdate(el);
		// Only the slotted dialog should be visible (slot fallback suppressed)
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="empty"]')!;
		const assigned = slot.assignedElements();
		expect(assigned.length).toBe(1);
		expect(assigned[0].getAttribute('text')).toBe('Custom');
	});
});

import { describe, it, expect, afterEach, vi } from 'vitest';
import { fixture, cleanup, waitForUpdate } from '../../../test-utils.js';
import './menu.js';

function getButton(el: Element): HTMLElement {
	return el.shadowRoot?.querySelector('button') as HTMLElement;
}

describe('nldd-menu', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
		vi.restoreAllMocks();
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-menu></nldd-menu>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders slotted menu items', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		expect(el.querySelectorAll('nldd-menu-item').length).toBe(2);
	});

	it('renders slotted divider', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-divider></nldd-menu-divider>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		expect(el.querySelector('nldd-menu-divider')).not.toBeNull();
	});

	it('wraps around at bottom with ArrowDown', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		const spy = vi.spyOn(getButton(items[0]), 'focus');
		getButton(items[items.length - 1]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('wraps around at top with ArrowUp', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		const spy = vi.spyOn(getButton(items[items.length - 1]), 'focus');
		getButton(items[0]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses first item with ArrowDown when nothing focused', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		const spy = vi.spyOn(getButton(items[0]), 'focus');
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses last item with ArrowUp when nothing focused', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		const spy = vi.spyOn(getButton(items[items.length - 1]), 'focus');
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses first item with Home', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
				<nldd-menu-item text="Item 3"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		const spy = vi.spyOn(getButton(items[0]), 'focus');
		getButton(items[items.length - 1]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});

	it('focuses last item with End', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item 1"></nldd-menu-item>
				<nldd-menu-item text="Item 2"></nldd-menu-item>
				<nldd-menu-item text="Item 3"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		const spy = vi.spyOn(getButton(items[items.length - 1]), 'focus');
		getButton(items[0]).focus();
		el.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
		expect(spy).toHaveBeenCalled();
	});
});

describe('nldd-menu-item', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-menu-item></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('reflects text attribute', async () => {
		el = await fixture('<nldd-menu-item text="Bewerk"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('text')).toBe('Bewerk');
	});

	it('renders an icon-cell when the icon attribute is set', async () => {
		el = await fixture('<nldd-menu-item text="Save" icon="file"></nldd-menu-item>');
		await waitForUpdate(el);
		const iconCell = el.shadowRoot!.querySelector('.menu__item-icon');
		expect(iconCell).not.toBeNull();
		// icon-cell forwards its `icon` attribute to an internal <nldd-icon>.
		expect(iconCell!.getAttribute('icon')).toBe('file');
	});

	it('does not render an icon-cell when the icon attribute is missing', async () => {
		el = await fixture('<nldd-menu-item text="Save"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.menu__item-icon')).toBeNull();
	});

	it('reflects details attribute', async () => {
		el = await fixture('<nldd-menu-item details="Cmd+S"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('details')).toBe('Cmd+S');
	});

	it('defaults type to button', async () => {
		el = await fixture('<nldd-menu-item></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('button');
	});

	it('reflects type checkbox', async () => {
		el = await fixture('<nldd-menu-item type="checkbox"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('checkbox');
	});

	it('reflects type radio', async () => {
		el = await fixture('<nldd-menu-item type="radio"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.getAttribute('type')).toBe('radio');
	});

	it('defaults selected to false', async () => {
		el = await fixture('<nldd-menu-item></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(false);
	});

	it('reflects selected attribute', async () => {
		el = await fixture('<nldd-menu-item type="checkbox" selected></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('selected')).toBe(true);
	});

	it('defaults disabled to false', async () => {
		el = await fixture('<nldd-menu-item></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(false);
	});

	it('reflects disabled attribute', async () => {
		el = await fixture('<nldd-menu-item disabled></nldd-menu-item>');
		await waitForUpdate(el);
		expect(el.hasAttribute('disabled')).toBe(true);
	});

	it('dispatches select event on click', async () => {
		el = await fixture('<nldd-menu-item text="Item"></nldd-menu-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		getButton(el)?.click();
		expect(fired).toBe(true);
	});

	it('does not dispatch select when disabled', async () => {
		el = await fixture('<nldd-menu-item text="Item" disabled></nldd-menu-item>');
		await waitForUpdate(el);
		let fired = false;
		el.addEventListener('select', () => { fired = true; });
		getButton(el)?.click();
		expect(fired).toBe(false);
	});

	it('renders role menuitem for default type', async () => {
		el = await fixture('<nldd-menu-item text="Item"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('role')).toBe('menuitem');
	});

	it('renders role menuitemcheckbox for type checkbox', async () => {
		el = await fixture('<nldd-menu-item type="checkbox" text="Item"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('role')).toBe('menuitemcheckbox');
	});

	it('renders role menuitemradio for type radio', async () => {
		el = await fixture('<nldd-menu-item type="radio" text="Item"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('role')).toBe('menuitemradio');
	});

	it('sets aria-checked for checkbox type', async () => {
		el = await fixture('<nldd-menu-item type="checkbox" selected text="Item"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('aria-checked')).toBe('true');
	});

	it('does not set aria-checked for default type', async () => {
		el = await fixture('<nldd-menu-item text="Item"></nldd-menu-item>');
		await waitForUpdate(el);
		expect(getButton(el).getAttribute('aria-checked')).toBeNull();
	});
});

describe('nldd-menu filter', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('sets query attribute on matching items and clears on non-matching', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Aardappelen"></nldd-menu-item>
				<nldd-menu-item text="Broccoli"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		(el as unknown as { filter(q: string): void }).filter('aa');
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		expect(items[0].getAttribute('query')).toBe('aa');
		expect(items[0].hasAttribute('hidden')).toBe(false);
		expect(items[1].hasAttribute('hidden')).toBe(true);
		expect(items[1].getAttribute('query')).toBe('');
	});

	it('clears all queries when query is empty', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Aardappelen"></nldd-menu-item>
				<nldd-menu-item text="Broccoli"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const menu = el as unknown as { filter(q: string): void };
		menu.filter('aa');
		await waitForUpdate(el);
		menu.filter('');
		await waitForUpdate(el);
		const items = el.querySelectorAll('nldd-menu-item');
		items.forEach(i => {
			expect(i.getAttribute('query') ?? '').toBe('');
			expect(i.hasAttribute('hidden')).toBe(false);
		});
	});
});

describe('nldd-menu empty state', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders default nldd-inline-dialog with i18n text when no items', async () => {
		el = await fixture('<nldd-menu></nldd-menu>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(dialog).not.toBeNull();
		expect(dialog!.getAttribute('text')).toBe('Geen opties beschikbaar');
	});

	it('empty-text attribute overrides the i18n default', async () => {
		el = await fixture('<nldd-menu empty-text="Niets gevonden"></nldd-menu>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(dialog!.getAttribute('text')).toBe('Niets gevonden');
	});

	it('empty-supporting-text populates the inline-dialog', async () => {
		el = await fixture('<nldd-menu empty-supporting-text="Probeer iets anders."></nldd-menu>');
		await waitForUpdate(el);
		const dialog = el.shadowRoot!.querySelector('nldd-inline-dialog');
		expect(dialog!.getAttribute('supporting-text')).toBe('Probeer iets anders.');
	});

	it('slotted content replaces the default dialog', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-inline-dialog slot="empty" text="Custom"></nldd-inline-dialog>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="empty"]')!;
		const assigned = slot.assignedElements();
		expect(assigned.length).toBe(1);
		expect(assigned[0].getAttribute('text')).toBe('Custom');
	});

	it('does not render empty container when items are present', async () => {
		el = await fixture(`
			<nldd-menu>
				<nldd-menu-item text="Item"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(el);
		expect(el.shadowRoot!.querySelector('.menu__empty')).toBeNull();
	});

	it('drops role on .menu when empty', async () => {
		// Empty-state slot renders non-menuitem content; keeping role="menu" or
		// role="listbox" would violate ARIA's required-children rules.
		el = await fixture('<nldd-menu></nldd-menu>');
		await waitForUpdate(el);
		const menuEl = el.shadowRoot!.querySelector('.menu');
		expect(menuEl?.hasAttribute('role')).toBe(false);
	});
});

describe('nldd-menu-divider', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-menu-divider></nldd-menu-divider>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});
});

describe('nldd-menu-group', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('renders without error', async () => {
		el = await fixture('<nldd-menu-group text="Bestand"></nldd-menu-group>');
		await waitForUpdate(el);
		expect(el.shadowRoot).not.toBeNull();
	});

	it('renders the text in the title element', async () => {
		el = await fixture('<nldd-menu-group text="Bestand"></nldd-menu-group>');
		await waitForUpdate(el);
		const title = el.shadowRoot!.querySelector('.menu-group__title');
		expect(title?.textContent).toBe('Bestand');
	});

	it('wraps slotted items in a role="group" container labelled by the title', async () => {
		el = await fixture(`
			<nldd-menu-group text="Bestand">
				<nldd-menu-item text="Open"></nldd-menu-item>
			</nldd-menu-group>
		`);
		await waitForUpdate(el);
		const groupContainer = el.shadowRoot!.querySelector('[role="group"]');
		const title = el.shadowRoot!.querySelector('.menu-group__title');
		expect(groupContainer).not.toBeNull();
		expect(title?.id).toBeTruthy();
		expect(groupContainer?.getAttribute('aria-labelledby')).toBe(title!.id);
	});

	it('hides itself when all its items are filtered out', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-group text="Bestand">
					<nldd-menu-item text="Open"></nldd-menu-item>
					<nldd-menu-item text="Save"></nldd-menu-item>
				</nldd-menu-group>
				<nldd-menu-group text="Bewerken">
					<nldd-menu-item text="Knip"></nldd-menu-item>
				</nldd-menu-group>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const [groupA, groupB] = menu.querySelectorAll('nldd-menu-group');
		(menu as unknown as { filter: (q: string) => void }).filter('knip');
		await waitForUpdate(menu);
		expect(groupA.hasAttribute('hidden')).toBe(true);
		expect(groupB.hasAttribute('hidden')).toBe(false);
		cleanup(menu);
	});

	it('shows empty groups again when filter is cleared', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-group text="Bestand">
					<nldd-menu-item text="Open"></nldd-menu-item>
				</nldd-menu-group>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const group = menu.querySelector('nldd-menu-group')!;
		(menu as unknown as { filter: (q: string) => void }).filter('xx');
		await waitForUpdate(menu);
		expect(group.hasAttribute('hidden')).toBe(true);
		(menu as unknown as { filter: (q: string) => void }).filter('');
		await waitForUpdate(menu);
		expect(group.hasAttribute('hidden')).toBe(false);
		cleanup(menu);
	});

	it('hides an explicit divider that sits directly before a group', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Recent"></nldd-menu-item>
				<nldd-menu-divider></nldd-menu-divider>
				<nldd-menu-group text="Mappen">
					<nldd-menu-item text="Documenten"></nldd-menu-item>
				</nldd-menu-group>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const divider = menu.querySelector('nldd-menu-divider')!;
		// _updateDividerVisibility runs on filter() and on menu open. An empty
		// filter triggers it without changing item visibility.
		(menu as unknown as { filter: (q: string) => void }).filter('');
		await waitForUpdate(menu);
		expect(divider.hasAttribute('hidden')).toBe(true);
		cleanup(menu);
	});
});

describe('nldd-menu-item with submenu', () => {
	let el: HTMLElement;

	afterEach(() => {
		if (el) cleanup(el);
	});

	it('detects a child nldd-menu as a submenu', async () => {
		el = await fixture(`
			<nldd-menu-item text="Bestand">
				<nldd-menu>
					<nldd-menu-item text="Open"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
		`);
		await waitForUpdate(el);
		expect((el as unknown as { _hasSubmenu: boolean })._hasSubmenu).toBe(true);
	});

	it('renders aria-haspopup="menu" on the inner button when a submenu is present', async () => {
		el = await fixture(`
			<nldd-menu-item text="Bestand">
				<nldd-menu>
					<nldd-menu-item text="Open"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
		`);
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.getAttribute('aria-haspopup')).toBe('menu');
		expect(button.getAttribute('aria-expanded')).toBe('false');
	});

	it('does not render aria-haspopup when no submenu is present', async () => {
		el = await fixture('<nldd-menu-item text="Plain"></nldd-menu-item>');
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.hasAttribute('aria-haspopup')).toBe(false);
	});

	it('renders a chevron-right indicator when a submenu is present', async () => {
		el = await fixture(`
			<nldd-menu-item text="Bestand">
				<nldd-menu>
					<nldd-menu-item text="Open"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
		`);
		await waitForUpdate(el);
		const indicator = el.shadowRoot!.querySelector('.menu__item-submenu-indicator');
		expect(indicator).not.toBeNull();
	});

	it('dispatches submenu-open instead of select when clicked', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Bestand">
					<nldd-menu>
						<nldd-menu-item text="Open"></nldd-menu-item>
					</nldd-menu>
				</nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const item = menu.querySelector(':scope > nldd-menu-item') as HTMLElement;
		let selectFired = false;
		let submenuOpenFired = false;
		menu.addEventListener('select', () => { selectFired = true; });
		menu.addEventListener('submenu-open', () => { submenuOpenFired = true; });
		item.shadowRoot!.querySelector('button')!.click();
		expect(submenuOpenFired).toBe(true);
		expect(selectFired).toBe(false);
		cleanup(menu);
	});

	it('marks the item as expanded while its submenu is open', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Bestand">
					<nldd-menu>
						<nldd-menu-item text="Open"></nldd-menu-item>
					</nldd-menu>
				</nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const item = menu.querySelector(':scope > nldd-menu-item') as HTMLElement;
		const button = item.shadowRoot!.querySelector('button')!;
		// Trigger submenu-open via click; the parent menu's listener wires it up.
		button.click();
		await waitForUpdate(item);
		expect(button.getAttribute('aria-expanded')).toBe('true');
		cleanup(menu);
	});
});

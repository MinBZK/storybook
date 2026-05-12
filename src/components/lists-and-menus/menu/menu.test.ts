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

	it('ArrowRight on a focused item-with-submenu opens its submenu', async () => {
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
		// _getFocusedIndex looks for the data-focused attribute, normally set
		// by the menu-item's focusin handler. Test env focus() is unreliable
		// at firing focusin synchronously — set it directly.
		item.setAttribute('data-focused', '');
		let opened = false;
		menu.addEventListener('submenu-open', () => { opened = true; });
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(menu);
		expect(opened).toBe(true);
		cleanup(menu);
	});

	it('ArrowRight on a focused item without a submenu is a no-op', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Plain"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const item = menu.querySelector(':scope > nldd-menu-item') as HTMLElement;
		item.setAttribute('data-focused', '');
		let opened = false;
		menu.addEventListener('submenu-open', () => { opened = true; });
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
		await waitForUpdate(menu);
		expect(opened).toBe(false);
		cleanup(menu);
	});

	it('renders aria-controls on the opener pointing at its submenu id', async () => {
		el = await fixture(`
			<nldd-menu-item text="Bestand">
				<nldd-menu id="explicit-submenu-id">
					<nldd-menu-item text="Open"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
		`);
		await waitForUpdate(el);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.getAttribute('aria-controls')).toBe('explicit-submenu-id');
	});

	it('auto-generates an id on a submenu when none is set so aria-controls works', async () => {
		el = await fixture(`
			<nldd-menu-item text="Bestand">
				<nldd-menu>
					<nldd-menu-item text="Open"></nldd-menu-item>
				</nldd-menu>
			</nldd-menu-item>
		`);
		await waitForUpdate(el);
		const submenu = el.querySelector('nldd-menu')!;
		expect(submenu.id).toMatch(/^nldd-menu-/);
		const button = el.shadowRoot!.querySelector('button')!;
		expect(button.getAttribute('aria-controls')).toBe(submenu.id);
	});
});

describe('nldd-menu typeahead and event lifecycle', () => {
	it('typeahead jumps to the next item starting with the typed character', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Apple"></nldd-menu-item>
				<nldd-menu-item text="Banana"></nldd-menu-item>
				<nldd-menu-item text="Cherry"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const items = menu.querySelectorAll(':scope > nldd-menu-item') as NodeListOf<HTMLElement>;
		items[0].setAttribute('data-focused', '');
		// Spy on focus() of items — the typeahead handler calls .focus() on
		// the matched item. Verifying this works regardless of whether the
		// popover is actually open (which test fixtures don't trigger).
		let focused: HTMLElement | null = null;
		items.forEach(item => {
			item.focus = () => { focused = item; };
		});
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }));
		await waitForUpdate(menu);
		expect(focused).toBe(items[2]);
		cleanup(menu);
	});

	it('typeahead accumulates characters within the buffer window', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Apple"></nldd-menu-item>
				<nldd-menu-item text="Slack"></nldd-menu-item>
				<nldd-menu-item text="Slate"></nldd-menu-item>
				<nldd-menu-item text="Sun"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const items = menu.querySelectorAll(':scope > nldd-menu-item') as NodeListOf<HTMLElement>;
		items[0].setAttribute('data-focused', '');
		let focused: HTMLElement | null = null;
		items.forEach(item => {
			item.focus = () => { focused = item; };
		});
		// Press 'S' — single char, cycles past Apple → Slack
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 's', bubbles: true }));
		await waitForUpdate(menu);
		expect(focused).toBe(items[1]); // Slack

		// Press 'l' immediately after — buffer becomes "sl", matches Slack & Slate.
		// Multi-char starts at currentIndex (Slack=1) which still matches → stay.
		focused = null;
		items[1].setAttribute('data-focused', '');
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 'l', bubbles: true }));
		await waitForUpdate(menu);
		expect(focused).toBe(items[1]); // Slack still matches "sl"
		cleanup(menu);
	});

	it('typeahead buffer resets after the idle window', async () => {
		const menu = await fixture<HTMLElement>(`
			<nldd-menu>
				<nldd-menu-item text="Slack"></nldd-menu-item>
				<nldd-menu-item text="Sun"></nldd-menu-item>
			</nldd-menu>
		`);
		await waitForUpdate(menu);
		const items = menu.querySelectorAll(':scope > nldd-menu-item') as NodeListOf<HTMLElement>;
		items[0].setAttribute('data-focused', '');
		let focused: HTMLElement | null = null;
		items.forEach(item => {
			item.focus = () => { focused = item; };
		});
		// Type 's' — cycles past Slack → Sun
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 's', bubbles: true }));
		await waitForUpdate(menu);
		expect(focused).toBe(items[1]); // Sun

		// Wait for the buffer to reset, then type 's' again — should cycle, not extend.
		items[0].removeAttribute('data-focused');
		items[1].setAttribute('data-focused', '');
		focused = null;
		await new Promise(r => setTimeout(r, 600));
		menu.dispatchEvent(new KeyboardEvent('keydown', { key: 's', bubbles: true }));
		await waitForUpdate(menu);
		expect(focused).toBe(items[0]); // wrap to Slack
		cleanup(menu);
	});

	it('dispatches submenu-close when an opened submenu closes', async () => {
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
		const submenu = item.querySelector(':scope > nldd-menu') as HTMLElement;
		// Open via the synthetic submenu-open event.
		item.dispatchEvent(new CustomEvent('submenu-open', {
			detail: { submenu, item },
			bubbles: true,
		}));
		await waitForUpdate(menu);
		let closeFired = false;
		menu.addEventListener('submenu-close', () => { closeFired = true; });
		(submenu as HTMLElement & { hidePopover: () => void }).hidePopover();
		await waitForUpdate(menu);
		expect(closeFired).toBe(true);
		cleanup(menu);
	});

	it('dispatches submenu-close exactly once when the same submenu is re-opened before closing', async () => {
		// Regression: _handleSubmenuOpen used to register a fresh `toggle`
		// listener on every call. Hover-opening then clicking the same opener
		// (or rapid double-click) would stack listeners and fire submenu-close
		// twice on the eventual close.
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
		const submenu = item.querySelector(':scope > nldd-menu') as HTMLElement;
		const dispatchOpen = () => item.dispatchEvent(new CustomEvent('submenu-open', {
			detail: { submenu, item },
			bubbles: true,
		}));
		dispatchOpen();
		dispatchOpen();
		dispatchOpen();
		await waitForUpdate(menu);
		let closeCount = 0;
		menu.addEventListener('submenu-close', () => { closeCount += 1; });
		(submenu as HTMLElement & { hidePopover: () => void }).hidePopover();
		await waitForUpdate(menu);
		expect(closeCount).toBe(1);
		cleanup(menu);
	});
});

describe('nldd-menu safe-triangle internals', () => {
	type PolygonHelper = (
		p: { x: number, y: number },
		vertices: Array<{ x: number, y: number }>,
	) => boolean;

	// Static helper — reach via the constructor so the test stays honest about
	// it being callable without an instance.
	const pointInPolygon = (
		(customElements.get('nldd-menu') as unknown as { _pointInPolygon: PolygonHelper })._pointInPolygon
	).bind(customElements.get('nldd-menu')) as PolygonHelper;

	it('identifies a point inside a convex wedge as inside', () => {
		// Triangle apex at (0,0), base on x=100 between y=-50..50.
		const wedge = [
			{ x: 0, y: 0 },
			{ x: 100, y: -50 },
			{ x: 100, y: 50 },
		];
		expect(pointInPolygon({ x: 50, y: 0 }, wedge)).toBe(true);
		expect(pointInPolygon({ x: 80, y: 10 }, wedge)).toBe(true);
	});

	it('identifies a point outside a convex wedge as outside', () => {
		const wedge = [
			{ x: 0, y: 0 },
			{ x: 100, y: -50 },
			{ x: 100, y: 50 },
		];
		expect(pointInPolygon({ x: -10, y: 0 }, wedge)).toBe(false);
		expect(pointInPolygon({ x: 50, y: 60 }, wedge)).toBe(false);
		expect(pointInPolygon({ x: 110, y: 0 }, wedge)).toBe(false);
	});

	it('handles a four-point wedge (apex band + far edge) symmetrically', () => {
		// Mirrors the actual safe-triangle shape — apex with ±1px band, far
		// edge on the submenu side. The wedge widens linearly with x, so at
		// the midpoint the vertical span is roughly half the far edge.
		const wedge = [
			{ x: 0, y: -1 },
			{ x: 100, y: -50 },
			{ x: 100, y: 50 },
			{ x: 0, y: 1 },
		];
		expect(pointInPolygon({ x: 50, y: 0 }, wedge)).toBe(true);
		expect(pointInPolygon({ x: 50, y: 20 }, wedge)).toBe(true);
		expect(pointInPolygon({ x: 90, y: 40 }, wedge)).toBe(true);
		// Outside the widening wedge at the midpoint.
		expect(pointInPolygon({ x: 50, y: 40 }, wedge)).toBe(false);
		expect(pointInPolygon({ x: 50, y: -40 }, wedge)).toBe(false);
	});
});

import { LitElement, type PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styles, menuBarItemStyles } from './ndd-top-navigation-bar.styles.js';
import { template, menuBarItemTemplate } from './ndd-top-navigation-bar.template.js';
import { nddTopNavigationBarTranslations } from './ndd-top-navigation-bar.i18n.js';
import type { NDDTopNavigationBarTranslations } from './ndd-top-navigation-bar.i18n.js';
import '../../content/icon/ndd-icon.js';
import '../../lists-and-menus/menu/ndd-menu.js';
// Sheet dependencies loaded lazily in _createMenuSheet()
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

/** Minimal typed interface for ndd-menu popover API. */
interface PopoverMenu extends HTMLElement {
	anchorElement: Element | null;
	showPopover(): void;
	hidePopover(): void;
}

/** Minimal typed interface for ndd-sheet API. */
interface Sheet extends HTMLElement {
	show(): void;
	hide(): void;
}

// # ndd-menu-bar-item

export class NDDMenuBarItem extends LitElement {
	static override styles = menuBarItemStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: Boolean, reflect: true })
	current = false;

	@property({ type: String })
	href = '';

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: Boolean, reflect: true })
	expandable = false;

	@property({ type: Boolean, attribute: 'icon-only', reflect: true })
	iconOnly = false;

	@property({ type: Boolean, attribute: 'sm-icon-only', reflect: true })
	smIconOnly = false;

	@property({ type: Boolean, attribute: 'sm-text-only', reflect: true })
	smTextOnly = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String })
	haspopup = '';

	@property({ type: Boolean, reflect: true })
	open = false;

	// ## Menu popover state

	private _menu: PopoverMenu | null = null;
	private _menuOpen = false;
	private _menuClosedAt = 0;

	// ## Lifecycle

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('click', this._handleClick);
		if (this.expandable) {
			this._createMenu();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('click', this._handleClick);
		this._menu?.remove();
		this._menu = null;
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('expandable')) {
			if (this.expandable && !this._menu) {
				this._createMenu();
			} else if (!this.expandable && this._menu) {
				this._menu.remove();
				this._menu = null;
			}
		}
	}

	override focus(options?: FocusOptions): void {
		const focusable = this.shadowRoot?.querySelector<HTMLElement>('button, a');
		focusable?.focus(options);
	}

	// ## Helpers

	_sanitizeUrl(url: string | null): string | null {
		if (!url) return null;
		const trimmed = url.trim().toLowerCase();
		if (
			trimmed.startsWith('javascript:') ||
			trimmed.startsWith('data:') ||
			trimmed.startsWith('vbscript:')
		) {
			return null;
		}
		return url;
	}

	private _hasMenuItems(): boolean {
		return this.querySelector('ndd-menu-item, ndd-menu-divider') !== null;
	}

	// ## Event handlers

	private _handleClick = (event: Event): void => {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		if (this.expandable && this._hasMenuItems()) {
			event.preventDefault();
			this._toggleMenu();
			return;
		}

		if (!this.href) {
			event.preventDefault();
			this.dispatchEvent(new CustomEvent('select', {
				bubbles: true,
				composed: true,
				detail: { item: this },
			}));
		}
	};

	// ## Menu popover

	private _createMenu(): void {
		if (this._menu) return;
		if (typeof document === 'undefined') return;

		const menu = document.createElement('ndd-menu') as unknown as PopoverMenu;
		menu.setAttribute('placement', 'bottom-start');
		menu.style.setProperty('--_menu-width', 'auto');
		menu.addEventListener('toggle', (event: Event) => {
			const open = (event as ToggleEvent).newState === 'open';
			this._menuOpen = open;
			this.open = open;
			if (!open) this._menuClosedAt = Date.now();
		});
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuItems(): void {
		if (!this._menu) return;
		this._menu.innerHTML = '';

		const items = this.querySelectorAll('ndd-menu-item, ndd-menu-divider');
		items.forEach(item => {
			const clone = item.cloneNode(true) as Element;
			this._menu!.appendChild(clone);
		});
	}

	private _toggleMenu(): void {
		if (!this._menu) return;

		this._menu.anchorElement = this;
		this._syncMenuItems();

		if (this._menuOpen) {
			this._menu.hidePopover();
		} else if (Date.now() - this._menuClosedAt > POPOVER_REOPEN_GUARD_MS) {
			this._menu.showPopover();
		}
	}

	override render() {
		return menuBarItemTemplate.call(this);
	}
}

if (!customElements.get('ndd-menu-bar-item')) {
	customElements.define('ndd-menu-bar-item', NDDMenuBarItem);
}

// # ndd-top-navigation-bar

export class NDDTopNavigationBar extends LitElement {
	static override styles = styles;

	// ## Main properties

	@property({ type: String, attribute: 'website-title' })
	websiteTitle = '';

	// ## Logo properties

	@property({ type: String, attribute: 'logo-title' })
	logoTitle = '';

	@property({ type: String, attribute: 'logo-subtitle' })
	logoSubtitle = '';

	@property({ type: String, attribute: 'logo-supporting-text-1' })
	logoSupportingText1 = '';

	@property({ type: String, attribute: 'logo-supporting-text-2' })
	logoSupportingText2 = '';

	// ## Back button properties

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'back-text' })
	backText = '';

	@property({ type: Object })
	translations: Partial<NDDTopNavigationBarTranslations> = {};

	// ## Internal state

	@query('.top-navigation-bar__global-bar')
	private _globalBarContainer!: HTMLElement;

	@query('.top-navigation-bar__menu-button')
	private _menuButton!: HTMLElement;

	@query('#global-overflow-button')
	private _overflowMenuItem!: HTMLElement;

	@query('#utility-overflow-button')
	private _utilityOverflowMenuItem!: HTMLElement;

	@query('slot[name="global"]')
	private _menuSlot!: HTMLSlotElement;

	@query('slot[name="utility"]')
	private _utilitySlot!: HTMLSlotElement;

	private _overflowMenu: PopoverMenu | null = null;
	private _overflowMenuOpen = false;
	private _overflowMenuClosedAt = 0;

	private _utilityOverflowMenu: PopoverMenu | null = null;
	private _utilityOverflowMenuOpen = false;
	private _utilityOverflowMenuClosedAt = 0;

	private _menuSheet: Sheet | null = null;
	private _menuSheetList: HTMLElement | null = null;

	private _resizeObserver: ResizeObserver | null = null;
	private _isHandlingOverflow = false;
	private _overflowRAF: number | null = null;

	// ## i18n

	private _mergedTranslations = { ...nddTopNavigationBarTranslations };

	_t(key: keyof NDDTopNavigationBarTranslations): string {
		return this._mergedTranslations[key] ?? key;
	}

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nddTopNavigationBarTranslations, ...this.translations };
		}
	}

	// ## Computed properties

	get _hasBackButton(): boolean {
		return Boolean(this.backHref || this.backText);
	}

	get _backText(): string {
		return this.backText || this._t('components.top-navigation-bar.back-action');
	}

	get _overflowText(): string {
		return this._t('components.top-navigation-bar.overflow-action');
	}

	get _menuText(): string {
		return this._t('components.top-navigation-bar.menu-action');
	}

	// ## Lifecycle

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect);
		this._cleanupOverflowDetection();
		this._overflowMenu?.remove();
		this._overflowMenu = null;
		this._utilityOverflowMenu?.remove();
		this._utilityOverflowMenu = null;
		this._menuSheet?.remove();
		this._menuSheet = null;
		this._menuSheetList = null;
	}

	override firstUpdated(): void {
		this._setupOverflowDetection();
	}

	// ## Menu item selection

	private _handleItemSelect = (event: Event): void => {
		const detail = (event as CustomEvent).detail;
		if (!detail?.item) return;
		const slottedItems = this._menuSlot?.assignedElements({ flatten: true }) ?? [];
		if (!slottedItems.includes(detail.item)) return;

		detail.item.current = true;
		slottedItems.forEach(item => {
			if (item !== detail.item) {
				(item as HTMLElement).removeAttribute('current');
			}
		});
		this.dispatchEvent(new CustomEvent('itemselect', {
			bubbles: true,
			composed: true,
			detail,
		}));
	};

	// ## Menu keyboard navigation

	// ## Overflow detection

	private _setupOverflowDetection(): void {
		this._cleanupOverflowDetection();
		requestAnimationFrame(() => {
			this._resizeObserver = new ResizeObserver(() => {
				this._handleOverflow();
			});
			this._resizeObserver.observe(this);
			if (this._menuSlot) {
				this._menuSlot.addEventListener('slotchange', this._handleOverflow);
			}
			if (this._utilitySlot) {
				this._utilitySlot.addEventListener('slotchange', this._handleOverflow);
			}
			this._handleOverflow();
		});
	}

	private _cleanupOverflowDetection(): void {
		if (this._overflowRAF) {
			cancelAnimationFrame(this._overflowRAF);
			this._overflowRAF = null;
		}
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
		if (this._menuSlot) {
			this._menuSlot.removeEventListener('slotchange', this._handleOverflow);
		}
		if (this._utilitySlot) {
			this._utilitySlot.removeEventListener('slotchange', this._handleOverflow);
		}
	}

	private _handleOverflow = (): void => {
		if (this._isHandlingOverflow) return;
		if (this._overflowRAF) cancelAnimationFrame(this._overflowRAF);
		this._overflowRAF = requestAnimationFrame(() => {
			this._isHandlingOverflow = true;
			try {
				this._syncCompactAttribute();
				this._doHandleGlobalBarOverflow();
				this._doHandleUtilityOverflow();
			} finally {
				requestAnimationFrame(() => { this._isHandlingOverflow = false; });
			}
		});
	};

	/** Propagate compact attribute to slotted and internal items when container is sm. */
	private _syncCompactAttribute(): void {
		const isCompact = this._isSmBreakpoint();

		// Slotted items
		const slots = [this._menuSlot, this._utilitySlot];
		for (const slot of slots) {
			const items = slot?.assignedElements({ flatten: true }) ?? [];
			for (const item of items) {
				item.toggleAttribute('compact', isCompact);
			}
		}

		// Internal items (menu-button, overflow buttons, etc.)
		const internalItems = this.shadowRoot?.querySelectorAll('ndd-menu-bar-item') ?? [];
		for (const item of internalItems) {
			item.toggleAttribute('compact', isCompact);
		}

		// Hide menu-button when there are no global slot items
		if (this._menuButton) {
			const globalItems = this._menuSlot?.assignedElements({ flatten: true }) ?? [];
			const hasGlobalItems = globalItems.some(el => el.tagName === 'NDD-MENU-BAR-ITEM');
			this._menuButton.style.display = hasGlobalItems ? '' : 'none';
		}
	}

	/** Check if the container is at the sm breakpoint (<= smMax). */
	private _isSmBreakpoint(): boolean {
		const container = this.shadowRoot?.querySelector('.top-navigation-bar') as HTMLElement;
		if (!container) return false;
		return container.clientWidth <= parseInt(breakpoints.smMax);
	}

	/** Check if the menu-button is currently visible (sm/md breakpoint). */
	private _isMenuButtonVisible(): boolean {
		if (!this._menuButton) return false;
		return getComputedStyle(this._menuButton).display !== 'none';
	}

	/**
	 * Calculate which global items overflow and hide them.
	 * Note: not unit-tested — JSDOM lacks layout support (offsetWidth, clientWidth).
	 * Covered by visual/E2E testing via Storybook ManyGlobalItems story.
	 */
	private _doHandleGlobalBarOverflow(): void {
		if (!this._globalBarContainer || !this._overflowMenuItem) return;

		const slottedElements = this._menuSlot?.assignedElements({ flatten: true }) ?? [];
		const items = slottedElements.filter(el => el.tagName === 'NDD-MENU-BAR-ITEM') as HTMLElement[];

		// On mobile (menu-button visible), hide overflow - menu-button handles navigation
		if (this._isMenuButtonVisible() || items.length === 0) {
			this._overflowMenuItem.style.display = 'none';
			return;
		}

		// Reset all items to visible
		items.forEach(item => {
			item.style.display = '';
			item.style.visibility = 'visible';
			item.removeAttribute('data-overflow');
		});

		this._overflowMenuItem.style.display = 'inline-block';

		const containerWidth = this._globalBarContainer.clientWidth;
		const overflowButtonWidth = this._overflowMenuItem.offsetWidth;

		let usedWidth = 0;
		let overflowStartIndex = -1;

		for (let i = 0; i < items.length; i++) {
			const itemWidth = items[i].offsetWidth;
			const availableWidth = containerWidth - overflowButtonWidth;
			if (usedWidth + itemWidth > availableWidth && overflowStartIndex < 0) {
				overflowStartIndex = i;
				break;
			}
			usedWidth += itemWidth;
		}

		if (overflowStartIndex >= 0) {
			for (let i = overflowStartIndex; i < items.length; i++) {
				items[i].style.display = 'none';
				items[i].setAttribute('data-overflow', 'true');
			}
		} else {
			this._overflowMenuItem.style.display = 'none';
		}
	}

	/** @see _doHandleGlobalBarOverflow for testing note. */
	private _doHandleUtilityOverflow(): void {
		if (!this._utilityOverflowMenuItem) return;

		const menuBarEl = this.shadowRoot?.querySelector('.top-navigation-bar__menu-bar') as HTMLElement;
		const menuBarStart = this.shadowRoot?.querySelector('.top-navigation-bar__menu-bar-start') as HTMLElement;
		if (!menuBarEl || !menuBarStart) return;

		const slottedElements = this._utilitySlot?.assignedElements({ flatten: true }) ?? [];
		const items = slottedElements.filter(el => el.tagName === 'NDD-MENU-BAR-ITEM') as HTMLElement[];
		if (items.length === 0) {
			this._utilityOverflowMenuItem.style.display = 'none';
			return;
		}

		// Reset: show all items, hide overflow button
		items.forEach(item => {
			item.style.display = '';
			item.removeAttribute('data-utility-overflow');
		});
		this._utilityOverflowMenuItem.style.display = 'none';

		// Calculate natural widths: start section + all utility items
		const startWidth = menuBarStart.scrollWidth;
		const totalItemsWidth = items.reduce((sum, item) => sum + item.offsetWidth, 0);
		const containerWidth = menuBarEl.clientWidth;

		// If everything fits, we're done
		if (startWidth + totalItemsWidth <= containerWidth) return;

		// Overflow: show overflow button, hide items from the end until it fits
		this._utilityOverflowMenuItem.style.display = 'inline-block';
		const overflowBtnWidth = this._utilityOverflowMenuItem.offsetWidth;

		let visibleWidth = 0;
		let overflowStartIndex = -1;
		const availableForItems = containerWidth - startWidth - overflowBtnWidth;

		for (let i = 0; i < items.length; i++) {
			if (visibleWidth + items[i].offsetWidth > availableForItems) {
				overflowStartIndex = i;
				break;
			}
			visibleWidth += items[i].offsetWidth;
		}

		if (overflowStartIndex >= 0) {
			for (let i = overflowStartIndex; i < items.length; i++) {
				items[i].style.display = 'none';
				items[i].setAttribute('data-utility-overflow', 'true');
			}
		} else {
			// All items fit after all (rounding)
			this._utilityOverflowMenuItem.style.display = 'none';
		}
	}

	// ## Popover menus

	private _createPopoverMenu(onToggle: (open: boolean) => void): PopoverMenu {
		const menu = document.createElement('ndd-menu') as unknown as PopoverMenu;
		menu.setAttribute('placement', 'bottom-end');
		menu.style.setProperty('--_menu-width', 'auto');
		menu.addEventListener('toggle', (event: Event) => {
			onToggle((event as ToggleEvent).newState === 'open');
		});
		document.body.appendChild(menu);
		return menu;
	}

	private _populateOverflowMenu(menu: PopoverMenu, slot: HTMLSlotElement | undefined, dataAttr: string): void {
		menu.innerHTML = '';
		const slottedElements = slot?.assignedElements({ flatten: true }) ?? [];
		const overflowItems = slottedElements.filter(
			el => el.tagName === 'NDD-MENU-BAR-ITEM' && el.hasAttribute(dataAttr)
		) as NDDMenuBarItem[];

		for (const item of overflowItems) {
			const menuItem = document.createElement('ndd-menu-item');
			menuItem.setAttribute('text', item.text);
			if (item.current) menuItem.setAttribute('selected', '');
			if (item.disabled) menuItem.setAttribute('disabled', '');
			menuItem.addEventListener('click', () => {
				item.click();
			});
			menu.appendChild(menuItem);
		}
	}

	private _togglePopoverMenu(
		menu: PopoverMenu,
		anchor: HTMLElement,
		isOpen: boolean,
		closedAt: number,
	): void {
		menu.anchorElement = anchor;
		if (isOpen) {
			menu.hidePopover();
		} else if (Date.now() - closedAt > POPOVER_REOPEN_GUARD_MS) {
			menu.showPopover();
		}
	}

	private _onOverflowClick = (): void => {
		const menuBarItem = this._overflowMenuItem?.querySelector('ndd-menu-bar-item');
		if (!this._overflowMenu) {
			this._overflowMenu = this._createPopoverMenu((open) => {
				this._overflowMenuOpen = open;
				if (!open) this._overflowMenuClosedAt = Date.now();
				if (menuBarItem) (menuBarItem as NDDMenuBarItem).open = open;
			});
		}
		this._populateOverflowMenu(this._overflowMenu, this._menuSlot, 'data-overflow');
		this._togglePopoverMenu(
			this._overflowMenu, this._overflowMenuItem,
			this._overflowMenuOpen, this._overflowMenuClosedAt,
		);
	};

	private _onUtilityOverflowClick = (): void => {
		const menuBarItem = this._utilityOverflowMenuItem?.querySelector('ndd-menu-bar-item');
		if (!this._utilityOverflowMenu) {
			this._utilityOverflowMenu = this._createPopoverMenu((open) => {
				this._utilityOverflowMenuOpen = open;
				if (!open) this._utilityOverflowMenuClosedAt = Date.now();
				if (menuBarItem) (menuBarItem as NDDMenuBarItem).open = open;
			});
		}
		this._populateOverflowMenu(this._utilityOverflowMenu, this._utilitySlot, 'data-utility-overflow');
		this._togglePopoverMenu(
			this._utilityOverflowMenu, this._utilityOverflowMenuItem,
			this._utilityOverflowMenuOpen, this._utilityOverflowMenuClosedAt,
		);
	};

	// ## Menu sheet

	private async _loadSheetDependencies(): Promise<void> {
		await Promise.all([
			import('../../layout/sheet/ndd-sheet.js'),
			import('../../layout/page/ndd-page.js'),
			import('../../layout/page-sections/simple-section/ndd-simple-section.js'),
			import('../../navigation/top-title-bar/ndd-top-title-bar.js'),
			import('../../lists-and-menus/list/ndd-list.js'),
			import('../../lists-and-menus/list-item/ndd-list-item.js'),
			import('../../lists-and-menus/cells/text-cell/ndd-text-cell.js'),
		]);
	}

	private _createMenuSheet(): Sheet {
		const sheet = document.createElement('ndd-sheet') as unknown as Sheet;
		sheet.setAttribute('placement', 'left');
		sheet.setAttribute('accessible-label', this._t('components.top-navigation-bar.menu-action'));

		const page = document.createElement('ndd-page');
		page.setAttribute('sticky-header', '');

		const titleBar = document.createElement('ndd-top-title-bar');
		titleBar.setAttribute('slot', 'header');
		titleBar.setAttribute('text', this._menuText);
		titleBar.setAttribute('dismiss-text', this._t('components.top-navigation-bar.dismiss-action'));
		page.appendChild(titleBar);

		const section = document.createElement('ndd-simple-section');

		this._menuSheetList = document.createElement('ndd-list');
		this._menuSheetList.setAttribute('variant', 'simple');
		section.appendChild(this._menuSheetList);

		page.appendChild(section);
		sheet.appendChild(page);
		document.body.appendChild(sheet);
		return sheet;
	}

	private _syncMenuSheetItems(): void {
		if (!this._menuSheetList) return;
		this._menuSheetList.innerHTML = '';

		const slottedElements = this._menuSlot?.assignedElements({ flatten: true }) ?? [];
		const items = slottedElements.filter(el => el.tagName === 'NDD-MENU-BAR-ITEM') as NDDMenuBarItem[];

		for (const item of items) {
			const listItem = document.createElement('ndd-list-item');
			listItem.setAttribute('type', 'button');
			if (item.current) listItem.setAttribute('selected', '');

			const textCell = document.createElement('ndd-text-cell');
			textCell.setAttribute('text', item.text);
			listItem.appendChild(textCell);

			listItem.addEventListener('click', () => {
				item.click();
				this._menuSheet?.hide();
			});

			this._menuSheetList!.appendChild(listItem);
		}
	}

	private _onMenuButtonClick = async (): Promise<void> => {
		if (!this._menuSheet) {
			try {
				await this._loadSheetDependencies();
			} catch (error) {
				console.error('Failed to load menu sheet dependencies:', error);
				return;
			}
			this._menuSheet = this._createMenuSheet();
			const menuButtonItem = this._menuButton?.querySelector('ndd-menu-bar-item');
			this._menuSheet.addEventListener('open', () => {
				if (menuButtonItem) (menuButtonItem as NDDMenuBarItem).open = true;
			});
			this._menuSheet.addEventListener('close', () => {
				if (menuButtonItem) (menuButtonItem as NDDMenuBarItem).open = false;
			});
		}
		this._syncMenuSheetItems();
		// Defer show() so the current click event completes before the modal backdrop appears
		requestAnimationFrame(() => {
			this._menuSheet?.show();
		});
	};

	// ## Back button

	private _handleBackClick = (e: Event): void => {
		if (!this.backHref) {
			e.preventDefault();
			this.dispatchEvent(
				new CustomEvent('back-click', {
					bubbles: true,
					composed: true,
				})
			);
		}
	};

	// ## Render

	override render() {
		return template.call(this);
	}
}

if (!customElements.get('ndd-top-navigation-bar')) {
	customElements.define('ndd-top-navigation-bar', NDDTopNavigationBar);
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-top-navigation-bar': NDDTopNavigationBar;
		'ndd-menu-bar-item': NDDMenuBarItem;
	}
}

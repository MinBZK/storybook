import { LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { styles, menuBarItemStyles } from './ndd-top-navigation-bar.styles.js';
import { template, menuBarItemTemplate } from './ndd-top-navigation-bar.template.js';
import { nddTopNavigationBarTranslations } from './ndd-top-navigation-bar.i18n.js';
import type { NDDTopNavigationBarTranslations } from './ndd-top-navigation-bar.i18n.js';
import '../../content/icon/ndd-icon.js';
import '../../lists-and-menus/menu/ndd-menu.js';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';
import { breakpoints } from '../../../assets/styles/breakpoints.js';

// # ndd-menu-bar-item

export class NDDMenuBarItem extends LitElement {
	static override styles = menuBarItemStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: Boolean, reflect: true })
	selected = false;

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

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'none');
		this.addEventListener('click', this._handleClick);
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('click', this._handleClick);
		this.removeEventListener('keydown', this._handleKeyDown);
	}

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

	private _handleClick = (event: Event): void => {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
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

	private _handleKeyDown = (event: KeyboardEvent): void => {
		if (this.disabled) return;
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this._handleClick(event);
		}
	};

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

	@property({ type: Boolean, attribute: 'no-logo', reflect: true })
	noLogo = false;

	@property({ type: Boolean, attribute: 'no-title', reflect: true })
	noTitle = false;

	@property({ type: Boolean, attribute: 'has-back-button', reflect: true })
	hasBackButton = false;

	// ## Logo properties

	@property({ type: Boolean, attribute: 'logo-has-wordmark' })
	logoHasWordmark = false;

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

	// ## i18n

	@property({ type: Object })
	translations: Partial<NDDTopNavigationBarTranslations> = {};

	// ## Internal state

	@query('.top-navigation-bar__global-bar')
	private _globalBarContainer!: HTMLElement;

	@query('.top-navigation-bar__menu-button')
	private _menuButton!: HTMLElement;

	@query('.top-navigation-bar__overflow-menu-item')
	private _overflowMenuItem!: HTMLElement;

	@query('.top-navigation-bar__utility-overflow-menu-item')
	private _utilityOverflowMenuItem!: HTMLElement;

	@query('slot[name="global"]')
	private _menuSlot!: HTMLSlotElement;

	@query('slot[name="utility"]')
	private _utilitySlot!: HTMLSlotElement;

	private _overflowMenu: HTMLElement | null = null;
	private _overflowMenuOpen = false;
	private _overflowMenuClosedAt = 0;

	private _utilityOverflowMenu: HTMLElement | null = null;
	private _utilityOverflowMenuOpen = false;
	private _utilityOverflowMenuClosedAt = 0;

	private _resizeObserver: ResizeObserver | null = null;
	private _isHandlingOverflow = false;
	private _overflowRAF: number | null = null;

	// ## i18n helper

	_t(key: keyof NDDTopNavigationBarTranslations): string {
		return this.translations[key] ?? nddTopNavigationBarTranslations[key];
	}

	// ## Computed properties

	get _backText(): string {
		return this.backText || this._t('components.top-navigation-bar.back-text');
	}

	get _overflowText(): string {
		return this._t('components.top-navigation-bar.overflow-text');
	}

	get _menuText(): string {
		return this._t('components.top-navigation-bar.menu-text');
	}

	// ## Lifecycle

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect);
		this.addEventListener('keydown', this._handleMenuKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect);
		this.removeEventListener('keydown', this._handleMenuKeyDown);
		this._cleanupOverflowDetection();
		this._overflowMenu?.remove();
		this._overflowMenu = null;
		this._utilityOverflowMenu?.remove();
		this._utilityOverflowMenu = null;
	}

	override firstUpdated(): void {
		this._setupOverflowDetection();
		this._overflowMenu = this._createPopoverMenu((open) => {
			this._overflowMenuOpen = open;
			if (!open) this._overflowMenuClosedAt = Date.now();
		});
		this._utilityOverflowMenu = this._createPopoverMenu((open) => {
			this._utilityOverflowMenuOpen = open;
			if (!open) this._utilityOverflowMenuClosedAt = Date.now();
		});
	}

	// ## Menu item selection

	private _handleItemSelect = (event: Event): void => {
		const detail = (event as CustomEvent).detail;
		if (!detail?.item) return;
		const slottedItems = this._menuSlot?.assignedElements({ flatten: true }) ?? [];
		if (!slottedItems.includes(detail.item)) return;

		detail.item.selected = true;
		slottedItems.forEach(item => {
			if (item !== detail.item) {
				(item as HTMLElement).removeAttribute('selected');
			}
		});
		this.dispatchEvent(new CustomEvent('itemselect', {
			bubbles: true,
			composed: true,
			detail,
		}));
	};

	// ## Menu keyboard navigation

	private _handleMenuKeyDown = (event: KeyboardEvent): void => {
		const items = Array.from(this.querySelectorAll('ndd-menu-bar-item:not([disabled])'));
		if (items.length === 0) return;

		const currentIndex = items.findIndex(item =>
			item === event.target || item.contains(event.target as Node)
		);
		let newIndex = -1;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
				break;
			case 'ArrowRight':
				event.preventDefault();
				newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'Home':
				event.preventDefault();
				newIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				newIndex = items.length - 1;
				break;
			default:
				return;
		}

		if (newIndex >= 0) {
			(items[newIndex] as HTMLElement).focus();
		}
	};

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

	private _createPopoverMenu(onToggle: (open: boolean) => void): HTMLElement {
		const menu = document.createElement('ndd-menu');
		menu.setAttribute('placement', 'bottom-end');
		menu.style.setProperty('--_menu-width', 'auto');
		menu.addEventListener('toggle', (event: Event) => {
			onToggle((event as ToggleEvent).newState === 'open');
		});
		document.body.appendChild(menu);
		return menu;
	}

	private _populateOverflowMenu(menu: HTMLElement, slot: HTMLSlotElement | undefined, dataAttr: string): void {
		menu.innerHTML = '';
		const slottedElements = slot?.assignedElements({ flatten: true }) ?? [];
		const overflowItems = slottedElements.filter(
			el => el.tagName === 'NDD-MENU-BAR-ITEM' && el.hasAttribute(dataAttr)
		) as NDDMenuBarItem[];

		for (const item of overflowItems) {
			const menuItem = document.createElement('ndd-menu-item');
			menuItem.setAttribute('text', item.text);
			menuItem.addEventListener('click', () => {
				item.click();
			});
			menu.appendChild(menuItem);
		}
	}

	private _togglePopoverMenu(
		menu: HTMLElement,
		anchor: HTMLElement,
		isOpen: boolean,
		closedAt: number,
	): void {
		(menu as any).anchorElement = anchor;
		if (isOpen) {
			(menu as any).hidePopover?.();
		} else if (Date.now() - closedAt > POPOVER_REOPEN_GUARD_MS) {
			(menu as any).showPopover?.();
		}
	}

	_onOverflowClick = (): void => {
		if (!this._overflowMenu) return;
		this._populateOverflowMenu(this._overflowMenu, this._menuSlot, 'data-overflow');
		this._togglePopoverMenu(
			this._overflowMenu, this._overflowMenuItem,
			this._overflowMenuOpen, this._overflowMenuClosedAt,
		);
	};

	_onUtilityOverflowClick = (): void => {
		if (!this._utilityOverflowMenu) return;
		this._populateOverflowMenu(this._utilityOverflowMenu, this._utilitySlot, 'data-utility-overflow');
		this._togglePopoverMenu(
			this._utilityOverflowMenu, this._utilityOverflowMenuItem,
			this._utilityOverflowMenuOpen, this._utilityOverflowMenuClosedAt,
		);
	};

	// ## Back button

	_handleBackClick = (e: Event): void => {
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

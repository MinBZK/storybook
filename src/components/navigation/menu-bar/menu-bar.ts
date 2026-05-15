/**
 * Menu Bar Component (Lit + TypeScript)
 *
 * Horizontale rij van nldd-menu-bar-item elementen met automatische overflow
 * detectie. Items die niet passen worden verborgen achter een overflow button
 * met een popover menu.
 *
 * @element nldd-menu-bar
 * @attr {string} overflow-text - Tekst voor de overflow button (standaard via i18n)
 * @attr {string} accessible-label - aria-label voor de nav landmark
 * @attr {boolean} compact - Propageert compact attribuut naar slotted items (activeert content-priority)
 *
 * @slot - nldd-menu-bar-item elementen
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { menuBarStyles } from './menu-bar.styles.js';
import { template } from './menu-bar.template.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddMenuBarTranslations } from './menu-bar.i18n.js';
import '../menu-bar-item/menu-bar-item.js';
import { NLDDMenuBarItem } from '../menu-bar-item/menu-bar-item.js';
import '../../lists-and-menus/menu/menu.js';

/**
 * Minimal typed interface for nldd-menu.
 */
interface PopoverMenu extends HTMLElement {
	anchorElement: Element | null;
	showPopover(): void;
	hidePopover(): void;
}

@customElement('nldd-menu-bar')
export class NLDDMenuBar extends withTranslations(LitElement, nlddMenuBarTranslations) {
	static override styles = menuBarStyles;

	@property({ type: String, attribute: 'overflow-text' })
	overflowText = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	compact = false;

	// ## Internal references

	@query('slot:not([name])')
	private _defaultSlot!: HTMLSlotElement;

	@query('.menu-bar__overflow-button')
	private _overflowButton!: HTMLElement;

	// ## Overflow state

	private _overflowMenu: PopoverMenu | null = null;

	private _resizeObserver: ResizeObserver | null = null;
	private _overflowRAF: number | null = null;
	private _setupRAF: number | null = null;

	override willUpdate(changed: PropertyValues): void {
		super.willUpdate(changed);
		if (changed.has('compact')) {
			this._syncCompactAttribute();
		}
	}

	// ## Computed properties

	/** @internal Used by template */
	get _overflowText(): string {
		return this.overflowText || this._t('components.menu-bar.overflow-action');
	}

	// ## Lifecycle

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._cleanupOverflowDetection();
		this._overflowMenu?.remove();
		this._overflowMenu = null;
	}

	override firstUpdated(): void {
		this._setupOverflowDetection();
		this._syncCompactAttribute();
		this._syncEmpty();
		if (import.meta.env?.DEV && !this.accessibleLabel && !this.hasAttribute('empty')) {
			console.warn('nldd-menu-bar: accessible-label is niet gezet. Pagina\'s met meerdere nav landmarks moeten elke nav een uniek label geven (WCAG 1.3.1).');
		}
	}

	/** Request a recalculation of overflow state. Call from parent when layout changes. */
	requestOverflowUpdate(): void {
		this._scheduleOverflowUpdate();
	}

	private _onSlotChange = (): void => {
		this._syncCompactAttribute();
		this._scheduleOverflowUpdate();
		this._syncEmpty();
	};

	/** Hide the component when no items are slotted to avoid empty nav landmarks. */
	private _syncEmpty(): void {
		const items = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const hasItems = items.some(el => el.tagName === 'NLDD-MENU-BAR-ITEM');
		this.toggleAttribute('empty', !hasItems);
	}

	/** Propagate compact attribute to slotted items and internal overflow button. */
	private _syncCompactAttribute(): void {
		const items = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		for (const item of items) {
			item.toggleAttribute('compact', this.compact);
		}

		// Internal overflow button item
		const overflowItem = this._overflowButton?.querySelector('nldd-menu-bar-item');
		if (overflowItem) {
			overflowItem.toggleAttribute('compact', this.compact);
		}
	}

	// ## Overflow detection

	private _setupOverflowDetection(): void {
		this._cleanupOverflowDetection();
		this._setupRAF = requestAnimationFrame(() => {
			this._setupRAF = null;
			if (!this.isConnected) return;
			this._resizeObserver = new ResizeObserver(() => {
				this._scheduleOverflowUpdate();
			});
			this._resizeObserver.observe(this);
			if (this._defaultSlot) {
				this._defaultSlot.addEventListener('slotchange', this._onSlotChange);
			}
			this._scheduleOverflowUpdate();
		});
	}

	private _cleanupOverflowDetection(): void {
		if (this._setupRAF) {
			cancelAnimationFrame(this._setupRAF);
			this._setupRAF = null;
		}
		if (this._overflowRAF) {
			cancelAnimationFrame(this._overflowRAF);
			this._overflowRAF = null;
		}
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
		if (this._defaultSlot) {
			this._defaultSlot.removeEventListener('slotchange', this._onSlotChange);
		}
	}

	private _scheduleOverflowUpdate = (): void => {
		if (this._overflowRAF) cancelAnimationFrame(this._overflowRAF);
		this._overflowRAF = requestAnimationFrame(() => {
			this._overflowRAF = null;
			this._updateOverflow();
		});
	};

	/**
	 * Calculate which slotted items overflow and hide them behind an overflow button.
	 * Note: not unit-tested — JSDOM lacks layout support (offsetWidth, clientWidth).
	 * Covered by visual/E2E testing via Storybook stories.
	 */
	private _updateOverflow(): void {
		const overflowButton = this._overflowButton;
		if (!overflowButton) return;

		const slottedElements = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const items = slottedElements.filter(el => el.tagName === 'NLDD-MENU-BAR-ITEM') as HTMLElement[];

		if (items.length === 0) {
			overflowButton.style.display = 'none';
			return;
		}

		// Reset all items to visible
		items.forEach(item => {
			item.style.display = '';
			item.removeAttribute('data-overflow');
		});

		overflowButton.style.display = 'inline-block';

		const containerWidth = this.clientWidth;
		const overflowButtonWidth = overflowButton.offsetWidth;

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
			overflowButton.style.display = 'none';
		}
	}

	// ## Overflow popover menu

	private _createOverflowMenu(): PopoverMenu {
		const menu = document.createElement('nldd-menu') as unknown as PopoverMenu;
		menu.setAttribute('placement', 'bottom-end');

		menu.addEventListener('toggle', (event: Event) => {
			const isOpen = (event as ToggleEvent).newState === 'open';
			const item = this._overflowButton?.querySelector('nldd-menu-bar-item');
			if (item) (item as NLDDMenuBarItem).expanded = isOpen;
		});
		document.body.appendChild(menu);
		return menu;
	}

	private _populateOverflowMenu(): void {
		if (!this._overflowMenu) return;
		this._overflowMenu.replaceChildren();

		const slottedElements = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const overflowItems = slottedElements.filter(
			el => el.tagName === 'NLDD-MENU-BAR-ITEM' && el.hasAttribute('data-overflow')
		) as NLDDMenuBarItem[];

		for (const item of overflowItems) {
			const menuItem = document.createElement('nldd-menu-item');
			menuItem.setAttribute('text', item.text);
			if (item.icon) menuItem.setAttribute('icon', item.icon);
			if (item.current) menuItem.setAttribute('selected', '');
			if (item.disabled) menuItem.setAttribute('disabled', '');

			if (item.expandable) {
				// Expandable items: clone sub-items as a submenu group
				const children = item.querySelectorAll('nldd-menu-item, nldd-menu-divider');
				if (children.length > 0) {
					const divider = document.createElement('nldd-menu-divider');
					this._overflowMenu!.appendChild(menuItem);
					this._overflowMenu!.appendChild(divider);
					children.forEach(child => {
						const clone = child.cloneNode(true) as HTMLElement;
						clone.addEventListener('click', () => {
							(child as HTMLElement).click();
						});
						this._overflowMenu!.appendChild(clone);
					});
					continue;
				}
			}

			menuItem.addEventListener('click', () => {
				item.click();
			});
			this._overflowMenu!.appendChild(menuItem);
		}
	}

	/** @internal Used by template
	 *
	 * Lazily wires the overflow menu the first time the user reaches the
	 * overflow button. The browser performs the actual open/close via the
	 * popovertarget invoker we set on the button — this handler runs in
	 * the same click and therefore sets up the wiring just before the
	 * browser's default action fires for the very first time. Subsequent
	 * clicks short-circuit (everything is already in place) and the
	 * browser drives toggle natively without us racing against light-
	 * dismiss. */
	_onOverflowClick = (): void => {
		if (!this._overflowMenu) {
			this._overflowMenu = this._createOverflowMenu();
		}
		this._populateOverflowMenu();

		this._overflowMenu.anchorElement = this._overflowButton;
		// Wire the button as the menu's invoker so popover light-dismiss
		// excludes the click on the button from closing the menu, and so
		// the browser performs open/close via popovertarget instead of us
		// racing it from a manual hide/show call. The menu syncs
		// `popoverTargetAction` on every toggle (`'hide'` while open,
		// `'show'` while closed); seed `'show'` here for the first click.
		const button = this._overflowButton as (HTMLElement & {
			popoverTargetElement?: Element | null;
			popoverTargetAction?: 'toggle' | 'show' | 'hide';
		}) | null;
		if (button && 'popoverTargetElement' in button) {
			button.popoverTargetElement = this._overflowMenu;
		}
		// Default IDL value is 'toggle'; replace it with 'show' so the very
		// first click opens via the explicit-show path. Once the menu has
		// opened, `_syncAnchorPopupState` keeps the action in sync with
		// state ('hide' while open, 'show' while closed) and this seed
		// never overrides it.
		if (button && 'popoverTargetAction' in button && button.popoverTargetAction === 'toggle') {
			button.popoverTargetAction = 'show';
		}
	};

	// ## Render

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-menu-bar': NLDDMenuBar;
	}
}

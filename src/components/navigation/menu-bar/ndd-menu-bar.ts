/**
 * Menu Bar Component (Lit + TypeScript)
 *
 * Horizontale rij van ndd-menu-bar-item elementen met automatische overflow
 * detectie. Items die niet passen worden verborgen achter een overflow button
 * met een popover menu.
 *
 * @element ndd-menu-bar
 * @attr {string} overflow-text - Tekst voor de overflow button (standaard via i18n)
 * @attr {string} accessible-label - aria-label voor de nav landmark
 * @attr {boolean} compact - Propageert compact attribuut naar slotted items (activeert content-priority)
 *
 * @slot - ndd-menu-bar-item elementen
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styles } from './ndd-menu-bar.styles.js';
import { template } from './ndd-menu-bar.template.js';
import { nddMenuBarTranslations } from './ndd-menu-bar.i18n.js';
import type { NDDMenuBarTranslations } from './ndd-menu-bar.i18n.js';
import '../menu-bar-item/ndd-menu-bar-item.js';
import { NDDMenuBarItem } from '../menu-bar-item/ndd-menu-bar-item.js';
import '../../lists-and-menus/menu/ndd-menu.js';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';

/**
 * Minimal typed interface for ndd-menu.
 */
interface PopoverMenu extends HTMLElement {
	anchorElement: Element | null;
	showPopover(): void;
	hidePopover(): void;
}

@customElement('ndd-menu-bar')
export class NDDMenuBar extends LitElement {
	static override styles = styles;

	@property({ type: String, attribute: 'overflow-text' })
	overflowText = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	compact = false;

	@property({ type: Object })
	translations: Partial<NDDMenuBarTranslations> = {};

	// ## Internal references

	@query('slot:not([name])')
	private _defaultSlot!: HTMLSlotElement;

	@query('.menu-bar__overflow-button')
	private _overflowButton!: HTMLElement;

	// ## Overflow state

	private _overflowMenu: PopoverMenu | null = null;
	private _overflowMenuOpen = false;
	private _overflowMenuClosedAt = 0;

	private _resizeObserver: ResizeObserver | null = null;
	private _isHandlingOverflow = false;
	private _overflowRAF: number | null = null;
	private _setupRAF: number | null = null;

	// ## i18n

	private _mergedTranslations = { ...nddMenuBarTranslations };

	_t(key: keyof NDDMenuBarTranslations): string {
		return this._mergedTranslations[key] ?? key;
	}

	override willUpdate(changed: PropertyValues): void {
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nddMenuBarTranslations, ...this.translations };
		}
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
		if (!this.accessibleLabel) {
			console.warn('ndd-menu-bar: accessible-label is niet gezet. Pagina\'s met meerdere nav landmarks moeten elke nav een uniek label geven (WCAG 1.3.1).');
		}
	}

	private _onSlotChange = (): void => {
		this._syncCompactAttribute();
		this._scheduleOverflowUpdate();
	};

	/** Propagate compact attribute to slotted items and internal overflow button. */
	private _syncCompactAttribute(): void {
		const items = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		for (const item of items) {
			item.toggleAttribute('compact', this.compact);
		}

		// Internal overflow button item
		const overflowItem = this._overflowButton?.querySelector('ndd-menu-bar-item');
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
		if (this._isHandlingOverflow) return;
		if (this._overflowRAF) cancelAnimationFrame(this._overflowRAF);
		this._overflowRAF = requestAnimationFrame(() => {
			this._isHandlingOverflow = true;
			try {
				this._updateOverflow();
			} finally {
				requestAnimationFrame(() => { this._isHandlingOverflow = false; });
			}
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
		const items = slottedElements.filter(el => el.tagName === 'NDD-MENU-BAR-ITEM') as HTMLElement[];

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
		const menu = document.createElement('ndd-menu') as unknown as PopoverMenu;
		menu.setAttribute('placement', 'bottom-end');

		menu.addEventListener('toggle', (event: Event) => {
			const open = (event as ToggleEvent).newState === 'open';
			this._overflowMenuOpen = open;
			if (!open) this._overflowMenuClosedAt = Date.now();
			const item = this._overflowButton?.querySelector('ndd-menu-bar-item');
			if (item) (item as NDDMenuBarItem).open = open;
		});
		document.body.appendChild(menu);
		return menu;
	}

	private _populateOverflowMenu(): void {
		if (!this._overflowMenu) return;
		this._overflowMenu.replaceChildren();

		const slottedElements = this._defaultSlot?.assignedElements({ flatten: true }) ?? [];
		const overflowItems = slottedElements.filter(
			el => el.tagName === 'NDD-MENU-BAR-ITEM' && el.hasAttribute('data-overflow')
		) as NDDMenuBarItem[];

		for (const item of overflowItems) {
			// Skip expandable items — they have submenus that can't be represented in a flat overflow menu
			if (item.expandable) continue;

			const menuItem = document.createElement('ndd-menu-item');
			menuItem.setAttribute('text', item.text);
			if (item.icon) menuItem.setAttribute('icon', item.icon);
			if (item.current) menuItem.setAttribute('selected', '');
			if (item.disabled) menuItem.setAttribute('disabled', '');
			menuItem.addEventListener('click', () => {
				item.click();
			});
			this._overflowMenu!.appendChild(menuItem);
		}
	}

	/** @internal Used by template */
	_onOverflowClick = (): void => {
		if (!this._overflowMenu) {
			this._overflowMenu = this._createOverflowMenu();
		}
		this._populateOverflowMenu();

		this._overflowMenu.anchorElement = this._overflowButton;
		if (this._overflowMenuOpen) {
			this._overflowMenu.hidePopover();
		} else if (Date.now() - this._overflowMenuClosedAt > POPOVER_REOPEN_GUARD_MS) {
			this._overflowMenu.showPopover();
		}
	};

	// ## Render

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-menu-bar': NDDMenuBar;
	}
}

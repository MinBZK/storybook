/**
 * RegelRecht Document Tab Bar Component (Lit + TypeScript)
 *
 * Een horizontale tabbalk voor documenttabbladen met een automatische overloopknop
 * en een eindslot voor actieknoppen.
 * Exporteert zowel RRDocumentTabBar als RRDocumentTabBarItem.
 *
 * @element rr-document-tab-bar
 * @attr {string}  overflow-button-label  - Label voor de overloopknop (standaard: 'Meer')
 * @attr {string}  accessible-label       - Toegankelijke naam voor de navigatieregio
 *
 * @slot     - rr-document-tab-bar-item elementen
 * @slot end - Actieknoppen (bijv. nieuw tabblad)
 *
 * @fires tabchange  - Wanneer een tabblad wordt geselecteerd; detail: { item }
 * @fires tabdismiss - Wanneer een tabblad wordt gesloten; detail: { item, nextItem }
 * @fires tabempty   - Wanneer het laatste tabblad wordt gesloten
 *
 * ---
 *
 * @element rr-document-tab-bar-item
 * @attr {boolean} selected  - Geselecteerde toestand (beheerd door rr-document-tab-bar)
 * @attr {boolean} disabled  - Uitgeschakelde toestand
 * @attr {string}  subtitle  - Ondertitelregel
 *
 * @slot - Titeltekst
 *
 * @fires select  - Wanneer het item wordt geactiveerd; detail: { item }
 * @fires dismiss - Wanneer de sluitknop wordt geklikt; detail: { item }
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { documentTabBarStyles, documentTabBarItemStyles } from './rr-document-tab-bar.styles.ts';
import { documentTabBarTemplate, documentTabBarItemTemplate } from './rr-document-tab-bar.template.ts';
import './../../lists-and-menus/menu/rr-menu.ts';

// Reserved width in px for the overflow button during resize calculation.
// Prevents layout feedback loops by always subtracting this from available width
// even when the button is visually hidden.
const OVERFLOW_BUTTON_RESERVE = 52;


// # rr-document-tab-bar-item

@customElement('rr-document-tab-bar-item')
export class RRDocumentTabBarItem extends LitElement {
	static override styles = documentTabBarItemStyles;

	private static _counter = 0;
	readonly _id = `rr-document-tab-bar-item-${RRDocumentTabBarItem._counter++}`;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	title = '';

	@property({ type: String })
	subtitle = '';

	@property({ type: String, attribute: 'short-title' })
	shortTitle = '';

	@property({ type: String, attribute: 'short-subtitle' })
	shortSubtitle = '';

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'none');
	}

	_handleClick(): void {
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('select', {
			bubbles: true,
			composed: true,
			detail: { item: this },
		}));
	}

	_handleDismiss(event: Event): void {
		event.stopPropagation();
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('dismiss', {
			bubbles: true,
			composed: true,
			detail: { item: this },
		}));
	}

	override render() {
		return documentTabBarItemTemplate(this);
	}
}


// # rr-document-tab-bar

@customElement('rr-document-tab-bar')
export class RRDocumentTabBar extends LitElement {
	static override styles = documentTabBarStyles;

	private static _counter = 0;
	readonly _id = `rr-document-tab-bar-${RRDocumentTabBar._counter++}`;

	@property({ type: String, attribute: 'overflow-button-label' })
	overflowButtonLabel = 'Meer';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@state()
	_overflowCount = 0;

	@state()
	_menuOpen = false;

	private _menu: Element | null = null;
	private _resizeObserver: ResizeObserver | null = null;
	private _hasCustomLabel = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect as EventListener);
		this.addEventListener('dismiss', this._handleItemDismiss as EventListener);
		this.addEventListener('keydown', this._handleKeyDown);
		this._createMenu();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect as EventListener);
		this.removeEventListener('dismiss', this._handleItemDismiss as EventListener);
		this.removeEventListener('keydown', this._handleKeyDown);

		this._menu?.remove();
		this._menu = null;

		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
	}

	override firstUpdated(): void {
		this._hasCustomLabel = Boolean(this.accessibleLabel);
		if (!this._hasCustomLabel) {
			console.warn('<rr-document-tab-bar>: Geen accessible-label opgegeven. Voeg een accessible-label attribuut toe voor een betekenisvolle navigatielandmark. Valt terug op "Tabbladen".');
		}

		const container = this.shadowRoot?.querySelector('.document-tab-bar__items') as HTMLElement;
		if (container) {
			this._resizeObserver = new ResizeObserver(() => this._calculateOverflow());
			this._resizeObserver.observe(container);
		}

		this._syncMenuAnchor();
		requestAnimationFrame(() => this._calculateOverflow());
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('_overflowCount')) {
			this._applyItemVisibility();
			this._updateMenu();
		}
	}

	// — Items ——————————————————————————————————————————————————————————————————

	private _getItems(): RRDocumentTabBarItem[] {
		const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
		if (!slot) return [];
		return slot.assignedElements()
			.filter((el): el is RRDocumentTabBarItem =>
				el.tagName.toLowerCase() === 'rr-document-tab-bar-item'
			);
	}

	_onSlotChange(): void {
		this._calculateOverflow();
	}

	private _applyItemVisibility(): void {
		const items = this._getItems();
		const visibleCount = items.length - this._overflowCount;
		items.forEach((item, index) => {
			item.hidden = index >= visibleCount;
		});
	}

	private _calculateOverflow(): void {
		const items = this._getItems();
		const totalItems = items.length;

		if (totalItems === 0) {
			this._overflowCount = 0;
			return;
		}

		const container = this.shadowRoot?.querySelector('.document-tab-bar__items') as HTMLElement;
		if (!container) return;

		const containerWidth = container.offsetWidth;
		if (containerWidth === 0) return;

		const gap = parseFloat(getComputedStyle(container).gap) || 8;
		const firstItem = this._getItems()[0];
		const minItemWidth = firstItem ? parseFloat(getComputedStyle(firstItem).minWidth) || 100 : 100;

		// (containerWidth - overflowButtonWidth + gap) / (minItemWidth + gap)
		const visible = Math.floor((containerWidth - OVERFLOW_BUTTON_RESERVE + gap) / (minItemWidth + gap));
		const newOverflowCount = Math.max(0, totalItems - Math.max(1, visible));

		if (newOverflowCount !== this._overflowCount) {
			this._overflowCount = newOverflowCount;
			this._ensureSelectedVisible();
		}
	}

	private _ensureSelectedVisible(): void {
		const items = this._getItems();
		const visibleCount = items.length - this._overflowCount;
		const selectedIndex = items.findIndex(i => i.selected);

		if (selectedIndex >= visibleCount && visibleCount > 0) {
			// Move selected item to last visible position via DOM reorder
			const lastVisible = items[visibleCount - 1];
			const selected = items[selectedIndex];
			// Insert selected before lastVisible, then append lastVisible after selected
			this.insertBefore(selected, lastVisible);
		}
	}

	// — Overflow menu ——————————————————————————————————————————————————————————

	private _updateMenu(): void {
		if (!this._menu) return;
		this._menu.innerHTML = '';

		const items = this._getItems();
		const visibleCount = items.length - this._overflowCount;

		items.slice(visibleCount).forEach(item => {
			const title = item.title || '–';
			const label = item.subtitle ? `${title} · ${item.subtitle}` : title;
			const menuItem = document.createElement('rr-menu-item');
			menuItem.setAttribute('text', label);
			menuItem.addEventListener('click', () => {
				this._selectAndPromote(item);
				this._closeMenu();
			});
			this._menu!.appendChild(menuItem);
		});
	}

	private _selectAndPromote(targetItem: RRDocumentTabBarItem): void {
		const items = this._getItems();
		const visibleCount = items.length - this._overflowCount;

		// Update selection
		items.forEach(item => { item.selected = item === targetItem; });

		// Promote: swap target with last visible item in DOM order
		if (visibleCount > 0 && visibleCount < items.length) {
			const lastVisible = items[visibleCount - 1];
			// insertBefore moves targetItem just before lastVisible,
			// making it the new (visibleCount-1)th item
			this.insertBefore(targetItem, lastVisible);
		}

		// Re-apply visibility since DOM order changed
		this._applyItemVisibility();
		this._updateMenu();

		this.dispatchEvent(new CustomEvent('tabchange', {
			bubbles: true,
			composed: true,
			detail: { item: targetItem },
		}));
	}

	private _createMenu(): void {
		if (this._menu) return;
		const menu = document.createElement('rr-menu');
		menu.setAttribute('placement', 'bottom-end');
		menu.id = `${this._id}-menu`;
		menu.addEventListener('toggle', (event: Event) => {
			this._menuOpen = (event as ToggleEvent).newState === 'open';
		});
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuAnchor(): void {
		if (!this._menu) return;
		const button = this.shadowRoot?.querySelector('.document-tab-bar__overflow rr-icon-button') as HTMLElement | null;
		if (button) {
			(this._menu as any).anchorElement = button;
		}
	}

	private _closeMenu(): void {
		(this._menu as any)?.hidePopover?.();
	}

	_onOverflowButtonClick(): void {
		if (!this._menu) return;
		this._syncMenuAnchor();
		this._updateMenu();
		if (this._menuOpen) {
			(this._menu as any).hidePopover?.();
		} else {
			(this._menu as any).showPopover?.();
		}
	}


	// — Event handlers —————————————————————————————————————————————————————————

	private _handleItemSelect = (event: CustomEvent): void => {
		event.stopPropagation();
		const selectedItem = event.detail.item as RRDocumentTabBarItem;
		this._getItems().forEach(item => { item.selected = item === selectedItem; });
		this.dispatchEvent(new CustomEvent('tabchange', {
			bubbles: true,
			composed: true,
			detail: event.detail,
		}));
	};

	private _handleItemDismiss = (event: CustomEvent): void => {
		event.stopPropagation();
		const dismissedItem = event.detail.item as RRDocumentTabBarItem;
		const items = this._getItems();
		let nextItem: RRDocumentTabBarItem | null = null;

		if (dismissedItem.selected) {
			const index = items.indexOf(dismissedItem);
			// Try right first, then left
			for (let i = index + 1; i < items.length; i++) {
				if (!items[i].disabled && !items[i].hidden) { nextItem = items[i]; break; }
			}
			if (!nextItem) {
				for (let i = index - 1; i >= 0; i--) {
					if (!items[i].disabled && !items[i].hidden) { nextItem = items[i]; break; }
				}
			}
			if (nextItem) nextItem.selected = true;
			dismissedItem.selected = false;
		}

		const isLastItem = items.length === 1;

		this.dispatchEvent(new CustomEvent('tabdismiss', {
			bubbles: true,
			composed: true,
			detail: { item: dismissedItem, nextItem },
		}));

		if (isLastItem) {
			this.dispatchEvent(new CustomEvent('tabempty', { bubbles: true, composed: true }));
		}
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		const items = this._getItems().filter(item => !item.disabled && !item.hidden);
		if (items.length === 0) return;

		const currentIndex = items.findIndex(
			item => item === event.target || item.contains(event.target as Node)
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

		if (newIndex >= 0) items[newIndex].focus();
	};

	override render() {
		return documentTabBarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-document-tab-bar': RRDocumentTabBar;
		'rr-document-tab-bar-item': RRDocumentTabBarItem;
	}
}

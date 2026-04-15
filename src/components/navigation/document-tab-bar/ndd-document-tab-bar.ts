/**
 * Nederlandse Digitale Dienst Document Tab Bar Component (Lit + TypeScript)
 *
 * A horizontal tab bar for document tabs with an automatic overflow button
 * and an end slot for action buttons.
 * Exports both NDDDocumentTabBar and NDDDocumentTabBarItem.
 *
 * @element ndd-document-tab-bar
 * @attr {string}  accessible-label       - Accessible name for the navigation landmark
 * @attr {object}  translations           - Translation overrides; unset keys fall back to Dutch.
 *                                          Available keys: 'components.document-tab-bar.overflow-action' (default: 'Meer')
 *
 * @migration The `overflow-button-label` attribute has been removed.
 *            Use `translations` property instead: `.translations=${{ 'components.document-tab-bar.overflow-action': 'Tabs' }}`
 * @attr {boolean} navigation             - Renders a nav landmark instead of tablist; use when items have hrefs
 *
 * @slot     - ndd-document-tab-bar-item elements
 * @slot end - Action buttons (e.g. new tab)
 *
 * @fires tabchange  - Fired when a tab is selected; detail: { item }
 * @fires tabdismiss - Fired when a tab is dismissed; detail: { item, nextItem }
 * @fires tabempty   - Fired when the last tab is dismissed
 * @fires ndd-reorder - Fired when tabs are reordered via drag; detail: { fromIndex, toIndex }
 *
 * ---
 *
 * @element ndd-document-tab-bar-item
 * @attr {boolean} selected              - Selected state (managed by ndd-document-tab-bar)
 * @attr {string}  text                  - Primary text
 * @attr {string}  supporting-text       - Supporting text
 * @attr {string}  short-text            - Short primary text (visible below 200px width)
 * @attr {string}  short-supporting-text - Short supporting text (visible below 200px width)
 * @attr {string}  href                  - Optional link URL; renders an anchor instead of a div
 *
 * @fires select  - Fired when the item is activated; detail: { item }
 * @fires dismiss - Fired when the dismiss button is clicked; detail: { item }
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { documentTabBarStyles, documentTabBarItemStyles } from './ndd-document-tab-bar.styles.ts';
import { documentTabBarTemplate, documentTabBarItemTemplate } from './ndd-document-tab-bar.template.ts';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nddDocumentTabBarTranslations } from './ndd-document-tab-bar.i18n.ts';
import './../../lists-and-menus/menu/ndd-menu.ts';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';

// Pointer movement threshold in px before drag mode activates.
// Distinguishes a click (select) from a drag (reorder).
const DRAG_THRESHOLD = 5;

export interface NDDReorderEventDetail {
	fromIndex: number;
	toIndex: number;
}


// # ndd-document-tab-bar-item

@customElement('ndd-document-tab-bar-item')
export class NDDDocumentTabBarItem extends LitElement {
	static override styles = documentTabBarItemStyles;

	private static _counter = 0;
	readonly _id = `ndd-document-tab-bar-item-${NDDDocumentTabBarItem._counter++}`;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: String, attribute: 'text' })
	text = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	@property({ type: String, attribute: 'short-text' })
	shortText = '';

	@property({ type: String, attribute: 'short-supporting-text' })
	shortSupportingText = '';

	@property({ type: String })
	href = '';

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'none');
	}

	/** Set by ndd-document-tab-bar. Not part of the public API. */
	@state()
	_dismissButtonAccessibilityLabel = 'Sluit';

	/** Set by ndd-document-tab-bar. Marks this item as the keyboard entry point when no tab is selected. */
	@state()
	_isFallbackFocusable = false;

	/** Set by ndd-document-tab-bar. Not part of the public API. */
	@state()
	_navigation = false;

	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLElement>('.document-tab-bar__item-tab')?.focus(options);
	}



	_handleClick(): void {
		this.dispatchEvent(new CustomEvent('select', {
			bubbles: true,
			composed: true,
			detail: { item: this },
		}));
	}

	_handleDismiss(event: Event): void {
		event.stopPropagation();
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


// # ndd-document-tab-bar

@customElement('ndd-document-tab-bar')
export class NDDDocumentTabBar extends withTranslations(LitElement, nddDocumentTabBarTranslations) {
	static override styles = documentTabBarStyles;

	private static _counter = 0;
	readonly _id = `ndd-document-tab-bar-${NDDDocumentTabBar._counter++}`;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: Boolean, reflect: true })
	navigation = false;

	@state()
	_overflowCount = 0;

	@state()
	_menuOpen = false;

	private _menu: Element | null = null;
	private _menuClosedAt = 0;
	private _resizeObserver: ResizeObserver | null = null;
	private _hasCustomLabel = false;

	// — Drag state ——————————————————————————————————————————————————————————

	private _draggingEl: NDDDocumentTabBarItem | null = null;
	private _placeholder: HTMLDivElement | null = null;
	private _currentDropIndex = -1;
	private _pointerId: number | null = null;
	private _clone: HTMLDivElement | null = null;
	private _cloneOffsetX = 0;
	private _tabBarRect: DOMRect | null = null;

	// Pending drag: set on pointerdown, committed once DRAG_THRESHOLD is exceeded
	private _pendingDragItem: NDDDocumentTabBarItem | null = null;
	private _pendingDragStartX = 0;
	private _pendingPointerId: number | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('select', this._handleItemSelect as EventListener);
		this.addEventListener('dismiss', this._handleItemDismiss as EventListener);
		this.addEventListener('keydown', this._handleKeyDown);
		this.addEventListener('pointerdown', this._onPointerDown);
		this._createMenu();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('select', this._handleItemSelect as EventListener);
		this.removeEventListener('dismiss', this._handleItemDismiss as EventListener);
		this.removeEventListener('keydown', this._handleKeyDown);
		this.removeEventListener('pointerdown', this._onPointerDown);

		this._menu?.remove();
		this._menu = null;

		this._resizeObserver?.disconnect();
		this._resizeObserver = null;

		this._cancelDrag();
	}

	override firstUpdated(): void {
		this._hasCustomLabel = Boolean(this.accessibleLabel);
		if (!this._hasCustomLabel) {
			import.meta.env?.DEV && console.warn('<ndd-document-tab-bar>: No accessible-label provided. Add an accessible-label attribute for a meaningful navigation landmark name. Falling back to "Tabbladen".');
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
		if (changedProperties.has('translations')) {
			this._propagateDismissLabel();
		}
		if (changedProperties.has('navigation')) {
			this._propagateNavigation();
		}
	}

	// — Items ——————————————————————————————————————————————————————————————————

	private _getItems(): NDDDocumentTabBarItem[] {
		const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
		if (!slot) return [];
		return slot.assignedElements()
			.filter((el): el is NDDDocumentTabBarItem =>
				el.tagName.toLowerCase() === 'ndd-document-tab-bar-item' &&
				!el.hasAttribute('data-ndd-placeholder')
			);
	}

	private _getVisibleItems(): NDDDocumentTabBarItem[] {
		return this._getItems().filter(item => !item.hidden);
	}

	private _propagateNavigation(): void {
		this._getItems().forEach(item => { item._navigation = this.navigation; });
	}

	private _propagateDismissLabel(): void {
		const label = this._t('components.document-tab-bar.dismiss-action');
		this._getItems().forEach(item => { item._dismissButtonAccessibilityLabel = label; });
	}

	private _syncFallbackFocusable(): void {
		const items = this._getVisibleItems();
		const hasSelected = items.some(item => item.selected);
		const firstEnabled = items.find(item => !item.hidden) ?? null;
		items.forEach(item => {
			item._isFallbackFocusable = !hasSelected && item === firstEnabled;
		});
	}

	_onEndSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	}

	_onSlotChange(): void {
		this._calculateOverflow();
		this._propagateDismissLabel();
		this._syncFallbackFocusable();
		this._propagateNavigation();
	}

	private _applyItemVisibility(): void {
		const items = this._getItems();
		const visibleCount = items.length - this._overflowCount;
		items.forEach((item, index) => {
			item.hidden = index >= visibleCount;
		});
	}

	// — Drag: pointer ————————————————————————————————————————————————————————

	private _onPointerDown = (event: PointerEvent): void => {
		const path = event.composedPath() as Element[];

		// Do not start drag when clicking the dismiss button
		const onDismiss = path.some(el =>
			el instanceof Element && el.classList?.contains('document-tab-bar__item-dismiss-button')
		);
		if (onDismiss) return;

		const item = path.find(
			el => el instanceof Element && el.tagName.toLowerCase() === 'ndd-document-tab-bar-item'
		) as NDDDocumentTabBarItem | undefined;
		if (!item || item.hidden) return;

		// Record pending drag — only commit once pointer moves beyond threshold
		this._pendingDragItem = item;
		this._pendingDragStartX = event.clientX;
		this._pendingPointerId = event.pointerId;

		this.addEventListener('pointermove', this._onPointerMovePending);
		this.addEventListener('pointerup', this._onPointerUpPending);
		this.addEventListener('pointercancel', this._onPointerCancelPending);
	};

	private _onPointerMovePending = (event: PointerEvent): void => {
		if (event.pointerId !== this._pendingPointerId) return;
		if (!this._pendingDragItem) return;
		// Prevent text selection during potential drag
		event.preventDefault();
		if (Math.abs(event.clientX - this._pendingDragStartX) < DRAG_THRESHOLD) return;

		// Threshold exceeded — commit to drag
		const item = this._pendingDragItem;
		this._clearPendingDrag();

		event.preventDefault();
		this._startDrag(item, event.clientX);
		this._pointerId = event.pointerId;
		this.setPointerCapture(event.pointerId);
		this.addEventListener('pointermove', this._onPointerMove);
		this.addEventListener('pointerup', this._onPointerUp);
		this.addEventListener('pointercancel', this._onPointerCancel);
	};

	private _onPointerUpPending = (): void => {
		this._clearPendingDrag();
	};

	private _onPointerCancelPending = (): void => {
		this._clearPendingDrag();
	};

	private _clearPendingDrag(): void {
		this._pendingDragItem = null;
		this._pendingDragStartX = 0;
		this._pendingPointerId = null;
		this.removeEventListener('pointermove', this._onPointerMovePending);
		this.removeEventListener('pointerup', this._onPointerUpPending);
		this.removeEventListener('pointercancel', this._onPointerCancelPending);
	}

	private _lastPointerX = 0;

	private _onPointerMove = (event: PointerEvent): void => {
		if (!this._draggingEl || !this._placeholder) return;

		// Move floating clone horizontally
		if (this._clone) {
			this._tabBarRect = this.getBoundingClientRect();
			this._clone.style.setProperty(
				'--_drag-clone-left',
				`${event.clientX - this._tabBarRect.left - this._cloneOffsetX}px`
			);
		}

		const draggingRight = event.clientX >= this._lastPointerX;
		this._lastPointerX = event.clientX;

		const visibleItems = this._getVisibleItems().filter(i => i !== this._draggingEl);
		const pointerX = event.clientX;
		let toIndex = visibleItems.length; // default: end

		for (let i = 0; i < visibleItems.length; i++) {
			const inner = visibleItems[i].shadowRoot?.querySelector('.document-tab-bar__item') ?? visibleItems[i];
			const rect = inner.getBoundingClientRect();
			const threshold = draggingRight ? rect.left : rect.right;
			if (pointerX < threshold) {
				toIndex = i;
				break;
			}
		}

		this._setDropIndex(toIndex);
	};

	private _onPointerUp = (): void => {
		try {
			this._endDrag();
		} finally {
			document.documentElement.style.cursor = '';
		}
	};

	private _onPointerCancel = (): void => {
		try {
			this._cancelDrag();
		} finally {
			document.documentElement.style.cursor = '';
		}
	};

	// — Drag: keyboard ————————————————————————————————————————————————————————

	// — Drag: core ————————————————————————————————————————————————————————————

	private _startDrag(item: NDDDocumentTabBarItem, clientX = 0): void {
		const visibleItems = this._getVisibleItems();
		const visibleIndex = visibleItems.indexOf(item);
		if (visibleIndex === -1) return;

		this._draggingEl = item;
		this._currentDropIndex = visibleIndex;
		this._lastPointerX = clientX;

		const inner = item.shadowRoot?.querySelector<HTMLElement>('.document-tab-bar__item-tab') ?? item;
		const rect = inner.getBoundingClientRect();

		// Insert placeholder at item's current position
		this._placeholder = document.createElement('div');
		this._placeholder.className = 'ndd-document-tab-bar-drag-placeholder';
		this._placeholder.setAttribute('aria-hidden', 'true');
		this._placeholder.setAttribute('data-ndd-placeholder', '');
		item.after(this._placeholder);

		item.classList.add('is-dragging');
		this._tabBarRect = this.getBoundingClientRect();
		this._cloneOffsetX = clientX - rect.left;

		document.documentElement.style.cursor = 'grabbing';

		// Read threshold from CSS so there is one place to update it
		const threshold = parseFloat(getComputedStyle(item).getPropertyValue('--_short-text-threshold'));
		const useShort = rect.width < threshold;
		const displayTitle = useShort ? (item.shortText || item.text) : item.text;
		const displaySubtitle = useShort ? (item.shortSupportingText || item.supportingText) : item.supportingText;

		const cloneInner = document.createElement('div');
		cloneInner.className = 'document-tab-bar__item';

		const cloneTab = document.createElement('div');
		cloneTab.className = 'document-tab-bar__item-tab';

		const titleEl = document.createElement('span');
		titleEl.className = 'document-tab-bar__item-text';
		titleEl.textContent = displayTitle;
		cloneTab.appendChild(titleEl);

		if (displaySubtitle) {
			const subtitleEl = document.createElement('span');
			subtitleEl.className = 'document-tab-bar__item-supporting-text';
			subtitleEl.textContent = displaySubtitle;
			cloneTab.appendChild(subtitleEl);
		}

		cloneInner.appendChild(cloneTab);

		this._clone = document.createElement('div');
		this._clone.className = `document-tab-bar__drag-clone${item.selected ? ' is-selected' : ''}`;
		this._clone.style.setProperty('--_drag-clone-left', `${clientX - this._tabBarRect.left - this._cloneOffsetX}px`);
		this._clone.style.setProperty('--_drag-clone-top', `${rect.top - this._tabBarRect.top}px`);
		this._clone.style.setProperty('--_drag-clone-width', `${rect.width}px`);
		this._clone.style.setProperty('--_drag-clone-height', `${rect.height}px`);
		this._clone.appendChild(cloneInner);
		this.renderRoot.appendChild(this._clone);
	}

	private _setDropIndex(toIndex: number): void {
		if (!this._placeholder || !this._draggingEl) return;

		const nonDragging = this._getVisibleItems().filter(i => i !== this._draggingEl);
		const clamped = Math.max(0, Math.min(nonDragging.length, toIndex));
		this._currentDropIndex = clamped;
		this._placeholder.remove();

		if (nonDragging.length === 0) {
			this._draggingEl.after(this._placeholder);
			return;
		}

		if (clamped === 0) {
			nonDragging[0].before(this._placeholder);
		} else {
			nonDragging[clamped - 1].after(this._placeholder);
		}
	}

	private _getDropIndex(): number {
		return this._currentDropIndex;
	}

	private _endDrag(): void {
		if (!this._draggingEl || !this._placeholder) return;

		const allItems = this._getItems();
		const movedItem = this._draggingEl;
		const fromIndex = allItems.indexOf(movedItem);

		// Move item to where the placeholder is before cleanup removes it
		this._placeholder.replaceWith(movedItem);

		// toIndex is now movedItem's new position in DOM
		const newAllItems = this._getItems();
		const toIndex = newAllItems.indexOf(movedItem);

		this._cleanupDrag();

		if (fromIndex !== toIndex) {
			this.dispatchEvent(new CustomEvent<NDDReorderEventDetail>('ndd-reorder', {
				detail: { fromIndex, toIndex },
				bubbles: true,
				composed: true,
			}));
			this._announce(this._t('components.document-tab-bar.drag-dropped-text', { position: toIndex + 1 }));

			requestAnimationFrame(() => {
				const inner = movedItem.shadowRoot?.querySelector<HTMLElement>('.document-tab-bar__item-tab');
				inner?.focus();
			});
		} else {
			this._announce(this._t('components.document-tab-bar.drag-no-change-text'));
		}
	}

	private _cancelDrag(): void {
		if (!this._draggingEl) return;
		this._cleanupDrag();
		this._announce(this._t('components.document-tab-bar.drag-cancelled-text'));
	}

	private _cleanupDrag(): void {
		this._clearPendingDrag();

		this._draggingEl?.classList.remove('is-dragging');
		this._placeholder?.remove();
		this._clone?.remove();
		document.documentElement.style.cursor = '';

		if (this._pointerId !== null) {
			try { this.releasePointerCapture(this._pointerId); } catch (e) { if (!(e instanceof DOMException)) throw e; }
			this._pointerId = null;
		}

		this.removeEventListener('pointermove', this._onPointerMove);
		this.removeEventListener('pointerup', this._onPointerUp);
		this.removeEventListener('pointercancel', this._onPointerCancel);

		this._draggingEl = null;
		this._placeholder = null;
		this._clone = null;
		this._cloneOffsetX = 0;
		this._tabBarRect = null;
		this._lastPointerX = 0;
		this._currentDropIndex = -1;
	}


	// — Accessibility ——————————————————————————————————————————————————————————

	private _announce(message: string, assertive = false): void {
		const selector = assertive
			? '.document-tab-bar__assertive-announcer'
			: '.document-tab-bar__polite-announcer';
		const region = this.shadowRoot?.querySelector<HTMLElement>(selector);
		if (!region) return;
		region.textContent = '';
		requestAnimationFrame(() => requestAnimationFrame(() => {
			region.textContent = message;
		}));
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
		const minItemWidth = firstItem
			? parseFloat(getComputedStyle(firstItem).minWidth) || parseFloat(getComputedStyle(this).getPropertyValue('--_item-min-width'))
			: parseFloat(getComputedStyle(this).getPropertyValue('--_item-min-width'));

		const overflowButtonReserve = parseFloat(getComputedStyle(this).getPropertyValue('--_overflow-button-reserve'));
		// (containerWidth - overflowButtonWidth + gap) / (minItemWidth + gap)
		const visible = Math.floor((containerWidth - overflowButtonReserve + gap) / (minItemWidth + gap));
		const newOverflowCount = Math.max(0, totalItems - Math.max(1, visible));

		if (newOverflowCount !== this._overflowCount) {
			this._overflowCount = newOverflowCount;
			this._ensureSelectedVisible();
		}
	}

	private _ensureSelectedVisible(): void {
		// Deliberately performs a silent light DOM reorder without firing ndd-reorder.
		// This is triggered by the ResizeObserver when overflow recalculates, not by
		// user action. Firing ndd-reorder here would cause consumers tracking tab order
		// (e.g. persisting to a server) to receive spurious events on window resize.
		// Consumers should treat DOM order as the source of truth for tab order and
		// not rely on ndd-reorder being exhaustive.
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
		// Rebuilds menu DOM from scratch on every overflow recalculation.
		// Any event listeners added directly to ndd-menu-item elements by consumers
		// will be lost. Consumers should listen on the ndd-document-tab-bar itself
		// using event delegation rather than on individual menu items.
		this._menu.innerHTML = '';

		const items = this._getItems();
		const visibleCount = items.length - this._overflowCount;

		items.slice(visibleCount).forEach(item => {
			const menuItemText = item.supportingText
				? `${item.text || '–'} · ${item.supportingText}`
				: item.text || '–';
			const menuItem = document.createElement('ndd-menu-item');
			menuItem.setAttribute('text', menuItemText);
			menuItem.addEventListener('click', () => {
				this._selectAndPromote(item);
				this._closeMenu();
			});
			this._menu!.appendChild(menuItem);
		});
	}

	private _selectAndPromote(targetItem: NDDDocumentTabBarItem): void {
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
		// SSR guard — document is not available in server-side rendering contexts
		if (typeof document === 'undefined') return;
		const menu = document.createElement('ndd-menu');
		menu.setAttribute('placement', 'bottom-end');
		menu.id = `${this._id}-menu`;
		menu.addEventListener('toggle', (event: Event) => {
			const open = (event as ToggleEvent).newState === 'open';
			this._menuOpen = open;
			if (!open) this._menuClosedAt = Date.now();
		});
		// TODO: appending to document.body and accessing ndd-menu internals via any-cast
		// is a known limitation. Fix: define a typed public API on ndd-menu (anchorElement,
		// showPopover, hidePopover) or use a popover anchor approach within renderRoot.
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuAnchor(): void {
		if (!this._menu) return;
		const button = this.shadowRoot?.querySelector('.document-tab-bar__overflow ndd-icon-button') as HTMLElement | null;
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
		} else if (Date.now() - this._menuClosedAt > POPOVER_REOPEN_GUARD_MS) {
			(this._menu as any).showPopover?.();
		}
	}


	// — Event handlers —————————————————————————————————————————————————————————

	private _handleItemSelect = (event: CustomEvent): void => {
		event.stopPropagation();
		const selectedItem = event.detail.item as NDDDocumentTabBarItem;
		this._getItems().forEach(item => { item.selected = item === selectedItem; });
		this._syncFallbackFocusable();
		this.dispatchEvent(new CustomEvent('tabchange', {
			bubbles: true,
			composed: true,
			detail: event.detail,
		}));
	};

	private _handleItemDismiss = (event: CustomEvent): void => {
		event.stopPropagation();
		const dismissedItem = event.detail.item as NDDDocumentTabBarItem;
		const items = this._getItems();
		let nextItem: NDDDocumentTabBarItem | null = null;

		if (dismissedItem.selected) {
			const index = items.indexOf(dismissedItem);
			// Try right first, then left
			for (let i = index + 1; i < items.length; i++) {
				if (!items[i].hidden) { nextItem = items[i]; break; }
			}
			if (!nextItem) {
				for (let i = index - 1; i >= 0; i--) {
					if (!items[i].hidden) { nextItem = items[i]; break; }
				}
			}
			if (nextItem) {
				nextItem.selected = true;
				nextItem.focus();
			}
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

		this._syncFallbackFocusable();
	};

	private _handleKeyDown = (event: KeyboardEvent): void => {
		const path = event.composedPath() as Element[];

		const item = path.find(
			el => el instanceof Element && el.tagName.toLowerCase() === 'ndd-document-tab-bar-item'
		) as NDDDocumentTabBarItem | undefined;
		if (!item || item.hidden) return;

		const onDismiss = path.some(el =>
			el instanceof Element && el.classList?.contains('document-tab-bar__item-dismiss-button')
		);
		if (onDismiss) return;

		// — Shift+Arrow: reorder —
		if (event.shiftKey && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
			event.preventDefault();
			const visibleItems = this._getVisibleItems();
			const allItems = this._getItems();
			const currentIndex = visibleItems.indexOf(item);
			if (currentIndex === -1) return;

			const targetIndex = event.key === 'ArrowLeft' ? currentIndex - 1 : currentIndex + 1;
			if (targetIndex < 0 || targetIndex >= visibleItems.length) return;

			const sibling = visibleItems[targetIndex];
			if (event.key === 'ArrowLeft') {
				sibling.before(item);
			} else {
				sibling.after(item);
			}

			const fromIndex = allItems.indexOf(item);
			const newAllItems = this._getItems();
			const toIndex = newAllItems.indexOf(item);

			this.dispatchEvent(new CustomEvent<NDDReorderEventDetail>('ndd-reorder', {
				detail: { fromIndex, toIndex },
				bubbles: true,
				composed: true,
			}));

			this._announce(this._t('components.document-tab-bar.drag-dropped-text', { position: toIndex + 1 }));

			// Restore focus after DOM move
			requestAnimationFrame(() => {
				item.shadowRoot?.querySelector<HTMLElement>('.document-tab-bar__item-tab')?.focus();
			});
			return;
		}

		// — Arrow keys: move focus —
		const items = this._getVisibleItems();
		if (items.length === 0) return;

		const currentIndex = items.findIndex(
			i => i === event.target || i.contains(event.target as Node)
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
			items[newIndex].focus();
			// Auto-activate only for content-switching tabs, not navigation tabs
			if (!this.navigation) {
				this._getItems().forEach(item => { item.selected = item === items[newIndex]; });
				this.dispatchEvent(new CustomEvent('tabchange', {
					bubbles: true,
					composed: true,
					detail: { item: items[newIndex] },
				}));
			}
		}
	};

	override render() {
		return documentTabBarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-document-tab-bar': NDDDocumentTabBar;
		'ndd-document-tab-bar-item': NDDDocumentTabBarItem;
	}
}

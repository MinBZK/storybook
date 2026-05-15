/**
 * Nederlandse Digitale Dienst Toolbar Component (Lit + TypeScript)
 *
 * @element nldd-toolbar
 * @attr {string} size - Toolbar size, propagated to all child controls: 'sm' | 'md' (default: 'md')
 * @attr {boolean} show-item-labels - When true, shows a text label below each toolbar item and the overflow button
 * @attr {string} label - Accessible label for the toolbar. Only needed when multiple toolbars appear on the same page
 *
 * @slot start    - nldd-toolbar-item and nldd-toolbar-title elements placed at the start
 * @slot center   - nldd-toolbar-item and nldd-toolbar-title elements placed at the center
 * @slot end      - nldd-toolbar-item and nldd-toolbar-title elements placed at the end
 * @slot overflow - nldd-menu-item and nldd-menu-divider elements always shown in the overflow menu
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { toolbarStyles } from './toolbar.styles.js';
import { template, type ToolbarChild } from './toolbar.template.js';
import { nlddToolbarTranslations } from './toolbar.i18n.js';
import type { NLDDToolbarTranslations } from './toolbar.i18n.js';
import { NLDDMenu } from '../../lists-and-menus/menu/menu.js';

// # Marker elements
if (!customElements.get('nldd-toolbar-item')) {
	customElements.define('nldd-toolbar-item', class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' }).innerHTML = '<slot></slot><slot name="overflow" style="display:none"></slot>';
		}
	});
}
if (!customElements.get('nldd-toolbar-title')) {
	customElements.define('nldd-toolbar-title', class extends HTMLElement {});
}

// # Types
type Size = 'sm' | 'md';

// # Component

@customElement('nldd-toolbar')
export class NLDDToolbar extends LitElement {
	static override styles = toolbarStyles;

	/** Controls the size of toolbar items. Propagated automatically to all child controls. */
	@property({ type: String, reflect: true })
	size: Size = 'md';

	/** When true, shows a text label below each toolbar item and the overflow button. */
	@property({ type: Boolean, reflect: true, attribute: 'show-item-labels' })
	showItemLabels = false;

	/**
	 * Accessible label for the toolbar, exposed as `aria-label` on the `role="toolbar"` container.
	 * Only needed when multiple toolbars appear on the same page so screen readers can distinguish them.
	 * @example `<nldd-toolbar label="Formatting">`
	 */
	@property({ type: String, reflect: true })
	label = '';

	@property({ type: Object })
	translations: Partial<NLDDToolbarTranslations> = {};

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDToolbarTranslations): string {
		return this.translations[key] ?? nlddToolbarTranslations[key];
	}

	@state()
	private _menuOpen = false;

	@state()
	private _startChildren: ToolbarChild[] = [];

	@state()
	private _centerChildren: ToolbarChild[] = [];

	@state()
	private _endChildren: ToolbarChild[] = [];

	@state()
	private _overflowIds: Set<number> = new Set();

	@state()
	private _leftSpacerZero = false;

	@state()
	private _rightSpacerZero = false;

	@state()
	private _pinnedOverflowItems: Element[] = [];

	private _childIds = new WeakMap<Element, number>();
	private _idCounter = 0;
	private _itemWidths = new Map<number, number>();
	private _observer: MutationObserver | null = null;
	private _resizeObserver: ResizeObserver | null = null;
	private _menu: NLDDMenu | null = null;
	private _isMeasuring = false;
	private _isBuilding = false;
	private _hasMeasured = false;
	private _prioritizedItemsCache: Extract<ToolbarChild, { type: 'item' }>[] | null = null;

	private _getId(el: Element): number {
		if (!this._childIds.has(el)) {
			this._childIds.set(el, this._idCounter++);
		}
		return this._childIds.get(el)!;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver((mutations) => {
			if (this._isBuilding) return;
			const onlyInternalMoves = mutations.every(m => {
				// Attribute change — only rebuild for toolbar-structural elements.
				// Changes on deeply nested descendants (e.g. nldd-segmented-control-item)
				// are safe to ignore.
				if (m.type === 'attributes') {
					const tag = (m.target as Element).tagName.toLowerCase();
					return tag !== 'nldd-toolbar-item' && tag !== 'nldd-toolbar-title';
				}
				return false;
			});
			if (onlyInternalMoves) return;
			this._buildChildren();
		});
		setTimeout(() => this._buildChildren(), 0);
		this._createMenu();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
		this._menu?.remove();
		this._menu = null;
	}

	override firstUpdated(): void {
		this._resizeObserver = new ResizeObserver(() => {
			if (this._isMeasuring) return;
			if (this._menuOpen) {
				(this._menu as unknown as { hidePopover: () => void })?.hidePopover();
			}
			this._measureAndUpdate();
		});
		this._resizeObserver.observe(this);
		this._propagateSize();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('size')) {
			this._propagateSize();
		}
		if (
			changedProperties.has('_startChildren') ||
			changedProperties.has('_centerChildren') ||
			changedProperties.has('_endChildren')
		) {
			this.updateComplete.then(() => this._measureAndUpdate());
		}
		if (
			changedProperties.has('_overflowIds') ||
			changedProperties.has('_pinnedOverflowItems')
		) {
			this._syncMenuItems();
			this._syncMenuAnchor();
			if (!this._hasMeasured) {
				this.updateComplete.then(() => this._updateAreaVars());
			}
		}
	}

	private _createMenu(): void {
		if (this._menu) return;
		const menu = document.createElement('nldd-menu') as NLDDMenu;
		menu.setAttribute('placement', 'bottom-end');
		menu.id = `nldd-toolbar-overflow-menu-${this._idCounter++}`;
		menu.addEventListener('toggle', (event: Event) => {
			this._menuOpen = (event as ToggleEvent).newState === 'open';
		});
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuAnchor(): void {
		if (!this._menu) return;
		const overflowButton = this.shadowRoot?.querySelector('.toolbar__overflow-button nldd-icon-button') as HTMLElement & {
			popoverTargetElement?: Element | null;
			popoverTargetAction?: 'toggle' | 'show' | 'hide';
		} | null;
		if (overflowButton) {
			this._menu.anchorElement = overflowButton;
			// Wire the button as the menu's invoker. The browser handles
			// open/close natively via popovertarget — no `@click` handler
			// needed. The menu syncs `popoverTargetAction` on every toggle
			// (`'hide'` while open, `'show'` while closed), so the next
			// click does the right thing without racing against light-
			// dismiss. Seed `'show'` here for the very first click before
			// the menu has ever toggled.
			if ('popoverTargetElement' in overflowButton) {
				overflowButton.popoverTargetElement = this._menu;
			}
			// Default IDL value is 'toggle'; replace it with 'show' so the
			// very first click opens via the explicit-show path. Once the
			// menu has opened, `_syncAnchorPopupState` keeps the action in
			// sync with state ('hide' while open, 'show' while closed) and
			// this seed never overrides it.
			if ('popoverTargetAction' in overflowButton && overflowButton.popoverTargetAction === 'toggle') {
				overflowButton.popoverTargetAction = 'show';
			}
		}
	}

	/**
	 * Syncs overflow menu items by cloning the original `nldd-menu-item` elements.
	 * Note: `cloneNode` does not copy event listeners added via `addEventListener`.
	 * The `select` event works correctly since it is dispatched by `nldd-menu-item` internally.
	 * Consumers should avoid adding extra listeners directly on overflow `nldd-menu-item` elements.
	 */
	private _syncMenuItems(): void {
		if (!this._menu) return;
		this._menu.innerHTML = '';

		const prioritized = [...this._getPrioritizedItems()].reverse();

		prioritized.forEach(child => {
			if (!this._overflowIds.has(child.id)) return;
			if (child.overflowItems.length === 0) return;
			child.overflowItems.forEach(el => {
				const clone = el.cloneNode(true) as Element;
				clone.removeAttribute('slot');
				this._menu!.appendChild(clone);
			});
		});

		if (this._pinnedOverflowItems.length > 0) {
			this._pinnedOverflowItems.forEach(el => {
				const clone = el.cloneNode(true) as Element;
				this._menu!.appendChild(clone);
			});
		}
	}

	private _propagateSize(): void {
		Array.from(this.querySelectorAll('nldd-toolbar-item')).forEach(item => {
			Array.from(item.children).forEach(child => {
				if (child.getAttribute('slot') !== 'overflow') {
					child.setAttribute('size', this.size);
				}
			});
		});
	}

	private _getPrioritizedItems(): Extract<ToolbarChild, { type: 'item' }>[] {
		if (this._prioritizedItemsCache) return this._prioritizedItemsCache;
		const endItems = this._endChildren
			.filter((c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item');
		const startItems = this._startChildren
			.filter((c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item');
		const centerItems = this._centerChildren
			.filter((c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item');

		const result = [
			...endItems.map((item, index) => ({ item, areaOrder: 0, index })),
			...centerItems.map((item, index) => ({ item, areaOrder: 1, index })),
			...startItems.map((item, index) => ({ item, areaOrder: 2, index })),
		]
			.sort((a, b) => {
				if (a.item.priority !== b.item.priority) return a.item.priority - b.item.priority;
				if (a.areaOrder !== b.areaOrder) return a.areaOrder - b.areaOrder;
				return b.index - a.index;
			})
			.map(({ item }) => item);
		this._prioritizedItemsCache = result;
		return result;
	}

	private _measureItemWidths(): void {
		const measurableEls = Array.from(
			this.shadowRoot?.querySelectorAll('.toolbar__item[data-child-id], .toolbar__title-group[data-child-id]') ?? []
		) as HTMLElement[];
		measurableEls.forEach(el => {
			const id = Number(el.dataset.childId);
			this._itemWidths.set(id, el.getBoundingClientRect().width);
		});
	}

	private _computeAreaWidth(children: ToolbarChild[], itemGap: number): number {
		const visible = children.filter(c => !this._overflowIds.has(c.id));
		const gaps = Math.max(0, visible.length - 1) * itemGap;
		const itemsWidth = visible.reduce((sum, child) => {
			if (child.type === 'item' || child.type === 'title') {
				return sum + (this._itemWidths.get(child.id) ?? 0);
			}
			return sum;
		}, 0);
		return gaps + itemsWidth;
	}

	private _computeSpacerZeros(
		hostWidth: number,
		itemGap: number,
		overflowButtonWidth: number,
		startWidth: number,
		centerWidth: number,
		endWidth: number,
	): { leftZero: boolean; rightZero: boolean } {
		if (startWidth === 0 && endWidth === 0) {
			return { leftZero: true, rightZero: true };
		}
		const leftSpacer = hostWidth / 2 - startWidth - centerWidth / 2 - itemGap;
		const rightSpacer = hostWidth / 2 - endWidth - centerWidth / 2 - itemGap - overflowButtonWidth;
		return {
			leftZero: leftSpacer <= 0,
			rightZero: rightSpacer <= 0,
		};
	}

	private _updateAreaVars(): void {
		const itemsEl = this.shadowRoot?.querySelector('.toolbar__items') as HTMLElement | null;
		if (!itemsEl) return;

		const hostWidth = this.getBoundingClientRect().width;
		const itemGap = parseFloat(getComputedStyle(itemsEl).gap ?? '0');
		const hostGap = parseFloat(getComputedStyle(this).gap ?? '0');

		const overflowButtonContainerEl = this.shadowRoot?.querySelector('.toolbar__overflow-button') as HTMLElement | null;
		const overflowButtonEl = this.shadowRoot?.querySelector('.toolbar__overflow-button nldd-icon-button') as HTMLElement | null;
		const overflowButtonWidth = (overflowButtonContainerEl && !overflowButtonContainerEl.classList.contains('is-hidden') && overflowButtonEl)
			? overflowButtonEl.getBoundingClientRect().width + hostGap
			: 0;

		this.style.setProperty('--_overflow-button-width', `${overflowButtonWidth}px`);

		const startWidth = this._computeAreaWidth(this._startChildren, itemGap);
		const centerWidth = this._computeAreaWidth(this._centerChildren, itemGap);
		const endWidth = this._computeAreaWidth(this._endChildren, itemGap);

		this.style.setProperty('--_start-width', `${startWidth}px`);
		this.style.setProperty('--_center-width', `${centerWidth}px`);
		this.style.setProperty('--_end-width', `${endWidth}px`);

		const { leftZero, rightZero } = this._computeSpacerZeros(
			hostWidth, itemGap, overflowButtonWidth, startWidth, centerWidth, endWidth
		);
		if (leftZero !== this._leftSpacerZero) this._leftSpacerZero = leftZero;
		if (rightZero !== this._rightSpacerZero) this._rightSpacerZero = rightZero;
	}

	private _measureAndUpdate(): void {
		if (this._isMeasuring) return;
		const itemsEl = this.shadowRoot?.querySelector('.toolbar__items') as HTMLElement | null;
		if (!itemsEl) return;

		this._isMeasuring = true;
		const hostWidth = this.getBoundingClientRect().width;
		this.style.setProperty('--_width', `${hostWidth}px`);
		this._measureOverflow(itemsEl);
		this._hasMeasured = true;
		this._isMeasuring = false;
	}

	private _measureOverflow(itemsEl: HTMLElement): void {
		const overflowButtonEl = this.shadowRoot?.querySelector('.toolbar__overflow-button') as HTMLElement | null;
		const allItemEls = Array.from(
			this.shadowRoot?.querySelectorAll('.toolbar__item[data-child-id]') ?? []
		) as HTMLElement[];
		const allTitleGroupEls = Array.from(
			this.shadowRoot?.querySelectorAll('.toolbar__title-group[data-child-id]') ?? []
		) as HTMLElement[];
		const allChildren = [...this._startChildren, ...this._centerChildren, ...this._endChildren];

		// Show all items, reset solo-fluid to is-fluid with min-width restored
		allItemEls.forEach(el => {
			el.classList.remove('is-hidden');
			if (el.classList.contains('is-solo-fluid')) {
				el.classList.replace('is-solo-fluid', 'is-fluid');
				const id = Number(el.dataset.childId);
				const child = allChildren.find(c => c.id === id);
				if (child?.type === 'item' && child.minWidth) {
					el.style.setProperty('--_item-min-width', child.minWidth);
				}
			}
		});
		allTitleGroupEls.forEach(el => {
			if (el.classList.contains('is-solo-fluid')) {
				el.classList.remove('is-solo-fluid');
				el.style.removeProperty('min-width');
			}
		});

		if (this._pinnedOverflowItems.length > 0) {
			overflowButtonEl?.classList.remove('is-hidden');
		} else {
			overflowButtonEl?.classList.add('is-hidden');
		}
		void itemsEl.offsetWidth;

		const isOverflowing = () => itemsEl.scrollWidth > itemsEl.clientWidth + 1;

		if (!isOverflowing()) {
			if (this._overflowIds.size > 0) {
				this._overflowIds = new Set();
			}
			this._measureItemWidths();
			this._updateAreaVars();
			return;
		}

		overflowButtonEl?.classList.remove('is-hidden');
		void itemsEl.offsetWidth;

		const prioritized = this._getPrioritizedItems();
		const newOverflowIds = new Set<number>();

		for (const child of prioritized) {
			if (!isOverflowing()) break;

			if (child.isFluid) {
				const remainingVisible = allItemEls.filter(el =>
					!el.classList.contains('is-hidden') &&
					!el.classList.contains('is-fluid') &&
					!el.classList.contains('is-solo-fluid')
				);
				if (remainingVisible.length === 0) break;
			}

			newOverflowIds.add(child.id);
			const el = this.shadowRoot?.querySelector(
				`.toolbar__item[data-child-id="${child.id}"]`
			) as HTMLElement | null;
			el?.classList.add('is-hidden');
			void itemsEl.offsetWidth;
		}

		if (newOverflowIds.size === 0 && this._pinnedOverflowItems.length === 0) {
			overflowButtonEl?.classList.add('is-hidden');
		}

		const remainingVisible = allItemEls.filter(el => !el.classList.contains('is-hidden'));
		if (remainingVisible.length === 1 && remainingVisible[0].classList.contains('is-fluid')) {
			remainingVisible[0].classList.replace('is-fluid', 'is-solo-fluid');
			remainingVisible[0].style.removeProperty('--_item-min-width');
			void itemsEl.offsetWidth;
		}

		const remainingTitleGroups = allTitleGroupEls.filter(el => !el.classList.contains('is-hidden'));
		if (remainingVisible.length === 0 && remainingTitleGroups.length === 1) {
			remainingTitleGroups[0].classList.add('is-solo-fluid');
			remainingTitleGroups[0].style.setProperty('min-width', '0px');
			void itemsEl.offsetWidth;
		}

		const changed =
			newOverflowIds.size !== this._overflowIds.size ||
			[...newOverflowIds].some(id => !this._overflowIds.has(id));

		if (changed) {
			this._overflowIds = newOverflowIds;
		}

		this._measureItemWidths();
		this._updateAreaVars();
	}

	private _buildChildrenForSlot(slotName: string): ToolbarChild[] {
		return Array.from(this.children)
			.filter(el => el.getAttribute('slot') === slotName)
			.map(el => {
				const tag = el.tagName.toLowerCase();

				if (tag === 'nldd-toolbar-title') {
					const id = this._getId(el);
					(el as HTMLElement).dataset.toolbarSlot = slotName;
					el.setAttribute('slot', `child-${id}`);
					return {
						type: 'title',
						title: el.getAttribute('text') ?? '',
						supportingText: el.getAttribute('supporting-text') ?? '',
						align: el.getAttribute('align') ?? 'left',
						minWidth: el.getAttribute('min-width') ?? '200px',
						id,
					} as ToolbarChild;
				}

				if (tag === 'nldd-toolbar-item') {
					const id = this._getId(el);
					const label = el.getAttribute('label') ?? '';
					const priority = parseInt(el.getAttribute('priority') ?? '0', 10);
					const minWidth = el.getAttribute('min-width') ?? '';
					const width = el.getAttribute('width') ?? '';
					const isFluid = !!(minWidth || width);

					Array.from(el.children).forEach(child => {
						if (child.getAttribute('slot') !== 'overflow') {
							child.setAttribute('size', this.size);
						}
					});

					(el as HTMLElement).dataset.toolbarSlot = slotName;
					el.setAttribute('slot', `child-${id}`);

					const overflowItems = Array.from(el.children).filter(child => {
						const childTag = child.tagName.toLowerCase();
						return childTag === 'nldd-menu-item' || childTag === 'nldd-menu-divider';
					});
					overflowItems.forEach(child => child.setAttribute('slot', 'overflow'));

					return { type: 'item', element: el, label, id, priority, overflowItems, minWidth, width, isFluid } as ToolbarChild;
				}

				const id = this._getId(el);
				(el as HTMLElement).dataset.toolbarSlot = slotName;
				el.setAttribute('slot', `child-${id}`);
				return { type: 'other', element: el, id } as ToolbarChild;
			});
	}

	private _buildPinnedOverflowItems(): void {
		this._pinnedOverflowItems = Array.from(this.children).filter(el => {
			const tag = el.tagName.toLowerCase();
			return el.getAttribute('slot') === 'overflow' &&
				(tag === 'nldd-menu-item' || tag === 'nldd-menu-divider');
		});
	}

	private _restoreSlots(): void {
		Array.from(this.children)
			.filter((el): el is HTMLElement => el instanceof HTMLElement && !!el.dataset.toolbarSlot)
			.forEach(el => {
				el.setAttribute('slot', el.dataset.toolbarSlot!);
				delete el.dataset.toolbarSlot;
			});
	}

	private _buildChildren(): void {
		if (this._isBuilding) return;
		this._isBuilding = true;

		this._observer?.disconnect();

		this._restoreSlots();

		this._startChildren = this._buildChildrenForSlot('start');
		this._centerChildren = this._buildChildrenForSlot('center');
		this._endChildren = this._buildChildrenForSlot('end');
		this._buildPinnedOverflowItems();
		this._prioritizedItemsCache = null;

		const itemAttributeFilter = ['label', 'priority', 'min-width', 'width', 'text', 'disabled', 'selected', 'type'];
		this._observer?.observe(this, { childList: true, attributes: true, subtree: true, attributeFilter: itemAttributeFilter });

		this._isBuilding = false;
	}

	override render() {
		const allChildren = [...this._startChildren, ...this._centerChildren, ...this._endChildren];
		const visibleNonDivider = allChildren.filter(c =>
			!this._overflowIds.has(c.id)
		);
		const isSoloFluid = visibleNonDivider.length === 1 && (
			visibleNonDivider[0].type === 'title' ||
			(visibleNonDivider[0].type === 'item' && visibleNonDivider[0].isFluid)
		);

		return template(
			this._startChildren,
			this._centerChildren,
			this._endChildren,
			this._overflowIds,
			this.size,
			this._centerChildren.length > 0,
			this._leftSpacerZero,
			this._rightSpacerZero,
			isSoloFluid,
			this._pinnedOverflowItems.length > 0 || this._overflowIds.size > 0,
			this._menuOpen,
			this.label,
			this._menu?.id ?? '',
			this._startChildren.length === 0 && this._endChildren.length === 0 && this._centerChildren.length > 0,
			(key) => this._t(key),
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-toolbar': NLDDToolbar;
		'nldd-toolbar-item': HTMLElement;
		'nldd-toolbar-title': HTMLElement;
	}
}

/**
 * RegelRecht Toolbar Component (Lit + TypeScript)
 *
 * @element rr-toolbar
 * @attr {string} size - Toolbar size, propagated to all child controls: 'sm' | 'md' (default: 'md')
 * @attr {boolean} show-item-labels - When true, shows a text label below each toolbar item and the overflow button
 * @attr {string} label - Accessible label for the toolbar. Only needed when multiple toolbars appear on the same page
 *
 * @slot - Place area elements (rr-toolbar-start-area, rr-toolbar-center-area, rr-toolbar-end-area, rr-toolbar-overflow-area) here
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-toolbar.styles.js';
import { template, type ToolbarChild } from './rr-toolbar.template.js';
import { RRMenu } from '../../lists-and-menus/menu/rr-menu.js';

// # Marker elements
if (!customElements.get('rr-toolbar-start-area')) {
	customElements.define('rr-toolbar-start-area', class extends HTMLElement {});
}
if (!customElements.get('rr-toolbar-center-area')) {
	customElements.define('rr-toolbar-center-area', class extends HTMLElement {});
}
if (!customElements.get('rr-toolbar-end-area')) {
	customElements.define('rr-toolbar-end-area', class extends HTMLElement {});
}
if (!customElements.get('rr-toolbar-overflow-area')) {
	customElements.define('rr-toolbar-overflow-area', class extends HTMLElement {});
}
if (!customElements.get('rr-toolbar-item')) {
	customElements.define('rr-toolbar-item', class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' }).innerHTML = '<slot></slot><slot name="overflow" style="display:none"></slot>';
		}
	});
}
if (!customElements.get('rr-toolbar-title-group')) {
	customElements.define('rr-toolbar-title-group', class extends HTMLElement {});
}

// # Types
type Size = 'sm' | 'md';

// # Component

@customElement('rr-toolbar')
export class RRToolbar extends LitElement {
	static override styles = styles;

	/** Controls the size of toolbar items. Propagated automatically to all child controls. */
	@property({ type: String, reflect: true })
	size: Size = 'md';

	/** When true, shows a text label below each toolbar item and the overflow button. */
	@property({ type: Boolean, reflect: true, attribute: 'show-item-labels' })
	showItemLabels = false;

	/**
	 * Accessible label for the toolbar, exposed as `aria-label` on the `role="toolbar"` container.
	 * Only needed when multiple toolbars appear on the same page so screen readers can distinguish them.
	 * @example `<rr-toolbar label="Formatting">`
	 */
	@property({ type: String, reflect: true })
	label = '';

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
	private _menu: RRMenu | null = null;
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
			const areaTags = new Set([
				'rr-toolbar-start-area',
				'rr-toolbar-center-area',
				'rr-toolbar-end-area',
				'rr-toolbar-overflow-area',
			]);
			const onlyInternalMoves = mutations.every(m => {
				// Attribute change on a consumer-relevant attribute — always rebuild
				if (m.type === 'attributes') return false;
				// childList change on the toolbar root — ignore if it's just internal slot moves
				if (m.target !== this) return false;
				const nodes = [...Array.from(m.addedNodes), ...Array.from(m.removedNodes)];
				return nodes.every(n => n instanceof Element && !areaTags.has(n.tagName.toLowerCase()));
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

	private _handleOverflowButtonClick(): void {
		if (!this._menu) return;
		if (this._menuOpen) {
			(this._menu as unknown as { hidePopover: () => void }).hidePopover();
		} else {
			(this._menu as unknown as { showPopover: () => void }).showPopover();
		}
	}

	private _createMenu(): void {
		if (this._menu) return;
		const menu = document.createElement('rr-menu') as RRMenu;
		menu.setAttribute('placement', 'bottom-end');
		menu.id = `rr-toolbar-overflow-menu-${this._idCounter++}`;
		menu.addEventListener('toggle', (event: Event) => {
			this._menuOpen = (event as ToggleEvent).newState === 'open';
		});
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuAnchor(): void {
		if (!this._menu) return;
		const overflowButton = this.shadowRoot?.querySelector('.toolbar__overflow-button rr-icon-button') as HTMLElement | null;
		if (overflowButton) {
			this._menu.anchorElement = overflowButton;
		}
	}

	/**
	 * Syncs overflow menu items by cloning the original `rr-menu-item` elements.
	 * Note: `cloneNode` does not copy event listeners added via `addEventListener`.
	 * The `select` event works correctly since it is dispatched by `rr-menu-item` internally.
	 * Consumers should avoid adding extra listeners directly on overflow `rr-menu-item` elements.
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
		Array.from(this.querySelectorAll('rr-toolbar-item')).forEach(item => {
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
			if (child.type === 'item' || child.type === 'title-group') {
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
		const overflowButtonEl = this.shadowRoot?.querySelector('.toolbar__overflow-button rr-icon-button') as HTMLElement | null;
		const overflowButtonWidth = (overflowButtonContainerEl && !overflowButtonContainerEl.classList.contains('is-hidden') && overflowButtonEl)
			? overflowButtonEl.getBoundingClientRect().width + hostGap
			: 0;

		this.style.setProperty('--rr-toolbar-overflow-button-width', `${overflowButtonWidth}px`);

		const startWidth = this._computeAreaWidth(this._startChildren, itemGap);
		const centerWidth = this._computeAreaWidth(this._centerChildren, itemGap);
		const endWidth = this._computeAreaWidth(this._endChildren, itemGap);

		this.style.setProperty('--rr-toolbar-start-width', `${startWidth}px`);
		this.style.setProperty('--rr-toolbar-center-width', `${centerWidth}px`);
		this.style.setProperty('--rr-toolbar-end-width', `${endWidth}px`);

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
		this.style.setProperty('--rr-toolbar-width', `${hostWidth}px`);
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

	private _buildChildrenForArea(areaTag: string): ToolbarChild[] {
		const areaEl = this.querySelector(areaTag);
		if (!areaEl) return [];

		return Array.from(areaEl.children).map(el => {
			const tag = el.tagName.toLowerCase();

			if (tag === 'rr-toolbar-title-group') {
				const id = this._getId(el);
				if (el.parentElement !== this) this.appendChild(el);
				el.setAttribute('slot', `child-${id}`);
				return {
					type: 'title-group',
					title: el.getAttribute('text') ?? '',
					subtitle: el.getAttribute('subtext') ?? '',
					align: el.getAttribute('align') ?? 'left',
					minWidth: el.getAttribute('min-width') ?? '200px',
					id,
				} as ToolbarChild;
			}

			if (tag === 'rr-toolbar-item') {
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

				if (el.parentElement !== this) this.appendChild(el);
				el.setAttribute('slot', `child-${id}`);

				const overflowItems = Array.from(el.children).filter(child => {
					const childTag = child.tagName.toLowerCase();
					return childTag === 'rr-menu-item' || childTag === 'rr-menu-divider';
				});
				overflowItems.forEach(child => child.setAttribute('slot', 'overflow'));

				return { type: 'item', element: el, label, id, priority, overflowItems, minWidth, width, isFluid } as ToolbarChild;
			}

			const id = this._getId(el);
			if (el.parentElement !== this) this.appendChild(el);
			el.setAttribute('slot', `child-${id}`);
			return { type: 'other', element: el, id } as ToolbarChild;
		});
	}

	private _buildPinnedOverflowItems(): void {
		const areaEl = this.querySelector('rr-toolbar-overflow-area');
		if (!areaEl) {
			this._pinnedOverflowItems = [];
			return;
		}
		this._pinnedOverflowItems = Array.from(areaEl.children).filter(el => {
			const tag = el.tagName.toLowerCase();
			return tag === 'rr-menu-item' || tag === 'rr-menu-divider';
		});
	}

	private _buildChildren(): void {
		if (this._isBuilding) return;
		this._isBuilding = true;

		this._observer?.disconnect();

		this._startChildren = this._buildChildrenForArea('rr-toolbar-start-area');
		this._centerChildren = this._buildChildrenForArea('rr-toolbar-center-area');
		this._endChildren = this._buildChildrenForArea('rr-toolbar-end-area');
		this._buildPinnedOverflowItems();
		this._prioritizedItemsCache = null;

		const areas = [
			this.querySelector('rr-toolbar-start-area'),
			this.querySelector('rr-toolbar-center-area'),
			this.querySelector('rr-toolbar-end-area'),
			this.querySelector('rr-toolbar-overflow-area'),
		].filter(Boolean) as Element[];

		const itemAttributeFilter = ['label', 'priority', 'min-width', 'width', 'text', 'disabled', 'selected', 'type'];
		this._observer?.observe(this, { childList: true, attributes: true, subtree: true, attributeFilter: itemAttributeFilter });
		areas.forEach(area => {
			this._observer?.observe(area, { childList: true, attributes: true, subtree: true, attributeFilter: itemAttributeFilter });
		});

		this._isBuilding = false;
	}

	override render() {
		const allChildren = [...this._startChildren, ...this._centerChildren, ...this._endChildren];
		const visibleNonDivider = allChildren.filter(c =>
			!this._overflowIds.has(c.id)
		);
		const isSoloFluid = visibleNonDivider.length === 1 && (
			visibleNonDivider[0].type === 'title-group' ||
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
			() => this._handleOverflowButtonClick(),
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-toolbar': RRToolbar;
		'rr-toolbar-start-area': HTMLElement;
		'rr-toolbar-center-area': HTMLElement;
		'rr-toolbar-end-area': HTMLElement;
		'rr-toolbar-overflow-area': HTMLElement;
		'rr-toolbar-item': HTMLElement;
		'rr-toolbar-title-group': HTMLElement;
	}
}

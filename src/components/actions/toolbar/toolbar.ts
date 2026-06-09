/**
 * Nederlandse Digitale Dienst Toolbar Component (Lit + TypeScript)
 *
 * @element nldd-toolbar
 * @attr {string} size - Toolbar size, propagated to all child controls: 'sm' | 'md' | 'lg' (default: 'md'). At 'lg' the overflow button (and lg-capable children like nldd-icon-button) stack their label below the icon.
 * @attr {boolean} show-item-labels - When true, shows a text label below each toolbar item and the overflow button
 * @attr {string} label - Accessible label for the toolbar. Only needed when multiple toolbars appear on the same page
 *
 * @slot start    - nldd-toolbar-item and nldd-toolbar-title elements placed at the start
 * @slot center   - nldd-toolbar-item and nldd-toolbar-title elements placed at the center
 * @slot end      - nldd-toolbar-item and nldd-toolbar-title elements placed at the end
 * @slot overflow - nldd-menu-item, nldd-menu-divider and nldd-menu-group elements always shown in the overflow menu
 *
 * ---
 *
 * @element nldd-toolbar-item
 * @attr {string} width - Fluid width: a percentage (e.g. '40%') or any CSS length (e.g. '240px'). Setting it (or min-width or max-width) makes the item fluid so it grows to fill the available space.
 * @attr {string} min-width - Minimum (fluid) width as a CSS length (e.g. '240px'). Setting it also makes the item fluid.
 * @attr {string} max-width - Maximum (fluid) width as a CSS length (e.g. '480px'). Setting it also makes the item fluid.
 * @attr {string} label - Text label shown below the item when the toolbar has show-item-labels.
 * @attr {number} priority - Overflow order: items with a lower priority move into the overflow menu first (default 0). Items sharing a priority overflow together, regardless of position.
 * @attr {boolean} fluid - Set by nldd-toolbar, not a consumer attribute: marks an item that grows or shrinks to fill space. Toggled synchronously during measurement, so it can appear or disappear between layout frames — do not style against it. It is not reflected as a JS property — read it with hasAttribute('fluid').
 * @attr {boolean} solo-fluid - Set by nldd-toolbar, not a consumer attribute: the sole fluid item, allowed to shrink below its content. Same synchronous-toggle and property-read caveats as fluid.
 * @attr {boolean} hidden - Set by nldd-toolbar, not a consumer attribute, when the item moves into the overflow menu. Same synchronous-toggle caveat.
 *
 * @slot - The control shown in the toolbar (e.g. nldd-icon-button)
 * @slot overflow - nldd-menu-item / nldd-menu-divider / nldd-menu-group children, shown in the overflow menu when this item overflows
 *
 * ---
 *
 * @element nldd-toolbar-title
 * @attr {string} text - Title text.
 * @attr {string} supporting-text - Secondary supporting text shown below the title.
 * @attr {string} align - Text alignment: 'left' | 'center' (default: 'left').
 * @attr {string} width - Preferred (fluid) width as a CSS length or percentage; the title grows toward it and shrinks to min-width.
 * @attr {string} min-width - Minimum width as a CSS length (e.g. '200px', default '200px').
 * @attr {string} max-width - Maximum width as a CSS length (e.g. '480px').
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { toolbarStyles, toolbarItemStyles, toolbarTitleStyles } from './toolbar.styles.js';
import { template, toolbarItemTemplate, toolbarTitleTemplate, type ToolbarChild } from './toolbar.template.js';
import { nlddToolbarTranslations } from './toolbar.i18n.js';
import type { NLDDToolbarTranslations } from './toolbar.i18n.js';
import { NLDDMenu } from '../../actions/menu/menu.js';

// # Types
type Size = 'sm' | 'md' | 'lg';
type TitleAlign = 'left' | 'center';

// # nldd-toolbar-item

@customElement('nldd-toolbar-item')
export class NLDDToolbarItem extends LitElement {
	static override styles = toolbarItemStyles;

	@property({ type: String })
	width = '';

	@property({ type: String, attribute: 'min-width' })
	minWidth = '';

	@property({ type: String, attribute: 'max-width' })
	maxWidth = '';

	@property({ type: String })
	label = '';

	@property({ type: Number })
	priority = 0;

	/** Set by nldd-toolbar; not part of the public API. @internal */
	@property({ type: String, reflect: true })
	size: Size = 'md';

	/** Set by nldd-toolbar; not part of the public API. @internal */
	@property({ type: Boolean, reflect: true, attribute: 'show-item-labels' })
	showItemLabels = false;

	// Layout state — `fluid`, `solo-fluid` and `hidden` — is owned by
	// nldd-toolbar and toggled directly as attributes during measurement
	// (synchronous, so the host box reflows immediately). They are not
	// reactive properties: Lit would reflect them asynchronously, which would
	// desync the attribute from the synchronous getBoundingClientRect reads.

	override render() {
		return toolbarItemTemplate(this);
	}
}


// # nldd-toolbar-title

@customElement('nldd-toolbar-title')
export class NLDDToolbarTitle extends LitElement {
	static override styles = toolbarTitleStyles;

	@property({ type: String })
	text = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	@property({ type: String, reflect: true })
	align: TitleAlign = 'left';

	@property({ type: String })
	width = '';

	@property({ type: String, attribute: 'min-width' })
	minWidth = '';

	@property({ type: String, attribute: 'max-width' })
	maxWidth = '';

	/** Set by nldd-toolbar; not part of the public API. @internal */
	@property({ type: String, reflect: true })
	size: Size = 'md';

	// Layout state — `solo-fluid` and `hidden` — is owned by nldd-toolbar and
	// toggled directly as attributes during measurement (synchronous). Not a
	// reactive property for the same reflection-timing reason as the item.

	// willUpdate (not updated) so the size CSS variables are written before the
	// toolbar measures the title with getBoundingClientRect() on the same frame.
	override willUpdate(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('minWidth')) this._reflectSizeVar('--_title-group-min-width', this.minWidth);
		if (changedProperties.has('width')) this._reflectSizeVar('--_title-width', this.width);
		if (changedProperties.has('maxWidth')) this._reflectSizeVar('--_title-max-width', this.maxWidth);
	}

	private _reflectSizeVar(prop: string, value: string): void {
		if (value) {
			this.style.setProperty(prop, value);
		} else {
			this.style.removeProperty(prop);
		}
	}

	override render() {
		return toolbarTitleTemplate(this);
	}
}


// # Component

@customElement('nldd-toolbar')
export class NLDDToolbar extends LitElement {
	static override styles = toolbarStyles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'show-item-labels' })
	showItemLabels = false;

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
		this._syncHosts();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('size') || changedProperties.has('showItemLabels')) {
			this._syncHosts();
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
				clone.removeAttribute('slot');
				this._menu!.appendChild(clone);
			});
		}
	}

	/**
	 * Syncs declarative state onto the slotted item and title hosts: size,
	 * show-item-labels, the base fluid flag and the fluid width custom
	 * properties. The parent owns layout decisions; each host owns its own box
	 * and rendering. Attributes are set directly (not via reactive properties)
	 * so the host box reflows synchronously before the next measurement.
	 */
	private _syncHosts(): void {
		this._allHostChildren().forEach(child => {
			if (child.type === 'item') {
				const host = child.element as NLDDToolbarItem;
				host.setAttribute('size', this.size);
				host.toggleAttribute('show-item-labels', this.showItemLabels);
				host.toggleAttribute('fluid', child.isFluid);
				if (child.isFluid && child.minWidth) {
					host.style.setProperty('--_item-min-width', child.minWidth);
				} else {
					host.style.removeProperty('--_item-min-width');
				}
				if (child.isFluid && child.width) {
					host.style.setProperty('--_item-width', child.width);
				} else {
					host.style.removeProperty('--_item-width');
				}
				if (child.isFluid && child.maxWidth) {
					host.style.setProperty('--_item-max-width', child.maxWidth);
				} else {
					host.style.removeProperty('--_item-max-width');
				}
				// Forward size to the inner control(s).
				Array.from(host.children).forEach(inner => {
					if (inner.getAttribute('slot') !== 'overflow') {
						inner.setAttribute('size', this.size);
					}
				});
			} else if (child.type === 'title') {
				const host = child.element as NLDDToolbarTitle;
				host.setAttribute('size', this.size);
			}
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

	private _allHostChildren(): ToolbarChild[] {
		return [...this._startChildren, ...this._centerChildren, ...this._endChildren];
	}

	private _hostFor(id: number): HTMLElement | null {
		const child = this._allHostChildren().find(c => c.id === id);
		return (child && (child.type === 'item' || child.type === 'title'))
			? (child.element as HTMLElement)
			: null;
	}

	private _measureItemWidths(): void {
		this._allHostChildren().forEach(child => {
			if (child.type === 'item' || child.type === 'title') {
				const host = child.element as HTMLElement;
				this._itemWidths.set(child.id, host.getBoundingClientRect().width);
			}
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
		const allChildren = this._allHostChildren();
		const itemChildren = allChildren.filter(
			(c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item'
		);
		const titleChildren = allChildren.filter(
			(c): c is Extract<ToolbarChild, { type: 'title' }> => c.type === 'title'
		);

		// Show all items, reset solo-fluid to fluid with min-width restored.
		itemChildren.forEach(child => {
			const host = child.element as HTMLElement;
			host.hidden = false;
			if (host.hasAttribute('solo-fluid')) {
				host.removeAttribute('solo-fluid');
				host.toggleAttribute('fluid', child.isFluid);
				if (child.isFluid && child.minWidth) {
					host.style.setProperty('--_item-min-width', child.minWidth);
				}
			}
		});
		titleChildren.forEach(child => {
			const host = child.element as HTMLElement;
			if (host.hasAttribute('solo-fluid')) {
				host.removeAttribute('solo-fluid');
				host.style.removeProperty('min-width');
			}
		});

		if (this._pinnedOverflowItems.length > 0) {
			overflowButtonEl?.classList.remove('is-hidden');
		} else {
			overflowButtonEl?.classList.add('is-hidden');
		}
		void itemsEl.offsetWidth;

		const centerOnly = this._startChildren.length === 0
			&& this._endChildren.length === 0
			&& this._centerChildren.length > 0;

		const isOverflowing = () => itemsEl.scrollWidth > itemsEl.clientWidth + 1;

		if (!isOverflowing()) {
			if (this._overflowIds.size > 0) {
				this._overflowIds = new Set();
			}
			this._promoteSoloFluid(itemsEl, itemChildren, titleChildren, centerOnly);
			this._measureItemWidths();
			this._updateAreaVars();
			return;
		}

		overflowButtonEl?.classList.remove('is-hidden');
		void itemsEl.offsetWidth;

		const prioritized = this._getPrioritizedItems();
		const newOverflowIds = new Set<number>();

		const priorityGroups = groupForOverflow(prioritized);

		for (const group of priorityGroups) {
			if (!isOverflowing()) break;

			// Fluid-guard (per group): never hide the last fluid fallback. If
			// hiding this group would leave no non-fluid item visible, stop and
			// let a remaining fluid item shrink (solo-fluid) instead.
			if (group.some(c => c.isFluid)) {
				const groupIds = new Set(group.map(c => c.id));
				const nonFluidVisibleOutside = itemChildren.filter(c => {
					const host = c.element as HTMLElement;
					return !host.hidden && !host.hasAttribute('fluid') && !host.hasAttribute('solo-fluid') && !groupIds.has(c.id);
				});
				if (nonFluidVisibleOutside.length === 0) break;
			}

			for (const child of group) {
				newOverflowIds.add(child.id);
				(child.element as HTMLElement).hidden = true;
			}
			void itemsEl.offsetWidth;
		}

		if (newOverflowIds.size === 0 && this._pinnedOverflowItems.length === 0) {
			overflowButtonEl?.classList.add('is-hidden');
		}

		this._promoteSoloFluid(itemsEl, itemChildren, titleChildren, centerOnly);

		const changed =
			newOverflowIds.size !== this._overflowIds.size ||
			[...newOverflowIds].some(id => !this._overflowIds.has(id));

		if (changed) {
			this._overflowIds = newOverflowIds;
		}

		this._measureItemWidths();
		this._updateAreaVars();
	}

	/**
	 * Promotes a lone remaining fluid item — or a lone title when no items are
	 * visible — to the solo-fluid state so it grows to fill the row. In
	 * center-only mode the center-fill wrapper already grows the items, so item
	 * promotion is skipped there (matching the previous template behaviour).
	 */
	private _promoteSoloFluid(
		itemsEl: HTMLElement,
		itemChildren: Extract<ToolbarChild, { type: 'item' }>[],
		titleChildren: Extract<ToolbarChild, { type: 'title' }>[],
		centerOnly: boolean,
	): void {
		const remainingVisible = itemChildren.filter(c => !(c.element as HTMLElement).hidden);
		if (!centerOnly && remainingVisible.length === 1 && (remainingVisible[0].element as HTMLElement).hasAttribute('fluid')) {
			const host = remainingVisible[0].element as HTMLElement;
			host.removeAttribute('fluid');
			host.setAttribute('solo-fluid', '');
			host.style.removeProperty('--_item-min-width');
			void itemsEl.offsetWidth;
		}

		const remainingTitles = titleChildren.filter(c => !(c.element as HTMLElement).hidden);
		if (remainingVisible.length === 0 && remainingTitles.length === 1) {
			const host = remainingTitles[0].element as HTMLElement;
			host.setAttribute('solo-fluid', '');
			host.style.setProperty('min-width', '0px');
			void itemsEl.offsetWidth;
		}
	}

	private _buildChildrenForSlot(slotName: string): ToolbarChild[] {
		return Array.from(this.children)
			.filter(el => el.getAttribute('slot') === slotName)
			.map(el => {
				const tag = el.tagName.toLowerCase();

				if (tag === 'nldd-toolbar-title') {
					const id = this._getId(el);
					return {
						type: 'title',
						element: el,
						minWidth: el.getAttribute('min-width') ?? '200px',
						id,
					} as ToolbarChild;
				}

				if (tag === 'nldd-toolbar-item') {
					const id = this._getId(el);
					const label = el.getAttribute('label') ?? '';
					const priority = parseInt(el.getAttribute('priority') ?? '0', 10);
					const hasPriority = el.hasAttribute('priority');
					const minWidth = el.getAttribute('min-width') ?? '';
					const maxWidth = el.getAttribute('max-width') ?? '';
					const width = el.getAttribute('width') ?? '';
					const isFluid = !!(minWidth || maxWidth || width);

					const overflowItems = Array.from(el.children).filter(child => {
						const childTag = child.tagName.toLowerCase();
						return childTag === 'nldd-menu-item' || childTag === 'nldd-menu-divider' || childTag === 'nldd-menu-group';
					});
					overflowItems.forEach(child => child.setAttribute('slot', 'overflow'));

					return { type: 'item', element: el, label, id, priority, hasPriority, overflowItems, minWidth, maxWidth, width, isFluid } as ToolbarChild;
				}

				const id = this._getId(el);
				return { type: 'other', element: el, id } as ToolbarChild;
			});
	}

	private _buildPinnedOverflowItems(): void {
		this._pinnedOverflowItems = Array.from(this.children).filter(el => {
			const tag = el.tagName.toLowerCase();
			return el.getAttribute('slot') === 'overflow' &&
				(tag === 'nldd-menu-item' || tag === 'nldd-menu-divider' || tag === 'nldd-menu-group');
		});
	}

	private _buildChildren(): void {
		if (this._isBuilding) return;
		this._isBuilding = true;

		this._observer?.disconnect();

		this._startChildren = this._buildChildrenForSlot('start');
		this._centerChildren = this._buildChildrenForSlot('center');
		this._endChildren = this._buildChildrenForSlot('end');
		this._buildPinnedOverflowItems();
		this._prioritizedItemsCache = null;
		this._syncHosts();

		const itemAttributeFilter = ['label', 'priority', 'min-width', 'max-width', 'width', 'text', 'disabled', 'selected', 'type'];
		this._observer?.observe(this, { childList: true, attributes: true, subtree: true, attributeFilter: itemAttributeFilter });

		this._isBuilding = false;
	}

	override render() {
		const allChildren = this._allHostChildren();
		const visibleNonDivider = allChildren.filter(c =>
			!this._overflowIds.has(c.id)
		);
		const isSoloFluid = visibleNonDivider.length === 1 && (
			visibleNonDivider[0].type === 'title' ||
			(visibleNonDivider[0].type === 'item' && visibleNonDivider[0].isFluid)
		);

		return template(
			this,
			this._centerChildren.length > 0,
			this._leftSpacerZero,
			this._rightSpacerZero,
			isSoloFluid,
			this._pinnedOverflowItems.length > 0 || this._overflowIds.size > 0,
			this._menuOpen,
			this.label,
			this._startChildren.length === 0 && this._endChildren.length === 0 && this._centerChildren.length > 0,
			(key) => this._t(key),
		);
	}
}

// # Helpers

/** A toolbar child narrowed to an item; the overflow grouping operates on these. */
type OverflowItem = Extract<ToolbarChild, { type: 'item' }>;
/** Items bucketed into overflow groups (each inner array overflows together). */
type OverflowGroups = OverflowItem[][];

/**
 * Groups prioritized items for overflow. Items with an explicit priority that
 * share a value form one group and overflow together regardless of their
 * position; items without a priority attribute each form their own group
 * (they overflow individually).
 *
 * @internal Exported for unit tests only; not part of the public API.
 */
export function groupForOverflow(
	items: OverflowItem[],
): OverflowGroups {
	const groups: OverflowGroups = [];
	const byPriority = new Map<number, OverflowItem[]>();
	for (const child of items) {
		if (!child.hasPriority) {
			groups.push([child]);
			continue;
		}
		const existing = byPriority.get(child.priority);
		if (existing) {
			existing.push(child);
			continue;
		}
		const group: OverflowItem[] = [child];
		byPriority.set(child.priority, group);
		groups.push(group);
	}
	return groups;
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-toolbar': NLDDToolbar;
		'nldd-toolbar-item': NLDDToolbarItem;
		'nldd-toolbar-title': NLDDToolbarTitle;
	}
}

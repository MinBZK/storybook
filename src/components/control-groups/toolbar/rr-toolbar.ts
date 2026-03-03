import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-toolbar.styles.js';
import { template, type ToolbarChild } from './rr-toolbar.template.js';
import type { RRMenu } from '../../lists-and-menus/menu/rr-menu.js';
import '../../lists-and-menus/menu/rr-menu.js';

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

if (!customElements.get('rr-toolbar-item')) {
	customElements.define('rr-toolbar-item', class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' }).innerHTML = '<slot></slot>';
		}
	});
}

if (!customElements.get('rr-toolbar-divider')) {
	customElements.define('rr-toolbar-divider', class extends HTMLElement {});
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

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: Boolean, reflect: true, attribute: 'show-labels' })
	showLabels = false;

	@state()
	private _startChildren: ToolbarChild[] = [];

	@state()
	private _centerChildren: ToolbarChild[] = [];

	@state()
	private _endChildren: ToolbarChild[] = [];

	@state()
	private _overflowIds: Set<number> = new Set();

	@state()
	private _leftSpacerWidth = 0;

	@state()
	private _rightSpacerWidth = 0;

	private _childIds = new WeakMap<Element, number>();
	private _idCounter = 0;
	private _itemWidths = new Map<number, number>();
	private _observer: MutationObserver | null = null;
	private _resizeObserver: ResizeObserver | null = null;
	private _menu: RRMenu | null = null;

	private _getId(el: Element): number {
		if (!this._childIds.has(el)) {
			this._childIds.set(el, this._idCounter++);
		}
		return this._childIds.get(el)!;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._buildChildren());
		this._buildChildren();
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
			this._measureOverflow();
			this._measureSpacers();
		});
		this._resizeObserver.observe(this);

		this._propagateSize();
		requestAnimationFrame(() => {
			this._measureOverflow();
			this._measureSpacers();
		});
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
			this.updateComplete.then(() => {
				this._measureOverflow();
				this._measureSpacers();
			});
		}
		if (changedProperties.has('_overflowIds')) {
			this._syncMenuItems();
			this._syncMenuAnchor();
			this.updateComplete.then(() => this._measureSpacers());
		}
	}

	private _createMenu(): void {
		const menu = document.createElement('rr-menu') as RRMenu;
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuAnchor(): void {
		if (!this._menu) return;
		const moreButton = this.shadowRoot?.querySelector('.toolbar__more-button') as HTMLElement | null;
		if (moreButton) {
			this._menu.anchorElement = moreButton;
		}
	}

	private _syncMenuItems(): void {
		if (!this._menu) return;

		this._menu.innerHTML = '';

		const orderedChildren = [
			...this._endChildren,
			...this._startChildren,
			...this._centerChildren,
		];

		orderedChildren.forEach(child => {
			if (child.type !== 'item') return;
			if (!this._overflowIds.has(child.id)) return;
			if (child.overflowItems.length === 0) return;

			child.overflowItems.forEach(el => {
				const clone = el.cloneNode(true) as Element;
				clone.removeAttribute('slot');
				clone.addEventListener('rr-select', () => {
					el.dispatchEvent(new CustomEvent('rr-select', {
						bubbles: true,
						composed: true,
					}));
				});
				this._menu!.appendChild(clone);
			});
		});
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

	private _measureItemWidths(): void {
		const measurableEls = Array.from(
			this.shadowRoot?.querySelectorAll('.toolbar__item, .toolbar__title-group') ?? []
		) as HTMLElement[];

		const wasHidden = new Set(
			measurableEls.filter(el => el.classList.contains('is-hidden'))
		);

		measurableEls.forEach(el => el.classList.remove('is-hidden'));

		void (this.shadowRoot?.querySelector('.toolbar') as HTMLElement | null)?.offsetWidth;

		measurableEls.forEach(el => {
			const id = Number(el.dataset.childId);
			this._itemWidths.set(id, el.getBoundingClientRect().width);
		});

		wasHidden.forEach(el => el.classList.add('is-hidden'));
	}

	private _measureSpacers(): void {
		const hasCenterChildren = this._centerChildren.length > 0;
		if (!hasCenterChildren) {
			this._leftSpacerWidth = 0;
			this._rightSpacerWidth = 0;
			return;
		}

		const toolbar = this.shadowRoot?.querySelector('.toolbar') as HTMLElement | null;
		if (!toolbar) return;

		const startAreaEl = this.shadowRoot?.querySelector('.toolbar__start-area') as HTMLElement | null;
		const centerAreaEl = this.shadowRoot?.querySelector('.toolbar__center-area') as HTMLElement | null;
		const endAreaEl = this.shadowRoot?.querySelector('.toolbar__end-area') as HTMLElement | null;
		const leftSpacerEl = this.shadowRoot?.querySelector('.toolbar__left-spacer') as HTMLElement | null;
		const rightSpacerEl = this.shadowRoot?.querySelector('.toolbar__right-spacer') as HTMLElement | null;

		if (!startAreaEl || !centerAreaEl || !endAreaEl || !leftSpacerEl || !rightSpacerEl) return;

		// Collapse spacers to zero so we measure natural area widths unaffected by previous spacer values
		leftSpacerEl.style.width = '0px';
		leftSpacerEl.style.minWidth = '0px';
		rightSpacerEl.style.width = '0px';
		rightSpacerEl.style.minWidth = '0px';

		// Force layout
		void toolbar.offsetWidth;

		const toolbarWidth = toolbar.getBoundingClientRect().width;
		const startWidth = startAreaEl.getBoundingClientRect().width;
		const centerWidth = centerAreaEl.getBoundingClientRect().width;
		const endWidth = endAreaEl.getBoundingClientRect().width;

		const itemGap = parseFloat(getComputedStyle(startAreaEl).gap ?? '0');

		const leftSpacer = (toolbarWidth / 2) - startWidth - (centerWidth / 2);
		const rightSpacer = (toolbarWidth / 2) - endWidth - (centerWidth / 2);

		const newLeft = Math.max(itemGap, leftSpacer);
		const newRight = Math.max(itemGap, rightSpacer);

		// Only update state if values actually changed to avoid render loop
		if (newLeft !== this._leftSpacerWidth || newRight !== this._rightSpacerWidth) {
			this._leftSpacerWidth = newLeft;
			this._rightSpacerWidth = newRight;
		} else {
			// Values unchanged — restore spacer styles directly to avoid flash
			leftSpacerEl.style.width = `${newLeft}px`;
			leftSpacerEl.style.minWidth = `${newLeft}px`;
			rightSpacerEl.style.width = `${newRight}px`;
			rightSpacerEl.style.minWidth = `${newRight}px`;
		}
	}

	private _measureOverflow(): void {
		this._measureItemWidths();

		const toolbar = this.shadowRoot?.querySelector('.toolbar') as HTMLElement | null;
		if (!toolbar) return;

		const sizerEl = this.shadowRoot?.querySelector('.toolbar__more-button-sizer') as HTMLElement | null;
		if (!sizerEl) return;

		const moreButtonWidth = sizerEl.getBoundingClientRect().width;
		const toolbarWidth = toolbar.getBoundingClientRect().width;

		if (this._itemWidths.size === 0) return;

		const anyArea = this.shadowRoot?.querySelector(
			'.toolbar__start-area, .toolbar__center-area, .toolbar__end-area'
		);
		const itemGap = parseFloat(getComputedStyle(anyArea as Element)?.gap ?? '0');

		// Include both items and title groups in width calculation
		const allMeasured = [
			...this._startChildren,
			...this._centerChildren,
			...this._endChildren,
		].filter((child): child is Extract<ToolbarChild, { type: 'item' } | { type: 'title-group' }> =>
			child.type === 'item' || child.type === 'title-group'
		);

		const totalNaturalWidth = allMeasured.reduce((sum, child) => {
			return sum + (this._itemWidths.get(child.id) ?? 0);
		}, 0);
		const totalItemGap = itemGap * Math.max(0, allMeasured.length - 1);

		const availableWithoutMore = toolbarWidth - totalItemGap;
		if (totalNaturalWidth <= availableWithoutMore) {
			if (this._overflowIds.size > 0) {
				this._overflowIds = new Set();
			}
			return;
		}

		const availableWithMore = toolbarWidth - moreButtonWidth - totalItemGap;

		// Only items can overflow, title groups are always visible
		const endItems = this._endChildren
			.filter((c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item');
		const startItems = this._startChildren
			.filter((c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item');
		const centerItems = this._centerChildren
			.filter((c): c is Extract<ToolbarChild, { type: 'item' }> => c.type === 'item');

		const orderedByPriority = [
			...endItems.map((item, index) => ({ item, areaOrder: 0, index })),
			...startItems.map((item, index) => ({ item, areaOrder: 1, index })),
			...centerItems.map((item, index) => ({ item, areaOrder: 2, index })),
		]
			.sort((a, b) => {
				if (a.item.priority !== b.item.priority) {
					return a.item.priority - b.item.priority;
				}
				if (a.areaOrder !== b.areaOrder) {
					return a.areaOrder - b.areaOrder;
				}
				return b.index - a.index;
			})
			.map(({ item }) => item);

		let usedWidth = totalNaturalWidth;
		const newOverflowIds = new Set<number>();

		for (const child of orderedByPriority) {
			if (usedWidth <= availableWithMore) break;
			usedWidth -= (this._itemWidths.get(child.id) ?? 0);
			newOverflowIds.add(child.id);
		}

		const changed =
			newOverflowIds.size !== this._overflowIds.size ||
			[...newOverflowIds].some(id => !this._overflowIds.has(id));

		if (changed) {
			this._overflowIds = newOverflowIds;
		}
	}

	private _buildChildrenForArea(areaTag: string): ToolbarChild[] {
		const areaEl = this.querySelector(areaTag);
		if (!areaEl) return [];

		return Array.from(areaEl.children).map(el => {
			const tag = el.tagName.toLowerCase();

			if (tag === 'rr-toolbar-divider') {
				return { type: 'divider', id: this._getId(el) } as ToolbarChild;
			}

			if (tag === 'rr-toolbar-title-group') {
				const id = this._getId(el);

				if (el.parentElement !== this) {
					this.appendChild(el);
				}
				el.setAttribute('slot', `child-${id}`);

				return {
					type: 'title-group',
					title: el.getAttribute('title') ?? '',
					subtitle: el.getAttribute('subtitle') ?? '',
					align: el.getAttribute('align') ?? 'left',
					id,
				} as ToolbarChild;
			}

			if (tag === 'rr-toolbar-item') {
				const id = this._getId(el);
				const label = el.getAttribute('label') ?? '';
				const priority = parseInt(el.getAttribute('priority') ?? '0', 10);

				Array.from(el.children).forEach(child => {
					if (child.getAttribute('slot') !== 'overflow') {
						child.setAttribute('size', this.size);
					}
				});

				if (el.parentElement !== this) {
					this.appendChild(el);
				}
				el.setAttribute('slot', `child-${id}`);

				const overflowItems = Array.from(el.children).filter(child => {
					const childTag = child.tagName.toLowerCase();
					const slot = child.getAttribute('slot');
					return slot === 'overflow' && (
						childTag === 'rr-menu-item' ||
						childTag === 'rr-menu-divider'
					);
				});

				return { type: 'item', element: el, label, id, priority, overflowItems } as ToolbarChild;
			}

			const id = this._getId(el);
			if (el.parentElement !== this) {
				this.appendChild(el);
			}
			el.setAttribute('slot', `child-${id}`);
			return { type: 'other', element: el, id } as ToolbarChild;
		});
	}

	private _buildChildren(): void {
		this._observer?.disconnect();

		this._startChildren = this._buildChildrenForArea('rr-toolbar-start-area');
		this._centerChildren = this._buildChildrenForArea('rr-toolbar-center-area');
		this._endChildren = this._buildChildrenForArea('rr-toolbar-end-area');

		// Toggle attribute so CSS can conditionally apply margin-left: auto to end area
		if (this._centerChildren.length > 0) {
			this.setAttribute('has-center', '');
		} else {
			this.removeAttribute('has-center');
		}

		const areas = [
			this.querySelector('rr-toolbar-start-area'),
			this.querySelector('rr-toolbar-center-area'),
			this.querySelector('rr-toolbar-end-area'),
		].filter(Boolean) as Element[];

		areas.forEach(area => {
			this._observer?.observe(area, { childList: true, attributes: true, subtree: true });
		});
	}

	override render() {
		return template(
			this._startChildren,
			this._centerChildren,
			this._endChildren,
			this._overflowIds,
			this.size,
			this._leftSpacerWidth,
			this._rightSpacerWidth,
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-toolbar': RRToolbar;
		'rr-toolbar-start-area': HTMLElement;
		'rr-toolbar-center-area': HTMLElement;
		'rr-toolbar-end-area': HTMLElement;
		'rr-toolbar-item': HTMLElement;
		'rr-toolbar-divider': HTMLElement;
		'rr-toolbar-title-group': HTMLElement;
	}
}

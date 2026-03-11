/**
 * RegelRecht Collection Component (Lit + TypeScript)
 *
 * Een container voor het weergeven van verzamelingen items.
 * Ondersteunt grid-, lijst- en horizontale scrolllay-outs.
 * Bij grid en list worden items gepagineerd getoond via een laad-meer-knop.
 * Met `lazy-load` worden de volgende items automatisch geladen wanneer
 * de laad-meer-knop in beeld komt.
 *
 * @element rr-collection
 *
 * @attr {string} layout - Lay-outmodus: 'grid' | 'list' | 'horizontal-scroll' (standaard: 'grid')
 * @attr {boolean} show-load-more - Toon laad-meer-knop bij grid/list (standaard: false)
 * @attr {string} load-more-label - Label voor de laad-meer-knop (standaard: 'Toon meer')
 * @attr {number} max-items - Aantal zichtbare items per pagina (standaard: 24)
 * @attr {boolean} lazy-load - Laad automatisch meer items wanneer de knop zichtbaar wordt
 *
 * @slot - Standaard slot voor collectie-items
 * @slot footer - Slot voor aangepaste voettekstinhoud
 *
 * @fires load-more - Wanneer de laad-meer-knop wordt aangeklikt
 */
import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { collectionStyles } from './rr-collection.styles.ts';
import { collectionTemplate } from './rr-collection.template.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/button-bar/rr-button-bar.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

type Layout = 'grid' | 'list' | 'horizontal-scroll';

@customElement('rr-collection')
export class RRCollection extends LitElement {
	static override styles = collectionStyles;

	@property({ type: String, reflect: true })
	layout: Layout = 'grid';

	@property({ type: Boolean, reflect: true, attribute: 'show-load-more' })
	showLoadMore = false;

	@property({ type: String, attribute: 'load-more-label' })
	loadMoreLabel = 'Toon meer';

	@property({ type: Number, attribute: 'max-items' })
	maxItems = 24;

	@property({ type: Boolean, reflect: true, attribute: 'lazy-load' })
	lazyLoad = false;

	@state()
	_visibleCount = 0;

	@state()
	_totalCount = 0;

	@state()
	_atStart = true;

	@state()
	_atEnd = false;

	@query('.collection__items')
	private _itemsEl!: HTMLElement;

	private _scrollListener = (): void => {
		const el = this._itemsEl;
		if (!el) return;
		this._atStart = el.scrollLeft < 1;
		this._atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
	};

	@query('rr-button.load-more')
	private _loadMoreBtn!: HTMLElement | null;

	private _intersectionObserver: IntersectionObserver | undefined;
	private _resizeObserver: ResizeObserver | undefined;
	private _scrollListenerAttached = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this._visibleCount = this.maxItems;
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._intersectionObserver?.disconnect();
		this._teardownScrollListeners();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('layout')) {
			this._setupScrollListeners();
		}

		if (this.lazyLoad && this._loadMoreBtn && !this._intersectionObserver) {
			this._intersectionObserver = new IntersectionObserver(
				([entry]) => { if (entry.isIntersecting) this._loadMore(); },
				{ threshold: 0.1 }
			);
			this._intersectionObserver.observe(this._loadMoreBtn);
		} else if (!this._loadMoreBtn) {
			this._intersectionObserver?.disconnect();
			this._intersectionObserver = undefined;
		}
	}

	private _setupScrollListeners(): void {
		this._teardownScrollListeners();

		if (this.layout === 'horizontal-scroll' && this._itemsEl) {
			this._itemsEl.addEventListener('scroll', this._scrollListener, { passive: true });
			this._resizeObserver = new ResizeObserver(() => this._scrollListener());
			this._resizeObserver.observe(this._itemsEl);
			this._scrollListenerAttached = true;
		}
	}

	private _teardownScrollListeners(): void {
		this._itemsEl?.removeEventListener('scroll', this._scrollListener);
		this._resizeObserver?.disconnect();
		this._resizeObserver = undefined;
		this._scrollListenerAttached = false;
	}

	_onSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		const items = slot.assignedElements() as HTMLElement[];
		this._totalCount = items.length;
		if (this.layout !== 'horizontal-scroll') {
			this._applyVisibility(items);
		}
	}

	private _applyVisibility(items?: HTMLElement[]): void {
		const slot = this._itemsEl?.querySelector('slot') as HTMLSlotElement | null;
		const elements = items ?? (slot?.assignedElements() as HTMLElement[] ?? []);
		elements.forEach((el, i) => {
			el.hidden = i >= this._visibleCount;
		});
	}

	_loadMore(): void {
		this._visibleCount = Math.min(this._visibleCount + this.maxItems, this._totalCount);
		this._applyVisibility();
		this.dispatchEvent(new CustomEvent('load-more', { bubbles: true, composed: true }));
	}

	get _hasMore(): boolean {
		return this._visibleCount < this._totalCount;
	}

	_scrollBy(direction: 1 | -1): void {
		const slot = this._itemsEl?.querySelector('slot') as HTMLSlotElement | null;
		const firstItem = slot?.assignedElements()[0] as HTMLElement | undefined;
		const itemWidth = firstItem?.offsetWidth ?? 280;
		this._itemsEl?.scrollBy({ left: direction * (itemWidth + 16), behavior: 'smooth' });
	}

	override render() {
		return collectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-collection': RRCollection;
	}
}

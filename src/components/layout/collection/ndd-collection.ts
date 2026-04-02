/**
 * Nederlandse Digitale Dienst Collection Component (Lit + TypeScript)
 *
 * A container for displaying collections of items.
 * Supports grid, list, and horizontal scroll layouts.
 * In grid and list modes, items are paginated via a load-more button.
 * With `lazy-load`, the next items are automatically loaded when
 * the load-more button comes into view.
 *
 * @element ndd-collection
 *
 * @attr {string} layout - Layout mode: 'grid' | 'list' | 'horizontal-scroll' (default: 'grid')
 * @attr {boolean} show-load-more - Show load-more button in grid/list (default: false)
 * @attr {number} max-items - Number of visible items per page (default: 24)
 * @attr {boolean} lazy-load - Automatically load more items when the button becomes visible
 * @attr {object} translations - Translation overrides; unset keys fall back to Dutch.
 *                               Available keys: 'components.collection.previous-action',
 *                               'components.collection.next-action', 'components.collection.load-more-action'
 *
 * @migration The `load-more-label` attribute has been removed.
 *            Use `translations` property instead: `.translations=${{ 'components.collection.load-more-action': 'Show more' }}`
 *
 * @slot - Default slot for collection items
 * @slot footer - Slot for custom footer content
 *
 * @fires load-more - When the load-more button is clicked
 */
import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { collectionStyles } from './ndd-collection.styles.ts';
import { collectionTemplate } from './ndd-collection.template.ts';
import { nddCollectionTranslations } from './ndd-collection.i18n.ts';
import type { NDDCollectionTranslations } from './ndd-collection.i18n.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/button-bar/ndd-button-bar.ts';
import '../../actions/icon-button/ndd-icon-button.ts';
import '../../content/icon/ndd-icon.ts';

type Layout = 'grid' | 'list' | 'horizontal-scroll';

@customElement('ndd-collection')
export class NDDCollection extends LitElement {
	static override styles = collectionStyles;

	@property({ type: String, reflect: true })
	layout: Layout = 'grid';

	@property({ type: Boolean, reflect: true, attribute: 'show-load-more' })
	showLoadMore = false;

	@property({ type: Number, attribute: 'max-items' })
	maxItems = 24;

	@property({ type: Boolean, reflect: true, attribute: 'lazy-load' })
	lazyLoad = false;

	@property({ type: Object })
	translations: Partial<NDDCollectionTranslations> = {};

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NDDCollectionTranslations): string {
		return this.translations[key] ?? nddCollectionTranslations[key];
	}

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

	@query('ndd-button.load-more')
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
				([entry]) => {
					if (entry.isIntersecting) this._loadMore();
				},
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
		const elements = items ?? (slot?.assignedElements() as HTMLElement[]) ?? [];
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
		'ndd-collection': NDDCollection;
	}
}

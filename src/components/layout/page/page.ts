/**
 * Nederlandse Digitale Dienst Page Component (Lit + TypeScript)
 *
 * A page layout with optional sticky header and footer.
 * Without sticky-header, the host is the scroll container and the header
 * is in normal flow. With sticky-header, the header becomes absolute and
 * .page__scroll takes over scrolling. A ResizeObserver on the header
 * sets padding-top on the scroll wrapper (only when not scrolled).
 *
 * @element nldd-page
 *
 * @attr {boolean} sticky-header - Sticky header
 * @attr {boolean} sticky-footer - Sticky footer
 * @attr {'inherit'|'default'|'tinted'} background - Use a grey background instead of white
 *
 * @slot header - Header content
 * @slot - Main content (scrollable)
 * @slot footer - Footer content
 */
import { LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pageStyles } from './page.styles.js';
import { pageTemplate } from './page.template.js';

@customElement('nldd-page')
export class NLDDPage extends LitElement {
	static override styles = pageStyles;

	@property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
	stickyHeader = false;

	@property({ type: Boolean, reflect: true, attribute: 'sticky-footer' })
	stickyFooter = false;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'default' | 'tinted' = 'inherit';

	@state()
	_scrolled = false;

	private _scrollTarget: EventTarget | null = null;
	private _headerObserver: ResizeObserver | null = null;
	private _mainSlot: HTMLSlotElement | null = null;

	get scrollTarget(): HTMLElement {
		return (this.stickyHeader ? (this._scrollEl ?? this) : this);
	}

	private get _headerEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.page__header') ?? null;
	}

	private get _scrollEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.page__scroll') ?? null;
	}

	override connectedCallback() {
		super.connectedCallback();
		// Set container-type/name as inline style on the host element. Doing
		// this from a `:host` rule inside the shadow DOM works in Chromium
		// but Safari does not always recognise the host as a container for
		// slotted descendants — a known engine inconsistency. Inline on the
		// light-DOM host avoids it entirely.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-area';
		if (this.hasUpdated) {
			this._setupScrollListener();
			if (this.stickyHeader) this._setupHeaderObserver();
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._teardownScrollListener();
		this._teardownHeaderObserver();
		this._teardownMainSlotListener();
	}

	override firstUpdated() {
		this._setupScrollListener();
		if (this.stickyHeader) this._setupHeaderObserver();
		this._setupMainSlotListener();
	}

	override updated(changed: PropertyValues) {
		if (changed.has('stickyHeader')) {
			this._teardownScrollListener();
			this._setupScrollListener();

			if (this.stickyHeader) {
				this._setupHeaderObserver();
			} else {
				this._teardownHeaderObserver();
				if (this._scrollEl) this._scrollEl.style.paddingTop = '';
			}
		}
	}

	private _setupScrollListener() {
		const target = this.stickyHeader ? this._scrollEl : this;
		if (!target) return;
		target.addEventListener('scroll', this._onScroll);
		this._scrollTarget = target;
	}

	private _teardownScrollListener() {
		if (this._scrollTarget) {
			this._scrollTarget.removeEventListener('scroll', this._onScroll);
			this._scrollTarget = null;
		}
	}

	private _setupHeaderObserver() {
		this._teardownHeaderObserver();
		const header = this._headerEl;
		const scroll = this._scrollEl;
		if (!header || !scroll) return;

		this._headerObserver = new ResizeObserver(() => {
			if (scroll.scrollTop > 0) return;
			scroll.style.paddingTop = `${header.offsetHeight}px`;
		});
		this._headerObserver.observe(header);
	}

	private _teardownHeaderObserver() {
		if (this._headerObserver) {
			this._headerObserver.disconnect();
			this._headerObserver = null;
		}
	}

	private _onScroll = () => {
		const target = (this.stickyHeader ? this._scrollEl : this) as HTMLElement;
		this._scrolled = target.scrollTop > 0;
	};

	// Mark the last visible main-slot child with `is-last`, so section-style
	// components can grow to fill remaining vertical space without coupling
	// to specific tag types or relying on light-DOM `:last-child` (which
	// breaks when slot="footer" siblings are present). Same shape as
	// nldd-list's _updateItems().
	private _setupMainSlotListener() {
		this._teardownMainSlotListener();
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])') ?? null;
		this._mainSlot = slot;
		if (!slot) return;
		slot.addEventListener('slotchange', this._updateMainItems);
		this._updateMainItems();
	}

	private _teardownMainSlotListener() {
		if (this._mainSlot) {
			this._mainSlot.removeEventListener('slotchange', this._updateMainItems);
			this._mainSlot = null;
		}
	}

	private _updateMainItems = () => {
		const slot = this._mainSlot;
		if (!slot) return;
		const items = slot.assignedElements() as HTMLElement[];
		const visible = items.filter(el => !el.hasAttribute('hidden'));
		const last = visible[visible.length - 1];
		items.forEach(el => el.classList.toggle('is-last', el === last));
	};

	override render() {
		return pageTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-page': NLDDPage;
	}
}

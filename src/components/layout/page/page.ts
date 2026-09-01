/**
 * Nederlandse Digitale Dienst Page Component (Lit + TypeScript)
 *
 * A page layout with optional sticky header and footer.
 * Without sticky-header, the host is the scroll container and the header
 * is in normal flow. With sticky-header, the header becomes absolute and
 * .page__scroll takes over scrolling. A ResizeObserver on the header
 * sets padding-top on the scroll wrapper (only when not scrolled).
 *
 * In root-scroll mode (--context-scroll-mode: root, derived upstream by
 * nldd-app-view) the page stops owning a scroller: the document scrolls and the
 * sticky header/footer become position:sticky layers offset by
 * --context-layer-top/bottom. The mode is read on connect/resize and reflected
 * to [data-scroll] so the CSS can branch.
 *
 * The page passes those layers on to its own content, with its sticky header
 * and footer added: anything sticky inside (an nldd-sidebar-section, a sticky
 * table head) reads --context-layer-top / --context-layer-bottom and clears
 * every bar above and below it without being told a number. The heights are
 * measured, because a top title bar shrinks as you scroll past its anchor. While
 * the page owns the scroller, only its own bars count: the chrome above the page
 * sits outside that scroller and does not push sticky content down.
 *
 * @element nldd-page
 *
 * @attr {boolean} sticky-header - Sticky header
 * @attr {boolean} sticky-footer - Sticky footer
 * @attr {'inherit'|'base'|'tinted'} background - Use a gray background instead of white
 *
 * @slot header - Header content
 * @slot - Main content (scrollable)
 * @slot footer - Footer content
 */
import { LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { findScrollModeProvider } from '../../../utilities/scroll-mode-controller.js';
import type { ScrollMode, ScrollModeConsumer, ScrollModeProvider } from '../../../utilities/scroll-mode-controller.js';
import { pageStyles } from './page.styles.js';
import { pageTemplate } from './page.template.js';

@customElement('nldd-page')
export class NLDDPage extends LitElement implements ScrollModeConsumer {
	static override styles = pageStyles;

	@property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
	stickyHeader = false;

	@property({ type: Boolean, reflect: true, attribute: 'sticky-footer' })
	stickyFooter = false;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'base' | 'tinted' = 'inherit';

	@state()
	_scrolled = false;

	private _scrollMode: 'nested' | 'root' = 'nested';
	private _scrollTarget: EventTarget | null = null;
	private _scrollProvider: ScrollModeProvider | null = null;
	private _headerObserver: ResizeObserver | null = null;
	private _layerObserver: ResizeObserver | null = null;
	private _mainSlot: HTMLSlotElement | null = null;
	private _resizeRaf = 0;

	private get _isRoot(): boolean {
		return this._scrollMode === 'root';
	}

	get scrollTarget(): HTMLElement {
		if (this._isRoot) return (document.scrollingElement ?? document.documentElement) as HTMLElement;
		return this.stickyHeader ? (this._scrollEl ?? this) : this;
	}

	/**
	 * The target to attach scroll LISTENERS to for this page's scrolling. In root
	 * mode the document is the scroller and its scroll event fires on `window` —
	 * a listener on `document.scrollingElement` would never fire — so this differs
	 * from `scrollTarget` (which is for reading scrollTop). In nested mode the two
	 * are the same. Components that react to this page's scroll (e.g.
	 * nldd-top-title-bar's collapse-anchor) must listen here and measure position
	 * against the viewport.
	 * @internal
	 */
	get scrollEventTarget(): EventTarget {
		if (this._isRoot) return window;
		return this.stickyHeader ? (this._scrollEl ?? this) : this;
	}

	private get _headerEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.page__header') ?? null;
	}

	private get _scrollEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.page__scroll') ?? null;
	}

	private get _footerEl(): HTMLElement | null {
		return this.shadowRoot?.querySelector('.page__footer') ?? null;
	}

	override connectedCallback() {
		super.connectedCallback();
		// Set container-type/name as inline style on the host element. Doing
		// this from a `:host` rule inside the shadow DOM works in Chromium
		// but Safari does not always recognize the host as a container for
		// slotted descendants — a known engine inconsistency. Inline on the
		// light-DOM host avoids it entirely.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'layout-container';
		this._scrollProvider = findScrollModeProvider(this);
		if (this._scrollProvider) {
			// Push-driven inside an app-view: it pushes the authoritative mode on
			// register (and on every change), so the page never self-reads the var.
			// A stale getComputedStyle read while re-mounting on navigation
			// otherwise stuck the page in nested mode (clipped, footer not sticky
			// against the viewport) until a resize.
			this._scrollProvider.registerScrollConsumer(this);
			if (this.hasUpdated) this._configureScroll();
		} else {
			// Stand-alone (docs): the scroll mode flips at a media-query breakpoint,
			// so read the inherited var and re-read on resize.
			window.addEventListener('resize', this._onResize, { passive: true });
			if (this.hasUpdated) {
				this._readScrollMode();
				this._configureScroll();
			}
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('resize', this._onResize);
		this._scrollProvider?.unregisterScrollConsumer(this);
		this._scrollProvider = null;
		if (this._resizeRaf) cancelAnimationFrame(this._resizeRaf);
		this._teardownScrollListener();
		this._teardownHeaderObserver();
		this._teardownLayerObserver();
		this._teardownMainSlotListener();
	}

	override firstUpdated() {
		// With a provider the mode was already pushed on register (see
		// connectedCallback); only a stand-alone page self-reads the inherited var.
		if (!this._scrollProvider) this._readScrollMode();
		this._configureScroll();
		this._setupMainSlotListener();
	}

	override updated(changed: PropertyValues) {
		if (changed.has('stickyHeader')) this._configureScroll();
	}

	/**
	 * ScrollModeConsumer — nldd-app-view pushes the derived mode here; called with
	 * no argument (resize / no app-view) it re-reads the inherited var. @internal
	 */
	readScrollMode(mode?: ScrollMode): void {
		if (this._readScrollMode(mode)) this._configureScroll();
	}

	// Apply the scroll mode; returns true when it changed so callers can
	// reconfigure. With an explicit mode (app-view's push) it is applied directly
	// — race-free, unlike a getComputedStyle read mid-propagation. Otherwise the
	// inherited --context-scroll-mode is read (anything but 'root' means nested).
	private _readScrollMode(mode?: ScrollMode): boolean {
		const next: ScrollMode = mode
			?? (getComputedStyle(this).getPropertyValue('--context-scroll-mode').trim() === 'root' ? 'root' : 'nested');
		if (next === this._scrollMode) return false;
		this._scrollMode = next;
		this.dataset.scroll = next;
		return true;
	}

	private _onResize = () => {
		if (this._resizeRaf) return;
		this._resizeRaf = requestAnimationFrame(() => {
			this._resizeRaf = 0;
			if (this._readScrollMode()) this._configureScroll();
		});
	};

	// (Re)wire the scroll listener + header observer for the current mode.
	private _configureScroll() {
		this._teardownScrollListener();
		this._teardownHeaderObserver();
		if (this._scrollEl) this._scrollEl.style.paddingTop = '';
		this._setupScrollListener();
		// The absolute-header padding hack is nested-mode only; a root-mode
		// sticky header sits in flow and reserves its own space.
		if (this.stickyHeader && !this._isRoot) this._setupHeaderObserver();
		this._setupLayerObserver();
		this._onScroll();
	}

	/**
	 * Publishes the page's own sticky bars as layer heights, so sticky content
	 * inside the page knows how far to clear.
	 *
	 * Measured rather than assumed: a top title bar shrinks as you scroll past
	 * its anchor, and a consumer that had written the number down would be wrong
	 * from that moment on. A bar that is not sticky scrolls away and adds
	 * nothing, so it stays at zero.
	 */
	private _setupLayerObserver() {
		this._teardownLayerObserver();
		const header = this._headerEl;
		const footer = this._footerEl;
		if (!header || !footer) return;

		const publish = () => {
			this.style.setProperty(
				'--_header-height',
				`${this.stickyHeader ? header.offsetHeight : 0}px`,
			);
			this.style.setProperty(
				'--_footer-height',
				`${this.stickyFooter ? footer.offsetHeight : 0}px`,
			);
			// How tall the scroller actually is. Sticky content inside it caps its
			// height on what it can see, and while the page owns the scroller that
			// is not the viewport: the chrome around the page eats into it. In root
			// mode the document scrolls, so nothing is published and 100dvh stands.
			if (this._isRoot) this.style.removeProperty('--_scroll-height');
			else this.style.setProperty('--_scroll-height', `${this._scrollEl?.clientHeight ?? 0}px`);
		};
		publish();
		this._layerObserver = new ResizeObserver(publish);
		this._layerObserver.observe(header);
		this._layerObserver.observe(footer);
		if (this._scrollEl) this._layerObserver.observe(this._scrollEl);
	}

	private _teardownLayerObserver() {
		if (this._layerObserver) {
			this._layerObserver.disconnect();
			this._layerObserver = null;
		}
	}

	private _setupScrollListener() {
		// Root mode scrolls the document (listen on window); nested mode scrolls
		// the host, or .page__scroll with a sticky header. See scrollEventTarget.
		const target = this.scrollEventTarget;
		target.addEventListener('scroll', this._onScroll, { passive: true });
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
		this._scrolled = this._isRoot
			? window.scrollY > 0
			: (((this.stickyHeader ? this._scrollEl : this) as HTMLElement | null)?.scrollTop ?? 0) > 0;
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

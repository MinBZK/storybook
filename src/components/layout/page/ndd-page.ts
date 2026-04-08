/**
 * Nederlandse Digitale Dienst Page Component (Lit + TypeScript)
 *
 * A page layout with optional sticky header and footer.
 * Without sticky-header, the host itself is the scroll container.
 * With sticky-header, the header becomes absolute-positioned and a
 * scroll wrapper (.page__scroll) takes over scrolling. The initial
 * header height is measured once to set padding-top on the scroll wrapper.
 *
 * @element ndd-page
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
import { pageStyles } from './ndd-page.styles.ts';
import { pageTemplate } from './ndd-page.template.ts';

@customElement('ndd-page')
export class NDDPage extends LitElement {
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

	/** Only valid after firstUpdated — before that, falls back to the host. */
	get scrollTarget(): HTMLElement {
		if (!this.hasUpdated) return this;
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
		if (this.hasUpdated) {
			this._setupScrollListener();
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._teardownScrollListener();
	}

	override firstUpdated() {
		this._setupScrollListener();
		if (this.stickyHeader) {
			this._measureInitialHeaderHeight();
		}
	}

	override updated(changed: PropertyValues) {
		if (changed.has('stickyHeader')) {
			this._teardownScrollListener();
			this._setupScrollListener();

			if (this.stickyHeader) {
				this._measureInitialHeaderHeight();
			} else {
				this.style.removeProperty('--_initial-header-height');
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

	private _measureInitialHeaderHeight() {
		// Double rAF ensures slotted Lit components have rendered their shadow DOM
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const header = this._headerEl;
				if (!header) return;
				this.style.setProperty('--_initial-header-height', `${header.offsetHeight}px`);
			});
		});
	}

	private _onScroll = (e: Event) => {
		const target = e.target as HTMLElement;
		this._scrolled = target.scrollTop > 0;
	};

	override render() {
		return pageTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-page': NDDPage;
	}
}

/**
 * Nederlandse Digitale Dienst Top Title Bar Component (Lit + TypeScript)
 *
 * A toolbar for page and container headings with optional navigation and action buttons.
 *
 * The component has two states:
 * - Default: the back button shows the previous page title as a text button
 * - Compact (class `is-compact`): the back button is an icon button, a divider and the
 *   toolbar title are visible
 *
 * When `collapse-anchor` is set, the `is-compact` class is automatically applied
 * as soon as the top of the anchor element reaches the top of the scroll container.
 *
 * Without `collapse-anchor` the bar takes a static state: compact when `text`
 * is set (so the title shows in the title-group), non-compact otherwise (so
 * the `back-text` button stays visible).
 *
 * @slot toolbar - Optional buttons to the left of the dismiss button
 *
 * @fires back    - Fired when the back button is clicked (not fired when back-href is set)
 * @fires dismiss - Fired when the dismiss button is clicked
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { topTitleBarStyles } from './top-title-bar.styles.js';
import { topTitleBarTemplate } from './top-title-bar.template.js';
import type { NLDDPage } from '../../layout/page/page.js';

@customElement('nldd-top-title-bar')
export class NLDDTopTitleBar extends LitElement {
	static override styles = topTitleBarStyles;

	@property({ type: String })
	text = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	@property({ type: String, attribute: 'collapse-anchor' })
	collapseAnchor = '';

	@property({ type: String, attribute: 'back-text' })
	backText = '';

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'dismiss-text' })
	dismissText = '';

	@state()
	_hasToolbarItems = false;

	private _pageElement: Element | null = null;
	private _anchorElement: Element | null = null;
	private _activeScrollTarget: EventTarget | null = null;
	private _scrollTargetStyleObserver: MutationObserver | null = null;
	private _boundOnScroll = this._onScroll.bind(this);

	override connectedCallback(): void {
		super.connectedCallback();
		this._connectPage();
		this._connectAnchor();
		this._updateAutoCompact();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._teardownAnchor();
	}

	override updated(changed: Map<string, unknown>): void {
		if (changed.has('collapseAnchor')) {
			this._teardownAnchor();
			if (this.collapseAnchor) {
				this._connectAnchor();
			}
			this._updateAutoCompact();
		} else if (changed.has('text')) {
			this._updateAutoCompact();
		}
	}

	// Without a scroll anchor the bar can't toggle compact state on scroll,
	// so we settle on a static state. With a `text` value we auto-compact
	// (so the title shows in the title-group); without `text` we stay
	// non-compact so the `back-text` button is visible. With an anchor the
	// scroll listener owns the class — this method is a no-op.
	private _updateAutoCompact(): void {
		if (this.collapseAnchor) return;
		this.classList.toggle('is-compact', Boolean(this.text));
	}

	private _connectPage(): void {
		let el: Element | null = this;
		while (el) {
			if (el.tagName.toLowerCase() === 'nldd-page') {
				this._pageElement = el;
				return;
			}
			// Traverse up, piercing shadow DOM boundaries via getRootNode().host
			el = el.parentElement ?? (
				el.getRootNode() instanceof ShadowRoot
					? (el.getRootNode() as ShadowRoot).host
					: null
			);
		}
	}

	private _connectAnchor(): void {
		if (!this.collapseAnchor) return;

		const root = this.getRootNode() as Document | ShadowRoot;
		this._anchorElement = (root as Document).getElementById?.(this.collapseAnchor)
			?? root.querySelector(`#${this.collapseAnchor}`);

		if (!this._anchorElement) return;

		const page = this._pageElement as NLDDPage | null;
		this._activeScrollTarget = page ? page.scrollTarget : window;
		this._activeScrollTarget.addEventListener('scroll', this._boundOnScroll, { passive: true });

		// nldd-page sets padding-top on its scroll target asynchronously
		// (ResizeObserver on the header). If our initial _onScroll runs
		// before that, the anchor's measured position is wrong and we
		// flash into is-compact until the user scrolls. Observe inline-
		// style changes on the scroll target so we re-check the moment
		// padding-top lands.
		if (this._activeScrollTarget instanceof Element) {
			this._scrollTargetStyleObserver = new MutationObserver(() => this._onScroll());
			this._scrollTargetStyleObserver.observe(this._activeScrollTarget, {
				attributes: true,
				attributeFilter: ['style'],
			});
		}

		// Initial check after layout is complete
		this.updateComplete.then(() => this._onScroll());
	}

	private _teardownAnchor(): void {
		this._activeScrollTarget?.removeEventListener('scroll', this._boundOnScroll);
		this._activeScrollTarget = null;
		this._anchorElement = null;
		this._scrollTargetStyleObserver?.disconnect();
		this._scrollTargetStyleObserver = null;
	}

	private _onScroll(): void {
		if (!this._anchorElement || !this._pageElement) return;
		const pageTop = this._pageElement.getBoundingClientRect().top;
		const anchorTop = this._anchorElement.getBoundingClientRect().top;
		this.classList.toggle('is-compact', anchorTop <= pageTop);
	}

	_onToolbarSlotChange = (e: Event) => {
		const slot = e.target as HTMLSlotElement;
		this._hasToolbarItems = slot.assignedElements().length > 0;
	};

	_handleBack(): void {
		if (this.backHref) return;
		this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
	}

	_handleDismiss(): void {
		this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
	}

	override render() {
		return topTitleBarTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-top-title-bar': NLDDTopTitleBar;
	}
}

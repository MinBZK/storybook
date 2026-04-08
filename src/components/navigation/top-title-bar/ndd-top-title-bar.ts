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
 * @slot toolbar - Optional buttons to the left of the dismiss button
 *
 * @fires back    - Fired when the back button is clicked (not fired when back-href is set)
 * @fires dismiss - Fired when the dismiss button is clicked
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { topTitleBarStyles } from './ndd-top-title-bar.styles.ts';
import { topTitleBarTemplate } from './ndd-top-title-bar.template.ts';
import type { NDDPage } from '../../layout/page/ndd-page.ts';

@customElement('ndd-top-title-bar')
export class NDDTopTitleBar extends LitElement {
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
	private _boundOnScroll = this._onScroll.bind(this);

	override connectedCallback(): void {
		super.connectedCallback();
		this._connectPage();
		this._connectAnchor();
		// Without a collapse-anchor there is no scroll trigger — always compact
		if (!this.collapseAnchor) {
			this.classList.add('is-compact');
		}
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
			} else {
				this.classList.add('is-compact');
			}
		}
	}

	private _connectPage(): void {
		let el: Element | null = this;
		while (el) {
			if (el.tagName.toLowerCase() === 'ndd-page') {
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

		const scrollTarget = this._getScrollTarget();
		scrollTarget.addEventListener('scroll', this._boundOnScroll, { passive: true });

		// Initial check after layout is complete
		this.updateComplete.then(() => this._onScroll());
	}

	private _getScrollTarget(): EventTarget {
		const page = this._pageElement as NDDPage | null;
		return page?.scrollTarget ?? this._pageElement ?? window;
	}

	private _teardownAnchor(): void {
		const scrollTarget = this._getScrollTarget();
		scrollTarget.removeEventListener('scroll', this._boundOnScroll);
		this._anchorElement = null;
	}

	private _onScroll(): void {
		if (!this._anchorElement || !this._pageElement) return;
		const pageTop = this._pageElement.getBoundingClientRect().top;
		const anchorTop = this._anchorElement.getBoundingClientRect().top;
		this.classList.toggle('is-compact', anchorTop <= pageTop);
	}

	_onToolbarSlotChange(e: Event) {
		const slot = e.target as HTMLSlotElement;
		this._hasToolbarItems = slot.assignedElements().length > 0;
	}

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
		'ndd-top-title-bar': NDDTopTitleBar;
	}
}

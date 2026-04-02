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
 * When `title-anchor` is set, the `is-compact` class is automatically applied
 * as soon as the top of the anchor element reaches the top of the scroll container.
 *
 * @slot toolbar - Optional buttons to the left of the dismiss button
 *
 * @fires back    - Fired when the back button is clicked (not fired when back-href is set)
 * @fires dismiss - Fired when the dismiss button is clicked
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { topTitleBarStyles } from './ndd-top-title-bar.styles.ts';
import { topTitleBarTemplate } from './ndd-top-title-bar.template.ts';

@customElement('ndd-top-title-bar')
export class NDDTopTitleBar extends LitElement {
	static override styles = topTitleBarStyles;

	@property({ type: String })
	title = '';

	@property({ type: String })
	subtitle = '';

	@property({ type: String, attribute: 'title-anchor' })
	titleAnchor = '';

	@property({ type: String, attribute: 'back-text' })
	backText = '';

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'dismiss-text' })
	dismissText = '';

	private _pageElement: Element | null = null;
	private _anchorElement: Element | null = null;
	private _boundOnScroll = this._onScroll.bind(this);

	override connectedCallback(): void {
		super.connectedCallback();
		this._connectPage();
		this._connectAnchor();
		// Without a title-anchor there is no scroll trigger — always compact
		if (!this.titleAnchor) {
			this.classList.add('is-compact');
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._teardownAnchor();
	}

	override updated(changed: Map<string, unknown>): void {
		if (changed.has('titleAnchor')) {
			this._teardownAnchor();
			if (this.titleAnchor) {
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
		if (!this.titleAnchor) return;

		const root = this.getRootNode() as Document | ShadowRoot;
		this._anchorElement = (root as Document).getElementById?.(this.titleAnchor)
			?? root.querySelector(`#${this.titleAnchor}`);

		if (!this._anchorElement) return;

		const scrollTarget = this._pageElement ?? window;
		scrollTarget.addEventListener('scroll', this._boundOnScroll, { passive: true });

		// Initial check after layout is complete
		this.updateComplete.then(() => this._onScroll());
	}

	private _teardownAnchor(): void {
		const scrollTarget = this._pageElement ?? window;
		scrollTarget.removeEventListener('scroll', this._boundOnScroll);
		this._anchorElement = null;
	}

	private _onScroll(): void {
		if (!this._anchorElement || !this._pageElement) return;
		const pageTop = this._pageElement.getBoundingClientRect().top;
		const anchorTop = this._anchorElement.getBoundingClientRect().top;
		this.classList.toggle('is-compact', anchorTop <= pageTop);
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

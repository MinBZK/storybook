/**
 * RegelRecht Top Title Bar Component (Lit + TypeScript)
 *
 * Een werkbalk voor pagina- en containerkoppen met optionele navigatie- en actieknoppen.
 *
 * De component heeft twee standen:
 * - Standaard: de terugknop toont het label van de vorige pagina als tekstknop
 * - Compact (klasse `is-compact`): de terugknop is een icoonknop, een scheider en de
 *   werkbalktitel zijn zichtbaar
 *
 * Wanneer `title-anchor` is ingesteld wordt de `is-compact`-klasse automatisch toegepast
 * zodra de bovenkant van het ankerelement de bovenkant van de scrollcontainer bereikt.
 *
 * @slot toolbar - Optionele knoppen links van de sluitknop
 *
 * @fires back    - Wanneer de terugknop wordt geklikt (niet afgevuurd als back-href is ingesteld)
 * @fires dismiss - Wanneer de sluitknop wordt geklikt
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-top-title-bar.styles.ts';
import { template } from './rr-top-title-bar.template.ts';

@customElement('rr-top-title-bar')
export class RRTopTitleBar extends LitElement {
	static override styles = styles;

	@property({ type: String })
	title = '';

	@property({ type: String })
	subtitle = '';

	@property({ type: String, attribute: 'title-anchor' })
	titleAnchor = '';

	@property({ type: String, attribute: 'back-label' })
	backLabel = '';

	@property({ type: String, attribute: 'back-href' })
	backHref = '';

	@property({ type: String, attribute: 'dismiss-label' })
	dismissLabel = '';

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
		let el: Element | null = this.parentElement;
		while (el) {
			if (el.tagName.toLowerCase() === 'rr-page') {
				this._pageElement = el;
				return;
			}
			el = el.parentElement;
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

	_handleBack(e: MouseEvent): void {
		if (this.backHref) return;
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('back', { bubbles: true, composed: true }));
	}

	_handleDismiss(): void {
		this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-top-title-bar': RRTopTitleBar;
	}
}

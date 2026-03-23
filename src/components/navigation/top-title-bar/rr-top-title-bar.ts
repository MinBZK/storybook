/**
 * RegelRecht Top Title Bar Component (Lit + TypeScript)
 *
 * Een werkbalk voor pagina- en containerkoppen met optionele navigatie- en actieknoppen.
 * De component is standaard compact: de titel staat in de werkbalk.
 *
 * Wanneer `title-anchor` is ingesteld op het id van een titelelement in de pagina-inhoud,
 * schakelt de component automatisch: als het titelelement zichtbaar is in de viewport
 * verdwijnt de werkbalktitel; zodra het buiten beeld scrolt keert hij terug.
 *
 * De component detecteert automatisch of hij zich in een gestapelde navigatiecontext bevindt
 * door te zoeken naar een voorouder `rr-page` en het `stacked`-attribuut te observeren.
 *
 * @element rr-top-title-bar
 *
 * @attr {string}  title          - Titel weergegeven in de werkbalk
 * @attr {string}  subtitle       - Optionele subtitel in de werkbalk
 * @attr {string}  title-anchor   - ID van het titelelement in de pagina-inhoud; wanneer dat
 *                                  element zichtbaar is wordt de werkbalktitel verborgen
 * @attr {string}  back-label     - Label voor de terugknop (bijv. de naam van de vorige pagina);
 *                                  weglaten verbergt de terugknop tenzij de rr-page-voorouder
 *                                  het stacked-attribuut heeft
 * @attr {string}  back-href      - Wanneer ingesteld, rendert de terugknop als <a>-element;
 *                                  er wordt geen back-event afgevuurd
 * @attr {string}  dismiss-label  - Label voor de sluitknop (bijv. 'Sluit', 'Annuleer', 'Klaar');
 *                                  weglaten verbergt de sluitknop
 *
 * @slot toolbar - Optionele knoppen links van de sluitknop in het eindgebied van de werkbalk
 *
 * @fires back    - Wanneer de terugknop wordt geklikt (wordt niet afgevuurd als back-href is ingesteld)
 * @fires dismiss - Wanneer de sluitknop wordt geklikt
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

	// True when the anchored title element is not visible — toolbar title is shown
	@state()
	_titleHidden = true;

	@state()
	_isStacked = false;

	private _pageObserver: MutationObserver | null = null;
	private _intersectionObserver: IntersectionObserver | null = null;
	private _anchorElement: Element | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._connectPage();
		this._connectAnchor();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._pageObserver?.disconnect();
		this._pageObserver = null;
		this._intersectionObserver?.disconnect();
		this._intersectionObserver = null;
		this._anchorElement = null;
	}

	override updated(changed: Map<string, unknown>): void {
		if (changed.has('titleAnchor')) {
			this._intersectionObserver?.disconnect();
			this._intersectionObserver = null;
			this._anchorElement = null;
			this._titleHidden = true;
			this._connectAnchor();
		}
	}

	private _connectPage(): void {
		let el: Element | null = this.parentElement;
		while (el) {
			if (el.tagName.toLowerCase() === 'rr-page') {
				this._isStacked = el.hasAttribute('stacked');
				this._pageObserver = new MutationObserver(() => {
					this._isStacked = (el as Element).hasAttribute('stacked');
				});
				this._pageObserver.observe(el, { attributes: true, attributeFilter: ['stacked'] });
				return;
			}
			el = el.parentElement;
		}
	}

	private _connectAnchor(): void {
		if (!this.titleAnchor) return;

		// Walk up to find the scroll root (rr-page or document) to scope getElementById
		const root = this.getRootNode() as Document | ShadowRoot;
		this._anchorElement = (root as Document).getElementById?.(this.titleAnchor)
			?? root.querySelector(`#${this.titleAnchor}`);

		if (!this._anchorElement) return;

		this._intersectionObserver = new IntersectionObserver(
			(entries) => {
				// Title is visible → hide toolbar title; title out of view → show toolbar title
				this._titleHidden = !entries[0].isIntersecting;
			},
			{ threshold: 0.66 },
		);
		this._intersectionObserver.observe(this._anchorElement);
	}

	_handleBack(e: MouseEvent): void {
		// When backHref is set the <a> handles navigation natively; do not also fire the event
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

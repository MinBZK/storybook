/**
 * RegelRecht Page Component (Lit + TypeScript)
 *
 * Een pagina-layout met optioneel sticky header en footer.
 * Het scrollgebied is de host zelf. Sticky secties krijgen een doorschijnende
 * achtergrond met een vervagend verloop dat buiten de sectie uitsteekt.
 * De header toont het verloop pas na het scrollen, met een overgang.
 *
 * @element rr-page
 *
 * @attr {boolean} sticky-header - Sticky header
 * @attr {boolean} sticky-footer - Sticky footer
 * @attr {'inherit'|'default'|'tinted'} background - Gebruik een grijze achtergrond in plaats van wit
 *
 * @slot header - Inhoud van de header
 * @slot - Hoofdinhoud (scrollbaar)
 * @slot footer - Inhoud van de footer
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { pageStyles } from './rr-page.styles.ts';
import { pageTemplate } from './rr-page.template.ts';

@customElement('rr-page')
export class RRPage extends LitElement {
	static override styles = pageStyles;

	@property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
	stickyHeader = false;

	@property({ type: Boolean, reflect: true, attribute: 'sticky-footer' })
	stickyFooter = false;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'default' | 'tinted' = 'inherit';

	@state()
	_scrolled = false;

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('scroll', this._onScroll);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('scroll', this._onScroll);
	}

	private _onScroll = () => {
		this._scrolled = this.scrollTop > 0;
	};

	override render() {
		return pageTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-page': RRPage;
	}
}

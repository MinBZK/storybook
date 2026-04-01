/**
 * RegelRecht Page Component (Lit + TypeScript)
 *
 * A page layout with optional sticky header and footer.
 * The scroll area is the host itself. Sticky sections receive a translucent
 * background with a fading gradient that extends beyond the section.
 * The header only shows the gradient after scrolling, with a transition.
 *
 * @element rr-page
 *
 * @attr {boolean} sticky-header - Sticky header
 * @attr {boolean} sticky-footer - Sticky footer
 * @attr {'inherit'|'default'|'tinted'} background - Use a grey background instead of white
 *
 * @slot header - Header content
 * @slot - Main content (scrollable)
 * @slot footer - Footer content
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

/**
 * RegelRecht Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content that automatically applies responsive
 * typography. Uses no shadow DOM so styles apply to all nested elements.
 * Import rr-rich-text.css globally in your application.
 *
 * @element rr-rich-text
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('rr-rich-text')
export class RRRichText extends LitElement {
	override createRenderRoot() {
		return this;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-rich-text': RRRichText;
	}
}

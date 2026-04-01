/**
 * Nederlandse Digitale Dienst Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content that automatically applies responsive
 * typography. Uses no shadow DOM so styles apply to all nested elements.
 * Import ndd-rich-text.css globally in your application.
 *
 * @element ndd-rich-text
 *
 * @attr {string} spacing - Spacing between elements: 'flat' | 'tight' | 'snug' (default) | 'loose'
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Spacing = 'flat' | 'tight' | 'snug' | 'loose';

@customElement('ndd-rich-text')
export class NDDRichText extends LitElement {
	@property({ type: String, reflect: true })
	spacing: Spacing = 'snug';

	override createRenderRoot() {
		return this;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-rich-text': NDDRichText;
	}
}

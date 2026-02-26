/**
 * RegelRecht Rich Text Component (Lit + TypeScript)
 *
 * A container for rich text content that automatically applies responsive
 * typography. Uses no shadow DOM so styles apply to all nested elements.
 * Import rr-rich-text.css globally in your application.
 *
 * @element rr-rich-text
 *
 * @slot - Default slot for content (p, h1–h6, ul, ol, table, etc.)
 *
 * @csspart content - The content wrapper
 *
 * @cssprop --rr-rich-text-gap - Override gap between content elements
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { template } from './rr-rich-text.template.js';

@customElement('rr-rich-text')
export class RRRichText extends LitElement {
	override createRenderRoot() {
		return this;
	}

	override render() {
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-rich-text': RRRichText;
	}
}

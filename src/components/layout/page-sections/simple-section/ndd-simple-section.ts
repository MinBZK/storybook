/**
 * Nederlandse Digitale Dienst Simple Section Component (Lit + TypeScript)
 *
 * A basic section with responsive padding and gap based on container size.
 * Contains optional header and footer slots. The padding and spacing between
 * slots adjust automatically via container queries.
 *
 * @element ndd-simple-section
 *
 * @slot header - Content above the main content
 * @slot - Main content
 * @slot footer - Content below the main content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { simpleSectionStyles } from './ndd-simple-section.styles.ts';
import { simpleSectionTemplate } from './ndd-simple-section.template.ts';

@customElement('ndd-simple-section')
export class NDDSimpleSection extends LitElement {
	static override styles = simpleSectionStyles;

	@property({ type: String, reflect: true })
	align?: 'center';

	override render() {
		return simpleSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-simple-section': NDDSimpleSection;
	}
}

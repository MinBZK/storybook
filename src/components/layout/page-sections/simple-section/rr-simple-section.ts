/**
 * RegelRecht Simple Section Component (Lit + TypeScript)
 *
 * A basic section with responsive padding and gap based on container size.
 * Contains optional header and footer slots. The padding and spacing between
 * slots adjust automatically via container queries.
 *
 * @element rr-simple-section
 *
 * @slot header - Content above the main content
 * @slot - Main content
 * @slot footer - Content below the main content
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { simpleSectionStyles } from './rr-simple-section.styles.ts';
import { simpleSectionTemplate } from './rr-simple-section.template.ts';

@customElement('rr-simple-section')
export class RRSimpleSection extends LitElement {
	static override styles = simpleSectionStyles;

	override render() {
		return simpleSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-simple-section': RRSimpleSection;
	}
}

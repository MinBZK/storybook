/**
 * Nederlandse Digitale Dienst Simple Section Component (Lit + TypeScript)
 *
 * A basic section with responsive padding and gap based on container size.
 * Contains optional header and footer slots. The padding and spacing between
 * slots adjust automatically via container queries.
 *
 * @element nldd-simple-section
 *
 * @slot header - Content above the main content
 * @slot - Main content
 * @slot footer - Content below the main content
 *
 * @attr {string} [align] - Set to "center" to vertically center section content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { simpleSectionStyles } from './simple-section.styles.js';
import { simpleSectionTemplate } from './simple-section.template.js';

@customElement('nldd-simple-section')
export class NLDDSimpleSection extends LitElement {
	static override styles = simpleSectionStyles;

	@property({ type: String, reflect: true })
	align?: string;

	_onSlotChange(e: Event) {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	}

	override render() {
		return simpleSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-simple-section': NLDDSimpleSection;
	}
}

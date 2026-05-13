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
 * @attr {string} [width] - Body max-width: 'full' removes the constraint so the
 *                          section spans the full available width. Any CSS
 *                          length (e.g. '480px') overrides the default max-width.
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { simpleSectionStyles } from './simple-section.styles.js';
import { simpleSectionTemplate } from './simple-section.template.js';

@customElement('nldd-simple-section')
export class NLDDSimpleSection extends LitElement {
	static override styles = simpleSectionStyles;

	/** Width mode: 'full' (removes body max-width) or any CSS length. */
	@property({ type: String, reflect: true })
	width = '';

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			const w = this.width;
			// Sections constrain the body's max-width rather than the host's
			// outer width. The keyword 'full' is handled by CSS (sets
			// --_max-width: none); CSS lengths feed --_max-width here.
			if (w && w !== 'full' && CSS.supports('max-width', w)) {
				this.style.setProperty('--_max-width', w);
			} else {
				this.style.removeProperty('--_max-width');
			}
		}
	}

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

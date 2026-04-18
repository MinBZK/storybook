/**
 * Nederlandse Digitale Dienst Full Bleed Section Component (Lit + TypeScript)
 *
 * A section that spans the full width without horizontal padding.
 * Useful for background colors, images, or other content that runs
 * edge to edge. Vertical padding and gap adjust via container queries.
 *
 * @element nldd-full-bleed-section
 *
 * @slot header - Content above the main content
 * @slot - Main content
 * @slot footer - Content below the main content
 *
 * @attr {string} [align] - Set to "center" to vertically center section content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fullBleedSectionStyles } from './full-bleed-section.styles.ts';
import { fullBleedSectionTemplate } from './full-bleed-section.template.ts';

@customElement('nldd-full-bleed-section')
export class NLDDFullBleedSection extends LitElement {
	static override styles = fullBleedSectionStyles;

	@property({ type: String, reflect: true })
	align?: string;

	_onSlotChange(e: Event) {
		const slot = e.target as HTMLSlotElement;
		const wrapper = slot.parentElement as HTMLElement;
		wrapper.hidden = slot.assignedElements().length === 0;
	}

	override render() {
		return fullBleedSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-full-bleed-section': NLDDFullBleedSection;
	}
}

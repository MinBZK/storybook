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
 * @attr {string} [width] - Body max-width: 'full' removes the constraint so the
 *                          section spans the full available width. Any CSS
 *                          length (e.g. '480px') overrides the default max-width.
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { fullBleedSectionStyles } from './full-bleed-section.styles.js';
import { fullBleedSectionTemplate } from './full-bleed-section.template.js';

@customElement('nldd-full-bleed-section')
export class NLDDFullBleedSection extends LitElement {
	static override styles = fullBleedSectionStyles;

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
		return fullBleedSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-full-bleed-section': NLDDFullBleedSection;
	}
}

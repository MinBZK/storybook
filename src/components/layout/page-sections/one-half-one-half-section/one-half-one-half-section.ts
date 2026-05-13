/**
 * Nederlandse Digitale Dienst One Half One Half Section Component (Lit + TypeScript)
 *
 * A section with two equal columns side by side.
 * The columns wrap automatically when they become smaller than 280px.
 * Padding and gap adjust via container queries.
 *
 * @element nldd-one-half-one-half-section
 *
 * @slot header - Content above the columns
 * @slot - Left column (1/2), alternative for slot="left"
 * @slot left - Left column (1/2)
 * @slot right - Right column (1/2)
 * @slot footer - Content below the columns
 *
 * @attr {string} [width] - Body max-width: 'full' removes the constraint so the
 *                          section spans the full available width. Any CSS
 *                          length (e.g. '480px') overrides the default max-width.
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { oneHalfOneHalfSectionStyles } from './one-half-one-half-section.styles.js';
import { oneHalfOneHalfSectionTemplate } from './one-half-one-half-section.template.js';

@customElement('nldd-one-half-one-half-section')
export class NLDDOneHalfOneHalfSection extends LitElement {
	static override styles = oneHalfOneHalfSectionStyles;

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

	override render() {
		return oneHalfOneHalfSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-one-half-one-half-section': NLDDOneHalfOneHalfSection;
	}
}

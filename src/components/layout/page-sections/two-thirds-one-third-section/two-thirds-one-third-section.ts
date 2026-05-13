/**
 * Nederlandse Digitale Dienst Two Thirds One Third Section Component (Lit + TypeScript)
 *
 * A section with 2/3 main content on the left and a 1/3 sidebar on the right.
 * The columns wrap automatically when they become smaller than 280px.
 * Padding and gap adjust via container queries.
 *
 * @element nldd-two-thirds-one-third-section
 *
 * @slot header - Content above the columns
 * @slot - Left column (2/3), alternative for slot="left"
 * @slot left - Left column (2/3)
 * @slot right - Right column (1/3)
 * @slot footer - Content below the columns
 *
 * @attr {string} [width] - Body max-width: 'full' removes the constraint so the
 *                          section spans the full available width. Any CSS
 *                          length (e.g. '480px') overrides the default max-width.
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { twoThirdsOneThirdSectionStyles } from './two-thirds-one-third-section.styles.js';
import { twoThirdsOneThirdSectionTemplate } from './two-thirds-one-third-section.template.js';

@customElement('nldd-two-thirds-one-third-section')
export class NLDDTwoThirdsOneThirdSection extends LitElement {
	static override styles = twoThirdsOneThirdSectionStyles;

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
		return twoThirdsOneThirdSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-two-thirds-one-third-section': NLDDTwoThirdsOneThirdSection;
	}
}

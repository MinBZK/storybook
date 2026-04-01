/**
 * RegelRecht One Third Two Thirds Section Component (Lit + TypeScript)
 *
 * A section with a 1/3 sidebar on the left and 2/3 main content on the right.
 * The columns wrap automatically when they become smaller than 280px.
 * Padding and gap adjust via container queries.
 *
 * @element rr-one-third-two-thirds-section
 *
 * @slot header - Content above the columns
 * @slot left - Left column (1/3)
 * @slot - Right column (2/3), alternative for slot="right"
 * @slot right - Right column (2/3)
 * @slot footer - Content below the columns
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { oneThirdTwoThirdsSectionStyles } from './rr-one-third-two-thirds-section.styles.ts';
import { oneThirdTwoThirdsSectionTemplate } from './rr-one-third-two-thirds-section.template.ts';

@customElement('rr-one-third-two-thirds-section')
export class RROneThirdTwoThirdsSection extends LitElement {
	static override styles = oneThirdTwoThirdsSectionStyles;

	override render() {
		return oneThirdTwoThirdsSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-one-third-two-thirds-section': RROneThirdTwoThirdsSection;
	}
}

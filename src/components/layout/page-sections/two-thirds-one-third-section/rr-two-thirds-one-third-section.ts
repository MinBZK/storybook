/**
 * RegelRecht Two Thirds One Third Section Component (Lit + TypeScript)
 *
 * A section with 2/3 main content on the left and a 1/3 sidebar on the right.
 * The columns wrap automatically when they become smaller than 280px.
 * Padding and gap adjust via container queries.
 *
 * @element rr-two-thirds-one-third-section
 *
 * @slot header - Content above the columns
 * @slot - Left column (2/3), alternative for slot="left"
 * @slot left - Left column (2/3)
 * @slot right - Right column (1/3)
 * @slot footer - Content below the columns
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { twoThirdsOneThirdSectionStyles } from './rr-two-thirds-one-third-section.styles.ts';
import { twoThirdsOneThirdSectionTemplate } from './rr-two-thirds-one-third-section.template.ts';

@customElement('rr-two-thirds-one-third-section')
export class RRTwoThirdsOneThirdSection extends LitElement {
	static override styles = twoThirdsOneThirdSectionStyles;

	override render() {
		return twoThirdsOneThirdSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-two-thirds-one-third-section': RRTwoThirdsOneThirdSection;
	}
}

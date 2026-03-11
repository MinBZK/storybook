/**
 * RegelRecht One Third Two Thirds Section Component (Lit + TypeScript)
 *
 * Een sectie met een 1/3 zijkolom links en 2/3 hoofdinhoud rechts.
 * De kolommen wrappen automatisch wanneer ze kleiner worden dan 280px.
 * Padding en gap passen zich aan via container queries.
 *
 * @element rr-one-third-two-thirds-section
 *
 * @slot header - Inhoud boven de kolommen
 * @slot aside - Zijkolom (1/3)
 * @slot - Hoofdinhoud (2/3)
 * @slot footer - Inhoud onder de kolommen
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

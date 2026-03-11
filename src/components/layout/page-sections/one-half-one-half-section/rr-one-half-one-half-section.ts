/**
 * RegelRecht One Half One Half Section Component (Lit + TypeScript)
 *
 * Een sectie met twee gelijke kolommen naast elkaar.
 * De kolommen wrappen automatisch wanneer ze kleiner worden dan 280px.
 * Padding en gap passen zich aan via container queries.
 *
 * @element rr-one-half-one-half-section
 *
 * @slot header - Inhoud boven de kolommen
 * @slot - Linkerkolom (1/2), alternatief voor slot="left"
 * @slot left - Linkerkolom (1/2)
 * @slot right - Rechterkolom (1/2)
 * @slot footer - Inhoud onder de kolommen
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { oneHalfOneHalfSectionStyles } from './rr-one-half-one-half-section.styles.ts';
import { oneHalfOneHalfSectionTemplate } from './rr-one-half-one-half-section.template.ts';

@customElement('rr-one-half-one-half-section')
export class RROneHalfOneHalfSection extends LitElement {
	static override styles = oneHalfOneHalfSectionStyles;

	override render() {
		return oneHalfOneHalfSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-one-half-one-half-section': RROneHalfOneHalfSection;
	}
}

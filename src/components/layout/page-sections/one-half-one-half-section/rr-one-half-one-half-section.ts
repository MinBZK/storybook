/**
 * RegelRecht One Half One Half Section Component (Lit + TypeScript)
 *
 * A section with two equal columns side by side.
 * The columns wrap automatically when they become smaller than 280px.
 * Padding and gap adjust via container queries.
 *
 * @element rr-one-half-one-half-section
 *
 * @slot header - Content above the columns
 * @slot - Left column (1/2), alternative for slot="left"
 * @slot left - Left column (1/2)
 * @slot right - Right column (1/2)
 * @slot footer - Content below the columns
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

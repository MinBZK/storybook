/**
 * Nederlandse Digitale Dienst One Half One Half Section Component (Lit + TypeScript)
 *
 * A section with two equal columns side by side.
 * The columns wrap automatically when they become smaller than 280px.
 * Padding and gap adjust via container queries.
 *
 * @element ndd-one-half-one-half-section
 *
 * @slot header - Content above the columns
 * @slot - Left column (1/2), alternative for slot="left"
 * @slot left - Left column (1/2)
 * @slot right - Right column (1/2)
 * @slot footer - Content below the columns
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { oneHalfOneHalfSectionStyles } from './ndd-one-half-one-half-section.styles.ts';
import { oneHalfOneHalfSectionTemplate } from './ndd-one-half-one-half-section.template.ts';

@customElement('ndd-one-half-one-half-section')
export class NDDOneHalfOneHalfSection extends LitElement {
	static override styles = oneHalfOneHalfSectionStyles;

	@property({ type: String, reflect: true })
	align?: 'center';

	override render() {
		return oneHalfOneHalfSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-one-half-one-half-section': NDDOneHalfOneHalfSection;
	}
}

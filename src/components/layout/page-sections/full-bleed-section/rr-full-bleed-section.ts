/**
 * RegelRecht Full Bleed Section Component (Lit + TypeScript)
 *
 * A section that spans the full width without horizontal padding.
 * Useful for background colors, images, or other content that runs
 * edge to edge. Vertical padding and gap adjust via container queries.
 *
 * @element rr-full-bleed-section
 *
 * @slot header - Content above the main content
 * @slot - Main content
 * @slot footer - Content below the main content
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { fullBleedSectionStyles } from './rr-full-bleed-section.styles.ts';
import { fullBleedSectionTemplate } from './rr-full-bleed-section.template.ts';

@customElement('rr-full-bleed-section')
export class RRFullBleedSection extends LitElement {
	static override styles = fullBleedSectionStyles;

	override render() {
		return fullBleedSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-full-bleed-section': RRFullBleedSection;
	}
}

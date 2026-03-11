/**
 * RegelRecht Full Bleed Section Component (Lit + TypeScript)
 *
 * Een sectie die de volledige breedte beslaat zonder horizontale padding.
 * Nuttig voor achtergrondkleuren, afbeeldingen of andere inhoud die van rand
 * tot rand loopt. Verticale padding en gap passen zich aan via container queries.
 *
 * @element rr-full-bleed-section
 *
 * @slot header - Inhoud boven de hoofdinhoud
 * @slot - Hoofdinhoud
 * @slot footer - Inhoud onder de hoofdinhoud
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

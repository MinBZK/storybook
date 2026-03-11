/**
 * RegelRecht Two Thirds One Third Section Component (Lit + TypeScript)
 *
 * Een sectie met 2/3 hoofdinhoud links en een 1/3 zijkolom rechts.
 * De kolommen wrappen automatisch wanneer ze kleiner worden dan 280px.
 * Padding en gap passen zich aan via container queries.
 *
 * @element rr-two-thirds-one-third-section
 *
 * @slot header - Inhoud boven de kolommen
 * @slot - Hoofdinhoud (2/3, links)
 * @slot aside - Zijkolom (1/3, rechts)
 * @slot footer - Inhoud onder de kolommen
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

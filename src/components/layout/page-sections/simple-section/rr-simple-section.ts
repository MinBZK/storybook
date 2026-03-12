/**
 * RegelRecht Simple Section Component (Lit + TypeScript)
 *
 * Een basissectie met responsieve padding en gap op basis van containergrootte.
 * Bevat optionele header- en footerslots. De padding en ruimte tussen de slots
 * passen zich automatisch aan via container queries.
 *
 * @element rr-simple-section
 *
 * @slot header - Inhoud boven de hoofdinhoud
 * @slot - Hoofdinhoud
 * @slot footer - Inhoud onder de hoofdinhoud
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { simpleSectionStyles } from './rr-simple-section.styles.ts';
import { simpleSectionTemplate } from './rr-simple-section.template.ts';

@customElement('rr-simple-section')
export class RRSimpleSection extends LitElement {
	static override styles = simpleSectionStyles;

	override render() {
		return simpleSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-simple-section': RRSimpleSection;
	}
}

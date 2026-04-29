/**
 * Nederlandse Digitale Dienst Form Section Component (Lit + TypeScript)
 *
 * Een visuele groepering binnen een formulier met optionele heading en
 * supporting text. Rendert intern als `<fieldset>` + `<legend>` voor
 * semantische correctheid en screenreader-context.
 *
 * Heading is altijd links uitgelijnd over de volledige breedte, ook als
 * de formulier-velden binnenin `label-alignment="right"` gebruiken.
 *
 *     <nldd-form>
 *         <nldd-form-section text="Persoonsgegevens" supporting-text="Vul je gegevens in.">
 *             <nldd-form-field label="Voornaam">...</nldd-form-field>
 *             <nldd-form-field label="Achternaam">...</nldd-form-field>
 *         </nldd-form-section>
 *
 *         <nldd-form-section text="Adres">
 *             <nldd-form-field label="Straat">...</nldd-form-field>
 *         </nldd-form-section>
 *
 *         <nldd-form-actions>...</nldd-form-actions>
 *     </nldd-form>
 *
 * @element nldd-form-section
 *
 * @attr {string} text             - Heading-tekst (gerenderd als `<legend>`).
 * @attr {string} supporting-text  - Korte beschrijving onder de heading.
 *
 * @slot - Form-fields en andere content binnen de sectie.
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formSectionStyles } from './form-section.styles.js';
import { formSectionTemplate } from './form-section.template.js';

@customElement('nldd-form-section')
export class NLDDFormSection extends LitElement {
	static override styles = formSectionStyles;

	@property({ type: String })
	text = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	override render() {
		return formSectionTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-form-section': NLDDFormSection;
	}
}

/**
 * Nederlandse Digitale Dienst Form Section Component (Lit + TypeScript)
 *
 * Een visuele groepering binnen een formulier met optionele title en
 * supporting text. Rendert intern als `<fieldset>` + `<legend>` voor
 * semantische correctheid en screenreader-context.
 *
 * Title is altijd links uitgelijnd over de volledige breedte, ook als
 * de formulier-velden binnenin `label-alignment="right"` gebruiken.
 *
 * **Accessibility note**: de title rendert als `<legend>`. Dat is
 * semantisch een **groep-label**, geen heading. Screenreaders
 * kondigen 't aan wanneer de gebruiker in de fieldset komt, maar
 * gebruikers die met de H-toets door headings springen slaan 'm
 * over. Visueel lijkt 't op een heading; gebruik dit component dus
 * voor *form-grouping*, niet als pagina-structuur. Voor echte
 * page-headings: gebruik een apart heading-element boven het form.
 *
 * **Supporting-text lengte**: de subtitle staat als `<span>` binnen
 * de `<legend>` zodat SR 'm meeleest als group label. Bijwerking: bij
 * elke field-entry binnen de sectie wordt de hele legend (titel +
 * subtitel) opnieuw uitgesproken. Houd `supporting-text` daarom kort
 * (richtlijn: ≤ ~80 tekens) en gebruik 'm voor groep-introductie
 * ("Vul je adresgegevens in"), niet voor uitgebreide instructies.
 * Voor langere uitleg op een specifiek veld: gebruik
 * `nldd-form-field-help-text` op dat veld.
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
 *                                   Houd ≤ ~80 tekens (zie a11y-note).
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

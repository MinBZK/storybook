/**
 * Nederlandse Digitale Dienst Form Actions Component (Lit + TypeScript)
 *
 * Een layout-wrapper voor de actie-knoppen onderaan een formulier (typisch
 * een submit-button of button-group). Volgt dezelfde responsive layout als
 * `nldd-form-field`: met `label-alignment="right"` of `"left"` krijgt de
 * inhoud dezelfde insprong als de invoervelden boven, dankzij een onzichtbaar
 * spacer-kolom waar de label zou staan.
 *
 * Erft `label-alignment` automatisch over van een wrappende `<nldd-form>`
 * via CSS `:host-context()` — geen JS-attribuut-mirror nodig. Per-instance
 * override blijft mogelijk via een eigen `label-alignment` attribuut.
 *
 *     <nldd-form label-alignment="right">
 *         <nldd-form-field>...</nldd-form-field>
 *         <nldd-form-actions>
 *             <nldd-button-group>
 *                 <nldd-button variant="primary" type="submit" text="Opslaan"></nldd-button>
 *             </nldd-button-group>
 *         </nldd-form-actions>
 *     </nldd-form>
 *
 * @element nldd-form-actions
 *
 * @attr {string} label-alignment - 'top' (default) | 'right' | 'left'.
 *                                  Wordt geërfd van een wrappende nldd-form als niet expliciet gezet.
 *
 * @slot - Actie-elementen (button, button-group, etc.)
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formActionsStyles } from './form-actions.styles.js';
import { formActionsTemplate } from './form-actions.template.js';

export type LabelAlignment = 'top' | 'left' | 'right';

@customElement('nldd-form-actions')
export class NLDDFormActions extends LitElement {
	static override styles = formActionsStyles;

	@property({ type: String, reflect: true, attribute: 'label-alignment' })
	labelAlignment: LabelAlignment = 'top';

	override render() {
		return formActionsTemplate();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-form-actions': NLDDFormActions;
	}
}

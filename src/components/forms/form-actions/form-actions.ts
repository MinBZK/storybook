/**
 * Nederlandse Digitale Dienst Form Actions Component (Lit + TypeScript)
 *
 * Een layout-wrapper voor de actie-knoppen onderaan een formulier (typisch
 * een submit-button of button-group). Volgt dezelfde responsive layout als
 * `nldd-form-field`: met `label-alignment="right"` of `"left"` krijgt de
 * inhoud dezelfde insprong als de invoervelden boven, dankzij een
 * `::before`-pseudo-element dat fungeert als spacer-kolom waar de label
 * zou staan.
 *
 * Erft `label-alignment` automatisch over van een wrappende `<nldd-form>`:
 * de form propageert z'n eigen `label-alignment` als `form-label-alignment`
 * naar descendant `nldd-form-actions` (en `nldd-form-field`) via een
 * MutationObserver. Een expliciete eigen `label-alignment` op de form-actions
 * wint via CSS-cascade — de form-code raakt het `label-alignment` attribuut
 * van de descendant nooit aan.
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
 * @attr {string} label-alignment - 'top' (default) | 'right' | 'left'. Een eigen waarde wint altijd over de inherited form-label-alignment.
 * @attr {string} form-label-alignment - Door wrappende nldd-form gezet als fallback. Niet zelf zetten in consumer-code.
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

	/**
	 * Default is `undefined` (and not `'top'`) so Lit doesn't reflect the
	 * default value to the attribute on first update. See `nldd-form-field` for
	 * the explanation, for the same reason: the form-label-alignment fallback CSS
	 * works on `:not([label-alignment])`.
	 */
	@property({ type: String, reflect: true, attribute: 'label-alignment' })
	labelAlignment: LabelAlignment | undefined = undefined;

	override render() {
		return formActionsTemplate();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-form-actions': NLDDFormActions;
	}
}

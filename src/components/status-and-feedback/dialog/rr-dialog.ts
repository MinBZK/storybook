/**
 * RegelRecht Dialog Component (Lit + TypeScript)
 *
 * Een inline statuscomponent voor lege toestand, bevestigingen en feedback.
 * Vult de container en heeft geen minimale breedte.
 *
 * @element rr-dialog
 *
 * @attr {'alert'} variant       - Semantische variant; 'alert' dwingt icon-name="alert" af en kleurt het icoon
 * @attr {string}  icon-name     - Naam van het rr-icon icoon boven de tekst; afwezig wanneer niet ingesteld
 * @attr {string}  text          - Hoofdtekst (heading)
 * @attr {string}  supporting-text - Ondersteunende tekst onder de heading
 *
 * @slot         - Optionele aangepaste inhoud tussen tekst en acties
 * @slot actions - rr-button elementen, gewrapped in rr-button-group (max 3)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dialogStyles } from './rr-dialog.styles.ts';
import { dialogTemplate } from './rr-dialog.template.ts';
import '../../content/icon/rr-icon.ts';
import '../../actions/button-group/rr-button-group.ts';

export type DialogVariant = 'alert';

@customElement('rr-dialog')
export class RRDialog extends LitElement {
	static override styles = dialogStyles;

	@property({ type: String, reflect: true })
	variant: DialogVariant | '' = '';

	@property({ type: String, reflect: true, attribute: 'icon-name' })
	iconName = '';

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true, attribute: 'supporting-text' })
	supportingText = '';

	get _resolvedIconName(): string {
		if (this.iconName) return this.iconName;
		if (this.variant === 'alert') return 'alert';
		return '';
	}

	override render() {
		return dialogTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-dialog': RRDialog;
	}
}

/**
 * RegelRecht Vertical Split View Component (Lit + TypeScript)
 *
 * Een drierijige layout met een koptekst, inhoudsgebied en voettekst.
 * De koptekst biedt ruimte voor tools en acties boven de inhoud; het
 * inhoudsgebied toont de primaire inhoud; het voettekst biedt ruimte
 * voor uitvoer, logboeken of aanvullende panelen onder de inhoud.
 * Het inhoudsgebied blijft altijd zichtbaar.
 *
 * @element rr-vertical-split-view
 *
 * @attr {boolean} show-header - Toon de koptekst (standaard: true)
 * @attr {boolean} show-footer - Toon het voettekst (standaard: true)
 *
 * @slot header - Bovenste paneel voor kopteksten en acties
 * @slot content - Middelste paneel voor de primaire inhoud
 * @slot footer - Onderste paneel voor uitvoer, logboeken of statusinformatie
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { verticalSplitViewStyles } from './rr-vertical-split-view.styles.ts';
import { verticalSplitViewTemplate } from './rr-vertical-split-view.template.ts';

@customElement('rr-vertical-split-view')
export class RRVerticalSplitView extends LitElement {
	static override styles = verticalSplitViewStyles;

	@property({ type: Boolean, reflect: true, attribute: 'show-header' })
	showHeader = true;

	@property({ type: Boolean, reflect: true, attribute: 'show-footer' })
	showFooter = true;

	override render() {
		return verticalSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-vertical-split-view': RRVerticalSplitView;
	}
}

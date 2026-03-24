/**
 * RegelRecht Split View Pane Component (Lit + TypeScript)
 *
 * Een eenvoudige paneel-container voor gebruik binnen split views.
 * De split view stelt automatisch de context in: welke modus actief is
 * en of de terugknop verborgen moet worden.
 *
 * De consumer stelt `has-content` in om aan te geven dat het paneel inhoud bevat.
 * De consumer stelt `back-label` in op de `rr-top-title-bar` binnen het paneel.
 * De split view stelt `hide-back` in wanneer de terugknop niet van toepassing is.
 * De pane verbergt de terugknop automatisch via CSS wanneer `hide-back` actief is.
 *
 * @element rr-split-view-pane
 *
 * @attr {boolean}                          has-content - Het paneel heeft inhoud (standaard: false)
 * @attr {boolean}                          hide-back   - Verberg de terugknop (automatisch ingesteld door de split view)
 * @attr {'spatial'|'sidebar-stack'|
 *         'full-stack'}                    mode        - Huidige weergavemodus (automatisch ingesteld door de split view)
 *
 * @slot - Inhoud van het paneel
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { splitViewPaneStyles } from './rr-split-view-pane.styles.ts';
import { splitViewPaneTemplate } from './rr-split-view-pane.template.ts';

@customElement('rr-split-view-pane')
export class RRSplitViewPane extends LitElement {
	static override styles = splitViewPaneStyles;

	@property({ type: Boolean, reflect: true, attribute: 'has-content' })
	hasContent = false;

	@property({ type: Boolean, reflect: true, attribute: 'hide-back' })
	hideBack = false;

	@property({ type: String, reflect: true })
	mode: 'spatial' | 'sidebar-stack' | 'full-stack' = 'spatial';

	override render() {
		return splitViewPaneTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-split-view-pane': RRSplitViewPane;
	}
}

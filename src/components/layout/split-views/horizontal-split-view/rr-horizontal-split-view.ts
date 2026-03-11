/**
 * RegelRecht Horizontal Split View Component (Lit + TypeScript)
 *
 * Een driekoloms layout met een zijbalk, inhoudsgebied en inspecteur.
 * De zijbalk toont navigatie of lijsten, het inhoudsgebied de primaire inhoud,
 * en de inspecteur aanvullende details of eigenschappen van de selectie.
 *
 * @element rr-horizontal-split-view
 * Panelen worden automatisch verborgen als er onvoldoende ruimte is:
 * bij minder dan 962px verdwijnt de inspecteur, bij minder dan 641px ook de zijbalk.
 * Het inhoudsgebied blijft altijd zichtbaar.
 *
 * @attr {boolean} show-sidebar - Toon de zijbalk (standaard: true)
 * @attr {boolean} show-inspector - Toon de inspecteur (standaard: true)
 *
 * @slot content - Middelste paneel voor de primaire inhoud
 * @slot inspector - Rechter paneel voor details of eigenschappen
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { horizontalSplitViewStyles } from './rr-horizontal-split-view.styles.ts';
import { horizontalSplitViewTemplate } from './rr-horizontal-split-view.template.ts';

@customElement('rr-horizontal-split-view')
export class RRHorizontalSplitView extends LitElement {
	static override styles = horizontalSplitViewStyles;

	@property({ type: Boolean, reflect: true, attribute: 'show-sidebar' })
	showSidebar = true;

	@property({ type: Boolean, reflect: true, attribute: 'show-inspector' })
	showInspector = true;

	override render() {
		return horizontalSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-horizontal-split-view': RRHorizontalSplitView;
	}
}

/**
 * RegelRecht Stacked Split View Component (Lit + TypeScript)
 *
 * Een verticale split view met meerdere gestapelde panelen.
 * Het aantal panelen wordt ingesteld via het `panes` attribuut. Elk paneel
 * krijgt automatisch een genummerde slot: pane-1, pane-2, etc.
 * Panelen zijn minimaal 320px hoog; panelen die niet passen worden verborgen.
 *
 * @element rr-stacked-split-view
 *
 * @attr {number} panes - Aantal panelen (standaard: 2)
 *
 * @slot pane-1 - Eerste paneel
 * @slot pane-2 - Tweede paneel
 * @slot pane-n - Elk volgend paneel op basis van het `panes` attribuut
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { stackedSplitViewStyles } from './rr-stacked-split-view.styles.ts';
import { stackedSplitViewTemplate } from './rr-stacked-split-view.template.ts';

@customElement('rr-stacked-split-view')
export class RRStackedSplitView extends LitElement {
	static override styles = stackedSplitViewStyles;

	@property({ type: Number, reflect: true })
	panes = 2;

	override render() {
		return stackedSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-stacked-split-view': RRStackedSplitView;
	}
}

/**
 * RegelRecht Side-by-Side Split View Component (Lit + TypeScript)
 *
 * Een horizontale split view met meerdere gelijke panelen naast elkaar.
 * Het aantal panelen wordt ingesteld via het `panes` attribuut. Elk paneel
 * krijgt automatisch een genummerde slot: pane-1, pane-2, etc.
 * Panelen zijn minimaal 320px breed; panelen die niet passen worden verborgen.
 *
 * @element rr-side-by-side-split-view
 *
 * @attr {number} panes - Aantal panelen (standaard: 2)
 *
 * @slot pane-1 - Eerste paneel
 * @slot pane-2 - Tweede paneel
 * @slot pane-n - Elk volgend paneel op basis van het `panes` attribuut
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sideBySideSplitViewStyles } from './rr-side-by-side-split-view.styles.ts';
import { sideBySideSplitViewTemplate } from './rr-side-by-side-split-view.template.ts';

@customElement('rr-side-by-side-split-view')
export class RRSideBySideSplitView extends LitElement {
	static override styles = sideBySideSplitViewStyles;

	@property({ type: Number, reflect: true })
	panes = 2;

	override render() {
		return sideBySideSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-side-by-side-split-view': RRSideBySideSplitView;
	}
}

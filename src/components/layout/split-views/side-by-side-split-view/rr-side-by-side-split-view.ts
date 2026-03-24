/**
 * RegelRecht Side-by-Side Split View Component (Lit + TypeScript)
 *
 * A horizontal split view with multiple equal panes side by side.
 * The number of panes is set via the `panes` attribute. Each pane
 * automatically gets a numbered slot: pane-1, pane-2, etc.
 *
 * @element rr-side-by-side-split-view
 *
 * @attr {number} panes - Number of panes (default: 2)
 *
 * @slot pane-1 - First pane
 * @slot pane-2 - Second pane
 * @slot pane-n - Each subsequent pane based on the `panes` attribute
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

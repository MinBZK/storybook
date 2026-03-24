/**
 * RegelRecht Stacked Split View Component (Lit + TypeScript)
 *
 * A vertical split view with multiple stacked panes.
 * The number of panes is set via the `panes` attribute. Each pane
 * automatically gets a numbered slot: pane-1, pane-2, etc.
 *
 * @element rr-stacked-split-view
 *
 * @attr {number} panes - Number of panes (default: 2)
 *
 * @slot pane-1 - First pane
 * @slot pane-2 - Second pane
 * @slot pane-n - Each subsequent pane based on the `panes` attribute
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

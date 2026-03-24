/**
 * RegelRecht Split View Pane Component (Lit + TypeScript)
 *
 * A simple pane container for use inside split views.
 * The split view automatically sets context: whether a back button should be shown.
 *
 * The consumer sets `has-content` to indicate the pane has content.
 * The consumer sets `back-label` on the `rr-top-title-bar` inside the pane.
 * The split view sets `hide-back` when the back button is not applicable.
 * The pane automatically hides the back button via CSS when `hide-back` is active.
 *
 * @element rr-split-view-pane
 *
 * @attr {boolean} has-content - The pane has content (default: false)
 * @attr {boolean} hide-back   - Hide the back button (set automatically by the split view)
 *
 * @slot - Pane content
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

	override render() {
		return splitViewPaneTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-split-view-pane': RRSplitViewPane;
	}
}

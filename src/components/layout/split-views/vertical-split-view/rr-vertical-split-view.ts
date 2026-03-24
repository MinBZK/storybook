/**
 * RegelRecht Vertical Split View Component (Lit + TypeScript)
 *
 * A three-row layout with a header, main content area, and footer.
 * The header provides space for tools and actions above the content;
 * the main area shows primary content; the footer provides space
 * for output, logs, or additional panels below the content.
 * The main area is always visible.
 *
 * @element rr-vertical-split-view
 *
 * @attr {boolean} show-header - Show the header (default: true)
 * @attr {boolean} show-footer - Show the footer (default: true)
 *
 * @slot header - Top pane for headers and actions
 * @slot main   - Center pane for primary content
 * @slot footer - Bottom pane for output, logs, or status information
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

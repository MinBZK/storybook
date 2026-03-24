/**
 * RegelRecht Vertical Split View Component (Lit + TypeScript)
 *
 * A three-row layout with a header, main content area, and footer.
 * The header provides space for tools and actions above the content;
 * the main area shows primary content; the footer provides space
 * for output, logs, or additional panels below the content.
 * The main area is always visible. Header and footer are shown only
 * when content is slotted into them.
 *
 * @element rr-vertical-split-view
 *
 * @slot header - Top pane for headers and actions
 * @slot main   - Center pane for primary content
 * @slot footer - Bottom pane for output, logs, or status information
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { verticalSplitViewStyles } from './rr-vertical-split-view.styles.ts';
import { verticalSplitViewTemplate } from './rr-vertical-split-view.template.ts';

@customElement('rr-vertical-split-view')
export class RRVerticalSplitView extends LitElement {
	static override styles = verticalSplitViewStyles;

	get _hasHeader(): boolean {
		return this.querySelector(':scope > [slot="header"]') !== null;
	}

	get _hasFooter(): boolean {
		return this.querySelector(':scope > [slot="footer"]') !== null;
	}

	override connectedCallback() {
		super.connectedCallback();
		// Re-render when slotted children change
		this._observer = new MutationObserver(() => this.requestUpdate());
		this._observer.observe(this, { childList: true });
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	private _observer: MutationObserver | null = null;

	override render() {
		return verticalSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-vertical-split-view': RRVerticalSplitView;
	}
}

/**
 * RegelRecht Bar Split View Component (Lit + TypeScript)
 *
 * An app shell layout with a primary bar, main content area, and secondary bar.
 * The primary bar provides space for tools and actions above the content;
 * the main area shows primary content; the secondary bar provides space
 * for output, logs, status information, or a bottom navigation bar.
 * The main area is always visible. Primary and secondary bars are shown
 * only when content is slotted into them.
 *
 * @element rr-bar-split-view
 *
 * @slot primary-bar   - Top pane for toolbars, actions, or navigation
 * @slot main          - Center pane for primary content
 * @slot secondary-bar - Bottom pane for output, logs, status, or bottom navigation
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { barSplitViewStyles } from './rr-bar-split-view.styles.ts';
import { barSplitViewTemplate } from './rr-bar-split-view.template.ts';

@customElement('rr-bar-split-view')
export class RRBarSplitView extends LitElement {
	static override styles = barSplitViewStyles;

	get _hasPrimaryBar(): boolean {
		return this.querySelector(':scope > [slot="primary-bar"]') !== null;
	}

	get _hasSecondaryBar(): boolean {
		return this.querySelector(':scope > [slot="secondary-bar"]') !== null;
	}

	override connectedCallback() {
		super.connectedCallback();
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
		return barSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-bar-split-view': RRBarSplitView;
	}
}

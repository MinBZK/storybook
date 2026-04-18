/**
 * Nederlandse Digitale Dienst Side-by-Side Split View Component (Lit + TypeScript)
 *
 * A horizontal split view with multiple equal panes side by side.
 * The number of panes is set via the `panes` attribute. Each pane
 * automatically gets a numbered slot: pane-1, pane-2, etc.
 * Panes that do not fit the available width are automatically hidden.
 *
 * @element ndd-side-by-side-split-view
 *
 * @attr {'inherit'|'default'|'tinted'} background - Use a tinted background color (cascades to descendants)
 * @attr {number} panes - Number of panes (default: 2)
 *
 * @slot pane-1 - First pane
 * @slot pane-2 - Second pane
 * @slot pane-n - Each subsequent pane based on the `panes` attribute
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sideBySideSplitViewStyles } from './ndd-side-by-side-split-view.styles.ts';
import { sideBySideSplitViewTemplate } from './ndd-side-by-side-split-view.template.ts';

@customElement('ndd-side-by-side-split-view')
export class NDDSideBySideSplitView extends LitElement {
	static override styles = sideBySideSplitViewStyles;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'default' | 'tinted' = 'inherit';

	@property({ type: Number, reflect: true })
	panes = 2;

	@state()
	_visiblePanes = Infinity;

	// Cached pane min-width — read from CSS in firstUpdated
	private _paneMinWidth = 0;

	private _resizeObserver: ResizeObserver | null = null;

	override connectedCallback() {
		super.connectedCallback();
		this._resizeObserver = new ResizeObserver(() => this._updateVisiblePanes());
		this._resizeObserver.observe(this);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
	}

	override firstUpdated() {
		// Read pane min-width from CSS after first render — styles are guaranteed applied
		this._paneMinWidth = parseFloat(getComputedStyle(this).getPropertyValue('--_pane-min-width'));
		this._updateVisiblePanes();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('panes')) {
			this._updateVisiblePanes();
		}
	}

	private _updateVisiblePanes() {
		if (!this._paneMinWidth) return;
		const width = this.getBoundingClientRect().width;
		const fitting = Math.floor(width / this._paneMinWidth);
		this._visiblePanes = Math.min(this.panes, Math.max(1, fitting));
	}

	override render() {
		return sideBySideSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-side-by-side-split-view': NDDSideBySideSplitView;
	}
}

/**
 * RegelRecht Bar Split View Component (Lit + TypeScript)
 *
 * A vertical split view with a primary bar, main content area, and secondary bar.
 * The primary bar and secondary bar are shown only when content is slotted into them.
 * The main area is always visible.
 *
 * On small viewports the bars overlay the bottom of the main area.
 * The CSS custom property --rr-bar-split-view-bars-height is set on the host
 * so that scroll containers (e.g. rr-page) can add padding-bottom to prevent
 * content from being hidden behind the bars.
 *
 * ## Background color
 * Sets --context-background-color which cascades down to all descendants including rr-page.
 * Set background="tinted" to give the whole layout a tinted background.
 * The fade overlay behind the bars uses --context-background-color automatically.
 *
 * @element rr-bar-split-view
 *
 * @attr {'inherit'|'default'|'tinted'} background        - Use a tinted background color (cascades to descendants)
 *
 * @slot primary-bar   - Top pane for toolbars, actions, or navigation
 * @slot main          - Center pane for primary content
 * @slot secondary-bar - Bottom pane for output, logs, status, or bottom navigation
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { barSplitViewStyles } from './rr-bar-split-view.styles.ts';
import { barSplitViewTemplate } from './rr-bar-split-view.template.ts';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const smMaxPx = parseInt(breakpoints.smMax);

@customElement('rr-bar-split-view')
export class RRBarSplitView extends LitElement {
	static override styles = barSplitViewStyles;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'default' | 'tinted' = 'inherit';

	get _hasPrimaryBar(): boolean {
		return this.querySelector(':scope > [slot="primary-bar"]') !== null;
	}

	get _hasSecondaryBar(): boolean {
		return this.querySelector(':scope > [slot="secondary-bar"]') !== null;
	}

	private _observer: MutationObserver | null = null;
	private _resizeObserver: ResizeObserver | null = null;
	private _barResizeObserver: ResizeObserver | null = null;

	override connectedCallback() {
		super.connectedCallback();
		this._observer = new MutationObserver(() => {
			this.requestUpdate();
			this._observeBars();
			this._updateBarsHeight();
		});
		this._observer.observe(this, { childList: true });

		this._resizeObserver = new ResizeObserver(() => this._updateBarsHeight());
		this._resizeObserver.observe(this);

		this._barResizeObserver = new ResizeObserver(() => this._updateBarsHeight());
		this._observeBars();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
		this._barResizeObserver?.disconnect();
		this._barResizeObserver = null;
	}

	private _observeBars() {
		this._barResizeObserver?.disconnect();
		const primaryBar = this.querySelector(':scope > [slot="primary-bar"]');
		const secondaryBar = this.querySelector(':scope > [slot="secondary-bar"]');
		if (primaryBar) this._barResizeObserver?.observe(primaryBar);
		if (secondaryBar) this._barResizeObserver?.observe(secondaryBar);
	}

	private _updateBarsHeight() {
		const width = this.getBoundingClientRect().width;
		const isMobile = width <= smMaxPx;

		if (!isMobile) {
			// Reset on desktop — bars are in flow, no overlay
			this.style.removeProperty('--rr-bar-split-view-bars-height');
			this.style.removeProperty('--rr-bar-split-view-primary-bar-height');
			return;
		}

		const primaryBar = this.querySelector(':scope > [slot="primary-bar"]');
		const secondaryBar = this.querySelector(':scope > [slot="secondary-bar"]');
		const primaryHeight = primaryBar?.getBoundingClientRect().height ?? 0;
		const secondaryHeight = secondaryBar?.getBoundingClientRect().height ?? 0;
		const total = primaryHeight + secondaryHeight;

		this.style.setProperty('--rr-bar-split-view-bars-height', `${total}px`);
		this.style.setProperty('--rr-bar-split-view-primary-bar-height', `${primaryHeight}px`);
	}

	override render() {
		return barSplitViewTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-bar-split-view': RRBarSplitView;
	}
}

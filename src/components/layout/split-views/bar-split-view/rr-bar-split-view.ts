/**
 * RegelRecht Bar Split View Component (Lit + TypeScript)
 *
 * Een verticale split view met een main-gebied en een onbeperkt aantal balkpanelen.
 * Elk kind bepaalt zijn volgorde per breekpunt via sm-order, md-order en lg-order.
 * Kinderen zonder orderattributen worden gesorteerd op DOM-volgorde.
 *
 * Op sm-viewports worden balken absoluut gepositioneerd over het main-gebied:
 * balken vóór main (op basis van volgorde) stapelen van boven naar beneden,
 * balken ná main stapelen van onder naar boven. Op md en lg staan alle panelen
 * in de flow met een scheiding tussen elk aangrenzend paar.
 *
 * CSS custom properties op de host voor consumers zoals rr-page:
 *   --context-bar-split-view-top-bars-height
 *   --context-bar-split-view-bottom-bars-height
 *
 * ## Slotnamen
 * Geef elke balk een unieke slotnaam (bijv. slot="toolbar", slot="status-bar").
 * Gebruik slot="bar-1", slot="bar-2" als er geen betekenisvolle naam van toepassing is.
 * Het main-paneel gebruikt altijd slot="main".
 *
 * ## Achtergrondkleur
 * Stelt --context-parent-background-color in, die cascadet naar alle afstammelingen
 * inclusief rr-page en de fade-overlays.
 *
 * @element rr-bar-split-view
 *
 * @attr {'inherit'|'default'|'tinted'} background  - Achtergrondkleurvariant (standaard: inherit)
 *
 * Responsieve zichtbaarheid per kind (directe children van rr-bar-split-view):
 * @attr {'sm'|'md'|'lg'} above - Toon dit paneel vanaf dit breekpunt en groter
 * @attr {'sm'|'md'|'lg'} below - Toon dit paneel tot en met dit breekpunt
 * @attr {'sm'|'md'|'lg'} only  - Toon dit paneel alleen op dit breekpunt
 *
 * @slot main  - Centraal paneel voor primaire inhoud
 * @slot *     - Elke andere unieke slotnaam creëert een balkpaneel
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { barSplitViewStyles } from './rr-bar-split-view.styles.ts';
import { barSplitViewTemplate } from './rr-bar-split-view.template.ts';
import { breakpoints } from '../../../../assets/styles/breakpoints.ts';

const smMaxPx = parseInt(breakpoints.smMax);
const mdMaxPx = parseInt(breakpoints.mdMax);

export type Breakpoint = 'sm' | 'md' | 'lg';
type BreakpointOrUnmeasured = Breakpoint | null;

@customElement('rr-bar-split-view')
export class RRBarSplitView extends LitElement {
	static override styles = barSplitViewStyles;

	@property({ type: String, reflect: true })
	background: 'inherit' | 'default' | 'tinted' = 'inherit';

	// null until connectedCallback measures the viewport. Before measurement the
	// template falls back to DOM order with dividers — no breakpoint-specific
	// sorting or mobile overlay behaviour is applied.
	_currentBreakpoint: BreakpointOrUnmeasured = null;

	// Bars that sit above main in the sm sort order. Used as a membership test in
	// the template: bars not in this Set are implicitly bottom bars. Only populated
	// on sm viewports — on md/lg bars are in normal flow and need no offset.
	_smTopBars = new Set<Element>();

	// Computed top or bottom pixel offset for every bar on sm viewports. Holds both
	// top-bar and bottom-bar values in the same Map — the template uses _smTopBars
	// to know which CSS property (top vs bottom) to apply the value to. Cleared on
	// md/lg where absolute positioning is not used.
	_smOffsets = new Map<Element, number>();

	private _observer: MutationObserver | null = null;
	private _resizeObserver: ResizeObserver | null = null;
	private _childResizeObserver: ResizeObserver | null = null;

	override connectedCallback() {
		super.connectedCallback();

		this._currentBreakpoint = this._getBreakpoint(this.getBoundingClientRect().width);

		this._observer = new MutationObserver(() => {
			this._observeChildren();
			this._updateLayout();
			this.requestUpdate();
		});
		this._observer.observe(this, { childList: true, attributes: true, attributeFilter: ['above', 'below', 'only', 'sm-order', 'md-order', 'lg-order'], subtree: false });

		this._resizeObserver = new ResizeObserver(() => {
			const bp = this._getBreakpoint(this.getBoundingClientRect().width);
			if (bp !== this._currentBreakpoint) {
				this._currentBreakpoint = bp;
				this.requestUpdate();
			}
			this._updateLayout();
		});
		this._resizeObserver.observe(this);

		this._childResizeObserver = new ResizeObserver(() => this._updateLayout());
		this._observeChildren();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
		this._childResizeObserver?.disconnect();
		this._childResizeObserver = null;
	}

	private _getBreakpoint(width: number): Breakpoint {
		if (width <= smMaxPx) return 'sm';
		if (width <= mdMaxPx) return 'md';
		return 'lg';
	}

	private _isChildVisible(el: Element): boolean {
		if (this._currentBreakpoint === null) return true;
		const bp = this._currentBreakpoint;
		const order: Breakpoint[] = ['sm', 'md', 'lg'];
		const bpIndex = order.indexOf(bp);

		const only = el.getAttribute('only') as Breakpoint | null;
		if (only) return bp === only;

		const above = el.getAttribute('above') as Breakpoint | null;
		if (above) return bpIndex >= order.indexOf(above);

		const below = el.getAttribute('below') as Breakpoint | null;
		if (below) return bpIndex <= order.indexOf(below);

		return true;
	}

	_getSortedChildren(): Element[] {
		const all = Array.from(this.children).filter(el => {
			if (!el.slot) {
				console.warn('<rr-bar-split-view>: every child must have a slot attribute (e.g. slot="toolbar", slot="status-bar", or slot="bar-1" if no meaningful name applies). Child without slot attribute is ignored:', el);
				return false;
			}
			return this._isChildVisible(el);
		});
		if (this._currentBreakpoint === null) return all;
		const attr = `${this._currentBreakpoint}-order`;
		return [...all].sort((a, b) => {
			const aVal = a.hasAttribute(attr) ? parseInt(a.getAttribute(attr)!) : all.indexOf(a);
			const bVal = b.hasAttribute(attr) ? parseInt(b.getAttribute(attr)!) : all.indexOf(b);
			return aVal - bVal;
		});
	}

	private _observeChildren() {
		this._childResizeObserver?.disconnect();
		for (const child of Array.from(this.children)) {
			this._childResizeObserver?.observe(child);
		}
	}

	private _updateLayout() {
		const width = this.getBoundingClientRect().width;

		if (width > smMaxPx) {
			this.style.removeProperty('--context-bar-split-view-top-bars-height');
			this.style.removeProperty('--context-bar-split-view-bottom-bars-height');
			this._smTopBars = new Set();
			this._smOffsets = new Map();
			return;
		}

		const sorted = this._getSortedChildren();
		const mainIndex = sorted.findIndex(el => el.slot === 'main');

		// Bars before main stack downward from the top; bars after main stack upward from the bottom
		const topBars = mainIndex > 0 ? sorted.slice(0, mainIndex) : [];
		const bottomBars = mainIndex >= 0 ? sorted.slice(mainIndex + 1) : sorted;

		this._smTopBars = new Set(topBars);

		const newOffsets = new Map<Element, number>();

		let topOffset = 0;
		for (const el of topBars) {
			newOffsets.set(el, topOffset);
			topOffset += el.getBoundingClientRect().height;
		}

		let bottomOffset = 0;
		for (const el of [...bottomBars].reverse()) {
			newOffsets.set(el, bottomOffset);
			bottomOffset += el.getBoundingClientRect().height;
		}

		this._smOffsets = newOffsets;
		this.style.setProperty('--context-bar-split-view-top-bars-height', `${topOffset}px`);
		this.style.setProperty('--context-bar-split-view-bottom-bars-height', `${bottomOffset}px`);

		this.requestUpdate();
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

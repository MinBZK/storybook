/**
 * Nederlandse Digitale Dienst Container Component (Lit + TypeScript)
 *
 * A simple layout primitive: pick a layout mode, give it a gap, optionally
 * align contents, and add padding. Padding can be set for all sides, per
 * axis (inline/block), or per individual side. Specificity: per side >
 * per axis > all sides.
 *
 * Responsive padding and gap have sm/md/lg variants. Each variant emits both
 * an @media (viewport) and @container (layout-container) query. When inside a
 * layout-container the @container query wins; otherwise the @media query
 * provides the viewport-based fallback.
 *
 * Layout modes:
 *  - `stack` (default): block items, stacked vertically. The "what you
 *    expect from DOM flow" mode.
 *  - `row`: flex row, no wrapping. Items shrink or overflow.
 *  - `wrap`: flex row, items wrap to new lines.
 *  - `grid`: CSS grid, auto-fit columns at min 280px wide.
 *  - `columns`: CSS multi-column flow, 280px minimum column width,
 *    items don't split across column breaks.
 *
 * Alignment maps to the layout's natural axis:
 *  - `stack`: vertical = main-axis (justify-content), horizontal = cross-axis (align-items)
 *  - `row` / `wrap`: horizontal = main-axis, vertical = cross-axis
 *  - `grid`: horizontal = justify-items, vertical = align-items (per cell)
 *  - `columns`: alignment props have no effect (CSS multicol doesn't expose alignment)
 *
 * Item order is set per-child via attributes on the slotted children
 * themselves: `<child order="3">` for a fixed position, or `<child sm-order="N">`
 * / `<child md-order="N">` / `<child lg-order="N">` to override per breakpoint
 * (resolved against THIS container's width via @container queries, same scope
 * as the responsive padding/gap). The container observes slot changes and
 * child attribute mutations and bridges these to `--_slot-order` /
 * `--_slot-sm-order` / etc. custom properties on each child's inline style,
 * which the container's CSS then reads via `::slotted(*)` inside @container
 * queries. Cascade: `sm-order` falls back to `order` falls back to `0` at sm
 * (and analogously for md/lg). No-op for `layout="columns"` (CSS multicol has
 * no per-item ordering hook).
 *
 * The `column-count` attribute (1-8) forces an exact column count for
 * `layout="grid"` (overrides auto-fit) and `layout="columns"` (overrides
 * the natural width-driven count). `sm-column-count` / `md-column-count`
 * / `lg-column-count` resolve against this container's OWN width via
 * an `@container (...)` query on the host — not against the viewport.
 * That lets a footer in a narrow sidebar choose its own column count
 * independent of the surrounding page width.
 *
 * @element nldd-container
 *
 * @attr {string}  layout                 - 'stack' | 'row' | 'wrap' | 'grid' | 'columns' (default: 'stack')
 * @attr {number}  column-count           - Force N columns (1-8) for layout=grid/columns
 * @attr {number}  sm-column-count        - Column count when this container is sm-wide
 * @attr {number}  md-column-count        - Column count when this container is md-wide
 * @attr {number}  lg-column-count        - Column count when this container is lg-wide
 * @attr {string}  gap                    - Gap between children
 * @attr {string}  sm-gap                 - Gap at sm breakpoint
 * @attr {string}  md-gap                 - Gap at md breakpoint
 * @attr {string}  lg-gap                 - Gap at lg breakpoint
 * @attr {string}  horizontal-alignment   - 'left' | 'center' | 'right'
 * @attr {string}  vertical-alignment     - 'top' | 'center' | 'bottom'
 * @attr {string}  padding                - Padding for all sides
 * @attr {string}  padding-inline         - Padding for left and right
 * @attr {string}  padding-block          - Padding for top and bottom
 * @attr {string}  padding-top            - Padding top
 * @attr {string}  padding-right          - Padding right
 * @attr {string}  padding-bottom         - Padding bottom
 * @attr {string}  padding-left           - Padding left
 * @attr {string}  sm-padding             - Padding for all sides at sm
 * @attr {string}  sm-padding-inline      - (and equivalents for inline/block/top/right/bottom/left)
 * @attr {string}  md-padding             - Padding at md (and per-side equivalents)
 * @attr {string}  lg-padding             - Padding at lg (and per-side equivalents)
 *
 * @slot - Container content
 */
import { LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { containerStyles } from './container.styles.js';
import { containerTemplate } from './container.template.js';

type PaddingSize =
	| '0' | '2' | '4' | '6' | '8' | '10' | '12' | '16' | '20' | '24'
	| '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96';

type Layout = 'stack' | 'row' | 'wrap' | 'grid' | 'columns';
type ColumnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type HorizontalAlignment = 'left' | 'center' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';
type Scope = '' | 'sm' | 'md' | 'lg';

const HORIZONTAL_TO_FLEX: Record<HorizontalAlignment, string> = {
	left: 'flex-start',
	center: 'center',
	right: 'flex-end',
};

const VERTICAL_TO_FLEX: Record<VerticalAlignment, string> = {
	top: 'flex-start',
	center: 'center',
	bottom: 'flex-end',
};

const ORDER_ATTRS = ['order', 'sm-order', 'md-order', 'lg-order'] as const;

function sizeToValue(size: PaddingSize | undefined): string | null {
	if (size === undefined) return null;
	if (size === '0') return '0';
	return `var(--primitives-space-${size})`;
}

@customElement('nldd-container')
export class NLDDContainer extends LitElement {
	static override styles = containerStyles;

	// No default value so a plain <nldd-container> doesn't carry a
	// reflected layout="stack" attribute. Absence resolves to stack in the
	// styles (the unconditional :host default) and in
	// writeCustomProperties (the horizontal-axis check matches 'row'/'wrap'
	// specifically).
	@property({ type: String, reflect: true })
	layout?: Layout;

	// Explicit column count for layout="grid" (overrides auto-fit) and for
	// layout="columns" (overrides the natural width-driven count). 1-8.
	// Per-viewport variants resolve against this container's OWN width via
	// @container queries — sm/md/lg refer to the container's inline-size,
	// not the viewport.
	@property({ type: Number, reflect: true, attribute: 'column-count' })
	columnCount?: ColumnCount;

	@property({ type: Number, reflect: true, attribute: 'sm-column-count' })
	smColumnCount?: ColumnCount;

	@property({ type: Number, reflect: true, attribute: 'md-column-count' })
	mdColumnCount?: ColumnCount;

	@property({ type: Number, reflect: true, attribute: 'lg-column-count' })
	lgColumnCount?: ColumnCount;

	@property({ type: String, reflect: true, attribute: 'horizontal-alignment' })
	horizontalAlignment: HorizontalAlignment | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: VerticalAlignment | undefined = undefined;

	@property({ type: String, reflect: true })
	gap: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-gap' })
	smGap: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-gap' })
	mdGap: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-gap' })
	lgGap: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true })
	padding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-inline' })
	paddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-block' })
	paddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-top' })
	paddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-right' })
	paddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-bottom' })
	paddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'padding-left' })
	paddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding' })
	smPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-inline' })
	smPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-block' })
	smPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-top' })
	smPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-right' })
	smPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-bottom' })
	smPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'sm-padding-left' })
	smPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding' })
	mdPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-inline' })
	mdPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-block' })
	mdPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-top' })
	mdPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-right' })
	mdPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-bottom' })
	mdPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'md-padding-left' })
	mdPaddingLeft: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding' })
	lgPadding: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-inline' })
	lgPaddingInline: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-block' })
	lgPaddingBlock: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-top' })
	lgPaddingTop: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-right' })
	lgPaddingRight: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-bottom' })
	lgPaddingBottom: PaddingSize | undefined = undefined;

	@property({ type: String, reflect: true, attribute: 'lg-padding-left' })
	lgPaddingLeft: PaddingSize | undefined = undefined;

	override updated(_changed: PropertyValues): void {
		this.writeCustomProperties();
	}

	private writeCustomProperties(): void {
		const setProp = (name: string, value: string | null) => {
			if (value === null) this.style.removeProperty(name);
			else this.style.setProperty(name, value);
		};

		// Alignment maps to a different CSS property depending on the
		// layout's axes:
		//  - Row/wrap: horizontal = justify-content (main), vertical = align-items (cross)
		//  - Stack (flex column): horizontal = align-items (cross), vertical = justify-content (main)
		//  - Grid: per-cell — horizontal = justify-items, vertical = align-items
		// We set --_justify-content/--_justify-items/--_align-items
		// independently; the .container picks up whichever applies to its
		// current display. Columns layout has no alignment hooks.
		const horizontal = this.horizontalAlignment ? HORIZONTAL_TO_FLEX[this.horizontalAlignment] : null;
		const vertical = this.verticalAlignment ? VERTICAL_TO_FLEX[this.verticalAlignment] : null;
		const isFlexRow = this.layout === 'row' || this.layout === 'wrap';
		const isGrid = this.layout === 'grid';
		if (isGrid) {
			setProp('--_justify-items', horizontal);
			setProp('--_justify-content', horizontal);
			setProp('--_align-items', vertical);
		} else if (isFlexRow) {
			setProp('--_justify-content', horizontal);
			setProp('--_align-items', vertical);
			setProp('--_justify-items', null);
		} else {
			setProp('--_justify-content', vertical);
			setProp('--_align-items', horizontal);
			setProp('--_justify-items', null);
		}

		setProp('--_gap', sizeToValue(this.gap));
		setProp('--_sm-gap', sizeToValue(this.smGap));
		setProp('--_md-gap', sizeToValue(this.mdGap));
		setProp('--_lg-gap', sizeToValue(this.lgGap));

		for (const scope of ['', 'sm', 'md', 'lg'] as const) {
			const [top, right, bottom, left] = this.resolvePadding(scope);
			const prefix = scope ? `${scope}-` : '';
			setProp(`--_${prefix}padding-top`, sizeToValue(top));
			setProp(`--_${prefix}padding-right`, sizeToValue(right));
			setProp(`--_${prefix}padding-bottom`, sizeToValue(bottom));
			setProp(`--_${prefix}padding-left`, sizeToValue(left));
		}
	}

	private resolvePadding(scope: Scope): (PaddingSize | undefined)[] {
		const get = (key: string): PaddingSize | undefined => {
			const prop = scope ? `${scope}${key}` as keyof this : key.charAt(0).toLowerCase() + key.slice(1) as keyof this;
			return this[prop] as PaddingSize | undefined;
		};
		const all = get('Padding');
		const inline = get('PaddingInline');
		const block = get('PaddingBlock');
		const top = get('PaddingTop') ?? block ?? all;
		const right = get('PaddingRight') ?? inline ?? all;
		const bottom = get('PaddingBottom') ?? block ?? all;
		const left = get('PaddingLeft') ?? inline ?? all;
		return [top, right, bottom, left];
	}

	// Bridge: read order/sm-order/md-order/lg-order attributes on each slotted
	// child and write them as --_slot-{attr} inline custom props on that child.
	// The container's @container queries pick the right one per breakpoint via
	// var() fallback. Inline style cannot itself host @container queries, so
	// this bridge exists to expose declarative attrs while letting CSS do the
	// breakpoint switching natively (no ResizeObserver).
	private _childObserver?: MutationObserver;

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._childObserver?.disconnect();
		this._childObserver = undefined;
	}

	_onSlotChange = (e: Event): void => {
		const slot = e.target as HTMLSlotElement;
		this._childObserver?.disconnect();
		this._childObserver = new MutationObserver(muts => {
			for (const m of muts) {
				if (m.target instanceof HTMLElement) this._applyOrderProps(m.target);
			}
		});
		for (const el of slot.assignedElements()) {
			if (!(el instanceof HTMLElement)) continue;
			this._applyOrderProps(el);
			this._childObserver.observe(el, { attributes: true, attributeFilter: [...ORDER_ATTRS] });
		}
	};

	private _applyOrderProps(el: HTMLElement): void {
		for (const attr of ORDER_ATTRS) {
			const v = el.getAttribute(attr);
			const prop = `--_slot-${attr}`;
			if (v !== null) el.style.setProperty(prop, v);
			else el.style.removeProperty(prop);
		}
	}

	override render() {
		return containerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-container': NLDDContainer;
	}
}

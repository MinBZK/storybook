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
 * The `reverse` boolean inverts item order within the chosen layout:
 *  - `stack` → `flex-direction: column-reverse`
 *  - `row` → `flex-direction: row-reverse`
 *  - `wrap` → `flex-direction: row-reverse` + `flex-wrap: wrap-reverse`
 *  - `grid` → falls back to flex (row-reverse + wrap-reverse + per-item
 *    `flex: 0 1 var(--_min-column-width)`) so the 2D order truly reverses;
 *    the last row no longer aligns to the grid track (the cost of leaving
 *    CSS grid for flex)
 *  - `columns` → no-op (multicol has no item-order hook)
 *
 * `sm-reverse` / `md-reverse` / `lg-reverse` enable reverse only at that
 * breakpoint. Combine with the base `reverse` (always on) or use the
 * scoped ones independently.
 *
 * @element nldd-container
 *
 * @attr {string}  layout                 - 'stack' | 'row' | 'wrap' | 'grid' | 'columns' (default: 'stack')
 * @attr {boolean} reverse                - Reverse the visual order of items
 * @attr {boolean} sm-reverse             - Reverse only at the sm breakpoint
 * @attr {boolean} md-reverse             - Reverse only at the md breakpoint
 * @attr {boolean} lg-reverse             - Reverse only at the lg breakpoint
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

	// Reverse the visual order of items within the chosen layout. For
	// stack/row/wrap this is native flex-direction reverse (+ wrap-reverse
	// for the 2D wrap case). For grid the host falls back to flex with
	// wrap-reverse so 2D reversal works; the trade-off is that the last
	// row no longer aligns to the grid track. For columns reverse is a
	// no-op — multicol items flow top→bottom inside each column with no
	// CSS hook to invert that.
	@property({ type: Boolean, reflect: true })
	reverse = false;

	@property({ type: Boolean, reflect: true, attribute: 'sm-reverse' })
	smReverse = false;

	@property({ type: Boolean, reflect: true, attribute: 'md-reverse' })
	mdReverse = false;

	@property({ type: Boolean, reflect: true, attribute: 'lg-reverse' })
	lgReverse = false;

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

		// Horizontal-axis layouts (row, wrap) put items on the main axis
		// horizontally; stack puts them on the main axis vertically. Grid
		// uses justify-items / align-items per cell — same horizontal/vertical
		// mapping as stack. Columns has no alignment hooks.
		const horizontalIsMainAxis = this.layout === 'row' || this.layout === 'wrap';
		const horizontal = this.horizontalAlignment ? HORIZONTAL_TO_FLEX[this.horizontalAlignment] : null;
		const vertical = this.verticalAlignment ? VERTICAL_TO_FLEX[this.verticalAlignment] : null;
		setProp('--_justify-content', horizontalIsMainAxis ? horizontal : vertical);
		setProp('--_align-items', horizontalIsMainAxis ? vertical : horizontal);

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

	override render() {
		return containerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-container': NLDDContainer;
	}
}

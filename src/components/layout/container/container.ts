/**
 * Nederlandse Digitale Dienst Container Component (Lit + TypeScript)
 *
 * A simple layout primitive: flex direction, gap, alignment, and padding.
 * Padding can be set for all sides, per axis (inline/block), or per individual side.
 * Specificity: per side > per axis > all sides.
 *
 * Responsive padding and gap have sm/md/lg variants. Each variant emits both
 * an @media (viewport) and @container (layout-container) query. When inside a
 * layout-container the @container query wins; otherwise the @media query
 * provides the viewport-based fallback.
 *
 * @element nldd-container
 *
 * @attr {string}  direction              - 'row' | 'column' (default: 'column')
 * @attr {boolean} wrap                   - Wrap children onto new lines (default: false)
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

type Direction = 'row' | 'column';
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
	// reflected direction="column" attribute. Absence resolves to column
	// in the styles (the unconditional :host default) and in
	// writeCustomProperties (isRow checks for 'row' specifically).
	@property({ type: String, reflect: true })
	direction?: Direction;

	@property({ type: Boolean, reflect: true })
	wrap = false;

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

		const isRow = this.direction === 'row';
		const horizontal = this.horizontalAlignment ? HORIZONTAL_TO_FLEX[this.horizontalAlignment] : null;
		const vertical = this.verticalAlignment ? VERTICAL_TO_FLEX[this.verticalAlignment] : null;
		setProp('--_justify-content', isRow ? horizontal : vertical);
		setProp('--_align-items', isRow ? vertical : horizontal);

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

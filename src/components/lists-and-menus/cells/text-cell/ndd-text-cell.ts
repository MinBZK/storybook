/**
 * Nederlandse Digitale Dienst Text Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying text content in lists with configurable
 * alignment, size and color. This is the most fundamental list cell component.
 *
 * ### Vertical alignment
 * `vertical-alignment="center"` (default) stretches the cell to fill the full
 * row height and centers its content within that space. Use `min-height` to set
 * a minimum centered region. For strict top alignment without a minimum height,
 * use `vertical-alignment="top"`.
 *
 * @element ndd-text-cell
 * @attr {string} size - Cell size: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Text color variant: 'default' | 'secondary' | 'inherit' (default: 'default')
 * @attr {'stretch' | 'fit-content' | number} width - Width of the cell (default: 'stretch')
 * @attr {number} min-width - Minimum width in pixels
 * @attr {number} max-width - Maximum width in pixels
 * @attr {number} min-height - Minimum height in pixels
 * @attr {string} horizontal-alignment - Horizontal alignment: 'left' | 'right' (default: 'left')
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' | 'bottom' (default: 'center')
 * @attr {boolean} selected - Selected state
 *
 * @attr {string} text - Main text content. Supports **bold** syntax for inline bold segments.
 * @attr {string} overline - Optional overline text displayed above the main content
 * @attr {string} supporting-text - Optional supporting text displayed below the main content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-text-cell.styles.ts';
import { template } from './ndd-text-cell.template.ts';

type Size = 'sm' | 'md';
type Color = 'default' | 'secondary' | 'inherit';
type Width = 'stretch' | 'fit-content';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

const widthConverter = {
	fromAttribute(value: string | null): string | number {
		if (value === null) return 'stretch';
		const num = Number(value);
		return Number.isFinite(num) ? num : value;
	},
	toAttribute(value: string | number): string {
		return String(value);
	},
};

@customElement('ndd-text-cell')
export class NDDTextCell extends LitElement {
	static override styles = [styles];

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	color: Color = 'default';

	@property({ reflect: true, converter: widthConverter })
	width: Width | number = 'stretch';

	@property({ type: Number, reflect: true, attribute: 'min-width' })
	minWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'max-width' })
	maxWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'min-height' })
	minHeight?: number;

	@property({ type: String, reflect: true, attribute: 'horizontal-alignment' })
	horizontalAlignment: HorizontalAlignment = 'left';

	@property({ type: String, reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: VerticalAlignment = 'center';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: String })
	text = '';

	@property({ type: String })
	overline = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	override updated(changed: Map<string, unknown>) {
		if (changed.has('width') || changed.has('minWidth') || changed.has('maxWidth') || changed.has('minHeight')) {
			this._applyDimensionStyles();
		}
	}

	/* eslint-disable eqeqeq -- != null is intentional: guards both null and undefined */
	private _applyDimensionStyles() {
		if (typeof this.width === 'number') {
			this.style.setProperty('--_width', `${this.width}px`);
		} else {
			this.style.removeProperty('--_width');
		}
		if (this.minWidth != null) {
			this.style.setProperty('--_min-width', `${this.minWidth}px`);
		} else {
			this.style.removeProperty('--_min-width');
		}
		if (this.maxWidth != null) {
			this.style.setProperty('--_max-width', `${this.maxWidth}px`);
		} else {
			this.style.removeProperty('--_max-width');
		}
		if (this.minHeight != null) {
			this.style.setProperty('--_min-height', `${this.minHeight}px`);
		} else {
			this.style.removeProperty('--_min-height');
		}
	}
	/* eslint-enable eqeqeq */

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-text-cell': NDDTextCell;
	}
}

/**
 * RegelRecht Text Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying text content in lists with configurable
 * alignment, size and color. This is the most fundamental list cell component.
 *
 * @element rr-text-cell
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
 * @slot overline - Optional overline text displayed above the main content
 * @slot text - Main text content
 * @slot - Fallback default slot for main text content
 * @slot supporting-text - Optional supporting text displayed below the main content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-text-cell.styles.ts';
import { template } from './rr-text-cell.template.ts';

type Size = 'sm' | 'md';
type Color = 'default' | 'secondary' | 'inherit';
type Width = 'stretch' | 'fit-content';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('rr-text-cell')
export class RrTextCell extends LitElement {
	static styles = [styles];

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	color: Color = 'default';

	@property({ reflect: true })
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

	override updated() {
		this._applyDimensionStyles();
	}

	private _applyDimensionStyles() {
		const numericWidth = Number(this.width);
		this.style.width = Number.isFinite(numericWidth) && this.width !== 'stretch' && this.width !== 'fit-content' ? `${numericWidth}px` : '';
		this.style.minWidth = this.minWidth != null ? `${this.minWidth}px` : '';
		this.style.maxWidth = this.maxWidth != null ? `${this.maxWidth}px` : '';
		this.style.minHeight = this.minHeight != null ? `${this.minHeight}px` : '';
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-text-cell': RrTextCell;
	}
}

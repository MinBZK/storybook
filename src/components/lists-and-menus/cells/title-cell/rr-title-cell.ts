/**
 * RegelRecht Title Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying a title with optional overline and subtitle in lists.
 * The heading level is semantically configurable independent of the visual size.
 *
 * @element rr-title-cell
 * @attr {1|2|3|4|5|6} level - Semantic heading level (default: 2)
 * @attr {1|2|3|4|5|6} size - Visual size of the title (default: 5)
 * @attr {'default' | 'inherit'} color - Text color variant (default: 'default')
 * @attr {'stretch' | 'fit-content' | number} width - Width of the cell (default: 'stretch')
 * @attr {number} min-width - Minimum width in pixels
 * @attr {number} max-width - Maximum width in pixels
 * @attr {number} min-height - Minimum height in pixels
 * @attr {'left' | 'right'} horizontal-alignment - Horizontal alignment (default: 'left')
 * @attr {'top' | 'center' | 'bottom'} vertical-alignment - Vertical alignment (default: 'center')
 * @attr {boolean} selected - Selected state
 *
 * @slot overline - Optional overline text displayed above the title
 * @slot - Title text content
 * @slot subtitle - Optional subtitle text displayed below the title
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-title-cell.styles.ts';
import { template } from './rr-title-cell.template.ts';

export type TitleCellSize = 1 | 2 | 3 | 4 | 5 | 6;
type Color = 'default' | 'inherit';
type Width = 'stretch' | 'fit-content';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('rr-title-cell')
export class RRTitleCell extends LitElement {
	static styles = [styles];

	@property({ type: Number, reflect: true })
	size: TitleCellSize = 5;

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
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-title-cell': RRTitleCell;
	}
}

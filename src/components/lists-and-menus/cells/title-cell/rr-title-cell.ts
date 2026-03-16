/**
 * RegelRecht Title Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying a title with optional overline and subtitle in lists.
 *
 * ### Vertical alignment
 * `vertical-alignment="center"` (default) stretches the cell to fill the full
 * row height and centers its content within that space. Use `min-height` to set
 * a minimum centered region. For strict top alignment without a minimum height,
 * use `vertical-alignment="top"`.
 *
 * @element rr-title-cell
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

const widthConverter = {
	fromAttribute(value: string | null, defaultValue: string | number = 'fit-content'): string | number {
		if (value === null) return defaultValue;
		const num = Number(value);
		return Number.isFinite(num) ? num : value;
	},
	toAttribute(value: string | number): string {
		return String(value);
	},
};

@customElement('rr-title-cell')
export class RRTitleCell extends LitElement {
	static override styles = [styles];

	@property({ type: Number, reflect: true })
	size: TitleCellSize = 5;

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

	override updated(changed: Map<string, unknown>) {
		if (changed.has('width') || changed.has('minWidth') || changed.has('maxWidth') || changed.has('minHeight')) {
			this._applyDimensionStyles();
		}
	}

	private _applyDimensionStyles() {
		if (typeof this.width === 'number') {
			this.style.width = `${this.width}px`;
		} else {
			this.style.width = '';
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

	override render() {
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-title-cell': RRTitleCell;
	}
}

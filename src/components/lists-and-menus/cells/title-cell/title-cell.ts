/**
 * Nederlandse Digitale Dienst Title Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying a title with optional overline and subtitle in lists.
 *
 * ### Vertical alignment
 * `vertical-alignment="center"` (default) stretches the cell to fill the full
 * row height and centers its content within that space. Use `min-height` to set
 * a minimum centered region. For strict top alignment without a minimum height,
 * use `vertical-alignment="top"`.
 *
 * @element nldd-title-cell
 * @attr {1|2|3|4|5|6} size - Visual size of the title (default: 5)
 * @attr {'default' | 'inherit'} color - Text color variant (default: 'default')
 * @attr {'stretch' | 'fit-content' | number} width - Width of the cell (default: 'stretch')
 * @attr {number} min-width - Minimum width in pixels
 * @attr {number} max-width - Maximum width in pixels
 * @attr {number} min-height - Minimum height in pixels
 * @attr {'left' | 'right'} horizontal-alignment - Horizontal alignment (default: 'left')
 * @attr {'top' | 'center' | 'bottom'} vertical-alignment - Vertical alignment (default: 'center')
 *
 * @attr {string} text - Title text content
 * @attr {string} overline - Optional overline text displayed above the title
 * @attr {string} supporting-text - Optional supporting text displayed below the title
 * @attr {number} heading-level - Heading level for the title element: 1–6 (default: none, renders a <p>)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './title-cell.styles.js';
import { template } from './title-cell.template.js';

export type TitleCellSize = 1 | 2 | 3 | 4 | 5 | 6;
type Color = 'default' | 'inherit';
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

@customElement('nldd-title-cell')
export class NLDDTitleCell extends LitElement {
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

	@property({ type: String })
	text = '';

	@property({ type: String })
	overline = '';

	@property({ type: String, attribute: 'supporting-text' })
	supportingText = '';

	/** Heading level for the title element (1–6). When not set, renders a <p>. */
	@property({ type: Number, attribute: 'heading-level' })
	headingLevel: number | undefined = undefined;

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
		'nldd-title-cell': NLDDTitleCell;
	}
}

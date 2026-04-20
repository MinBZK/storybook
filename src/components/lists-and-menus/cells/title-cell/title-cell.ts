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
 * @attr {string} width - 'stretch' | 'fit-content' | CSS length (e.g. '200px', '20rem'). Default: 'stretch'
 * @attr {string} min-width - Minimum width as CSS length (e.g. '80px', '5rem')
 * @attr {string} max-width - Maximum width as CSS length (e.g. '300px', '20rem')
 * @attr {string} min-height - Minimum height as CSS length (e.g. '44px', '3rem')
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
import { titleCellStyles } from './title-cell.styles.js';
import { template } from './title-cell.template.js';
import { VisibilityMixin } from '../../../../utilities/visibility-mixin.js';

export type TitleCellSize = 1 | 2 | 3 | 4 | 5 | 6;
type Color = 'default' | 'inherit';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('nldd-title-cell')
export class NLDDTitleCell extends VisibilityMixin(LitElement, 'list-item') {
	static override styles = [titleCellStyles];

	@property({ type: Number, reflect: true })
	size: TitleCellSize = 5;

	@property({ type: String, reflect: true })
	color: Color = 'default';

	/** 'stretch' | 'fit-content' | CSS length (e.g. '200px', '20rem'). */
	@property({ type: String, reflect: true })
	width: string = 'stretch';

	@property({ type: String, reflect: true, attribute: 'min-width' })
	minWidth?: string;

	@property({ type: String, reflect: true, attribute: 'max-width' })
	maxWidth?: string;

	@property({ type: String, reflect: true, attribute: 'min-height' })
	minHeight?: string;

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
		super.updated(changed);
		if (changed.has('width') || changed.has('minWidth') || changed.has('maxWidth') || changed.has('minHeight')) {
			this._applyDimensionStyles();
		}
	}

	private _applyDimensionStyles() {
		const widthIsKeyword = this.width === 'stretch' || this.width === 'fit-content';
		if (this.width && !widthIsKeyword) {
			this.style.setProperty('--_width', this.width);
		} else {
			this.style.removeProperty('--_width');
		}
		if (this.minWidth) {
			this.style.setProperty('--_min-width', this.minWidth);
		} else {
			this.style.removeProperty('--_min-width');
		}
		if (this.maxWidth) {
			this.style.setProperty('--_max-width', this.maxWidth);
		} else {
			this.style.removeProperty('--_max-width');
		}
		if (this.minHeight) {
			this.style.setProperty('--_min-height', this.minHeight);
		} else {
			this.style.removeProperty('--_min-height');
		}
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-title-cell': NLDDTitleCell;
	}
}

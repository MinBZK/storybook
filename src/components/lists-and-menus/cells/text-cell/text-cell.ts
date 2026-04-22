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
 * @element nldd-text-cell
 * @attr {string} size - Cell size: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Text color variant: 'default' | 'secondary' | 'inherit' (default: 'default')
 * @attr {string} width - 'stretch' | 'fit-content' | CSS length (e.g. '200px', '20rem'). Default: 'stretch'
 * @attr {string} min-width - Minimum width as CSS length (e.g. '80px', '5rem')
 * @attr {string} max-width - Maximum width as CSS length (e.g. '200px', '20rem')
 * @attr {string} min-height - Minimum height as CSS length (e.g. '44px', '3rem')
 * @attr {string} horizontal-alignment - Horizontal alignment: 'left' | 'right' (default: 'left')
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' | 'bottom' (default: 'center')
 *
 * @attr {string} text - Main text content. Supports **bold** syntax for inline bold segments.
 * @attr {string} overline - Optional overline text displayed above the main content. Supports **bold**.
 * @attr {string} supporting-text - Optional supporting text displayed below the main content. Supports **bold**.
 *
 * ### Search mark
 * Set `mark` to a query string to bold matching substrings in text, overline and
 * supporting-text. `mark-mode` selects the strategy:
 * - `'predictive'` (default): bolds the non-matched remainder — the ARIA APG
 *   pattern for combobox predictive completion.
 * - `'match'`: bolds the matched query — useful for search-result highlighting
 *   in longer text.
 *
 * When `mark` is set, `**bold**` markdown in the same field is ignored.
 *
 * @attr {string} mark - Query substring to bold-highlight across text fields. Empty = no marking.
 * @attr {string} mark-mode - 'match' | 'predictive' (default: 'predictive')
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { textCellStyles } from './text-cell.styles.js';
import { template } from './text-cell.template.js';
import { VisibilityMixin } from '../../../../utilities/visibility-mixin.js';
import type { MarkMode } from '../../../../utilities/render-marked.js';

type Size = 'sm' | 'md';
type Color = 'default' | 'secondary' | 'inherit';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('nldd-text-cell')
export class NLDDTextCell extends VisibilityMixin(LitElement) {
	static override styles = [textCellStyles];

	@property({ type: String, reflect: true })
	size: Size = 'md';

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

	@property({ type: String })
	mark = '';

	@property({ type: String, attribute: 'mark-mode' })
	markMode: MarkMode = 'predictive';

	override updated(changed: Map<string, unknown>) {
		super.updated(changed);
		if (changed.has('width') || changed.has('minWidth') || changed.has('maxWidth') || changed.has('minHeight')) {
			this._applyDimensionStyles();
		}
	}

	private _applyDimensionStyles() {
		// width's 'stretch' and 'fit-content' are handled via [width] attribute
		// selectors in CSS; any other value is a CSS length fed through --_width.
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
		'nldd-text-cell': NLDDTextCell;
	}
}

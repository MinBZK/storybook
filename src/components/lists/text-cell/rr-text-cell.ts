/**
 * RegelRecht Text Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying text content in lists with configurable
 * alignment, size and color. This is the most fundamental list cell component.
 *
 * @element rr-text-cell
 * @attr {string} size - Cell size: 'sm' | 'md' (default: 'md')
 * @attr {string} color - Text color variant: 'default' | 'secondary' (default: 'default')
 * @attr {string} width - Width: 'stretch' | 'fit-content' (default: 'stretch')
 * @attr {string} horizontal-alignment - Horizontal alignment: 'left' | 'right' (default: 'left')
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 * @attr {boolean} selected - Selected state
 *
 * @slot overline - Optional overline text displayed above the main content
 * @slot text - Main text content
 * @slot - Fallback default slot for main text content
 * @slot supporting-text - Optional supporting text displayed below the main content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-text-cell.styles.js';
import { template } from './rr-text-cell.template.js';

type Size = 'sm' | 'md';
type Color = 'default' | 'secondary';
type Width = 'stretch' | 'fit-content';
type HorizontalAlignment = 'left' | 'right';
type VerticalAlignment = 'top' | 'center';

@customElement('rr-text-cell')
export class RRTextCell extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	color: Color = 'default';

	@property({ type: String, reflect: true })
	width: Width = 'stretch';

	@property({ type: String, reflect: true, attribute: 'horizontal-alignment' })
	horizontalAlignment: HorizontalAlignment = 'left';

	@property({ type: String, reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: VerticalAlignment = 'center';

	@property({ type: Boolean, reflect: true })
	selected = false;

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-text-cell': RRTextCell;
	}
}

/**
 * RegelRecht Description Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying a title-description pair in lists.
 *
 * @element rr-description-cell
 * @attr {'stretch' | 'fit-content' | number} width - Width of the cell (default: 'stretch')
 * @attr {number} min-width - Minimum width in pixels
 * @attr {number} max-width - Maximum width in pixels
 * @attr {number} min-height - Minimum height in pixels
 * @attr {'top' | 'center' | 'bottom'} vertical-alignment - Vertical alignment (default: 'center')
 * @attr {boolean} selected - Selected state
 *
 * @slot title - The label displayed above the description
 * @slot description - The description content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-description-cell.styles.ts';
import { template } from './rr-description-cell.template.ts';

type Width = 'stretch' | 'fit-content';
type VerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('rr-description-cell')
export class RRDescriptionCell extends LitElement {
	static styles = [styles];

	@property({ reflect: true })
	width: Width | number = 'stretch';

	@property({ type: Number, reflect: true, attribute: 'min-width' })
	minWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'max-width' })
	maxWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'min-height' })
	minHeight?: number;

	@property({ reflect: true, attribute: 'vertical-alignment' })
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
		'rr-description-cell': RRDescriptionCell;
	}
}

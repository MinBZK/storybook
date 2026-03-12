import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-cell.styles.ts';
import { template } from './rr-cell.template.ts';

export type CellWidth = 'stretch' | 'fit-content';
export type CellVerticalAlignment = 'top' | 'center' | 'bottom';

/**
 * A generic cell for wrapping arbitrary content in a list item.
 * Controls vertical alignment and sizing without imposing content opinions.
 *
 * @element rr-cell
 * @attr {'stretch' | 'fit-content' | number} width - Width of the cell. A number sets a fixed pixel width. (default: 'fit-content')
 * @attr {number} min-width - Minimum width in pixels
 * @attr {number} max-width - Maximum width in pixels
 * @attr {number} min-height - Minimum height in pixels
 * @attr {'top' | 'center' | 'bottom'} vertical-alignment - Vertical alignment of slotted content (default: 'center')
 *
 * @slot - Default slot for any content (buttons, switches, icons, etc.)
 */
@customElement('rr-cell')
export class RrCell extends LitElement {
	static styles = [styles];

	@property({ reflect: true })
	width: CellWidth | number = 'fit-content';

	@property({ type: Number, reflect: true, attribute: 'min-width' })
	minWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'max-width' })
	maxWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'min-height' })
	minHeight?: number;

	@property({ reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: CellVerticalAlignment = 'center';

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
		'rr-cell': RrCell;
	}
}

/**
 * A generic cell for wrapping arbitrary content in a list item.
 * Controls vertical alignment and sizing without imposing content opinions.
 *
 * ### Vertical alignment
 * `vertical-alignment="center"` (default) stretches the cell to fill the full
 * row height and centers its content within that space. Use `min-height` to set
 * a minimum centered region. For strict top alignment without a minimum height,
 * use `vertical-alignment="top"`.
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
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-cell.styles.ts';
import { template } from './rr-cell.template.ts';

export type CellWidth = 'stretch' | 'fit-content';
export type CellVerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('rr-cell')
export class RRCell extends LitElement {
	static override styles = [styles];

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
		if (Number.isFinite(numericWidth) && this.width !== 'stretch' && this.width !== 'fit-content') {
			this.style.width = `${numericWidth}px`;
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
		'rr-cell': RRCell;
	}
}

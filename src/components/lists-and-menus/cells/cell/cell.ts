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
 * @element nldd-cell
 * @attr {string} width - 'stretch' | 'fit-content' | CSS length (e.g. '120px', '10rem'). Default: 'fit-content'
 * @attr {string} min-width - Minimum width as CSS length (e.g. '80px', '5rem')
 * @attr {string} max-width - Maximum width as CSS length (e.g. '200px', '20rem')
 * @attr {string} min-height - Minimum height as CSS length (e.g. '44px', '3rem')
 * @attr {'top' | 'center' | 'bottom'} vertical-alignment - Vertical alignment of slotted content (default: 'center')
 *
 * @slot - Default slot for any content (buttons, switches, icons, etc.)
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { cellStyles } from './cell.styles.js';
import { template } from './cell.template.js';
import { VisibilityMixin } from '../../../../utilities/visibility-mixin.js';

export type CellVerticalAlignment = 'top' | 'center' | 'bottom';

@customElement('nldd-cell')
export class NLDDCell extends VisibilityMixin(LitElement, 'list-item') {
	static override styles = [cellStyles];

	/** 'stretch' | 'fit-content' | CSS length (e.g. '120px', '10rem'). */
	@property({ type: String, reflect: true })
	width: string = 'fit-content';

	@property({ type: String, reflect: true, attribute: 'min-width' })
	minWidth?: string;

	@property({ type: String, reflect: true, attribute: 'max-width' })
	maxWidth?: string;

	@property({ type: String, reflect: true, attribute: 'min-height' })
	minHeight?: string;

	@property({ reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: CellVerticalAlignment = 'center';

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
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-cell': NLDDCell;
	}
}

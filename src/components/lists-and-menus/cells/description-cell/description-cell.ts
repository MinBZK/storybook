/**
 * Nederlandse Digitale Dienst Description Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying a title-description pair in lists.
 *
 * ### Vertical alignment
 * `vertical-alignment="center"` (default) stretches the cell to fill the full
 * row height and centers its content within that space. Use `min-height` to set
 * a minimum centered region. For strict top alignment without a minimum height,
 * use `vertical-alignment="top"`.
 *
 * @element nldd-description-cell
 * @attr {'stretch' | 'fit-content' | number} width - Width of the cell (default: 'stretch')
 * @attr {number} min-width - Minimum width in pixels
 * @attr {number} max-width - Maximum width in pixels
 * @attr {number} min-height - Minimum height in pixels
 * @attr {'top' | 'center' | 'bottom'} vertical-alignment - Vertical alignment (default: 'center')
 *
 * @slot title - The label displayed above the description
 * @slot description - The description content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './description-cell.styles.js';
import { template } from './description-cell.template.js';

type Width = 'stretch' | 'fit-content';
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

@customElement('nldd-description-cell')
export class NLDDDescriptionCell extends LitElement {
	static override styles = [styles];

	@property({ reflect: true, converter: widthConverter })
	width: Width | number = 'stretch';

	@property({ type: Number, reflect: true, attribute: 'min-width' })
	minWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'max-width' })
	maxWidth?: number;

	@property({ type: Number, reflect: true, attribute: 'min-height' })
	minHeight?: number;

	@property({ reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: VerticalAlignment = 'center';

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
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-description-cell': NLDDDescriptionCell;
	}
}

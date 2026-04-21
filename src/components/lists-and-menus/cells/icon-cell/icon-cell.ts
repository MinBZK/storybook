/**
 * Nederlandse Digitale Dienst Icon Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying icons in lists with configurable
 * alignment and size. Accepts an icon via the default slot.
 *
 * @element nldd-icon-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' | 'bottom' (default: 'center')
 * @attr {string} size - Size: '16' | '20' | '24' | '32' (default: '24')
 * @attr {string} color - Color: 'default' | 'inherit' (default: 'default')
 *
 * @slot - Default slot for icon content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { iconCellStyles } from './icon-cell.styles.js';
import { template } from './icon-cell.template.js';
import { VisibilityMixin } from '../../../../utilities/visibility-mixin.js';

type VerticalAlignment = 'top' | 'center' | 'bottom';
type Size = '16' | '20' | '24' | '32';
type Color = 'default' | 'inherit';

@customElement('nldd-icon-cell')
export class NLDDIconCell extends VisibilityMixin(LitElement) {
	static override styles = iconCellStyles;

	@property({ type: String, reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: VerticalAlignment = 'center';

	@property({ type: String, reflect: true })
	size: Size = '24';

	@property({ type: String, reflect: true })
	color: Color = 'default';

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-icon-cell': NLDDIconCell;
	}
}

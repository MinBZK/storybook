/**
 * RegelRecht Icon Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying icons in lists with configurable
 * alignment and size. Accepts an icon via the default slot.
 *
 * @element rr-icon-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 * @attr {string} size - Size: '16' | '20' | '24' | '32' (default: '24')
 * @attr {boolean} selected - Selected state
 *
 * @slot - Default slot for icon content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-icon-cell.styles.js';
import { template } from './rr-icon-cell.template.js';

type VerticalAlignment = 'top' | 'center';
type Size = '16' | '20' | '24' | '32';

@customElement('rr-icon-cell')
export class RRIconCell extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true, attribute: 'vertical-alignment' })
	verticalAlignment: VerticalAlignment = 'center';

	@property({ type: String, reflect: true })
	size: Size = '24';

	@property({ type: Boolean, reflect: true })
	selected = false;

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-icon-cell': RRIconCell;
	}
}

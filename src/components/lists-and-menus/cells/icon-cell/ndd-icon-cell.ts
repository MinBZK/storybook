/**
 * Nederlandse Digitale Dienst Icon Cell Component (Lit + TypeScript)
 *
 * A cell component for displaying icons in lists with configurable
 * alignment and size. Accepts an icon via the default slot.
 *
 * @element ndd-icon-cell
 * @attr {string} vertical-alignment - Vertical alignment: 'top' | 'center' (default: 'center')
 * @attr {string} size - Size: '16' | '20' | '24' | '32' (default: '24')
 * @attr {string} color - Color: 'default' | 'inherit' (default: 'default')
 *
 * @slot - Default slot for icon content
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-icon-cell.styles.js';
import { template } from './ndd-icon-cell.template.js';

type VerticalAlignment = 'top' | 'center';
type Size = '16' | '20' | '24' | '32';
type Color = 'default' | 'inherit';

@customElement('ndd-icon-cell')
export class NDDIconCell extends LitElement {
	static override styles = styles;

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
		'ndd-icon-cell': NDDIconCell;
	}
}

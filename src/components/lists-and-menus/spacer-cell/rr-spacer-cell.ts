/**
 * RegelRecht Spacer Cell Component (Lit + TypeScript)
 *
 * A cell component that provides fixed horizontal spacing within list items.
 *
 * @element rr-spacer-cell
 * @attr {string} size - Spacer size in pixels: '2' | '4' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96' (default: '16')
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-spacer-cell.styles.js';

type Size = '2' | '4' | '6' | '8' | '10' | '12' | '16' | '20' | '24' | '28' | '32' | '40' | '44' | '48' | '56' | '64' | '80' | '96' | 'flexible';

@customElement('rr-spacer-cell')
export class RRSpacerCell extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	size: Size = '16';

	override render() {
		return null;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-spacer-cell': RRSpacerCell;
	}
}

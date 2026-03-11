/**
 * RegelRecht Divider Component (Lit + TypeScript)
 *
 * Een scheidingslijn die secties van inhoud visueel van elkaar scheidt.
 *
 * @element rr-divider
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dividerStyles } from './rr-divider.styles.ts';
import { dividerTemplate } from './rr-divider.template.ts';

@customElement('rr-divider')
export class RRDivider extends LitElement {
	static override styles = dividerStyles;

	override render() {
		return dividerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-divider': RRDivider;
	}
}

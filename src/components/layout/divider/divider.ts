/**
 * Nederlandse Digitale Dienst Divider Component (Lit + TypeScript)
 *
 * Een scheidingslijn die secties van inhoud visueel van elkaar scheidt.
 *
 * @element ndd-divider
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dividerStyles } from './ndd-divider.styles.ts';
import { dividerTemplate } from './ndd-divider.template.ts';

@customElement('ndd-divider')
export class NDDDivider extends LitElement {
	static override styles = dividerStyles;

	override render() {
		return dividerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-divider': NDDDivider;
	}
}

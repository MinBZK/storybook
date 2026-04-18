/**
 * Nederlandse Digitale Dienst Divider Component (Lit + TypeScript)
 *
 * Een scheidingslijn die secties van inhoud visueel van elkaar scheidt.
 *
 * @element nldd-divider
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { dividerStyles } from './divider.styles.ts';
import { dividerTemplate } from './divider.template.ts';

@customElement('nldd-divider')
export class NLDDDivider extends LitElement {
	static override styles = dividerStyles;

	override render() {
		return dividerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-divider': NLDDDivider;
	}
}

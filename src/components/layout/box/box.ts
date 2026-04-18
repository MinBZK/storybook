/**
 * Nederlandse Digitale Dienst Box Component (Lit + TypeScript)
 *
 * Use a box to visually group related components in a distinct, contained region.
 * Boxes draw attention to a set of controls or content that belong together,
 * helping users understand their relationship at a glance.
 *
 * @element ndd-box
 * @slot - Place components inside the box
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { boxStyles } from './ndd-box.styles.ts';
import { boxTemplate } from './ndd-box.template.ts';

@customElement('ndd-box')
export class NDDBox extends LitElement {
	static override styles = boxStyles;

	override render() {
		return boxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-box': NDDBox;
	}
}

/**
 * Nederlandse Digitale Dienst Box Component (Lit + TypeScript)
 *
 * Use a box to visually group related components in a distinct, contained region.
 * Boxes draw attention to a set of controls or content that belong together,
 * helping users understand their relationship at a glance.
 *
 * @element nldd-box
 * @slot - Place components inside the box
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { boxStyles } from './box.styles.js';
import { boxTemplate } from './box.template.js';

@customElement('nldd-box')
export class NLDDBox extends LitElement {
	static override styles = boxStyles;

	override render() {
		return boxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-box': NLDDBox;
	}
}

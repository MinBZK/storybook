/**
 * RegelRecht Box Component (Lit + TypeScript)
 *
 * Use a box to visually group related components in a distinct, contained region.
 * Boxes draw attention to a set of controls or content that belong together,
 * helping users understand their relationship at a glance.
 *
 * @element rr-box
 * @slot - Place components inside the box
 */
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { boxStyles } from './rr-box.styles.ts';
import { boxTemplate } from './rr-box.template.ts';

@customElement('rr-box')
export class RRBox extends LitElement {
	static override styles = boxStyles;

	override render() {
		return boxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-box': RRBox;
	}
}

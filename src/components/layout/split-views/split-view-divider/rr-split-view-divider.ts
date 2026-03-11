/**
 * RegelRecht Split View Divider Component (Lit + TypeScript)
 *
 * Een scheidingslijn tussen panelen in een split view.
 * De verdeler loopt van rand tot rand in de richting die loodrecht staat op
 * de oriëntatie. Een optioneel sleephandvat geeft aan dat de verdeler
 * versleepbaar is (toekomstige functionaliteit).
 *
 * @element rr-split-view-divider
 *
 * @attr {string} orientation - Oriëntatie: 'vertical' | 'horizontal'
 * @attr {boolean} has-drag-handle - Toon een sleephandvat
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { splitViewDividerStyles } from './rr-split-view-divider.styles.ts';
import { splitViewDividerTemplate } from './rr-split-view-divider.template.ts';

type Orientation = 'vertical' | 'horizontal';

@customElement('rr-split-view-divider')
export class RRSplitViewDivider extends LitElement {
	static override styles = splitViewDividerStyles;

	@property({ type: String, reflect: true })
	orientation: Orientation = 'vertical';

	@property({ type: Boolean, reflect: true, attribute: 'has-drag-handle' })
	hasDragHandle = false;

	override render() {
		return splitViewDividerTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-split-view-divider': RRSplitViewDivider;
	}
}

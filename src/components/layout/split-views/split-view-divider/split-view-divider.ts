/**
 * Nederlandse Digitale Dienst Split View Divider Component (Lit + TypeScript)
 *
 * A divider line between panels in a split view.
 * The divider runs from edge to edge in the direction perpendicular to
 * the orientation. An optional drag handle indicates that the divider
 * is draggable (future functionality).
 *
 * @element ndd-split-view-divider
 *
 * @attr {string} orientation - Orientation: 'vertical' | 'horizontal'
 * @attr {boolean} has-drag-handle - Show a drag handle
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { splitViewDividerStyles } from './ndd-split-view-divider.styles.ts';
import { splitViewDividerTemplate } from './ndd-split-view-divider.template.ts';

type Orientation = 'vertical' | 'horizontal';

@customElement('ndd-split-view-divider')
export class NDDSplitViewDivider extends LitElement {
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
		'ndd-split-view-divider': NDDSplitViewDivider;
	}
}

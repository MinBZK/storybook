import { html, TemplateResult } from 'lit';
import type { NLDDContainer } from './container.js';

export function containerTemplate(component: NLDDContainer): TemplateResult {
	// Inner .container holds the layout (display, grid, flex, columns). The
	// :host stays the padding wrapper + the query container (container-type:
	// inline-size). CSS spec forbids an element from matching its own
	// container queries, so the layout rules live on a descendant of :host.
	return html`<div class="container"><slot @slotchange=${component._onSlotChange}></slot></div>`;
}

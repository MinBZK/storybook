import { html, nothing } from 'lit';
import type { NLDDTextCell } from './text-cell.js';
import { renderMarked } from '../../../../utilities/render-marked.js';

export function template(this: NLDDTextCell) {
	return html`
		${this.overline ? html`<p class="text-cell__overline">${renderMarked(this.overline, this.mark, this.markMode)}</p>` : nothing}
		${this.text ? html`<p class="text-cell__text">${renderMarked(this.text, this.mark, this.markMode)}</p>` : nothing}
		${this.supportingText ? html`<p class="text-cell__supporting-text">${renderMarked(this.supportingText, this.mark, this.markMode)}</p>` : nothing}
	`;
}

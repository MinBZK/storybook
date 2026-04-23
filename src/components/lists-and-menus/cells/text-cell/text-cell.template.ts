import { html, nothing } from 'lit';
import type { NLDDTextCell } from './text-cell.js';
import { renderQueryMark } from '../../../../utilities/render-marked.js';

export function template(this: NLDDTextCell) {
	return html`
		${this.overline ? html`<p class="text-cell__overline">${renderQueryMark(this.overline, this.query, this.queryMarkMode)}</p>` : nothing}
		${this.text ? html`<p class="text-cell__text">${renderQueryMark(this.text, this.query, this.queryMarkMode)}</p>` : nothing}
		${this.supportingText ? html`<p class="text-cell__supporting-text">${renderQueryMark(this.supportingText, this.query, this.queryMarkMode)}</p>` : nothing}
	`;
}

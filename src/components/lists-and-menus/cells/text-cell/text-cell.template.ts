import { html, nothing } from 'lit';
import type { NLDDTextCell } from './text-cell.js';
import { renderMarked } from '../../../../utilities/render-marked.js';

function renderField(text: string, mark: string, mode: 'match' | 'predictive') {
	return mark ? renderMarked(text, mark, mode) : renderMarked(text, '');
}

export function template(this: NLDDTextCell) {
	return html`
		${this.overline ? html`<p class="text-cell__overline">${renderField(this.overline, this.mark, this.markMode)}</p>` : nothing}
		${this.text ? html`<p class="text-cell__text">${renderField(this.text, this.mark, this.markMode)}</p>` : nothing}
		${this.supportingText ? html`<p class="text-cell__supporting-text">${renderField(this.supportingText, this.mark, this.markMode)}</p>` : nothing}
	`;
}

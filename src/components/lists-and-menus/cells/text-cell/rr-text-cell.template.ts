import { html, nothing } from 'lit';
import type { RRTextCell } from './rr-text-cell.js';

function renderText(text: string) {
	if (!text.includes('**')) return text;
	const parts = text.split(/\*\*(.+?)\*\*/g);
	return html`${parts.map((part, i) => i % 2 === 1 ? html`<b>${part}</b>` : part)}`;
}

export function template(this: RRTextCell) {
	return html`
		${this.overline ? html`<p class="text-cell__overline">${this.overline}</p>` : nothing}
		${this.text ? html`<p class="text-cell__text">${renderText(this.text)}</p>` : nothing}
		${this.supportingText ? html`<p class="text-cell__supporting-text">${this.supportingText}</p>` : nothing}
	`;
}

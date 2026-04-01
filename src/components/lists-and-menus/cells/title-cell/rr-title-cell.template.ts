import { html, nothing } from 'lit';
import { unsafeStatic } from 'lit/static-html.js';
import { html as staticHtml } from 'lit/static-html.js';
import type { RRTitleCell } from './rr-title-cell.js';

function renderTitle(component: RRTitleCell) {
	if (!component.text) return nothing;

	const level = component.headingLevel;
	if (level != null && Number.isInteger(level) && level >= 1 && level <= 6) {
		// SAFETY: unsafeStatic is safe here because level is validated to integers 1–6.
		// Do not use unsafeStatic with unvalidated input — it is an XSS vector.
		const tag = unsafeStatic(`h${level}`);
		return staticHtml`<${tag} class="title-cell__title">${component.text}</${tag}>`;
	}

	return html`<p class="title-cell__title">${component.text}</p>`;
}

export const template = function (this: RRTitleCell) {
	return html`
		${this.overline ? html`<p class="title-cell__overline">${this.overline}</p>` : nothing}
		${renderTitle(this)}
		${this.supportingText ? html`<p class="title-cell__supporting-text">${this.supportingText}</p>` : nothing}
	`;
};

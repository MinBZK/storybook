import { html, nothing } from 'lit';
import { unsafeStatic } from 'lit/static-html.js';
import { html as staticHtml } from 'lit/static-html.js';
import type { RRTitleCell } from './rr-title-cell.js';

function renderTitle(component: RRTitleCell) {
	if (!component.text) return nothing;

	if (component.headingLevel && component.headingLevel >= 1 && component.headingLevel <= 6) {
		const tag = unsafeStatic(`h${component.headingLevel}`);
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

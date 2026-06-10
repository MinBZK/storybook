import { html, nothing } from 'lit';
import type { NLDDStatusBar } from './status-bar.js';

export function statusBarTemplate(component: NLDDStatusBar) {
	const interactive = Boolean(component.href || component.action);
	const content = html`
		<span class="status-bar__text">${component.text}</span>
		${interactive ? html`
			<span class="status-bar__end-icon" aria-hidden="true">
				<nldd-icon name="chevron-right-small"></nldd-icon>
			</span>
		` : nothing}
	`;
	if (component.href) {
		return html`
			<a class="status-bar"
				href=${component.href}
				target=${component.target || nothing}
				rel=${component._resolvedRel() || nothing}
			>${content}</a>
		`;
	}
	if (component.action) {
		return html`
			<button class="status-bar"
				type="button"
			>${content}</button>
		`;
	}
	return html`<div class="status-bar">${content}</div>`;
}

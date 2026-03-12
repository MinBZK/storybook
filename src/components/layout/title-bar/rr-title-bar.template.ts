import { html, nothing, TemplateResult } from 'lit';
import type { RRTitleBar } from './rr-title-bar.js';

function headingTemplate(level: number, content: TemplateResult) {
	switch (level) {
		case 2: return html`<h2 class="title-bar__title">${content}</h2>`;
		case 3: return html`<h3 class="title-bar__title">${content}</h3>`;
		case 4: return html`<h4 class="title-bar__title">${content}</h4>`;
		case 5: return html`<h5 class="title-bar__title">${content}</h5>`;
		case 6: return html`<h6 class="title-bar__title">${content}</h6>`;
		default: return html`<h1 class="title-bar__title">${content}</h1>`;
	}
}

export function titleBarTemplate(component: RRTitleBar): TemplateResult {
	return html`
		<div class="title-bar">
			<div class="title-bar__title-group">
				${component.overline
					? html`<p class="title-bar__overline">${component.overline}</p>`
					: nothing}
				${headingTemplate(component.level, html`<slot></slot>`)}
				${component.subtitle
					? html`<p class="title-bar__subtitle">${component.subtitle}</p>`
					: nothing}
			</div>
			<div class="title-bar__actions">
				<slot name="actions"></slot>
			</div>
		</div>
	`;
}

import { html, TemplateResult } from 'lit';
import type { RRAppView } from './rr-app-view.js';

export function appViewTemplate(_component: RRAppView): TemplateResult {
	return html`
		<div class="app-view">
			<slot></slot>
		</div>
	`;
}

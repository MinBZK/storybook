import { html, TemplateResult } from 'lit';
import type { NDDAppView } from './ndd-app-view.ts';

export function appViewTemplate(_component: NDDAppView): TemplateResult {
	return html`
		<div class="app-view">
			<slot></slot>
		</div>
	`;
}

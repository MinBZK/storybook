import { html, TemplateResult } from 'lit';
import type { NLDDAppView } from './app-view.ts';

export function appViewTemplate(_component: NLDDAppView): TemplateResult {
	return html`
		<div class="app-view">
			<slot></slot>
		</div>
	`;
}

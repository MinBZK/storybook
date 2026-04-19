import { html, TemplateResult } from 'lit';
import type { NLDDContainer } from './container.js';

export function containerTemplate(_component: NLDDContainer): TemplateResult {
	return html`
		<div class="container">
			<slot></slot>
		</div>
	`;
}

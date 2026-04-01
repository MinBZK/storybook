import { html, TemplateResult } from 'lit';
import type { NDDContainer } from './ndd-container.ts';

export function containerTemplate(component: NDDContainer): TemplateResult {
	return html`
		<div class="container">
			<slot></slot>
		</div>
	`;
}

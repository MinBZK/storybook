import { html, TemplateResult } from 'lit';
import type { NDDDivider } from './ndd-divider.js';

export function dividerTemplate(component: NDDDivider): TemplateResult {
	return html`
		<hr class="divider">
	`;
}

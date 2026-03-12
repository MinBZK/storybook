import { html, TemplateResult } from 'lit';
import type { RRDivider } from './rr-divider.js';

export function dividerTemplate(component: RRDivider): TemplateResult {
	return html`
		<hr class="divider">
	`;
}

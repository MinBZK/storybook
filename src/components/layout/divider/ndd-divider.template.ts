import { html, TemplateResult } from 'lit';
import type { NDDDivider } from './ndd-divider.js';

export function dividerTemplate(_component: NDDDivider): TemplateResult {
	return html`
		<hr class="divider">
	`;
}

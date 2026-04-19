import { html, TemplateResult } from 'lit';
import type { NLDDDivider } from './divider.js';

export function dividerTemplate(_component: NLDDDivider): TemplateResult {
	return html`
		<hr class="divider">
	`;
}

import { html, TemplateResult } from 'lit';
import type { RRBox } from './rr-box.js';

export function boxTemplate(component: RRBox): TemplateResult {
	return html`
		<div class="box">
			<slot></slot>
		</div>
	`;
}

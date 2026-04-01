import { html, TemplateResult } from 'lit';
import type { NDDBox } from './ndd-box.js';

export function boxTemplate(component: NDDBox): TemplateResult {
	return html`
		<div class="box">
			<slot></slot>
		</div>
	`;
}

import { html, TemplateResult } from 'lit';
import type { NLDDBox } from './box.js';

export function boxTemplate(_component: NLDDBox): TemplateResult {
	return html`
		<div class="box">
			<slot></slot>
		</div>
	`;
}

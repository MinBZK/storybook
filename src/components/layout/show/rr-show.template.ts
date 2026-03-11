import { html, TemplateResult } from 'lit';
import type { RRShow } from './rr-show.js';

export function showTemplate(component: RRShow): TemplateResult {
	return html`<div class="show"><slot></slot></div>`;
}

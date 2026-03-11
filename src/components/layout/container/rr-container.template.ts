import { html, TemplateResult } from 'lit';
import type { RRContainer } from './rr-container.ts';

export function containerTemplate(component: RRContainer): TemplateResult {
	return html`<slot></slot>`;
}

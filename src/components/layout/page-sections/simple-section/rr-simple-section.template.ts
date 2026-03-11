import { html, TemplateResult } from 'lit';
import type { RRSimpleSection } from './rr-simple-section.js';

export function simpleSectionTemplate(component: RRSimpleSection): TemplateResult {
	return html`
		<section class="section">
			<div class="section__body">
				<slot name="header"></slot>
				<slot></slot>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

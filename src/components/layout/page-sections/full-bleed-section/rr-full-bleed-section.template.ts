import { html, TemplateResult } from 'lit';
import type { RRFullBleedSection } from './rr-full-bleed-section.js';

export function fullBleedSectionTemplate(component: RRFullBleedSection): TemplateResult {
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

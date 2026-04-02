import { html, TemplateResult } from 'lit';
import type { NDDSimpleSection } from './ndd-simple-section.js';

export function simpleSectionTemplate(_component: NDDSimpleSection): TemplateResult {
	return html`
		<section class="simple-section">
			<div class="simple-section__body">
				<slot name="header"></slot>
				<slot></slot>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

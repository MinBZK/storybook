import { html, TemplateResult } from 'lit';
import type { NDDFullBleedSection } from './ndd-full-bleed-section.js';

export function fullBleedSectionTemplate(_component: NDDFullBleedSection): TemplateResult {
	return html`
		<section class="full-bleed-section">
			<div class="full-bleed-section__body">
				<slot name="header"></slot>
				<slot></slot>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

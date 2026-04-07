import { html, TemplateResult } from 'lit';
import type { NDDFullBleedSection } from './ndd-full-bleed-section.js';

export function fullBleedSectionTemplate(_component: NDDFullBleedSection): TemplateResult {
	return html`
		<section class="full-bleed-section">
			<div class="full-bleed-section__body">
				<header class="full-bleed-section__header">
					<slot name="header"></slot>
				</header>
				<div class="full-bleed-section__main">
					<slot></slot>
				</div>
				<footer class="full-bleed-section__footer">
					<slot name="footer"></slot>
				</footer>
			</div>
		</section>
	`;
}

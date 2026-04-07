import { html, TemplateResult } from 'lit';
import type { NDDSimpleSection } from './ndd-simple-section.js';

export function simpleSectionTemplate(_component: NDDSimpleSection): TemplateResult {
	return html`
		<section class="simple-section">
			<div class="simple-section__body">
				<header class="simple-section__header">
					<slot name="header"></slot>
				</header>
				<div class="simple-section__main">
					<slot></slot>
				</div>
				<footer class="simple-section__footer">
					<slot name="footer"></slot>
				</footer>
			</div>
		</section>
	`;
}

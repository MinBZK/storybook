import { html, TemplateResult } from 'lit';
import type { RROneThirdTwoThirdsSection } from './rr-one-third-two-thirds-section.js';

export function oneThirdTwoThirdsSectionTemplate(component: RROneThirdTwoThirdsSection): TemplateResult {
	return html`
		<section class="section">
			<div class="section__body">
				<slot name="header"></slot>
				<div class="section__columns">
					<aside class="section__aside">
						<slot name="aside"></slot>
					</aside>
					<div class="section__main">
						<slot></slot>
					</div>
				</div>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

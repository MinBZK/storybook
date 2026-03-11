import { html, TemplateResult } from 'lit';
import type { RRTwoThirdsOneThirdSection } from './rr-two-thirds-one-third-section.js';

export function twoThirdsOneThirdSectionTemplate(component: RRTwoThirdsOneThirdSection): TemplateResult {
	return html`
		<section class="section">
			<div class="section__body">
				<slot name="header"></slot>
				<div class="section__columns">
					<div class="section__main">
						<slot></slot>
					</div>
					<aside class="section__aside">
						<slot name="aside"></slot>
					</aside>
				</div>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

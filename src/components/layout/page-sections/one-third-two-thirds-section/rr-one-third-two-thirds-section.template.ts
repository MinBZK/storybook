import { html, TemplateResult } from 'lit';
import type { RROneThirdTwoThirdsSection } from './rr-one-third-two-thirds-section.js';

export function oneThirdTwoThirdsSectionTemplate(component: RROneThirdTwoThirdsSection): TemplateResult {
	return html`
		<section class="section">
			<div class="section__body">
				<slot name="header"></slot>
				<div class="section__columns">
					<div class="section__right-column">
						<slot name="right"></slot>
					</div>
					<div class="section__left-column">
						<slot></slot>
						<slot name="left"></slot>
					</div>
				</div>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

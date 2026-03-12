import { html, TemplateResult } from 'lit';
import type { RROneThirdTwoThirdsSection } from './rr-one-third-two-thirds-section.js';

export function oneThirdTwoThirdsSectionTemplate(component: RROneThirdTwoThirdsSection): TemplateResult {
	return html`
		<section class="one-third-two-thirds-section">
			<div class="one-third-two-thirds-section__body">
				<slot name="header"></slot>
				<div class="one-third-two-thirds-section__columns">
					<div class="one-third-two-thirds-section__left-column">
						<slot name="left"></slot>
					</div>
					<div class="one-third-two-thirds-section__right-column">
						<slot></slot>
						<slot name="right"></slot>
					</div>
				</div>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

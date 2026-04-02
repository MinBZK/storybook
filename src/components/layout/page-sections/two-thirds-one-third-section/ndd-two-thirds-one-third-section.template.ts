import { html, TemplateResult } from 'lit';
import type { NDDTwoThirdsOneThirdSection } from './ndd-two-thirds-one-third-section.js';

export function twoThirdsOneThirdSectionTemplate(_component: NDDTwoThirdsOneThirdSection): TemplateResult {
	return html`
		<section class="two-thirds-one-third-section">
			<div class="two-thirds-one-third-section__body">
				<slot name="header"></slot>
				<div class="two-thirds-one-third-section__columns">
					<div class="two-thirds-one-third-section__left-column">
						<slot></slot>
						<slot name="left"></slot>
					</div>
					<div class="two-thirds-one-third-section__right-column">
						<slot name="right"></slot>
					</div>
				</div>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

import { html, TemplateResult } from 'lit';
import type { RROneHalfOneHalfSection } from './rr-one-half-one-half-section.js';

export function oneHalfOneHalfSectionTemplate(component: RROneHalfOneHalfSection): TemplateResult {
	return html`
		<section class="section">
			<div class="section__body">
				<slot name="header"></slot>
				<div class="section__columns">
					<div class="section__left-column">
						<slot></slot>
						<slot name="left"></slot>
					</div>
					<div class="section__right-column">
						<slot name="right"></slot>
					</div>
				</div>
				<slot name="footer"></slot>
			</div>
		</section>
	`;
}

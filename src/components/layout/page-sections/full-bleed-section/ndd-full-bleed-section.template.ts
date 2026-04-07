import { html, TemplateResult } from 'lit';
import type { NDDFullBleedSection } from './ndd-full-bleed-section.js';

export function fullBleedSectionTemplate(component: NDDFullBleedSection): TemplateResult {
	return html`
		<section class="full-bleed-section">
			<div class="full-bleed-section__body">
				<header class="full-bleed-section__header" hidden>
					<slot name="header" @slotchange=${component._onSlotChange}></slot>
				</header>
				<div class="full-bleed-section__main">
					<slot></slot>
				</div>
				<footer class="full-bleed-section__footer" hidden>
					<slot name="footer" @slotchange=${component._onSlotChange}></slot>
				</footer>
			</div>
		</section>
	`;
}

import { html, TemplateResult } from 'lit';
import type { NLDDHero } from './hero.js';

export function heroTemplate(component: NLDDHero): TemplateResult {
	return html`
		<section class="hero">
			<div class="hero__body">
				<div class="hero__figure">
					<div class="hero__media"
						?hidden=${!component._hasMedia}
					>
						<slot name="media" @slotchange=${component._onMediaSlotChange}></slot>
					</div>
					<div class="hero__main">
						<slot></slot>
					</div>
				</div>
			</div>
		</section>
	`;
}

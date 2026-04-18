import { html, nothing, TemplateResult } from 'lit';
import type { NLDDCard } from './card.js';

export function cardTemplate(component: NLDDCard): TemplateResult {
	return html`
		<article class="card"
			aria-label=${component.accessibleLabel ?? nothing}
		>
			<header class="card__header"
				hidden
			>
				<slot name="header"
					@slotchange=${component._onSlotChange}
				></slot>
			</header>
			<div class="card__main">
				<slot></slot>
			</div>
			<footer class="card__footer"
				hidden
			>
				<slot name="footer"
					@slotchange=${component._onSlotChange}
				></slot>
			</footer>
		</article>
	`;
}

import { html, nothing } from 'lit';
import type { NLDDTag } from './tag.js';

export function template(component: NLDDTag) {
	// Use _hasIcon (covers icon prop én slot="icon") zodat slotted-icon-only
	// tags ook role="img" + aria-label krijgen — zonder dit zou een tag met
	// slot="icon" en accessible-label maar geen tekst geen accessible name
	// hebben (SR kondigt niks aan).
	const iconOnly = component._hasIcon && !component._hasText && !!component.accessibleLabel;
	return html`
		<span class="tag"
			role=${iconOnly ? 'img' : nothing}
			aria-label=${iconOnly ? component.accessibleLabel : nothing}
		>
			${component._hasIcon ? html`
				<span class="tag__icon">
					${component.icon
						? html`<nldd-icon name=${component.icon}></nldd-icon>`
						: html`<slot name="icon"></slot>`}
				</span>
			` : nothing}
			${component._hasText ? html`
				<span class="tag__text">
					${component.text ? component.text : html`<slot></slot>`}
				</span>
			` : nothing}
		</span>
	`;
}

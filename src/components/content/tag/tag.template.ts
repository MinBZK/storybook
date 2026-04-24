import { html, nothing } from 'lit';
import type { NLDDTag } from './tag.js';

export function template(component: NLDDTag) {
	return html`
		<span class="tag"
			aria-label=${component.accessibleLabel || nothing}
		>
			${component.icon ? html`
				<span class="tag__icon">
					<nldd-icon name=${component.icon}></nldd-icon>
				</span>
			` : html`<slot name="icon"></slot>`}
			<span class="tag__text">
				${component.text ? component.text : html`<slot></slot>`}
			</span>
		</span>
	`;
}

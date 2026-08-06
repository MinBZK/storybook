import { html, nothing, TemplateResult } from 'lit';
import type { NLDDRadioButton } from './radio-button.js';

export function radioButtonTemplate(component: NLDDRadioButton): TemplateResult {
	// Decorative: the shape only. Something else owns the interaction and the
	// state — a whole row that is itself the control, say — and an input here
	// would be a second control inside it.
	if (component.decorative) {
		return html`
			<div class="radio-button__outer-shape" aria-hidden="true">
				<div class="radio-button__inner-shape"></div>
			</div>
		`;
	}
	return html`
		<input class="radio-button__input"
			type="radio"
			.checked=${component.checked}
			?disabled=${component.disabled}
			?required=${component.required}
			name=${component.name || ''}
			value=${component.value}
			aria-label=${component.accessibleLabel || nothing}
			@change=${component._handleChange}
		>
		<div class="radio-button__outer-shape"
			aria-hidden="true"
		>
			<div class="radio-button__inner-shape"></div>
		</div>
	`;
}

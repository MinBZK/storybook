import { html, nothing, TemplateResult } from 'lit';
import type { NDDRadioButton } from './ndd-radio-button.js';

export function radioButtonTemplate(component: NDDRadioButton): TemplateResult {
	return html`
		<input
			class="radio-button__input"
			type="radio"
			.checked=${component.checked}
			?disabled=${component.disabled}
			?required=${component.required}
			name=${component.name || ''}
			value=${component.value}
			aria-label=${component.accessibleLabel || nothing}
			@change=${component._handleChange}
		/>
		<div class="radio-button__outer-shape" aria-hidden="true">
			<div class="radio-button__inner-shape"></div>
		</div>
	`;
}

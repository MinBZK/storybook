import { html, nothing, TemplateResult } from 'lit';
import type { RRRadioButton } from './rr-radio-button.js';

export function radioButtonTemplate(component: RRRadioButton): TemplateResult {
	return html`
		<input class="radio-button__input"
			type="radio"
			.checked=${component.checked}
			?disabled=${component.disabled}
			name=${component.name || ''}
			value=${component.value}
			aria-label=${component.ariaLabel || nothing}
			aria-labelledby=${component.ariaLabelledby || nothing}
			@change=${component._handleChange}
		>
		<div class="radio-button__outer-shape" aria-hidden="true">
			<div class="radio-button__inner-shape"></div>
		</div>
	`;
}

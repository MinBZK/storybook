import { html, nothing, TemplateResult } from 'lit';
import type { RRRadioButtonField } from './rr-radio-button-field.js';
import '../radio-button/rr-radio-button.ts';

export function radioButtonFieldTemplate(component: RRRadioButtonField): TemplateResult {
	return html`
		<div class="radio-button-field"
			@click=${component._handleLabelClick}
		>
			<div class="radio-button-field__control">
				<rr-radio-button
					?checked=${component.checked}
					?disabled=${component.disabled}
					?required=${component.required}
					name=${component.name || ''}
					value=${component.value}
					accessible-label=${component.label || nothing}
					@change=${component._handleChange}
				></rr-radio-button>
			</div>
			<span class="radio-button-field__label">${component.label}</span>
		</div>
	`;
}

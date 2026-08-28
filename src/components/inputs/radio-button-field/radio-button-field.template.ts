import { html, nothing, TemplateResult } from 'lit';
import type { NLDDRadioButtonField } from './radio-button-field.js';
import '../radio-button/radio-button.js';

/* eslint-disable lit-a11y/click-events-have-key-events -- label wrapper delegates to inner radio button */
export function radioButtonFieldTemplate(component: NLDDRadioButtonField): TemplateResult {
	return html`
		<div class="radio-button-field"
			@click=${component._handleLabelClick}
		>
			<div class="radio-button-field__control">
				<nldd-radio-button
					?invalid=${component.invalid}
					?checked=${component.checked}
					?disabled=${component.disabled}
					?required=${component.required}
					name=${component.name || ''}
					value=${component.value}
					accessible-label=${component.label || nothing}
					@change=${component._handleChange}
				></nldd-radio-button>
			</div>
			<span class="radio-button-field__label">${component.label}</span>
		</div>
	`;
}

import { html, nothing, TemplateResult } from 'lit';
import type { NLDDTimeField } from './time-field.js';
import './../../content/icon/icon.js';

/** Eén tak voor beide staten: twee bijna gelijke kopieën liepen elders uiteen. */
function renderValidationIcon(component: NLDDTimeField): TemplateResult | typeof nothing {
	const name = component.invalid ? 'invalid' : (component.valid ? 'valid' : '');
	if (!name) return nothing;
	return html`
		<div class="time-field__validation-icon-area">
			<span class="time-field__validation-icon">
				<nldd-icon
					name=${name}
					aria-hidden="true"
				></nldd-icon>
			</span>
		</div>
	`;
}

export function timeFieldTemplate(component: NLDDTimeField): TemplateResult {
	return html`
		<div class="time-field">
			<input class="time-field__input"
				id=${component.inputId || nothing}
				type="text"
				inputmode="numeric"
				.value=${component._displayValue}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				?readonly=${component.readonly}
				?required=${component.required}
				autocomplete=${component.autocomplete || nothing}
				aria-label=${component._fieldLabel || nothing}
				aria-describedby=${component.errorMessageIds || nothing}
				aria-invalid=${component.invalid ? 'true' : nothing}
				@keydown=${component._handleInputKeydown}
				@input=${component._handleInput}
				@change=${component._handleChange}
			>
			<div class="time-field__input-fade"></div>
			${renderValidationIcon(component)}
		</div>
	`;
}

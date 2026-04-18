import { html, nothing, TemplateResult } from 'lit';
import type { NDDTextField } from './ndd-text-field.js';
import './../../content/icon/ndd-icon.ts';

function renderValidationIcon(component: NDDTextField): TemplateResult | typeof nothing {
	if (component.valid) {
		return html`
			<div class="text-field__validation-icon-area">
				<ndd-icon class="text-field__validation-icon"
					name="valid"
					aria-hidden="true"
				></ndd-icon>
			</div>
		`;
	}
	if (component.invalid) {
		return html`
			<div class="text-field__validation-icon-area">
				<ndd-icon class="text-field__validation-icon"
					name="invalid"
					aria-hidden="true"
				></ndd-icon>
			</div>
		`;
	}
	return nothing;
}

export function textFieldTemplate(component: NDDTextField): TemplateResult {
	return html`
		<div class="text-field">
			<input class="text-field__input"
				id=${component.inputId || nothing}
				type=${component.type}
				.value=${component.value}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				?readonly=${component.readonly}
				?required=${component.required}
				name=${component.name || nothing}
				autocomplete=${component.autocomplete || nothing}
				aria-label=${component.accessibleLabel || nothing}
				aria-describedby=${component.errorMessageIds || nothing}
				aria-invalid=${component.invalid ? 'true' : nothing}
				@input=${component._handleInput}
				@change=${component._handleChange}
			/>
			<div class="text-field__fade"></div>
			${renderValidationIcon(component)}
		</div>
	`;
}

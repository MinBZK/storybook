import { html, nothing, TemplateResult } from 'lit';
import type { RRTextField } from './rr-text-field.js';
import './../../content/icon/rr-icon.ts';

function renderValidationIcon(component: RRTextField): TemplateResult | typeof nothing {
	if (component.valid) {
		return html`
			<div class="text-field__validation-icon">
				<rr-icon name="valid" aria-hidden="true"></rr-icon>
			</div>
		`;
	}
	if (component.invalid) {
		return html`
			<div class="text-field__validation-icon">
				<rr-icon name="invalid" aria-hidden="true"></rr-icon>
			</div>
		`;
	}
	return nothing;
}

export function textFieldTemplate(component: RRTextField): TemplateResult {
	return html`
		<div class="text-field">
			<div class="text-field__spacer"></div>
			<input
				class="text-field__input"
				id=${component.inputId || nothing}
				type=${component.type}
				.value=${component.value}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				?readonly=${component.readonly}
				?required=${component.required}
				name=${component.name || nothing}
				autocomplete=${component.autocomplete || nothing}
				aria-invalid=${component.invalid ? 'true' : 'false'}
				@input=${component.handleInput}
				@change=${component.handleChange}
			/>
			${renderValidationIcon(component)}
		</div>
	`;
}

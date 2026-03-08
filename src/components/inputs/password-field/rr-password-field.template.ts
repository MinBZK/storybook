import { html, nothing, TemplateResult } from 'lit';
import type { RRPasswordField } from './rr-password-field.js';
import './../../content/icon/rr-icon.ts';
import './../../actions/button/rr-button.ts';

function renderValidationIcon(component: RRPasswordField): TemplateResult | typeof nothing {
	if (component.valid) {
		return html`
			<div class="password-field__validation-icon-area">
				<rr-icon class="password-field__validation-icon"
					name="valid"
					aria-hidden="true"
				></rr-icon>
			</div>
		`;
	}
	if (component.invalid) {
		return html`
			<div class="password-field__validation-icon-area">
				<rr-icon class="password-field__validation-icon"
					name="invalid"
					aria-hidden="true"
				></rr-icon>
			</div>
		`;
	}
	return nothing;
}

function renderVisibilityToggle(component: RRPasswordField): TemplateResult {
	const buttonSize = component.size === 'sm' ? 'xs' : 'sm';
	const label = component.masked ? 'Toon' : 'Verberg';

	return html`
		<div class="password-field__visibility-toggle">
			<rr-button
				size=${buttonSize}
				type="button"
				?disabled=${component.disabled}
				@click=${component.handleToggle}
			>${label}</rr-button>
		</div>
	`;
}

export function passwordFieldTemplate(component: RRPasswordField): TemplateResult {
	return html`
		<div class="password-field">
			<input class="password-field__input ${component.masked ? 'is-masked' : ''}"
				id=${component.inputId || nothing}
				type=${component.masked ? 'password' : 'text'}
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
			<div class="password-field__fade"></div>
			${renderValidationIcon(component)}
			${renderVisibilityToggle(component)}
		</div>
	`;
}

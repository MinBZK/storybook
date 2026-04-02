import { html, nothing, TemplateResult } from 'lit';
import type { NDDPasswordField } from './ndd-password-field.js';
import './../../content/icon/ndd-icon.ts';
import './../../actions/button/ndd-button.ts';

function renderValidationIcon(component: NDDPasswordField): TemplateResult | typeof nothing {
	if (component.valid) {
		return html`
			<div class="password-field__validation-icon-area">
				<ndd-icon
					class="password-field__validation-icon"
					name="valid"
					aria-hidden="true"
				></ndd-icon>
			</div>
		`;
	}
	if (component.invalid) {
		return html`
			<div class="password-field__validation-icon-area">
				<ndd-icon
					class="password-field__validation-icon"
					name="invalid"
					aria-hidden="true"
				></ndd-icon>
			</div>
		`;
	}
	return nothing;
}

function renderVisibilityToggle(component: NDDPasswordField): TemplateResult {
	const buttonSize = component.size === 'sm' ? 'xs' : 'sm';
	const label = component.masked ? component.showLabel : component.hideLabel;
	const accessibleLabel = component.masked
		? component.showAccessibleLabel
		: component.hideAccessibleLabel;

	return html`
		<div class="password-field__visibility-toggle">
			<ndd-button
				size=${buttonSize}
				type="button"
				text=${label}
				accessible-label=${accessibleLabel}
				?disabled=${component.disabled}
				@click=${component._handleToggle}
				@mousedown=${(e: Event) => e.preventDefault()}
			></ndd-button>
		</div>
	`;
}

export function passwordFieldTemplate(component: NDDPasswordField): TemplateResult {
	return html`
		<div class="password-field">
			<input
				class="password-field__input ${component.masked ? 'is-masked' : ''}"
				id=${component.inputId || nothing}
				type=${component.masked ? 'password' : 'text'}
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
			<div class="password-field__fade"></div>
			${renderValidationIcon(component)} ${renderVisibilityToggle(component)}
		</div>
	`;
}

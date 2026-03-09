import { html, nothing, TemplateResult } from 'lit';
import type { RRFormField } from './rr-form-field.js';
import type { RRFormFieldHelpText } from './rr-form-field.js';
import type { RRFormFieldErrorText } from './rr-form-field.js';

/* ============================================================
   rr-form-field
   ============================================================ */

function renderOptional(label: string): TemplateResult {
	return html`<span class="form-field__optional">${label}</span>`;
}

export function formFieldTemplate(component: RRFormField): TemplateResult {
	const hasLabel = Boolean(component.label);
	const hasSupportingLabel = Boolean(component.supportingLabel);
	const isHeaderEmpty = !hasLabel && !hasSupportingLabel;

	const headerEl = html`
		<label
			class="form-field__header ${isHeaderEmpty ? 'is-empty' : ''}"
			@click=${(e: Event) => component._focusInput(e)}
		>
			${hasLabel ? html`
				<span class="form-field__label">
					${component.label}
					${component.optional ? renderOptional(component.optionalLabel) : nothing}
				</span>
			` : nothing}
			${hasSupportingLabel ? html`
				<span class="form-field__supporting-label">${component.supportingLabel}</span>
			` : nothing}
		</label>
	`;

	return html`
		<div class="form-field">
			${headerEl}
			<div class="form-field__main">
				<slot></slot>
				<div class="form-field__errors">
					<slot name="errors"></slot>
				</div>
				<slot name="help"></slot>
			</div>
		</div>
	`;
}

/* ============================================================
   rr-form-field-help-text
   ============================================================ */

export function formFieldHelpTextTemplate(_component: RRFormFieldHelpText): TemplateResult {
	return html`
		<p class="form-field__help-text">
			<slot></slot>
		</p>
	`;
}

/* ============================================================
   rr-form-field-error-text
   ============================================================ */

export function formFieldErrorTextTemplate(_component: RRFormFieldErrorText): TemplateResult {
	return html`
		<p class="form-field__error-text">
			<slot></slot>
		</p>
	`;
}

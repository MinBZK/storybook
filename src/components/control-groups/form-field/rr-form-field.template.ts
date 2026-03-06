import { html, nothing, TemplateResult } from 'lit';
import type { RRFormField } from './rr-form-field.js';
import type { RRFormFieldHelpText } from './rr-form-field.js';
import type { RRFormFieldErrorText } from './rr-form-field.js';


/* ============================================================
   rr-form-field
   ============================================================ */

function renderOptional(): TemplateResult {
	return html`<span class="form-field__optional">Optional</span>`;
}

export function formFieldTemplate(component: RRFormField): TemplateResult {
	const hasLabel = Boolean(component.label);

	// The entire header is a <label> so clicking anywhere in the header
	// (label text, optional badge, help text) activates the associated control.
	const headerEl = html`
		<label class="form-field__header ${hasLabel ? '' : 'is-empty'}">
			${hasLabel ? html`
				<span class="form-field__label">
					${component.label}
					${component.optional ? renderOptional() : nothing}
				</span>
			` : nothing}
			<slot name="help-text"></slot>
		</label>
	`;

	return html`
		<div class="form-field">
			${headerEl}
			<div class="form-field__main">
				<slot></slot>
			</div>
		</div>
	`;
}


/* ============================================================
   rr-form-field-help-text
   ============================================================ */

export function formFieldHelpTextTemplate(_component: RRFormFieldHelpText): TemplateResult {
	return html`
		<span class="form-field__help-text">
			<slot></slot>
		</span>
	`;
}


/* ============================================================
   rr-form-field-error-text
   ============================================================ */

export function formFieldErrorTextTemplate(_component: RRFormFieldErrorText): TemplateResult {
	return html`
		<span class="form-field__error-text">
			<slot></slot>
		</span>
	`;
}

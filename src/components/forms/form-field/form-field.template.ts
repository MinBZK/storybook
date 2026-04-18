/* eslint-disable lit-a11y/click-events-have-key-events -- label delegates to inner input */
import { html, nothing, TemplateResult } from 'lit';
import type { NDDFormField } from './ndd-form-field.js';
import type { NDDFormFieldHelpText } from './ndd-form-field.js';
import type { NDDFormFieldErrorText } from './ndd-form-field.js';

/* ============================================================
   ndd-form-field
   ============================================================ */

function renderOptional(label: string): TemplateResult {
	return html`<span class="form-field__optional">${label}</span>`;
}

export function formFieldTemplate(component: NDDFormField): TemplateResult {
	const hasLabel = Boolean(component.label);
	const hasSupportingLabel = Boolean(component.supportingLabel);
	const isHeaderEmpty = !hasLabel && !hasSupportingLabel;

	const headerEl = html`
		<div class="form-field__header ${isHeaderEmpty ? 'is-empty' : ''}">
			${hasLabel ? html`
				<label class="form-field__label"
					@click=${(e: Event) => component._focusInput(e)}
				>
					${component.label}
					${component.optional ? renderOptional(component.optionalLabel) : nothing}
				</label>
			` : nothing}
			${hasSupportingLabel ? html`
				<span class="form-field__supporting-label">${component.supportingLabel}</span>
			` : nothing}
		</div>
	`;

	return html`
		<div class="form-field">
			${headerEl}
			<div class="form-field__main">
				<slot></slot>
				<div class="form-field__errors"
					aria-live="polite"
				>
					<slot name="errors"></slot>
				</div>
				<slot name="help"></slot>
			</div>
		</div>
	`;
}

/* ============================================================
   ndd-form-field-help-text
   ============================================================ */

export function formFieldHelpTextTemplate(_component: NDDFormFieldHelpText): TemplateResult {
	return html`
		<p class="form-field__help-text">
			<slot></slot>
		</p>
	`;
}

/* ============================================================
   ndd-form-field-error-text
   ============================================================ */

export function formFieldErrorTextTemplate(_component: NDDFormFieldErrorText): TemplateResult {
	return html`
		<p class="form-field__error-text">
			<slot></slot>
		</p>
	`;
}

/* eslint-disable lit-a11y/click-events-have-key-events -- label delegates to inner input */
import { html, nothing, TemplateResult } from 'lit';
import type { NLDDFormField } from './form-field.js';
import type { NLDDFormFieldHelpText } from './form-field.js';
import type { NLDDFormFieldErrorText } from './form-field.js';

/* ============================================================
   nldd-form-field
   ============================================================ */

function renderOptional(label: string): TemplateResult {
	return html`<span class="form-field__optional">${label}</span>`;
}

export function formFieldTemplate(component: NLDDFormField): TemplateResult {
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
   nldd-form-field-help-text
   ============================================================ */

export function formFieldHelpTextTemplate(_component: NLDDFormFieldHelpText): TemplateResult {
	return html`
		<p class="form-field__help-text">
			<slot></slot>
		</p>
	`;
}

/* ============================================================
   nldd-form-field-error-text
   ============================================================ */

export function formFieldErrorTextTemplate(_component: NLDDFormFieldErrorText): TemplateResult {
	return html`
		<p class="form-field__error-text">
			<slot></slot>
		</p>
	`;
}

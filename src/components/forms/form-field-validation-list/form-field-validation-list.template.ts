import { html, TemplateResult } from 'lit';
import type { NLDDFormFieldValidationList, NLDDFormFieldValidationItem } from './form-field-validation-list.js';

export function formFieldValidationListTemplate(_component: NLDDFormFieldValidationList): TemplateResult {
	return html`
		<div class="form-field-validation-list"
			role="list"
		>
			<slot></slot>
		</div>
	`;
}

export function formFieldValidationItemTemplate(_component: NLDDFormFieldValidationItem): TemplateResult {
	return html`
		<slot></slot>
	`;
}

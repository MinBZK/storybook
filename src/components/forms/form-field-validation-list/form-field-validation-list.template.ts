import { html, TemplateResult } from 'lit';
import type { NLDDFormFieldValidationList, NLDDFormFieldValidationItem } from './form-field-validation-list.js';

export function validationListTemplate(_component: NLDDFormFieldValidationList): TemplateResult {
	return html`
		<div class="validation-list"
			role="list"
		>
			<slot></slot>
		</div>
	`;
}

export function validationItemTemplate(_component: NLDDFormFieldValidationItem): TemplateResult {
	return html`
		<slot></slot>
	`;
}

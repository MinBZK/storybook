import { html, TemplateResult } from 'lit';
import type { NLDDValidationList, NLDDValidationItem } from './validation-list.js';

export function validationListTemplate(_component: NLDDValidationList): TemplateResult {
	return html`
		<div class="validation-list"
			role="list"
		>
			<slot></slot>
		</div>
	`;
}

export function validationItemTemplate(_component: NLDDValidationItem): TemplateResult {
	return html`
		<slot></slot>
	`;
}

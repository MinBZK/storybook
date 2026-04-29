import { html, nothing, TemplateResult } from 'lit';
import type { NLDDFormSection } from './form-section.js';

export function formSectionTemplate(component: NLDDFormSection): TemplateResult {
	const hasText = !!component.text;
	const hasSupporting = !!component.supportingText;
	const headerEmpty = !hasText && !hasSupporting;

	return html`
		<fieldset class="form-section">
			<div class="form-section__header${headerEmpty ? ' is-empty' : ''}">
				${hasText ? html`<legend class="form-section__title">${component.text}</legend>` : nothing}
				${hasSupporting ? html`<p class="form-section__subtitle">${component.supportingText}</p>` : nothing}
			</div>
			<div class="form-section__main">
				<slot></slot>
			</div>
		</fieldset>
	`;
}

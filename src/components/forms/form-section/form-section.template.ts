import { html, nothing, TemplateResult } from 'lit';
import type { NLDDFormSection } from './form-section.js';

export function formSectionTemplate(component: NLDDFormSection): TemplateResult {
	const hasText = !!component.text;
	const hasSupporting = !!component.supportingText;

	// <legend> must be a direct child of <fieldset> for screen readers (NVDA/JAWS)
	// to announce the group name. Wrapping it inside another element silently
	// breaks the fieldset/legend semantics in some assistive technologies.
	return html`
		<fieldset class="form-section">
			${hasText ? html`<legend class="form-section__title">${component.text}</legend>` : nothing}
			${hasSupporting ? html`<p class="form-section__subtitle">${component.supportingText}</p>` : nothing}
			<div class="form-section__main">
				<slot></slot>
			</div>
		</fieldset>
	`;
}

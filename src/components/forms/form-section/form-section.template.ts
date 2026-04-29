import { html, nothing, TemplateResult } from 'lit';
import type { NLDDFormSection } from './form-section.js';

export function formSectionTemplate(component: NLDDFormSection): TemplateResult {
	const hasText = !!component.text;
	const hasSupporting = !!component.supportingText;
	const hasHeader = hasText || hasSupporting;

	// <legend> must be a direct child of <fieldset> for screen readers (NVDA/JAWS)
	// to announce the group name. Both title and supporting-text live INSIDE the
	// legend (as separate spans) so SRs read them together as the group label
	// when focus enters a child control — without needing aria-describedby and
	// generated IDs.
	return html`
		<fieldset class="form-section">
			${hasHeader ? html`
				<legend class="form-section__header">
					${hasText ? html`<span class="form-section__title">${component.text}</span>` : nothing}
					${hasSupporting ? html`<span class="form-section__subtitle">${component.supportingText}</span>` : nothing}
				</legend>
			` : nothing}
			<div class="form-section__main">
				<slot></slot>
			</div>
		</fieldset>
	`;
}

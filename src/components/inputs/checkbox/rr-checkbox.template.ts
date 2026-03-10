import { html, nothing, TemplateResult } from 'lit';
import type { RRCheckbox } from './rr-checkbox.js';
import './../../content/icon/rr-icon.ts';

export function checkboxTemplate(component: RRCheckbox): TemplateResult {
	return html`
		<input class="checkbox__input"
			type="checkbox"
			.checked=${component.checked}
			.indeterminate=${component.indeterminate}
			?disabled=${component.disabled}
			name=${component.name || ''}
			value=${component.value}
			aria-label=${component.ariaLabel || nothing}
			aria-labelledby=${component.ariaLabelledBy || nothing}
			@change=${component._handleChange}
		>
		<div class="checkbox__box" aria-hidden="true">
			<rr-icon class="checkbox__check-icon" name="check-mark-small"></rr-icon>
			<rr-icon class="checkbox__indeterminate-icon" name="minus-extra-small"></rr-icon>
		</div>
	`;
}

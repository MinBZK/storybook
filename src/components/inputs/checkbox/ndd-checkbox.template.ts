import { html, nothing, TemplateResult } from 'lit';
import type { NDDCheckbox } from './ndd-checkbox.js';
import './../../content/icon/ndd-icon.ts';

export function checkboxTemplate(component: NDDCheckbox): TemplateResult {
	return html`
		<input class="checkbox__input"
			type="checkbox"
			.checked=${component.checked}
			.indeterminate=${component.indeterminate}
			?disabled=${component.disabled}
			name=${component.name || ''}
			value=${component.value}
			aria-label=${component.accessibleLabel || nothing}
			@change=${component._handleChange}
		>
		<div class="checkbox__box" aria-hidden="true">
			<ndd-icon class="checkbox__check-icon" name="check-mark-small"></ndd-icon>
			<ndd-icon class="checkbox__indeterminate-icon" name="minus-extra-small"></ndd-icon>
		</div>
	`;
}

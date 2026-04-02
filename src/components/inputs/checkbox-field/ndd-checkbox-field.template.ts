import { html, nothing, TemplateResult } from 'lit';
import type { NDDCheckboxField } from './ndd-checkbox-field.js';
import '../checkbox/ndd-checkbox.ts';

export function checkboxFieldTemplate(component: NDDCheckboxField): TemplateResult {
	return html`
		<div class="checkbox-field" @click=${component._handleLabelClick}>
			<div class="checkbox-field__control">
				<ndd-checkbox
					?checked=${component.checked}
					?indeterminate=${component.indeterminate}
					?disabled=${component.disabled}
					name=${component.name || nothing}
					value=${component.value}
					accessible-label=${component.label || nothing}
					@change=${component._handleChange}
				></ndd-checkbox>
			</div>
			<span class="checkbox-field__label">${component.label}</span>
		</div>
	`;
}

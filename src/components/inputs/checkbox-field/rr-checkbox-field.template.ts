import { html, nothing, TemplateResult } from 'lit';
import type { RRCheckboxField } from './rr-checkbox-field.js';
import '../checkbox/rr-checkbox.ts';

export function checkboxFieldTemplate(component: RRCheckboxField): TemplateResult {
	return html`
		<div class="checkbox-field"
			@click=${component._handleLabelClick}
		>
			<div class="checkbox-field__control">
				<rr-checkbox
					?checked=${component.checked}
					?indeterminate=${component.indeterminate}
					?disabled=${component.disabled}
					name=${component.name || nothing}
					value=${component.value}
					accessible-label=${component.label || nothing}
					@change=${component._handleChange}
				></rr-checkbox>
			</div>
			<span class="checkbox-field__label">${component.label}</span>
		</div>
	`;
}

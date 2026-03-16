import { html, nothing, TemplateResult } from 'lit';
import type { RRCheckboxField } from './rr-checkbox-field.js';
import '../checkbox/rr-checkbox.ts';

export function checkboxFieldTemplate(component: RRCheckboxField): TemplateResult {
	return html`
		<div class="checkbox-field"
			@click=${component._handleLabelClick}
		>
			<rr-checkbox class="checkbox-field__control"
				?checked=${component.checked}
				?indeterminate=${component.indeterminate}
				?disabled=${component.disabled}
				name=${component.name || ''}
				value=${component.value}
				accessible-label=${component._labelText || nothing}
				@change=${component._handleChange}
			></rr-checkbox>
			<label class="checkbox-field__label">
				<slot @slotchange=${component._onSlotChange}></slot>
			</label>
		</div>
	`;
}

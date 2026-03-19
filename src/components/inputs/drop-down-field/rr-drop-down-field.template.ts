import { html, nothing, TemplateResult } from 'lit';
import type { RRDropDownField } from './rr-drop-down-field.js';
import './../../content/icon/rr-icon.ts';

export function dropDownFieldTemplate(component: RRDropDownField): TemplateResult {
	return html`
		<div class="drop-down-field">
			<select class="drop-down-field__select"
				?disabled=${component.disabled}
				name=${component.name || nothing}
				@change=${component._handleChange}
			></select>
			<span class="drop-down-field__value">${component._displayValue}</span>
			<div class="drop-down-field__icon">
				<rr-icon name="chevron-up-down"></rr-icon>
			</div>
		</div>
		<slot @slotchange=${component._onSlotChange}></slot>
	`;
}

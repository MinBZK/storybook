import { html, TemplateResult } from 'lit';
import type { RRDropDownField } from './rr-drop-down-field.js';
import './../../content/icon/rr-icon.ts';

export function dropDownFieldTemplate(component: RRDropDownField): TemplateResult {
	return html`
		<div class="drop-down-field">
			<slot @slotchange=${component._onSlotChange}></slot>
			<span class="drop-down-field__value">${component._displayValue}</span>
			<div class="drop-down-field__picker-icon">
				<rr-icon name="chevron-up-down"></rr-icon>
			</div>
		</div>
	`;
}

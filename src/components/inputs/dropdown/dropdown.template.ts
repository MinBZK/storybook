import { html, TemplateResult } from 'lit';
import type { NLDDDropdown } from './dropdown.js';
import './../../content/icon/icon.ts';

export function dropdownTemplate(component: NLDDDropdown): TemplateResult {
	return html`
		<div class="dropdown">
			<slot @slotchange=${component._onSlotChange}></slot>
			<span class="dropdown__value">${component._displayValue}</span>
			<div class="dropdown__picker-icon">
				<nldd-icon name="chevron-up-down"></nldd-icon>
			</div>
		</div>
	`;
}

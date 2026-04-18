import { html, TemplateResult } from 'lit';
import type { NDDDropdown } from './ndd-dropdown.js';
import './../../content/icon/ndd-icon.ts';

export function dropdownTemplate(component: NDDDropdown): TemplateResult {
	return html`
		<div class="dropdown">
			<slot @slotchange=${component._onSlotChange}></slot>
			<span class="dropdown__value">${component._displayValue}</span>
			<div class="dropdown__picker-icon">
				<ndd-icon name="chevron-up-down"></ndd-icon>
			</div>
		</div>
	`;
}

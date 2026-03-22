import { html, TemplateResult } from 'lit';
import type { RRDropdown } from './rr-dropdown.js';
import './../../content/icon/rr-icon.ts';

export function dropdownTemplate(component: RRDropdown): TemplateResult {
	return html`
		<div class="dropdown">
			<slot @slotchange=${component._onSlotChange}></slot>
			<span class="dropdown__value">${component._displayValue}</span>
			<div class="dropdown__picker-icon">
				<rr-icon name="chevron-up-down"></rr-icon>
			</div>
		</div>
	`;
}

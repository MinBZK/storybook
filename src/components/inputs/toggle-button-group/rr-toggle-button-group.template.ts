import { html, TemplateResult } from 'lit';
import type { RRToggleButtonGroup } from './rr-toggle-button-group.js';


export function toggleButtonGroupTemplate(component: RRToggleButtonGroup): TemplateResult {
	return html`
		<div class="toggle-button-group">
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

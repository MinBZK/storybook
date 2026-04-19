import { html, TemplateResult } from 'lit';
import type { NLDDToggleButtonGroup } from './toggle-button-group.js';

export function toggleButtonGroupTemplate(component: NLDDToggleButtonGroup): TemplateResult {
	return html`
		<div class="toggle-button-group">
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

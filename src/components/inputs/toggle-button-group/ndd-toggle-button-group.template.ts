import { html, TemplateResult } from 'lit';
import type { NDDToggleButtonGroup } from './ndd-toggle-button-group.ts';

export function toggleButtonGroupTemplate(component: NDDToggleButtonGroup): TemplateResult {
	return html`
		<div class="toggle-button-group">
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

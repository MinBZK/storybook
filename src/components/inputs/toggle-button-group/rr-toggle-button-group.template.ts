import { html, nothing, TemplateResult } from 'lit';
import type { RRToggleButtonGroup } from './rr-toggle-button-group.js';

export function toggleButtonGroupTemplate(component: RRToggleButtonGroup): TemplateResult {
	return html`
		<div class="toggle-button-group"
			role=${component.type === 'radio' ? 'radiogroup' : 'group'}
			aria-label=${component.accessibleLabel || nothing}
			aria-labelledby=${component.accessibleLabelledBy || nothing}
		>
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

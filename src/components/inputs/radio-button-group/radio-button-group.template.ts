import { html, TemplateResult } from 'lit';
import type { NLDDRadioButtonGroup } from './radio-button-group.js';

export function radioButtonGroupTemplate(component: NLDDRadioButtonGroup): TemplateResult {
	return html`
		<div class="radio-button-group">
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

import { html, TemplateResult } from 'lit';
import type { RRRadioButtonGroup } from './rr-radio-button-group.js';

export function radioButtonGroupTemplate(component: RRRadioButtonGroup): TemplateResult {
	return html`
		<div class="radio-button-group">
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

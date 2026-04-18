import { html, TemplateResult } from 'lit';
import type { NDDRadioButtonGroup } from './ndd-radio-button-group.js';

export function radioButtonGroupTemplate(component: NDDRadioButtonGroup): TemplateResult {
	return html`
		<div class="radio-button-group">
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

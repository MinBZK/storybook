import { html, nothing, TemplateResult } from 'lit';
import type { RRRadioButtonGroup } from './rr-radio-button-group.js';

export function radioButtonGroupTemplate(component: RRRadioButtonGroup): TemplateResult {
	return html`
		<div class="radio-button-group"
			role="radiogroup"
			aria-labelledby=${component.ariaLabelledby || nothing}
		>
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;
}

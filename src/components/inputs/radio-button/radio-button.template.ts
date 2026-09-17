import { html, TemplateResult } from 'lit';
import type { NLDDRadioButton } from './radio-button.js';

export function radioButtonTemplate(component: NLDDRadioButton): TemplateResult {
	// Decorative: the shape only. Something else owns the interaction and the
	// state — a whole row that is itself the control, say — and a radio here
	// would be a second control inside it.
	if (component.decorative) {
		return html`
			<div class="radio-button__outer-shape" aria-hidden="true">
				<div class="radio-button__inner-shape"></div>
			</div>
		`;
	}
	// The radio itself is the host element, so nothing here is announced or
	// focused. The input is only there to answer `required` for the form, and it
	// answers the question a radio asks: is anything in this group checked. The
	// name is for the platform: a radio without one is in no group, and a radio in
	// no group never reports a missing value.
	return html`
		<input class="radio-button__validation-input"
			type="radio"
			name="nldd-validation"
			?required=${component.required}
			?disabled=${component.disabled}
			.checked=${component._groupHasSelection}
			tabindex="-1"
			aria-hidden="true"
		>
		<div class="radio-button__outer-shape"
			aria-hidden="true"
		>
			<div class="radio-button__inner-shape"></div>
		</div>
	`;
}

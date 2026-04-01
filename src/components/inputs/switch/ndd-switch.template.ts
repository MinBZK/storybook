import { html, nothing, TemplateResult } from 'lit';
import type { NDDSwitch } from './ndd-switch.js';
import './../../content/icon/ndd-icon.ts';

export function switchTemplate(component: NDDSwitch): TemplateResult {
	return html`
		<input class="switch__input"
			type="checkbox"
			role="switch"
			.checked=${component.checked}
			?disabled=${component.disabled}
			value=${component.value}
			aria-label=${component.accessibleLabel || nothing}
			@change=${component._handleChange}
		>
		<div class="switch__track"
			aria-hidden="true"
		>
			<div class="switch__thumb">
				<div class="switch__check">
					<ndd-icon name="check-mark-small"></ndd-icon>
				</div>
			</div>
		</div>
	`;
}

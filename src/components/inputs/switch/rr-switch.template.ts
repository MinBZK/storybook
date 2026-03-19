import { html, nothing, TemplateResult } from 'lit';
import type { RRSwitch } from './rr-switch.js';
import './../../content/icon/rr-icon.ts';

export function switchTemplate(component: RRSwitch): TemplateResult {
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
					<rr-icon name="check-mark-small"></rr-icon>
				</div>
			</div>
		</div>
	`;
}

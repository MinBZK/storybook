import { html, nothing, TemplateResult } from 'lit';
import type { RRToggleButton } from './rr-toggle-button.js';


export function toggleButtonTemplate(component: RRToggleButton): TemplateResult {
	const label = component.accessibleLabel || nothing;

	const icon = component._iconName
		? html`<rr-icon class="toggle-button__icon" name=${component._iconName}></rr-icon>`
		: nothing;

	const slot = html`<slot @slotchange=${component._detectIcon}></slot>`;

	if (component.type === 'checkbox' || component.type === 'radio') {
		return html`
			<label class="toggle-button">
				<input
					class="toggle-button__input"
					type=${component.type}
					.checked=${component.selected}
					?disabled=${component.disabled}
					name=${component.name || nothing}
					value=${component.value}
					aria-label=${label}
					@change=${component._handleInputChange}
				>
				${icon}
				${slot}
			</label>
		`;
	}

	return html`
		<button
			class="toggle-button"
			type="button"
			aria-pressed=${component.selected}
			?disabled=${component.disabled}
			aria-label=${label}
			@click=${component._handleButtonClick}
		>
			${icon}
			${slot}
		</button>
	`;
}

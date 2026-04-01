import { html, nothing, TemplateResult } from 'lit';
import type { RRToggleButton } from './rr-toggle-button.js';


export function toggleButtonTemplate(component: RRToggleButton): TemplateResult {
	const label = component.accessibleLabel || nothing;

	const icon = component.icon
		? html`<rr-icon class="toggle-button__icon" name=${component.icon}></rr-icon>`
		: html`<slot name="icon"></slot>`;

	const textContent = component.text
		? html`<span class="toggle-button__text">${component.text}</span>`
		: nothing;

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
				${textContent}
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
			${textContent}
		</button>
	`;
}

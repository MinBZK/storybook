import { html, nothing, TemplateResult } from 'lit';
import type { NLDDToggleButton } from './toggle-button.js';
import '../../content/tooltip/tooltip.js';


export function toggleButtonTemplate(component: NLDDToggleButton): TemplateResult {
	const label = component.accessibleLabel || nothing;
	const iconOnly = !!component.icon && !component.text;
	const tooltipText = iconOnly ? (component.accessibleLabel || component.text) : '';

	const icon = component.icon
		? html`<nldd-icon class="toggle-button__icon" name=${component.icon}></nldd-icon>`
		: html`<slot name="icon" @slotchange=${component.requestUpdate}></slot>`;

	const textContent = component.text
		? html`<span class="toggle-button__text">${component.text}</span>`
		: nothing;

	let result: TemplateResult;

	if (component.type === 'checkbox' || component.type === 'radio') {
		result = html`
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
	} else {
		result = html`
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

	if (tooltipText) {
		return html`<nldd-tooltip text=${tooltipText}>${result}</nldd-tooltip>`;
	}
	return result;
}

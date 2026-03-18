import { html, nothing, TemplateResult } from 'lit';
import type { RRToggleButton } from './rr-toggle-button.js';


export function toggleButtonTemplate(component: RRToggleButton): TemplateResult {
	const label = component.accessibleLabel || nothing;

	const iconSlot = html`
		<slot
			name="icon"
			@slotchange=${component._onIconSlotChange}
		></slot>
	`;

	const defaultSlot = html`
		<slot @slotchange=${component._onDefaultSlotChange}></slot>
	`;

	if (component.type === 'checkbox' || component.type === 'radio') {
		return html`
			<label class="button">
				<input
					class="button__input"
					type=${component.type}
					.checked=${component.selected}
					?disabled=${component.disabled}
					name=${component.name || nothing}
					value=${component.value}
					aria-label=${label}
					@change=${component._handleInputChange}
				>
				${iconSlot}
				${defaultSlot}
			</label>
		`;
	}

	return html`
		<button
			class="button"
			type="button"
			aria-pressed=${component.selected}
			?disabled=${component.disabled}
			aria-label=${label}
			@click=${component._handleButtonClick}
		>
			${iconSlot}
			${defaultSlot}
		</button>
	`;
}

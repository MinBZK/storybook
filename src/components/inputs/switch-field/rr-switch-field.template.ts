import { html, nothing, TemplateResult } from 'lit';
import type { RRSwitchField } from './rr-switch-field.js';
import '../switch/rr-switch.ts';

export function switchFieldTemplate(component: RRSwitchField): TemplateResult {
	return html`
		<div class="switch-field"
			@click=${component._handleLabelClick}
		>
			<div class="switch-field__control">
				<rr-switch
					size="sm"
					name=${component.name || nothing}
					value=${component.value}
					?checked=${component.checked}
					?disabled=${component.disabled}
					accessible-label=${component._labelText || nothing}
					@change=${component._handleChange}
				></rr-switch>
			</div>
			<span class="switch-field__label">
				<slot @slotchange=${component._onSlotChange}></slot>
			</span>
		</div>
	`;
}

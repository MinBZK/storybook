import { html, nothing, TemplateResult } from 'lit';
import type { NDDSwitchField } from './ndd-switch-field.js';
import '../switch/ndd-switch.ts';

export function switchFieldTemplate(component: NDDSwitchField): TemplateResult {
	return html`
		<div class="switch-field"
			@click=${component._handleLabelClick}
		>
			<div class="switch-field__control">
				<ndd-switch
					size="sm"
					name=${component.name || nothing}
					value=${component.value}
					?checked=${component.checked}
					?disabled=${component.disabled}
					accessible-label=${component.label || nothing}
					@change=${component._handleChange}
				></ndd-switch>
			</div>
			<span class="switch-field__label">${component.label}</span>
		</div>
	`;
}

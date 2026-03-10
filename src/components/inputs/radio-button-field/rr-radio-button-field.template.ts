import { html, TemplateResult } from 'lit';
import type { RRRadioButtonField } from './rr-radio-button-field.js';
import '../radio-button/rr-radio-button.ts';

export function radioButtonFieldTemplate(component: RRRadioButtonField): TemplateResult {
	return html`
		<div class="radio-button-field">
			<rr-radio-button
				class="radio-button-field__control"
				?checked=${component.checked}
				?disabled=${component.disabled}
				name=${component.name || ''}
				value=${component.value}
				@change=${component._handleChange}
			></rr-radio-button>
			<span class="radio-button-field__label"
				@click=${component._handleLabelClick}
			>
				<slot></slot>
			</span>
		</div>
	`;
}

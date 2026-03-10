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
				aria-labelledby=${component._labelId}
				@change=${component._handleChange}
			></rr-radio-button>
			<label class="radio-button-field__label"
				id=${component._labelId}
				@click=${component._handleLabelClick}
			>
				<slot></slot>
			</label>
		</div>
	`;
}

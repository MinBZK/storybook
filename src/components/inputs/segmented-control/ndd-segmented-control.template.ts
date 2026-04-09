import { html, nothing, TemplateResult } from 'lit';
import type { NDDSegmentedControl, NDDSegmentedControlItem } from './ndd-segmented-control.js';

export function segmentedControlTemplate(component: NDDSegmentedControl): TemplateResult {
	return html`<slot @slotchange=${component._onSlotChange}></slot>`;
}

export function segmentedControlItemTemplate(component: NDDSegmentedControlItem): TemplateResult {
	const isIcon = component.variant === 'icon';
	const labelText = component.text || nothing;

	return html`
		<label class="segmented-control__item-label"
			title=${isIcon ? labelText : nothing}
		>
			<input class="segmented-control__item-input"
				type=${component.inputType}
				name=${component.groupName || nothing}
				value=${component.value}
				.checked=${component.selected}
				?disabled=${component.disabled}
				aria-label=${isIcon ? labelText : nothing}
				@change=${component._handleChange}
			>
			<span class="segmented-control__item-icon"
				aria-hidden=${component.variant === 'icon' ? nothing : 'true'}
			>
				${component.icon
					? html`<ndd-icon name=${component.icon}></ndd-icon>`
					: html`<slot name="icon"></slot>`}
			</span>
			<span class="segmented-control__item-text"
				aria-hidden=${component.variant === 'text' ? nothing : 'true'}
			>
				${component.text}
			</span>
		</label>
	`;
}

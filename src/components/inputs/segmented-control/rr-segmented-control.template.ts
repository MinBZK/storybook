import { html, nothing, TemplateResult } from 'lit';
import type { RRSegmentedControl, RRSegmentedControlItem } from './rr-segmented-control.js';

export function segmentedControlTemplate(component: RRSegmentedControl): TemplateResult {
	return html`<slot @slotchange=${component._onSlotChange}></slot>`;
}

export function segmentedControlItemTemplate(component: RRSegmentedControlItem): TemplateResult {
	const isIcon = component.contentType === 'icon';
	const labelText = component._labelText || nothing;

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
				aria-hidden=${component.contentType === 'icon' ? nothing : 'true'}
			>
				<slot name="icon"></slot>
			</span>
			<span class="segmented-control__item-text"
				aria-hidden=${component.contentType === 'text' ? nothing : 'true'}
			>
				<slot @slotchange=${component._onDefaultSlotChange}></slot>
			</span>
			<div class="segmented-control__item-indicator"></div>
		</label>
	`;
}

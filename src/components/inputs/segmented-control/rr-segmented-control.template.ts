import { html, nothing, TemplateResult } from 'lit';
import type { RRSegmentedControl, RRSegmentedControlItem } from './rr-segmented-control.js';

export function segmentedControlTemplate(component: RRSegmentedControl): TemplateResult {
	return html`<slot @slotchange=${component._onSlotChange}></slot>`;
}

export function segmentedControlItemTemplate(component: RRSegmentedControlItem): TemplateResult {
	return html`
		<input class="segmented-control__item-input"
			type=${component.inputType}
			name=${component.groupName || nothing}
			value=${component.value}
			.checked=${component.selected}
			?disabled=${component.disabled}
			@change=${component._handleChange}
		>
		<div class="segmented-control__item-indicator"></div>
		<div class="segmented-control__item-label">
			<span class="segmented-control__item-icon">
				<slot name="icon"></slot>
			</span>
			<span class="segmented-control__item-text">
				<slot></slot>
			</span>
		</div>
	`;
}

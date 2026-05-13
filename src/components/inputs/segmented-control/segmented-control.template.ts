import { html, nothing, TemplateResult } from 'lit';
import type { NLDDSegmentedControl, NLDDSegmentedControlItem } from './segmented-control.js';
import '../../content/tooltip/tooltip.js';

export function segmentedControlTemplate(component: NLDDSegmentedControl): TemplateResult {
	return html`<slot @slotchange=${component._onSlotChange}></slot>`;
}

export function segmentedControlItemTemplate(component: NLDDSegmentedControlItem): TemplateResult {
	const isIcon = component.variant === 'icon';
	const labelText = component.text || nothing;

	const label = html`
		<label class="segmented-control__item">
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
					? html`<nldd-icon name=${component.icon}></nldd-icon>`
					: html`<slot name="icon"></slot>`}
			</span>
			<span class="segmented-control__item-text"
				aria-hidden=${component.variant === 'text' ? nothing : 'true'}
			>
				${component.text}
			</span>
		</label>`;

	if (isIcon && labelText) {
		return html`<nldd-tooltip text=${labelText}>${label}</nldd-tooltip>`;
	}
	return label;
}

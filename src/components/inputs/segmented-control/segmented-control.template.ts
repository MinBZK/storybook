import { html, nothing, TemplateResult } from 'lit';
import type { NLDDSegmentedControl, NLDDSegmentedControlItem } from './segmented-control.js';
import '../../content/tooltip/tooltip.js';

export function segmentedControlTemplate(component: NLDDSegmentedControl): TemplateResult {
	return html`<slot @slotchange=${component._onSlotChange}></slot>`;
}

export function segmentedControlItemTemplate(component: NLDDSegmentedControlItem): TemplateResult {
	const isIcon = component.variant === 'icon';
	/* The icon and icon-and-text variants reserve an icon area; fill it with a
	 * placeholder whenever the consumer provided no icon. */
	const showPlaceholder = isIcon || component.variant === 'icon-and-text';
	const labelText = component.text || nothing;

	const label = html`
		<label class="segmented-control__item">
			<input class="segmented-control__item-input"
				type=${component.inputType}
				name=${component.inputType === 'button' ? nothing : (component.groupName || nothing)}
				value=${component.inputType === 'button' ? nothing : component.value}
				.checked=${component.selected}
				?disabled=${component.disabled}
				aria-label=${isIcon ? labelText : nothing}
				@change=${component._handleChange}
				@click=${component._handleClick}
			>
			<span class="segmented-control__item-icon"
				aria-hidden=${isIcon ? nothing : 'true'}
			>
				${component.icon
					? html`<nldd-icon name=${component.icon}></nldd-icon>`
					: html`<slot name="icon">${showPlaceholder ? html`<nldd-icon name="icon-placeholder"></nldd-icon>` : nothing}</slot>`}
			</span>
			<span class="segmented-control__item-text"
				aria-hidden=${isIcon ? 'true' : nothing}
			>
				${component.text}
			</span>
		</label>`;

	if (isIcon && labelText) {
		return html`<nldd-tooltip text=${labelText}>${label}</nldd-tooltip>`;
	}
	return label;
}

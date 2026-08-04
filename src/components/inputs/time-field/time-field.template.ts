import { html, nothing, TemplateResult } from 'lit';
import type { NLDDTimeField } from './time-field.js';
import './../../actions/icon-button/icon-button.js';
import './../../content/icon/icon.js';
import './../../layout/popover/popover.js';
import './../../layout/container/container.js';
import './../../navigation/top-title-bar/top-title-bar.js';
import './../time-picker/time-picker.js';

/**
 * De popover zet zowel zijn linker- als rechterrand vast, dus een `auto`-breedte
 * klapt dicht en de picker hangt buiten een nul-brede doos. Daarom uitgeschreven,
 * uit dezelfde token waarmee de picker zijn kolommen meet: twee kolommen van
 * anderhalve controlmaat, plus de dubbele punt ertussen en de containerpadding.
 */
export const PICKER_POPOVER_WIDTH = 'calc(var(--semantics-controls-md-min-size) * 3 + var(--primitives-space-48) + var(--primitives-space-16) * 2)';

/** Eén tak voor beide staten: twee bijna gelijke kopieën liepen elders uiteen. */
function renderValidationIcon(component: NLDDTimeField): TemplateResult | typeof nothing {
	const name = component.invalid ? 'invalid' : (component.valid ? 'valid' : '');
	if (!name) return nothing;
	return html`
		<div class="time-field__validation-icon-area">
			<span class="time-field__validation-icon">
				<nldd-icon
					name=${name}
					aria-hidden="true"
				></nldd-icon>
			</span>
		</div>
	`;
}

/**
 * De picker hangt aan de knop, die aan het eind van het veld staat, dus
 * bottom-end landt hem onder de input. Tegen de linkerschermrand valt Floating UI
 * vanzelf terug op rechtsom openen.
 */
function renderPicker(component: NLDDTimeField): TemplateResult | typeof nothing {
	if (component.noPicker) return nothing;
	const buttonSize = component.size === 'sm' ? 'xs' : 'sm';
	return html`
		<div class="time-field__picker-button">
			<nldd-icon-button
				variant="neutral-tinted"
				size=${buttonSize}
				icon="clock"
				text=${component._t('components.time-field.to-pick-time-action')}
				tooltip-timing="never"
				?disabled=${component.disabled || component.readonly}
				@click=${component._handlePickerClick}
			></nldd-icon-button>
			<nldd-popover
				accessible-label=${component._pickerLabel}
				placement="bottom-end"
				width=${PICKER_POPOVER_WIDTH}
				@toggle=${component._handlePopoverToggle}
			>
				<nldd-top-title-bar
					text=${component._pickerLabel}
					dismiss-text=${component._t('components.time-field.cancel-action')}
					@dismiss=${component._handlePickerDismiss}
				></nldd-top-title-bar>
				<nldd-container padding="16"
					@change=${component._handlePickerChange}
				>
					<slot name="picker"
						@slotchange=${component._handlePickerSlotChange}
					></slot>
					${component._hasSlottedPicker ? nothing : html`
						<nldd-time-picker
							width="full"
							value=${component.value || nothing}
							min=${component.min || nothing}
							max=${component.max || nothing}
							step=${component.step}
						></nldd-time-picker>
					`}
				</nldd-container>
			</nldd-popover>
		</div>
	`;
}

export function timeFieldTemplate(component: NLDDTimeField): TemplateResult {
	return html`
		<div class="time-field">
			<input class="time-field__input"
				id=${component.inputId || nothing}
				type="text"
				inputmode="numeric"
				.value=${component._displayValue}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				?readonly=${component.readonly}
				?required=${component.required}
				autocomplete=${component.autocomplete || nothing}
				aria-label=${component._fieldLabel || nothing}
				aria-describedby=${component.errorMessageIds || nothing}
				aria-invalid=${component.invalid ? 'true' : nothing}
				@keydown=${component._handleInputKeydown}
				@input=${component._handleInput}
				@change=${component._handleChange}
			>
			<div class="time-field__input-fade"></div>
			${renderValidationIcon(component)}
			${renderPicker(component)}
		</div>
	`;
}

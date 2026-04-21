import { html, nothing, TemplateResult } from 'lit';
import type { NLDDComboBox } from './combo-box.js';
import '../../actions/icon-button/icon-button.js';
import '../../content/icon/icon.js';

function renderValidationIcon(component: NLDDComboBox): TemplateResult | typeof nothing {
	if (component.invalid) {
		return html`
			<div class="combo-box__validation-icon-area">
				<nldd-icon class="combo-box__validation-icon"
					name="invalid"
					aria-hidden="true"
				></nldd-icon>
			</div>
		`;
	}
	if (component.valid) {
		return html`
			<div class="combo-box__validation-icon-area">
				<nldd-icon class="combo-box__validation-icon"
					name="valid"
					aria-hidden="true"
				></nldd-icon>
			</div>
		`;
	}
	return nothing;
}

export function comboBoxTemplate(component: NLDDComboBox): TemplateResult {
	const iconButtonSize = component.size === 'sm' ? 'xs' : 'sm';

	return html`
		<div class="combo-box">
			<input class="combo-box__input"
				type="text"
				role="combobox"
				aria-label=${component.accessibleLabel || nothing}
				aria-expanded=${component._isOpen ? 'true' : 'false'}
				aria-controls=${component._menuId}
				aria-autocomplete="list"
				aria-haspopup="listbox"
				aria-activedescendant=${component._highlightedId || nothing}
				aria-invalid=${component.invalid ? 'true' : nothing}
				.value=${component._displayValue}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				name=${component.name || nothing}
				@input=${component._handleInput}
				@keydown=${component._handleKeydown}
				@blur=${component._handleBlur}
			>
			<div class="combo-box__input-fade"></div>
			<div class="combo-box__end">
				${component._displayValue ? html`
					<div class="combo-box__clear-button">
						<nldd-icon-button
							variant="neutral-transparent"
							size=${iconButtonSize}
							icon="dismiss"
							text=${component._t('components.combo-box.clear-action')}
							?disabled=${component.disabled}
							@click=${component._handleClear}
						></nldd-icon-button>
					</div>
				` : nothing}
				${renderValidationIcon(component)}
				<div class="combo-box__picker-button">
					<nldd-icon-button
						variant="neutral-tinted"
						size=${iconButtonSize}
						icon="chevron-down"
						text=${component._t('components.combo-box.open-menu-action')}
						?disabled=${component.disabled}
						@mousedown=${component._handlePickerMousedown}
						@click=${component._toggleMenu}
					></nldd-icon-button>
				</div>
			</div>
		</div>
		<slot @slotchange=${component._onSlotChange}></slot>
	`;
}

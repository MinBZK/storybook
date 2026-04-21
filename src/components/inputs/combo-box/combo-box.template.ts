import { html, nothing, TemplateResult } from 'lit';
import type { NLDDComboBox } from './combo-box.js';
import '../../actions/icon-button/icon-button.js';

export function comboBoxTemplate(component: NLDDComboBox): TemplateResult {
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
				.value=${component._displayValue}
				placeholder=${component.placeholder || nothing}
				?disabled=${component.disabled}
				name=${component.name || nothing}
				@input=${component._handleInput}
				@keydown=${component._handleKeydown}
				@blur=${component._handleBlur}
			>
			<div class="combo-box__actions">
				${component._displayValue ? html`
					<div class="combo-box__clear-action">
						<nldd-icon-button
							variant="neutral-transparent"
							size="sm"
							icon="dismiss"
							text=${component._t('components.combo-box.clear-action')}
							?disabled=${component.disabled}
							@click=${component._handleClear}
						></nldd-icon-button>
					</div>
				` : nothing}
				<div class="combo-box__picker">
					<nldd-icon-button
						variant="neutral-tinted"
						size="sm"
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

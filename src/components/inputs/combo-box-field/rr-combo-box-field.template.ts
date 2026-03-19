import { html, nothing, TemplateResult } from 'lit';
import type { RRComboBoxField } from './rr-combo-box-field.js';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

export function comboBoxFieldTemplate(component: RRComboBoxField): TemplateResult {
	return html`
		<div class="combo-box-field">
			<input class="combo-box-field__input"
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
			<div class="combo-box-field__picker">
				<rr-icon-button
					variant="neutral-tinted"
					size="sm"
					?disabled=${component.disabled}
					@mousedown=${component._handlePickerMousedown}
					@click=${component._toggleMenu}
				>
					<rr-icon name="chevron-down"></rr-icon>
					${component._t('components.combo-box-field.open-picker-action')}
				</rr-icon-button>
			</div>
		</div>
		<slot @slotchange=${component._onSlotChange}></slot>
	`;
}

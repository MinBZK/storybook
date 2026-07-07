import { html, nothing, TemplateResult } from 'lit';
import type { NLDDTokenField } from './token-field.js';
import '../token/token.js';
import '../../content/icon/icon.js';
import '../../actions/icon-button/icon-button.js';

function renderValidationIcon(component: NLDDTokenField): TemplateResult | typeof nothing {
	const name = component.invalid ? 'invalid' : component.valid ? 'valid' : null;
	if (!name) return nothing;
	return html`
		<div class="token-field__validation-icon-area">
			<nldd-icon class="token-field__validation-icon" name=${name} aria-hidden="true"></nldd-icon>
		</div>
	`;
}

function renderInput(component: NLDDTokenField): TemplateResult {
	return html`
		<input
			class="token-field__input"
			type=${component.type || 'text'}
			autocomplete=${component.autocomplete || nothing}
			spellcheck=${component.noSpellcheck ? 'false' : nothing}
			role="combobox"
			aria-label=${component.accessibleLabel || nothing}
			aria-haspopup="listbox"
			aria-autocomplete="list"
			aria-controls=${component._menuId}
			aria-expanded=${component._isOpen ? 'true' : 'false'}
			aria-activedescendant=${component._highlightedId || nothing}
			aria-invalid=${component.invalid ? 'true' : nothing}
			.value=${component._text}
			placeholder=${component.placeholder || nothing}
			?disabled=${component.disabled}
			@input=${component._handleInput}
			@blur=${component._handleBlur}
			@keydown=${component._handleKeydown}
		>
	`;
}

function renderPicker(component: NLDDTokenField): TemplateResult {
	return html`
		<div class="token-field__picker">
			<nldd-icon-button
				variant="neutral-tinted"
				size="sm"
				icon="chevron-down"
				text=${component._t('components.token-field.open-menu-action')}
				tooltip-timing="never"
				?disabled=${component.disabled}
				?expanded=${component._isOpen}
				popup-type="listbox"
				@pointerdown=${component._handlePickerPointerdown}
				@click=${component._togglePicker}
			></nldd-icon-button>
		</div>
	`;
}

export function tokenFieldTemplate(component: NLDDTokenField): TemplateResult {
	return html`
		<div
			class="token-field"
			data-invalid=${component.invalid ? '' : nothing}
			data-valid=${component.valid && !component.invalid ? '' : nothing}
			@click=${component._handleFieldClick}
		>
			<div class="token-field__content">
				${component.values.map(
					(value, index) => html`
						<nldd-token
							class="token-field__token"
							control=${component.readonly ? nothing : 'dismiss'}
							tabindex=${component.readonly ? nothing : '-1'}
							dismiss-text=${component._t('components.token-field.dismiss-action')}
							?disabled=${component.disabled}
							data-value=${value}
							@dismiss=${() => component._removeValue(value)}
							@keydown=${(e: KeyboardEvent) => component._handleTokenKeydown(e, index)}
						>${component._labelFor(value)}</nldd-token>
					`,
				)}
				${component._showInput || component._showPicker
					? html`
						<div class="token-field__field">
							${component._showInput ? renderInput(component) : nothing}
							${component._showPicker ? renderPicker(component) : nothing}
						</div>
					`
					: nothing}
			</div>
			${renderValidationIcon(component)}
		</div>
		<slot @slotchange=${component._onSlotChange}></slot>
	`;
}

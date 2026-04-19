import { html, nothing, TemplateResult } from 'lit';
import type { NLDDSearchField } from './search-field.js';
import './../../actions/icon-button/icon-button.js';
import './../../actions/button/button.js';
import './../../content/icon/icon.js';

export function searchFieldTemplate(component: NLDDSearchField): TemplateResult {
	const buttonSize = component.size === 'sm' ? 'xs' : 'sm';

	return html`
		<div class="search-field">
			<div class="search-field__search-icon">
				<nldd-icon name="search"></nldd-icon>
			</div>
			<input class="search-field__input"
				type="search"
				.value=${component.value}
				placeholder=${component.placeholder}
				aria-label=${component.accessibleLabel || component.placeholder || nothing}
				?disabled=${component.disabled}
				name=${component.name || nothing}
				@input=${component._handleInput}
				@change=${component._handleChange}
				@keydown=${component._handleKeydown}
			>
			<div class="search-field__fade"></div>
			<div class="search-field__actions">
				${component.value ? html`
					<div class="search-field__dismiss-action">
						<nldd-icon-button
							variant="neutral-transparent"
							size=${buttonSize}
							icon="dismiss"
							text=${component._t('components.search-field.dismiss-action')}
							@click=${component._handleDismiss}
						></nldd-icon-button>
					</div>
				` : nothing}
				${component.hasSearchButton ? html`
					<div class="search-field__search-action">
						<nldd-button
							variant="neutral-tinted"
							size=${buttonSize}
							text=${component._t('components.search-field.search-action')}
							@click=${component._handleSearch}
						></nldd-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

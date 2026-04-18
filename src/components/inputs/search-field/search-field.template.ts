import { html, nothing, TemplateResult } from 'lit';
import type { NDDSearchField } from './ndd-search-field.js';
import './../../actions/icon-button/ndd-icon-button.ts';
import './../../actions/button/ndd-button.ts';
import './../../content/icon/ndd-icon.ts';

export function searchFieldTemplate(component: NDDSearchField): TemplateResult {
	const buttonSize = component.size === 'sm' ? 'xs' : 'sm';

	return html`
		<div class="search-field">
			<div class="search-field__search-icon">
				<ndd-icon name="search"></ndd-icon>
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
						<ndd-icon-button
							variant="neutral-transparent"
							size=${buttonSize}
							icon="dismiss"
							text=${component._t('components.search-field.dismiss-action')}
							@click=${component._handleDismiss}
						></ndd-icon-button>
					</div>
				` : nothing}
				${component.hasSearchButton ? html`
					<div class="search-field__search-action">
						<ndd-button
							variant="neutral-tinted"
							size=${buttonSize}
							text=${component._t('components.search-field.search-action')}
							@click=${component._handleSearch}
						></ndd-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

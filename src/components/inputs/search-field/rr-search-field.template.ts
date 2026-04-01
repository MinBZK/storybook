import { html, nothing, TemplateResult } from 'lit';
import type { RRSearchField } from './rr-search-field.js';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../actions/button/rr-button.ts';
import './../../content/icon/rr-icon.ts';

export function searchFieldTemplate(component: RRSearchField): TemplateResult {
	const buttonSize = component.size === 'sm' ? 'xs' : 'sm';

	return html`
		<div class="search-field">
			<div class="search-field__search-icon">
				<rr-icon name="search"></rr-icon>
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
						<rr-icon-button
							variant="neutral-transparent"
							size=${buttonSize}
							icon="dismiss"
							text=${component._t('components.search-field.dismiss-action')}
							@click=${component._handleDismiss}
						></rr-icon-button>
					</div>
				` : nothing}
				${component.hasSearchButton ? html`
					<div class="search-field__search-action">
						<rr-button
							variant="neutral-tinted"
							size=${buttonSize}
							text=${component._t('components.search-field.search-action')}
							@click=${component._handleSearch}
						></rr-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { RRDocumentTabBar, RRDocumentTabBarItem } from './rr-document-tab-bar.ts';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

export function documentTabBarTemplate(component: RRDocumentTabBar): TemplateResult {
	const hasOverflow = component._overflowCount > 0;
	const label = component.accessibleLabel || 'Tabbladen';
	const menuId = `${component._id}-menu`;

	return html`
		<nav class="document-tab-bar"
			aria-label=${label}
		>
			<div class="document-tab-bar__items"
				role="tablist"
			>
				<slot @slotchange=${component._onSlotChange}></slot>
			</div>
			<div class=${classMap({ 'document-tab-bar__overflow': true, 'is-hidden': !hasOverflow })}>
				<rr-icon-button
					label=${component.overflowButtonLabel}
					variant="neutral-tinted"
					aria-haspopup="menu"
					aria-expanded=${component._menuOpen ? 'true' : 'false'}
					aria-controls=${menuId}
					@click=${component._onOverflowButtonClick}
				>
					<rr-icon name="ellipsis"></rr-icon>
				</rr-icon-button>
			</div>
			<div class="document-tab-bar__end">
				<slot name="end"></slot>
			</div>
		</nav>
		<div class="document-tab-bar__polite-announcer"
			role="status"
			aria-live="polite"
			aria-atomic="true"
		></div>
		<div class="document-tab-bar__assertive-announcer"
			role="alert"
			aria-live="assertive"
			aria-atomic="true"
		></div>
	`;
}

export function documentTabBarItemTemplate(component: RRDocumentTabBarItem): TemplateResult {
	const shortTextValue = component.shortText || component.text;
	const shortSupportingTextValue = component.shortSupportingText || component.supportingText;

	return html`
		<div class="document-tab-bar__item">
			<div class="document-tab-bar__item-tab"
				role="tab"
				aria-selected=${component.selected}
				tabindex=${component.selected ? '0' : '-1'}
				@click=${component._handleClick}
			>
				<span class="document-tab-bar__item-text">${component.text}</span>
				<span class="document-tab-bar__item-short-text"aria-label="${component.text}">${shortTextValue}</span>
				${component.supportingText
					? html`<span class="document-tab-bar__item-supporting-text">${component.supportingText}</span>`
					: nothing}
				${shortSupportingTextValue
					? html`<span class="document-tab-bar__item-short-supporting-text" aria-label="${component.supportingText}">${shortSupportingTextValue}</span>`
					: nothing}
			</div>
			<button class="document-tab-bar__item-dismiss-button"
				aria-label=${component._dismissButtonAccessibilityLabel}
				tabindex=${component.selected ? '0' : '-1'}
				@click=${component._handleDismiss}
			>
				<span class="document-tab-bar__item-dismiss-icon">
					<rr-icon name="dismiss"></rr-icon>
				</span>
			</button>
		</div>
	`;
}

import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { RRDocumentTabBar, RRDocumentTabBarItem } from './rr-document-tab-bar.ts';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

export function documentTabBarTemplate(component: RRDocumentTabBar): TemplateResult {
	const hasOverflow = component._overflowCount > 0;
	const label = component.accessibleLabel || 'Tabbladen';
	const menuId = `${component._id}-menu`;
	const isNavigation = component.navigation;

	const inner = html`
		<div class="document-tab-bar__items"
			role=${isNavigation ? nothing : 'tablist'}
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
	`;

	return html`
		${isNavigation
			? html`<nav class="document-tab-bar" aria-label=${label}>${inner}</nav>`
			: html`<div class="document-tab-bar" aria-label=${label}>${inner}</div>`}
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
	const isNavigation = component._navigation;
	const isLink = Boolean(component.href);
	const tabindex = component.selected || component._isFallbackFocusable ? '0' : '-1';

	const tabContent = html`
		<span class="document-tab-bar__item-text">${component.text}</span>
		<span class="document-tab-bar__item-short-text"
			aria-label=${component.text}
			title=${component.text}
		>${shortTextValue}</span>
		${component.supportingText
			? html`<span class="document-tab-bar__item-supporting-text">${component.supportingText}</span>`
			: nothing}
		${shortSupportingTextValue
			? html`<span class="document-tab-bar__item-short-supporting-text"
				aria-label=${component.supportingText || nothing}
				title=${component.supportingText || nothing}
			>${shortSupportingTextValue}</span>`
			: nothing}
	`;

	const tab = isLink
		? html`<a class="document-tab-bar__item-tab"
				href=${component.href}
				role=${isNavigation ? nothing : 'tab'}
				aria-current=${isNavigation && component.selected ? 'page' : nothing}
				aria-selected=${!isNavigation ? (component.selected ? 'true' : 'false') : nothing}
				tabindex=${tabindex}
				@click=${component._handleClick}
			>${tabContent}</a>`
		: html`<div class="document-tab-bar__item-tab"
				role="tab"
				aria-selected=${component.selected ? 'true' : 'false'}
				tabindex=${tabindex}
				@click=${component._handleClick}
			>${tabContent}</div>`;

	return html`
		<div class="document-tab-bar__item">
			${tab}
			<button class="document-tab-bar__item-dismiss-button"
				aria-label=${component._dismissButtonAccessibilityLabel}
				tabindex=${component.selected || component._isFallbackFocusable ? '0' : '-1'}
				@click=${component._handleDismiss}
			>
				<span class="document-tab-bar__item-dismiss-icon">
					<rr-icon name="dismiss"></rr-icon>
				</span>
			</button>
		</div>
	`;
}

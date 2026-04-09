import { html, nothing, TemplateResult } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { NDDDocumentTabBar, NDDDocumentTabBarItem } from './ndd-document-tab-bar.ts';
import './../../actions/icon-button/ndd-icon-button.ts';
import './../../content/icon/ndd-icon.ts';
import './../../content/tooltip/ndd-tooltip.ts';

export function documentTabBarTemplate(component: NDDDocumentTabBar): TemplateResult {
	const hasOverflow = component._overflowCount > 0;
	const label = component.accessibleLabel || 'Tabbladen';
	const isNavigation = component.navigation;

	const inner = html`
		<div class="document-tab-bar__items"
			role=${isNavigation ? nothing : 'tablist'}
			aria-label=${isNavigation ? nothing : label}
		>
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
		<div class=${classMap({ 'document-tab-bar__overflow': true, 'is-hidden': !hasOverflow })}>
			<ndd-icon-button
				text=${component._t('components.document-tab-bar.overflow-action')}
				variant="neutral-tinted"
				icon="ellipsis"
				aria-haspopup="menu"
				aria-expanded=${component._menuOpen ? 'true' : 'false'}
				@click=${component._onOverflowButtonClick}
			>
				<!-- aria-controls omitted: ARIA IDREF attributes cannot cross shadow DOM boundaries.
					 aria-haspopup + aria-expanded provide sufficient AT context for WCAG 2.1 AA.
					 Restore aria-controls once ndd-menu moves into the shadow root or CSS Anchor
					 Positioning allows the menu to escape stacking context without document.body. -->
			</ndd-icon-button>
		</div>
		<div class="document-tab-bar__end" hidden>
			<slot name="end" @slotchange=${component._onEndSlotChange}></slot>
		</div>
	`;

	return html`
		${isNavigation
			? html`<nav class="document-tab-bar" aria-label=${label}>${inner}</nav>`
			: html`<div class="document-tab-bar">${inner}</div>`}
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

export function documentTabBarItemTemplate(component: NDDDocumentTabBarItem): TemplateResult {
	const shortTextValue = component.shortText || component.text;
	const shortSupportingTextValue = component.shortSupportingText || component.supportingText;
	const isNavigation = component._navigation;
	const safeHref = component._sanitizeUrl(component.href);
	const isLink = Boolean(safeHref);
	const tabindex = component.selected || component._isFallbackFocusable ? '0' : '-1';

	const tooltipText = component.supportingText
		? `${component.text} · ${component.supportingText}`
		: component.text;

	const tabContent = html`
		<span class="document-tab-bar__item-normal">
			<span class="document-tab-bar__item-text">${component.text}</span>
			${component.supportingText
				? html`<span class="document-tab-bar__item-supporting-text">${component.supportingText}</span>`
				: nothing}
		</span>
		<span class="document-tab-bar__item-short">
			<ndd-tooltip text=${tooltipText}>
				<span class="document-tab-bar__item-short-text">${shortTextValue}</span>
				${shortSupportingTextValue
					? html`<span class="document-tab-bar__item-short-supporting-text">${shortSupportingTextValue}</span>`
					: nothing}
			</ndd-tooltip>
		</span>
	`;

	const tab = isLink
		? html`<a class="document-tab-bar__item-tab"
				href=${safeHref!}
				role=${isNavigation ? nothing : 'tab'}
				aria-current=${isNavigation && component.selected ? 'page' : nothing}
				aria-selected=${!isNavigation ? (component.selected ? 'true' : 'false') : nothing}
				tabindex=${tabindex}
				@click=${component._handleClick}
			>${tabContent}</a>`
		: html`<button class="document-tab-bar__item-tab"
				type="button"
				role="tab"
				aria-selected=${component.selected ? 'true' : 'false'}
				tabindex=${tabindex}
				@click=${component._handleClick}
			>${tabContent}</button>`;

	return html`
		<div class="document-tab-bar__item">
			${tab}
			<button class="document-tab-bar__item-dismiss-button"
				aria-label=${component._dismissButtonAccessibilityLabel}
				tabindex=${component.selected || component._isFallbackFocusable ? '0' : '-1'}
				@click=${component._handleDismiss}
			>
				<span class="document-tab-bar__item-dismiss-icon">
					<ndd-icon name="dismiss"></ndd-icon>
				</span>
			</button>
		</div>
	`;
}

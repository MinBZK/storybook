import { html, nothing, TemplateResult } from 'lit';
import type { RRTabBar, RRTabBarItem } from './rr-tab-bar.ts';

export function tabBarTemplate(component: RRTabBar): TemplateResult {
	const label = component.accessibleLabel || 'Tabs';
	const isNavigation = component.navigation;

	const itemsContainer = html`
		<div class="tab-bar__items"
			role=${isNavigation ? nothing : 'tablist'}
			aria-label=${isNavigation ? label : nothing}
		>
			<slot @slotchange=${component._onSlotChange}></slot>
		</div>
	`;

	if (isNavigation) {
		return html`
			<nav class="tab-bar" aria-label=${label}>
				${itemsContainer}
			</nav>
		`;
	}

	return html`
		<div class="tab-bar">
			${itemsContainer}
		</div>
	`;
}

export function tabBarItemTemplate(component: RRTabBarItem): TemplateResult {
	const safeHref = component._sanitizeUrl(component.href);
	const isLink = Boolean(safeHref);
	const isNavigation = component._navigation;
	const tabindex = component.disabled ? '-1' : (component.selected || component._isFallbackFocusable) ? '0' : '-1';
	const isIconVariant = component._effectiveVariant === 'icon';
	const iconLabel = isIconVariant ? component.text || nothing : nothing;

	const content = html`
		<span class="tab-bar__item-indicator"></span>
		<span class="tab-bar__item-icon" aria-hidden="true">
			<slot name="icon" @slotchange=${component._onIconSlotChange}></slot>
		</span>
		<span class="tab-bar__item-text">
			${component.text}
		</span>
	`;

	if (isLink) {
		return html`
			<a class="tab-bar__item"
				href=${safeHref!}
				role=${isNavigation ? nothing : 'tab'}
				aria-current=${isNavigation && component.selected ? 'page' : nothing}
				aria-selected=${!isNavigation ? (component.selected ? 'true' : 'false') : nothing}
				aria-disabled=${component.disabled || nothing}
				aria-label=${iconLabel}
				title=${iconLabel}
				tabindex=${tabindex}
				@click=${component._handleClick}
			>${content}</a>
		`;
	}

	return html`
		<button class="tab-bar__item"
			type="button"
			role="tab"
			aria-selected=${component.selected ? 'true' : 'false'}
			?disabled=${component.disabled}
			aria-label=${iconLabel}
			title=${iconLabel}
			tabindex=${tabindex}
			@click=${component._handleClick}
		>${content}</button>
	`;
}

import { html, nothing, TemplateResult } from 'lit';
import type { RRTabBar, RRTabBarItem } from './rr-tab-bar.ts';

export function tabBarTemplate(component: RRTabBar): TemplateResult {
	const label = component.accessibleLabel || 'Tabs';

	return html`
		<nav class="tab-bar"
			aria-label=${label}
		>
			<div class="tab-bar__items"
				role="tablist"
			>
				<slot @slotchange=${component._onSlotChange}></slot>
			</div>
		</nav>
	`;
}

export function tabBarItemTemplate(component: RRTabBarItem): TemplateResult {
	const safeHref = component._sanitizeUrl(component.href);
	const isLink = Boolean(safeHref);
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
				role="tab"
				aria-selected=${component.selected}
				aria-disabled=${component.disabled}
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
			aria-selected=${component.selected}
			?disabled=${component.disabled}
			aria-label=${iconLabel}
			title=${iconLabel}
			tabindex=${tabindex}
			@click=${component._handleClick}
		>${content}</button>
	`;
}

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
	`;
}

export function documentTabBarItemTemplate(component: RRDocumentTabBarItem): TemplateResult {
	const shortTitle = component.shortTitle || component.title;
	const shortSubtitle = component.shortSubtitle || component.subtitle;
	const fullLabel = component.subtitle
		? `${component.title} · ${component.subtitle}`
		: component.title;

	return html`
		<div class="document-tab-bar__item"
			role="tab"
			aria-selected=${component.selected}
			aria-label=${fullLabel || nothing}
			title=${fullLabel || nothing}
			tabindex=${component.disabled ? '-1' : '0'}
			@click=${component._handleClick}
		>
			<div class="document-tab-bar__item-title-area">
				<span class="document-tab-bar__item-title document-tab-bar__item-title--regular">
					${component.title}
				</span>
				<span class="document-tab-bar__item-title document-tab-bar__item-title--short">
					${shortTitle}
				</span>
				${component.subtitle
					? html`<span class="document-tab-bar__item-subtitle document-tab-bar__item-subtitle--regular">${component.subtitle}</span>`
					: nothing}
				${shortSubtitle
					? html`<span class="document-tab-bar__item-subtitle document-tab-bar__item-subtitle--short">${shortSubtitle}</span>`
					: nothing}
			</div>
			<button class="document-tab-bar__item-dismiss-button"
				aria-label="Sluiten"
				tabindex="-1"
				@click=${component._handleDismiss}
			>
				<span class="document-tab-bar__item-dismiss-icon">
					<rr-icon name="dismiss"></rr-icon>
				</span>
			</button>
		</div>
	`;
}

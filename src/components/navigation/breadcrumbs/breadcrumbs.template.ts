/* eslint-disable lit-a11y/list -- breadcrumbs are <nav><ol>…</ol></nav>
   per WCAG H48. The slotted children are nldd-breadcrumbs-item custom
   elements (each sets role="listitem" on its host); the lit-a11y/list
   rule can't see through the slot/role chain. */
import { html, nothing, type TemplateResult } from 'lit';
import type { NLDDBreadcrumbs, NLDDBreadcrumbsItem } from './breadcrumbs.js';
import '../../content/icon/icon.js';

export function breadcrumbsTemplate(component: NLDDBreadcrumbs): TemplateResult {
	const label = component._t('components.breadcrumbs.accessible-label');
	const levelUpLabel = component._t('components.breadcrumbs.level-up-label');
	const parent = component._parentItem();
	const levelUpText = parent?.text || parent?.textContent?.trim() || levelUpLabel;

	return html`
		<nav class="breadcrumbs"
			aria-label=${label}
		>
			<a class="breadcrumbs__level-up"
				href=${parent?.href ?? nothing}
				?hidden=${!parent}
			>
				<span class="breadcrumbs__level-up-icon">
					<nldd-icon name="chevron-left"></nldd-icon>
				</span>
				<span class="breadcrumbs__level-up-text">${levelUpText}</span>
			</a>
			<ol class="breadcrumbs__list">
				<slot @slotchange=${component._onSlotChange}></slot>
			</ol>
		</nav>
	`;
}

export function breadcrumbsItemTemplate(component: NLDDBreadcrumbsItem): TemplateResult {
	const label = component.text || html`<slot></slot>`;
	const separator = html`<span class="breadcrumbs__separator"
		aria-hidden="true"
	><nldd-icon name="chevron-right-small"></nldd-icon></span>`;
	if (!component.current && component.href) {
		return html`
			<span class="breadcrumbs__item">
				<a class="breadcrumbs__item-link"
					href=${component.href}
				>${label}</a>
			</span>${separator}
		`;
	}
	return html`<span class="breadcrumbs__item">${label}</span>${separator}`;
}

/* eslint-disable lit-a11y/list -- breadcrumbs are <nav><ol>…</ol></nav>
   per WCAG H48. The slotted children are nldd-breadcrumbs-item custom
   elements (each sets role="listitem" on its host); the lit-a11y/list
   rule can't see through the slot/role chain. */
import { html, nothing } from 'lit';
import type { NLDDBreadcrumbs, NLDDBreadcrumbsItem } from './breadcrumbs.js';
import '../../content/icon/icon.js';

export function breadcrumbsTemplate(this: NLDDBreadcrumbs) {
	const label = this._t('components.breadcrumbs.accessible-label');
	const levelUpLabel = this._t('components.breadcrumbs.level-up-label');
	const parent = this._parentItem();
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
				<slot @slotchange=${this._onSlotChange}></slot>
			</ol>
		</nav>
	`;
}

export function breadcrumbsItemTemplate(this: NLDDBreadcrumbsItem) {
	const label = this.text || html`<slot></slot>`;
	const separator = html`<span class="breadcrumbs__separator"
		aria-hidden="true"
	><nldd-icon name="chevron-right-small"></nldd-icon></span>`;
	if (this.current) {
		return html`
			<span class="breadcrumbs__item"
				aria-current="page"
			>${label}</span>${separator}
		`;
	}
	if (this.href) {
		return html`
			<span class="breadcrumbs__item">
				<a class="breadcrumbs__item-link"
					href=${this.href}
				>${label}</a>
			</span>${separator}
		`;
	}
	return html`<span class="breadcrumbs__item">${label}</span>${separator}`;
}

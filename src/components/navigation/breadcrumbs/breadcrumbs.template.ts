import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
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
			<div class="breadcrumbs__list"
				role="list"
			>
				<slot @slotchange=${this._onSlotChange}></slot>
			</div>
		</nav>
		${this.noSeo ? nothing : this._renderJsonLd()}
	`;
}

/**
 * Render the BreadcrumbList JSON-LD as an inline <script>. Lit escapes
 * text content by default which would break the JSON; use unsafeHTML
 * here — the content is generated from our own data, not user input.
 */
export function renderBreadcrumbsJsonLd(this: NLDDBreadcrumbs) {
	const items = this._items();
	if (items.length === 0) return nothing;
	const json = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.text || item.textContent?.trim() || '',
			...(item.href ? { item: item.href } : {}),
		})),
	};
	return html`<script type="application/ld+json">${unsafeHTML(JSON.stringify(json))}</script>`;
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

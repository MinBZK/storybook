import { html, nothing, type TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { NLDDBreadcrumbs, NLDDBreadcrumbsItem } from './breadcrumbs.js';
import '../../content/icon/icon.js';

export function breadcrumbsTemplate(component: NLDDBreadcrumbs): TemplateResult {
	const label = component._t('components.breadcrumbs.accessible-label');
	const levelUpLabel = component._t('components.breadcrumbs.level-up-label');
	const parent = component._parentItem();
	const levelUpText = parent ? (parent.text || parent.textContent?.trim() || levelUpLabel) : '';

	return html`
		<nav class="breadcrumbs"
			aria-label=${label}
		>
			${parent ? html`
				<a class="breadcrumbs__level-up"
					href=${ifDefined(parent.href)}
				>
					<span class="breadcrumbs__level-up-icon"
						aria-hidden="true"
					>
						<nldd-icon name="chevron-left"></nldd-icon>
					</span>
					<span class="breadcrumbs__level-up-text">${levelUpText}</span>
				</a>
			` : nothing}
			<div class="breadcrumbs__items"
				role="list"
			>
				<slot @slotchange=${component._onSlotChange}></slot>
			</div>
		</nav>
	`;
}

export function breadcrumbsItemTemplate(component: NLDDBreadcrumbsItem): TemplateResult {
	// `text=""` (empty string) intentionally falls through to the slot —
	// Lit normalises the absent-attribute case to '', so a single falsy
	// check covers both "no text attr" and "explicit empty text".
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
	// aria-current also lives on the host (for the role=listitem) — mirroring
	// here makes it visible to AT+browser combinations (e.g. VoiceOver/Safari)
	// that miss reflected ARIA on shadow hosts.
	return html`<span class="breadcrumbs__item"
		aria-current=${component.current ? 'page' : nothing}
	>${label}</span>${separator}`;
}

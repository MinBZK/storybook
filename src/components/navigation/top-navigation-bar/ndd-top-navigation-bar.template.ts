import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NDDTopNavigationBar, NDDMenuBarItem } from './ndd-top-navigation-bar.js';
// @ts-expect-error Vite raw import
import rijkswapenSvg from './rijkswapen.svg?raw';

// # Menu bar item template

export function menuBarItemTemplate(this: NDDMenuBarItem) {
	const safeHref = this._sanitizeUrl(this.href);
	const isLink = Boolean(safeHref);
	const tabindex = this.disabled ? '-1' : '0';

	const iconPart = this.icon ? html`
		<span class="top-navigation-bar__menu-item-icon">
			<ndd-icon name=${this.icon}></ndd-icon>
		</span>
	` : nothing;

	const disclosurePart = this.expandable ? html`
		<span class="top-navigation-bar__menu-item-disclosure-icon">
			<ndd-icon name="chevron-down-small"></ndd-icon>
		</span>
	` : nothing;

	if (isLink) {
		return html`
			<a class="top-navigation-bar__menu-item"
				href=${safeHref!}
				aria-disabled=${this.disabled}
				aria-current=${this.selected ? 'page' : nothing}
				tabindex=${tabindex}
			>
				${iconPart}
				<span class="top-navigation-bar__menu-item-content">${this.text}</span>
				${disclosurePart}
			</a>
		`;
	}

	return html`
		<button class="top-navigation-bar__menu-item"
			type="button"
			?disabled=${this.disabled}
			aria-current=${this.selected ? 'page' : nothing}
			tabindex=${tabindex}
		>
			${iconPart}
			<span class="top-navigation-bar__menu-item-content">${this.text}</span>
			${disclosurePart}
		</button>
	`;
}

// # Top navigation bar template

export function template(this: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar">
			${!this.noLogo ? html`
				<div class="top-navigation-bar__logo-bar">
					${renderLogo.call(this)}
				</div>
			` : nothing}
			${!this.noTitle ? html`
				<div class="top-navigation-bar__title-bar">
					<span class="top-navigation-bar__title-item">${this.websiteTitle}</span>
				</div>
			` : nothing}
			<nav class="top-navigation-bar__menu-bar"
				aria-label="${this._t('components.top-navigation-bar.main-navigation')}"
			>
				<div class="top-navigation-bar__menu-bar-start">
					${this.hasBackButton ? renderBackButton.call(this) : nothing}
					${!this.noTitle ? html`
						<span class="top-navigation-bar__title-item top-navigation-bar__title-item--inline">${this.websiteTitle}</span>
					` : nothing}
					${renderGlobalBar.call(this)}
				</div>
				<div class="top-navigation-bar__menu-bar-end">
					<slot name="utility"></slot>
					<ndd-menu-bar-item class="top-navigation-bar__utility-overflow-menu-item"
						text="${this._overflowText}"
						icon="ellipsis"
						icon-only
						aria-haspopup="menu"
						@click=${this._onUtilityOverflowClick}
					></ndd-menu-bar-item>
				</div>
			</nav>
		</div>
	`;
}

// ## Logo

function renderLogo(this: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar__logo"
			role="img"
			aria-label="${this._t('components.top-navigation-bar.logo-label')}"
		>
			${unsafeHTML(rijkswapenSvg)}
		</div>
		${this.logoHasWordmark ? html`
			<div class="top-navigation-bar__wordmark">
				${this.logoTitle ? html`<p class="top-navigation-bar__wordmark-title">${this.logoTitle}</p>` : nothing}
				${this.logoSubtitle ? html`<p class="top-navigation-bar__wordmark-subtitle">${this.logoSubtitle}</p>` : nothing}
				${this.logoSupportingText1 ? html`<p class="top-navigation-bar__wordmark-supporting">${this.logoSupportingText1}</p>` : nothing}
				${this.logoSupportingText2 ? html`<p class="top-navigation-bar__wordmark-supporting">${this.logoSupportingText2}</p>` : nothing}
			</div>
		` : nothing}
	`;
}

// ## Back button

function renderBackButton(this: NDDTopNavigationBar) {
	return html`
		<ndd-menu-bar-item
			icon="arrow-left"
			text="${this._backText}"
			href=${this.backHref || nothing}
			aria-label="${this._backText}"
			@click="${this._handleBackClick}"
		></ndd-menu-bar-item>
	`;
}

// ## Global bar (horizontal menu items + overflow)

function renderGlobalBar(this: NDDTopNavigationBar) {
	return html`
		<nav class="top-navigation-bar__global-bar" role="none">
			<ndd-menu-bar-item class="top-navigation-bar__menu-button"
				icon="list"
				text="${this._menuText}"
			></ndd-menu-bar-item>
			<slot name="global"></slot>
			<ndd-menu-bar-item class="top-navigation-bar__overflow-menu-item"
				text="${this._overflowText}"
				icon="ellipsis"
				icon-only
				aria-haspopup="menu"
				@click=${this._onOverflowClick}
			></ndd-menu-bar-item>
		</nav>
	`;
}

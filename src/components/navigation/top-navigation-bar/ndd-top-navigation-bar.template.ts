import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NDDTopNavigationBar, NDDMenuBarItem } from './ndd-top-navigation-bar.js';
import logoSvg from './logo.svg?raw';

// # Menu bar item template

export function menuBarItemTemplate(this: NDDMenuBarItem) {
	const safeHref = this._sanitizeUrl(this.href);
	const isLink = Boolean(safeHref);
	const tabindex = this.disabled ? '-1' : '0';

	if (isLink) {
		return html`
			<a class="top-navigation-bar__menu-item"
				href=${safeHref!}
				aria-disabled=${this.disabled}
				aria-current=${this.current ? 'page' : nothing}
				aria-label=${this.accessibleLabel || nothing}
				aria-haspopup=${this.haspopup || nothing}
				aria-expanded=${this.haspopup ? String(this.open) : nothing}
				tabindex=${tabindex}
			>
				${this.icon ? html`<span class="top-navigation-bar__menu-item-icon"><ndd-icon name=${this.icon}></ndd-icon></span>` : nothing}
				<span class="top-navigation-bar__menu-item-text">${this.text}</span>
				${this.expandable ? html`<span class="top-navigation-bar__menu-item-disclosure-icon"><ndd-icon name="chevron-down-small"></ndd-icon></span>` : nothing}
			</a>
			<slot></slot>
		`;
	}

	return html`
		<button class="top-navigation-bar__menu-item"
			type="button"
			?disabled=${this.disabled}
			aria-current=${this.current ? 'page' : nothing}
			aria-label=${this.accessibleLabel || nothing}
			aria-haspopup=${this.haspopup || nothing}
			aria-expanded=${this.haspopup ? String(this.open) : nothing}
			tabindex=${tabindex}
		>
			${this.icon ? html`<span class="top-navigation-bar__menu-item-icon"><ndd-icon name=${this.icon}></ndd-icon></span>` : nothing}
			<span class="top-navigation-bar__menu-item-text">${this.text}</span>
			${this.expandable ? html`<span class="top-navigation-bar__menu-item-disclosure-icon"><ndd-icon name="chevron-down-small"></ndd-icon></span>` : nothing}
		</button>
		<slot></slot>
	`;
}

// # Top navigation bar template

export function template(this: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar">
			<div class="top-navigation-bar__logo-bar">
				${renderLogo.call(this)}
			</div>
			<div class="top-navigation-bar__main-bar">
				${this.websiteTitle ? html`
					<div class="top-navigation-bar__title-bar">
						<span class="top-navigation-bar__title">${this.websiteTitle}</span>
					</div>
				` : nothing}
				<nav class="top-navigation-bar__menu-bar"
					aria-label="${this._t('components.top-navigation-bar.main-navigation-label')}"
				>
					<div class="top-navigation-bar__menu-bar-start">
						${this._hasBackButton ? renderBackButton.call(this) : nothing}
						${renderGlobalBar.call(this)}
					</div>
					<nav class="top-navigation-bar__menu-bar-end"
						aria-label="${this._t('components.top-navigation-bar.utility-navigation-label')}"
					>
						<slot name="utility"></slot>
						<div class="top-navigation-bar__overflow-button"
							id="utility-overflow-button"
						>
							<ndd-menu-bar-item
								text="${this._overflowText}"
								icon="ellipsis"
								icon-only
								accessible-label="${this._t('components.top-navigation-bar.overflow-label')}"
								haspopup="menu"
								@click=${this._onUtilityOverflowClick}
							></ndd-menu-bar-item>
						</div>
					</nav>
				</nav>
			</div>
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
			${unsafeHTML(logoSvg)}
		</div>
		${this.logoTitle ? html`
			<div class="top-navigation-bar__wordmark">
				<p class="top-navigation-bar__wordmark-title">${this.logoTitle}</p>
				${this.logoSubtitle ? html`<p class="top-navigation-bar__wordmark-subtitle">${this.logoSubtitle}</p>` : nothing}
				${this.logoSupportingText1 ? html`<p class="top-navigation-bar__wordmark-supporting-text">${this.logoSupportingText1}</p>` : nothing}
				${this.logoSupportingText2 ? html`<p class="top-navigation-bar__wordmark-supporting-text">${this.logoSupportingText2}</p>` : nothing}
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
			accessible-label="${this._backText}"
			@click="${this._handleBackClick}"
		></ndd-menu-bar-item>
	`;
}

// ## Global bar (horizontal menu items + overflow)

function renderGlobalBar(this: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar__global-bar">
			<div class="top-navigation-bar__menu-button">
				<ndd-menu-bar-item
					icon="menu"
					text="${this._menuText}"
					haspopup="dialog"
					@click=${this._onMenuButtonClick}
				></ndd-menu-bar-item>
			</div>
			<slot name="global"></slot>
			<div class="top-navigation-bar__overflow-button"
				id="global-overflow-button"
			>
				<ndd-menu-bar-item
					text="${this._overflowText}"
					icon="ellipsis"
					icon-only
					accessible-label="${this._t('components.top-navigation-bar.overflow-label')}"
					haspopup="menu"
					@click=${this._onOverflowClick}
				></ndd-menu-bar-item>
			</div>
		</div>
	`;
}

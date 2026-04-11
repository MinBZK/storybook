import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NDDTopNavigationBar, NDDTopNavigationBarMenuItem } from './ndd-top-navigation-bar.js';
import logoSvg from './logo.svg?raw';

// # Menu bar item template

export function menuBarItemTemplate(this: NDDTopNavigationBarMenuItem) {
	const safeHref = this._sanitizeUrl(this.href);
	const isLink = Boolean(safeHref);
	const tabindex = this.disabled ? '-1' : '0';

	if (isLink) {
		return html`
			<a class="top-navigation-bar__menu-item"
				href=${safeHref as string}
				aria-disabled=${this.disabled || nothing}
				aria-current=${this.current && !this.expandable ? 'page' : nothing}
				aria-label=${this.accessibleLabel || this.text || nothing}
				aria-haspopup=${this.expandable ? 'menu' : (this.haspopup || nothing)}
				aria-expanded=${(this.expandable || this.haspopup) ? String(this.open) : nothing}
				tabindex=${tabindex}
			>
				${this.icon ? html`
					<span class="top-navigation-bar__menu-item-icon">
						<ndd-icon name=${this.icon}></ndd-icon>
					</span>
				` : nothing}
				<span class="top-navigation-bar__menu-item-text">
					${this.text}
				</span>
				${this.expandable ? html`
					<span class="top-navigation-bar__menu-item-disclosure-icon">
						<ndd-icon name="chevron-down-small"></ndd-icon>
					</span>
				` : nothing}
			</a>
			<slot></slot>
		`;
	}

	return html`
		<button class="top-navigation-bar__menu-item"
			type="button"
			?disabled=${this.disabled}
			aria-current=${this.current && !this.expandable ? 'page' : nothing}
			aria-label=${this.accessibleLabel || this.text || nothing}
			aria-haspopup=${this.expandable ? 'menu' : (this.haspopup || nothing)}
			aria-expanded=${(this.expandable || this.haspopup) ? String(this.open) : nothing}
			tabindex=${tabindex}
		>
			${this.icon ? html`
				<span class="top-navigation-bar__menu-item-icon">
					<ndd-icon name=${this.icon}></ndd-icon>
				</span>
			` : nothing}
			<span class="top-navigation-bar__menu-item-text">
				${this.text}
			</span>
			${this.expandable ? html`
				<span class="top-navigation-bar__menu-item-disclosure-icon">
					<ndd-icon name="chevron-down-small"></ndd-icon>
				</span>
			` : nothing}
		</button>
		<slot></slot>
	`;
}

// # Top navigation bar template

export function template(this: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar">
			<div class="top-navigation-bar__logo-bar">
				<div class="top-navigation-bar__logo"
					role="img"
					aria-label="${this._t('components.top-navigation-bar.logo-label')}"
				>
					${unsafeHTML(logoSvg)}
				</div>
				${this.logoTitle ? html`
					<div class="top-navigation-bar__wordmark">
						<p class="top-navigation-bar__wordmark-title">
							${this.logoTitle}
						</p>
						${this.logoSubtitle ? html`
							<p class="top-navigation-bar__wordmark-subtitle">
								${this.logoSubtitle}
							</p>
						` : nothing}
						${this.logoSupportingText1 ? html`
							<p class="top-navigation-bar__wordmark-supporting-text">
								${this.logoSupportingText1}
							</p>
						` : nothing}
						${this.logoSupportingText2 ? html`
							<p class="top-navigation-bar__wordmark-supporting-text">
								${this.logoSupportingText2}
							</p>
						` : nothing}
					</div>
				` : nothing}
			</div>
			<div class="top-navigation-bar__main-bar">
				${this.websiteTitle ? html`
					<div class="top-navigation-bar__title-bar">
						<span class="top-navigation-bar__title">
							${this.websiteTitle}
						</span>
					</div>
				` : nothing}
				<div class="top-navigation-bar__menu-bar">
					<div class="top-navigation-bar__menu-bar-start">
						${this._hasBackButton ? html`
							<div class="top-navigation-bar__back-button">
								<ndd-menu-bar-item
									icon="arrow-left"
									text="${this._backText}"
									href=${this.backHref || nothing}
									accessible-label="${this._backText}"
									@click="${this._handleBackClick}"
								></ndd-menu-bar-item>
							</div>
						` : nothing}
						<div class="top-navigation-bar__menu-button">
							<ndd-menu-bar-item
								icon="menu"
								text="${this._menuText}"
								haspopup="dialog"
								@click=${this._onMenuButtonClick}
							></ndd-menu-bar-item>
						</div>
						<nav class="top-navigation-bar__global-menu-bar"
							aria-label="${this._t('components.top-navigation-bar.global-menu-bar-label')}"
						>
							<slot name="global"></slot>
							<div class="top-navigation-bar__overflow-button"
								id="global-overflow-button"
							>
								<ndd-menu-bar-item
									text="${this._t('components.top-navigation-bar.overflow-action')}"
									icon="ellipsis"
									icon-only
									haspopup="menu"
									@click=${this._onGlobalOverflowClick}
								></ndd-menu-bar-item>
							</div>
						</nav>
					</div>
					<div class="top-navigation-bar__menu-bar-end">
						<nav class="top-navigation-bar__utility-menu-bar"
							aria-label="${this._t('components.top-navigation-bar.utility-menu-bar-label')}"
						>
							<slot name="utility"></slot>
							<div class="top-navigation-bar__overflow-button"
								id="utility-overflow-button"
							>
								<ndd-menu-bar-item
									text="${this._t('components.top-navigation-bar.overflow-action')}"
									icon="ellipsis"
									icon-only
									haspopup="menu"
									@click=${this._onUtilityOverflowClick}
								></ndd-menu-bar-item>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	`;
}

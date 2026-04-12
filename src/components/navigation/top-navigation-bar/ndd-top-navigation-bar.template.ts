import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NDDTopNavigationBar } from './ndd-top-navigation-bar.js';
import logoSvg from './logo.svg?raw';

// # Top navigation bar template

export function template(this: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar">
			${!this.noLogo ? html`<div class="top-navigation-bar__logo-bar">
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
			</div>` : nothing}
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
							<ndd-menu-bar>
								<slot name="global"></slot>
							</ndd-menu-bar>
						</nav>
					</div>
					<div class="top-navigation-bar__menu-bar-end">
						<nav class="top-navigation-bar__utility-menu-bar"
							aria-label="${this._t('components.top-navigation-bar.utility-menu-bar-label')}"
						>
							<ndd-menu-bar>
								<slot name="utility"></slot>
							</ndd-menu-bar>
						</nav>
					</div>
				</div>
			</div>
		</div>
	`;
}

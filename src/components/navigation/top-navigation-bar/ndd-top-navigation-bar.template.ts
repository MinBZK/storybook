import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NDDTopNavigationBar } from './ndd-top-navigation-bar.js';
import logoSvg from './logo.svg?raw';

// # Top navigation bar template

export function template(component: NDDTopNavigationBar) {
	return html`
		<div class="top-navigation-bar">
			${!component.noLogo ? html`<div class="top-navigation-bar__logo-bar">
				<div class="top-navigation-bar__logo"
					role="img"
					aria-label="${component._t('components.top-navigation-bar.logo-label')}"
				>
					${unsafeHTML(logoSvg)}
				</div>
				${component.logoTitle ? html`
					<div class="top-navigation-bar__wordmark">
						<div class="top-navigation-bar__wordmark-spacer"></div>
						<div class="top-navigation-bar__wordmark-content">
							<p class="top-navigation-bar__wordmark-title">
								${component.logoTitle}
							</p>
							${component.logoSubtitle ? html`
								<p class="top-navigation-bar__wordmark-subtitle">
									${component.logoSubtitle}
								</p>
							` : nothing}
							${component.logoSupportingText1 ? html`
								<p class="top-navigation-bar__wordmark-supporting-text">
									${component.logoSupportingText1}
								</p>
							` : nothing}
							${component.logoSupportingText2 ? html`
								<p class="top-navigation-bar__wordmark-supporting-text">
									${component.logoSupportingText2}
								</p>
							` : nothing}
						</div>
					</div>
				` : nothing}
			</div>` : nothing}
			<div class="top-navigation-bar__main-bar">
				${component.websiteTitle ? html`
					<div class="top-navigation-bar__title-bar">
						<span class="top-navigation-bar__title">
							${component.websiteTitle}
						</span>
					</div>
				` : nothing}
				<div class="top-navigation-bar__menu-bar">
					<div class="top-navigation-bar__menu-bar-start">
						${component._hasBackButton ? html`
							<div class="top-navigation-bar__back-button">
								<ndd-menu-bar-item
									icon="arrow-left"
									text="${component._backText}"
									href=${component.backHref || nothing}
									accessible-label="${component._backText}"
									@click="${component._handleBackClick}"
								></ndd-menu-bar-item>
							</div>
						` : nothing}
						<div class="top-navigation-bar__menu-button">
							<ndd-menu-bar-item
								icon="menu"
								text="${component._menuText}"
								haspopup="dialog"
								@click=${component._onMenuButtonClick}
							></ndd-menu-bar-item>
						</div>
						<nav class="top-navigation-bar__global-menu-bar"
							aria-label="${component._t('components.top-navigation-bar.global-menu-bar-label')}"
						>
							<ndd-menu-bar>
								<slot name="global"></slot>
							</ndd-menu-bar>
						</nav>
					</div>
					<div class="top-navigation-bar__menu-bar-end">
						<nav class="top-navigation-bar__utility-menu-bar"
							aria-label="${component._t('components.top-navigation-bar.utility-menu-bar-label')}"
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

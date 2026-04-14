import { html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import type { NDDTopNavigationBar } from './ndd-top-navigation-bar.js';
import { sanitizeUrl } from '../../../utilities/sanitize-url.js';
import logoSvg from './logo.svg?raw';

// # Top navigation bar template

export function template(component: NDDTopNavigationBar) {
	const safeLogoHref = sanitizeUrl(component.logoHref);
	const safeSiteHref = sanitizeUrl(component.siteHref);

	return html`
		<div class="top-navigation-bar">
			${!component.noLogo ? html`<div class="top-navigation-bar__logo-bar">
				${component.logoTitle && safeLogoHref ? html`
					<a class="top-navigation-bar__logo-and-wordmark" href="${safeLogoHref}">
						<div class="top-navigation-bar__logo"
							role="img"
							aria-label="${component._t('components.top-navigation-bar.logo-label')}"
						>
							${unsafeHTML(logoSvg)}
						</div>
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
					</a>
				` : component.logoTitle ? html`
					<div class="top-navigation-bar__logo-and-wordmark">
						<div class="top-navigation-bar__logo"
							role="img"
							aria-label="${component._t('components.top-navigation-bar.logo-label')}"
						>
							${unsafeHTML(logoSvg)}
						</div>
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
					</div>
				` : safeLogoHref ? html`
					<a class="top-navigation-bar__logo"
						href="${safeLogoHref}"
						aria-label="${component._t('components.top-navigation-bar.logo-label')}"
					>
						<span aria-hidden="true">${unsafeHTML(logoSvg)}</span>
					</a>
				` : html`
					<div class="top-navigation-bar__logo"
						role="img"
						aria-label="${component._t('components.top-navigation-bar.logo-label')}"
					>
						${unsafeHTML(logoSvg)}
					</div>
				`}
			</div>` : nothing}
			<div class="top-navigation-bar__main-bar">
				${component.websiteTitle ? html`
					<div class="top-navigation-bar__website-title-bar">
						${safeSiteHref ? html`
							<a class="top-navigation-bar__website-title" href="${safeSiteHref}">
								${component.websiteTitle}
							</a>
						` : html`
							<span class="top-navigation-bar__website-title">
								${component.websiteTitle}
							</span>
						`}
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
									@click=${component._handleBackClick}
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
						<div class="top-navigation-bar__global-menu-bar">
							<ndd-menu-bar
								accessible-label="${component._t('components.top-navigation-bar.global-menu-bar-label')}"
							>
								<slot name="global"></slot>
							</ndd-menu-bar>
						</div>
					</div>
					<div class="top-navigation-bar__menu-bar-end">
						<div class="top-navigation-bar__utility-menu-bar">
							<ndd-menu-bar
								accessible-label="${component._t('components.top-navigation-bar.utility-menu-bar-label')}"
							>
								<slot name="utility"></slot>
							</ndd-menu-bar>
						</div>
					</div>
				</div>
			</div>
		</div>
	`;
}

import { html, nothing } from 'lit';
import type { RRTopNavigationBar } from './rr-top-navigation-bar.js';

export function template(this: RRTopNavigationBar) {
	return html`
		<a
			href=${this.skipLinkTarget}
			class="skip-link"
		>Ga naar hoofdinhoud</a>
		<div
			class="container"
			part="container"
		>
			<div
				class="logo-bar"
				part="logo-bar"
			>
				<rr-nav-logo
					container=${this.container}
					?has-wordmark=${this.logoHasWordmark}
					title=${this.logoTitle}
					subtitle=${this.logoSubtitle}
					supporting-text-1=${this.logoSupportingText1}
					supporting-text-2=${this.logoSupportingText2}
				></rr-nav-logo>
			</div>
			<nav
				class="nav-bar"
				part="nav-bar"
				aria-label="Hoofdnavigatie"
			>
				${this._spacerSize ? html`
					<rr-spacer
						size=${this._spacerSize}
						direction="horizontal"
					></rr-spacer>
				` : nothing}
				<div class="nav-bar-inner">
					<div class="nav-left">
						<rr-back-button
							container=${this.container}
							href=${this.backHref}
							label=${this.backLabel}
						></rr-back-button>
						<span class="nav-title">${this.title}</span>
						<div class="global-menu">
							<rr-menu-bar
								size=${this._menuBarSize}
								has-overflow-menu
								overflow-label="Meer"
							>
								<slot name="menu"></slot>
							</rr-menu-bar>
						</div>
					</div>
					<div class="nav-right">
						<rr-utility-menu-bar
							container=${this.container}
							?no-language-switch=${this.utilityNoLanguageSwitch}
							?no-search=${this.utilityNoSearch}
							?no-account=${this.utilityNoAccount}
							?has-help=${this.utilityHasHelp}
							?has-settings=${this.utilityHasSettings}
							language=${this.utilityLanguage}
							account-label=${this._accountLabel}
						></rr-utility-menu-bar>
					</div>
				</div>
				${this._spacerSize ? html`
					<rr-spacer
						size=${this._spacerSize}
						direction="horizontal"
					></rr-spacer>
				` : nothing}
			</nav>
		</div>
	`;
}

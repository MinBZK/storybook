import { html, nothing } from 'lit';
import type { NDDTopNavigationBar } from './ndd-top-navigation-bar.js';

export function template(this: NDDTopNavigationBar) {
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
				<ndd-nav-logo
					container=${this.container}
					?has-wordmark=${this.logoHasWordmark}
					title=${this.logoTitle}
					subtitle=${this.logoSubtitle}
					supporting-text-1=${this.logoSupportingText1}
					supporting-text-2=${this.logoSupportingText2}
				></ndd-nav-logo>
			</div>
			<nav
				class="nav-bar"
				part="nav-bar"
				aria-label="Hoofdnavigatie"
			>
				${this._spacerSize ? html`
					<ndd-spacer
						size=${this._spacerSize}
						direction="horizontal"
					></ndd-spacer>
				` : nothing}
				<div class="nav-bar-inner">
					<div class="nav-left">
						<ndd-back-button
							container=${this.container}
							href=${this.backHref}
							label=${this.backText}
						></ndd-back-button>
						<span class="nav-title">${this.title}</span>
						<div class="global-menu">
							<ndd-menu-bar
								size=${this._menuBarSize}
								has-overflow-menu
								overflow-text="Meer"
							>
								<slot name="menu"></slot>
							</ndd-menu-bar>
						</div>
					</div>
					<div class="nav-right">
						<ndd-utility-menu-bar
							container=${this.container}
							?no-language-switch=${this.utilityNoLanguageSwitch}
							?no-search=${this.utilityNoSearch}
							?no-account=${this.utilityNoAccount}
							?has-help=${this.utilityHasHelp}
							?has-settings=${this.utilityHasSettings}
							language=${this.utilityLanguage}
							account-text=${this._accountText}
						></ndd-utility-menu-bar>
					</div>
				</div>
				${this._spacerSize ? html`
					<ndd-spacer
						size=${this._spacerSize}
						direction="horizontal"
					></ndd-spacer>
				` : nothing}
			</nav>
		</div>
	`;
}

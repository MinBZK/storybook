import { html, nothing } from 'lit';
import type { RRTopTitleBar } from './rr-top-title-bar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

export function template(this: RRTopTitleBar) {
	const showBack = !!this.backLabel;

	return html`
		<div class="top-title-bar">
			<div class="top-title-bar__start">
				${showBack ? html`
					<div class="top-title-bar__text-back-button">
						<rr-button
							variant="accent-transparent"
							href=${this.backHref || nothing}
							@click=${this._handleBack}
						>
							<rr-icon name="chevron-left"></rr-icon>
							${this.backLabel}
						</rr-button>
					</div>
					<div class="top-title-bar__icon-back-button">
						<rr-icon-button
							variant="accent-transparent"
							accessible-label=${this.backLabel || nothing}
							href=${this.backHref || nothing}
							@click=${this._handleBack}
						>
							<rr-icon name="chevron-left"></rr-icon>
							${this.backLabel}
						</rr-icon-button>
					</div>
					<div class="top-title-bar__divider"></div>
				` : nothing}
				<div class="top-title-bar__title-group">
					<h1 class="top-title-bar__title">${this.title}</h1>
					${this.subtitle ? html`
						<p class="top-title-bar__subtitle">${this.subtitle}</p>
					` : nothing}
				</div>
			</div>
			<div class="top-title-bar__end">
				<slot name="toolbar"></slot>
				${this.dismissLabel ? html`
					<div class="top-title-bar__dismiss-button">
						<rr-button
							variant="accent-transparent"
							@click=${this._handleDismiss}
						>
							${this.dismissLabel}
						</rr-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

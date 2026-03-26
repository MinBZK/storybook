import { html, nothing } from 'lit';
import type { RRTopTitleBar } from './rr-top-title-bar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

export function topTitleBarTemplate(component: RRTopTitleBar) {
	const showBack = !!component.backLabel;

	return html`
		<div class="top-title-bar">
			<div class="top-title-bar__start">
				${showBack ? html`
					<div class="top-title-bar__back-button">
						<div class="top-title-bar__text-back-button">
							<rr-button
								variant="accent-transparent"
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							>
								<rr-icon name="chevron-left"></rr-icon>
								${component.backLabel}
							</rr-button>
						</div>
						<div class="top-title-bar__icon-back-button">
							<rr-icon-button
								variant="accent-transparent"
								accessible-label=${component.backLabel || nothing}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							>
								<rr-icon name="chevron-left"></rr-icon>
								${component.backLabel}
							</rr-icon-button>
						</div>
						<div class="top-title-bar__divider"></div>
					</div>
				` : nothing}
				<div class="top-title-bar__title-group">
					<h1 class="top-title-bar__title">${component.title}</h1>
					${component.subtitle ? html`
						<p class="top-title-bar__subtitle">${component.subtitle}</p>
					` : nothing}
				</div>
			</div>
			<div class="top-title-bar__end">
				<slot name="toolbar"></slot>
				${component.dismissLabel ? html`
					<div class="top-title-bar__dismiss-button">
						<rr-button
							variant="accent-transparent"
							@click=${component._handleDismiss}
						>
							${component.dismissLabel}
						</rr-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

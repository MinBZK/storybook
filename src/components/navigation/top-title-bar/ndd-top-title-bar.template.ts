import { html, nothing } from 'lit';
import type { NDDTopTitleBar } from './ndd-top-title-bar.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/icon-button/ndd-icon-button.ts';

export function topTitleBarTemplate(component: NDDTopTitleBar) {
	const showBack = !!component.backLabel;

	return html`
		<div class="top-title-bar">
			<div class="top-title-bar__start">
				${showBack ? html`
					<div class="top-title-bar__back-button">
						<div class="top-title-bar__text-back-button">
							<ndd-button
								variant="accent-transparent"
								start-icon="chevron-left"
								text=${component.backLabel}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							></ndd-button>
						</div>
						<div class="top-title-bar__icon-back-button">
							<ndd-icon-button
								variant="accent-transparent"
								icon="chevron-left"
								text=${component.backLabel}
								accessible-label=${component.backLabel || nothing}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							></ndd-icon-button>
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
						<ndd-button
							variant="accent-transparent"
							text=${component.dismissLabel}
							@click=${component._handleDismiss}
						></ndd-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

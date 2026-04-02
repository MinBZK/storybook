import { html, nothing } from 'lit';
import type { NDDTopTitleBar } from './ndd-top-title-bar.ts';
import '../../actions/button/ndd-button.ts';
import '../../actions/icon-button/ndd-icon-button.ts';

export function topTitleBarTemplate(component: NDDTopTitleBar) {
	const showBack = !!component.backText;

	return html`
		<div class="top-title-bar">
			<div class="top-title-bar__start">
				${showBack ? html`
					<div class="top-title-bar__back-button">
						<div class="top-title-bar__text-back-button">
							<ndd-button
								variant="accent-transparent"
								start-icon="chevron-left"
								text=${component.backText}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							></ndd-button>
						</div>
						<div class="top-title-bar__icon-back-button">
							<ndd-icon-button
								variant="accent-transparent"
								icon="chevron-left"
								text=${component.backText}
								accessible-label=${component.backText || nothing}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							></ndd-icon-button>
						</div>
						<div class="top-title-bar__divider"></div>
					</div>
				` : nothing}
				<div class="top-title-bar__title-group">
					<h1 class="top-title-bar__title">${component.text}</h1>
					${component.supportingText ? html`
						<p class="top-title-bar__subtitle">${component.supportingText}</p>
					` : nothing}
				</div>
			</div>
			<div class="top-title-bar__end">
				<slot name="toolbar"></slot>
				${component.dismissText ? html`
					<div class="top-title-bar__dismiss-button">
						<ndd-button
							variant="accent-transparent"
							text=${component.dismissText}
							@click=${component._handleDismiss}
						></ndd-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

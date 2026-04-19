import { html, nothing } from 'lit';
import type { NLDDTopTitleBar } from './top-title-bar.js';
import '../../actions/button/button.ts';
import '../../actions/icon-button/icon-button.ts';

export function topTitleBarTemplate(component: NLDDTopTitleBar) {
	const showBack = !!component.backText;

	return html`
		<div class="top-title-bar">
			<div class="top-title-bar__start">
				${showBack ? html`
					<div class="top-title-bar__back-button">
						<div class="top-title-bar__text-back-button">
							<nldd-button
								variant="accent-transparent"
								start-icon="chevron-left"
								text=${component.backText}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							></nldd-button>
						</div>
						<div class="top-title-bar__icon-back-button">
							<nldd-icon-button
								variant="accent-transparent"
								icon="chevron-left"
								text=${component.backText}
								accessible-label=${component.backText || nothing}
								href=${component.backHref || nothing}
								@click=${component._handleBack}
							></nldd-icon-button>
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
			<div class="top-title-bar__end" ?hidden=${!component.dismissText && !component._hasToolbarItems}>
				<slot name="toolbar" @slotchange=${component._onToolbarSlotChange}></slot>
				${component.dismissText ? html`
					<div class="top-title-bar__dismiss-button">
						<nldd-button
							variant="accent-transparent"
							text=${component.dismissText}
							@click=${component._handleDismiss}
						></nldd-button>
					</div>
				` : nothing}
			</div>
		</div>
	`;
}

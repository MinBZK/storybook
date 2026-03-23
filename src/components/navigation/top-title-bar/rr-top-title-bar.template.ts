import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import type { RRTopTitleBar } from './rr-top-title-bar.ts';
import '../../actions/button/rr-button.ts';
import '../../actions/icon-button/rr-icon-button.ts';
import '../../content/icon/rr-icon.ts';

function renderBackButton(component: RRTopTitleBar) {
	// Text back button: when back-label is set and the anchor title is visible
	if (component.backLabel && !component._titleHidden) {
		return html`
			<div class="top-title-bar__back-button">
				<rr-button
					variant="accent-transparent"
					href=${component.backHref || nothing}
					@click=${component._handleBack}
				>
					<rr-icon name="chevron-left"></rr-icon>
					${component.backLabel}
				</rr-button>
			</div>
		`;
	}

	// Icon-only back button: compact state or stacked without a label
	return html`
		<div class="top-title-bar__back-button">
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
	`;
}

export function template(this: RRTopTitleBar) {
	const showBack = !!(this.backLabel || this._isStacked);

	return html`
		<div class="top-title-bar">
			<div class="top-title-bar__toolbar">
				<div class="top-title-bar__toolbar-start">
					${showBack ? renderBackButton(this) : nothing}
					<div class="top-title-bar__toolbar-title-group">
						<h1 class=${classMap({
							'top-title-bar__toolbar-title': true,
							'is-hidden': !this._titleHidden,
						})}>${this.title}</h1>
						${this.subtitle ? html`
							<p class="top-title-bar__toolbar-subtitle">${this.subtitle}</p>
						` : nothing}
					</div>
				</div>
				<div class="top-title-bar__toolbar-end">
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
		</div>
	`;
}

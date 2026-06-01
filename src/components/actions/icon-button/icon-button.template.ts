import { html, nothing } from 'lit';
import type { NLDDIconButton } from './icon-button.js';
import '../../content/tooltip/tooltip.js';

function renderContent(component: NLDDIconButton) {
	return html`
		<span class="icon-button__icon-area">
			<span class="icon-button__icon">
				${component.icon
					? html`<nldd-icon name=${component.icon}></nldd-icon>`
					: html`<slot name="icon" @slotchange=${component.requestUpdate}></slot>`}
			</span>
			${component.expandable ? html`
				<span class="icon-button__disclosure-icon">
					<nldd-icon name="chevron-down-small"></nldd-icon>
				</span>
			` : nothing}
		</span>
		${component.text ? html`
			<span class="icon-button__text">${component.text}</span>
		` : ''}
	`;
}

export function template(this: NLDDIconButton) {
	const label = this.accessibleLabel || this.text || nothing;
	const content = renderContent(this);

	// Tooltip text: accessible-label always, or text when not visible (non-lg)
	const tooltipText = this.accessibleLabel
		|| (this.size !== 'lg' ? this.text : '');

	// `expandable` (disclosure widget signal) or `popup-type` (popup container
	// signal) both require aria-expanded to always be present so screen
	// readers know the current open/closed state. Without one of these, only
	// open=true forwards aria-expanded — keeps plain buttons free of
	// irrelevant ARIA attributes.
	const isDisclosure = this.expandable || !!this.popupType;
	const ariaExpanded = isDisclosure ? String(this.expanded) : (this.expanded ? 'true' : nothing);

	// Loading: an activity indicator (wrapped in a positioned container)
	// overlays the (visually hidden) icon. `instant` so it shows the moment
	// loading starts; aria-hidden because the inner control already carries
	// aria-busy. Sizes: xs:16, sm:20, md:24, lg:28.
	const ariaBusy = this.loading ? 'true' : nothing;
	const loadingSize = this.size === 'xs' ? '16'
		: this.size === 'sm' ? '20'
		: this.size === 'lg' ? '28'
		: '24';
	const loadingIndicator = this.loading
		? html`
			<div class="icon-button__activity-indicator">
				<nldd-activity-indicator
					timing="instant"
					size=${loadingSize}
					aria-hidden="true"
				></nldd-activity-indicator>
			</div>
		`
		: nothing;

	const renderButton = () => {
		if (this.href) {
			const resolvedRel = this._resolvedRel();
			return html`
				<a class="icon-button"
					href=${this.href}
					target=${this.target || nothing}
					rel=${resolvedRel || nothing}
					aria-disabled=${this.disabled ? 'true' : nothing}
					aria-label=${label}
					aria-haspopup=${this.popupType || nothing}
					aria-expanded=${ariaExpanded}
					aria-busy=${ariaBusy}
					@click=${this._handleClick}
				>
					${content}${loadingIndicator}
				</a>
			`;
		}

		// .popoverTargetElement / .popoverTargetAction are bound unguarded: in
		// browsers without Popover-invoker IDL support Lit sets a harmless
		// expando and the cross-shadow association just doesn't take effect —
		// but those browsers don't support the Popover API at all, so the menu
		// this button drives is non-functional regardless. No capability check.
		return html`
			<button class="icon-button"
				type=${this.type}
				?disabled=${this.disabled}
				aria-disabled=${this.disabled ? 'true' : nothing}
				aria-label=${label}
				aria-haspopup=${this.popupType || nothing}
				aria-expanded=${ariaExpanded}
				aria-busy=${ariaBusy}
				popovertarget=${this.popovertarget || nothing}
				.popoverTargetElement=${this.popoverTargetElement}
				.popoverTargetAction=${this.popoverTargetAction}
				@click=${this._handleClick}
			>
				${content}${loadingIndicator}
			</button>
		`;
	};

	if (tooltipText && this.tooltipTiming !== 'never') {
		return html`
			<nldd-tooltip text=${tooltipText} timing=${this.tooltipTiming}>
				${renderButton()}
			</nldd-tooltip>
		`;
	}

	return renderButton();
}

import { html, nothing } from 'lit';
import type { NLDDButton } from './button.js';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
}

function renderContent(component: NLDDButton) {
	// `button__text` falls back to the slot on falsy `text`. The property
	// defaults to '', so `text=""` and an absent attribute are indistinguishable
	// — both intentionally render the slot rather than an empty label.
	return html`
		<span class="button__content">
			${component.startIcon ? html`
				<nldd-icon class="button__start-icon"
					name=${component.startIcon}
				></nldd-icon>
			` : html`<slot name="start-icon"></slot>`}
			<span class="button__text">${component.text ? component.text : html`<slot name="text"></slot>`}</span>
			${component.endIcon ? html`
				<nldd-icon class="button__end-icon"
					name=${component.endIcon}
				></nldd-icon>
			` : html`<slot name="end-icon"></slot>`}
			${component.expandable ? html`
				<nldd-icon class="button__disclosure-icon"
					name="chevron-down-small"
				></nldd-icon>
			` : nothing}
		</span>
	`;
}

export function template(this: NLDDButton, helpers: TemplateHelpers) {
	const content = renderContent(this);

	// `expandable` (disclosure widget signal) or `popup-type` (popup container
	// signal) both require aria-expanded to always be present so screen
	// readers know the current open/closed state. Without one of these, only
	// open=true forwards aria-expanded — keeps plain buttons free of
	// irrelevant ARIA attributes.
	const isDisclosure = this.expandable || !!this.popupType;
	const ariaExpanded = isDisclosure ? String(this.expanded) : (this.expanded ? 'true' : nothing);

	// Loading: an activity indicator overlays the (opacity-hidden) content. It
	// sits OUTSIDE the <button>/<a> (a sibling, overlaid via the host's
	// position:relative) so its role="status" live region can announce "Laden"
	// without joining the button's content-derived accessible name. aria-busy
	// stays on the control as supplementary state. `instant` so it shows the
	// moment loading starts. Sizes: xs:16, sm:20, md:24.
	const ariaBusy = this.loading ? 'true' : nothing;
	const loadingIndicator = this.loading
		? html`
			<div class="button__activity-indicator">
				<nldd-activity-indicator
					timing="instant"
					size=${this.size === 'xs' ? '16' : this.size === 'sm' ? '20' : '24'}
				></nldd-activity-indicator>
			</div>
		`
		: nothing;

	if (this.href) {
		const resolvedRel = this._resolvedRel();
		return html`
			<a class="button"
				href=${this.href}
				target=${this.target || nothing}
				rel=${resolvedRel || nothing}
				aria-disabled=${this.disabled ? 'true' : nothing}
				aria-label=${this.accessibleLabel || nothing}
				aria-haspopup=${this.popupType || nothing}
				aria-expanded=${ariaExpanded}
				aria-busy=${ariaBusy}
				@click=${helpers.handleClick}
			>
				${content}
			</a>
			${loadingIndicator}
		`;
	}

	// .popoverTargetElement / .popoverTargetAction are bound unguarded: in
	// browsers without Popover-invoker IDL support Lit sets a harmless expando
	// and the cross-shadow association just doesn't take effect — but those
	// browsers don't support the Popover API at all, so the menu this button
	// drives is non-functional regardless. No per-binding capability check.
	return html`
		<button class="button"
			type=${this.type}
			?disabled=${this.disabled}
			aria-disabled=${this.disabled ? 'true' : nothing}
			aria-label=${this.accessibleLabel || nothing}
			aria-haspopup=${this.popupType || nothing}
			aria-expanded=${ariaExpanded}
			aria-busy=${ariaBusy}
			popovertarget=${this.popovertarget || nothing}
			.popoverTargetElement=${this.popoverTargetElement}
			.popoverTargetAction=${this.popoverTargetAction}
			@click=${helpers.handleClick}
		>
			${content}
		</button>
		${loadingIndicator}
	`;
}

import { html, nothing } from 'lit';
import type { NLDDButton } from './button.js';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
}

function renderContent(component: NLDDButton) {
	return html`
		<span class="button__content">
			${component.startIcon ? html`
				<nldd-icon class="button__start-icon"
					name=${component.startIcon}
				></nldd-icon>
			` : html`<slot name="start-icon"></slot>`}
			<span class="button__text">${component.text}</span>
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
				@click=${helpers.handleClick}
			>
				${content}
			</a>
		`;
	}

	return html`
		<button class="button"
			type=${this.type}
			?disabled=${this.disabled}
			aria-disabled=${this.disabled ? 'true' : nothing}
			aria-label=${this.accessibleLabel || nothing}
			aria-haspopup=${this.popupType || nothing}
			aria-expanded=${ariaExpanded}
			popovertarget=${this.popovertarget || nothing}
			.popoverTargetElement=${this.popoverTargetElement}
			.popoverTargetAction=${this.popoverTargetAction}
			@click=${helpers.handleClick}
		>
			${content}
		</button>
	`;
}

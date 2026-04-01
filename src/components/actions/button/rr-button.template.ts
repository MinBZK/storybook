import { html, nothing } from 'lit';
import type { RRButton } from './rr-button.ts';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
}

function renderContent(component: RRButton) {
	return html`
		<span class="button__content">
			${component.startIcon ? html`
				<rr-icon class="button__start-icon"
					name=${component.startIcon}
				></rr-icon>
			` : html`<slot name="start-icon"></slot>`}
			${component.text}
			${component.endIcon ? html`
				<rr-icon class="button__end-icon"
					name=${component.endIcon}
				></rr-icon>
			` : html`<slot name="end-icon"></slot>`}
			${component.expandable ? html`
				<rr-icon class="button__disclosure-icon"
					name="chevron-down-small"
				></rr-icon>
			` : nothing}
		</span>
	`;
}

export function template(this: RRButton, helpers: TemplateHelpers) {
	const content = renderContent(this);

	if (this.href) {
		const resolvedRel = this._resolvedRel();
		return html`
			<a class="button"
				href=${this.href}
				target=${this.target || nothing}
				rel=${resolvedRel || nothing}
				aria-disabled=${this.disabled ? 'true' : nothing}
				aria-label=${this.accessibleLabel || nothing}
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
			popovertarget=${this.popovertarget || nothing}
			@click=${helpers.handleClick}
		>
			${content}
		</button>
	`;
}

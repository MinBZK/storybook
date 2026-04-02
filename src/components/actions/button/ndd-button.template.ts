import { html, nothing } from 'lit';
import type { NDDButton } from './ndd-button.ts';

interface TemplateHelpers {
	handleClick: (e: MouseEvent) => void;
}

function renderContent(component: NDDButton) {
	return html`
		<span class="button__content">
			${component.startIcon
				? html` <ndd-icon class="button__start-icon" name=${component.startIcon}></ndd-icon> `
				: html`<slot name="start-icon"></slot>`}
			${component.text}
			${component.endIcon
				? html` <ndd-icon class="button__end-icon" name=${component.endIcon}></ndd-icon> `
				: html`<slot name="end-icon"></slot>`}
			${component.expandable
				? html` <ndd-icon class="button__disclosure-icon" name="chevron-down-small"></ndd-icon> `
				: nothing}
		</span>
	`;
}

export function template(this: NDDButton, helpers: TemplateHelpers) {
	const content = renderContent(this);

	if (this.href) {
		const resolvedRel = this._resolvedRel();
		return html`
			<a
				class="button"
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
		<button
			class="button"
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

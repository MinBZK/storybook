import { html, nothing } from 'lit';
import type { NDDIconButton } from './ndd-icon-button.ts';

function renderContent(component: NDDIconButton) {
	return html`
		<span class="icon-button__icon-area">
			<span class="icon-button__icon">
				${component.icon
					? html`<ndd-icon name=${component.icon}></ndd-icon>`
					: html`<slot name="icon" @slotchange=${component.requestUpdate}></slot>`}
			</span>
			${component.expandable ? html`
				<span class="icon-button__disclosure-icon">
					<ndd-icon name="chevron-down-small"></ndd-icon>
				</span>
			` : nothing}
		</span>
		${component.text ? html`
			<span class="icon-button__text">${component.text}</span>
		` : ''}
	`;
}

export function template(this: NDDIconButton) {
	const label = this.accessibleLabel || this.text || nothing;
	const tooltip = this.size !== 'lg' ? (this.accessibleLabel || this.text || nothing) : nothing;
	const content = renderContent(this);

	if (this.href) {
		const resolvedRel = this._resolvedRel();
		return html`
			<a class="icon-button"
				href=${this.href}
				target=${this.target || nothing}
				rel=${resolvedRel || nothing}
				aria-disabled=${this.disabled ? 'true' : nothing}
				title=${tooltip}
				aria-label=${label}
				@click=${this._handleClick}
			>
				${content}
			</a>
		`;
	}

	return html`
		<button class="icon-button"
			type=${this.type}
			?disabled=${this.disabled}
			aria-disabled=${this.disabled ? 'true' : nothing}
			title=${tooltip}
			aria-label=${label}
			popovertarget=${this.popovertarget || nothing}
			@click=${this._handleClick}
		>
			${content}
		</button>
	`;
}

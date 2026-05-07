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
				aria-label=${label}
				popovertarget=${this.popovertarget || nothing}
				@click=${this._handleClick}
			>
				${content}
			</button>
		`;
	};

	if (tooltipText && !this.hideTooltip) {
		return html`
			<nldd-tooltip text=${tooltipText}>
				${renderButton()}
			</nldd-tooltip>
		`;
	}

	return renderButton();
}

import { html, nothing } from 'lit';
import type { RRIconButton } from './rr-icon-button.ts';

export function template(this: RRIconButton) {
	const label = this.accessibleLabel || this._text || nothing;
	const tooltip = this.size !== 'lg' ? (this.accessibleLabel || this._text) : '';

	return html`
		<button class="icon-button"
			type=${this.type}
			?disabled=${this.disabled}
			aria-disabled=${this.disabled ? 'true' : nothing}
			title=${tooltip}
			aria-label=${label}
			@click=${this._handleClick}
		>
			<span class="icon-button__icon-area">
				<span class="icon-button__icon">
					<slot name="__icon"></slot>
				</span>
				${this.isExpandable ? html`
					<span class="icon-button__disclosure-icon">
						<rr-icon name="chevron-down-small"></rr-icon>
					</span>
				` : ''}
			</span>
			${this._text ? html`
				<span class="icon-button__text">${this._text}</span>
			` : ''}
		</button>
	`;
}

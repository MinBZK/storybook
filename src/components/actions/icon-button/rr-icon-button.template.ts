import { html, nothing } from 'lit';
import type { RRIconButton } from './rr-icon-button.ts';

export function template(this: RRIconButton) {
	return html`
		<button
			class="icon-button"
			type=${this.type}
			?disabled=${this.disabled}
			aria-disabled=${this.disabled}
			title=${this.size !== 'lg' ? this._title : ''}
			aria-label=${this._title || nothing}
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
			${this._title ? html`
				<span class="icon-button__title">${this._title}</span>
			` : ''}
		</button>
	`;
}

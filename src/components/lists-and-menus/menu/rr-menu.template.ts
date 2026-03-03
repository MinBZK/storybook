import { html, nothing } from 'lit';
import type { RRMenuItem, RRMenu } from './rr-menu.js';

export function menuTemplate(this: RRMenu) {
	return html`
		<div class="menu" part="menu" role="menu">
			<slot></slot>
		</div>
	`;
}

export function menuItemTemplate(this: RRMenuItem) {
	return html`
		<button
			class="item"
			part="item"
			type="button"
			?disabled=${this.disabled}
			@click=${this._handleClick}
		>
			${this.selected ? html`
				<rr-icon-cell size="24">
					<rr-icon name="check-mark"></rr-icon>
				</rr-icon-cell>
				<rr-spacer-cell size="8"></rr-spacer-cell>
			` : nothing}

			<rr-text-cell>
				<p slot="text">${this.title}</p>
			</rr-text-cell>

			${this.details ? html`
				<rr-spacer-cell size="8"></rr-spacer-cell>
				<rr-text-cell width="fit-content" horizontal-alignment="right" color="secondary">
					<p slot="text">${this.details}</p>
				</rr-text-cell>
			` : nothing}

			${this.hasSubmenu ? html`
				<rr-spacer-cell size="4"></rr-spacer-cell>
				<rr-icon-cell size="20">
					<rr-icon name="chevron-right"></rr-icon>
				</rr-icon-cell>
			` : nothing}
		</button>
	`;
}

export function menuDividerTemplate() {
	return html`<div class="divider"></div>`;
}

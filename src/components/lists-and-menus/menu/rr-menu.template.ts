import { html, nothing } from 'lit';
import type { RRMenuItem, RRMenu } from './rr-menu.js';

export function menuTemplate(this: RRMenu) {
	return html`
		<div class="menu" role="menu">
			<slot></slot>
		</div>
	`;
}

export function menuItemTemplate(this: RRMenuItem) {
	return html`
		<button
			class="menu__item"
			type="button"
			?disabled=${this.disabled}
			@click=${this._handleClick}
		>
			${this.selectable ? html`
				<rr-icon-cell
					size="24"
					color="inherit"
					horizontal-alignment="center"
				>
					${this.selected ? html`
						<rr-icon name="check-mark"></rr-icon>
					` : nothing}
				</rr-icon-cell>
				<rr-spacer-cell size="8"></rr-spacer-cell>
			` : nothing}

			<rr-text-cell color="inherit">
				<p slot="text">${this.title}</p>
			</rr-text-cell>

			${this.details ? html`
				<rr-spacer-cell size="8"></rr-spacer-cell>
				<rr-text-cell
					width="fit-content"
					horizontal-alignment="right"
					color="secondary"
				>
					<p slot="text">${this.details}</p>
				</rr-text-cell>
			` : nothing}
		</button>
	`;
}

export function menuDividerTemplate() {
	return html`<div class="menu__divider"></div>`;
}

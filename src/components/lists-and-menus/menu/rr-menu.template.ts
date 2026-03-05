import { html, nothing } from 'lit';
import type { RRMenuItem, RRMenu } from './rr-menu.js';

const roleMap = {
	button: 'menuitem',
	checkbox: 'menuitemcheckbox',
	radio: 'menuitemradio',
} as const;

export function menuTemplate(this: RRMenu) {
	return html`
		<div class="menu"
			role="menu"
			tabindex="-1"
		>
			<slot></slot>
		</div>
	`;
}

export function menuItemTemplate(this: RRMenuItem) {
	const hasCheckState = this.type !== 'button';
	return html`
		<button class="menu__item"
			type="button"
			role=${roleMap[this.type]}
			?disabled=${this.disabled}
			aria-checked=${hasCheckState ? String(this.selected) : nothing}
			@click=${this._handleClick}
		>
			${hasCheckState ? html`
				<rr-icon-cell class="menu__item-check"
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
				<p slot="text">${this.text}</p>
			</rr-text-cell>
			${this.details ? html`
				<rr-spacer-cell size="8"></rr-spacer-cell>
				<rr-text-cell class="menu__item-details"
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
	return html`<div class="menu__divider" role="separator"></div>`;
}

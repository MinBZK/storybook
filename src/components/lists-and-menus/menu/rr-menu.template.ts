import { html, nothing, TemplateResult } from 'lit';
import type { RRMenuItem, RRMenu } from './rr-menu.js';

const menuRoleMap = {
	menu: 'menu',
	listbox: 'listbox',
} as const;

const itemRoleMap = {
	button: { menu: 'menuitem', listbox: 'option' },
	checkbox: { menu: 'menuitemcheckbox', listbox: 'option' },
	radio: { menu: 'menuitemradio', listbox: 'option' },
} as const;

function parseBold(text: string): TemplateResult {
	const parts = text.split(/\*\*(.+?)\*\*/g);
	return html`${parts.map((part, i) => i % 2 === 1 ? html`<b>${part}</b>` : part)}`;
}

export function menuTemplate(this: RRMenu, isEmpty: boolean, variant: 'menu' | 'listbox') {
	return html`
		<div class="menu"
			role=${menuRoleMap[variant]}
			tabindex="-1"
		>
			<slot></slot>
			${isEmpty ? html`
				<div class="menu__empty-text">${this._resolvedEmptyText}</div>
			` : nothing}
		</div>
	`;
}

export function menuItemTemplate(this: RRMenuItem, variant: 'menu' | 'listbox' = 'menu') {
	const hasCheckState = this.type !== 'button' && variant === 'menu';
	const role = itemRoleMap[this.type][variant];
	return html`
		<button class="menu__item"
			type="button"
			role=${role}
			?disabled=${this.disabled}
			aria-checked=${hasCheckState ? String(this.selected) : nothing}
			aria-selected=${variant === 'listbox' ? String(this.selected) : nothing}
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
				<p slot="text">${parseBold(this._displayText || this.text)}</p>
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

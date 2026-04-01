import { html, nothing } from 'lit';
import type { NDDMenuItem, NDDMenu } from './ndd-menu.js';

const menuRoleMap = {
	menu: 'menu',
	listbox: 'listbox',
} as const;

const itemRoleMap = {
	button: { menu: 'menuitem', listbox: 'option' },
	checkbox: { menu: 'menuitemcheckbox', listbox: 'option' },
	radio: { menu: 'menuitemradio', listbox: 'option' },
} as const;

export function menuTemplate(this: NDDMenu, isEmpty: boolean, variant: 'menu' | 'listbox') {
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

export function menuItemTemplate(this: NDDMenuItem, variant: 'menu' | 'listbox' = 'menu') {
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
				<ndd-icon-cell class="menu__item-check"
					size="24"
					color="inherit"
					horizontal-alignment="center"
				>
					${this.selected ? html`
						<ndd-icon name="check-mark"></ndd-icon>
					` : nothing}
				</ndd-icon-cell>
				<ndd-spacer-cell size="8"></ndd-spacer-cell>
			` : nothing}
			<ndd-text-cell class="menu__item-text" color="inherit" text=${this._displayText || this.text}></ndd-text-cell>
			${this.details ? html`
				<ndd-spacer-cell size="8"></ndd-spacer-cell>
				<ndd-text-cell class="menu__item-details"
					width="fit-content"
					horizontal-alignment="right"
					color="secondary"
					text=${this.details}
				></ndd-text-cell>
			` : nothing}
		</button>
	`;
}

export function menuDividerTemplate() {
	return html`<div class="menu__divider" role="separator"></div>`;
}

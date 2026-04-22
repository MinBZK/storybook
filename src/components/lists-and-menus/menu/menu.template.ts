import { html, nothing } from 'lit';
import type { NLDDMenuItem, NLDDMenu } from './menu.js';

const menuRoleMap = {
	menu: 'menu',
	listbox: 'listbox',
} as const;

const itemRoleMap = {
	button: { menu: 'menuitem', listbox: 'option' },
	checkbox: { menu: 'menuitemcheckbox', listbox: 'option' },
	radio: { menu: 'menuitemradio', listbox: 'option' },
} as const;

export function menuTemplate(this: NLDDMenu, isEmpty: boolean, variant: 'menu' | 'listbox') {
	// Drop role="menu"/"listbox" when empty. The empty-state slot renders an
	// nldd-inline-dialog, which is neither a menuitem nor an option — keeping
	// the role here would violate ARIA's required-children rules.
	const menuRole = isEmpty ? nothing : menuRoleMap[variant];
	return html`
		<div class="menu"
			role=${menuRole}
			tabindex="-1"
		>
			<slot></slot>
			${isEmpty ? html`
				<div class="menu__empty">
					<slot name="empty">
						<nldd-inline-dialog
							text=${this._resolvedEmptyText}
							supporting-text=${this.emptySupportingText || nothing}
						></nldd-inline-dialog>
					</slot>
				</div>
			` : nothing}
		</div>
	`;
}

export function menuItemTemplate(this: NLDDMenuItem, variant: 'menu' | 'listbox' = 'menu') {
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
				<nldd-icon-cell class="menu__item-check"
					size="24"
					horizontal-alignment="center"
					icon=${this.selected ? 'check-mark' : nothing}
				></nldd-icon-cell>
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
			` : nothing}
			${this.icon ? html`
				<nldd-icon-cell class="menu__item-icon" size="20" icon=${this.icon}></nldd-icon-cell>
				<nldd-spacer-cell size="6"></nldd-spacer-cell>
			` : nothing}
			<nldd-text-cell class="menu__item-text" text=${this.text} mark=${this.mark} mark-mode=${this.markMode}></nldd-text-cell>
			${this.details ? html`
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell class="menu__item-details"
					width="fit-content"
					horizontal-alignment="right"
					color="secondary"
					text=${this.details}
				></nldd-text-cell>
			` : nothing}
		</button>
	`;
}

export function menuDividerTemplate() {
	return html`<div class="menu__divider" role="separator"></div>`;
}

import { html, nothing } from 'lit';
import type { NLDDMenuItem, NLDDMenu, NLDDMenuGroup } from './menu.js';

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
	// Back button shows when this menu is itself a submenu and we're rendering
	// in drill-in mode (touch / narrow viewport). The label is the parent
	// item's text — gives the user context about which level they're in.
	const showBack = this._isSubmenu && this._drillInMode && this._parentItem !== null;
	return html`
		<div class="menu"
			role=${menuRole}
			tabindex="-1"
		>
			${showBack ? html`
				<button class="menu__back-button"
					type="button"
					aria-label=${this._resolvedBackLabel}
					@click=${this._handleBack}
					@mouseenter=${this._handleBackMouseenter}
				>
					<nldd-icon-cell class="menu__back-icon" size="20" icon="chevron-left"></nldd-icon-cell>
					<nldd-spacer-cell size="6"></nldd-spacer-cell>
					<nldd-text-cell text=${this._parentItem!.text}></nldd-text-cell>
				</button>
				<!-- Pure visual divider; role="none" keeps strict ARIA validators
				     quiet (a focusable role="separator" inside a menu would need
				     aria-valuenow et al.; this one is decorative). -->
				<div class="menu__back-button-divider" role="none"></div>
			` : nothing}
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
	const hasSubmenu = this._hasSubmenu;
	return html`
		<button class="menu__item"
			type="button"
			role=${role}
			?disabled=${this.disabled}
			aria-checked=${hasCheckState ? String(this.selected) : nothing}
			aria-selected=${variant === 'listbox' ? String(this.selected) : nothing}
			aria-haspopup=${hasSubmenu ? 'menu' : nothing}
			aria-expanded=${hasSubmenu ? String(this._submenuOpen) : nothing}
			aria-controls=${hasSubmenu && this._submenuEl?.id ? this._submenuEl.id : nothing}
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
			<nldd-text-cell class="menu__item-text" text=${this.text} query=${this.query} query-mark-mode=${this.queryMarkMode}></nldd-text-cell>
			${this.details ? html`
				<nldd-spacer-cell size="8"></nldd-spacer-cell>
				<nldd-text-cell class="menu__item-details"
					width="fit-content"
					horizontal-alignment="right"
					color="secondary"
					text=${this.details}
				></nldd-text-cell>
			` : nothing}
			${hasSubmenu ? html`
				<nldd-spacer-cell size="6"></nldd-spacer-cell>
				<nldd-icon-cell class="menu__item-submenu-indicator"
					size="20"
					icon="chevron-right"
				></nldd-icon-cell>
			` : nothing}
		</button>
		<!--
			Project the slotted nldd-menu (the submenu, if any) into the flat
			tree. Without this slot, a light-DOM child nldd-menu sits outside
			any flat tree — and the Popover API uses the flat tree to locate
			a popover's ancestor popover. Without an ancestor, calling
			showPopover() on the submenu would dismiss the parent menu (its
			DOM ancestor) instead of stacking on top of it. The slot itself
			has no visible effect because the submenu is display:none until
			it opens its own popover.
		-->
		<slot></slot>
	`;
}

export function menuDividerTemplate() {
	return html`<div class="menu__divider" role="separator"></div>`;
}

export function menuGroupTemplate(component: NLDDMenuGroup) {
	// aria-hidden on the title prevents AT from announcing it twice — once as
	// standalone text and again as the group label via aria-labelledby. The
	// label reference still reads the hidden node's text content, which is
	// the standard pattern for this kind of labelling.
	return html`
		<div class="menu-group__title"
			id=${component._titleId}
			aria-hidden="true"
		>${component.text}</div>
		<div class="menu-group__items"
			role="group"
			aria-labelledby=${component._titleId}
		>
			<slot></slot>
		</div>
	`;
}

/**
 * Nederlandse Digitale Dienst Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a menu.
 *
 * @element nldd-split-button
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {string} variant - Button variant (default: 'neutral-tinted')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} text - Button text for the primary action
 * @attr {string} start-icon - Icon name for the start icon (before text)
 * @attr {object} translations - Translations; unset keys fall back to Dutch
 *
 * @fires action-click - Fired when the main button is clicked
 * @fires menu-click - Fired when the dropdown trigger is clicked
 */
import { LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { splitButtonStyles } from './split-button.styles.js';
import { template } from './split-button.template.js';
import { nlddSplitButtonTranslations } from './split-button.i18n.js';
import type { NLDDSplitButtonTranslations } from './split-button.i18n.js';
import './../button/button.js';
import './../icon-button/icon-button.js';
import '../../lists-and-menus/menu/menu.js';
import type { NLDDMenu } from '../../lists-and-menus/menu/menu.js';

export type Size = 'xs' | 'sm' | 'md';

@customElement('nldd-split-button')
export class NLDDSplitButton extends LitElement {
	static override styles = splitButtonStyles;

	@property({ type: String, reflect: true })
	size: Size = 'md';

	@property({ type: String, reflect: true })
	variant: string = 'neutral-tinted';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Button text for the primary action. */
	@property({ type: String })
	text = '';

	/** Icon name for the start icon (before text) on the primary action button. */
	@property({ type: String, attribute: 'start-icon' })
	startIcon = '';

	@property({ type: Object })
	translations: Partial<NLDDSplitButtonTranslations> = {};

	@query('.split-button__trigger')
	private _trigger?: HTMLElement;

	@query('.split-button__menu')
	private _menu?: NLDDMenu;

	private _hasMenuItems = false;
	private _menuWasOpenOnMousedown = false;

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDSplitButtonTranslations): string {
		return this.translations[key] ?? nlddSplitButtonTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated(): void {
		// Move any slotted menu-items / dividers from the light DOM into the
		// internal nldd-menu so nldd-menu's querySelectorAll sees them.
		const items = Array.from(this.children).filter((el) =>
			el.matches('nldd-menu-item, nldd-menu-divider'),
		);
		this._hasMenuItems = items.length > 0;
		if (this._hasMenuItems && this._menu && this._trigger) {
			items.forEach((item) => this._menu!.appendChild(item));
			this._menu.anchorElement = this._trigger;
			// Capture open-state BEFORE the browser's light-dismiss fires on
			// mousedown. The subsequent click handler uses this snapshot to
			// decide: was the popover open? → user clicked to close (no-op,
			// light-dismiss already closed it). Was it closed? → open it.
			this._trigger.addEventListener('mousedown', () => {
				this._menuWasOpenOnMousedown = this._menu!.matches(':popover-open');
			});
		}
	}

	_handleActionClick(e: MouseEvent): void {
		if (this.disabled) return;
		e.stopPropagation();
		this.dispatchEvent(new CustomEvent('action-click', { bubbles: true, composed: true }));
	}

	_handleMenuClick(e: MouseEvent): void {
		if (this.disabled) return;
		e.stopPropagation();
		if (this._hasMenuItems && this._menu) {
			const wasOpen = this._menuWasOpenOnMousedown;
			this._menuWasOpenOnMousedown = false;
			if (wasOpen) return; // light-dismiss already closed it
			this._menu.showPopover();
			return;
		}
		this.dispatchEvent(new CustomEvent('menu-click', { bubbles: true, composed: true }));
	}

	override render() {
		return template.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-split-button': NLDDSplitButton;
	}
}

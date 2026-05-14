/**
 * Nederlandse Digitale Dienst Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the icon button opens a menu.
 *
 * Any `nldd-menu-item` and `nldd-menu-divider` children in the light DOM are
 * **moved** into an internal `nldd-menu` inside the component's shadow DOM on
 * mount (and on subsequent add/remove via MutationObserver). Consumers can no
 * longer `querySelector` those items from the split-button afterwards — query
 * through the menu via custom events or keep their own references.
 *
 * When no items are slotted, the chevron dispatches `menu-click` and the
 * consumer is expected to manage their own popover.
 *
 * @element nldd-split-button
 * @attr {string} size - Button size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {string} variant - Button variant (default: 'neutral-tinted')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} text - Button text for the primary action
 * @attr {string} icon - Icon name shown before the text on the primary action button
 * @attr {object} translations - Translations; unset keys fall back to Dutch
 *
 * @fires action-click - Fired when the main button is clicked
 * @fires menu-click - Fired when the dropdown trigger is clicked and no items
 *                     are slotted
 */
import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
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

	/** Icon name shown before the text on the primary action button. */
	@property({ type: String })
	icon = '';

	@property({ type: Object })
	translations: Partial<NLDDSplitButtonTranslations> = {};

	@query('.split-button__popup-button')
	private _trigger?: HTMLElement;

	@query('.split-button__menu')
	private _menu?: NLDDMenu;

	@state()
	_menuIsOpen = false;

	@state()
	_hasMenuItems = false;
	private _menuWasOpenOnMousedown = false;
	private _childObserver?: MutationObserver;

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDSplitButtonTranslations): string {
		return this.translations[key] ?? nlddSplitButtonTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated(): void {
		this._syncMenuItems();
		// Watch for children added or removed after first render. Moving items
		// into the menu (in _syncMenuItems) itself triggers a childList mutation
		// — the re-entry is harmless because subsequent syncs find no items to
		// move and just update the flag.
		this._childObserver = new MutationObserver(() => this._syncMenuItems());
		this._childObserver.observe(this, { childList: true });
		// Capture open-state BEFORE the browser's light-dismiss fires on
		// mousedown. The subsequent click handler uses this snapshot to
		// decide: was the popover open? → user clicked to close (no-op,
		// light-dismiss already closed it). Was it closed? → open it.
		this._trigger?.addEventListener('mousedown', () => {
			this._menuWasOpenOnMousedown = this._menu?.matches(':popover-open') ?? false;
		});
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._childObserver?.disconnect();
		this._childObserver = undefined;
		this._menu?.removeEventListener('toggle', this._handleMenuToggle);
	}

	/**
	 * Moves any `nldd-menu-item` / `nldd-menu-divider` children from the light
	 * DOM into the internal `nldd-menu` (so nldd-menu's `querySelectorAll`
	 * sees them) and syncs `_hasMenuItems` against the menu's current content.
	 * Safe to call repeatedly — already-moved items are no longer in
	 * `this.children`.
	 */
	private _syncMenuItems(): void {
		if (!this._menu || !this._trigger) return;
		const toMove = Array.from(this.children).filter((el) =>
			el.matches('nldd-menu-item, nldd-menu-divider'),
		);
		toMove.forEach((item) => this._menu!.appendChild(item));
		const hadItems = this._hasMenuItems;
		this._hasMenuItems =
			this._menu.querySelectorAll('nldd-menu-item, nldd-menu-divider').length > 0;
		if (this._hasMenuItems && !hadItems) {
			this._menu.anchorElement = this._trigger;
			this._menu.addEventListener('toggle', this._handleMenuToggle);
		}
	}

	private _handleMenuToggle = (event: Event): void => {
		this._menuIsOpen = (event as ToggleEvent).newState === 'open';
	};

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

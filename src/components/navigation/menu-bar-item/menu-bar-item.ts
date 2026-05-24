/**
 * Menu Bar Item Component (Lit + TypeScript)
 *
 * Interactief bouwblok voor gebruik in een menu bar. Rendert als <a> (met href)
 * of <button> (zonder href). Ondersteunt icon, text, disclosure indicator,
 * en een expandable popover via een geslotte `<nldd-menu>` (of ander
 * popover-element).
 *
 * @element nldd-menu-bar-item
 * @attr {string} text - Tekst van het item
 * @attr {boolean} current - Markeer als actief/huidig item
 * @attr {string} current-type - aria-current waarde als current is true ('page', 'step', 'location', 'true'). Standaard: 'page'
 * @attr {string} href - Optionele link URL. Zonder href rendert als button.
 * @attr {string} icon - Optioneel icon naam (nldd-icon)
 * @attr {boolean} expandable - Toon disclosure icon en open de geslotte `<nldd-menu>` bij klik
 * @attr {boolean} icon-only - Verberg tekst visueel (altijd)
 * @attr {'icon'|'text'} content-priority - Bepaalt wat zichtbaar blijft in compact modus: 'icon' verbergt tekst, 'text' verbergt icon
 * @attr {boolean} compact - Activeert content-priority gedrag (gezet door parent nldd-menu-bar)
 * @attr {boolean} disabled - Schakel interactie uit
 * @attr {string} accessible-label - Overschrijf aria-label
 * @attr {string} haspopup - aria-haspopup waarde (bijv. "menu", "dialog")
 * @attr {boolean} open - Of het gekoppelde popover/menu open is
 *
 * @fires select - Bij klik op non-expandable button item (bubbles, composed)
 *
 * @slot - Inhoud van de expandable popover — wrap items in een `<nldd-menu>`
 *   zodat dit component de menu-API (variant, accessible-label, translations,
 *   filterFn, …) niet hoeft te dupliceren. Event listeners op items werken
 *   direct, omdat er niet meer gekloond wordt.
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { menuBarItemStyles } from './menu-bar-item.styles.js';
import { template } from './menu-bar-item.template.js';
import '../../content/icon/icon.js';
import '../../lists-and-menus/menu/menu.js';

/**
 * Minimal typed interface for nldd-menu.
 * Double-cast (as unknown as) is required because querySelector returns Element,
 * and this custom element class is not registered in HTMLElementTagNameMap
 * for this component's compilation unit.
 */
interface PopoverMenu extends HTMLElement {
	anchorElement: Element | null;
	showPopover(): void;
	hidePopover(): void;
}

@customElement('nldd-menu-bar-item')
export class NLDDMenuBarItem extends LitElement {
	static override styles = menuBarItemStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: Boolean, reflect: true })
	current = false;

	@property({ type: String, attribute: 'current-type', reflect: true })
	currentType: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' = 'page';

	@property({ type: String })
	href = '';

	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: Boolean, reflect: true })
	expandable = false;

	@property({ type: Boolean, attribute: 'icon-only', reflect: true })
	iconOnly = false;

	@property({ type: String, attribute: 'content-priority', reflect: true })
	contentPriority = '';

	@property({ type: Boolean, reflect: true })
	compact = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String })
	haspopup = '';

	@property({ type: Boolean, reflect: true })
	expanded = false;

	/**
	 * Direct element reference to the popover this item invokes — IDL-only
	 * counterpart to `popovertarget` that works across shadow boundaries.
	 * Set by `nldd-menu` when this item is wired up as the menu's anchor
	 * so the browser recognises the inner button as the menu's invoker
	 * and excludes the click from popover light-dismiss.
	 */
	@property({ attribute: false })
	popoverTargetElement: Element | null = null;

	/**
	 * Action the browser performs when the inner button is clicked,
	 * mirroring the standard `popovertargetaction` attribute. The menu
	 * keeps this in sync with its open state — `'hide'` while open,
	 * `'show'` while closed — so the browser's native invoker action
	 * always matches the intent of the click without racing.
	 */
	@property({ attribute: false })
	popoverTargetAction: 'toggle' | 'show' | 'hide' = 'toggle';

	// ## Menu popover state

	private _menu: PopoverMenu | null = null;
	private _menuOpen = false;
	private _pointerdownWhileMenuOpen = false;
	private _menuToggleHandler: ((event: Event) => void) | null = null;

	// ## Lifecycle

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('pointerdown', this._handlePointerdown);
		this.addEventListener('click', this._handleClick);
		// Wire any nldd-menu that is already in light DOM before our shadow
		// renders — covers the case where a consumer fires `toggle`
		// programmatically before the first click (so before _toggleMenu()
		// would have wired the menu itself). Slotchange handles the slot's
		// own projection event; this handles the pre-render snapshot.
		this._wireMenu();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('pointerdown', this._handlePointerdown);
		this.removeEventListener('click', this._handleClick);
		this._unwireMenu();
	}

	_onSlotChange = (): void => {
		// Re-wire when a consumer swaps the slotted <nldd-menu> at runtime.
		this._wireMenu();
	};

	override focus(options?: FocusOptions): void {
		const focusable = this.shadowRoot?.querySelector<HTMLElement>('button, a');
		focusable?.focus(options);
	}

	// ## Helpers

	private _findMenu(): PopoverMenu | null {
		return this.querySelector('nldd-menu') as unknown as PopoverMenu | null;
	}

	private _wireMenu(): void {
		const menu = this._findMenu();
		if (menu === this._menu) return;
		this._unwireMenu();
		if (!menu) return;
		this._menu = menu;
		this._menuToggleHandler = (event: Event) => {
			const isOpen = (event as ToggleEvent).newState === 'open';
			this._menuOpen = isOpen;
			this.expanded = isOpen;
		};
		menu.addEventListener('toggle', this._menuToggleHandler);
	}

	private _unwireMenu(): void {
		if (this._menu && this._menuToggleHandler) {
			this._menu.removeEventListener('toggle', this._menuToggleHandler);
		}
		this._menu = null;
		this._menuToggleHandler = null;
		this._menuOpen = false;
	}

	// ## Event handlers

	private _handlePointerdown = (): void => {
		if (this._menuOpen) {
			this._pointerdownWhileMenuOpen = true;
		}
	};

	private _handleClick = (event: Event): void => {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		if (this.expandable && this._findMenu()) {
			event.preventDefault();
			this._toggleMenu();
			return;
		}

		if (!this.href) {
			event.preventDefault();
			this.dispatchEvent(new CustomEvent('select', {
				bubbles: true,
				composed: true,
				detail: { item: this },
			}));
		}
	};

	// ## Menu popover

	private _toggleMenu(): void {
		if (this._pointerdownWhileMenuOpen) {
			this._pointerdownWhileMenuOpen = false;
			return;
		}
		// _wireMenu already ran in connectedCallback and re-runs on
		// slotchange — no need to call it here.
		if (!this._menu) return;
		this._menu.anchorElement = this;
		if (this._menuOpen) {
			this._menu.hidePopover();
		} else {
			this._menu.showPopover();
		}
	}

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-menu-bar-item': NLDDMenuBarItem;
	}
}

/**
 * Menu Bar Item Component (Lit + TypeScript)
 *
 * Interactief bouwblok voor gebruik in een menu bar. Rendert als <a> (met href)
 * of <button> (zonder href). Ondersteunt icon, text, disclosure indicator,
 * en expandable popover menu via slotted ndd-menu-item elementen.
 *
 * @element ndd-menu-bar-item
 * @attr {string} text - Tekst van het item
 * @attr {boolean} current - Markeer als actief/huidig item
 * @attr {string} href - Optionele link URL. Zonder href rendert als button.
 * @attr {string} icon - Optioneel icon naam (ndd-icon)
 * @attr {boolean} expandable - Toon disclosure icon en open popover bij klik
 * @attr {boolean} icon-only - Verberg tekst visueel (altijd)
 * @attr {'icon'|'text'} content-priority - Bepaalt wat zichtbaar blijft in compact modus: 'icon' verbergt tekst, 'text' verbergt icon
 * @attr {boolean} compact - Activeert content-priority gedrag (gezet door parent ndd-menu-bar)
 * @attr {boolean} disabled - Schakel interactie uit
 * @attr {string} accessible-label - Overschrijf aria-label
 * @attr {string} haspopup - aria-haspopup waarde (bijv. "menu", "dialog")
 * @attr {boolean} open - Of het gekoppelde popover/menu open is
 *
 * @fires select - Bij klik op non-expandable button item (bubbles, composed)
 *
 * @slot - Slotted ndd-menu-item en ndd-menu-divider voor expandable popover
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './ndd-menu-bar-item.styles.js';
import { template } from './ndd-menu-bar-item.template.js';
import '../../content/icon/ndd-icon.js';
import '../../lists-and-menus/menu/ndd-menu.js';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';
import { sanitizeUrl } from '../../../utilities/sanitize-url.js';

/**
 * Minimal typed interface for ndd-menu.
 * Double-cast (as unknown as) is required because createElement returns HTMLElement,
 * and this custom element class is not registered in HTMLElementTagNameMap
 * for this component's compilation unit.
 */
interface PopoverMenu extends HTMLElement {
	anchorElement: Element | null;
	showPopover(): void;
	hidePopover(): void;
}

@customElement('ndd-menu-bar-item')
export class NDDMenuBarItem extends LitElement {
	static override styles = styles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: Boolean, reflect: true })
	current = false;

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
	open = false;

	// ## Menu popover state

	private _menu: PopoverMenu | null = null;
	private _menuOpen = false;
	private _menuClosedAt = 0;

	// ## Lifecycle

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('click', this._handleClick);
		if (this.expandable) {
			this._createMenu();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('click', this._handleClick);
		this._menu?.remove();
		this._menu = null;
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('expandable')) {
			if (this.expandable && !this._menu) {
				this._createMenu();
			} else if (!this.expandable && this._menu) {
				this._menu.remove();
				this._menu = null;
			}
		}
	}

	override focus(options?: FocusOptions): void {
		const focusable = this.shadowRoot?.querySelector<HTMLElement>('button, a');
		focusable?.focus(options);
	}

	// ## Helpers

	/** Sanitize a URL, blocking dangerous protocols. Returns null for unsafe URLs. */
	sanitizeUrl(url: string | null): string | null {
		return sanitizeUrl(url);
	}

	private _hasMenuItems(): boolean {
		return this.querySelector('ndd-menu-item, ndd-menu-divider') !== null;
	}

	// ## Event handlers

	private _handleClick = (event: Event): void => {
		if (this.disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		if (this.expandable && this._hasMenuItems()) {
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

	private _createMenu(): void {
		if (this._menu) return;
		if (typeof document === 'undefined') return;

		const menu = document.createElement('ndd-menu') as unknown as PopoverMenu;
		menu.setAttribute('placement', 'bottom-start');

		menu.addEventListener('toggle', (event: Event) => {
			const open = (event as ToggleEvent).newState === 'open';
			this._menuOpen = open;
			this.open = open;
			if (open) this._syncMenuItems();
			if (!open) this._menuClosedAt = Date.now();
		});
		document.body.appendChild(menu);
		this._menu = menu;
	}

	private _syncMenuItems(): void {
		if (!this._menu) return;
		this._menu.innerHTML = '';

		const items = this.querySelectorAll('ndd-menu-item, ndd-menu-divider');
		items.forEach(item => {
			const clone = item.cloneNode(true) as Element;
			this._menu!.appendChild(clone);
		});
	}

	private _toggleMenu(): void {
		if (!this._menu) return;

		this._menu.anchorElement = this;
		this._syncMenuItems();

		if (this._menuOpen) {
			this._menu.hidePopover();
		} else if (Date.now() - this._menuClosedAt > POPOVER_REOPEN_GUARD_MS) {
			this._menu.showPopover();
		}
	}

	override render() {
		return template(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-menu-bar-item': NDDMenuBarItem;
	}
}

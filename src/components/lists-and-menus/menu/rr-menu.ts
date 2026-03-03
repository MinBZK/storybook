/**
 * RegelRecht Menu Components (Lit + TypeScript)
 *
 * A menu container with menu items and dividers.
 * Use as a native HTML popover by adding the popover attribute.
 *
 * @element rr-menu
 * @attr {string} anchor - ID of the element to anchor the menu to
 *
 * @example
 * <rr-button id="my-button" popovertarget="my-menu">Open menu</rr-button>
 * <rr-menu id="my-menu" popover anchor="my-button">
 *   <rr-menu-item title="Bewerk" selectable selected></rr-menu-item>
 *   <rr-menu-item title="Kopieer" selectable></rr-menu-item>
 *   <rr-menu-item title="Sluiten"></rr-menu-item>
 * </rr-menu>
 *
 * ---
 *
 * @element rr-menu-item
 * @attr {string} title - Menu item text
 * @attr {string} details - Optional details text (e.g. keyboard shortcut)
 * @attr {boolean} selectable - Whether this item shows the checkmark column
 * @attr {boolean} selected - Whether the item is selected (shows checkmark)
 * @attr {boolean} disabled - Disabled state
 *
 * @fires rr-select - When the item is clicked
 *
 * ---
 *
 * @element rr-menu-divider
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';
import { menuStyles, menuItemStyles, menuDividerStyles } from './rr-menu.styles.js';
import { menuTemplate, menuItemTemplate, menuDividerTemplate } from './rr-menu.template.js';
import '../../lists-and-menus/icon-cell/rr-icon-cell.js';
import '../../lists-and-menus/spacer-cell/rr-spacer-cell.js';
import '../../lists-and-menus/text-cell/rr-text-cell.js';
import '../../content/icon/rr-icon.js';

// # rr-menu-divider

@customElement('rr-menu-divider')
export class RRMenuDivider extends LitElement {
	static override styles = menuDividerStyles;

	override render() {
		return menuDividerTemplate();
	}
}

// # rr-menu-item

@customElement('rr-menu-item')
export class RRMenuItem extends LitElement {
	static override styles = menuItemStyles;

	@property({ type: String, reflect: true })
	override title = '';

	@property({ type: String, reflect: true })
	details = '';

	@property({ type: Boolean, reflect: true })
	selectable = false;

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	_handleClick(): void {
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('rr-select', {
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return menuItemTemplate.call(this);
	}
}

// # rr-menu

@customElement('rr-menu')
export class RRMenu extends LitElement {
	static override styles = menuStyles;

	@property({ type: String, reflect: true })
	anchor = '';

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('toggle', this._handleToggle);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('toggle', this._handleToggle);
	}

	private _handleToggle = async (event: Event): Promise<void> => {
		const toggleEvent = event as ToggleEvent;
		if (toggleEvent.newState !== 'open') return;
		if (!this.anchor) return;

		const anchorEl = document.getElementById(this.anchor);
		if (!anchorEl) return;

		const { x, y } = await computePosition(anchorEl, this, {
			placement: 'bottom-start',
			middleware: [
				offset(4),
				flip(),
				shift({ padding: 8 }),
			],
		});

		Object.assign(this.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	};

	override render() {
		return menuTemplate.call(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-menu': RRMenu;
		'rr-menu-item': RRMenuItem;
		'rr-menu-divider': RRMenuDivider;
	}
}

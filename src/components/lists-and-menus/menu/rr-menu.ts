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
	override text = '';

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

	// String ID for light DOM usage
	@property({ type: String, reflect: true })
	anchor = '';

	// Direct element reference — takes priority over anchor string
	@property({ attribute: false })
	anchorElement: Element | null = null;

	@property({ type: String, reflect: true })
	placement: string = 'bottom-start';

	private _isOpen = false;

	private _getAnchorEl(): Element | null {
		if (this.anchorElement) return this.anchorElement;
		if (this.anchor) return document.getElementById(this.anchor);
		return null;
	}

	private _handleDocumentClick = (event: MouseEvent): void => {
		const anchorEl = this._getAnchorEl();
		if (!anchorEl) return;

		const path = event.composedPath();
		if (!path.includes(anchorEl)) return;

		if (this._isOpen) {
			(this as unknown as { hidePopover: () => void }).hidePopover();
		} else {
			(this as unknown as { showPopover: () => void }).showPopover();
		}
	};

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('popover')) {
			this.setAttribute('popover', '');
		}
		this.addEventListener('toggle', this._handleToggle);
		this.addEventListener('keydown', this._handleKeydown);
		document.addEventListener('click', this._handleDocumentClick);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('toggle', this._handleToggle);
		this.removeEventListener('keydown', this._handleKeydown);
		document.removeEventListener('click', this._handleDocumentClick);
	}

	private _getItems(): RRMenuItem[] {
		return Array.from(
			this.querySelectorAll('rr-menu-item:not([disabled])')
		) as RRMenuItem[];
	}

	private _handleKeydown = (event: KeyboardEvent): void => {
		const items = this._getItems();
		if (items.length === 0) return;

		const focused = this.querySelector('rr-menu-item:focus-within') as RRMenuItem | null;
		const index = focused ? items.indexOf(focused) : -1;

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();
				const next = index === -1 ? 0 : index < items.length - 1 ? index + 1 : 0;
				items[next].shadowRoot?.querySelector('button')?.focus();
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				const prev = index === -1 ? items.length - 1 : index > 0 ? index - 1 : items.length - 1;
				items[prev].shadowRoot?.querySelector('button')?.focus();
				break;
			}
			case 'Home': {
				event.preventDefault();
				items[0].shadowRoot?.querySelector('button')?.focus();
				break;
			}
			case 'End': {
				event.preventDefault();
				items[items.length - 1].shadowRoot?.querySelector('button')?.focus();
				break;
			}
			case 'Escape': {
				event.preventDefault();
				(this as unknown as { hidePopover: () => void }).hidePopover();
				const anchorEl = this._getAnchorEl();
				(anchorEl as HTMLElement | null)?.focus();
				break;
			}
		}
	};

	private _updateDividerVisibility(): void {
		const children = Array.from(this.children) as Element[];

		// Reset all dividers
		children.forEach(el => {
			if (el.tagName.toLowerCase() === 'rr-menu-divider') {
				el.removeAttribute('hidden');
			}
		});

		// Hide dividers that are first, last, or adjacent to another divider
		const visible = children.filter(el => !el.hasAttribute('hidden'));
		visible.forEach((el, index) => {
			if (el.tagName.toLowerCase() !== 'rr-menu-divider') return;
			const isFirst = index === 0;
			const isLast = index === visible.length - 1;
			const prevIsDivider = index > 0 && visible[index - 1].tagName.toLowerCase() === 'rr-menu-divider';
			if (isFirst || isLast || prevIsDivider) {
				el.setAttribute('hidden', '');
			}
		});
	}

	private _handleToggle = async (event: Event): Promise<void> => {
		const toggleEvent = event as ToggleEvent;
		this._isOpen = toggleEvent.newState === 'open';

		if (toggleEvent.newState !== 'open') return;

		this._updateDividerVisibility();

		const anchorEl = this._getAnchorEl();
		if (!anchorEl) return;

		const { x, y } = await computePosition(anchorEl, this, {
			placement: this.placement as import('@floating-ui/dom').Placement,
			middleware: [
				offset(0),
				flip(),
				shift({ padding: 8 }),
			],
		});

		Object.assign(this.style, {
			left: `${x}px`,
			top: `${y}px`,
		});

		await this.updateComplete;
		const items = this._getItems();
		if (items.length > 0) {
			items[0].shadowRoot?.querySelector('button')?.focus();
		}
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

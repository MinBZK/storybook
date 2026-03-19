import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, size } from '@floating-ui/dom';
import { menuStyles, menuItemStyles, menuDividerStyles } from './rr-menu.styles.js';
import { menuTemplate, menuItemTemplate, menuDividerTemplate } from './rr-menu.template.js';
import { rrMenuTranslations } from './rr-menu.i18n.js';
import type { RRMenuTranslations } from './rr-menu.i18n.js';
import '../../lists-and-menus/cells/icon-cell/rr-icon-cell.js';
import '../../lists-and-menus/cells/spacer-cell/rr-spacer-cell.js';
import '../../lists-and-menus/cells/text-cell/rr-text-cell.js';
import '../../content/icon/rr-icon.js';


// # rr-menu-divider

export class RRMenuDivider extends LitElement {
	static override styles = menuDividerStyles;

	override render() {
		return menuDividerTemplate();
	}
}

if (!customElements.get('rr-menu-divider')) {
	customElements.define('rr-menu-divider', RRMenuDivider);
}


// # rr-menu-item

/**
 * A single item within an rr-menu.
 *
 * @attr {string}  text     - Display text. Supports **bold** markdown syntax when set
 *                            programmatically by rr-menu's filter method. See filter() for details.
 * @attr {string}  value    - Form value. Falls back to text when not set.
 * @attr {string}  search   - Space-separated alternative search terms.
 * @attr {string}  details  - Secondary label shown on the right side.
 * @attr {string}  type     - Item type: 'button' | 'checkbox' | 'radio'. Default: 'button'.
 * @attr {boolean} selected - Selected state for checkbox and radio types.
 * @attr {boolean} disabled - Disabled state.
 *
 * @fires select - Fired when the item is clicked and not disabled.
 */
export class RRMenuItem extends LitElement {
	static override styles = menuItemStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true })
	value = '';

	/** Space-separated alternative search terms used by rr-menu's filter. */
	@property({ type: String, reflect: true })
	search = '';

	@property({ type: String, reflect: true })
	details = '';

	@property({ type: String, reflect: true })
	type: 'button' | 'checkbox' | 'radio' = 'button';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Internal display text set by rr-menu's filter with bold markers applied. */
	@state()
	_displayText = '';

	/** Set by rr-menu during filtering to apply bold markers to matching text. */
	setDisplayText(text: string): void {
		this._displayText = text;
	}

	/** Set by rr-menu. Not part of the public API. */
	@property({ attribute: false })
	menuVariant: 'menu' | 'listbox' = 'menu';

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('focusin', () => {
			this.setAttribute('data-focused', '');
			this.dispatchEvent(new CustomEvent('menu-item-focused', {
				bubbles: true,
				composed: true,
			}));
		});
		this.addEventListener('focusout', () => this.removeAttribute('data-focused'));
	}

	_handleClick(): void {
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('select', {
			bubbles: true,
			composed: true,
		}));
		(this.closest('rr-menu') as unknown as { hidePopover?: () => void })?.hidePopover?.();
	}

	/** Programmatically select this item. */
	select(): void {
		this._handleClick();
	}

	override render() {
		return menuItemTemplate.call(this, this.menuVariant);
	}
}

if (!customElements.get('rr-menu-item')) {
	customElements.define('rr-menu-item', RRMenuItem);
}


// # rr-menu

const defaultFilterFn = (query: string, item: RRMenuItem): boolean => {
	const q = query.toLowerCase();
	const textMatch = item.text.toLowerCase().includes(q);
	const valueMatch = item.value !== '' && item.value.toLowerCase().includes(q);
	const searchMatch = item.search !== '' && item.search.split(' ').some(s => s.toLowerCase().includes(q));
	return textMatch || valueMatch || searchMatch;
};

/**
 * A floating menu component using the Popover API.
 * Positioned relative to an anchor element using Floating UI.
 *
 * Supports filtering, keyboard navigation, and highlight management.
 * Use rr-menu-item and rr-menu-divider as children.
 *
 * Note: Only type="button" items are supported when used inside rr-combo-box-field.
 * Radio and checkbox types may be used in standalone menus.
 *
 * @attr {string}  anchor         - ID of the anchor element.
 * @attr {string}  placement      - Floating UI placement. Default: 'bottom-start'.
 * @attr {string}  empty-text     - Text shown when all items are hidden or no items exist.
 * @attr {boolean} no-auto-focus  - When set, the first item is not focused on open.
 * @attr {string}  width          - Explicit width. Sets --_menu-width internally.
 * @attr {number}  max-items      - Maximum number of visible items before scrolling.
 *                                  Sets --_menu-max-items internally. Default: 0 (no limit).
 * @attr {object}  translations   - Override one or more translation keys.
 * @attr {Function} filterFn      - Custom filter function (query, item) => boolean.
 *
 * @slot - rr-menu-item and rr-menu-divider elements.
 */
export class RRMenu extends LitElement {
	static override styles = menuStyles;

	@property({ type: String, reflect: true })
	anchor = '';

	@property({ attribute: false })
	anchorElement: Element | null = null;

	@property({ type: String, reflect: true })
	placement: string = 'bottom-start';

	/**
	 * Render variant. Use 'listbox' when the menu serves as a combobox popup —
	 * this switches role to "listbox" and item roles to "option" per ARIA spec.
	 * Default: 'menu'.
	 */
	@property({ type: String, reflect: true })
	variant: 'menu' | 'listbox' = 'menu';

	@property({ type: String, attribute: 'empty-text' })
	emptyText = '';

	/** When set, the first item is not focused automatically on open. */
	@property({ type: Boolean, attribute: 'no-auto-focus' })
	noAutoFocus = false;

	/** Explicit width. Sets --_menu-width internally. */
	@property({ type: String, reflect: true })
	width = '';

	/**
	 * Maximum number of visible items before the menu scrolls.
	 * Sets --_menu-max-items internally. Default: 0 (no limit).
	 */
	@property({ type: Number, attribute: 'max-items' })
	maxItems = 0;

	/**
	 * Override one or more translation keys.
	 * Unset keys fall back to the Dutch default.
	 */
	@property({ type: Object })
	translations: Partial<RRMenuTranslations> = {};

	/**
	 * Custom filter function. Defaults to case-insensitive substring match
	 * on text, value, and search attributes.
	 */
	@property({ attribute: false })
	filterFn: (query: string, item: RRMenuItem) => boolean = defaultFilterFn;

	@state()
	private _isEmpty = false;

	private _isOpen = false;

	// — i18n ——————————————————————————————————————————————————————————————————

	private _t(key: keyof RRMenuTranslations): string {
		return this.translations[key] ?? rrMenuTranslations[key];
	}

	/** Resolved empty text: emptyText attribute takes precedence, then i18n fallback. */
	get _resolvedEmptyText(): string {
		return this.emptyText || this._t('components.menu.empty-text');
	}

	// — Lifecycle ——————————————————————————————————————————————————————————————

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			if (this.width) {
				this.style.setProperty('--_menu-width', this.width);
			} else {
				this.style.removeProperty('--_menu-width');
			}
		}
		if (changedProperties.has('maxItems')) {
			if (this.maxItems > 0) {
				this.style.setProperty('--_menu-max-items', String(this.maxItems));
			} else {
				this.style.removeProperty('--_menu-max-items');
			}
		}
		if (changedProperties.has('variant')) {
			Array.from(this.querySelectorAll('rr-menu-item')).forEach(item => {
				(item as RRMenuItem).menuVariant = this.variant;
			});
		}
	}

	// — Anchor ————————————————————————————————————————————————————————————————

	private _getAnchorEl(): Element | null {
		if (this.anchorElement) return this.anchorElement;
		if (this.anchor) return document.getElementById(this.anchor);
		return null;
	}

	// — Event handlers ————————————————————————————————————————————————————————

	private _handleDocumentClick = (event: MouseEvent): void => {
		if (this.anchorElement) return;
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

	private _handleMenuItemMouseenter = (event: MouseEvent): void => {
		const item = (event.target as Element).closest('rr-menu-item') as RRMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;
		this._setHighlight(item);
	};

	private _handleMenuItemFocused = (event: Event): void => {
		const item = (event.target as Element).closest('rr-menu-item') as RRMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;
		this._setHighlight(item);
	};

	// — Lifecycle callbacks ————————————————————————————————————————————————————

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.hasAttribute('popover')) {
			this.setAttribute('popover', '');
		}
		this.addEventListener('toggle', this._handleToggle);
		this.addEventListener('keydown', this._handleKeydown);
		this.addEventListener('mouseenter', this._handleMenuItemMouseenter, true);
		this.addEventListener('menu-item-focused', this._handleMenuItemFocused);
		document.addEventListener('click', this._handleDocumentClick);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('toggle', this._handleToggle);
		this.removeEventListener('keydown', this._handleKeydown);
		this.removeEventListener('mouseenter', this._handleMenuItemMouseenter, true);
		this.removeEventListener('menu-item-focused', this._handleMenuItemFocused);
		document.removeEventListener('click', this._handleDocumentClick);
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _getVisibleItems(): RRMenuItem[] {
		return Array.from(
			this.querySelectorAll('rr-menu-item:not([hidden]):not([disabled])')
		) as RRMenuItem[];
	}

	private _getFocusedIndex(items: RRMenuItem[]): number {
		return items.findIndex(item => item.hasAttribute('data-focused'));
	}

	private _setHighlight(target: RRMenuItem): void {
		Array.from(this.querySelectorAll('rr-menu-item')).forEach(item => {
			item.removeAttribute('highlighted');
		});
		target.setAttribute('highlighted', '');
	}

	private _updateHighlight(): void {
		const items = this._getVisibleItems();
		Array.from(this.querySelectorAll('rr-menu-item')).forEach(item => {
			item.removeAttribute('highlighted');
		});
		if (items.length > 0) {
			items[0].setAttribute('highlighted', '');
		}
	}

	private _updateEmptyState(): void {
		this._isEmpty = this._getVisibleItems().length === 0;
	}

	private _updateDividerVisibility(): void {
		const children = Array.from(this.children) as Element[];
		children.forEach(el => {
			if (el.tagName.toLowerCase() === 'rr-menu-divider') {
				el.removeAttribute('hidden');
			}
		});

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

	// — Public API ————————————————————————————————————————————————————————————

	/**
	 * Filter items based on a query string.
	 *
	 * Matching items are kept visible. Non-matching items are hidden.
	 *
	 * For visible items, the non-typed portion of the text is marked bold using
	 * **markdown** syntax, which the template renders as <b> tags. This follows
	 * the principle that the typed characters are already known to the user —
	 * emphasising the predictive completion helps users scan the differences
	 * between suggestions and identify the new information at a glance.
	 *
	 * When the query is empty, all items are shown and bold markers are cleared.
	 */
	public filter(query: string): void {
		const allItems = Array.from(this.querySelectorAll('rr-menu-item')) as RRMenuItem[];
		allItems.forEach(item => {
			const matches = !query || this.filterFn(query, item);
			item.toggleAttribute('hidden', !matches);
			if (!query) {
				item.setDisplayText('');
			} else if (matches) {
				const q = query.toLowerCase();
				let remaining = item.text;
				let remainingLower = item.text.toLowerCase();
				const parts: string[] = [];

				while (remaining.length > 0) {
					const idx = remainingLower.indexOf(q);
					if (idx === -1) {
						parts.push(`**${remaining}**`);
						break;
					}
					if (idx > 0) parts.push(`**${remaining.slice(0, idx)}**`);
					parts.push(remaining.slice(idx, idx + query.length));
					remaining = remaining.slice(idx + query.length);
					remainingLower = remaining.toLowerCase();
				}

				item.setDisplayText(parts.join(''));
			}
		});
		this._updateHighlight();
		this._updateEmptyState();
		this._updateDividerVisibility();
		if (this._isOpen) this.reposition();
	}

	/**
	 * Move both focus and highlight to the next, previous, or first visible item.
	 */
	public focusItem(direction: 'next' | 'prev' | 'first'): void {
		const items = this._getVisibleItems();
		if (items.length === 0) return;

		let targetIndex: number;

		if (direction === 'first') {
			targetIndex = 0;
		} else {
			const current = items.findIndex(item =>
				item.hasAttribute('highlighted') || item.hasAttribute('data-focused')
			);
			if (direction === 'next') {
				targetIndex = current === -1 ? 0 : current < items.length - 1 ? current + 1 : 0;
			} else {
				targetIndex = current === -1 ? items.length - 1 : current > 0 ? current - 1 : items.length - 1;
			}
		}

		items.forEach(item => item.removeAttribute('highlighted'));
		items[targetIndex].setAttribute('highlighted', '');
		items[targetIndex].shadowRoot?.querySelector('button')?.focus();
	}

	/**
	 * Move the highlight to the next or previous visible item without moving focus.
	 * Useful when keyboard navigation should keep focus on the input.
	 */
	public moveHighlight(direction: 'next' | 'prev'): void {
		const items = this._getVisibleItems();
		if (items.length === 0) return;

		const current = items.findIndex(item => item.hasAttribute('highlighted'));
		let next: number;

		if (direction === 'next') {
			next = current === -1 ? 0 : current < items.length - 1 ? current + 1 : 0;
		} else {
			next = current === -1 ? items.length - 1 : current > 0 ? current - 1 : items.length - 1;
		}

		items.forEach(item => item.removeAttribute('highlighted'));
		items[next].setAttribute('highlighted', '');
	}

	/** Returns the currently highlighted item, or null if none. */
	public getHighlighted(): RRMenuItem | null {
		return this.querySelector('rr-menu-item[highlighted]') as RRMenuItem | null;
	}

	/** Recalculate position and size relative to the anchor element. */
	public async reposition(): Promise<void> {
		const anchorEl = this._getAnchorEl();
		if (!anchorEl || !this._isOpen) return;

		const viewportMargin = parseInt(
			getComputedStyle(this).getPropertyValue('--_viewport-margin')
		);

		const { x, y } = await computePosition(anchorEl, this, {
			placement: this.placement as import('@floating-ui/dom').Placement,
			middleware: [
				offset(0),
				flip({ padding: viewportMargin }),
				shift({ padding: viewportMargin }),
				size({
					padding: viewportMargin,
					apply: ({ availableHeight }: { availableHeight: number }) => {
						this.style.setProperty('--_menu-max-height', `${availableHeight}px`);
					},
				}),
			],
		});

		Object.assign(this.style, {
			left: `${x}px`,
			top: `${y}px`,
		});
	}

	// — Private handlers ——————————————————————————————————————————————————————

	private _handleKeydown = (event: KeyboardEvent): void => {
		const items = this._getVisibleItems();
		if (items.length === 0) return;

		const index = this._getFocusedIndex(items);

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

	private _handleToggle = async (event: Event): Promise<void> => {
		const toggleEvent = event as ToggleEvent;
		this._isOpen = toggleEvent.newState === 'open';

		if (toggleEvent.newState !== 'open') return;

		this._updateDividerVisibility();
		this._updateHighlight();
		this._updateEmptyState();
		Array.from(this.querySelectorAll('rr-menu-item')).forEach(item => {
			(item as RRMenuItem).menuVariant = this.variant;
		});

		await this.reposition();

		if (!this.noAutoFocus) {
			await this.updateComplete;
			const items = this._getVisibleItems();
			if (items.length > 0) {
				items[0].shadowRoot?.querySelector('button')?.focus();
			}
		}
	};

	override render() {
		return menuTemplate.call(this, this._isEmpty, this.variant);
	}
}

if (!customElements.get('rr-menu')) {
	customElements.define('rr-menu', RRMenu);
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-menu': RRMenu;
		'rr-menu-item': RRMenuItem;
		'rr-menu-divider': RRMenuDivider;
	}
}

import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, size } from '@floating-ui/dom';
import { menuStyles, menuItemStyles, menuDividerStyles } from './ndd-menu.styles.js';
import { menuTemplate, menuItemTemplate, menuDividerTemplate } from './ndd-menu.template.js';
import { nddMenuTranslations } from './ndd-menu.i18n.js';
import type { NDDMenuTranslations } from './ndd-menu.i18n.js';
import '../../lists-and-menus/cells/icon-cell/ndd-icon-cell.js';
import '../../lists-and-menus/cells/spacer-cell/ndd-spacer-cell.js';
import '../../lists-and-menus/cells/text-cell/ndd-text-cell.js';
import '../../content/icon/ndd-icon.js';
import { isKeyboardMode } from '../../../utilities/keyboard-mode.js';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';


// # ndd-menu-divider

export class NDDMenuDivider extends LitElement {
	static override styles = menuDividerStyles;

	override render() {
		return menuDividerTemplate();
	}
}

if (!customElements.get('ndd-menu-divider')) {
	customElements.define('ndd-menu-divider', NDDMenuDivider);
}


// # ndd-menu-item

/**
 * A single item within an ndd-menu.
 *
 * @attr {string}  text     - Display text. Supports **bold** markdown syntax when set
 *                            programmatically by ndd-menu's filter method. See filter() for details.
 * @attr {string}  value    - Form value. Falls back to text when not set.
 * @attr {string}  aliases  - Space-separated alternative search terms.
 * @attr {string}  details  - Secondary label shown on the right side.
 * @attr {string}  type     - Item type: 'button' | 'checkbox' | 'radio'. Default: 'button'.
 * @attr {boolean} selected - Selected state for checkbox and radio types.
 * @attr {boolean} disabled - Disabled state.
 *
 * @fires select - Fired when the item is clicked and not disabled.
 */
export class NDDMenuItem extends LitElement {
	static override styles = menuItemStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true })
	value = '';

	/** Space-separated alternative search terms used by ndd-menu's filter. */
	@property({ type: String, reflect: true })
	aliases = '';

	@property({ type: String, reflect: true })
	details = '';

	@property({ type: String, reflect: true })
	type: 'button' | 'checkbox' | 'radio' = 'button';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Internal display text set by ndd-menu's filter with bold markers applied. */
	@state()
	_displayText = '';

	/** Set by ndd-menu during filtering to apply bold markers to matching text. */
	setDisplayText(text: string): void {
		this._displayText = text;
	}

	/** Set by ndd-menu. Not part of the public API. */
	@state()
	menuVariant: 'menu' | 'listbox' = 'menu';

	private static _counter = 0;

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.id) {
			this.id = `ndd-menu-item-${NDDMenuItem._counter++}`;
		}
		this.addEventListener('focusin', () => {
			this.setAttribute('data-focused', '');
			this.dispatchEvent(new CustomEvent('menu-item-focused', {
				bubbles: true,
				composed: true,
			}));
		});
		this.addEventListener('focusout', () => this.removeAttribute('data-focused'));
	}

	override focus(options?: FocusOptions): void {
		const focusable = this.shadowRoot?.querySelector<HTMLElement>('button, a');
		focusable?.focus(options);
	}

	_handleClick(): void {
		if (this.disabled) return;
		this.dispatchEvent(new CustomEvent('select', {
			bubbles: true,
			composed: true,
		}));
		(this.closest('ndd-menu') as HTMLElement)?.hidePopover?.();
	}

	/** Programmatically select this item. */
	select(): void {
		this._handleClick();
	}

	override render() {
		return menuItemTemplate.call(this, this.menuVariant);
	}
}

if (!customElements.get('ndd-menu-item')) {
	customElements.define('ndd-menu-item', NDDMenuItem);
}


// # ndd-menu

const defaultFilterFn = (query: string, item: NDDMenuItem): boolean => {
	const q = query.toLowerCase();
	const textMatch = item.text.toLowerCase().includes(q);
	const valueMatch = item.value !== '' && item.value.toLowerCase().includes(q);
	const aliasesMatch = item.aliases !== '' && item.aliases.split(' ').some(s => s.toLowerCase().includes(q));
	return textMatch || valueMatch || aliasesMatch;
};

/**
 * A floating menu component using the Popover API.
 * Positioned relative to an anchor element using Floating UI.
 *
 * Supports filtering, keyboard navigation, and highlight management.
 * Use ndd-menu-item and ndd-menu-divider as children.
 *
 * Note: Only type="button" items are supported when used inside ndd-combo-box-field.
 * Radio and checkbox types may be used in standalone menus.
 *
 * @attr {string}  anchor         - ID of the anchor element.
 * @attr {string}  placement      - Floating UI placement. Default: 'bottom-start'.
 * @attr {string}  empty-text     - Text shown when all items are hidden or no items exist.
 * @attr {string}  width          - Explicit width. Sets --_menu-width internally.
 * @attr {number}  max-items      - Maximum number of visible items before scrolling.
 *                                  Sets --_menu-max-items internally. Default: 0 (no limit).
 * @attr {object}  translations   - Override one or more translation keys.
 * @attr {Function} filterFn      - Custom filter function (query, item) => boolean.
 *
 * @slot - ndd-menu-item and ndd-menu-divider elements.
 */
export class NDDMenu extends LitElement {
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
	translations: Partial<NDDMenuTranslations> = {};

	/**
	 * Custom filter function. Defaults to case-insensitive substring match
	 * on text, value, and aliases attributes.
	 */
	@property({ attribute: false })
	filterFn: (query: string, item: NDDMenuItem) => boolean = defaultFilterFn;

	@state()
	private _isEmpty = false;

	private _isOpen = false;
	private _closedAt = 0;

	// — i18n ——————————————————————————————————————————————————————————————————

	private _t(key: keyof NDDMenuTranslations): string {
		return this.translations[key] ?? nddMenuTranslations[key];
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
			Array.from(this.querySelectorAll('ndd-menu-item')).forEach(item => {
				(item as NDDMenuItem).menuVariant = this.variant;
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
			(this as HTMLElement).hidePopover();
		} else if (Date.now() - this._closedAt > POPOVER_REOPEN_GUARD_MS) {
			(this as HTMLElement).showPopover();
		}
	};

	private _handleMenuItemMouseenter = (event: MouseEvent): void => {
		const item = (event.target as Element).closest('ndd-menu-item') as NDDMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;
		this._setHighlight(item);
	};

	private _handleMouseleave = (): void => {
		if (this.variant !== 'listbox') this._clearHighlight();
	};

	private _handleMenuItemFocused = (event: Event): void => {
		const item = (event.target as Element).closest('ndd-menu-item') as NDDMenuItem | null;
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
		this.addEventListener('mouseleave', this._handleMouseleave);
		this.addEventListener('menu-item-focused', this._handleMenuItemFocused);
		document.addEventListener('click', this._handleDocumentClick);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('toggle', this._handleToggle);
		this.removeEventListener('keydown', this._handleKeydown);
		this.removeEventListener('mouseenter', this._handleMenuItemMouseenter, true);
		this.removeEventListener('mouseleave', this._handleMouseleave);
		this.removeEventListener('menu-item-focused', this._handleMenuItemFocused);
		document.removeEventListener('click', this._handleDocumentClick);
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _getVisibleItems(): NDDMenuItem[] {
		return Array.from(
			this.querySelectorAll('ndd-menu-item:not([hidden]):not([disabled])')
		) as NDDMenuItem[];
	}

	private _getFocusedIndex(items: NDDMenuItem[]): number {
		return items.findIndex(item => item.hasAttribute('data-focused'));
	}

	private _clearHighlight(): void {
		Array.from(this.querySelectorAll('ndd-menu-item')).forEach(item => {
			item.removeAttribute('highlighted');
		});
	}

	private _setHighlight(target: NDDMenuItem | null): void {
		this._clearHighlight();
		const resolved = target ?? this._getVisibleItems()[0] ?? null;
		resolved?.setAttribute('highlighted', '');
	}

	private _updateEmptyState(): void {
		this._isEmpty = this._getVisibleItems().length === 0;
	}

	private _updateDividerVisibility(): void {
		const children = Array.from(this.children) as Element[];
		children.forEach(el => {
			if (el.tagName.toLowerCase() === 'ndd-menu-divider') {
				el.removeAttribute('hidden');
			}
		});

		const visible = children.filter(el => !el.hasAttribute('hidden'));
		visible.forEach((el, index) => {
			if (el.tagName.toLowerCase() !== 'ndd-menu-divider') return;
			const isFirst = index === 0;
			const isLast = index === visible.length - 1;
			const prevIsDivider = index > 0 && visible[index - 1].tagName.toLowerCase() === 'ndd-menu-divider';
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
		const allItems = Array.from(this.querySelectorAll('ndd-menu-item')) as NDDMenuItem[];
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
		this._setHighlight(null);
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
		items[targetIndex].focus();
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
	public getHighlighted(): NDDMenuItem | null {
		return this.querySelector('ndd-menu-item[highlighted]') as NDDMenuItem | null;
	}

	/** Returns the ID of the currently highlighted item, or empty string if none. */
	public getHighlightedId(): string {
		return this.getHighlighted()?.id ?? '';
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
				items[next].focus();
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				const prev = index === -1 ? items.length - 1 : index > 0 ? index - 1 : items.length - 1;
				items[prev].focus();
				break;
			}
			case 'Home': {
				event.preventDefault();
				items[0].focus();
				break;
			}
			case 'End': {
				event.preventDefault();
				items[items.length - 1].focus();
				break;
			}
			case 'Escape': {
				event.preventDefault();
				(this as HTMLElement).hidePopover();
				const anchorEl = this._getAnchorEl();
				(anchorEl as HTMLElement | null)?.focus();
				break;
			}
		}
	};

	private _handleToggle = async (event: Event): Promise<void> => {
		const toggleEvent = event as ToggleEvent;
		this._isOpen = toggleEvent.newState === 'open';

		if (toggleEvent.newState !== 'open') {
			this._closedAt = Date.now();
			return;
		}

		this._updateDividerVisibility();
		this._clearHighlight();
		this._updateEmptyState();
		Array.from(this.querySelectorAll('ndd-menu-item')).forEach(item => {
			(item as NDDMenuItem).menuVariant = this.variant;
		});

		await this.reposition();

		await this.updateComplete;
		if (this.variant !== 'listbox') {
			const keyboard = isKeyboardMode();
			const items = this._getVisibleItems();
			if (keyboard && items.length > 0) {
				this._setHighlight(items[0]);
				items[0].focus();
			} else {
				const menu = this.shadowRoot?.querySelector<HTMLElement>('.menu');
				menu?.classList.toggle('is-keyboard-focus', keyboard);
				menu?.focus();
			}
		}
	};

	override render() {
		return menuTemplate.call(this, this._isEmpty, this.variant);
	}
}

if (!customElements.get('ndd-menu')) {
	customElements.define('ndd-menu', NDDMenu);
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-menu': NDDMenu;
		'ndd-menu-item': NDDMenuItem;
		'ndd-menu-divider': NDDMenuDivider;
	}
}

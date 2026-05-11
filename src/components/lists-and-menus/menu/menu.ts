import { LitElement } from 'lit';
import { property, state } from 'lit/decorators.js';
import { computePosition, flip, shift, offset, size, autoUpdate } from '@floating-ui/dom';
import { menuStyles, menuItemStyles, menuDividerStyles, menuGroupStyles } from './menu.styles.js';
import { menuTemplate, menuItemTemplate, menuDividerTemplate, menuGroupTemplate } from './menu.template.js';
import { nlddMenuTranslations } from './menu.i18n.js';
import type { NLDDMenuTranslations } from './menu.i18n.js';
import type { QueryMarkMode } from '../../../utilities/render-marked.js';
import '../../lists-and-menus/cells/icon-cell/icon-cell.js';
import '../../lists-and-menus/cells/spacer-cell/spacer-cell.js';
import '../../lists-and-menus/cells/text-cell/text-cell.js';
import '../../content/icon/icon.js';
import '../../status-and-feedback/inline-dialog/inline-dialog.js';
import { isKeyboardMode } from '../../../utilities/input-modality.js';
import { POPOVER_REOPEN_GUARD_MS } from '../../../utilities/popover-guard.js';


// # nldd-menu-divider

export class NLDDMenuDivider extends LitElement {
	static override styles = menuDividerStyles;

	override render() {
		return menuDividerTemplate();
	}
}

if (!customElements.get('nldd-menu-divider')) {
	customElements.define('nldd-menu-divider', NLDDMenuDivider);
}


// # nldd-menu-group

/**
 * A labelled group of menu items inside an nldd-menu. Wraps its slotted
 * items in `role="group"` with `aria-labelledby` pointing to the group's
 * `text`, providing native ARIA group semantics that a flat title element
 * can't deliver.
 *
 * The group renders an automatic divider above itself, except when it's
 * the first child of the menu — so consumers don't need to manage
 * separator placement around groups themselves. Spacing above the title
 * is intentionally larger than below, to bind the title visually to the
 * items it labels.
 *
 * Use the wrapper for grouping with a title; for ungrouped flat menus or
 * a divider without a title, the existing `nldd-menu-item` +
 * `nldd-menu-divider` flat structure keeps working unchanged.
 *
 * @attr {string} text - Group title text shown above the items.
 *
 * @slot - nldd-menu-item children (the items belonging to this group).
 */
export class NLDDMenuGroup extends LitElement {
	static override styles = menuGroupStyles;

	@property({ type: String, reflect: true })
	text = '';

	private static _idCounter = 0;
	readonly _titleId = `nldd-menu-group-title-${NLDDMenuGroup._idCounter++}`;

	override render() {
		return menuGroupTemplate(this);
	}
}

if (!customElements.get('nldd-menu-group')) {
	customElements.define('nldd-menu-group', NLDDMenuGroup);
}


// # nldd-menu-item

/**
 * A single item within an nldd-menu.
 *
 * @attr {string}  text      - Display text. Supports **bold** markdown syntax.
 * @attr {string}  value     - Form value. Falls back to text when not set.
 * @attr {string}  aliases   - Space-separated alternative search terms.
 * @attr {string}  details   - Secondary label shown on the right side.
 * @attr {string}  icon      - Icon name rendered before the text (nldd-icon name).
 * @attr {string}  type      - Item type: 'button' | 'checkbox' | 'radio'. Default: 'button'.
 * @attr {boolean} selected        - Selected state for checkbox and radio types.
 * @attr {boolean} disabled        - Disabled state.
 * @attr {string}  query           - Query substring to bold-highlight in text. Set by menu's filter(); also settable by consumers.
 * @attr {string}  query-mark-mode - 'match' | 'predictive' (default: 'predictive'). See text-cell for details.
 *
 * @fires select - Fired when the item is clicked and not disabled.
 */
export class NLDDMenuItem extends LitElement {
	static override styles = menuItemStyles;

	@property({ type: String, reflect: true })
	text = '';

	@property({ type: String, reflect: true })
	value = '';

	/** Space-separated alternative search terms used by nldd-menu's filter. */
	@property({ type: String, reflect: true })
	aliases = '';

	@property({ type: String, reflect: true })
	details = '';

	/** Icon name rendered before the text (looked up via nldd-icon). */
	@property({ type: String, reflect: true })
	icon = '';

	@property({ type: String, reflect: true })
	type: 'button' | 'checkbox' | 'radio' = 'button';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	query = '';

	@property({ type: String, reflect: true, attribute: 'query-mark-mode' })
	queryMarkMode: QueryMarkMode = 'predictive';

	/** Set by nldd-menu. Not part of the public API. */
	@state()
	menuVariant: 'menu' | 'listbox' = 'menu';

	/** Tracks whether this item's submenu (if any) is currently open. Set by
	 * the parent nldd-menu via the `submenu-open`/`submenu-close` lifecycle. */
	@state()
	_submenuOpen = false;

	private static _idCounter = 0;

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.id) {
			this.id = `nldd-menu-item-${NLDDMenuItem._idCounter++}`;
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

	/** True when this item has an `<nldd-menu>` direct child — that menu is
	 * its submenu. Detected once at firstUpdated; mutating the children later
	 * is not supported in v1. */
	get _submenuEl(): NLDDMenu | null {
		return this.querySelector(':scope > nldd-menu');
	}

	get _hasSubmenu(): boolean {
		return this._submenuEl !== null;
	}

	override firstUpdated(): void {
		// Cache submenu presence in a class for CSS / debugging hooks. Also
		// re-render once if it turns out we have a submenu (chevron + ARIA).
		if (this._hasSubmenu) {
			this.requestUpdate();
		}
	}

	_handleClick(): void {
		if (this.disabled) return;
		// Submenu items don't fire `select` — they open their submenu instead.
		// Item is either an action OR a submenu opener, not both.
		if (this._hasSubmenu) {
			this.dispatchEvent(new CustomEvent('submenu-open', {
				detail: { submenu: this._submenuEl, item: this },
				bubbles: true,
				composed: false,
			}));
			return;
		}
		this.dispatchEvent(new CustomEvent('select', {
			bubbles: true,
			composed: true,
		}));
		(this.closest('nldd-menu') as HTMLElement)?.hidePopover?.();
	}

	/** Programmatically select this item. */
	select(): void {
		this._handleClick();
	}

	override render() {
		return menuItemTemplate.call(this, this.menuVariant);
	}
}

if (!customElements.get('nldd-menu-item')) {
	customElements.define('nldd-menu-item', NLDDMenuItem);
}


// # nldd-menu

const defaultFilterFn = (query: string, item: NLDDMenuItem): boolean => {
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
 * Use nldd-menu-item and nldd-menu-divider as children.
 *
 * Note: Only type="button" items are supported when used inside nldd-combo-box-field.
 * Radio and checkbox types may be used in standalone menus.
 *
 * @attr {string}  anchor               - ID of the anchor element.
 * @attr {string}  placement            - Floating UI placement. Default: 'bottom-start'.
 * @attr {string}  empty-text           - Text of the default empty-state dialog. Falls back
 *                                        to Dutch i18n "Geen opties beschikbaar".
 * @attr {string}  empty-supporting-text - Supporting text of the default empty-state dialog.
 * @attr {string}  width                - Explicit width. Sets --_menu-width internally.
 * @attr {number}  max-items            - Maximum number of visible items before scrolling.
 *                                        Sets --_menu-max-items internally. Default: 0 (no limit).
 * @attr {object}  translations         - Override one or more translation keys.
 * @attr {Function} filterFn            - Custom filter function (query, item) => boolean.
 *
 * @slot - nldd-menu-item and nldd-menu-divider elements.
 * @slot empty - Shown when no items are visible. Defaults to `nldd-inline-dialog`
 *               driven by `empty-text` / `empty-supporting-text`. Slot content
 *               overrides the default dialog entirely.
 */
export class NLDDMenu extends LitElement {
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

	@property({ type: String, attribute: 'empty-supporting-text' })
	emptySupportingText = '';


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
	translations: Partial<NLDDMenuTranslations> = {};

	/**
	 * Custom filter function. Defaults to case-insensitive substring match
	 * on text, value, and aliases attributes.
	 */
	@property({ attribute: false })
	filterFn: (query: string, item: NLDDMenuItem) => boolean = defaultFilterFn;

	@state()
	private _isEmpty = false;

	/** Currently open child submenu (a direct descendant nldd-menu opened
	 * by one of this menu's items). null when no submenu is open. */
	private _activeSubmenu: NLDDMenu | null = null;
	private _activeSubmenuOpener: NLDDMenuItem | null = null;

	/** When this menu is itself a submenu, points to the parent menu that
	 * opened it. Set by the parent's _handleSubmenuOpen. null on the root.
	 * @internal */
	_parentMenu: NLDDMenu | null = null;

	/** The menu-item that triggered this submenu — used to label the back
	 * button in drill-in mode.
	 * @internal */
	@state()
	_parentItem: NLDDMenuItem | null = null;

	private _isOpen = false;
	private _closedAt = 0;
	private _cleanupAutoUpdate: (() => void) | null = null;

	// — i18n ——————————————————————————————————————————————————————————————————

	private _t(key: keyof NLDDMenuTranslations): string {
		return this.translations[key] ?? nlddMenuTranslations[key];
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
			Array.from(this.querySelectorAll('nldd-menu-item')).forEach(item => {
				(item as NLDDMenuItem).menuVariant = this.variant;
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
		const item = (event.target as Element).closest('nldd-menu-item') as NLDDMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;
		this._setHighlight(item);
	};

	private _handleMouseleave = (): void => {
		if (this.variant !== 'listbox') this._clearHighlight();
	};

	private _handleMenuItemFocused = (event: Event): void => {
		const item = (event.target as Element).closest('nldd-menu-item') as NLDDMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;
		this._setHighlight(item);
	};

	/**
	 * Drill-in mode is the touch-friendly rendering: a submenu replaces its
	 * parent's view by anchoring to the root anchor (so visually it stacks
	 * over the parent) and gets a back-button header. Otherwise (cascade)
	 * the submenu opens beside its parent item.
	 *
	 * Detection is based on pointer type and viewport width — touch devices
	 * and narrow viewports drill in, everything else cascades. No consumer
	 * override; the choice is environment-driven.
	 */
	get _drillInMode(): boolean {
		return matchMedia('(pointer: coarse), (max-width: 640px)').matches;
	}

	/** Walks the parent-menu chain up to the root (the menu that wasn't
	 * opened by another menu — has no _parentMenu). */
	get _rootMenu(): NLDDMenu {
		let m: NLDDMenu = this;
		while (m._parentMenu) m = m._parentMenu;
		return m;
	}

	/** True when this menu is itself a submenu (was opened by another menu's
	 * item). The root menu returns false. */
	get _isSubmenu(): boolean {
		return this._parentMenu !== null;
	}

	/**
	 * Open a submenu in response to one of this menu's items dispatching
	 * `submenu-open`. Branches on drill-in vs cascade mode for anchor +
	 * placement, but the lifecycle (popover.show, listen for close, clear
	 * state on hide) is the same for both modes.
	 */
	private _handleSubmenuOpen = (event: CustomEvent<{ submenu: NLDDMenu, item: NLDDMenuItem }>): void => {
		// Only handle events from items that are direct children of this menu.
		// Items inside a sub-submenu fire their own submenu-open which bubbles
		// here too — we let that one bubble past, our descendant menu handles it.
		const item = event.detail.item;
		if (item.closest('nldd-menu') !== this) return;
		event.stopPropagation();

		const submenu = event.detail.submenu;
		// Close any other submenu that's already open in this menu before
		// opening a new one — only one peer submenu visible at a time.
		if (this._activeSubmenu && this._activeSubmenu !== submenu) {
			(this._activeSubmenu as HTMLElement).hidePopover?.();
		}

		submenu._parentMenu = this;
		submenu._parentItem = item;

		if (this._drillInMode) {
			// Drill-in: anchor to the root's anchor so all submenus open at the
			// same screen position — visually stacks. Inherit root placement
			// for consistent direction. Back button rendered in template.
			const root = this._rootMenu;
			submenu.anchorElement = root._getAnchorEl();
			submenu.placement = root.placement;
		} else {
			// Cascade: anchor to the parent item, open beside it.
			submenu.anchorElement = item;
			submenu.placement = 'right-start';
		}

		this._activeSubmenu = submenu;
		this._activeSubmenuOpener = item;
		item._submenuOpen = true;

		// Listen once for the submenu's close so we can clear state and ARIA.
		const onToggle = (e: Event) => {
			const tg = e as ToggleEvent;
			if (tg.newState !== 'closed') return;
			submenu.removeEventListener('toggle', onToggle);
			if (this._activeSubmenu === submenu) {
				this._activeSubmenu = null;
				this._activeSubmenuOpener = null;
			}
			submenu._parentMenu = null;
			submenu._parentItem = null;
			item._submenuOpen = false;
		};
		submenu.addEventListener('toggle', onToggle);

		(submenu as HTMLElement).showPopover?.();
	};

	/** Close this submenu when the back button is clicked, returning to the
	 * parent view (which is still open as a popover behind this one in
	 * drill-in mode).
	 * @internal */
	_handleBack = (): void => {
		(this as HTMLElement).hidePopover?.();
	};

	/** Last cached drill-in mode value, so we only act when it actually
	 * changes across a resize event. */
	private _lastDrillInMode: boolean | null = null;

	/** Close any open submenu when the cascade ↔ drill-in threshold is
	 * crossed during a resize. Switching the rendering of an already-open
	 * submenu mid-flight (anchor + placement + back button) is more
	 * disorienting than a clean reset to the root view. */
	private _handleViewportResize = (): void => {
		const current = this._drillInMode;
		if (this._lastDrillInMode === null) {
			this._lastDrillInMode = current;
			return;
		}
		if (this._lastDrillInMode === current) return;
		this._lastDrillInMode = current;
		if (this._activeSubmenu) {
			(this._activeSubmenu as HTMLElement).hidePopover?.();
		}
	};

	/**
	 * Close this menu when a `select` event bubbles up — selecting an item
	 * anywhere in the menu (or any descendant submenu) closes the entire
	 * popover chain so the action feels final. The select event is dispatched
	 * with `composed: true` so it crosses every ancestor menu in the chain.
	 */
	private _handleSelectChainClose = (): void => {
		(this as HTMLElement).hidePopover?.();
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
		this.addEventListener('submenu-open', this._handleSubmenuOpen as EventListener);
		this.addEventListener('select', this._handleSelectChainClose);
		document.addEventListener('click', this._handleDocumentClick);
		// Close any open submenu when the viewport crosses the cascade ↔ drill-in
		// threshold mid-session — re-rendering between modes mid-flight would
		// require recomputing anchors and is more disorienting than a clean reset.
		window.addEventListener('resize', this._handleViewportResize);
	}

	override firstUpdated(): void {
		this._updateEmptyState();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('toggle', this._handleToggle);
		this.removeEventListener('keydown', this._handleKeydown);
		this.removeEventListener('mouseenter', this._handleMenuItemMouseenter, true);
		this.removeEventListener('mouseleave', this._handleMouseleave);
		this.removeEventListener('menu-item-focused', this._handleMenuItemFocused);
		this.removeEventListener('submenu-open', this._handleSubmenuOpen as EventListener);
		this.removeEventListener('select', this._handleSelectChainClose);
		document.removeEventListener('click', this._handleDocumentClick);
		window.removeEventListener('resize', this._handleViewportResize);
		this._cleanupAutoUpdate?.();
		this._cleanupAutoUpdate = null;
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _getVisibleItems(): NLDDMenuItem[] {
		return Array.from(
			this.querySelectorAll('nldd-menu-item:not([hidden]):not([disabled])')
		) as NLDDMenuItem[];
	}

	private _getFocusedIndex(items: NLDDMenuItem[]): number {
		return items.findIndex(item => item.hasAttribute('data-focused'));
	}

	private _clearHighlight(): void {
		Array.from(this.querySelectorAll('nldd-menu-item')).forEach(item => {
			item.removeAttribute('highlighted');
		});
	}

	private _setHighlight(target: NLDDMenuItem | null): void {
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
			if (el.tagName.toLowerCase() === 'nldd-menu-divider') {
				el.removeAttribute('hidden');
			}
		});

		const visible = children.filter(el => !el.hasAttribute('hidden'));
		visible.forEach((el, index) => {
			if (el.tagName.toLowerCase() !== 'nldd-menu-divider') return;
			const isFirst = index === 0;
			const isLast = index === visible.length - 1;
			const prevIsDivider = index > 0 && visible[index - 1].tagName.toLowerCase() === 'nldd-menu-divider';
			// nldd-menu-group renders its own auto-divider above; suppress an
			// explicit divider that would render right next to it.
			const nextIsGroup = index < visible.length - 1 && visible[index + 1].tagName.toLowerCase() === 'nldd-menu-group';
			if (isFirst || isLast || prevIsDivider || nextIsGroup) {
				el.setAttribute('hidden', '');
			}
		});
	}

	// — Public API ————————————————————————————————————————————————————————————

	/**
	 * Filter items based on a query string.
	 *
	 * Matching items are kept visible. Non-matching items are hidden. Matching
	 * items receive `query=<query>` so their text-cell bolds the non-typed
	 * remainder (predictive completion — the ARIA APG pattern for combobox).
	 *
	 * When the query is empty, all items are shown and `query` is cleared.
	 */
	public filter(query: string): void {
		const allItems = Array.from(this.querySelectorAll('nldd-menu-item')) as NLDDMenuItem[];
		allItems.forEach(item => {
			const matches = !query || this.filterFn(query, item);
			item.toggleAttribute('hidden', !matches);
			item.query = (matches && query) ? query : '';
		});
		this._updateGroupVisibility();
		this._setHighlight(null);
		this._updateEmptyState();
		this._updateDividerVisibility();
		if (this._isOpen) this.reposition();
	}

	/**
	 * Hide each nldd-menu-group whose items are all filtered out — a labelled
	 * heading above an empty section reads as broken. Runs after filter() has
	 * updated individual item visibility.
	 */
	private _updateGroupVisibility(): void {
		const groups = this.querySelectorAll('nldd-menu-group');
		groups.forEach(group => {
			const visibleItems = group.querySelectorAll('nldd-menu-item:not([hidden])');
			group.toggleAttribute('hidden', visibleItems.length === 0);
		});
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
	public getHighlighted(): NLDDMenuItem | null {
		return this.querySelector('nldd-menu-item[highlighted]') as NLDDMenuItem | null;
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
			this._cleanupAutoUpdate?.();
			this._cleanupAutoUpdate = null;
			return;
		}

		this._updateDividerVisibility();
		this._clearHighlight();
		this._updateEmptyState();
		Array.from(this.querySelectorAll('nldd-menu-item')).forEach(item => {
			(item as NLDDMenuItem).menuVariant = this.variant;
		});

		await this.reposition();
		const anchorEl = this._getAnchorEl();
		if (anchorEl) {
			this._cleanupAutoUpdate = autoUpdate(anchorEl, this, () => this.reposition());
		}

		await this.updateComplete;
		if (this.variant !== 'listbox') {
			const keyboard = isKeyboardMode();
			const items = this._getVisibleItems();
			if (keyboard && items.length > 0) {
				this._setHighlight(items[0]);
				items[0].focus();
			} else {
				const menu = this.shadowRoot?.querySelector<HTMLElement>('.menu');
				menu?.classList.toggle('is-pointer-focus', !keyboard);
				menu?.focus();
			}
		}
	};

	override render() {
		return menuTemplate.call(this, this._isEmpty, this.variant);
	}
}

if (!customElements.get('nldd-menu')) {
	customElements.define('nldd-menu', NLDDMenu);
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-menu': NLDDMenu;
		'nldd-menu-item': NLDDMenuItem;
		'nldd-menu-divider': NLDDMenuDivider;
		'nldd-menu-group': NLDDMenuGroup;
	}
}

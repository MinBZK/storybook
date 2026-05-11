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
		this.addEventListener('focusin', (e) => {
			// Only react when focus actually lands on our own shadow content
			// (the .menu__item button). focusin is composed and bubbles, so it
			// also fires here when focus moves into a slotted descendant —
			// notably when a child submenu's .menu element gets focused on
			// open. Without this guard the parent's _handleMenuItemFocused
			// re-highlights the opener after we just cleared it.
			const realTarget = e.composedPath()[0] as Element | undefined;
			if (!realTarget || !this.shadowRoot?.contains(realTarget)) return;
			this.setAttribute('data-focused', '');
			this.dispatchEvent(new CustomEvent('menu-item-focused', {
				bubbles: true,
				composed: true,
			}));
		});
		this.addEventListener('focusout', (e) => {
			// Mirror the focusin guard so a slotted descendant losing focus
			// doesn't strip data-focused from the opener while it's still
			// keyboard-focused itself.
			const realTarget = e.composedPath()[0] as Element | undefined;
			if (!realTarget || !this.shadowRoot?.contains(realTarget)) return;
			this.removeAttribute('data-focused');
		});
	}

	override focus(options?: FocusOptions): void {
		const focusable = this.shadowRoot?.querySelector<HTMLElement>('button, a');
		focusable?.focus(options);
	}

	/** Cached reference to the direct child `<nldd-menu>` (this item's
	 * submenu). Resolved once at firstUpdated; mutating the children after
	 * mount is not supported in v1. */
	private _cachedSubmenuEl: NLDDMenu | null = null;

	get _submenuEl(): NLDDMenu | null {
		return this._cachedSubmenuEl;
	}

	get _hasSubmenu(): boolean {
		return this._cachedSubmenuEl !== null;
	}

	override firstUpdated(): void {
		// Resolve submenu once and cache. Also trigger a single re-render so
		// the chevron + ARIA attrs reflect the now-known submenu state.
		this._cachedSubmenuEl = this.querySelector(':scope > nldd-menu');
		if (this._cachedSubmenuEl !== null) {
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

	/** Debug helper: when true, renders a translucent SVG overlay showing the
	 * safe triangle's current shape. Useful for debugging — off in production. */
	@property({ type: Boolean, reflect: true, attribute: 'debug-safe-triangle' })
	debugSafeTriangle = false;

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

	// — Safe triangle (cascade only) ——————————————————————————————————————
	//
	// While a cascade submenu is open, a global mousemove listener tracks
	// the cursor against a "safe triangle" (Mayank/ishadeed pattern). The
	// triangle's apex is captured once on the first mousemove after submenu
	// open; the base is the submenu's two near corners (top + bottom of the
	// edge facing the parent — left edge if submenu is right of cursor,
	// right edge if floating-ui flipped it to the other side). The wedge
	// stays fixed until the cursor enters the submenu, so the user has a
	// predictable, stable area to traverse without losing the submenu.
	// While the cursor is inside the triangle, peer items don't activate
	// and the linger-close timer is held off.

	private _hoverOpenTimer: number | null = null;
	private _hoverCloseTimer: number | null = null;
	private _safeTriangleListener: ((e: MouseEvent) => void) | null = null;
	private _safeTriangleStallTimer: number | null = null;
	private _lastCursorPos: { x: number, y: number } | null = null;
	private _safeTriangleApex: { x: number, y: number } | null = null;
	private _movingTowardSubmenu = false;
	/** Wait this long after cursor stops being on a path toward the submenu
	 * before closing. Smooths over brief cursor stalls and accidental nudges. */
	private static readonly _SUBMENU_LINGER_CLOSE_MS = 300;
	/** When the cursor sits motionless inside the safe triangle for this
	 * long, dismiss the triangle and let whatever item is under the cursor
	 * become interactive. Without this, a paused cursor would stay
	 * "protected" indefinitely and the user couldn't peer-hover. */
	private static readonly _SAFE_TRIANGLE_STALL_DISMISS_MS = 750;

	private _handleMenuItemMouseenter = (event: MouseEvent): void => {
		const item = (event.target as Element).closest('nldd-menu-item') as NLDDMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;

		// The listener is registered with capture:true, so it fires for events
		// targeted at items in descendant submenus too. Bail out for those —
		// the descendant menu has its own listener that will handle them.
		if (item.closest('nldd-menu') !== this) return;

		// Hover-triangle guard: while the user is on a path toward the active
		// submenu, peer items don't get highlighted and don't schedule
		// hover-opens. Without this, the highlight flickers across every item
		// the cursor brushes past on its diagonal route to the submenu.
		if (this._movingTowardSubmenu && item !== this._activeSubmenuOpener) return;

		this._setHighlight(item);

		// Cursor is on a real item now (not in transit) — cancel any pending
		// linger-close from a previous sweep through.
		this._cancelHoverClose();

		if (this._drillInMode) return; // Touch / narrow viewport: no hover-open.

		// Settled on a peer item (not the active submenu's opener) — close the
		// active submenu immediately. If this peer itself has a submenu, the
		// hover-open below will then schedule its own. We don't wait for the
		// linger-close: the user has already committed to a different item.
		if (this._activeSubmenu && item !== this._activeSubmenuOpener) {
			(this._activeSubmenu as HTMLElement).hidePopover?.();
		}

		// Always cancel any pending hover-open from a previous item — moving
		// the cursor onto a peer (with or without submenu) means the previous
		// item's submenu should not open after its delay. Then schedule a new
		// one only when the new item itself has a submenu.
		this._cancelHoverOpen();
		if (item._hasSubmenu && this._activeSubmenuOpener !== item) {
			this._hoverOpenTimer = window.setTimeout(() => {
				this._hoverOpenTimer = null;
				item._handleClick();
			}, 150);
		}
	};

	private _handleMouseleave = (): void => {
		if (this.variant !== 'listbox') this._clearHighlight();
		this._cancelHoverOpen();
		// The hover-guard takes over close behaviour while the cursor is
		// outside both the parent menu and the active submenu.
	};

	/** Start the global mouse tracker that powers the safe triangle. Called
	 * by _handleSubmenuOpen when a submenu opens in cascade mode. */
	private _startSafeTriangle(submenu: NLDDMenu): void {
		this._stopSafeTriangle();
		this._lastCursorPos = null;
		this._safeTriangleApex = null;
		this._movingTowardSubmenu = false;

		this._safeTriangleListener = (e: MouseEvent) => {
			const p = { x: e.clientX, y: e.clientY };
			const r = submenu.getBoundingClientRect();
			// "In submenu" means anywhere in the submenu OR any nested submenu
			// it has opened in turn. Without the recursive walk, a deep cursor
			// in (e.g.) the third level reads as "outside the second" and the
			// root's guard schedules a linger-close that cascades up the chain.
			const inSubmenu = NLDDMenu._isPointInMenuTree(p, submenu);

			if (inSubmenu) {
				// Arrived. Triangle is no longer needed — drop the apex so a
				// later excursion back outside doesn't reuse a stale wedge.
				// Also drop the opener's "in transit" highlight; the focused
				// item now lives inside the submenu.
				this._movingTowardSubmenu = false;
				this._cancelHoverClose();
				this._lastCursorPos = p;
				this._safeTriangleApex = null;
				this._activeSubmenuOpener?.removeAttribute('highlighted');
				this._removeSafeTriangleOverlay();
				return;
			}

			// Safe triangle (Mayank/ishadeed pattern): apex pinned at the exit
			// point on the opener (top or bottom edge) once the cursor crosses
			// out of the opener; stays fixed until the cursor enters the
			// submenu OR returns to the opener (then re-pins on the next exit).
			const opener = this._activeSubmenuOpener;
			const openerRect = opener?.getBoundingClientRect();
			const cursorOnOpener = openerRect
				&& p.x >= openerRect.left && p.x <= openerRect.right
				&& p.y >= openerRect.top && p.y <= openerRect.bottom;
			// Whether the previous mousemove sample was inside the opener.
			// Used to gate apex pinning so it only fires on a true exit from
			// the opener, not on cursor motion that happens to be below the
			// opener's bottom edge but came from elsewhere (e.g. exiting the
			// submenu on its far side).
			const lastOnOpener = openerRect && this._lastCursorPos
				&& this._lastCursorPos.x >= openerRect.left && this._lastCursorPos.x <= openerRect.right
				&& this._lastCursorPos.y >= openerRect.top && this._lastCursorPos.y <= openerRect.bottom;

			// If the cursor came back to the opener while an apex was pinned,
			// drop it so the next exit can re-pin from the new exit point.
			// Leave the overlay drawn — it gets overwritten on the next pin
			// rather than flashed in/out on every back-and-forth.
			if (this._safeTriangleApex !== null && cursorOnOpener) {
				this._safeTriangleApex = null;
			}

			const wasMoving = this._movingTowardSubmenu;
			if (this._safeTriangleApex === null) {
				if (cursorOnOpener) {
					// On opener — give peers benefit of doubt (don't activate
					// brief pass-throughs) and wait for an exit direction.
					// Render a live preview wedge so the user can see the safe
					// area following the cursor before commitment; freezes on
					// bottom-exit.
					this._movingTowardSubmenu = true;
					this._lastCursorPos = p;
					// Set the opener highlight here too so it's already on
					// the moment the cursor is on the opener — without this,
					// the highlight only appears at exit, causing a visible
					// "pop" on the first transit through the safe area.
					if (this._activeSubmenuOpener
						&& !this._activeSubmenuOpener.hasAttribute('highlighted')) {
						this._setHighlight(this._activeSubmenuOpener);
					}
					if (this.debugSafeTriangle && openerRect) {
						// Live preview follows the cursor — apex band of ±1px
						// around the actual pointer position. On exit it
						// freezes at the matching opener edge.
						const previewTop = { x: p.x, y: p.y - 1 };
						const previewBottom = { x: p.x, y: p.y + 1 };
						const nearX = p.x < r.left ? r.left : r.right;
						this._renderSafeTriangleOverlay([
							previewTop,
							{ x: nearX, y: r.top },
							{ x: nearX, y: r.bottom },
							previewBottom,
						]);
					}
					return;
				}
				if (openerRect && lastOnOpener && (p.y > openerRect.bottom || p.y < openerRect.top)) {
					// Crossed above or below the opener — pin apex on the
					// matching edge at the cursor's x. Requires the previous
					// sample to have been inside the opener so this only
					// fires on a real exit, not on cursor motion that
					// happens past the edge for unrelated reasons (e.g.
					// exiting the submenu on its far side).
					const apexX = Math.max(openerRect.left, Math.min(openerRect.right, p.x));
					const apexY = p.y > openerRect.bottom ? openerRect.bottom : openerRect.top;
					this._safeTriangleApex = { x: apexX, y: apexY };
					this._movingTowardSubmenu = true;
				} else {
					// Exited sideways (or no `lastOnOpener` history) — no
					// protection. Drop the flag and synthesize mouseenter on
					// whatever's under the cursor: the natural mouseenter
					// already fired (during on-opener phase with flag=true)
					// and bailed, so without this the peer would stay
					// non-interactive until the cursor leaves and re-enters.
					this._movingTowardSubmenu = false;
					this._lastCursorPos = p;
					if (wasMoving) {
						const el = document.elementFromPoint(p.x, p.y);
						if (el) {
							this._handleMenuItemMouseenter({ target: el } as unknown as MouseEvent);
						}
					}
					return;
				}
			} else {
				// Pick the submenu edge facing the cursor: left edge when
				// submenu is to the right of the cursor (default right-start),
				// right edge when floating-ui flipped it to the left side.
				// Without this, the wedge would point away from the submenu
				// after a flip and the protection would be useless.
				const nearX = p.x < r.left ? r.left : r.right;
				const apex = this._safeTriangleApex;
				const apexTop = { x: apex.x, y: apex.y - 1 };
				const apexBottom = { x: apex.x, y: apex.y + 1 };
				const tl = { x: nearX, y: r.top };
				const bl = { x: nearX, y: r.bottom };
				// 4-point wedge: apex band of ±1px around the exit point for
				// jitter tolerance. Point order (clockwise): apexTop → tl → bl → apexBottom.
				this._movingTowardSubmenu = this._pointInPolygon(p, [apexTop, tl, bl, apexBottom]);
				if (this.debugSafeTriangle) {
					this._renderSafeTriangleOverlay([apexTop, tl, bl, apexBottom]);
				}
			}
			this._lastCursorPos = p;

			// While the cursor is travelling through the safe triangle, keep
			// the opener visually highlighted. Use _setHighlight so any peer
			// that briefly got highlighted (e.g. via the synthetic mouseenter
			// when the cursor crossed outside the polygon) is cleared — a
			// direct setAttribute would leave both items highlighted and
			// flicker between them on rapid back-and-forth. Skip the call
			// when the opener already has the attribute to avoid DOM churn
			// while the cursor stays inside the safe area.
			if (this._activeSubmenuOpener && this._movingTowardSubmenu
				&& !this._activeSubmenuOpener.hasAttribute('highlighted')) {
				this._setHighlight(this._activeSubmenuOpener);
			}

			// Direction-reversal recovery: when the flag flips true → false,
			// the cursor may already be sitting on a peer item whose natural
			// mouseenter fired (and was bailed) earlier. mouseenter won't
			// re-fire until the cursor leaves and re-enters that element, so
			// without this retro-process the item stays non-interactive even
			// though the user clearly wants it.
			if (wasMoving && !this._movingTowardSubmenu) {
				const el = document.elementFromPoint(p.x, p.y);
				if (el) {
					this._handleMenuItemMouseenter({ target: el } as unknown as MouseEvent);
				}
			}

			// Stall-dismissal: if the cursor sits motionless inside the safe
			// triangle long enough, drop the protection so the item under the
			// cursor (typically the gap area or a peer beneath) can become
			// interactive without the user nudging.
			if (this._safeTriangleStallTimer !== null) {
				clearTimeout(this._safeTriangleStallTimer);
				this._safeTriangleStallTimer = null;
			}
			if (this._movingTowardSubmenu) {
				this._safeTriangleStallTimer = window.setTimeout(() => {
					this._safeTriangleStallTimer = null;
					this._movingTowardSubmenu = false;
					this._safeTriangleApex = null;
					if (this._lastCursorPos) {
						const el = document.elementFromPoint(this._lastCursorPos.x, this._lastCursorPos.y);
						if (el) {
							this._handleMenuItemMouseenter({ target: el } as unknown as MouseEvent);
						}
					}
				}, NLDDMenu._SAFE_TRIANGLE_STALL_DISMISS_MS);
			}

			if (this._movingTowardSubmenu) {
				// Path-toward-submenu — keep things stable.
				this._cancelHoverClose();
				return;
			}

			// Cursor is somewhere outside the safe path. If it's inside the
			// parent menu, the existing peer-hover logic in mouseenter will
			// schedule a peer's hover-open. If it's outside both, schedule a
			// linger-close. Either way the close timer fires only after a
			// brief pause so jitter doesn't trigger it.
			const rootRect = (this as HTMLElement).getBoundingClientRect();
			const inRoot = p.x >= rootRect.left && p.x <= rootRect.right
				&& p.y >= rootRect.top && p.y <= rootRect.bottom;
			if (!inRoot && this._hoverCloseTimer === null) {
				this._hoverCloseTimer = window.setTimeout(() => {
					this._hoverCloseTimer = null;
					if (this._activeSubmenu === submenu) {
						(submenu as HTMLElement).hidePopover?.();
					}
				}, NLDDMenu._SUBMENU_LINGER_CLOSE_MS);
			}
		};

		window.addEventListener('mousemove', this._safeTriangleListener);
	}

	private _stopSafeTriangle(): void {
		if (this._safeTriangleListener !== null) {
			window.removeEventListener('mousemove', this._safeTriangleListener);
			this._safeTriangleListener = null;
		}
		if (this._safeTriangleStallTimer !== null) {
			clearTimeout(this._safeTriangleStallTimer);
			this._safeTriangleStallTimer = null;
		}
		this._lastCursorPos = null;
		this._safeTriangleApex = null;
		this._movingTowardSubmenu = false;
		this._removeSafeTriangleOverlay();
	}

	// — Debug overlay ————————————————————————————————————————————————————

	private _safeTriangleOverlay: HTMLDivElement | null = null;

	private _renderSafeTriangleOverlay(vertices: Array<{ x: number, y: number }>): void {
		const NS = 'http://www.w3.org/2000/svg';
		if (this._safeTriangleOverlay === null) {
			const wrapper = document.createElement('div');
			wrapper.setAttribute('popover', 'manual');
			wrapper.setAttribute('aria-hidden', 'true');
			wrapper.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;border:0;padding:0;margin:0;background:transparent;overflow:visible;';
			const svg = document.createElementNS(NS, 'svg');
			svg.setAttribute('width', '100%');
			svg.setAttribute('height', '100%');
			const polygon = document.createElementNS(NS, 'polygon');
			polygon.setAttribute('fill', 'rgba(255, 0, 128, 0.15)');
			polygon.setAttribute('stroke', 'rgba(255, 0, 128, 0.85)');
			polygon.setAttribute('stroke-width', '1');
			svg.appendChild(polygon);
			wrapper.appendChild(svg);
			document.body.appendChild(wrapper);
			wrapper.showPopover();
			this._safeTriangleOverlay = wrapper;
		}
		const polygon = this._safeTriangleOverlay.querySelector('polygon')!;
		polygon.setAttribute('points', vertices.map(v => `${v.x},${v.y}`).join(' '));
	}

	private _removeSafeTriangleOverlay(): void {
		this._safeTriangleOverlay?.hidePopover?.();
		this._safeTriangleOverlay?.remove();
		this._safeTriangleOverlay = null;
	}

	private _cancelHoverOpen(): void {
		if (this._hoverOpenTimer !== null) {
			clearTimeout(this._hoverOpenTimer);
			this._hoverOpenTimer = null;
		}
	}

	private _cancelHoverClose(): void {
		if (this._hoverCloseTimer !== null) {
			clearTimeout(this._hoverCloseTimer);
			this._hoverCloseTimer = null;
		}
	}

	/** Recursively checks whether a point sits inside the given menu OR any of
	 * its descendant submenus. Used by the hover guard so a cursor deep inside
	 * a nested submenu still reads as "in the safe area" for ancestor menus —
	 * without this, an ancestor's linger-close fires and cascades the whole
	 * chain shut. */
	private static _isPointInMenuTree(p: { x: number, y: number }, menu: NLDDMenu): boolean {
		const r = menu.getBoundingClientRect();
		if (p.x >= r.left && p.x <= r.right && p.y >= r.top && p.y <= r.bottom) return true;
		if (menu._activeSubmenu) return NLDDMenu._isPointInMenuTree(p, menu._activeSubmenu);
		return false;
	}

	/** Convex point-in-polygon test via consistent edge-cross-product sign.
	 * Vertices must be ordered (clockwise or counter-clockwise). */
	private _pointInPolygon(p: { x: number, y: number }, vertices: Array<{ x: number, y: number }>): boolean {
		let hasNeg = false;
		let hasPos = false;
		for (let i = 0; i < vertices.length; i++) {
			const a = vertices[i];
			const b = vertices[(i + 1) % vertices.length];
			const cross = (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y);
			if (cross < 0) hasNeg = true;
			if (cross > 0) hasPos = true;
			if (hasNeg && hasPos) return false;
		}
		return true;
	}

	private _handleMenuItemFocused = (event: Event): void => {
		const item = (event.target as Element).closest('nldd-menu-item') as NLDDMenuItem | null;
		if (!item || item.disabled || item.hasAttribute('hidden')) return;
		// Same caveat as _handleMenuItemMouseenter: this listener catches
		// focused events that bubble up from descendant submenus too. Skip
		// those so we don't highlight items that aren't ours.
		if (item.closest('nldd-menu') !== this) return;
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
	 *
	 * Cached MediaQueryList shared across instances — `matchMedia()` returns
	 * a live object and re-evaluating it for every mouseenter/submenu-open
	 * is wasteful. Instances also subscribe to `change` so resize events
	 * naturally route through `_handleViewportResize`.
	 */
	private static _drillInModeQuery: MediaQueryList | null = null;
	private static _getDrillInModeQuery(): MediaQueryList {
		if (NLDDMenu._drillInModeQuery === null) {
			NLDDMenu._drillInModeQuery = matchMedia('(pointer: coarse), (max-width: 640px)');
		}
		return NLDDMenu._drillInModeQuery;
	}

	get _drillInMode(): boolean {
		return NLDDMenu._getDrillInModeQuery().matches;
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
		// Clear [highlighted] on the opener — the "logically current" item is
		// now in the submenu, not on the opener. The opener still shows visibly
		// active via .menu__item[aria-expanded="true"] (lighter neutral); CSS
		// :hover upgrades it to accent if the cursor returns to it.
		item.removeAttribute('highlighted');

		// Listen once for the submenu's close so we can clear state, ARIA and
		// any leftover safe-triangle plumbing from the cascade open path.
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
			// Drop any safe-triangle "in transit" highlight on the opener —
			// without this, an opener whose submenu was closed via stall-
			// dismissal or programmatic hidePopover keeps the bold accent
			// even though the close should also drop the visual signal.
			item.removeAttribute('highlighted');
			this._cancelHoverClose();
			this._stopSafeTriangle();
			// Counterpart to `submenu-open` — consumers tracking submenu state
			// via declarative event listeners (rather than reaching into our
			// internals) get a clean close signal here.
			this.dispatchEvent(new CustomEvent('submenu-close', {
				detail: { submenu, item },
				bubbles: true,
				composed: false,
			}));
		};
		submenu.addEventListener('toggle', onToggle);

		(submenu as HTMLElement).showPopover?.();

		// Start the hover triangle tracker for cascade-mode submenus only.
		// Drill-in mode replaces the parent view, so there's no "moving toward"
		// path between two visible menus to protect.
		if (!this._drillInMode) {
			// Wait one frame so the submenu's getBoundingClientRect reflects its
			// final position (computePosition runs in the toggle handler).
			requestAnimationFrame(() => {
				if (this._activeSubmenu === submenu) {
					this._startSafeTriangle(submenu);
				}
			});
		}
	};

	/** Close this submenu when the back button is clicked, returning to the
	 * parent view (which is still open as a popover behind this one in
	 * drill-in mode).
	 * @internal */
	_handleBack = (): void => {
		(this as HTMLElement).hidePopover?.();
	};

	/** Cursor moved onto the drill-in back button — clear any item highlight
	 * so we don't show two "active" elements at once (back button + first
	 * item that was auto-highlighted on open).
	 * @internal */
	_handleBackMouseenter = (): void => {
		this._clearHighlight();
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

	private static _menuIdCounter = 0;

	override connectedCallback(): void {
		super.connectedCallback();
		if (!this.id) {
			// Auto-id so submenu openers can reference us via aria-controls.
			this.id = `nldd-menu-${NLDDMenu._menuIdCounter++}`;
		}
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
		this._cancelHoverOpen();
		this._cancelHoverClose();
		this._stopSafeTriangle();
		if (this._typeaheadTimer !== null) {
			clearTimeout(this._typeaheadTimer);
			this._typeaheadTimer = null;
		}
		this._cleanupAutoUpdate?.();
		this._cleanupAutoUpdate = null;
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _getVisibleItems(): NLDDMenuItem[] {
		// Light-DOM querySelectorAll returns ALL menu-item descendants — items
		// inside nested submenus included. Filter to items that belong directly
		// to this menu (closest enclosing nldd-menu === this), so navigation
		// and highlight management stay scoped to one level at a time.
		return Array.from(
			this.querySelectorAll('nldd-menu-item:not([hidden]):not([disabled])')
		).filter(item => item.closest('nldd-menu') === this) as NLDDMenuItem[];
	}

	private _getFocusedIndex(items: NLDDMenuItem[]): number {
		return items.findIndex(item => item.hasAttribute('data-focused'));
	}

	private _clearHighlight(): void {
		// Same scope rule as _getVisibleItems — only clear highlights on items
		// that belong directly to this menu. Light-DOM querySelectorAll would
		// otherwise also clear items inside nested submenus, silently
		// corrupting their highlight state.
		Array.from(this.querySelectorAll('nldd-menu-item'))
			.filter(item => item.closest('nldd-menu') === this)
			.forEach(item => item.removeAttribute('highlighted'));
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

		// Cascade-mode submenus: shift up by the menu's own padding so the
		// first submenu item lines up vertically with the parent opener item.
		// Without this, the submenu's top edge aligns with the opener and the
		// inner padding pushes the first item down, leaving a visible step.
		const submenuPadding = (this._isSubmenu && !this._drillInMode)
			? parseInt(getComputedStyle(this).getPropertyValue('--_menu-padding')) || 0
			: 0;

		const { x, y } = await computePosition(anchorEl, this, {
			placement: this.placement as import('@floating-ui/dom').Placement,
			middleware: [
				offset({ mainAxis: 0, alignmentAxis: -submenuPadding }),
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

		// keydown bubbles up the flat tree, so this handler fires on every
		// ancestor menu in the chain. Bail when focus belongs to a descendant
		// submenu — that submenu's own handler already processed the key, and
		// processing it here too would advance navigation an extra step per
		// ancestor (or close an extra level on Escape).
		const focusedDescendant = this.querySelector<NLDDMenuItem>('nldd-menu-item[data-focused]');
		if (focusedDescendant && focusedDescendant.closest('nldd-menu') !== this) return;

		const index = this._getFocusedIndex(items);

		switch (event.key) {
			case 'ArrowDown': {
				event.preventDefault();
				event.stopPropagation();
				const next = index === -1 ? 0 : index < items.length - 1 ? index + 1 : 0;
				items[next].focus();
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				event.stopPropagation();
				const prev = index === -1 ? items.length - 1 : index > 0 ? index - 1 : items.length - 1;
				items[prev].focus();
				break;
			}
			case 'Home': {
				event.preventDefault();
				event.stopPropagation();
				items[0].focus();
				break;
			}
			case 'End': {
				event.preventDefault();
				event.stopPropagation();
				items[items.length - 1].focus();
				break;
			}
			case 'ArrowRight': {
				// Open the focused item's submenu if it has one. Mode-agnostic:
				// the parent menu's _handleSubmenuOpen handler routes to cascade
				// or drill-in based on viewport.
				const focused = items[index];
				if (focused?._hasSubmenu) {
					event.preventDefault();
					event.stopPropagation();
					focused._handleClick();
					// Focus the first item in the submenu once it's open.
					requestAnimationFrame(() => {
						this._activeSubmenu?._getVisibleItems()[0]?.focus();
					});
				}
				break;
			}
			case 'ArrowLeft': {
				// In a submenu (cascade or drill-in): close it and return focus
				// to the parent item. On the root menu, ArrowLeft is a no-op.
				if (this._isSubmenu) {
					event.preventDefault();
					event.stopPropagation();
					const parentItem = this._parentItem;
					(this as HTMLElement).hidePopover();
					parentItem?.focus();
				}
				break;
			}
			case 'Escape': {
				event.preventDefault();
				event.stopPropagation();
				(this as HTMLElement).hidePopover();
				// On a submenu close, return focus to the parent item rather
				// than the root anchor — keeps the user oriented in the chain.
				const focusTarget = this._isSubmenu
					? this._parentItem
					: (this._getAnchorEl() as HTMLElement | null);
				focusTarget?.focus();
				break;
			}
			default: {
				// Typeahead (ARIA APG menu pattern): typing a single printable
				// character jumps to the next item whose visible text starts
				// with it. Repeated presses cycle through matches.
				if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
					this._handleTypeahead(event, items, index);
				}
			}
		}
	};

	private _typeaheadBuffer = '';
	private _typeaheadTimer: number | null = null;
	/** Reset the typeahead buffer after this much idle time. 500ms is the
	 * common ARIA APG / OS convention — long enough to type a 2-3 char prefix
	 * comfortably, short enough that an unrelated later keystroke starts a
	 * fresh search. */
	private static readonly _TYPEAHEAD_RESET_MS = 500;

	/**
	 * ARIA APG typeahead: characters typed within 500ms accumulate into a
	 * buffer; the menu jumps to the first item whose text starts with the
	 * buffer (case-insensitive).
	 *
	 * Single-char buffer (first press or after reset) cycles through matches
	 * — repeated presses of the same letter step through every item starting
	 * with it. Multi-char buffer matches from the currently-focused item, so
	 * extending the prefix while the current item still matches keeps focus
	 * stable instead of jumping forward.
	 */
	private _handleTypeahead(event: KeyboardEvent, items: NLDDMenuItem[], currentIndex: number): void {
		// Extend (or seed) the buffer and (re)arm the reset timer.
		if (this._typeaheadTimer !== null) {
			clearTimeout(this._typeaheadTimer);
		}
		this._typeaheadBuffer += event.key.toLowerCase();
		this._typeaheadTimer = window.setTimeout(() => {
			this._typeaheadBuffer = '';
			this._typeaheadTimer = null;
		}, NLDDMenu._TYPEAHEAD_RESET_MS);

		// Single char → cycle past the current item; multi char → start AT the
		// current item so a still-matching prefix doesn't move focus.
		const start = this._typeaheadBuffer.length === 1 && currentIndex >= 0
			? currentIndex + 1
			: Math.max(0, currentIndex);

		for (let i = 0; i < items.length; i++) {
			const idx = (start + i) % items.length;
			if (items[idx].text.toLowerCase().startsWith(this._typeaheadBuffer)) {
				event.preventDefault();
				event.stopPropagation();
				items[idx].focus();
				return;
			}
		}
	}

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

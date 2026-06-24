import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { listStyles } from './list.styles.js';
import { template } from './list.template.js';
import type { NLDDListItem } from '../list-item/list-item.js';
import { nlddListTranslations } from './list.i18n.js';
import type { NLDDListTranslations } from './list.i18n.js';
import '../../status-and-feedback/inline-dialog/inline-dialog.js';
import '../../content/icon/icon.js';
import '../../actions/icon-button/icon-button.js';

export type ListVariant = 'simple' | 'box';
export type ListBackground = 'tinted' | 'base';
export type ListType = 'list' | 'navigation' | 'listbox';

export interface NLDDReorderEventDetail {
	fromIndex: number;
	toIndex: number;
}

/**
 * A container for `nldd-list-item` elements.
 *
 * The `type` attribute switches the list's a11y role and behavior:
 * - `list` (default) — `role="list"`, items `role="listitem"`. Reorderable allowed.
 *                     Items may individually be buttons or links; the list itself
 *                     has no special keyboard semantics.
 * - `navigation`     — host `role="navigation"`, items with `selected` get
 *                     `aria-current="page"` on their inner `<a>` or `<button>`.
 * - `listbox`        — an accessible, filterable listbox (combobox pattern). The
 *                     list renders its OWN search input (`role="combobox"`) pinned
 *                     above the options; `.list__items` becomes `role="listbox"`
 *                     and items become `role="option"`. Focus stays in the input,
 *                     the active option moves via `aria-activedescendant`, and
 *                     filtering is consumer-managed via the `input` event (toggle
 *                     `[hidden]` on items). See "Listbox" below.
 *
 * Selection state is consumer-managed: the list never mutates `selected` itself.
 *
 * ### Listbox
 *
 * In `type="listbox"` the list owns a native `<input role="combobox">` (mirroring
 * how `nldd-combo-box` wires an input to a slotted listbox). Keyboard, handled on
 * the input so focus never leaves it:
 * - ArrowDown / ArrowUp — move the active option among the VISIBLE (non-`[hidden]`)
 *   options (wrap around).
 * - Home / End — first / last visible option.
 * - Enter — activate the active option by triggering its inner action (a link
 *   navigates, a button fires the consumer's handler). Selection stays
 *   consumer-managed.
 * - Escape — clear the search value (and refire `input`).
 *
 * On every active change the input's `aria-activedescendant` is set to the active
 * option's id and the option is scrolled into view. The active option (`_highlighted`
 * on the item, a highlight) is distinct from `selected`. Filtering is the
 * consumer's job: listen to `input` (`{ detail: { value } }`) and toggle `[hidden]`
 * on items; after the visible set changes the list resets the active option to the
 * first visible one. `reorderable` and `arrow-navigation` are ignored in listbox
 * mode (listbox has its own keyboard).
 *
 * ### Reorder
 *
 * On reorder (type="list" + reorderable), the list dispatches `nldd-reorder` with
 * `fromIndex` / `toIndex` and expects the consumer to mutate the DOM (or their
 * data model that renders the DOM). Focus is restored to the moved item's drag
 * handle via a single `requestAnimationFrame` — this assumes the consumer
 * reorders **synchronously** in the event handler. Async renderers (React,
 * Vue, …) that update the DOM on a later tick will miss the focus restore and
 * should manage focus themselves after their render commits.
 *
 * @slot         - List items (`nldd-list-item`)
 * @slot toolbar - Controls below the search field (filters, sort, counts,
 *                 view toggles). Available for every type; collapses when empty.
 * @slot search-bar-end - Controls inline at the end of the search bar, beside the
 *                 search field (e.g. a filter or options button). Listbox only;
 *                 collapses when empty.
 * @slot empty   - Shown when no items are visible (all `[hidden]` or none). Defaults
 *                 to `nldd-inline-dialog` with `empty-text` / `empty-supporting-text`
 *                 (falling back to Dutch i18n "Geen items"). Slot content
 *                 overrides the default dialog entirely. In `type="listbox"` it is
 *                 suppressed while the search field is empty (no query yet), so the
 *                 consumer can show just the search field or its own hint outside
 *                 the list.
 *
 * @fires nldd-reorder - Reorderable `type="list"`: `{ fromIndex, toIndex }` on drop
 * @fires input        - `type="listbox"`: search value changed; `{ value }`. Toggle
 *                       `[hidden]` on items to filter.
 */
@customElement('nldd-list')
export class NLDDList extends LitElement {
	static override styles = [listStyles];

	/** Visual style of the list. `simple` is a plain vertical strip with
	 *  no chrome (no rounded corners, no fill, no border); `box` is a
	 *  framed card with rounded corners, fill, and an inset border ring. */
	@property({ reflect: true })
	variant: ListVariant = 'simple';

	/** Surface fill for `variant="box"`. `tinted` (default) for a list on
	 *  a plain page; `base` for a list on an already-tinted parent. No
	 *  effect when `variant="simple"`. */
	@property({ reflect: true })
	background?: ListBackground;

	/** A11y semantics. See class docblock. */
	@property({ reflect: true })
	type: ListType = 'list';

	/** Enables drag-to-reorder. Only valid when `type="list"` (the default). */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	/** Hides dividers between list items. */
	@property({ type: Boolean, reflect: true, attribute: 'no-dividers' })
	noDividers = false;

	/**
	 * Roving-tabindex arrow-key navigation. When set, ArrowUp/ArrowDown move focus
	 * between the (interactive) items, Home/End jump to the first/last, and the
	 * whole list becomes a single tab stop — so Tab moves past the rest instead of
	 * stepping through every item. Arrows move focus only; selection stays
	 * consumer-managed.
	 *
	 * Pragmatic by design: the `list`/`navigation` role is kept (no widget role).
	 * Use it only on **simple** lists where each item has a single action and no
	 * extra controls (a control in a `start`/`end` slot would not be reachable as
	 * its own tab stop). Mutually exclusive with `reorderable` (both use the arrow
	 * keys); when both are set, `reorderable` wins and this is ignored.
	 *
	 * Known a11y limitation: because the role stays `list`/`navigation` (not
	 * `listbox`/`menu`), screen readers do not auto-announce that the arrow keys
	 * navigate. As a best-effort signal the host carries
	 * `aria-keyshortcuts="ArrowUp ArrowDown Home End"` while active, but blind users
	 * may still not discover the feature — another reason to keep it to genuinely
	 * simple lists.
	 */
	@property({ type: Boolean, reflect: true, attribute: 'arrow-navigation' })
	arrowNavigation = false;

	/**
	 * Only in `type="listbox"`: caps the options' scroll region at this CSS
	 * length (any value `CSS.supports('max-height', …)` accepts, e.g. "320px").
	 * The search input stays pinned above and the options scroll; the active
	 * option is kept in view via `scrollIntoView`. Unset → no cap. No effect
	 * outside listbox mode.
	 */
	@property({ type: String, reflect: true })
	height = '';

	/**
	 * Text for the default empty-state dialog. Falls back to the Dutch
	 * i18n default ("Geen items"). Ignored when consumers slot their
	 * own content into `[slot=empty]`.
	 */
	@property({ type: String, attribute: 'empty-text' })
	emptyText = '';

	/**
	 * Optional supporting text for the default empty-state dialog.
	 * Ignored when consumers slot their own content into `[slot=empty]`.
	 */
	@property({ type: String, attribute: 'empty-supporting-text' })
	emptySupportingText = '';

	/** Accessible name for the list, forwarded to the inner role: the list in
	 *  `type=list`, the search field in `type=listbox`. For `type=navigation`,
	 *  set `aria-label` / `aria-labelledby` on the element directly (it is a
	 *  landmark). Falls back to the default i18n label when unset. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Override one or more translation keys. Unset keys fall back to the Dutch default. */
	@property({ type: Object })
	translations: Partial<NLDDListTranslations> = {};

	@state()
	private _mergedTranslations = { ...nlddListTranslations };

	@state()
	private _hasToolbar = false;

	@state()
	private _hasSearchBarEnd = false;

	@state()
	private _isEmpty = false;

	// — Listbox state ————————————————————————————————————————————————————————

	/** Current search value (listbox mode). Mirrored to the input. */
	@state()
	private _searchValue = '';

	/** ID of the active option (listbox mode), or '' when none. Fed to the
	 *  input's aria-activedescendant. Distinct from selection. */
	@state()
	private _activeId = '';

	/** Whether the search input has focus. aria-activedescendant is the input's
	 *  virtual focus, so the active-option highlight only shows while it is
	 *  focused; _activeId is remembered across blur so focus resumes there. */
	@state()
	private _searchFocused = false;

	/** Stable id for `.list__items` (the listbox), referenced by the input's
	 *  aria-controls. Per-instance, like nldd-combo-box's `_menuId`. */
	private static _idCounter = 0;
	readonly _listboxId = `nldd-list-listbox-${NLDDList._idCounter++}`;

	/** Counter for auto-assigned option ids (listbox mode). */
	private static _optionIdCounter = 0;

	@query('.list__search-field-input')
	private _searchInput?: HTMLInputElement;

	// — Drag state ——————————————————————————————————————————————————————————

	private _draggingEl: NLDDListItem | null = null;
	private _draggingFromIndex = -1;
	private _placeholder: HTMLDivElement | null = null;
	private _currentDropIndex = -1;
	private _pointerId: number | null = null;
	private _clone: HTMLDivElement | null = null;
	private _cloneOffsetY = 0;
	private _listRect: DOMRect | null = null;

	// — Observers ————————————————————————————————————————————————————————————

	private _itemsObserver: MutationObserver | null = null;

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		slot?.addEventListener('slotchange', () => {
			this._updateItems();
			this._updateEmpty();
		});
		this._updateItems();
		this._updateEmpty();
		this._warnArrowNav();

		const toolbarSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="toolbar"]');
		const syncToolbar = () => { this._hasToolbar = (toolbarSlot?.assignedElements().length ?? 0) > 0; };
		toolbarSlot?.addEventListener('slotchange', syncToolbar);
		syncToolbar();

		// The search-bar-end slot only renders in listbox; sync its initial presence
		// here. The @slotchange binding in the template keeps it updated afterwards
		// and re-binds whenever the search bar (re)renders on a type change.
		const searchBarEndSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="search-bar-end"]');
		if (searchBarEndSlot) this._hasSearchBarEnd = searchBarEndSlot.assignedElements().length > 0;

		// Watch direct children for add/remove (nldd-list-item gains/lose) and
		// for `hidden` toggles on those direct children (consumer-driven
		// filtering). `subtree: true` is required because `attributes` on the
		// host itself isn't relevant — we need `hidden` changes on the items.
		// The callback filters mutations so we only work when a direct child
		// is affected; nested `hidden` toggles on e.g. cells inside items
		// (which can happen via container-query `[hidden]` in visibility-mixin)
		// no longer trigger item/empty recalculation.
		this._itemsObserver = new MutationObserver((mutations) => {
			const relevant = mutations.some(m => {
				if (m.type === 'childList') return m.target === this;
				if (m.type === 'attributes' && m.attributeName === 'hidden') {
					return m.target instanceof Element && m.target.parentElement === this;
				}
				return false;
			});
			if (!relevant) return;
			this._updateItems();
			this._updateEmpty();
		});
		this._itemsObserver.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['hidden'],
		});

		this._applyHostType();
	}

	override connectedCallback() {
		super.connectedCallback();
		// Set container-type/name as inline style on the host. Doing this from
		// a `:host` rule inside the shadow DOM works in Chromium but Safari
		// does not always recognize the host as a container for slotted
		// descendants — a known engine inconsistency. Same workaround as
		// nldd-page and nldd-card.
		this.style.containerType = 'inline-size';
		this.style.containerName = 'cells-container';
		this.addEventListener('pointerdown', this._onPointerDown);
		this.addEventListener('keydown', this._onKeyDown);
		this.addEventListener('focusin', this._onFocusIn);
		this.addEventListener('click', this._onListClick);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('pointerdown', this._onPointerDown);
		this.removeEventListener('keydown', this._onKeyDown);
		this.removeEventListener('focusin', this._onFocusIn);
		this.removeEventListener('click', this._onListClick);
		this._itemsObserver?.disconnect();
		this._itemsObserver = null;
		this._cancelDrag();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('reorderable') || changed.has('type') || changed.has('arrowNavigation')) {
			if (this.reorderable && this.type !== 'list' && import.meta.env?.DEV) {
				console.warn('nldd-list: `reorderable` is only valid when type="list". Ignoring.');
			}
			this._updateItems();
			this._warnArrowNav();
		}
		if (changed.has('variant')) {
			this._updateItemContext();
		}
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nlddListTranslations, ...this.translations };
		}
		if (changed.has('type')) {
			this._applyHostType();
			// Leaving listbox mode: drop the active highlight and reset state so a
			// stale `_highlighted`/aria-activedescendant doesn't survive the switch.
			if (changed.get('type') === 'listbox' && this.type !== 'listbox') {
				this._activeId = '';
				this._getItems().forEach(item => { item._highlighted = false; });
			}
		}
		if (changed.has('height')) {
			// Mirror the width/height inline-style pattern: validate, then feed a
			// local var the CSS reads as max-height on the scroll region.
			const h = this.height;
			if (h && CSS.supports('max-height', h)) {
				this.style.setProperty('--_max-height', h);
			} else {
				this.style.removeProperty('--_max-height');
			}
		}
	}

	// — Host attribute routing ————————————————————————————————————————————————

	private _applyHostType() {
		// Only `navigation` puts a role on the host. `list` and `listbox` leave
		// the host role-less: `list` carries role="list" on `.list__items`, and
		// `listbox` carries role="listbox" there — putting a second widget role
		// on the host would nest landmarks/roles incorrectly.
		if (this.type === 'navigation') {
			this.setAttribute('role', 'navigation');
			if (!this.hasAttribute('aria-label') && !this.hasAttribute('aria-labelledby')) {
				this.setAttribute('aria-label', this._t('components.list.navigation-label-text'));
				this.setAttribute('data-nldd-auto-label', '');
			}
		} else {
			if (this.getAttribute('role') === 'navigation') {
				this.removeAttribute('role');
			}
			if (this.hasAttribute('data-nldd-auto-label')) {
				// Only strip the label we set ourselves. If the consumer overrode
				// `aria-label` after our auto-set, the value no longer matches and
				// we leave it intact. Either way, clear the sentinel.
				const autoLabel = this._t('components.list.navigation-label-text');
				if (this.getAttribute('aria-label') === autoLabel) {
					this.removeAttribute('aria-label');
				}
				this.removeAttribute('data-nldd-auto-label');
			}
		}
	}

	// — Items ————————————————————————————————————————————————————————————————

	private _getItems(): NLDDListItem[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		return (slot?.assignedElements() ?? []).filter(
			(el) => el.tagName.toLowerCase() === 'nldd-list-item' && !el.hasAttribute('data-nldd-placeholder'),
		) as NLDDListItem[];
	}

	/** Visible (non-`[hidden]`) items, in DOM order. The active-option model and
	 *  listbox keyboard operate over this set. */
	private _getVisibleItems(): NLDDListItem[] {
		return this._getItems().filter(item => !item.hasAttribute('hidden'));
	}

	private _updateItems() {
		const items = this._getItems();
		const visibleItems = items.filter(item => !item.hasAttribute('hidden'));
		const firstVisible = visibleItems[0];
		const lastVisible = visibleItems[visibleItems.length - 1];
		const reorderActive = this.reorderable && this.type === 'list';
		items.forEach((item) => {
			item.classList.toggle('is-first', item === firstVisible);
			item.classList.toggle('is-last', item === lastVisible);
			if (reorderActive) {
				item.setAttribute('reorderable', '');
			} else {
				item.removeAttribute('reorderable');
			}
		});
		this._updateItemContext();
		this._updateRoving();
		if (this.type === 'listbox') this._updateListboxOptions();
	}

	private _contextScheduled = false;

	/** Push the list's variant + type onto every item, deferred to a microtask:
	 *  _updateItems runs inside the update lifecycle (firstUpdated/updated), and
	 *  setting the items' reactive state there would trip Lit's change-in-update
	 *  warning. Coalesced so repeated item updates schedule it only once. */
	private _updateItemContext() {
		if (this._contextScheduled) return;
		this._contextScheduled = true;
		queueMicrotask(() => {
			this._contextScheduled = false;
			this._applyItemContext();
		});
	}

	/** The list owns variant + type; every item mirrors them (is-boxed styling and
	 *  the option/listitem role). Pushing from the list, not a per-item observer,
	 *  means a runtime variant/type switch, or a freshly added item, always tracks
	 *  the list. */
	private _applyItemContext() {
		this._getItems().forEach((item) => {
			item._applyVariant(this.variant);
			item._applyParentType(this.type);
		});
	}

	private _updateEmpty() {
		const items = this._getItems();
		this._isEmpty = items.length === 0 || items.every(item => item.hasAttribute('hidden'));
	}

	// — Listbox: active-option model ————————————————————————————————————————————

	/** Every option needs a stable id for aria-activedescendant. Assign one to
	 *  any item that lacks one (consumer-supplied ids win). */
	private _ensureOptionId(item: NLDDListItem): string {
		if (!item.id) {
			item.id = `nldd-list-option-${NLDDList._optionIdCounter++}`;
		}
		return item.id;
	}

	/** Keep the active option valid after the visible set changes (initial
	 *  render, slot change, or consumer-driven `[hidden]` filtering): ensure ids,
	 *  reset the active option to the first visible one when the current active is
	 *  gone (or none was set), push `_highlighted` onto the items, and refresh the
	 *  input's aria-activedescendant. When nothing is visible the empty state
	 *  shows and aria-activedescendant is cleared. Deferred to a microtask for the
	 *  same reason as roving — it can run inside the update lifecycle and would
	 *  otherwise trip Lit's change-in-update warning. */
	private _listboxScheduled = false;
	private _updateListboxOptions() {
		if (this._listboxScheduled) return;
		this._listboxScheduled = true;
		queueMicrotask(() => {
			this._listboxScheduled = false;
			this._applyListboxOptions();
		});
	}

	private _applyListboxOptions() {
		if (this.type !== 'listbox') return;
		const visible = this._getVisibleItems();
		visible.forEach(item => this._ensureOptionId(item));
		// Keep the active option if it's still visible, otherwise fall back to the
		// first visible option (or none when the list is empty).
		const current = visible.find(item => item.id === this._activeId);
		const active = current ?? visible[0];
		this._activeId = active?.id ?? '';
		this._syncHighlight();
	}

	/** Move the active option to `item`: update state, reflect aria-activedescendant
	 *  on the input, and scroll the option into view (it may be inside the capped
	 *  scroll region). */
	private _setActiveOption(item: NLDDListItem) {
		this._activeId = this._ensureOptionId(item);
		this._syncHighlight();
		item.scrollIntoView({ block: 'nearest' });
	}

	/** Reflect the active descendant onto the items, but only while the search
	 *  input is focused (aria-activedescendant is its virtual focus). _activeId is
	 *  remembered across blur so focus resumes at the same option; the template
	 *  gates aria-activedescendant on _searchFocused the same way. */
	private _syncHighlight() {
		const active = this._searchFocused ? this._activeItem : null;
		this._getItems().forEach(i => { i._highlighted = i === active; });
	}

	/** The currently active option element, or null. */
	private get _activeItem(): NLDDListItem | null {
		if (!this._activeId) return null;
		return this._getVisibleItems().find(item => item.id === this._activeId) ?? null;
	}

	// — Listbox: search input ————————————————————————————————————————————————————

	/** Dispatch the consumer-facing `input` event so it can filter (toggle
	 *  `[hidden]` on items). Composed + bubbling, `{ detail: { value } }`. */
	private _emitListboxInput(value: string) {
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value },
			bubbles: true,
			composed: true,
		}));
	}

	private _onSearchInput = (event: Event) => {
		// The native input event is composed and would escape the shadow root
		// alongside our own CustomEvent, reaching consumers as a second `input`
		// without a `detail`. Stop it so the only `input` they see is ours,
		// carrying { value }.
		event.stopPropagation();
		const input = event.target as HTMLInputElement;
		this._searchValue = input.value;
		this._emitListboxInput(this._searchValue);
	};

	/** Clear the search value (clear button / Escape) and refire `input` so the
	 *  consumer refilters. Focus stays on the input. */
	private _clearSearch() {
		this._searchValue = '';
		if (this._searchInput) this._searchInput.value = '';
		this._emitListboxInput('');
		this._searchInput?.focus();
	}

	private _onClearClick = () => {
		this._clearSearch();
	};

	/** Track whether the search-bar-end slot has content, so its wrapper (and the
	 *  bar gap) collapses when empty. Bound in the template so it follows the slot
	 *  even though the search bar only renders in listbox mode. */
	private _onSearchBarEndSlotChange = (event: Event) => {
		this._hasSearchBarEnd = (event.target as HTMLSlotElement).assignedElements().length > 0;
	};

	private _onSearchFocus = () => {
		this._searchFocused = true;
		// Resume at the remembered active option, or the first visible one if none
		// is set or it was filtered away.
		this._applyListboxOptions();
	};

	private _onSearchBlur = () => {
		this._searchFocused = false;
		this._syncHighlight();
	};

	/** Clicking an option moves the (remembered) active descendant to it, so the
	 *  highlight resumes there when the search input regains focus. */
	private _onListClick = (event: MouseEvent) => {
		if (this.type !== 'listbox') return;
		const item = (event.target as Element | null)?.closest?.('nldd-list-item') as NLDDListItem | null;
		if (item && item.parentElement === this && !item.hasAttribute('hidden')) {
			this._activeId = this._ensureOptionId(item);
		}
	};

	/**
	 * Listbox keyboard, handled on the search input — focus never leaves it.
	 * Arrows/Home/End move the active option among the visible set; Enter
	 * activates it by triggering its inner action; Escape clears the value.
	 */
	private _onSearchKeyDown = (event: KeyboardEvent) => {
		const { key } = event;
		if (key === 'Escape') {
			if (this._searchValue !== '') {
				event.preventDefault();
				this._clearSearch();
			}
			return;
		}
		if (key === 'Enter') {
			const active = this._activeItem;
			if (active) {
				event.preventDefault();
				// Trigger the option's inner action: a link navigates, a button
				// fires the consumer's handler. Selection stays consumer-managed.
				active.shadowRoot?.querySelector<HTMLElement>('.list-item__action')?.click();
				// Enter is keyboard interaction, so keep focus on the search input
				// (the combobox model: the active option is the virtual focus via
				// aria-activedescendant). The option's click would otherwise pull DOM
				// focus onto it; refocus so typing/arrowing continues and the
				// highlight stays.
				this._searchInput?.focus();
			}
			return;
		}
		if (key !== 'ArrowDown' && key !== 'ArrowUp' && key !== 'Home' && key !== 'End') return;
		const visible = this._getVisibleItems();
		if (visible.length === 0) return;
		event.preventDefault();
		const current = visible.findIndex(item => item.id === this._activeId);
		let next: number;
		if (key === 'Home') {
			next = 0;
		} else if (key === 'End') {
			next = visible.length - 1;
		} else {
			const dir = key === 'ArrowDown' ? 1 : -1;
			const base = current === -1 ? (dir === 1 ? -1 : 0) : current;
			next = (base + dir + visible.length) % visible.length; // wrap around
		}
		this._setActiveOption(visible[next]);
	};

	// — Arrow navigation (roving tabindex) ————————————————————————————————————

	/** Arrow-navigation is effective only when reorderable isn't already claiming
	 *  the arrow keys for drag-reorder (reorderable wins). The guard also checks
	 *  `type === 'list'` on purpose: reorderable is inert without it, so there is no
	 *  conflict to resolve. `arrow-navigation reorderable` without `type="list"`
	 *  therefore keeps arrow-nav active (reorderable does nothing), and
	 *  `_warnArrowNav` likewise only warns for the real reorderable-list conflict. */
	private get _arrowNavActive(): boolean {
		// Listbox has its own keyboard (on the search input) and supersedes the
		// roving-tabindex arrow-nav — never run both.
		if (this.type === 'listbox') return false;
		return this.arrowNavigation && !(this.reorderable && this.type === 'list');
	}

	/** Interactive, visible items — the roving stops. Non-interactive items (no
	 *  link/button) and hidden items are skipped. */
	private _getInteractiveItems(): NLDDListItem[] {
		return this._getItems().filter(
			(item) => !item.hasAttribute('hidden') && Boolean(item.href || item.button),
		);
	}

	private _rovingScheduled = false;

	/** Push roving state onto the items, deferred to a microtask: _updateItems can
	 *  run inside the update lifecycle (firstUpdated/updated), and setting the
	 *  items' reactive state there would trip Lit's change-in-update warning.
	 *  Coalesced so repeated item updates schedule it only once. */
	private _updateRoving() {
		if (this._rovingScheduled) return;
		this._rovingScheduled = true;
		queueMicrotask(() => {
			this._rovingScheduled = false;
			this._applyRoving();
		});
	}

	/** Sets the arrow-navigation flag on all items and a single roving entry point
	 *  (keep the current one if still valid, else the selected item, else the first
	 *  interactive item). */
	private _applyRoving() {
		const active = this._arrowNavActive;
		const items = this._getItems();
		items.forEach((item) => { item._arrowNavigation = active; });
		// Best-effort AT discoverability: role="list"/"navigation" doesn't imply
		// arrow-key navigation the way listbox/menu would, so advertise the keys via
		// aria-keyshortcuts (queryable) and a plain-language aria-description (surfaced
		// when AT reaches the list). See the arrowNavigation JSDoc — known limitation.
		if (active) {
			this.setAttribute('aria-keyshortcuts', 'ArrowUp ArrowDown Home End');
			this.setAttribute('aria-description', this._t('components.list.arrow-navigation-description-text'));
		} else {
			this.removeAttribute('aria-keyshortcuts');
			this.removeAttribute('aria-description');
		}
		if (!active) {
			items.forEach((item) => { item._rovingActive = false; });
			return;
		}
		const interactive = this._getInteractiveItems();
		if (interactive.length === 0) return;
		const entry = interactive.find((item) => item._rovingActive)
			?? interactive.find((item) => item.selected)
			?? interactive[0];
		items.forEach((item) => { item._rovingActive = item === entry; });
	}

	// items defaults to all items; _onArrowNav passes the interactive set it already
	// computed (non-interactive items are kept out of roving, so they stay false).
	private _setRovingActive(activeItem: NLDDListItem, items: NLDDListItem[] = this._getItems()) {
		items.forEach((item) => { item._rovingActive = item === activeItem; });
	}

	private _onFocusIn = (event: FocusEvent) => {
		if (!this._arrowNavActive) return;
		const item = (event.composedPath() as Element[]).find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'nldd-list-item',
		) as NLDDListItem | undefined;
		// Keep the roving entry point wherever focus actually lands (Tab in, a
		// click, or programmatic focus), so arrows continue from there.
		if (item && (item.href || item.button) && !item._rovingActive) {
			this._setRovingActive(item);
		}
	};

	private _onArrowNav(event: KeyboardEvent) {
		const { key } = event;
		if (key !== 'ArrowUp' && key !== 'ArrowDown' && key !== 'Home' && key !== 'End') return;
		const items = this._getInteractiveItems();
		if (items.length === 0) return;
		const current = items.findIndex((item) => item._rovingActive);
		let next: number;
		if (key === 'Home') {
			next = 0;
		} else if (key === 'End') {
			next = items.length - 1;
		} else {
			const dir = key === 'ArrowDown' ? 1 : -1;
			const base = current === -1 ? (dir === 1 ? -1 : 0) : current;
			next = (base + dir + items.length) % items.length; // wrap around
		}
		event.preventDefault();
		const target = items[next];
		this._setRovingActive(target, items);
		target.focus();
	}

	private _warnArrowNav() {
		if (!import.meta.env?.DEV) return;
		if (this.arrowNavigation && this.reorderable && this.type === 'list') {
			console.warn('nldd-list: `arrow-navigation` and `reorderable` both use the arrow keys; `reorderable` wins and arrow-navigation is ignored.');
		}
		if (this._arrowNavActive) {
			// Best-effort, light-DOM only: a slotted custom element (e.g. nldd-switch)
			// keeps its focusable control in its own shadow root, so this query won't
			// catch every extra control. Detecting custom elements generically would
			// false-positive on non-interactive ones (nldd-icon, nldd-badge), so this
			// stays a heuristic dev aid for the documented "simple lists" case.
			const hasExtraControls = this._getInteractiveItems().some(
				(item) => item.querySelector('a[href], button, input, select, textarea, [tabindex]') !== null,
			);
			if (hasExtraControls) {
				console.warn('nldd-list: `arrow-navigation` is for simple lists, but a list-item has an extra focusable control (slotted) that will not be reachable as its own tab stop. Remove the control or disable arrow-navigation.');
			}
		}
	}

	// — Drag: pointer ————————————————————————————————————————————————————————

	private _onPointerDown = (event: PointerEvent) => {
		if (!this.reorderable || this.type !== 'list') return;

		const path = event.composedPath() as Element[];
		const hasDragHandle = path.some(
			(el) => el instanceof Element && el.hasAttribute('reorderable-only'),
		);
		if (!hasDragHandle) return;

		const item = path.find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'nldd-list-item',
		) as NLDDListItem | undefined;
		if (!item) return;

		event.preventDefault();
		this._lastPointerY = event.clientY;
		this._startDrag(item, event.clientY);
		// Restore focus suppressed by preventDefault
		const handle = path.find(
			(el) => el instanceof HTMLButtonElement,
		) as HTMLButtonElement | undefined;
		handle?.focus();
		this._pointerId = event.pointerId;
		this.setPointerCapture(event.pointerId);
		this.addEventListener('pointermove', this._onPointerMove);
		this.addEventListener('pointerup', this._onPointerUp);
		this.addEventListener('pointercancel', this._onPointerCancel);
	};

	private _lastPointerY = 0;

	private _onPointerMove = (event: PointerEvent) => {
		if (!this._draggingEl || !this._placeholder) return;

		// Move floating clone
		if (this._clone) {
			this._listRect = this.getBoundingClientRect();
			this._clone.style.setProperty('--_drag-clone-top', `${event.clientY - this._listRect.top - this._cloneOffsetY}px`);
		}

		const draggingDown = event.clientY >= this._lastPointerY;
		this._lastPointerY = event.clientY;

		const items = this._getItems();
		const nonDragging = items.filter((i) => i !== this._draggingEl);
		const pointerY = event.clientY;

		let toIndex = nonDragging.length; // default: end

		for (let i = 0; i < nonDragging.length; i++) {
			// nldd-list-item is display:contents so its own rect is zero — use the inner element
			const inner = nonDragging[i].shadowRoot?.querySelector('.list-item') ?? nonDragging[i];
			const rect = inner.getBoundingClientRect();
			const threshold = draggingDown ? rect.top : rect.bottom;
			if (pointerY < threshold) {
				toIndex = i;
				break;
			}
		}

		this._setDropIndex(toIndex);
	};

	private _onPointerUp = (_event: PointerEvent) => {
		this._endDrag();
	};

	private _onPointerCancel = () => {
		this._cancelDrag();
	};

	// — Keyboard reorder —————————————————————————————————————————————————————

	// ArrowUp/ArrowDown on a focused drag handle moves the item immediately.
	// Mirrors nldd-document-tab-bar: no grab-and-drop cycle — each arrow press
	// reorders the DOM, fires nldd-reorder and restores focus on the handle.
	private _onKeyDown = (event: KeyboardEvent) => {
		// Arrow-navigation and reorder both claim the arrow keys; _arrowNavActive
		// is false whenever reorderable wins, so the two never run together.
		if (this._arrowNavActive) {
			this._onArrowNav(event);
			return;
		}
		if (!this.reorderable || this.type !== 'list') return;
		if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

		const path = event.composedPath() as Element[];
		const handle = path.find(
			(el) => el instanceof HTMLElement && el.hasAttribute('reorderable-only'),
		) as HTMLElement | undefined;
		if (!handle) return;

		const item = path.find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'nldd-list-item',
		) as NLDDListItem | undefined;
		if (!item) return;

		const items = this._getItems();
		const fromIndex = items.indexOf(item);
		if (fromIndex === -1) return;

		const targetIndex = event.key === 'ArrowUp' ? fromIndex - 1 : fromIndex + 1;
		if (targetIndex < 0 || targetIndex >= items.length) return;

		event.preventDefault();

		// Capture the actual focused element (may live inside the handle's shadow DOM,
		// e.g. the <button> inside nldd-drag-handle-cell) so we can restore focus
		// after the consumer reorders the DOM in response to nldd-reorder.
		const focused = this._getDeepActiveElement() ?? handle;

		// Mirror pointer-drag semantics: don't mutate the DOM ourselves — emit
		// nldd-reorder with from/to indices and let the consumer reorder. toIndex
		// here is the target index relative to the CURRENT order (same contract
		// as pointer drag: fromIndex vs toIndex in the pre-move list).
		this.dispatchEvent(
			new CustomEvent<NLDDReorderEventDetail>('nldd-reorder', {
				detail: { fromIndex, toIndex: targetIndex },
				bubbles: true,
				composed: true,
			}),
		);
		this._announce(this._t('components.list.reorder-moved-text', { position: targetIndex + 1 }));

		// Wait for the consumer to reorder, then restore focus on the moved item's handle.
		requestAnimationFrame(() => focused.focus());
	};

	private _getDeepActiveElement(): HTMLElement | null {
		let active: Element | null = document.activeElement;
		while (active?.shadowRoot?.activeElement) {
			active = active.shadowRoot.activeElement;
		}
		return active instanceof HTMLElement ? active : null;
	}

	// — Drag: core ———————————————————————————————————————————————————————————

	private _startDrag(item: NLDDListItem, clientY = 0) {
		const items = this._getItems();
		const fromIndex = items.indexOf(item);
		if (fromIndex === -1) return;

		this._draggingEl = item;
		this._draggingFromIndex = fromIndex;
		this._currentDropIndex = fromIndex;

		const inner = item.shadowRoot?.querySelector<HTMLElement>('.list-item') ?? item;
		const rect = inner.getBoundingClientRect();

		// Insert placeholder at item's current position, sized to match the actual item
		this._placeholder = document.createElement('div');
		this._placeholder.className = 'nldd-list-drag-placeholder';
		this._placeholder.setAttribute('aria-hidden', 'true');
		this._placeholder.setAttribute('data-nldd-placeholder', '');
		this._placeholder.style.height = `${rect.height}px`;
		item.after(this._placeholder);

		item.classList.add('is-dragging');
		item.classList.add('is-dragging-pointer');
		this._listRect = this.getBoundingClientRect();
		this._cloneOffsetY = clientY - rect.top;

		// Clone the host (carries slotted light DOM), keep draggable so consumer
		// CSS doesn't hide reorderable-only cells in the clone
		const hostClone = item.cloneNode(true) as HTMLElement;
		hostClone.classList.remove('is-dragging');
		hostClone.classList.remove('is-dragging-pointer');
		hostClone.setAttribute('data-nldd-clone', '');

		this._clone = document.createElement('div');
		this._clone.className = 'list__drag-clone';
		this._clone.style.setProperty('--_drag-clone-top', `${clientY - this._listRect.top - this._cloneOffsetY}px`);
		this._clone.style.setProperty('--_drag-clone-left', `${rect.left - this._listRect.left}px`);
		this._clone.style.setProperty('--_drag-clone-width', `${rect.width}px`);
		this._clone.style.setProperty('--_drag-clone-height', `${rect.height}px`);
		this._clone.appendChild(hostClone);
		this.renderRoot.appendChild(this._clone);
	}

	/**
	 * Places the placeholder so the dragged item will land at position `toIndex`
	 * among the non-dragging items (0 = before first, nonDragging.length = after last).
	 */
	private _setDropIndex(toIndex: number) {
		if (!this._placeholder || !this._draggingEl) return;

		const nonDragging = this._getItems().filter((i) => i !== this._draggingEl);
		const clamped = Math.max(0, Math.min(nonDragging.length, toIndex));

		this._currentDropIndex = clamped;
		this._placeholder.remove();

		if (nonDragging.length === 0) {
			this._draggingEl.after(this._placeholder);
			return;
		}

		if (clamped === 0) {
			nonDragging[0].before(this._placeholder);
		} else {
			nonDragging[clamped - 1].after(this._placeholder);
		}
	}

	private _getDropIndex(): number {
		return this._currentDropIndex;
	}

	private _endDrag() {
		if (!this._draggingEl) return;

		const fromIndex = this._draggingFromIndex;
		const toIndex = this._getDropIndex();
		const movedItem = this._draggingEl;

		this._cleanupDrag();

		if (fromIndex !== toIndex) {
			this.dispatchEvent(
				new CustomEvent<NLDDReorderEventDetail>('nldd-reorder', {
					detail: { fromIndex, toIndex },
					bubbles: true,
					composed: true,
				}),
			);
			this._announce(this._t('components.list.reorder-dropped-text', { position: toIndex + 1 }));

			// Restore focus to the drag handle on the moved item after the
			// consumer has had a chance to reorder the DOM in response to nldd-reorder.
			requestAnimationFrame(() => {
				const handle = movedItem
					.querySelector('[reorderable-only]')
					?.shadowRoot?.querySelector<HTMLElement>('button');
				handle?.focus();
			});
		} else {
			this._announce(this._t('components.list.reorder-no-change-text'));
		}
	}

	private _cancelDrag() {
		if (!this._draggingEl) return;
		this._cleanupDrag();
		this._announce(this._t('components.list.reorder-cancelled-text'));
	}

	private _cleanupDrag() {
		this._draggingEl?.classList.remove('is-dragging');
		this._draggingEl?.classList.remove('is-dragging-pointer');
		this._placeholder?.remove();
		this._clone?.remove();

		if (this._pointerId !== null) {
			try { this.releasePointerCapture(this._pointerId); } catch (e) { if (!(e instanceof DOMException)) throw e; }
			this._pointerId = null;
		}

		this.removeEventListener('pointermove', this._onPointerMove);
		this.removeEventListener('pointerup', this._onPointerUp);
		this.removeEventListener('pointercancel', this._onPointerCancel);

		this._draggingEl = null;
		this._draggingFromIndex = -1;
		this._placeholder = null;
		this._clone = null;
		this._cloneOffsetY = 0;
		this._listRect = null;
		this._currentDropIndex = -1;
	}

	// — i18n ————————————————————————————————————————————————————————————————

	private _t(key: keyof NLDDListTranslations, vars?: Record<string, string | number>): string {
		let str = this._mergedTranslations[key];
		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				str = str.replace(`{${k}}`, String(v));
			}
		}
		return str;
	}



	private _announce(message: string, assertive = false) {
		const selector = assertive ? '.list__assertive-announcer' : '.list__polite-announcer';
		const region = this.shadowRoot?.querySelector<HTMLElement>(selector);
		if (!region) return;
		region.textContent = '';
		// Double rAF forces screen readers to register the content change across browsers
		requestAnimationFrame(() => requestAnimationFrame(() => {
			region.textContent = message;
		}));
	}

	override render() {
		return template({
			itemsLabel: this.accessibleLabel || this._t('components.list.items-label-text'),
			hasToolbar: this._hasToolbar,
			type: this.type,
			isEmpty: this._isEmpty,
			emptyText: this.emptyText || this._t('components.list.empty-text'),
			emptySupportingText: this.emptySupportingText,
			listbox: {
				listboxId: this._listboxId,
				searchValue: this._searchValue,
				activeId: this._searchFocused ? this._activeId : '',
				searchPlaceholder: this._t('components.list.search-placeholder-text'),
				searchAccessibleLabel: this.accessibleLabel || this._t('components.list.search-placeholder-text'),
				searchClearLabel: this._t('components.list.search-clear-text'),
				hasSearchBarEnd: this._hasSearchBarEnd,
				onSearchInput: this._onSearchInput,
				onSearchKeyDown: this._onSearchKeyDown,
				onSearchFocus: this._onSearchFocus,
				onSearchBlur: this._onSearchBlur,
				onClearClick: this._onClearClick,
				onSearchBarEndSlotChange: this._onSearchBarEndSlotChange,
			},
		});
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-list': NLDDList;
	}
}

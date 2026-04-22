import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { listStyles } from './list.styles.js';
import { template } from './list.template.js';
import type { NLDDListItem } from '../list-item/list-item.js';
import { nlddListTranslations } from './list.i18n.js';
import type { NLDDListTranslations } from './list.i18n.js';

export type ListVariant = 'simple' | 'box' | 'box-on-tinted';
export type ListType = 'list' | 'listbox' | 'navigation';

export interface NLDDReorderEventDetail {
	fromIndex: number;
	toIndex: number;
}

export interface NLDDSelectEventDetail {
	item: NLDDListItem;
	selected: boolean;
}

/**
 * A container for `nldd-list-item` elements, with optional header and footer slots.
 *
 * The `type` attribute switches the list's a11y role and behaviour:
 * - `list` (default) — `role="list"`, items `role="listitem"`. Reorderable allowed.
 *                     Items may individually be buttons or links; the list itself
 *                     has no special keyboard semantics.
 * - `listbox`            — `role="listbox"`, items `role="option"` with `aria-selected`,
 *                          `aria-activedescendant`-based keyboard nav, fires `nldd-select`.
 * - `navigation`         — host `role="navigation"`, items with `selected` get
 *                          `aria-current="page"` on their inner `<a>` or `<button>`.
 *
 * Selection state is consumer-managed in all types: the list never mutates
 * `selected` itself — it only emits `nldd-select` with the proposed new state.
 *
 * ### Combobox popup
 *
 * For inline combobox patterns (search input above a listbox), set
 * `controlled` on the listbox. The list drops its own tabindex, the consumer
 * keeps focus on the input, and drives navigation via the public methods
 * (`moveHighlight`, `selectHighlighted`, `getHighlightedId`, …). Mirror
 * `getHighlightedId()` into the input's `aria-activedescendant` so screen
 * readers announce the highlighted option.
 *
 * The list does not filter data — the consumer owns filtering and rendering.
 * Re-render the child items based on the current search query, and set
 * `mark="<query>"` on the visible text/title cells so the predictive-completion
 * bolding kicks in automatically (see `nldd-text-cell`).
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
 * @slot header  - Content above the list body (e.g. `nldd-title`)
 * @slot footer  - Content below the list body (e.g. a short description)
 * @slot empty   - Auto-shown when no items are visible (all `[hidden]` or none)
 *
 * @fires nldd-reorder - Reorderable `type="list"`: `{ fromIndex, toIndex }` on drop
 * @fires nldd-select  - Listbox lists: `{ item, selected }` on Enter/Space/click
 */
@customElement('nldd-list')
export class NLDDList extends LitElement {
	static override styles = [listStyles];

	/** Visual style of the list. */
	@property({ reflect: true })
	variant: ListVariant = 'simple';

	/** A11y semantics. See class docblock. */
	@property({ reflect: true })
	type: ListType = 'list';

	/**
	 * Listbox-only: marks the listbox as externally controlled (typically by a
	 * preceding input with `role="combobox"`). The list drops its own
	 * `tabindex`, does not grab focus on click, and relies on the consumer to
	 * drive navigation through the public methods (`moveHighlight`,
	 * `selectHighlighted`, …) and to mirror `getHighlightedId()` into the
	 * input's `aria-activedescendant`.
	 */
	@property({ type: Boolean, reflect: true })
	controlled = false;

	/** Enables drag-to-reorder. Only valid when `type="list"` (the default). */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	/** Hides dividers between list items. */
	@property({ type: Boolean, reflect: true, attribute: 'no-dividers' })
	noDividers = false;

	/** Override one or more translation keys. Unset keys fall back to the Dutch default. */
	@property({ type: Object })
	translations: Partial<NLDDListTranslations> = {};

	@state()
	private _mergedTranslations = { ...nlddListTranslations };

	@state()
	private _hasHeader = false;

	@state()
	private _activeDescendantId = '';

	@state()
	private _isEmpty = false;

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

		const headerSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="header"]');
		headerSlot?.addEventListener('slotchange', () => {
			this._hasHeader = (headerSlot.assignedElements().length > 0);
		});

		// Watch item [hidden] mutations so empty-slot visibility stays in sync
		// with consumer-driven filtering.
		// Watch direct children for add/remove and watch any descendant for
		// `hidden` mutations (consumer-driven filtering). The attribute filter
		// keeps the callback cheap; subtree is needed because `attributes`
		// observation requires the watched node itself or — with subtree —
		// any descendant. Both `_updateItems` (for the `is-last` marker on the
		// visible-last item) and `_updateEmpty` depend on current visibility.
		this._itemsObserver = new MutationObserver(() => {
			this._updateItems();
			this._updateEmpty();
			this._cleanupStaleActiveDescendant();
		});
		this._itemsObserver.observe(this, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['hidden'],
		});

		// Listbox: focus is delegated to the .list__items element (it carries
		// role="listbox" and the activedescendant). The handler stays attached
		// for the element's lifetime; type-gating happens inside the handler.
		const itemsEl = this.shadowRoot?.querySelector<HTMLElement>('.list__items');
		itemsEl?.addEventListener('focus', this._onListboxFocus);

		this._applyHostType();
	}

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('pointerdown', this._onPointerDown);
		this.addEventListener('keydown', this._onKeyDown);
		this.addEventListener('keydown', this._onListboxKeydown);
		this.addEventListener('click', this._onListboxClick);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('pointerdown', this._onPointerDown);
		this.removeEventListener('keydown', this._onKeyDown);
		this.removeEventListener('keydown', this._onListboxKeydown);
		this.removeEventListener('click', this._onListboxClick);
		this._itemsObserver?.disconnect();
		this._itemsObserver = null;
		this._cancelDrag();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('reorderable') || changed.has('type')) {
			if (this.reorderable && this.type !== 'list' && import.meta.env?.DEV) {
				console.warn('nldd-list: `reorderable` is only valid when type="list". Ignoring.');
			}
			this._updateItems();
		}
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nlddListTranslations, ...this.translations };
		}
		if (changed.has('type')) {
			this._applyHostType();
			// Reset listbox-only state when leaving listbox mode
			if (this.type !== 'listbox') {
				this.clearHighlight();
			}
		}
	}

	// — Host attribute routing ————————————————————————————————————————————————

	private _applyHostType() {
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
				this.removeAttribute('aria-label');
				this.removeAttribute('data-nldd-auto-label');
			}
		}
		// Listbox needs the inner .list__items to be focusable; that's handled
		// in the template via tabindex. The host stays non-focusable.
	}

	// — Items ————————————————————————————————————————————————————————————————

	private _getItems(): NLDDListItem[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		return (slot?.assignedElements() ?? []).filter(
			(el) => el.tagName.toLowerCase() === 'nldd-list-item' && !el.hasAttribute('data-nldd-placeholder'),
		) as NLDDListItem[];
	}

	private _updateItems() {
		const items = this._getItems();
		const visibleItems = items.filter(item => !item.hasAttribute('hidden'));
		const lastVisible = visibleItems[visibleItems.length - 1];
		const reorderActive = this.reorderable && this.type === 'list';
		items.forEach((item) => {
			item.classList.toggle('is-last', item === lastVisible);
			if (reorderActive) {
				item.setAttribute('reorderable', '');
			} else {
				item.removeAttribute('reorderable');
			}
		});
	}

	private _updateEmpty() {
		const items = this._getItems();
		this._isEmpty = items.length === 0 || items.every(item => item.hasAttribute('hidden'));
	}

	/**
	 * Clear `_activeDescendantId` if it points to an item that is no longer
	 * a visible option (removed from DOM or now `[hidden]`). Without this,
	 * consumers that replace items (e.g. server-side search) would be left
	 * with a stale `aria-activedescendant` pointing to nothing.
	 */
	private _cleanupStaleActiveDescendant() {
		if (this.type !== 'listbox' || !this._activeDescendantId) return;
		const stillVisible = this._getOptionItems().some(i => i.id === this._activeDescendantId);
		if (!stillVisible) this._activeDescendantId = '';
	}

	// — Listbox: keyboard ————————————————————————————————————————————————————

	private _onListboxKeydown = (event: KeyboardEvent) => {
		if (this.type !== 'listbox') return;

		// Only react to keys originating in/on .list__items (the focused element)
		const path = event.composedPath() as Element[];
		const itemsEl = this.shadowRoot?.querySelector<HTMLElement>('.list__items');
		if (!itemsEl || !path.includes(itemsEl)) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				this.moveHighlight('next');
				break;
			case 'ArrowUp':
				event.preventDefault();
				this.moveHighlight('prev');
				break;
			case 'Home':
				event.preventDefault();
				this.moveHighlight('first');
				break;
			case 'End':
				event.preventDefault();
				this.moveHighlight('last');
				break;
			case 'Enter':
			case ' ': {
				event.preventDefault();
				const highlighted = this.getHighlighted();
				const items = this._getOptionItems();
				const target = highlighted ?? items[0];
				if (target) this._selectItem(target);
				break;
			}
		}
	};

	// — Listbox: focus / click ————————————————————————————————————————————————

	private _onListboxClick = (event: MouseEvent) => {
		if (this.type !== 'listbox') return;
		const path = event.composedPath() as Element[];
		const item = path.find(
			el => el instanceof Element && el.tagName.toLowerCase() === 'nldd-list-item',
		) as NLDDListItem | undefined;
		if (!item || item.hasAttribute('hidden')) return;
		this._setActiveDescendant(item);
		this._selectItem(item);
		// Self-driven mode: refocus the listbox container so arrow keys keep
		// working. Controlled mode: leave focus alone (it's on an external input).
		if (!this.controlled) {
			this.shadowRoot?.querySelector<HTMLElement>('.list__items')?.focus();
		}
	};

	private _onListboxFocus = () => {
		if (this.type !== 'listbox' || this.controlled || this._activeDescendantId) return;
		const items = this._getOptionItems();
		if (items.length === 0) return;
		const selected = items.find(i => i.selected);
		this._setActiveDescendant(selected ?? items[0]);
	};

	// — Listbox: public API ————————————————————————————————————————————————

	/**
	 * Move the highlight among visible options without moving focus. Wraps
	 * around at both ends. Use from a combobox controller that keeps focus on
	 * its input and mirrors `getHighlightedId()` into `aria-activedescendant`.
	 */
	public moveHighlight(direction: 'next' | 'prev' | 'first' | 'last'): void {
		const items = this._getOptionItems();
		if (items.length === 0) return;
		const current = items.findIndex(i => i.id === this._activeDescendantId);
		let next: number;
		switch (direction) {
			case 'first':
				next = 0;
				break;
			case 'last':
				next = items.length - 1;
				break;
			case 'next':
				next = current === -1 ? 0 : (current < items.length - 1 ? current + 1 : 0);
				break;
			case 'prev':
				next = current === -1 ? items.length - 1 : (current > 0 ? current - 1 : items.length - 1);
				break;
		}
		this._setActiveDescendant(items[next]);
	}

	/** Returns the currently highlighted option, or null if none. */
	public getHighlighted(): NLDDListItem | null {
		return this._getOptionItems().find(i => i.id === this._activeDescendantId) ?? null;
	}

	/** Returns the id of the currently highlighted option, or '' if none. */
	public getHighlightedId(): string {
		return this._activeDescendantId;
	}

	/** Dispatch `nldd-select` for the currently highlighted option. No-op if none. */
	public selectHighlighted(): void {
		const item = this.getHighlighted();
		if (item) this._selectItem(item);
	}

	/** Clear the highlight and `aria-activedescendant`. */
	public clearHighlight(): void {
		this._activeDescendantId = '';
		this._getItems().forEach(i => i.removeAttribute('highlighted'));
	}

	// — Listbox: internal helpers ————————————————————————————————————————————

	private _getOptionItems(): NLDDListItem[] {
		return this._getItems().filter(item => !item.hasAttribute('hidden'));
	}

	private _setActiveDescendant(item: NLDDListItem) {
		if (!item.id) {
			// Items assign their own id on connect, but be defensive
			item.id = `nldd-list-item-${Math.random().toString(36).slice(2, 9)}`;
		}
		this._activeDescendantId = item.id;
		this._getItems().forEach(i => {
			if (i === item) i.setAttribute('highlighted', '');
			else i.removeAttribute('highlighted');
		});
	}

	private _selectItem(item: NLDDListItem) {
		this.dispatchEvent(new CustomEvent<NLDDSelectEventDetail>('nldd-select', {
			detail: { item, selected: !item.selected },
			bubbles: true,
			composed: true,
		}));
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

	// — Drag: keyboard ———————————————————————————————————————————————————————

	// ArrowUp/ArrowDown on a focused drag handle moves the item immediately.
	// Mirrors nldd-document-tab-bar: no grab-and-drop cycle — each arrow press
	// reorders the DOM, fires nldd-reorder and restores focus on the handle.
	private _onKeyDown = (event: KeyboardEvent) => {
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
		return template(
			this._t('components.list.items-label-text'),
			this._hasHeader,
			this.type,
			this.controlled,
			this._activeDescendantId,
			this._isEmpty,
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-list': NLDDList;
	}
}

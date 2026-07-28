import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { listItemStyles } from './list-item.styles.js';
import { template } from './list-item.template.js';
import { isPointerMode } from '../../../utilities/input-modality.js';
import { withTranslations } from '../../../utilities/with-translations.js';
import { nlddListItemTranslations } from './list-item.i18n.js';
import type { NLDDList, ListType } from '../list/list.js';

export type ListItemSize = 'sm' | 'md';

/**
 * A row within an `nldd-list`. Renders as a link when `href` is set, as a
 * checkbox when `checkbox` is set, as a button when `button` is set, or as a
 * plain container otherwise. All cells and action segmented actions share one flat
 * slot, in source order.
 *
 * ## Geometry
 * Two rules govern every row:
 * 1. State fills always paint the WIDENED row geometry — the row box extended
 *    by the indicator inline inset on both sides — whether or not the row is
 *    interactive. Paint never differs between a selected plain row and a
 *    selected interactive row.
 * 2. The widened strip belongs to the ROW, never to a segment. A row with any
 *    action (its own `href`/`button`/`checkbox`, or a slotted segment) pulls
 *    itself outward (`is-interactive` host class → negative inline margin)
 *    and pads the row block back by the same amount, so content stays on the
 *    grid. A row-wide action owns that padding itself, making the whole
 *    widened box one hit area; slotted segmented actions stay in the grid, so their
 *    footprint is position-independent and tree columns line up at any depth.
 *
 * ## Divider
 * The divider spans the content width by default. Mark a cell with
 * `divider-start` and/or `divider-end` to run it from that cell's start edge
 * to that cell's end edge instead (e.g. starting after an avatar). Multiple
 * markers resolve as the union: first `divider-start` through last
 * `divider-end`. A start past the last end is an authoring error — the item
 * DEV-warns and falls back to the full content width.
 *
 * ## Disclosure
 * A branch row can disclose its children in two ways: a dedicated
 * `nldd-list-item-action[disclosure]` segment (only the chevron is clickable),
 * or the row itself as the control (`button` + `expanded`, the whole row
 * toggles). In the second case, mark the chevron's `nldd-icon-cell` with
 * `disclosure` and the row turns it with `expanded` — the same affordance,
 * without having to trade a clickable row for a turning chevron.
 *
 * `checkbox` makes the WHOLE row the control: the inner action becomes a
 * `role="checkbox"` button carrying `aria-checked`, it toggles `checked` on
 * activation and fires `change`. Slot a visual `nldd-checkbox` (or any glyph)
 * before the text and mark it `aria-hidden` + non-focusable — the row already
 * conveys role and state, and a second focusable control would double the tab
 * stops. Do NOT nest a real `<input type="checkbox">` in the action: interactive
 * content inside a `<button>` is invalid HTML and AT announces the button, not
 * the checked state. A `<label>` variant is not offered for the same reason it
 * cannot work — label-to-input association walks the DOM tree, and a slotted
 * input is not a descendant of a label in the shadow root.
 *
 * When it renders as a link, `target` and `rel`
 * are forwarded to the inner `<a>` (e.g. `target="_blank" rel="noopener noreferrer"`). With
 * `target="_blank"` the item also injects a visually hidden "opens in new tab"
 * announcement for assistive technology (WCAG 2.1 SC 3.2.2).
 *
 * The item synchronises its ARIA with its parent `nldd-list`'s `type`:
 * - `list` parent       → `role="listitem"`
 * - `navigation` parent → `role="listitem"` + `aria-current="page"` on the
 *   inner `<a>` / `<button>` when `selected`
 * - `listbox` parent    → `role="option"` + `aria-selected` reflecting `selected`.
 *   The list points its search input's `aria-activedescendant`
 *   at the active option via `_highlighted` (separate from `selected`).
 *
 * @element nldd-list-item
 *
 * @attr {'sm'|'md'} size - Row size (default: 'md'). Pushed onto the cells whose `size` means the same scale (nldd-text-cell, nldd-drag-handle-cell), so it is written once per row instead of once per cell. A size set on the cell itself wins. Cells where `size` means something else — pixels on nldd-icon-cell / nldd-spacer-cell, a heading scale on nldd-title-cell — are left alone.
 * @attr {boolean} selected - Marks the item as selected. Selection is consumer-managed; the list never sets it. In a `navigation` parent it puts `aria-current="page"` on the inner action, in a `listbox` parent it drives `aria-selected`.
 * @attr {boolean} button - Renders the item as a `<button>`; ignored when `href` is set (a link wins)
 * @attr {boolean} checkbox - Makes the whole row a `role="checkbox"` control; ignored when `href` is set
 * @attr {boolean} checked - Checked state of a `checkbox` row; the item toggles it on activation
 * @attr {boolean} expanded - Disclosure state. Drives the `children` group's visibility AND supplies `aria-expanded` — to the row's own control when the row is interactive, or to the segmented action marked `disclosure`. Written once either way; the item DEV-warns when there is nowhere for it to live.
 * @attr {string} href - Renders the item as an `<a>` with this URL. Takes precedence over `button`; without either the item is a plain container with no action.
 * @attr {string} target - Link target forwarded to the `<a>` (e.g. '_blank'); only applies with `href`. With '_blank' a visually hidden "opens in new tab" announcement is added for assistive technology.
 * @attr {string} rel - Link rel forwarded to the `<a>` (e.g. 'noopener noreferrer'); only applies with `href`
 * @attr {boolean} reorderable - Set by the parent `nldd-list` when its own `reorderable` is on (with `type="list"`); consumers do not set this. Serves as a CSS hook for drag handle visibility.
 *
 * @slot - Cells and segmented actions, in source order
 * @slot children - Child rows of a branch in an `nldd-list type="tree"`. Rendered as a `role="group"` below the row, hidden while `expanded` is false. The nesting IS the hierarchy, so aria-level / -posinset / -setsize are derived, not authored. The group has no styling of its own: repeat a spacer-cell per level to indent, or show depth some other way.
 *
 * @fires change - On a `checkbox` row after it toggles; detail: { checked: boolean }
 */
@customElement('nldd-list-item')
export class NLDDListItem extends withTranslations(LitElement, nlddListItemTranslations) {
	static override styles = [listItemStyles];

	@property({ reflect: true, converter: reflectNonDefault<ListItemSize>('md') })
	size: ListItemSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	/** When set, renders the item as a button; ignored when href is set. */
	@property({ type: Boolean, reflect: true })
	button = false;

	/** When set, the whole row is the checkbox control. Ignored when href is set. */
	@property({ type: Boolean, reflect: true })
	checkbox = false;

	/** Checked state of a `checkbox` row. Toggled by the item on activation. */
	@property({ type: Boolean, reflect: true })
	checked = false;

	/**
	 * Disclosure state of a row that opens something (a tree row's children, a
	 * details panel). Reflected as `aria-expanded` on the row's own control —
	 * `listitem` does not support the property, a `<button>` / `<a>` does. Leave
	 * the attribute off entirely when the row discloses nothing.
	 */
	@property({ type: Boolean, reflect: true })
	expanded?: boolean;

	/** When set, renders the item as a link. */
	@property({ reflect: true })
	href?: string;

	/**
	 * Link target (e.g. '_blank' to open in a new tab). Forwarded to the `<a>`; only applies with href.
	 * When set to '_blank', the item appends a visually hidden "opens in new tab" announcement to the
	 * link so the change of context is conveyed to assistive technology (WCAG 2.1 SC 3.2.2). Override
	 * the wording via the `translations` property.
	 */
	@property({ reflect: true })
	target?: string;

	/** Link rel (e.g. 'noopener noreferrer'). Forwarded to the `<a>`; only applies with href. */
	@property({ reflect: true })
	rel?: string;

	/** Set by the parent nldd-list when reorderable is enabled. Used as a CSS hook for drag handle visibility. */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	@state()
	private _showChildren = false;

	@state()
	private _parentType: ListType = 'list';

	/** Set by the parent nldd-list when `arrow-navigation` (roving tabindex) is on.
	 *  Switches the inner action from a normal tab stop to a roving one. */
	@state()
	_arrowNavigation = false;

	/** Set by the parent nldd-list: when arrow-navigation is on, exactly one item
	 *  is the roving entry point (tabindex 0); the rest are tabindex -1. */
	@state()
	_rovingActive = false;

	/** Set by the parent nldd-list in `type="listbox"`: marks this option as
	 *  highlighted — the active descendant the search input's `aria-activedescendant`
	 *  points at. Kept SEPARATE from `selected`: the highlight moves with the arrow
	 *  keys, selection stays consumer-managed. Named for the visual state (not
	 *  `_active`, which would clash with the pressed / `:active` feedback). */
	@state()
	_highlighted = false;

	@query('.list-item__action')
	private _action?: HTMLElement;

	private _isBoxed = false;

	@state()
	private _hasCheckedSegment = false;

	private _lightDomObserver: MutationObserver | null = null;

	/** Watches the row and its divider-marker cells for size changes; marker
	 *  insets are measured, so any reflow can move them. */
	private _dividerMarkerObserver: ResizeObserver | null = null;

	private _observedMarkerTargets: Element[] = [];

	private _warnedDegenerateDivider = false;

	override connectedCallback() {
		super.connectedCallback();
		// Before the children upgrade — see _captureAuthoredCellSizes.
		this._captureAuthoredCellSizes();
		// Skip setup for drag clones — they are visual-only copies inside nldd-list's shadow root
		if (this.hasAttribute('data-nldd-clone')) return;
		this.setAttribute('role', 'listitem');
		// Attach focus/click listeners here (not firstUpdated) so they are
		// re-attached when the element is removed and re-inserted into the DOM.
		// _action is resolved lazily via @query inside the handlers.
		this.addEventListener('focusin', this._handleFocusIn);
		this.addEventListener('focusout', this._handleFocusOut);
		this.addEventListener('click', this._handleClick);
		// Press feedback: shown on press, cleared on release or when a touch
		// turns into a scroll (the browser fires pointercancel for that pointer),
		// so `active` never sticks while the user scrolls the list.
		this.addEventListener('pointerdown', this._onPointerDown);
		this.addEventListener('pointerup', this._clearPressed);
		this.addEventListener('pointercancel', this._clearPressed);
		// Light-DOM state the row derives styling from: a checked checkbox-
		// segment (row-wide selected fill), which segmented actions own a row edge, and
		// the divider markers. Attribute observation, not events: consumers
		// also set these programmatically via setAttribute.
		this._lightDomObserver = new MutationObserver(() => this._onLightDomChange());
		this._lightDomObserver.observe(this, {
			subtree: true,
			childList: true,
			attributes: true,
			attributeFilter: ['checked', 'divider-start', 'divider-end'],
		});
		this._onLightDomChange();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('focusin', this._handleFocusIn);
		this.removeEventListener('focusout', this._handleFocusOut);
		this.removeEventListener('click', this._handleClick);
		this.removeEventListener('pointerdown', this._onPointerDown);
		this.removeEventListener('pointerup', this._clearPressed);
		this.removeEventListener('pointercancel', this._clearPressed);
		this._lightDomObserver?.disconnect();
		this._lightDomObserver = null;
		this._dividerMarkerObserver?.disconnect();
		this._dividerMarkerObserver = null;
	}

	private _onLightDomChange(): void {
		this._updateCheckedSegment();
		this._updateInteractive();
		this._measureDividerMarkers();
	}

	/** A checked checkbox-segment reads as "this row is selected", so the fill
	 *  covers the whole row — including a disclosure segment — instead of
	 *  stopping at the segmented action boundary. Scoped to own descendants: a checked
	 *  row in a nested branch must not light up its ancestors. */
	private _updateCheckedSegment(): void {
		this._hasCheckedSegment =
			this._ownDescendants('nldd-list-item-action[checkbox][checked]').length > 0;
	}

	/** A row with any action — its own href/button/checkbox or a slotted
	 *  segment — carries the widened geometry: negative host margin plus the
	 *  compensating row padding (see the geometry rules in the class doc).
	 *
	 *  An action segment at a row edge owns the padding for that side itself,
	 *  so the row drops its own there and the segmented action lands on the row's edge.
	 *  Stamped as classes because the CSS cannot ask: `:has()` is not allowed
	 *  inside `:host()`, and the row's own padding is what has to change — a
	 *  `::slotted()` rule could only reach the segmented action. */
	private _updateInteractive(): void {
		const interactive =
			!!this.href || this.button || this.checkbox ||
			this._ownDescendants('nldd-list-item-action').length > 0;
		this.classList.toggle('is-interactive', interactive);

		// The row's own children, not the branch's child rows: those go to the
		// `children` slot and render BELOW the row, so on a branch row the last
		// element child is a nested row rather than the row's trailing segment.
		const ownChildren = Array.from(this.children)
			.filter(el => el.getAttribute('slot') !== 'children');
		const isSegment = (el: Element | undefined) => el?.tagName.toLowerCase() === 'nldd-list-item-action';
		this.classList.toggle('has-leading-action', isSegment(ownChildren[0]));
		this.classList.toggle('has-trailing-action', isSegment(ownChildren[ownChildren.length - 1]));
	}

	override firstUpdated() {
		// Clones are visual-only copies inside nldd-list's shadow root: their
		// classes and stamped attributes came along with cloneNode, so no sync.
		if (this.hasAttribute('data-nldd-clone')) return;
		this._syncWithList();
		this._observeChildrenSlot();
		this._updateChildren();
		this._relayExpanded();
		// First measurement after the first render: the marker offsets need
		// laid-out boxes.
		this._measureDividerMarkers();
	}

	/**
	 * Cells whose `size` means the sm/md scale. NOT every cell: `size` on
	 * nldd-icon-cell and nldd-spacer-cell is a pixel value and on nldd-title-cell
	 * a 1-6 heading scale, so pushing 'sm' there would corrupt them.
	 */
	private static readonly SIZED_CELLS = 'nldd-text-cell, nldd-drag-handle-cell';

	/** Remembers the size a cell was authored with, so a later push can restore it. */
	private _ownCellSize = new WeakMap<Element, string | null>();

	/**
	 * The row's own descendants for `selector` — everything down to and inside
	 * its action segmented actions, but NOT inside a nested row. In a tree the child rows
	 * are DOM children of this row, so a plain querySelectorAll would push this
	 * row's state into theirs (a parent's `expanded` turning every nested
	 * chevron, its `size` overwriting theirs). A `:scope >` child selector is
	 * too strict the other way: cells legitimately sit one level deeper, inside
	 * an nldd-list-item-action.
	 */
	private _ownDescendants<T extends Element>(selector: string): T[] {
		return Array.from(this.querySelectorAll<T>(selector))
			.filter(el => el.closest('nldd-list-item') === this);
	}

	/**
	 * Records the authored `size` before the cells upgrade. Custom elements
	 * upgrade in document order, so the item's connectedCallback runs before its
	 * children's — the only moment an authored `size="md"` is still readable.
	 * After upgrade `reflectNonDefault` strips it, making it indistinguishable
	 * from no attribute at all.
	 */
	private _captureAuthoredCellSizes(): void {
		this._ownDescendants(NLDDListItem.SIZED_CELLS).forEach(cell => {
			if (!this._ownCellSize.has(cell)) {
				this._ownCellSize.set(cell, cell.getAttribute('size'));
			}
		});
	}

	/**
	 * Pushes the row's size onto its sized cells so `size="sm"` is written once
	 * instead of on the row and on every cell. An explicit size on the cell wins
	 * and survives later pushes.
	 */
	private _propagateSize(): void {
		this._captureAuthoredCellSizes();
		this._ownDescendants(NLDDListItem.SIZED_CELLS).forEach(cell => {
			const own = this._ownCellSize.get(cell);
			if (own !== null && own !== undefined) return;
			cell.setAttribute('size', this.size);
		});
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('selected') || changed.has('button') || changed.has('checkbox') || changed.has('href') || changed.has('_parentType')) {
			this._updateAriaState();
		}
		if (changed.has('button') || changed.has('checkbox') || changed.has('href')) {
			this._updateInteractive();
		}
		if (changed.has('expanded')) {
			this._relayExpanded();
			this._warnOnStrayExpanded();
		}
		this._propagateSize();
	}

	/**
	 * A row WITH children is a branch, and a branch is either open or closed —
	 * there is no third state. So an absent `expanded` reads as collapsed there,
	 * and aria-expanded is always emitted. On a row without children an absent
	 * attribute keeps its other meaning: this row discloses nothing, emit no
	 * aria-expanded at all. Without this split, `?expanded=\${false}` (which
	 * removes the attribute) would leave a branch that never collapses.
	 */
	private get _resolvedExpanded(): boolean | undefined {
		if (this._showChildren) return this.expanded === true;
		return this.expanded;
	}

	/** Segments marked `disclosure` announce the row's expanded state, so the
	 *  consumer writes it once — here, where it also drives the children group. */
	private _relayExpanded(): void {
		this._ownDescendants<HTMLElement & { _rowExpanded?: boolean }>('nldd-list-item-action[disclosure]')
			.forEach(action => { action._rowExpanded = this._resolvedExpanded; });
	}

	/** `expanded` needs a control to sit on; a plain container has none. */
	private _warnOnStrayExpanded(): void {
		if (!import.meta.env?.DEV) return;
		if (this.expanded === undefined) return;
		if (this.href || this.button || this.checkbox) return;
		if (this._ownDescendants('nldd-list-item-action[disclosure]').length > 0) return;
		console.warn('nldd-list-item: `expanded` needs somewhere to live — make the row interactive (href, button or checkbox), or mark the segmented action that does the disclosing with `disclosure`.');
	}

	/** True when the item is an option in a `type="listbox"` parent. */
	get _isListboxOption(): boolean {
		return this._parentType === 'listbox';
	}

	/**
	 * Reads the initial variant + type from the closest parent nldd-list, once in
	 * firstUpdated, so the item is styled correctly on first paint. Later changes
	 * are PUSHED by the list: its `updated` / `_updateItems` calls `_applyVariant`
	 * and `_applyParentType` on every item, so the list is the single source of
	 * truth and a runtime variant/type switch (or an item moved to another list)
	 * always tracks its current parent.
	 */
	private _syncWithList() {
		const list = this.closest<NLDDList>('nldd-list');
		if (!list) {
			if (import.meta.env?.DEV) {
				console.warn('nldd-list-item: no parent nldd-list found. Variant/type sync will not work if appended into a list after first render.');
			}
			return;
		}
		this._applyVariant(list.variant);
		this._applyParentType(list.type);
	}

	_applyVariant(variant: string) {
		this._isBoxed = variant === 'box';
		this._relayToChildren(item => item._applyVariant(variant));
		this.classList.toggle('is-boxed', this._isBoxed);
	}

	_applyParentType(type: ListType) {
		this._parentType = type;
		this._relayToChildren(item => item._applyParentType(type));
		// Segment actions need the list type too: in a listbox they degrade to a
		// plain container, since an `option` may not hold interactive descendants.
		// Own segmented actions only — nested rows get the relay above and push their own.
		this._ownDescendants<HTMLElement & { _applyParentType?: (t: string) => void }>('nldd-list-item-action')
			.forEach(action => action._applyParentType?.(type));
	}

	/** Nested rows sit in this item's `children` slot, not the list's, so a plain
	 *  `querySelector` from the list walks past them. */
	get childRows(): NLDDListItem[] {
		return Array.from(this.children)
			.filter(el => el.getAttribute('slot') === 'children' && el.tagName.toLowerCase() === 'nldd-list-item') as NLDDListItem[];
	}

	/** Every push the item receives is relayed one level down. */
	private _relayToChildren(fn: (item: NLDDListItem) => void): void {
		this.childRows.forEach(fn);
	}

	private _updateAriaState() {
		// In a listbox parent the item is an `option`, not a `listitem`, and
		// carries aria-selected so AT announces selection state. The active
		// option (the input's aria-activedescendant) is conveyed via `_highlighted`
		// (a highlight class), kept separate from selection.
		if (this._parentType === 'tree') {
			this.setAttribute('role', 'treeitem');
			this.removeAttribute('aria-selected');
		} else if (this._isListboxOption) {
			this.setAttribute('role', 'option');
			this.setAttribute('aria-selected', String(this.selected));
		} else {
			this.setAttribute('role', 'listitem');
			this.removeAttribute('aria-selected');
		}

		// aria-current on the inner action (link/button) — navigation only
		const action = this._action;
		if (this._parentType === 'navigation' && this.selected && action) {
			action.setAttribute('aria-current', 'page');
		} else {
			action?.removeAttribute('aria-current');
		}
	}

	/**
	 * Measures the divider markers and writes the result as `--_divider-inset-
	 * start/-end` on the host. No markers → the vars are cleared and CSS falls
	 * back to the content width. Union semantics: the divider runs from the
	 * FIRST `divider-start` to the LAST `divider-end`; a side without markers
	 * keeps its default. Insets are measured against the row block (the widened
	 * box on interactive rows), so the values compose with the edge geometry.
	 */
	private _measureDividerMarkers(): void {
		if (this.hasAttribute('data-nldd-clone')) return;
		const starts = this._ownDescendants('[divider-start]');
		const ends = this._ownDescendants('[divider-end]');

		// Re-target the resize observer ONLY when the marker set changed: every
		// observe() fires an initial notification, so retargeting on each
		// measurement would loop the observer on itself.
		const targets = starts.length || ends.length ? [this as Element, ...starts, ...ends] : [];
		const sameTargets = targets.length === this._observedMarkerTargets.length
			&& targets.every((target, i) => target === this._observedMarkerTargets[i]);
		if (!sameTargets) {
			this._dividerMarkerObserver?.disconnect();
			this._observedMarkerTargets = targets;
			if (targets.length) {
				this._dividerMarkerObserver ??= new ResizeObserver(() => this._measureDividerMarkers());
				targets.forEach(target => this._dividerMarkerObserver!.observe(target));
			} else {
				this._dividerMarkerObserver = null;
			}
		}
		if (targets.length === 0) {
			this.style.removeProperty('--_divider-inset-start');
			this.style.removeProperty('--_divider-inset-end');
			return;
		}

		const block = this.shadowRoot?.querySelector('.list-item');
		if (!block) return;
		const blockRect = block.getBoundingClientRect();
		if (blockRect.width === 0) return;
		const rtl = getComputedStyle(this).direction === 'rtl';
		const startInsetOf = (rect: DOMRect) =>
			rtl ? blockRect.right - rect.right : rect.left - blockRect.left;
		const endInsetOf = (rect: DOMRect) =>
			rtl ? rect.left - blockRect.left : blockRect.right - rect.right;

		// Union: smallest start inset (= first marker) and smallest end inset
		// (= last marker) win.
		const insetStart = starts.length
			? Math.min(...starts.map(el => startInsetOf(el.getBoundingClientRect())))
			: null;
		const insetEnd = ends.length
			? Math.min(...ends.map(el => endInsetOf(el.getBoundingClientRect())))
			: null;

		if (insetStart !== null && insetEnd !== null
			&& blockRect.width - insetStart - insetEnd <= 0) {
			// A start past the last end: authoring error, fall back to full width.
			if (import.meta.env?.DEV && !this._warnedDegenerateDivider) {
				this._warnedDegenerateDivider = true;
				console.warn('nldd-list-item: divider-start ligt voorbij de laatste divider-end; de divider valt terug op de volle contentbreedte.');
			}
			this.style.removeProperty('--_divider-inset-start');
			this.style.removeProperty('--_divider-inset-end');
			return;
		}
		if (insetStart !== null) this.style.setProperty('--_divider-inset-start', `${insetStart}px`);
		else this.style.removeProperty('--_divider-inset-start');
		if (insetEnd !== null) this.style.setProperty('--_divider-inset-end', `${insetEnd}px`);
		else this.style.removeProperty('--_divider-inset-end');
	}

	private _observeChildrenSlot() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="children"]');
		slot?.addEventListener('slotchange', () => this._updateChildren());
	}

	/** Renders the group only when there is something in it — an empty
	 *  `role="group"` would be an empty branch in the accessibility tree. */
	private _updateChildren() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="children"]');
		const rows = (slot?.assignedElements() ?? []).filter(el => el.tagName.toLowerCase() === 'nldd-list-item');
		const had = this._showChildren;
		this._showChildren = rows.length > 0;
		if (this._showChildren !== had) this._relayExpanded();
		if (this._showChildren) {
			// Nested rows are not in the list's own slot, so the list's pushes never
			// reach them. Relay what we were given, and they relay it downwards.
			rows.forEach(row => {
				const item = row as NLDDListItem;
				item._applyVariant?.(this._isBoxed ? 'box' : 'simple');
				item._applyParentType?.(this._parentType);
			});
		}
		if (!import.meta.env?.DEV) return;
		if (this._showChildren && this._parentType !== 'tree') {
			console.warn('nldd-list-item: `slot="children"` nests rows, which only carries meaning in an nldd-list with type="tree". Elsewhere the group has no owning tree and assistive technology cannot read the hierarchy.');
		}
		if (this._showChildren && this.expanded === undefined) {
			console.warn('nldd-list-item: a row with children needs `expanded` — without it there is no aria-expanded, so the branch reads as a leaf and the group can never be announced as collapsed.');
		}
	}

	private _handleClick = (e: Event) => {
		// Safari and Firefox on Mac don't focus buttons on click. Force focus
		// so :has(.list-item__action:focus) and :focus-within CSS work reliably.
		this._action?.focus();
		if (this.checkbox && !this.href && e.composedPath().includes(this._action as EventTarget)) {
			this.checked = !this.checked;
			this.dispatchEvent(new CustomEvent('change', {
				detail: { checked: this.checked },
				bubbles: true,
				composed: true,
			}));
		}
	};

	private _handleFocusIn = () => {
		// Safari treats programmatic focus (forced on click for Safari/Firefox)
		// as focus-visible. Opt out by marking pointer-originated focus with a
		// class the CSS uses to suppress the ::before focus ring. If JS fails,
		// is-pointer-focus is never set so the CSS selector still matches on
		// keyboard focus and the custom ring renders — accessible by default.
		this._action?.classList.toggle('is-pointer-focus', isPointerMode());
	};

	private _handleFocusOut = () => {
		this._action?.classList.remove('is-pointer-focus');
	};

	private _onPointerDown = (e: PointerEvent) => {
		// Primary button / touch / pen only (mouse right-click has button > 0).
		if (e.button > 0) return;
		// A branch's child rows are light-DOM children, so their pointer events
		// bubble through this row. Without this check, pressing a nested row
		// flashes the press state of every ancestor row above it.
		if (this._isFromNestedRow(e)) return;
		this._action?.classList.add('is-pressed');
	};

	/** Whether the event started in a row nested inside this one. Only the part
	 *  of the path BELOW this row counts — everything above it is this row's own
	 *  ancestry, which is where the event is heading, not where it came from. */
	private _isFromNestedRow(e: Event): boolean {
		const path = e.composedPath();
		const self = path.indexOf(this);
		return path
			.slice(0, self === -1 ? path.length : self)
			.some(el => el instanceof Element && el.localName === 'nldd-list-item');
	}

	private _clearPressed = () => {
		this._action?.classList.remove('is-pressed');
	};

	/**
	 * Delegates focus to the inner `.list-item__action` (the button or anchor),
	 * so consumers can call `listItemEl.focus()` without reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this._action?.focus(options);
	}

	override render() {
		const opensInNewTabLabel =
			this.href && this.target === '_blank'
				? this._t('components.list-item.opens-in-new-tab-label')
				: undefined;
		// Listbox options are never separate tab stops — only the list's own
		// search input is in the tab order, and active moves via
		// aria-activedescendant. Roving tabindex (arrow-navigation) supersedes
		// nothing here: the two modes are mutually exclusive on the parent list.
		// Otherwise, roving tabindex: when the list runs arrow-navigation,
		// exactly one item is the tab stop (0) and the rest are reachable only
		// via the arrow keys (-1). Off → undefined leaves the native
		// button/link as a normal tab stop.
		const actionTabindex = this._isListboxOption
			? '-1'
			: this._arrowNavigation
				? (this._rovingActive ? '0' : '-1')
				: undefined;
		return template(
			this.button,
			this.href,
			this.target,
			this.rel,
			opensInNewTabLabel,
			actionTabindex,
			this._highlighted,
			this.checkbox,
			this.checked,
			this._resolvedExpanded,
			this._showChildren,
			this._hasCheckedSegment,
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-list-item': NLDDListItem;
	}
}

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { listStyles } from './list.styles.js';
import { template } from './list.template.js';
import type { NLDDListItem } from '../list-item/list-item.js';
import { nlddListTranslations } from './list.i18n.js';
import type { NLDDListTranslations } from './list.i18n.js';

export type ListVariant = 'simple' | 'box' | 'box-on-tinted';

export interface NLDDReorderEventDetail {
	fromIndex: number;
	toIndex: number;
}

/**
 * A container for `nldd-list-item` elements, with optional header and footer slots.
 * When `reorderable` is set, items can be reordered by drag or keyboard.
 *
 * On reorder, the list dispatches `nldd-reorder` with `fromIndex` / `toIndex`
 * and expects the consumer to mutate the DOM (or their data model that
 * renders the DOM). Focus is restored to the moved item's drag handle via a
 * single `requestAnimationFrame` — this assumes the consumer reorders
 * **synchronously** in the event handler. Async renderers (React, Vue, …)
 * that update the DOM on a later tick will miss the focus restore and should
 * manage focus themselves after their render commits.
 *
 * @slot         - List items (`nldd-list-item`)
 * @slot header  - Content above the list body (e.g. `nldd-title`)
 * @slot footer  - Content below the list body (e.g. a short description)
 *
 * @fires nldd-reorder - Fired on successful drop: `{ fromIndex, toIndex }`
 */
@customElement('nldd-list')
export class NLDDList extends LitElement {
	static override styles = [listStyles];

	/** Visual style of the list. */
	@property({ reflect: true })
	variant: ListVariant = 'simple';

	/** Enables drag-to-reorder. Sets `draggable` on each `nldd-list-item`. */
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

	// — Drag state ——————————————————————————————————————————————————————————

	private _draggingEl: NLDDListItem | null = null;
	private _draggingFromIndex = -1;
	private _placeholder: HTMLDivElement | null = null;
	private _currentDropIndex = -1;
	private _pointerId: number | null = null;
	private _clone: HTMLDivElement | null = null;
	private _cloneOffsetY = 0;
	private _listRect: DOMRect | null = null;

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		slot?.addEventListener('slotchange', () => this._updateItems());
		this._updateItems();

		const headerSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="header"]');
		headerSlot?.addEventListener('slotchange', () => {
			this._hasHeader = (headerSlot.assignedElements().length > 0);
		});
	}

	override connectedCallback() {
		super.connectedCallback();
		this.addEventListener('pointerdown', this._onPointerDown);
		this.addEventListener('keydown', this._onKeyDown);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('pointerdown', this._onPointerDown);
		this.removeEventListener('keydown', this._onKeyDown);
		this._cancelDrag();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('reorderable')) {
			this._updateItems();
		}
		if (changed.has('translations')) {
			this._mergedTranslations = { ...nlddListTranslations, ...this.translations };
		}
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
		items.forEach((item, index) => {
			item.classList.toggle('is-last', index === items.length - 1);
			if (this.reorderable) {
				item.setAttribute('reorderable', '');
			} else {
				item.removeAttribute('reorderable');
			}
		});
	}

	// — Drag: pointer ————————————————————————————————————————————————————————

	private _onPointerDown = (event: PointerEvent) => {
		if (!this.reorderable) return;

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
		if (!this.reorderable) return;
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
		this._announce(this._t('components.list.drag-moved-text', { position: targetIndex + 1 }));

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
			this._announce(this._t('components.list.drag-dropped-text', { position: toIndex + 1 }));

			// Restore focus to the drag handle on the moved item after the
			// consumer has had a chance to reorder the DOM in response to nldd-reorder.
			requestAnimationFrame(() => {
				const handle = movedItem
					.querySelector('[reorderable-only]')
					?.shadowRoot?.querySelector<HTMLElement>('button');
				handle?.focus();
			});
		} else {
			this._announce(this._t('components.list.drag-no-change-text'));
		}
	}

	private _cancelDrag() {
		if (!this._draggingEl) return;
		this._cleanupDrag();
		this._announce(this._t('components.list.drag-cancelled-text'));
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
		return template(this._t('components.list.items-label-text'), this._hasHeader);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-list': NLDDList;
	}
}

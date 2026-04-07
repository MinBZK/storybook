import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './ndd-list.styles.ts';
import { template } from './ndd-list.template.ts';
import type { NDDListItem } from '../list-item/ndd-list-item.ts';
import { nddListTranslations } from './ndd-list.i18n.ts';
import type { NDDListTranslations } from './ndd-list.i18n.ts';

export type ListVariant = 'simple' | 'box' | 'inset';

export interface NDDReorderEventDetail {
	fromIndex: number;
	toIndex: number;
}

/**
 * A container for `ndd-list-item` elements, with optional header and footer slots.
 * When `reorderable` is set, items can be reordered by drag or keyboard.
 *
 * @slot         - List items (`ndd-list-item`)
 * @slot header  - Content above the list body (e.g. `ndd-title`)
 * @slot footer  - Content below the list body (e.g. a short description)
 *
 * @fires ndd-reorder - Fired on successful drop: `{ fromIndex, toIndex }`
 */
@customElement('ndd-list')
export class NDDList extends LitElement {
	static override styles = [styles];

	/** Visual style of the list. */
	@property({ reflect: true })
	variant: ListVariant = 'simple';

	/** Enables drag-to-reorder. Sets `draggable` on each `ndd-list-item`. */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	/** Override one or more translation keys. Unset keys fall back to the Dutch default. */
	@property({ type: Object })
	translations: Partial<NDDListTranslations> = {};

	@state()
	private _mergedTranslations = { ...nddListTranslations };

	@state()
	private _hasHeader = false;

	// — Drag state ——————————————————————————————————————————————————————————

	private _draggingEl: NDDListItem | null = null;
	private _draggingFromIndex = -1;
	private _placeholder: HTMLDivElement | null = null;
	private _currentDropIndex = -1;
	private _keyboardDragging = false;
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
			this._mergedTranslations = { ...nddListTranslations, ...this.translations };
		}
	}

	// — Items ————————————————————————————————————————————————————————————————

	private _getItems(): NDDListItem[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		return (slot?.assignedElements() ?? []).filter(
			(el) => el.tagName.toLowerCase() === 'ndd-list-item' && !el.hasAttribute('data-ndd-placeholder'),
		) as NDDListItem[];
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
			(el) => el instanceof Element && el.hasAttribute('draggable-only'),
		);
		if (!hasDragHandle) return;

		const item = path.find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'ndd-list-item',
		) as NDDListItem | undefined;
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
			// ndd-list-item is display:contents so its own rect is zero — use the inner element
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

	private _onKeyDown = (event: KeyboardEvent) => {
		if (!this.reorderable) return;

		if (this._keyboardDragging) {
			switch (event.key) {
				case 'ArrowUp': {
					event.preventDefault();
					const current = this._getDropIndex();
					this._setDropIndex(Math.max(0, current - 1));
					this._announce(this._dragPositionAnnouncement());
					if (this._draggingEl) this._setDragHandleLabel(this._draggingEl, this._dragPositionLabel());
					break;
				}
				case 'ArrowDown': {
					event.preventDefault();
					const items = this._getItems();
					const current = this._getDropIndex();
					this._setDropIndex(Math.min(items.length - 1, current + 1));
					this._announce(this._dragPositionAnnouncement());
					if (this._draggingEl) this._setDragHandleLabel(this._draggingEl, this._dragPositionLabel());
					break;
				}
				case 'Enter':
				case ' ':
					event.preventDefault();
					this._endDrag();
					break;
				case 'Escape':
					event.preventDefault();
					this._cancelDrag();
					break;
			}
			return;
		}

		if (event.key !== ' ' && event.key !== 'Enter') return;

		const path = event.composedPath() as Element[];
		const hasDragHandle = path.some(
			(el) => el instanceof Element && el.hasAttribute('draggable-only'),
		);
		if (!hasDragHandle) return;

		const item = path.find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'ndd-list-item',
		) as NDDListItem | undefined;
		if (!item) return;

		event.preventDefault();
		this._keyboardDragging = true;
		this._startDrag(item);
		this._announce(this._t('components.list.drag-grabbed-text'), true);
		this._setDragHandleLabel(item, this._dragPositionLabel());
	};

	// — Drag: core ———————————————————————————————————————————————————————————

	private _startDrag(item: NDDListItem, clientY = 0) {
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
		this._placeholder.className = 'ndd-list-drag-placeholder';
		this._placeholder.setAttribute('aria-hidden', 'true');
		this._placeholder.setAttribute('data-ndd-placeholder', '');
		this._placeholder.style.height = `${rect.height}px`;
		item.after(this._placeholder);

		item.classList.add('is-dragging');

		// Pointer drag: hide the original and show a floating clone
		// Keyboard drag: keep the item visible (dimmed) so the user sees what they grabbed
		if (!this._keyboardDragging) {
			item.classList.add('is-dragging-pointer');
			this._listRect = this.getBoundingClientRect();
			this._cloneOffsetY = clientY - rect.top;

			// Clone the host (carries slotted light DOM), keep draggable so consumer
			// CSS doesn't hide draggable-only cells in the clone
			const hostClone = item.cloneNode(true) as HTMLElement;
			hostClone.classList.remove('is-dragging');
			hostClone.classList.remove('is-dragging-pointer');
			hostClone.setAttribute('data-ndd-clone', '');

			this._clone = document.createElement('div');
			this._clone.className = 'list__drag-clone';
			this._clone.style.setProperty('--_drag-clone-top', `${clientY - this._listRect.top - this._cloneOffsetY}px`);
			this._clone.style.setProperty('--_drag-clone-left', `${rect.left - this._listRect.left}px`);
			this._clone.style.setProperty('--_drag-clone-width', `${rect.width}px`);
			this._clone.style.setProperty('--_drag-clone-height', `${rect.height}px`);
			this._clone.appendChild(hostClone);
			this.renderRoot.appendChild(this._clone);
		}
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
				new CustomEvent<NDDReorderEventDetail>('ndd-reorder', {
					detail: { fromIndex, toIndex },
					bubbles: true,
					composed: true,
				}),
			);
			this._announce(this._t('components.list.drag-dropped-text', { position: toIndex + 1 }));

			// Restore focus to the drag handle on the moved item after the
			// consumer has had a chance to reorder the DOM in response to ndd-reorder.
			requestAnimationFrame(() => {
				const handle = movedItem
					.querySelector('[draggable-only]')
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
		if (this._draggingEl) this._setDragHandleLabel(this._draggingEl);
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
		this._keyboardDragging = false;
	}

	// — i18n ————————————————————————————————————————————————————————————————

	private _t(key: keyof NDDListTranslations, vars?: Record<string, string | number>): string {
		let str = this._mergedTranslations[key];
		if (vars) {
			for (const [k, v] of Object.entries(vars)) {
				str = str.replace(`{${k}}`, String(v));
			}
		}
		return str;
	}


	// Sets or clears the aria-label on the active keyboard drag handle button directly
	private _setDragHandleLabel(item: NDDListItem, label?: string) {
		const handle = item
			.querySelector('[draggable-only]')
			?.shadowRoot?.querySelector<HTMLElement>('button');
		if (!handle) return;
		if (label) {
			handle.setAttribute('aria-label', label);
		} else {
			handle.removeAttribute('aria-label');
		}
	}

	// — Accessibility ————————————————————————————————————————————————————————

	private _dragPositionLabel(): string {
		const items = this._getItems();
		const pos = this._getDropIndex() + 1;
		return this._t('components.list.drag-handle-active-label-text', { position: pos, total: items.length });
	}

	private _dragPositionAnnouncement(): string {
		const items = this._getItems();
		const pos = this._getDropIndex() + 1;
		return this._t('components.list.drag-position-text', { position: pos, total: items.length });
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
		'ndd-list': NDDList;
	}
}

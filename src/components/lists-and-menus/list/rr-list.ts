import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styles } from './rr-list.styles.ts';
import { template } from './rr-list.template.ts';
import type { RrListItem } from '../list-item/rr-list-item.ts';

export type ListVariant = 'simple' | 'box' | 'inset';

export interface RrReorderEventDetail {
	fromIndex: number;
	toIndex: number;
}

/**
 * A container for `rr-list-item` elements, with optional header and footer slots.
 * When `draggable` is set, items can be reordered by drag or keyboard.
 *
 * @slot         - List items (`rr-list-item`)
 * @slot header  - Content above the list body (e.g. `rr-title-bar`)
 * @slot footer  - Content below the list body (e.g. a short description)
 *
 * @fires rr-reorder - Fired on successful drop: `{ fromIndex, toIndex }`
 */
@customElement('rr-list')
export class RrList extends LitElement {
	static override styles = [styles];

	/** Visual style of the list. */
	@property({ reflect: true })
	variant: ListVariant = 'simple';

	/** Enables drag-to-reorder. Sets `draggable` on each `rr-list-item`. */
	@property({ type: Boolean, reflect: true })
	override draggable = false;

	// — Drag state ——————————————————————————————————————————————————————————

	private _draggingEl: RrListItem | null = null;
	private _draggingFromIndex = -1;
	private _placeholder: HTMLDivElement | null = null;
	private _currentDropIndex = -1;
	private _keyboardDragging = false;
	private _pointerId: number | null = null;

	// — Lifecycle ————————————————————————————————————————————————————————————

	override firstUpdated() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		slot?.addEventListener('slotchange', () => this._updateItems());
		this._updateItems();
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
		if (changed.has('draggable')) {
			this._updateItems();
		}
	}

	// — Items ————————————————————————————————————————————————————————————————

	private _getItems(): RrListItem[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot:not([name])');
		return (slot?.assignedElements() ?? []).filter(
			(el) => el.tagName.toLowerCase() === 'rr-list-item',
		) as RrListItem[];
	}

	private _updateItems() {
		const items = this._getItems();
		items.forEach((item, index) => {
			item.classList.toggle('is-last', index === items.length - 1);
			if (this.draggable) {
				item.setAttribute('draggable', 'true');
			} else {
				item.removeAttribute('draggable');
			}
		});
	}

	// — Drag: pointer ————————————————————————————————————————————————————————

	private _onPointerDown = (event: PointerEvent) => {
		if (!this.draggable) return;

		const path = event.composedPath() as Element[];
		const hasDragHandle = path.some(
			(el) => el instanceof Element && el.hasAttribute('draggable-only'),
		);
		if (!hasDragHandle) return;

		const item = path.find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'rr-list-item',
		) as RrListItem | undefined;
		if (!item) return;

		event.preventDefault();
		this._startDrag(item, event.clientY);
		this._pointerId = event.pointerId;
		this.setPointerCapture(event.pointerId);
		this.addEventListener('pointermove', this._onPointerMove);
		this.addEventListener('pointerup', this._onPointerUp);
		this.addEventListener('pointercancel', this._onPointerCancel);
	};

	private _onPointerMove = (event: PointerEvent) => {
		if (!this._draggingEl || !this._placeholder) return;

		// Move floating clone
		if (this._clone) {
			this._clone.style.top = `${event.clientY - this._cloneOffsetY}px`;
		}

		const items = this._getItems();
		const nonDragging = items.filter((i) => i !== this._draggingEl);
		const pointerY = event.clientY;

		let toIndex = nonDragging.length; // default: end

		for (let i = 0; i < nonDragging.length; i++) {
			// rr-list-item is display:contents so its own rect is zero — use the inner element
			const inner = nonDragging[i].shadowRoot?.querySelector('.list-item') ?? nonDragging[i];
			const rect = inner.getBoundingClientRect();
			if (pointerY < rect.top + rect.height / 2) {
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
		if (!this.draggable) return;

		if (this._keyboardDragging) {
			switch (event.key) {
				case 'ArrowUp': {
					event.preventDefault();
					const current = this._getDropIndex();
					this._setDropIndex(Math.max(0, current - 1));
					this._announce(this._dragPositionLabel());
					break;
				}
				case 'ArrowDown': {
					event.preventDefault();
					const items = this._getItems();
					const current = this._getDropIndex();
					this._setDropIndex(Math.min(items.length - 1, current + 1));
					this._announce(this._dragPositionLabel());
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

		if (event.key !== ' ') return;

		const path = event.composedPath() as Element[];
		const hasDragHandle = path.some(
			(el) => el instanceof Element && el.hasAttribute('draggable-only'),
		);
		if (!hasDragHandle) return;

		const item = path.find(
			(el) => el instanceof Element && el.tagName.toLowerCase() === 'rr-list-item',
		) as RrListItem | undefined;
		if (!item) return;

		event.preventDefault();
		this._keyboardDragging = true;
		this._startDrag(item);
		this._announce(
			'Item grabbed. Use arrow keys to reorder, Space or Enter to drop, Escape to cancel.',
		);
	};

	// — Drag: core ———————————————————————————————————————————————————————————

	private _startDrag(item: RrListItem, clientY: number) {
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
		this._placeholder.className = 'rr-list-drag-placeholder';
		this._placeholder.setAttribute('aria-hidden', 'true');
		this._placeholder.style.height = `${rect.height}px`;
		item.after(this._placeholder);

		item.classList.add('is-dragging');
		item.setAttribute('aria-grabbed', 'true');

		// Pointer drag: hide the original and show a floating clone
		// Keyboard drag: keep the item visible (dimmed) so the user sees what they grabbed
		if (!this._keyboardDragging) {
			item.classList.add('is-dragging-pointer');
			this._cloneOffsetY = clientY - rect.top;

			// Clone the host (carries slotted light DOM), keep draggable so consumer
			// CSS doesn't hide draggable-only cells in the clone
			const hostClone = item.cloneNode(true) as HTMLElement;
			hostClone.classList.remove('is-dragging');
			hostClone.classList.remove('is-dragging-pointer');

			this._clone = document.createElement('div');
			this._clone.style.cssText = `
				position: fixed;
				top: ${clientY - this._cloneOffsetY}px;
				left: ${rect.left}px;
				width: ${rect.width}px;
				height: ${rect.height}px;
				pointer-events: none;
				opacity: 0.95;
				border-radius: var(--components-list-item-indicator-corner-radius);
				background: var(--semantics-surfaces-background-color);
				z-index: 9999;
				overflow: hidden;
			`;
			this._clone.appendChild(hostClone);
			document.body.appendChild(this._clone);
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

		this._cleanupDrag();

		if (fromIndex !== toIndex) {
			this.dispatchEvent(
				new CustomEvent<RrReorderEventDetail>('rr-reorder', {
					detail: { fromIndex, toIndex },
					bubbles: true,
					composed: true,
				}),
			);
		}

		this._announce(`Item dropped at position ${toIndex + 1}.`);
	}

	private _cancelDrag() {
		if (!this._draggingEl) return;
		this._cleanupDrag();
		this._announce('Drag cancelled.');
	}

	private _cleanupDrag() {
		this._draggingEl?.classList.remove('is-dragging');
		this._draggingEl?.classList.remove('is-dragging-pointer');
		this._draggingEl?.removeAttribute('aria-grabbed');
		this._placeholder?.remove();
		this._clone?.remove();

		if (this._pointerId !== null) {
			try { this.releasePointerCapture(this._pointerId); } catch { /* noop */ }
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
		this._currentDropIndex = -1;
		this._keyboardDragging = false;
	}

	// — Accessibility ————————————————————————————————————————————————————————

	private _dragPositionLabel(): string {
		const items = this._getItems();
		const pos = this._getDropIndex() + 1;
		return `Position ${pos} of ${items.length}.`;
	}

	private _announce(message: string) {
		const region = this.shadowRoot?.querySelector<HTMLElement>('.list__announcer');
		if (!region) return;
		region.textContent = '';
		// Timeout forces screen readers to register the content change
		setTimeout(() => {
			region.textContent = message;
		}, 50);
	}

	override render() {
		return template();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-list': RrList;
	}
}

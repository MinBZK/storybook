import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './ndd-list-item.styles.ts';
import { template } from './ndd-list-item.template.ts';
import { isKeyboardMode } from '../../../utilities/keyboard-mode.js';
import type { NDDList } from '../list/ndd-list.ts';
import '../cells/spacer-cell/ndd-spacer-cell.ts';

export type ListItemSize = 'sm' | 'md';
export type ListItemType = 'button' | 'link';

/**
 * A row within an `ndd-list`, providing layout for start, main and end areas.
 * Can render as a button, link, or plain container depending on `type`.
 *
 * @slot         - Main content area (cells)
 * @slot start   - Content at the start of the row
 * @slot end     - Content at the end of the row
 */
@customElement('ndd-list-item')
export class NDDListItem extends LitElement {
	static override styles = [styles];

	@property({ reflect: true })
	size: ListItemSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	highlighted = false;

	/** When set, renders the item as a button or link. */
	@property({ reflect: true })
	type?: ListItemType;

	/** URL for when type="link". */
	@property({ reflect: true })
	href?: string;

	/** Set by the parent ndd-list when reorderable is enabled. Used as a CSS hook for drag handle visibility. */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	@state()
	private _showStart = false;

	@state()
	private _showEnd = false;

	private _isBoxOrInset = false;
	private _listObserver: MutationObserver | null = null;

	override connectedCallback() {
		super.connectedCallback();
		// Skip setup for drag clones — they are visual-only copies inside ndd-list's shadow root
		if (this.hasAttribute('data-ndd-clone')) return;
		this.setAttribute('role', 'listitem');
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._listObserver?.disconnect();
		this._listObserver = null;
	}

	override firstUpdated() {
		if (this.hasAttribute('data-ndd-clone')) {
			// Clone is visual-only — skip list sync but still observe slots
			// so start/end areas render correctly based on cloned light DOM
			this._observeStartSlot();
			this._observeEndSlot();
			return;
		}
		this._syncWithList();
		this._observeStartSlot();
		this._observeEndSlot();
		this._observeHighlight();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('selected')) {
			this._propagateSelected();
			if (this.selected && this._isFocused) {
				this.highlighted = true;
			}
		}
		if (changed.has('highlighted')) {
			this._propagateHighlighted();
		}
	}

	/**
	 * Syncs the item with the closest parent ndd-list variant.
	 * Called once in firstUpdated. If the item is moved to a different ndd-list
	 * after first render, the MutationObserver will still watch the original list.
	 * This is acceptable as moving items between lists is not a supported use case.
	 */
	private _syncWithList() {
		const list = this.closest<NDDList>('ndd-list');
		if (!list) {
			if (import.meta.env?.DEV) {
				console.warn('ndd-list-item: no parent ndd-list found. Variant sync will not work if appended into a list after first render.');
			}
			return;
		}
		this._applyVariant(list.variant);
		this._listObserver = new MutationObserver(() => {
			this._applyVariant(list.variant);
		});
		this._listObserver.observe(list, {
			attributes: true,
			attributeFilter: ['variant'],
		});
	}

	private _applyVariant(variant: string) {
		this._isBoxOrInset = variant === 'box' || variant === 'inset';
		this.classList.toggle('is-boxed', this._isBoxOrInset);
		this._updateVisibility();
	}

	private _updateVisibility() {
		const startSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="start"]');
		const endSlot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="end"]');
		this._showStart = this._isBoxOrInset || (startSlot?.assignedElements().length ?? 0) > 0;
		this._showEnd = this._isBoxOrInset || (endSlot?.assignedElements().length ?? 0) > 0;
	}

	private _observeStartSlot() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="start"]');
		slot?.addEventListener('slotchange', () => this._updateVisibility());
	}

	private _observeEndSlot() {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="end"]');
		slot?.addEventListener('slotchange', () => this._updateVisibility());
	}

	private _isFocused = false;

	private _observeHighlight() {
		const action = this.shadowRoot?.querySelector<HTMLElement>('.list-item__action');
		// Safari and Firefox on Mac don't focus buttons on click. Force focus
		// so :has(.list-item__action:focus) and highlight logic work consistently.
		action?.addEventListener('click', () => action.focus());

		this.addEventListener('focusin', () => {
			this._isFocused = true;
			action?.classList.toggle('is-keyboard-focus', isKeyboardMode());
			if (this.selected) this.highlighted = true;
		});
		this.addEventListener('focusout', () => {
			this._isFocused = false;
			action?.classList.remove('is-keyboard-focus');
			this.highlighted = false;
		});
	}

	private _propagateHighlighted() {
		const slots = this.shadowRoot?.querySelectorAll('slot');
		slots?.forEach((slot) => {
			slot.assignedElements({ flatten: true }).forEach((el) => {
				if (this.highlighted) {
					el.setAttribute('highlighted', '');
				} else {
					el.removeAttribute('highlighted');
				}
			});
		});
	}

	private _propagateSelected() {
		const slots = this.shadowRoot?.querySelectorAll('slot');
		slots?.forEach((slot) => {
			slot.assignedElements({ flatten: true }).forEach((el) => {
				if (this.selected) {
					el.setAttribute('selected', '');
				} else {
					el.removeAttribute('selected');
				}
			});
		});
	}

	override render() {
		return template(this.type, this.href, this._showStart, this._showEnd);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-list-item': NDDListItem;
	}
}

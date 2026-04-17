import { LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styles } from './ndd-list-item.styles.ts';
import { template } from './ndd-list-item.template.ts';
import { isPointerMode } from '../../../utilities/input-modality.js';
import type { NDDList } from '../list/ndd-list.ts';
import '../cells/spacer-cell/ndd-spacer-cell.ts';

export type ListItemSize = 'sm' | 'md';
export type ListItemType = 'button';

/**
 * A row within an `ndd-list`, providing layout for start, main and end areas.
 * Renders as a link when `href` is set, as a button when `type="button"`, or
 * as a plain container otherwise.
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

	/** When set, renders the item as a button. */
	@property({ reflect: true })
	type?: ListItemType;

	/** When set, renders the item as a link (overrides type). */
	@property({ reflect: true })
	href?: string;

	/** Set by the parent ndd-list when reorderable is enabled. Used as a CSS hook for drag handle visibility. */
	@property({ type: Boolean, reflect: true })
	reorderable = false;

	@state()
	private _showStart = false;

	@state()
	private _showEnd = false;

	@query('.list-item__action')
	private _action?: HTMLElement;

	private _isBoxOrInset = false;
	private _listObserver: MutationObserver | null = null;

	override connectedCallback() {
		super.connectedCallback();
		// Skip setup for drag clones — they are visual-only copies inside ndd-list's shadow root
		if (this.hasAttribute('data-ndd-clone')) return;
		this.setAttribute('role', 'listitem');
		// Attach focus/click listeners here (not firstUpdated) so they are
		// re-attached when the element is removed and re-inserted into the DOM.
		// _action is resolved lazily via @query inside the handlers.
		this.addEventListener('focusin', this._handleFocusIn);
		this.addEventListener('focusout', this._handleFocusOut);
		this.addEventListener('click', this._handleClick);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._listObserver?.disconnect();
		this._listObserver = null;
		this.removeEventListener('focusin', this._handleFocusIn);
		this.removeEventListener('focusout', this._handleFocusOut);
		this.removeEventListener('click', this._handleClick);
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

	private _handleClick = () => {
		// Safari and Firefox on Mac don't focus buttons on click. Force focus
		// so :has(.list-item__action:focus) and :focus-within CSS work reliably.
		this._action?.focus();
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

	override render() {
		return template(this.type, this.href, this._showStart, this._showEnd);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-list-item': NDDListItem;
	}
}

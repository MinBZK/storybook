import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styles } from './rr-list-item.styles.ts';
import { template } from './rr-list-item.template.ts';
import type { RRList } from '../list/rr-list.ts';
import '../cells/spacer-cell/rr-spacer-cell.ts';

export type ListItemSize = 'sm' | 'md';
export type ListItemType = 'button' | 'link';

/**
 * A row within an `rr-list`, providing layout for start, main and end areas.
 * Can render as a button, link, or plain container depending on `type`.
 *
 * @slot         - Main content area (cells)
 * @slot start   - Content at the start of the row
 * @slot end     - Content at the end of the row
 */
@customElement('rr-list-item')
export class RRListItem extends LitElement {
	static override styles = [styles];

	@property({ reflect: true })
	size: ListItemSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	/** When set, renders the item as a button or link. */
	@property({ reflect: true })
	type?: ListItemType;

	/** URL for when type="link". */
	@property({ reflect: true })
	href?: string;

	@state()
	private _showStart = false;

	@state()
	private _showEnd = false;

	private _isBoxOrInset = false;
	private _listObserver: MutationObserver | null = null;

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._listObserver?.disconnect();
		this._listObserver = null;
	}

	override firstUpdated() {
		this._syncWithList();
		this._observeStartSlot();
		this._observeEndSlot();
	}

	override updated(changed: Map<string, unknown>) {
		if (changed.has('selected')) {
			this._propagateSelected();
		}
	}

	private _syncWithList() {
		const list = this.closest<RRList>('rr-list');
		if (!list) return;
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

	private _propagateSelected() {
		const slots = this.shadowRoot?.querySelectorAll('slot');
		slots?.forEach((slot) => {
			slot.assignedElements({ flatten: true })
				.filter((el) => el.tagName.toLowerCase().endsWith('-cell'))
				.forEach((el) => {
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
		'rr-list-item': RRListItem;
	}
}

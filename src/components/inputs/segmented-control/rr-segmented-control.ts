/**
 * RegelRecht Segmented Control Component (Lit + TypeScript)
 *
 * A horizontal group of mutually exclusive (radio) or multi-select (checkbox) options.
 * Exports both RRSegmentedControl and RRSegmentedControlItem.
 *
 * @element rr-segmented-control
 * @attr {string}  value         - Selected value (radio) or space-separated values (checkbox)
 * @attr {string}  size          - Control size: 'sm' | 'md' (default: 'md')
 * @attr {string}  type          - Input type: 'radio' | 'checkbox' (default: 'radio')
 * @attr {string}  content-type  - Content type for all items: 'text' | 'icon' (default: 'text')
 * @attr {boolean} disabled      - Disabled state for all items
 * @attr {boolean} full-width    - Stretches to fill the container width
 * @attr {string}  name          - Name for form submission, forwarded to native inputs
 *
 * @fires change - When selection changes; detail: { value: string } for radio,
 *                 detail: { values: string[] } for checkbox
 *
 * @slot - rr-segmented-control-item elements
 *
 * ---
 *
 * @element rr-segmented-control-item
 * @attr {string}  value        - Value for this item
 * @attr {boolean} selected     - Whether this item is selected (set by parent)
 * @attr {boolean} disabled     - Disabled state
 *
 * @slot         - Text label content (shown when parent content-type="text")
 * @slot icon    - Icon content (shown when parent content-type="icon")
 *
 * @fires select - When item is activated; detail: { value: string, checked: boolean }
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	segmentedControlStyles,
	segmentedControlItemStyles,
} from './rr-segmented-control.styles.ts';
import {
	segmentedControlTemplate,
	segmentedControlItemTemplate,
} from './rr-segmented-control.template.ts';
import './../../content/icon/rr-icon.ts';

export type SegmentedControlSize = 'sm' | 'md';
export type SegmentedControlType = 'radio' | 'checkbox';
export type SegmentedControlContentType = 'text' | 'icon';


// # rr-segmented-control-item

@customElement('rr-segmented-control-item')
export class RRSegmentedControlItem extends LitElement {
	static override styles = segmentedControlItemStyles;

	@property({ type: String })
	value = '';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Set by rr-segmented-control. Not part of the public API. */
	@property({ type: String, reflect: true })
	size: SegmentedControlSize = 'md';

	/** Set by rr-segmented-control. Not part of the public API. */
	@property({ type: String, reflect: true, attribute: 'content-type' })
	contentType: SegmentedControlContentType = 'text';

	/** Set by rr-segmented-control. Not part of the public API. */
	@property({ type: String, reflect: true, attribute: 'input-type' })
	inputType: SegmentedControlType = 'radio';

	/** Set by rr-segmented-control. Not part of the public API. */
	@property({ type: String })
	groupName = '';

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.dispatchEvent(new CustomEvent('item-change', {
			detail: { value: this.value, checked: input.checked },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return segmentedControlItemTemplate(this);
	}
}


// # rr-segmented-control

@customElement('rr-segmented-control')
export class RRSegmentedControl extends LitElement {
	static override styles = segmentedControlStyles;

	/** Selected value for radio, or space-separated selected values for checkbox. */
	@property({ type: String, reflect: true })
	value = '';

	@property({ type: String, reflect: true })
	size: SegmentedControlSize = 'md';

	@property({ type: String, reflect: true })
	type: SegmentedControlType = 'radio';

	/** Content type applied to all items. Mixing text and icon items is not supported. */
	@property({ type: String, reflect: true, attribute: 'content-type' })
	contentType: SegmentedControlContentType = 'text';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: String })
	name = '';

	// — Lifecycle ——————————————————————————————————————————————————————————————

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', this.type === 'checkbox' ? 'group' : 'radiogroup');
		this.addEventListener('item-change', this._handleItemChange as EventListener);
		this.addEventListener('keydown', this._handleKeydown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('item-change', this._handleItemChange as EventListener);
		this.removeEventListener('keydown', this._handleKeydown);
	}

	override firstUpdated(): void {
		this._syncItems();
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (
			changedProperties.has('value') ||
			changedProperties.has('size') ||
			changedProperties.has('disabled') ||
			changedProperties.has('type') ||
			changedProperties.has('contentType') ||
			changedProperties.has('name')
		) {
			this._syncItems();
		}
		if (changedProperties.has('type')) {
			this.setAttribute('role', this.type === 'checkbox' ? 'group' : 'radiogroup');
		}
	}

	// — Items ——————————————————————————————————————————————————————————————————

	private _getItems(): RRSegmentedControlItem[] {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return [];
		return slot
			.assignedElements()
			.filter((el): el is RRSegmentedControlItem =>
				el.tagName.toLowerCase() === 'rr-segmented-control-item'
			);
	}

	private _getSelectedValues(): string[] {
		return this.value ? this.value.split(' ').filter(Boolean) : [];
	}

	private _individuallyDisabled = new WeakSet<RRSegmentedControlItem>();

	private _syncItems(): void {
		const items = this._getItems();
		const selectedValues = this._getSelectedValues();

		if (this.disabled) {
			items.forEach(item => {
				if (item.hasAttribute('disabled') && !this._individuallyDisabled.has(item)) {
					this._individuallyDisabled.add(item);
				}
				item.disabled = true;
			});
		} else {
			items.forEach(item => {
				item.disabled = this._individuallyDisabled.has(item) || item.hasAttribute('disabled');
			});
		}

		items.forEach(item => {
			item.size = this.size;
			item.inputType = this.type;
			item.contentType = this.contentType;
			item.groupName = this.name || this._autoName;
			item.selected = this.type === 'checkbox'
				? selectedValues.includes(item.value)
				: item.value === this.value;
		});
	}

	private get _autoName(): string {
		if (!this._generatedName) {
			this._generatedName = `rr-segmented-${Math.random().toString(36).slice(2)}`;
		}
		return this._generatedName;
	}

	private _generatedName = '';

	// — Handlers ———————————————————————————————————————————————————————————————

	private _handleItemChange = (e: CustomEvent<{ value: string; checked: boolean }>): void => {
		e.stopPropagation();
		if (this.disabled) return;

		if (this.type === 'checkbox') {
			const current = this._getSelectedValues();
			const updated = e.detail.checked
				? [...current, e.detail.value]
				: current.filter(v => v !== e.detail.value);
			this.value = updated.join(' ');
			this._syncItems();
			this.dispatchEvent(new CustomEvent('change', {
				detail: { values: updated },
				bubbles: true,
				composed: true,
			}));
		} else {
			if (e.detail.value === this.value) return;
			this.value = e.detail.value;
			this._syncItems();
			this.dispatchEvent(new CustomEvent('change', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			}));
		}
	};

	private _handleKeydown = (e: KeyboardEvent): void => {
		if (this.disabled || this.type === 'checkbox') return;

		const items = this._getItems().filter(item => !item.disabled);
		if (items.length === 0) return;

		const currentIndex = items.findIndex(item => item.selected);

		let nextIndex = currentIndex;

		switch (e.key) {
			case 'ArrowLeft':
			case 'ArrowUp':
				e.preventDefault();
				nextIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
				break;
			case 'ArrowRight':
			case 'ArrowDown':
				e.preventDefault();
				nextIndex = currentIndex >= items.length - 1 ? 0 : currentIndex + 1;
				break;
			case 'Home':
				e.preventDefault();
				nextIndex = 0;
				break;
			case 'End':
				e.preventDefault();
				nextIndex = items.length - 1;
				break;
			default:
				return;
		}

		if (nextIndex !== currentIndex && items[nextIndex]) {
			this.value = items[nextIndex].value;
			this._syncItems();
			items[nextIndex].shadowRoot?.querySelector('input')?.focus();
			this.dispatchEvent(new CustomEvent('change', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			}));
		}
	};

	public _onSlotChange(): void {
		this._syncItems();
	}

	override render() {
		return segmentedControlTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-segmented-control': RRSegmentedControl;
		'rr-segmented-control-item': RRSegmentedControlItem;
	}
}

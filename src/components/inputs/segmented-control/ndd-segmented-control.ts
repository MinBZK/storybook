/**
 * Nederlandse Digitale Dienst Segmented Control Component (Lit + TypeScript)
 *
 * A horizontal group of mutually exclusive (radio) or multi-select (checkbox) options.
 * Exports both NDDSegmentedControl and NDDSegmentedControlItem.
 *
 * @element ndd-segmented-control
 * @attr {string}  value         - Selected value for radio type
 * @prop {string[]} values        - Selected values for checkbox type (property binding only, not an attribute)
 * @attr {string}  size          - Control size: 'sm' | 'md' (default: 'md')
 * @attr {string}  type          - Input type: 'radio' | 'checkbox' (default: 'radio')
 * @attr {string}  variant       - Content type for all items: 'text' | 'icon' (default: 'text')
 * @attr {boolean} disabled      - Disabled state for all items
 * @attr {boolean} full-width    - Stretches to fill the container width
 * @attr {string}  name          - Name for form submission, forwarded to native inputs
 *
 * @fires change - When selection changes; detail: { value: string } for radio,
 *                 detail: { values: string[] } for checkbox
 *
 * @slot - ndd-segmented-control-item elements
 *
 * ---
 *
 * @element ndd-segmented-control-item
 * @attr {string}  value        - Value for this item
 * @attr {boolean} selected     - Whether this item is selected (set by parent)
 * @attr {boolean} disabled     - Disabled state
 * @attr {string}  text         - Text label (shown when parent variant="text",
 *                                always used as aria-label and tooltip for icon items)
 * @attr {string}  icon         - Icon name for ndd-icon
 *
 * @slot icon    - Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set.
 *
 * @fires item-change - When item is activated; detail: { value: string, checked: boolean }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
	segmentedControlStyles,
	segmentedControlItemStyles,
} from './ndd-segmented-control.styles.ts';
import {
	segmentedControlTemplate,
	segmentedControlItemTemplate,
} from './ndd-segmented-control.template.ts';
import './../../content/icon/ndd-icon.ts';

export type SegmentedControlSize = 'sm' | 'md';
export type SegmentedControlType = 'radio' | 'checkbox';
export type SegmentedControlVariant = 'text' | 'icon';


// # ndd-segmented-control-item

@customElement('ndd-segmented-control-item')
export class NDDSegmentedControlItem extends LitElement {
	static override styles = segmentedControlItemStyles;

	@property({ type: String })
	value = '';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Set by ndd-segmented-control. Not part of the public API. */
	@property({ type: String, reflect: true })
	size: SegmentedControlSize = 'md';

	/** Set by ndd-segmented-control. Not part of the public API. */
	@property({ type: String, reflect: true, attribute: 'variant' })
	variant: SegmentedControlVariant = 'text';

	/** Set by ndd-segmented-control. Not part of the public API. */
	@property({ type: String, reflect: true, attribute: 'input-type' })
	inputType: SegmentedControlType = 'radio';

	/** Set by ndd-segmented-control. Not part of the public API. */
	@property({ type: String })
	groupName = '';

	/** Text label for the item. Used as visible text and as aria-label/tooltip for icon variant. */
	@property({ type: String })
	text = '';

	/** Icon name for ndd-icon. When not set, the icon slot is used. */
	@property({ type: String })
	icon = '';

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


// # ndd-segmented-control

@customElement('ndd-segmented-control')
export class NDDSegmentedControl extends LitElement {
	static override styles = segmentedControlStyles;

	/** Selected value for radio type. */
	@property({ type: String, reflect: true })
	value = '';

	/**
	 * Selected values for checkbox type.
	 * Use property binding: .values=${['New York', 'Amsterdam']}
	 * Does not reflect to an attribute — safe for values containing spaces or special characters.
	 */
	@property({ type: Array, attribute: false })
	values: string[] = [];

	@property({ type: String, reflect: true })
	size: SegmentedControlSize = 'md';

	@property({ type: String, reflect: true })
	type: SegmentedControlType = 'radio';

	/** Content type applied to all items. Mixing text and icon items is not supported. */
	@property({ type: String, reflect: true, attribute: 'variant' })
	variant: SegmentedControlVariant = 'text';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	@property({ type: String })
	name = '';

	/** Accessible name for the group (aria-label). */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** ID of an external label element (aria-labelledby). */
	@property({ type: String, attribute: 'accessible-labelledby' })
	accessibleLabelledBy = '';

	// — Lifecycle ——————————————————————————————————————————————————————————————

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', this.type === 'checkbox' ? 'group' : 'radiogroup');
		if (this.accessibleLabel) this.setAttribute('aria-label', this.accessibleLabel);
		if (this.accessibleLabelledBy) this.setAttribute('aria-labelledby', this.accessibleLabelledBy);
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
		if (!this.accessibleLabel && !this.accessibleLabelledBy) {
			console.warn('<ndd-segmented-control>: No accessible name provided. Add an accessible-label or accessible-labelledby attribute for screen reader accessibility.');
		}
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (
			changedProperties.has('value') ||
			changedProperties.has('values') ||
			changedProperties.has('size') ||
			changedProperties.has('disabled') ||
			changedProperties.has('type') ||
			changedProperties.has('variant') ||
			changedProperties.has('name')
		) {
			this._syncItems();
		}
		if (changedProperties.has('type')) {
			this.setAttribute('role', this.type === 'checkbox' ? 'group' : 'radiogroup');
		}
		if (changedProperties.has('accessibleLabel')) {
			if (this.accessibleLabel) {
				this.setAttribute('aria-label', this.accessibleLabel);
			} else {
				this.removeAttribute('aria-label');
			}
		}
		if (changedProperties.has('accessibleLabelledBy')) {
			if (this.accessibleLabelledBy) {
				this.setAttribute('aria-labelledby', this.accessibleLabelledBy);
			} else {
				this.removeAttribute('aria-labelledby');
			}
		}
	}

	// — Items ——————————————————————————————————————————————————————————————————

	private _getItems(): NDDSegmentedControlItem[] {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return [];
		return slot
			.assignedElements()
			.filter((el): el is NDDSegmentedControlItem =>
				el.tagName.toLowerCase() === 'ndd-segmented-control-item'
			);
	}

	private _getSelectedValues(): string[] {
		return this.type === 'checkbox' ? this.values : (this.value ? [this.value] : []);
	}

	private _syncItems(): void {
		const items = this._getItems();
		const selectedValues = this._getSelectedValues();

		if (this.disabled) {
			items.forEach(item => {
				if (!item.hasAttribute('disabled')) {
					item.setAttribute('group-disabled', '');
					item.disabled = true;
				}
			});
		} else {
			items.forEach(item => {
				if (item.hasAttribute('group-disabled')) {
					item.removeAttribute('group-disabled');
					item.disabled = false;
				}
			});
		}

		items.forEach(item => {
			item.size = this.size;
			item.inputType = this.type;
			item.variant = this.variant;
			item.groupName = this.name || this._autoName;
			item.selected = this.type === 'checkbox'
				? selectedValues.includes(item.value)
				: item.value === this.value;
		});
	}

	private static _counter = 0;

	private get _autoName(): string {
		if (!this._generatedName) {
			this._generatedName = `ndd-segmented-${NDDSegmentedControl._counter++}`;
		}
		return this._generatedName;
	}

	private _generatedName = '';

	// — Handlers ———————————————————————————————————————————————————————————————

	private _handleItemChange = (e: CustomEvent<{ value: string; checked: boolean }>): void => {
		e.stopPropagation();
		if (this.disabled) return;

		if (this.type === 'checkbox') {
			const current = this.values;
			const updated = e.detail.checked
				? [...current, e.detail.value]
				: current.filter(v => v !== e.detail.value);
			this.values = updated;
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

	/**
	 * Handles arrow key navigation for radio type.
	 * For checkbox type, keyboard navigation is intentionally omitted —
	 * each native checkbox input is individually Tab-focusable and
	 * Space-toggleable per the native checkbox interaction pattern.
	 */
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
		'ndd-segmented-control': NDDSegmentedControl;
		'ndd-segmented-control-item': NDDSegmentedControlItem;
	}
}

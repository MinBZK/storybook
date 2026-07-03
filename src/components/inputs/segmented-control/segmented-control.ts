/**
 * Nederlandse Digitale Dienst Segmented Control Component (Lit + TypeScript)
 *
 * A horizontal group of mutually exclusive (radio) or multi-select (checkbox) options.
 * Exports both NLDDSegmentedControl and NLDDSegmentedControlItem.
 *
 * @element nldd-segmented-control
 * @attr {string}  value         - Selected value for radio type
 * @prop {string[]} values        - Selected values for checkbox type (property binding only, not an attribute)
 * @attr {string}  size          - Control size: 'sm' | 'md' | 'lg' (default: 'md')
 * @attr {string}  type          - Input type: 'radio' | 'checkbox' | 'button' (default: 'radio'). 'button' items are momentary actions (no selected state): each click fires change, useful for grouped commands like indent/outdent.
 * @attr {string}  variant       - Content type for all items: 'text' | 'icon' | 'icon-and-text' (default: 'text')
 * @attr {boolean} disabled      - Disabled state for all items
 * @attr {string}  width         - Width mode: 'full' (stretches to container), 'fit-content' (per-item content size), or any CSS length (e.g. '240px')
 * @attr {string}  name          - Name for form submission, forwarded to native inputs
 *
 * @fires change - When selection changes; detail: { value: string } for radio,
 *                 detail: { values: string[] } for checkbox
 *
 * @slot - nldd-segmented-control-item elements
 *
 * ---
 *
 * @element nldd-segmented-control-item
 * @attr {string}  value        - Value for this item
 * @attr {boolean} selected     - Whether this item is selected (set by parent)
 * @attr {boolean} disabled     - Disabled state
 * @attr {string}  text         - Text label (shown for variant "text" and "icon-and-text";
 *                                used as aria-label and tooltip for variant "icon")
 * @attr {string}  icon         - Icon name for nldd-icon
 *
 * @slot icon    - Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set.
 *
 * @fires item-change - When item is activated; detail: { value: string, checked: boolean }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import {
	segmentedControlStyles,
	segmentedControlItemStyles,
} from './segmented-control.styles.js';
import {
	segmentedControlTemplate,
	segmentedControlItemTemplate,
} from './segmented-control.template.js';
import './../../content/icon/icon.js';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';
export type SegmentedControlType = 'radio' | 'checkbox' | 'button';
export type SegmentedControlVariant = 'text' | 'icon' | 'icon-and-text';


// # nldd-segmented-control-item

@customElement('nldd-segmented-control-item')
export class NLDDSegmentedControlItem extends LitElement {
	static override styles = segmentedControlItemStyles;

	@property({ type: String })
	value = '';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/** Control size: 'sm' | 'md' | 'lg'. Set by nldd-segmented-control. Not part of the public API. */
	@property({ reflect: true, converter: reflectNonDefault<SegmentedControlSize>('md') })
	size: SegmentedControlSize = 'md';

	/** Set by nldd-segmented-control. Not part of the public API. */
	@property({ reflect: true, attribute: 'variant', converter: reflectNonDefault<SegmentedControlVariant>('text') })
	variant: SegmentedControlVariant = 'text';

	/** Set by nldd-segmented-control. Not part of the public API. */
	@property({ reflect: true, attribute: 'input-type', converter: reflectNonDefault<SegmentedControlType>('radio') })
	inputType: SegmentedControlType = 'radio';

	/** Set by nldd-segmented-control. Not part of the public API. */
	@property({ type: String })
	groupName = '';

	/** Text label for the item. Used as visible text and as aria-label/tooltip for icon variant. */
	@property({ type: String })
	text = '';

	/** Icon name for nldd-icon. When not set, the icon slot is used; the icon and
	 *  icon-and-text variants show a placeholder icon when neither is provided. */
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

	/** Button items are momentary: a native button fires 'click', not 'change', and
	 *  has no checked state — so each press emits item-change. */
	public _handleClick(): void {
		if (this.inputType !== 'button') return;
		this.dispatchEvent(new CustomEvent('item-change', {
			detail: { value: this.value, checked: false },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return segmentedControlItemTemplate(this);
	}
}


// # nldd-segmented-control

@customElement('nldd-segmented-control')
export class NLDDSegmentedControl extends LitElement {
	static formAssociated = true;

	static override styles = segmentedControlStyles;

	private _internals = this.attachInternals();

	private _initialValue = '';
	private _initialValues: string[] = [];

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

	@property({ reflect: true, converter: reflectNonDefault<SegmentedControlSize>('md') })
	size: SegmentedControlSize = 'md';

	@property({ type: String, reflect: true })
	type: SegmentedControlType = 'radio';

	/** Content type applied to all items: text, icon, or icon-and-text. Per-item mixing is not supported. */
	@property({ reflect: true, attribute: 'variant', converter: reflectNonDefault<SegmentedControlVariant>('text') })
	variant: SegmentedControlVariant = 'text';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	/**
	 * Width mode: 'full' (stretch to container, equal-width items),
	 * 'fit-content' (per-item content size), or any CSS length (e.g. '240px',
	 * '50%') which sets the host width with equal-width items. Default is
	 * content-based outer with equal-width items.
	 */
	@property({ type: String, reflect: true })
	width = '';

	@property({ type: String, reflect: true })
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
		this.setAttribute('role', this.type === 'radio' ? 'radiogroup' : 'group');
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
		this._initialValue = this.value;
		this._initialValues = [...this.values];
		// _syncFormValue() runs in updated() with the same changedProperties
		// on first render — no need to call it explicitly here.
		if (import.meta.env?.DEV && !this.accessibleLabel && !this.accessibleLabelledBy) {
			console.warn('<nldd-segmented-control>: No accessible name provided. Add an accessible-label or accessible-labelledby attribute for screen reader accessibility.');
		}
	}

	private _syncFormValue(): void {
		if (this.type === 'checkbox') {
			if (this.values.length === 0 || !this.name) {
				this._internals.setFormValue(null);
				return;
			}
			// Submit each selected value under the same name (FormData.getAll)
			const data = new FormData();
			for (const v of this.values) data.append(this.name, v);
			this._internals.setFormValue(data);
		} else {
			this._internals.setFormValue(this.value || null);
		}
	}

	formResetCallback(): void {
		this.value = this._initialValue;
		this.values = [...this._initialValues];
	}

	formDisabledCallback(disabled: boolean): void {
		this.disabled = disabled;
	}

	formStateRestoreCallback(state: FormData | string | null): void {
		if (state === null) return;
		if (this.type === 'checkbox' && state instanceof FormData && this.name) {
			this.values = state.getAll(this.name).map(String);
		} else if (typeof state === 'string') {
			this.value = state;
		}
	}

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			// Keyword 'full' is handled by CSS ([width="full"] sets
			// --_width: 100% and switches display to grid). Keyword
			// 'fit-content' only changes grid-auto-columns and leaves the host
			// width alone. A valid CSS length feeds --_width here.
			// Invalid values do nothing.
			const w = this.width;
			const isKeyword = w === 'full' || w === 'fit-content';
			if (w && !isKeyword && CSS.supports('width', w)) {
				this.style.setProperty('--_width', w);
			} else {
				this.style.removeProperty('--_width');
			}
		}
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
		if (
			changedProperties.has('value') ||
			changedProperties.has('values') ||
			changedProperties.has('type') ||
			changedProperties.has('name')
		) {
			this._syncFormValue();
		}
		if (changedProperties.has('type')) {
			this.setAttribute('role', this.type === 'radio' ? 'radiogroup' : 'group');
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

	private _getItems(): NLDDSegmentedControlItem[] {
		const slot = this.shadowRoot?.querySelector('slot');
		if (!slot) return [];
		return slot
			.assignedElements()
			.filter((el): el is NLDDSegmentedControlItem =>
				el.tagName.toLowerCase() === 'nldd-segmented-control-item'
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
			item.selected = this.type === 'button'
				? false // momentary actions have no persistent selected state
				: this.type === 'checkbox'
					? selectedValues.includes(item.value)
					: item.value === this.value;
		});
	}

	private static _idCounter = 0;

	private get _autoName(): string {
		if (!this._generatedName) {
			this._generatedName = `nldd-segmented-${NLDDSegmentedControl._idCounter++}`;
		}
		return this._generatedName;
	}

	private _generatedName = '';

	// — Handlers ———————————————————————————————————————————————————————————————

	private _handleItemChange = (e: CustomEvent<{ value: string; checked: boolean }>): void => {
		e.stopPropagation();
		if (this.disabled) return;

		if (this.type === 'button') {
			// Momentary: emit change on every press and keep no selection state.
			this.dispatchEvent(new CustomEvent('change', {
				detail: { value: e.detail.value },
				bubbles: true,
				composed: true,
			}));
			return;
		}

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
		if (this.disabled || this.type !== 'radio') return;

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
		'nldd-segmented-control': NLDDSegmentedControl;
		'nldd-segmented-control-item': NLDDSegmentedControlItem;
	}
}

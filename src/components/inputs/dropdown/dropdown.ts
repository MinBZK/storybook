/**
 * Nederlandse Digitale Dienst Dropdown Component (Lit + TypeScript)
 *
 * A visual wrapper around a native `<select>` element.
 * The consumer provides a native `<select>` as a slotted child — this way
 * the browser retains full control over form submission, accessibility
 * and keyboard navigation, including `<optgroup>`, `data-*` attributes and
 * dynamic changes to options.
 *
 * @element nldd-dropdown
 * @attr {string}  size     - Size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} valid    - Marks the field as valid
 * @attr {boolean} invalid  - Marks the field as invalid
 * @attr {boolean} disabled - Disabled state; also forwarded to the slotted select
 *
 * @slot - A native `<select>` element with `<option>` and/or `<optgroup>` children
 *
 * @fires change - Bubbles up from the slotted select; detail: { value: string }
 *
 * @example
 * ```html
 * <nldd-dropdown>
 *   <select name="land" aria-label="Land">
 *     <option value="" disabled selected>Selecteer een land</option>
 *     <option value="nl">Nederland</option>
 *     <option value="be">België</option>
 *   </select>
 * </nldd-dropdown>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dropdownStyles } from './dropdown.styles.js';
import { dropdownTemplate } from './dropdown.template.js';
import './../../content/icon/icon.js';

export type DropdownSize = 'xs' | 'sm' | 'md';

@customElement('nldd-dropdown')
export class NLDDDropdown extends LitElement {
	static override styles = dropdownStyles;

	@property({ type: String, reflect: true })
	size: DropdownSize = 'md';

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@state()
	_displayValue = '';

	private _select: HTMLSelectElement | null = null;

	// — Lifecycle ——————————————————————————————————————————————————————————————

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('disabled')) {
			this._syncDisabled();
		}
		if (changedProperties.has('invalid')) {
			this._syncAriaInvalid();
		}
	}

	// — Slot ——————————————————————————————————————————————————————————————————

	public _onSlotChange(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const select = slot?.assignedElements({ flatten: true })
			.find((el): el is HTMLSelectElement => el.tagName === 'SELECT') ?? null;

		if (this._select && this._select !== select) {
			this._select.removeEventListener('change', this._handleSelectChange);
		}

		this._select = select;

		if (!select) {
			this._displayValue = '';
			return;
		}

		if (!select.hasAttribute('aria-label') && !select.hasAttribute('aria-labelledby') && !select.labels?.length) {
			console.warn('<nldd-dropdown>: The slotted <select> has no accessible name. Add an aria-label or aria-labelledby attribute to the <select> element.');
		}

		select.addEventListener('change', this._handleSelectChange);
		this._syncDisabled();
		this._syncAriaInvalid();
		this._syncDisplayValue();
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _syncDisabled(): void {
		if (!this._select) return;
		this._select.disabled = this.disabled;
	}

	private _syncAriaInvalid(): void {
		if (!this._select) return;
		if (this.invalid) {
			this._select.setAttribute('aria-invalid', 'true');
		} else {
			this._select.removeAttribute('aria-invalid');
		}
	}

	private _syncDisplayValue(): void {
		if (!this._select) return;
		this._displayValue = this._select.selectedOptions[0]?.text ?? '';
	}

	private _handleSelectChange = (e: Event): void => {
		e.stopPropagation();
		this._syncDisplayValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this._select?.value ?? '' },
			bubbles: true,
			composed: true,
		}));
	};

	override render() {
		return dropdownTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-dropdown': NLDDDropdown;
	}
}

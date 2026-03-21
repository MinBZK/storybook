/**
 * RegelRecht Dropdown Component (Lit + TypeScript)
 *
 * Een visuele wrapper om een native `<select>` element.
 * De consumer geeft een native `<select>` als slotted child — zo behoudt
 * de browser volledige controle over formulierverwerking, toegankelijkheid
 * en keyboard navigatie, inclusief `<optgroup>`, `data-*` attributen en
 * dynamische wijzigingen aan opties.
 *
 * @element rr-dropdown
 * @attr {string}  size     - Grootte: 'sm' | 'md' (standaard: 'md')
 * @attr {boolean} disabled - Uitgeschakelde toestand; wordt ook doorgestuurd naar de slotted select
 *
 * @slot - Een native `<select>` element met `<option>` en/of `<optgroup>` kinderen
 *
 * @fires change - Bubbles up van de slotted select; detail: { value: string }
 *
 * @example
 * ```html
 * <rr-dropdown>
 *   <select name="land" aria-label="Land">
 *     <option value="" disabled selected>Selecteer een land</option>
 *     <option value="nl">Nederland</option>
 *     <option value="be">België</option>
 *   </select>
 * </rr-dropdown>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { dropdownStyles } from './rr-dropdown.styles.ts';
import { dropdownTemplate } from './rr-dropdown.template.ts';
import './../../content/icon/rr-icon.ts';

export type DropdownSize = 'sm' | 'md';

@customElement('rr-dropdown')
export class RRDropdown extends LitElement {
	static override styles = dropdownStyles;

	@property({ type: String, reflect: true })
	size: DropdownSize = 'md';

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
			console.warn('<rr-dropdown>: The slotted <select> has no accessible name. Add an aria-label or aria-labelledby attribute to the <select> element.');
		}

		select.addEventListener('change', this._handleSelectChange);
		this._syncDisabled();
		this._syncDisplayValue();
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _syncDisabled(): void {
		if (!this._select) return;
		this._select.disabled = this.disabled;
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
		'rr-dropdown': RRDropdown;
	}
}

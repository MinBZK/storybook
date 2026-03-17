/**
 * RegelRecht Drop Down Field Component (Lit + TypeScript)
 *
 * Een select/dropdown veld. Gebruik native <option> elementen als children,
 * net als een gewone <select>.
 *
 * @element rr-drop-down-field
 * @attr {string}  value    - De geselecteerde waarde
 * @attr {string}  size     - Grootte: 'sm' | 'md' (standaard: 'md')
 * @attr {boolean} disabled - Uitgeschakelde toestand
 * @attr {string}  name     - Naam voor formulierverwerking
 *
 * @slot - Native <option> elementen
 *
 * @fires change - Wanneer de selectie wijzigt; detail: { value: string }
 *
 * @example
 * ```html
 * <rr-drop-down-field name="land">
 *   <option value="" disabled selected>Selecteer een land</option>
 *   <option value="nl">Nederland</option>
 *   <option value="be">België</option>
 * </rr-drop-down-field>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { dropDownFieldStyles } from './rr-drop-down-field.styles.ts';
import { dropDownFieldTemplate } from './rr-drop-down-field.template.ts';
import './../../content/icon/rr-icon.ts';

export type DropDownFieldSize = 'sm' | 'md';

@customElement('rr-drop-down-field')
export class RRDropDownField extends LitElement {
	static override styles = dropDownFieldStyles;

	@property({ type: String })
	value = '';

	@property({ type: String, reflect: true })
	size: DropDownFieldSize = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	name = '';

	@state()
	_displayValue = '';

	@query('.drop-down-field__native')
	_select!: HTMLSelectElement;

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('value')) {
			this._syncSelectValue();
		}
	}

	public _onSlotChange(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const options = slot?.assignedElements({ flatten: true })
			.filter((el): el is HTMLOptionElement => el.tagName === 'OPTION');

		if (!this._select || !options) return;

		// Remove previously cloned options, keep nothing
		this._select.innerHTML = '';

		// Clone slotted options into the shadow select
		options.forEach(opt => {
			this._select.appendChild(opt.cloneNode(true));
		});

		this._syncSelectValue();
	}

	private _syncSelectValue(): void {
		if (!this._select) return;

		if (this.value) {
			this._select.value = this.value;
		}

		this._displayValue = this._select.selectedOptions[0]?.text ?? '';
	}

	public _handleChange(e: Event): void {
		const select = e.target as HTMLSelectElement;
		this.value = select.value;
		this._displayValue = select.selectedOptions[0]?.text ?? '';
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return dropDownFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-drop-down-field': RRDropDownField;
	}
}

/**
 * RegelRecht Number Field Component (Lit + TypeScript)
 *
 * Een numeriek invoerveld met decrement en increment knoppen.
 *
 * @element rr-number-field
 * @attr {number}  value        - Huidige waarde
 * @attr {number}  min          - Minimale waarde (standaard: -∞)
 * @attr {number}  max          - Maximale waarde (standaard: ∞)
 * @attr {number}  step         - Stapgrootte (standaard: 1)
 * @attr {boolean} disabled     - Uitgeschakelde toestand
 * @attr {string}  name         - Naam voor formulierverwerking
 * @attr {object}  translations - Vertalingen; niet-opgegeven sleutels vallen terug op Nederlands
 * @attr {boolean} full-width       - Stretches to fill the container width
 * @attr {string}  width            - Fixed width; the input stretches to fill remaining space
 * @attr {boolean} hide-spin-buttons - When set, hides the decrement and increment buttons
 * @attr {string}  accessible-label  - Accessible label (aria-label) forwarded to the native input
 *
 * @fires input  - Wanneer de waarde verandert; detail: { value: number }
 * @fires change - Wanneer de waarde wordt bevestigd; detail: { value: number }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { numberFieldStyles } from './rr-number-field.styles.ts';
import { numberFieldTemplate } from './rr-number-field.template.ts';
import { rrNumberFieldTranslations } from './rr-number-field.i18n.ts';
import type { RRNumberFieldTranslations } from './rr-number-field.i18n.ts';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

@customElement('rr-number-field')
export class RRNumberField extends LitElement {
	static override styles = numberFieldStyles;

	@property({ type: Number })
	value = 0;

	@property({ type: Number })
	min = -Infinity;

	@property({ type: Number })
	max = Infinity;

	@property({ type: Number })
	step = 1;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	name = '';

	@property({ type: Boolean, reflect: true, attribute: 'full-width' })
	fullWidth = false;

	/** Sets a fixed width on the component. The input stretches to fill the available space. */
	@property({ type: String })
	width = '';

	@property({ type: Boolean, reflect: true, attribute: 'hide-spin-buttons' })
	hideSpinButtons = false;

	/** Accessible label forwarded as aria-label to the native input. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Overschrijf een of meer vertalingssleutels. Niet-opgegeven sleutels vallen terug op Nederlands. */
	@property({ type: Object })
	translations: Partial<RRNumberFieldTranslations> = {};

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('width')) {
			if (this.width) {
				this.style.setProperty('--_width', this.width);
				this.setAttribute('width', this.width);
			} else {
				this.style.removeProperty('--_width');
				this.removeAttribute('width');
			}
		}
	}

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof RRNumberFieldTranslations): string {
		return this.translations[key] ?? rrNumberFieldTranslations[key];
	}

	// — Actions ——————————————————————————————————————————————————————————————

	public _handleDecrease(): void {
		if (this.disabled) return;
		this._updateValue(this.value - this.step);
	}

	public _handleIncrease(): void {
		if (this.disabled) return;
		this._updateValue(this.value + this.step);
	}

	public _handleInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		const newValue = parseFloat(input.value);
		if (!isNaN(newValue)) {
			this._updateValue(newValue);
		}
	}

	private _updateValue(newValue: number): void {
		const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
		if (clampedValue !== this.value) {
			this.value = clampedValue;
			this.dispatchEvent(new CustomEvent('input', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			}));
			this.dispatchEvent(new CustomEvent('change', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			}));
		}
	}

	override render() {
		return numberFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-number-field': RRNumberField;
	}
}

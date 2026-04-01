/**
 * RegelRecht Number Field Component (Lit + TypeScript)
 *
 * A numeric input field with decrement and increment buttons.
 *
 * @element rr-number-field
 * @attr {number}  value        - Current value
 * @attr {number}  min          - Minimum value (default: -Infinity)
 * @attr {number}  max          - Maximum value (default: Infinity)
 * @attr {number}  step         - Step size (default: 1)
 * @attr {boolean} disabled     - Disabled state
 * @attr {string}  name         - Name for form submission
 * @attr {object}  translations - Translations; unspecified keys fall back to Dutch
 * @attr {boolean} full-width       - Stretches to fill the container width
 * @attr {string}  width            - Fixed width; the input stretches to fill remaining space
 * @attr {boolean} hide-spin-buttons - When set, hides the decrement and increment buttons
 * @attr {string}  accessible-label  - Accessible label (aria-label) forwarded to the native input
 *
 * @fires input  - When the value changes; detail: { value: number }
 * @fires change - When the value is confirmed; detail: { value: number }
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

	/** Override one or more translation keys. Unspecified keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<RRNumberFieldTranslations> = {};

	override firstUpdated(): void {
		if (!this.accessibleLabel) {
			console.warn('<rr-number-field>: No accessible-label provided. Add an accessible-label attribute so screen readers can announce the input\'s purpose.');
		}
	}

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

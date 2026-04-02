/**
 * Nederlandse Digitale Dienst Stepper Component (Lit + TypeScript)
 *
 * A numeric control with increment and decrement buttons.
 *
 * @element ndd-stepper
 * @attr {number}  value        - Current value
 * @attr {number}  min          - Minimum value (default: 0)
 * @attr {number}  max          - Maximum value (default: Infinity)
 * @attr {number}  step         - Step size (default: 1)
 * @attr {boolean} disabled     - Disabled state
 * @attr {string}  size         - Size: 'sm' | 'md' (default: 'md')
 * @attr {object}  translations - Translations; unspecified keys fall back to Dutch
 *
 * @fires change - When the value changes; detail: { value: number }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { stepperStyles } from './ndd-stepper.styles.ts';
import { stepperTemplate } from './ndd-stepper.template.ts';
import { nddStepperTranslations } from './ndd-stepper.i18n.ts';
import type { NDDStepperTranslations } from './ndd-stepper.i18n.ts';
import './../../actions/icon-button/ndd-icon-button.ts';
import './../../content/icon/ndd-icon.ts';

export type StepperSize = 'sm' | 'md';

@customElement('ndd-stepper')
export class NDDStepper extends LitElement {
	static override styles = stepperStyles;

	@property({ type: Number })
	value = 0;

	@property({ type: Number })
	min = 0;

	@property({ type: Number })
	max = Infinity;

	@property({ type: Number })
	step = 1;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	size: StepperSize = 'md';

	/** Override one or more translation keys. Unspecified keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NDDStepperTranslations> = {};

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NDDStepperTranslations): string {
		return this.translations[key] ?? nddStepperTranslations[key];
	}

	// — Actions ——————————————————————————————————————————————————————————————

	public _decrement(): void {
		if (this.disabled) return;
		const newValue = Math.max(this.min, this.value - this.step);
		if (newValue !== this.value) {
			this.value = newValue;
			this._dispatchChange();
		}
	}

	public _increment(): void {
		if (this.disabled) return;
		const newValue = Math.min(this.max, this.value + this.step);
		if (newValue !== this.value) {
			this.value = newValue;
			this._dispatchChange();
		}
	}

	public _handleKeydown(e: KeyboardEvent): void {
		switch (e.key) {
			case 'ArrowUp':
			case 'ArrowRight':
				e.preventDefault();
				this._increment();
				break;
			case 'ArrowDown':
			case 'ArrowLeft':
				e.preventDefault();
				this._decrement();
				break;
			case 'Home':
				e.preventDefault();
				if (isFinite(this.min)) {
					this.value = this.min;
					this._dispatchChange();
				}
				break;
			case 'End':
				e.preventDefault();
				if (isFinite(this.max)) {
					this.value = this.max;
					this._dispatchChange();
				}
				break;
		}
	}

	private _dispatchChange(): void {
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { value: this.value },
				bubbles: true,
				composed: true,
			})
		);
	}

	override render() {
		return stepperTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-stepper': NDDStepper;
	}
}

/**
 * Nederlandse Digitale Dienst Stepper Component (Lit + TypeScript)
 *
 * A numeric control with increment and decrement buttons.
 *
 * @element nldd-stepper
 * @attr {number} value - Current value
 * @attr {number} min - Minimum value (default: 0)
 * @attr {number} max - Maximum value (default: Infinity)
 * @attr {number} step - Step size (default: 1)
 * @attr {boolean} disabled - Disabled state
 * @attr {string} size - Size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {string} name - Name for form submission; the value is submitted under this name
 * @attr {object} translations - Translations; unspecified keys fall back to Dutch
 *
 * @fires change - When the value changes; detail: { value: number }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { stepperStyles } from './stepper.styles.js';
import { stepperTemplate } from './stepper.template.js';
import { nlddStepperTranslations } from './stepper.i18n.js';
import type { NLDDStepperTranslations } from './stepper.i18n.js';
import './../../actions/icon-button/icon-button.js';
import './../../content/icon/icon.js';

export type StepperSize = 'xs' | 'sm' | 'md';

@customElement('nldd-stepper')
export class NLDDStepper extends FormAssociated(LitElement) {

	static override styles = stepperStyles;


	private _initialValue = 0;

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

	@property({ reflect: true, converter: reflectNonDefault<StepperSize>('md') })
	size: StepperSize = 'md';

	@property({ type: String, reflect: true })
	name = '';

	/** Override one or more translation keys. Unspecified keys fall back to Dutch. */
	@property({ type: Object })
	translations: Partial<NLDDStepperTranslations> = {};

	override firstUpdated(): void {
		this._initialValue = this.value;
	}


	override formValue(): FormValue {
		return String(this.value);
	}

	formResetCallback(): void {
		this.value = this._initialValue;
	}


	formStateRestoreCallback(state: File | string | FormData | null): void {
		if (typeof state !== 'string') return;
		const parsed = parseFloat(state);
		if (!isNaN(parsed)) this.value = Math.max(this.min, Math.min(this.max, parsed));
	}

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof NLDDStepperTranslations): string {
		return this.translations[key] ?? nlddStepperTranslations[key];
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
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Delegates focus to the spinbutton, the element that carries the tabindex
	 * and the keyboard handling. The two icon buttons are `tabindex="-1"` on
	 * purpose, so the stepper is one stop rather than three. Does nothing while
	 * disabled, because the spinbutton drops its tabindex then.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLElement>('.stepper')?.focus(options);
	}

	override render() {
		return stepperTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-stepper': NLDDStepper;
	}
}

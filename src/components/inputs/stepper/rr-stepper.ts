/**
 * RegelRecht Stepper Component (Lit + TypeScript)
 *
 * Een numerieke control met increment en decrement knoppen.
 *
 * @element rr-stepper
 * @attr {number}  value        - Huidige waarde
 * @attr {number}  min          - Minimale waarde (standaard: 0)
 * @attr {number}  max          - Maximale waarde (standaard: Infinity)
 * @attr {number}  step         - Stapgrootte (standaard: 1)
 * @attr {boolean} disabled     - Uitgeschakelde toestand
 * @attr {string}  size         - Grootte: 'sm' | 'md' (standaard: 'md')
 * @attr {object}  translations - Vertalingen; niet-opgegeven sleutels vallen terug op Nederlands
 *
 * @fires change - Wanneer de waarde verandert; detail: { value: number }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { stepperStyles } from './rr-stepper.styles.ts';
import { stepperTemplate } from './rr-stepper.template.ts';
import { rrStepperTranslations } from './rr-stepper.i18n.ts';
import type { RRStepperTranslations } from './rr-stepper.i18n.ts';
import './../../actions/icon-button/rr-icon-button.ts';
import './../../content/icon/rr-icon.ts';

export type StepperSize = 'sm' | 'md';

@customElement('rr-stepper')
export class RRStepper extends LitElement {
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

	/** Overschrijf een of meer vertalingssleutels. Niet-opgegeven sleutels vallen terug op Nederlands. */
	@property({ type: Object })
	translations: Partial<RRStepperTranslations> = {};

	// — i18n —————————————————————————————————————————————————————————————————

	public _t(key: keyof RRStepperTranslations): string {
		return this.translations[key] ?? rrStepperTranslations[key];
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
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return stepperTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-stepper': RRStepper;
	}
}

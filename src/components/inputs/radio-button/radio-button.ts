/**
 * Nederlandse Digitale Dienst Radio Button Component (Lit + TypeScript)
 *
 * WAI-ARIA: Wrap radio buttons in a <fieldset>/<legend> or a container with
 * role="radiogroup" and aria-labelledby for proper group semantics.
 *
 * @example
 * <fieldset>
 *   <legend>Kies een optie</legend>
 *   <nldd-radio-button name="options" value="1">Optie 1</nldd-radio-button>
 *   <nldd-radio-button name="options" value="2">Optie 2</nldd-radio-button>
 * </fieldset>
 *
 * @element nldd-radio-button
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} required - Required state
 * @attr {string} name - Radio group name for form submission; ties the buttons of one group together
 * @attr {string} value - Value submitted with the form when this radio button is checked
 * @attr {string} accessible-label - Accessible label forwarded as aria-label to the native input.
 *   Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries.
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string, name: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { radioButtonStyles } from './radio-button.styles.js';
import { radioButtonTemplate } from './radio-button.template.js';

@customElement('nldd-radio-button')
export class NLDDRadioButton extends FormAssociated(LitElement) {

	static override styles = radioButtonStyles;


	private _initialChecked = false;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	override firstUpdated(): void {
		this._initialChecked = this.checked;
	}


	override formValue(): FormValue {
		return this.checked ? this.value : null;
	}

	formResetCallback(): void {
		this.checked = this._initialChecked;
	}


	formStateRestoreCallback(state: File | string | FormData | null): void {
		this.checked = state !== null;
	}

	public select(): void {
		if (this.disabled || this.checked) return;
		const input = this.shadowRoot?.querySelector('input') as HTMLInputElement | null;
		if (!input) return;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
	}

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value, name: this.name },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return radioButtonTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-radio-button': NLDDRadioButton;
	}
}

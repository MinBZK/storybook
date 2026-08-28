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
 * @attr {boolean} no-tab - Takes the control out of the tab order (tabindex="-1"), for a control owned by a roving container (a row of an nldd-list, where the arrow keys move between rows) that manages focus itself. Still mouse- and script-focusable.
 * @attr {boolean} decorative - Renders the shape without the input: no focus, no
 *   name/value, nothing announced. For a control that owns the state elsewhere,
 *   such as a list row that is itself the radio; putting a real input in there
 *   would nest a control inside a control.
 * @attr {boolean} required - Required state
 * @attr {string} name - Radio group name for form submission; ties the buttons of one group together
 * @attr {string} value - Value submitted with the form when this radio button is checked
 * @attr {string} accessible-label - Accessible label forwarded as aria-label to the native input.
 * @attr {boolean} invalid - Marks the control as invalid. Announced with aria-invalid; nothing is drawn for it.
 *   Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries.
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string, name: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { radioButtonStyles } from './radio-button.styles.js';
import { radioButtonTemplate } from './radio-button.template.js';
import { DescribedBy } from '../../../utilities/described-by-mixin.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';

@customElement('nldd-radio-button')
export class NLDDRadioButton extends DescribedBy(FormAssociated(LitElement)) {

	static override styles = radioButtonStyles;

	/** Says this is the control an nldd-form-field is about, so the field can
	 *  find it, name it and move focus into it. See nldd-form-field. */
	static isFormInput = true;


	private _initialChecked = false;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	decorative = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;
	/** Take the control out of the tab order (`tabindex="-1"`) — for a control
	 *  owned by a roving container (an `nldd-list` sets it on the rows that are
	 *  not the current one) that manages focus itself. Still mouse- and
	 *  script-focusable. */
	@property({ type: Boolean, reflect: true, attribute: 'no-tab' })
	noTab = false;


	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ reflect: true, converter: reflectNonDefault('') })
	name = '';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';


	/**
	 * Marks the control as invalid.
	 *
	 * Announced and not drawn. What is wrong belongs in an
	 * nldd-form-field-validation-list, in words: a red ring around a single
	 * checkbox or radio would say the option is wrong, while it is the question
	 * that is unanswered. `aria-invalid` still goes on the control, because
	 * choosing not to show something is not a reason to keep quiet about it.
	 */
	@property({ type: Boolean, reflect: true })
	invalid = false;

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

	/**
	 * Delegates focus to the inner native radio `<input>`, so consumers can
	 * call `radioEl.focus()` without reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<HTMLInputElement>('.radio-button__input')?.focus(options);
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

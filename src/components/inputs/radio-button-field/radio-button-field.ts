/**
 * Nederlandse Digitale Dienst Radio Button Field Component (Lit + TypeScript)
 *
 * A radio button with an inline label. Use inside nldd-radio-button-group
 * for keyboard navigation and group semantics. The group sets the name.
 *
 * Form-associated: the checked field submits its `value` under `name` (the
 * inner nldd-radio-button sits in the shadow root and never joins the
 * consumer's form; the field submits on its behalf). Unchecking siblings is
 * the group's job, so exactly one value per group reaches the form.
 *
 * @element nldd-radio-button-field
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value for form submission
 * @attr {string} name - Radio group name for form submission, forwarded to the inner nldd-radio-button. Set automatically by nldd-radio-button-group.
 * @attr {boolean} required - Required state, forwarded to the inner nldd-radio-button. Set automatically by nldd-radio-button-group.
 * @attr {string} label - Label text for the radio button
 * @attr {boolean} invalid - Marks the control as invalid. Announced with aria-invalid; nothing is drawn for it.
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { radioButtonFieldStyles } from './radio-button-field.styles.js';
import { radioButtonFieldTemplate } from './radio-button-field.template.js';
import type { NLDDRadioButton } from '../radio-button/radio-button.js';
import { DescribedBy } from '../../../utilities/described-by-mixin.js';

@customElement('nldd-radio-button-field')
export class NLDDRadioButtonField extends DescribedBy(FormAssociated(LitElement)) {

	static override styles = radioButtonFieldStyles;

	/** Says this is the control an nldd-form-field is about, so the field can
	 *  find it, name it and move focus into it. See nldd-form-field. */
	static isFormInput = true;


	private _initialChecked = false;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = '';

	/** Set by nldd-radio-button-group. Not part of the public API.
	 *  Reflected: form association reads the host's name attribute, and the
	 *  group assigns the property. */
	@property({ type: String, reflect: true })
	name = '';

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String })
	label = '';


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

	/** An unchecked radio contributes nothing to the form. The group calls
	 *  `commitFormValue()` on the siblings it unchecks, so a listener that reads
	 *  the form while `change` is still propagating never sees two values. */
	override formValue(): FormValue {
		return this.checked ? this.value : null;
	}

	formResetCallback(): void {
		this.checked = this._initialChecked;
	}


	formStateRestoreCallback(state: File | string | FormData | null): void {
		this.checked = state !== null;
	}

	public _handleLabelClick(e: Event): void {
		if (this.disabled) return;
		if ((e.target as HTMLElement).closest?.('nldd-radio-button')) return;
		const radioButton = this.shadowRoot?.querySelector('nldd-radio-button') as NLDDRadioButton | null;
		radioButton?.select();
	}

	public _handleChange(e: Event): void {
		this.checked = (e as CustomEvent<{ checked: boolean }>).detail.checked;
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Delegates focus to the inner `<nldd-radio-button>`, which in turn focuses
	 * its native input. Lets consumers call `radioFieldEl.focus()` without
	 * reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<NLDDRadioButton>('nldd-radio-button')?.focus(options);
	}

	/** The radio button it renders knows which element inside itself is the control. */
	override describedTarget(): Element | null {
		return this.shadowRoot?.querySelector('nldd-radio-button') ?? null;
	}

	override render() {
		return radioButtonFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-radio-button-field': NLDDRadioButtonField;
	}
}

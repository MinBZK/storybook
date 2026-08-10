/**
 * Nederlandse Digitale Dienst Checkbox Component (Lit + TypeScript)
 *
 * @element nldd-checkbox
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} decorative - Renders the box without the input: no focus, no
 *   name/value, nothing announced. For a control that owns the state elsewhere,
 *   such as a list row that is itself the checkbox; putting a real input in
 *   there would nest a control inside a control.
 * @attr {boolean} indeterminate - Indeterminate state (takes precedence over checked visually)
 * @attr {string} value - Value for form submission
 * @attr {string} name - Name for form submission
 * @attr {string} accessible-label - Accessible label forwarded as aria-label to the native input.
 *   Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries.
 *
 * @fires change - Fired when the checkbox state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { checkboxStyles } from './checkbox.styles.js';
import { checkboxTemplate } from './checkbox.template.js';

@customElement('nldd-checkbox')
export class NLDDCheckbox extends FormAssociated(LitElement) {
	static override styles = checkboxStyles;

	private _initialChecked = false;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	decorative = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	indeterminate = false;

	@property({ type: String })
	value = 'on';

	@property({ type: String, reflect: true })
	name = '';

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
		this.indeterminate = false;
	}

	formStateRestoreCallback(state: File | string | FormData | null): void {
		this.checked = state !== null;
	}

	public toggle(): void {
		if (this.disabled) return;
		this.checked = !this.checked;
		this.indeterminate = false;
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.indeterminate = input.indeterminate;
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return checkboxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-checkbox': NLDDCheckbox;
	}
}

/**
 * Nederlandse Digitale Dienst Password Field Component (Lit + TypeScript)
 *
 * A password input field with visibility toggle and validation states.
 *
 * @element ndd-password-field
 *
 * @attr {string} value        - The input value
 * @attr {string} placeholder  - Placeholder text
 * @attr {string} input-id     - Sets the id on the native input. Set automatically by ndd-form-field.
 * @attr {string} size         - 'md' (default) | 'sm'. Set automatically by ndd-form-field.
 * @attr {boolean} valid       - Marks the field as valid
 * @attr {boolean} invalid     - Marks the field as invalid
 * @attr {boolean} disabled    - Disabled state
 * @attr {boolean} masked                  - Whether the password is masked (default: true)
 * @attr {string} show-label               - Visible toggle button label when masked (default: 'Toon')
 * @attr {string} hide-label               - Visible toggle button label when unmasked (default: 'Verberg')
 * @attr {string} show-accessible-label    - aria-label for toggle when masked (default: 'Toon wachtwoord')
 * @attr {string} hide-accessible-label    - aria-label for toggle when unmasked (default: 'Verberg wachtwoord')
 * @attr {boolean} readonly    - Readonly state
 * @attr {boolean} required    - Required state
 * @attr {string} name         - Input name for form submission
 * @attr {string} autocomplete        - Autocomplete hint
 * @attr {string} accessible-label    - Accessible label forwarded to the inner input. Set automatically by ndd-form-field.
 *
 * @fires input  - When the input value changes ({ detail: { value } })
 * @fires change - When the input value is committed ({ detail: { value } })
 *
 * @csspart field  - The field container
 * @csspart input  - The native input element
 * @csspart toggle - The toggle button wrapper
 */
import { LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { passwordFieldStyles } from './ndd-password-field.styles.js';
import { passwordFieldTemplate } from './ndd-password-field.template.js';

@customElement('ndd-password-field')
export class NDDPasswordField extends LitElement {
	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = passwordFieldStyles;

	@property({ type: String, reflect: true })
	size: 'md' | 'sm' = 'md';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'input-id' })
	inputId = '';

	@property({ type: String })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	masked = true;

	/** Visible button label when the field is masked. Override for localisation. */
	@property({ type: String, attribute: 'show-label' })
	showLabel = 'Toon';

	/** Visible button label when the field is unmasked. Override for localisation. */
	@property({ type: String, attribute: 'hide-label' })
	hideLabel = 'Verberg';

	/** Accessible aria-label for the toggle button when the field is masked. Override for localisation. */
	@property({ type: String, attribute: 'show-accessible-label' })
	showAccessibleLabel = 'Toon wachtwoord';

	/** Accessible aria-label for the toggle button when the field is unmasked. Override for localisation. */
	@property({ type: String, attribute: 'hide-accessible-label' })
	hideAccessibleLabel = 'Verberg wachtwoord';

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String })
	name = '';

	@property({ type: String })
	autocomplete = '';

	/** Accessible label forwarded to the inner <input>. Set automatically by ndd-form-field. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String, attribute: 'error-message-ids' })
	errorMessageIds = '';

	@query('.password-field__input')
	private _input!: HTMLInputElement;

	public _handleInput(e: Event): void {
		e.stopPropagation();
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		e.stopPropagation();
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleToggle(): void {
		this.masked = !this.masked;
		this.updateComplete.then(() => { this._input?.focus(); });
	}

	public focus(): void {
		this._input?.focus();
	}

	public blur(): void {
		this._input?.blur();
	}

	override render() {
		return passwordFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-password-field': NDDPasswordField;
	}
}

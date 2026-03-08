/**
 * RegelRecht Password Field Component (Lit + TypeScript)
 *
 * A password input field with visibility toggle and validation states.
 *
 * @element rr-password-field
 *
 * @attr {string} value        - The input value
 * @attr {string} placeholder  - Placeholder text
 * @attr {string} input-id     - Sets the id on the native input. Set automatically by rr-form-field.
 * @attr {string} size         - 'md' (default) | 'sm'. Set automatically by rr-form-field.
 * @attr {boolean} valid       - Marks the field as valid
 * @attr {boolean} invalid     - Marks the field as invalid
 * @attr {boolean} disabled    - Disabled state
 * @attr {boolean} masked      - Whether the password is masked (default: false)
 * @attr {boolean} readonly    - Readonly state
 * @attr {boolean} required    - Required state
 * @attr {string} name         - Input name for form submission
 * @attr {string} autocomplete - Autocomplete hint
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
import { passwordFieldStyles } from './rr-password-field.styles.js';
import { passwordFieldTemplate } from './rr-password-field.template.js';

@customElement('rr-password-field')
export class RRPasswordField extends LitElement {
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
	masked = false;

	@property({ type: Boolean })
	readonly = false;

	@property({ type: Boolean })
	required = false;

	@property({ type: String })
	name = '';

	@property({ type: String })
	autocomplete = '';

	@query('.password-field__input')
	private _input!: HTMLInputElement;

	handleInput(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.value = input.value;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	handleToggle(): void {
		this.masked = !this.masked;
		this.updateComplete.then(() => {
			this._input?.focus();
		});
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
		'rr-password-field': RRPasswordField;
	}
}

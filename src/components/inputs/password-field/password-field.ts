/**
 * Nederlandse Digitale Dienst Password Field Component (Lit + TypeScript)
 *
 * A password input field with visibility toggle and validation states.
 *
 * @element nldd-password-field
 *
 * @attr {string} value        - The input value
 * @attr {string} placeholder  - Placeholder text
 * @attr {string} input-id     - Sets the id on the native input. Set automatically by nldd-form-field.
 * @attr {string} size         - 'md' (default) | 'sm'. Set automatically by nldd-form-field.
 * @attr {boolean} valid       - Marks the field as valid
 * @attr {boolean} invalid     - Marks the field as invalid
 * @attr {boolean} disabled    - Disabled state
 * @attr {boolean} masked                  - Whether the password is masked (default: true)
 * @attr {string} show-text               - Visible toggle button text when masked (default: 'Toon')
 * @attr {string} hide-text               - Visible toggle button text when unmasked (default: 'Verberg')
 * @attr {string} show-accessible-label    - aria-label for toggle when masked (default: 'Toon wachtwoord')
 * @attr {string} hide-accessible-label    - aria-label for toggle when unmasked (default: 'Verberg wachtwoord')
 * @attr {boolean} readonly    - Readonly state
 * @attr {boolean} required    - Required state
 * @attr {string} name         - Input name for form submission
 * @attr {string} autocomplete        - Autocomplete hint
 * @attr {string} accessible-label    - Accessible label forwarded to the inner input. Set automatically by nldd-form-field.
 * @attr {string} width        - Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container.
 *
 * @fires input  - When the input value changes ({ detail: { value } })
 * @fires change - When the input value is committed ({ detail: { value } })
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { passwordFieldStyles } from './password-field.styles.js';
import { passwordFieldTemplate } from './password-field.template.js';

@customElement('nldd-password-field')
export class NLDDPasswordField extends LitElement {
	static formAssociated = true;

	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = passwordFieldStyles;

	private _internals = this.attachInternals();

	private _initialValue = '';

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
	@property({ type: String, attribute: 'show-text' })
	showText = 'Toon';

	/** Visible button label when the field is unmasked. Override for localisation. */
	@property({ type: String, attribute: 'hide-text' })
	hideText = 'Verberg';

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

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: String })
	autocomplete = '';

	/** Accessible label forwarded to the inner <input>. Set automatically by nldd-form-field. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String, attribute: 'error-message-ids' })
	errorMessageIds = '';

	/** Optional fixed width (any CSS length). When unset, the field stretches to fill its container. */
	@property({ type: String, reflect: true })
	width = '';

	@query('.password-field__input')
	private _input!: HTMLInputElement;

	override firstUpdated(): void {
		this._initialValue = this.value;
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			const w = this.width;
			if (w && w !== 'full' && CSS.supports('width', w)) {
				this.style.setProperty('--_width', w);
			} else {
				this.style.removeProperty('--_width');
			}
		}
		if (changed.has('value')) {
			this._internals.setFormValue(this.value);
		}
	}

	formResetCallback(): void {
		this.value = this._initialValue;
	}

	formDisabledCallback(disabled: boolean): void {
		this.disabled = disabled;
	}

	formStateRestoreCallback(state: File | string | FormData | null): void {
		if (typeof state === 'string') this.value = state;
	}

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
		'nldd-password-field': NLDDPasswordField;
	}
}

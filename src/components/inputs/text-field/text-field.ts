/**
 * Nederlandse Digitale Dienst Text Field Component (Lit + TypeScript)
 *
 * @element nldd-text-field
 *
 * @attr {string} value        - The input value
 * @attr {string} placeholder  - Placeholder text
 * @attr {string} input-id     - Sets the id on the native input. Set automatically by nldd-form-field.
 * @attr {string} size         - 'md' (default) | 'sm'. Set automatically by nldd-form-field.
 * @attr {boolean} invalid     - Marks the field as invalid
 * @attr {boolean} valid       - Marks the field as valid
 * @attr {boolean} disabled    - Disabled state
 * @attr {string} type         - Input type: 'text' | 'email' | 'tel' | 'url'
 * @attr {string} name         - Input name for form submission
 * @attr {boolean} readonly    - Readonly state
 * @attr {boolean} required    - Required state
 * @attr {string} autocomplete - Autocomplete hint
 * @attr {string} accessible-label    - Accessible label forwarded to the inner input. Set automatically by nldd-form-field.
 * @attr {string} width        - Optional fixed width (any CSS length, e.g. "240px"). Default: full-width.
 *
 * @fires input  - When input value changes
 * @fires change - When input value is committed
 *
 * @csspart container - The field container
 * @csspart input     - The native input element
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { textFieldStyles } from './text-field.styles.js';
import { textFieldTemplate } from './text-field.template.js';

export type InputType = 'text' | 'email' | 'tel' | 'url';

@customElement('nldd-text-field')
export class NLDDTextField extends LitElement {
	static formAssociated = true;

	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = textFieldStyles;

	private _internals = this.attachInternals();

	@property({ type: String, reflect: true })
	size: 'md' | 'sm' = 'md';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'input-id' })
	inputId = '';

	@property({ type: String })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	type: InputType = 'text';

	@property({ type: String })
	name = '';

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

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


	@query('.text-field__input')
	private _input!: HTMLInputElement;

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			this.style.width = this.width || '';
		}
		if (changed.has('value')) {
			this._internals.setFormValue(this.value);
		}
	}

	formResetCallback(): void {
		this.value = '';
	}

	formDisabledCallback(disabled: boolean): void {
		this.disabled = disabled;
	}

	formStateRestoreCallback(state: string): void {
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

	public focus(): void {
		this._input?.focus();
	}

	public blur(): void {
		this._input?.blur();
	}

	override render() {
		return textFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-text-field': NLDDTextField;
	}
}

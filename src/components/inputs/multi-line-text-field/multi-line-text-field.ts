/**
 * Nederlandse Digitale Dienst Multi-line Text Field Component (Lit + TypeScript)
 *
 * @element nldd-multi-line-text-field
 *
 * @attr {string} value           - The textarea value
 * @attr {string} placeholder     - Placeholder text
 * @attr {string} input-id        - Sets the id on the native textarea. Set automatically by nldd-form-field.
 * @attr {string} size            - 'md' (default) | 'sm'. Set automatically by nldd-form-field.
 * @attr {boolean} invalid        - Marks the field as invalid
 * @attr {boolean} valid          - Marks the field as valid
 * @attr {boolean} disabled       - Disabled state
 * @attr {string} name            - Textarea name for form submission
 * @attr {boolean} readonly       - Readonly state
 * @attr {boolean} required       - Required state
 * @attr {string} autocomplete    - Autocomplete hint
 * @attr {number} rows            - Initial visible rows (minimum height). Default: 3.
 * @attr {string} resize          - 'none' | 'vertical' (default) | 'auto'.
 *                                  'auto' grows with content (native field-sizing), no manual handle.
 * @attr {string} accessible-label - Accessible label forwarded to the inner textarea. Set automatically by nldd-form-field.
 * @attr {string} width           - Optional fixed width (any CSS length, e.g. "240px"). Default: full-width.
 *
 * @fires input  - When value changes
 * @fires change - When value is committed (blur)
 *
 * @csspart container - The field container
 * @csspart textarea  - The native textarea element
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { multiLineTextFieldStyles } from './multi-line-text-field.styles.js';
import { multiLineTextFieldTemplate } from './multi-line-text-field.template.js';

export type ResizeMode = 'none' | 'vertical' | 'auto';

@customElement('nldd-multi-line-text-field')
export class NLDDMultiLineTextField extends LitElement {
	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = multiLineTextFieldStyles;

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
	name = '';

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String })
	autocomplete = '';

	@property({ type: Number })
	rows = 3;

	@property({ type: String, reflect: true })
	resize: ResizeMode = 'vertical';

	/** Accessible label forwarded to the inner <textarea>. Set automatically by nldd-form-field. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String, attribute: 'error-message-ids' })
	errorMessageIds = '';

	/** Optional fixed width (any CSS length). When unset, the field stretches to fill its container. */
	@property({ type: String, reflect: true })
	width = '';


	@query('.multi-line-text-field__input')
	private _textarea!: HTMLTextAreaElement;

	override updated(changed: PropertyValues): void {
		if (changed.has('width')) {
			this.style.width = this.width || '';
		}
		if (changed.has('resize') && this.resize === 'auto' && this._textarea) {
			// Manual resize sets inline width/height on the textarea, which would
			// override field-sizing: content. Clear them when switching to auto.
			this._textarea.style.width = '';
			this._textarea.style.height = '';
		}
	}

	public _handleInput(e: Event): void {
		e.stopPropagation();
		const textarea = e.target as HTMLTextAreaElement;
		this.value = textarea.value;
		this.dispatchEvent(new CustomEvent('input', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		e.stopPropagation();
		const textarea = e.target as HTMLTextAreaElement;
		this.value = textarea.value;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public focus(): void {
		this._textarea?.focus();
	}

	public blur(): void {
		this._textarea?.blur();
	}

	override render() {
		return multiLineTextFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-multi-line-text-field': NLDDMultiLineTextField;
	}
}

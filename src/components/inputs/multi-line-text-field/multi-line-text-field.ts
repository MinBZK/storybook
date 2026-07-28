/**
 * Nederlandse Digitale Dienst Multi-line Text Field Component (Lit + TypeScript)
 *
 * @element nldd-multi-line-text-field
 *
 * @attr {string} value - The textarea value
 * @attr {string} placeholder - Placeholder text
 * @attr {string} input-id - Sets the id on the native textarea. Set automatically by nldd-form-field.
 * @attr {string} size - 'md' (default) | 'sm'. Set automatically by nldd-form-field.
 * @attr {boolean} invalid - Marks the field as invalid
 * @attr {boolean} valid - Marks the field as valid
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Textarea name for form submission
 * @attr {boolean} readonly - Readonly state
 * @attr {boolean} required - Required state
 * @attr {string} autocomplete - Autocomplete hint
 * @attr {number} rows - Initial visible rows (minimum height). Default: 3.
 * @attr {string} resize - 'none' | 'vertical' | 'auto' (default). 'auto' grows with content (native field-sizing), no manual handle.
 * @attr {string} accessible-label - Accessible label forwarded to the inner textarea. Set automatically by nldd-form-field.
 * @attr {string} error-message-ids - Ids for aria-describedby on the inner textarea. Set automatically by nldd-form-field.
 * @attr {boolean} no-spellcheck - Disables browser spellchecking on the inner textarea
 * @attr {string} width - Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container.
 *
 * @fires input - When value changes
 * @fires change - When value is committed (blur)
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { multiLineTextFieldStyles } from './multi-line-text-field.styles.js';
import { multiLineTextFieldTemplate } from './multi-line-text-field.template.js';

export type ResizeMode = 'none' | 'vertical' | 'auto';

@customElement('nldd-multi-line-text-field')
export class NLDDMultiLineTextField extends FormAssociated(LitElement) {

	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = multiLineTextFieldStyles;


	private _initialValue = '';

	@property({ reflect: true, converter: reflectNonDefault<'md' | 'sm'>('md') })
	size: 'md' | 'sm' = 'md';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'input-id' })
	inputId = '';

	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String })
	autocomplete = '';

	@property({ type: Number })
	rows = 3;

	@property({ reflect: true, converter: reflectNonDefault<ResizeMode>('auto') })
	resize: ResizeMode = 'auto';

	/** Accessible label forwarded to the inner <textarea>. Set automatically by nldd-form-field. */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String, attribute: 'error-message-ids' })
	errorMessageIds = '';

	@property({ type: Boolean, reflect: true, attribute: 'no-spellcheck' })
	noSpellcheck = false;

	/** Optional fixed width (any CSS length). When unset, the field stretches to fill its container. */
	@property({ type: String, reflect: true })
	width = '';


	@query('.multi-line-text-field__input')
	private _textarea!: HTMLTextAreaElement;

	override firstUpdated(): void {
		this._initialValue = this.value;
		if (import.meta.env?.DEV && !this.accessibleLabel && !this.inputId) {
			console.warn('<nldd-multi-line-text-field>: No accessible-label or input-id provided. Use nldd-form-field for labeled usage, or set accessible-label for screen reader accessibility.');
		}
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
		if (changed.has('rows')) {
			// Expose rows to CSS so the resize="auto" min-height can floor the field
			// at the configured number of lines (field-sizing: content otherwise
			// ignores the rows attribute and lets it shrink to one line).
			this.style.setProperty('--_rows', String(this.rows));
		}
		if (changed.has('resize') && this.resize === 'auto' && this._textarea) {
			// Manual resize sets inline width/height on the textarea, which would
			// override field-sizing: content. Clear them when switching to auto.
			this._textarea.style.width = '';
			this._textarea.style.height = '';
		}
	}

	override formValue(): FormValue {
		return this.value;
	}

	formResetCallback(): void {
		this.value = this._initialValue;
	}


	formStateRestoreCallback(state: File | string | FormData | null): void {
		if (typeof state === 'string') this.value = state;
	}

	public _handleInput(e: Event): void {
		e.stopPropagation();
		const textarea = e.target as HTMLTextAreaElement;
		this.value = textarea.value;
		this.commitFormValue();
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
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this.value },
			bubbles: true,
			composed: true,
		}));
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

/**
 * Nederlandse Digitale Dienst Code Editor Component (Lit + TypeScript)
 *
 * A monospace text editor for code, YAML, JSON, and other technical
 * content. Visually pairs with `nldd-code` (same tinted background,
 * same monospace font, same rounded corners) so a read-only view and
 * the editable counterpart look like the same surface.
 *
 * Built on a native `<textarea>` — no syntax highlighting, no line
 * numbers. Reach for a real editor library (CodeMirror, Monaco) when
 * those features are required.
 *
 * Spellcheck and autocorrect are disabled by default since they don't
 * help on code; long lines scroll horizontally unless `wrap` is set.
 *
 * @element nldd-code-editor
 *
 * @attr {string} value           - The textarea value
 * @attr {string} placeholder     - Placeholder text
 * @attr {string} input-id        - Sets the id on the native textarea. Set automatically by nldd-form-field.
 * @attr {boolean} disabled       - Disabled state
 * @attr {string} name            - Textarea name for form submission
 * @attr {boolean} readonly       - Readonly state
 * @attr {boolean} required       - Required state
 * @attr {boolean} wrap           - Wrap long lines instead of horizontal scroll
 * @attr {number} rows            - Initial visible rows (minimum height). Default: 6.
 * @attr {string} resize          - 'none' | 'vertical' (default) | 'auto'.
 *                                  'auto' grows with content (native field-sizing).
 * @attr {string} accessible-label - Accessible label forwarded to the inner textarea. Set automatically by nldd-form-field.
 *
 * @fires input  - When value changes
 * @fires change - When value is committed (blur)
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { codeEditorStyles } from './code-editor.styles.js';
import { codeEditorTemplate } from './code-editor.template.js';

export type ResizeMode = 'none' | 'vertical' | 'auto';

@customElement('nldd-code-editor')
export class NLDDCodeEditor extends LitElement {
	static formAssociated = true;

	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	static override styles = codeEditorStyles;

	private _internals = this.attachInternals();

	private _initialValue = '';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'input-id' })
	inputId = '';

	@property({ type: String })
	placeholder = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	name = '';

	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: Boolean, reflect: true })
	wrap = false;

	@property({ type: Number })
	rows = 6;

	@property({ type: String, reflect: true })
	resize: ResizeMode = 'vertical';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@query('.code-editor__input')
	private _textarea!: HTMLTextAreaElement;

	override firstUpdated(): void {
		this._initialValue = this.value;
		// Always warn — production sites without an accessible label fail
		// WCAG SC 4.1.2 silently otherwise. Cheaper than a runtime throw,
		// which would risk breaking pages that rely on a parent
		// nldd-form-field setting input-id slightly later in the lifecycle.
		if (!this.accessibleLabel && !this.inputId) {
			console.warn('<nldd-code-editor>: No accessible-label or input-id provided. Use nldd-form-field for labeled usage, or set accessible-label for screen reader accessibility (WCAG SC 4.1.2).');
		}
	}

	override updated(changed: PropertyValues): void {
		if (changed.has('resize') && this.resize === 'auto' && this._textarea) {
			this._textarea.style.width = '';
			this._textarea.style.height = '';
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

	override render() {
		return codeEditorTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-code-editor': NLDDCodeEditor;
	}
}

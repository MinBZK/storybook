/**
 * Nederlandse Digitale Dienst Form Field Components (Lit + TypeScript)
 *
 * @element nldd-form-field
 *
 * @attr {string} label-alignment  - 'top' (default) | 'right' | 'left'
 * @attr {string} label            - Field label text. Omit for no-label layout.
 * @attr {string} supporting-label - Short supporting text below the label. Same typography as optional badge.
 * @attr {boolean} optional        - Shows an optional badge next to the label.
 * @attr {string} optional-label   - Text for the optional badge. Defaults to 'Optioneel'.
 *
 * @slot           - The slotted input (e.g. nldd-text-field). Set `invalid` and
 *                   `error-message="id1 id2"` on the input to wire up error texts.
 *                   nldd-form-field-error-text elements assign themselves to the
 *                   errors slot automatically.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @element nldd-form-field-help-text
 *
 * @slot - Help text content. May contain inline elements including links.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @element nldd-form-field-error-text
 *
 * @attr {string} id       - Referenced by the input's `error-message` attribute.
 * @attr {boolean} invalid - Visibility managed automatically by nldd-form-field.
 *
 * @slot - The error message text.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @example
 * <nldd-form-field label="Password">
 *   <nldd-form-field-help-text>
 *     At least 8 characters. <a href="/help">Learn more</a>.
 *   </nldd-form-field-help-text>
 *   <nldd-text-field invalid error-message="error-required error-length"></nldd-text-field>
 *   <nldd-form-field-error-text id="error-required">This field is required.</nldd-form-field-error-text>
 *   <nldd-form-field-error-text id="error-length">Must be at least 8 characters.</nldd-form-field-error-text>
 * </nldd-form-field>
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	formFieldStyles,
	formFieldHelpTextStyles,
	formFieldErrorTextStyles,
} from './form-field.styles.js';
import {
	formFieldTemplate,
	formFieldHelpTextTemplate,
	formFieldErrorTextTemplate,
} from './form-field.template.js';

export type LabelAlignment = 'top' | 'left' | 'right';

// Exclude helper elements so _findInput() never returns them instead of the actual input
const HELPER_TAGS = ['nldd-form-field-help-text', 'nldd-form-field-error-text'];

// crypto.randomUUID() requires a secure context (HTTPS or localhost).
// The fallback uses Math.random() which is sufficient for non-security-sensitive DOM IDs.
function generateId(): string {
	const uuid = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
	return `nldd-field-input-${uuid}`;
}


/* ============================================================
   nldd-form-field
   ============================================================ */

@customElement('nldd-form-field')
export class NLDDFormField extends LitElement {
	static override styles = formFieldStyles;

	/**
	 * Controls how the label is positioned relative to the input.
	 *  - 'top'   : label above the input (default)
	 *  - 'right' : 240 px column, right-aligned text
	 *  - 'left'  : 240 px column, left-aligned text
	 *
	 * Collapses to 'top' automatically when the container is < 640 px wide.
	 */
	@property({ type: String, attribute: 'label-alignment', reflect: true })
	labelAlignment: LabelAlignment = 'top';

	/** Label text. When empty no label is rendered but side-alignment indent is preserved. */
	@property({ type: String })
	label = '';

	/**
	 * Short supporting text shown below the label. Same typography as the
	 * optional badge. Use nldd-form-field-help-text for longer descriptive text.
	 */
	@property({ type: String, attribute: 'supporting-label' })
	supportingLabel = '';

	/**
	 * When true an "Optional" badge is shown next to the label.
	 * Required fields are intentionally left unmarked per design spec.
	 *
	 * Note: nldd-form-field does not auto-propagate `required` or `aria-required`
	 * to the slotted input. If the field is required, set `required` directly
	 * on the slotted input element so screen readers announce it correctly.
	 */
	@property({ type: Boolean })
	optional = false;

	/** Label text for the optional badge. Defaults to 'Optioneel'. Override for localisation. */
	@property({ type: String, attribute: 'optional-label' })
	optionalLabel = 'Optioneel';

	private _childObserver: MutationObserver | null = null;
	private _observer: MutationObserver | null = null;

	@state()
	private _hasErrors = false;

	override render() {
		return formFieldTemplate(this);
	}

	override updated(changed: Map<PropertyKey, unknown>) {
		this.classList.toggle('has-errors', this._hasErrors);
		if (changed.has('label')) {
			this._onSlotChange();
		}
	}

	override connectedCallback() {
		super.connectedCallback();
		this._childObserver = new MutationObserver(() => this._onSlotChange());
		this._childObserver.observe(this, { childList: true });
	}

	override firstUpdated() {
		this._onSlotChange();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._childObserver?.disconnect();
		this._observer?.disconnect();
	}

	/** Called when the label header is clicked — focuses the slotted input. */
	public _focusInput(e: Event) {
		// <label for> cannot cross shadow boundaries so we focus manually.
		const input = this._findInput();
		if (!input) return;

		// Only preventDefault for text-like inputs to avoid double-firing focus.
		// For checkbox/radio, preventDefault cancels the native toggle — don't call it.
		const tag = input.tagName.toLowerCase();
		const type = (input as HTMLInputElement).type?.toLowerCase();
		if (tag !== 'input' || (type !== 'checkbox' && type !== 'radio')) {
			e.preventDefault();
		}

		(input as HTMLElement).focus();
	}

	private _onSlotChange() {
		// Disconnect the previous attribute observer before wiring up a new one.
		this._observer?.disconnect();

		const input = this._findInput();
		if (!input) return;

		// Ensure the inner native input has an id so aria-describedby can reference it.
		// For custom elements (nldd-text-field, nldd-password-field) inputId is a property
		// that gets forwarded to the inner <input id>. For plain <input> elements we set
		// the id directly. We never set the host element's id to avoid duplicate IDs.
		const isCustomInput = 'inputId' in input;
		if (isCustomInput) {
			const existingId = (input as HTMLElement & { inputId: string }).inputId;
			const generatedId = existingId || generateId();
			(input as HTMLElement & { inputId: string }).inputId = generatedId;
		} else {
			if (!input.id) input.id = generateId();
		}

		// Custom elements (nldd-text-field, nldd-password-field) expose an `accessible-label`
		// attribute that they forward to their inner <input aria-label>. Native <input>
		// elements have no such property — set aria-label directly on them instead.
		if (this.label) {
			if (isCustomInput) {
				input.setAttribute('accessible-label', this.label);
				input.removeAttribute('aria-label');
			} else {
				input.setAttribute('aria-label', this.label);
				input.removeAttribute('accessible-label');
			}
		} else {
			input.removeAttribute('accessible-label');
			input.removeAttribute('aria-label');
		}

		// Ensure each help text element has an id so it can be referenced in aria-describedby
		Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'nldd-form-field-help-text')
			.forEach(el => { if (!el.id) el.id = generateId(); });

		this._observer = new MutationObserver(() => this._syncErrorText());
		this._observer.observe(input, {
			attributes: true,
			attributeFilter: ['invalid', 'error-message'],
		});

		this._syncErrorText();
	}

	/** First child element that is not a form field helper component. */
	private _findInput(): Element | undefined {
		return Array.from(this.children)
			.find(el => !HELPER_TAGS.includes(el.tagName.toLowerCase()));
	}

	/**
	 * Reads `invalid` and `error-message` from the input and toggles
	 * the `invalid` attribute on the referenced nldd-form-field-error-text elements.
	 * Also sets `aria-describedby` on the input to reference visible error texts.
	 *
	 * Note: this mechanism relies on the slotted input reflecting an `invalid`
	 * attribute, which nldd-text-field and nldd-password-field do. Plain native
	 * `<input>` elements use constraint validation (validity.valid, the `invalid`
	 * event) instead — support for native inputs is a known limitation and
	 * tracked as a follow-up.
	 */
	private _syncErrorText() {
		const input = this._findInput();
		if (!input) return;

		const isCustomInput = 'inputId' in input;
		const isInvalid = input.hasAttribute('invalid');
		const referencedIds = (input.getAttribute('error-message') ?? '')
			.split(' ')
			.filter(Boolean);

		const allErrorTexts = Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'nldd-form-field-error-text');

		const helpIds = Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'nldd-form-field-help-text' && el.id)
			.map(el => el.id);

		const visibleErrorIds: string[] = [];

		for (const el of allErrorTexts) {
			const shouldShow = isInvalid && referencedIds.includes(el.id);
			el.toggleAttribute('invalid', shouldShow);
			if (shouldShow && el.id) visibleErrorIds.push(el.id);
		}

		// Prepend help text IDs so they are announced first, then error IDs.
		const describedByIds = [...helpIds, ...visibleErrorIds];
		const describedByValue = describedByIds.join(' ');

		if (isCustomInput) {
			// For custom elements (nldd-text-field, nldd-password-field), set error-message-ids
			// so they can forward it to the inner <input aria-describedby>. IDs do not cross
			// shadow DOM boundaries so setting aria-describedby on the host is not sufficient.
			(input as unknown as HTMLElement & { errorMessageIds: string }).errorMessageIds = describedByValue;
		} else {
			if (describedByIds.length > 0) {
				input.setAttribute('aria-describedby', describedByValue);
			} else {
				input.removeAttribute('aria-describedby');
			}
		}

		this._hasErrors = visibleErrorIds.length > 0;
	}
}


/* ============================================================
   nldd-form-field-help-text
   ============================================================ */

@customElement('nldd-form-field-help-text')
export class NLDDFormFieldHelpText extends LitElement {
	static override styles = formFieldHelpTextStyles;

	override connectedCallback() {
		super.connectedCallback();
		// Assign to the 'help' slot automatically so consumers don't need to set slot="help" manually.
		// Note: this will overwrite any explicit slot attribute set by the consumer.
		this.slot = 'help';
	}

	override render() {
		return formFieldHelpTextTemplate(this);
	}
}


/* ============================================================
   nldd-form-field-error-text
   ============================================================ */

@customElement('nldd-form-field-error-text')
export class NLDDFormFieldErrorText extends LitElement {
	static override styles = formFieldErrorTextStyles;

	/**
	 * When present the error text is visible.
	 * Managed automatically by the parent nldd-form-field — do not set manually.
	 */
	@property({ type: Boolean, reflect: true })
	invalid = false;

	override connectedCallback() {
		super.connectedCallback();
		// Assign to the 'errors' slot automatically so consumers don't need to set slot="errors" manually.
		// Note: this will overwrite any explicit slot attribute set by the consumer.
		this.slot = 'errors';
	}

	override render() {
		return formFieldErrorTextTemplate(this);
	}
}


declare global {
	interface HTMLElementTagNameMap {
		'nldd-form-field': NLDDFormField;
		'nldd-form-field-help-text': NLDDFormFieldHelpText;
		'nldd-form-field-error-text': NLDDFormFieldErrorText;
	}
}

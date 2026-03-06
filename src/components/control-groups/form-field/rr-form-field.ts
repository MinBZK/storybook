/**
 * RegelRecht Form Field Components (Lit + TypeScript)
 *
 * @element rr-form-field
 *
 * @attr {string} label           - Field label text. Omit for no-label layout.
 * @attr {string} label-alignment - 'top' (default) | 'left' | 'right'
 * @attr {string} size            - 'md' (default) | 'sm' | 'xs' — vertically centres
 *                                  the header against the input in left/right alignment.
 * @attr {boolean} optional       - Shows "Optional" badge next to the label.
 *
 * @slot           - The slotted input (e.g. rr-text-field). Set `invalid` and
 *                   `error-message="id1 id2"` on the input to wire up error texts.
 *                   rr-form-field-error-text elements assign themselves to the
 *                   errors slot automatically.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @element rr-form-field-help-text
 *
 * @slot - Help text content. May contain inline elements including links.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @element rr-form-field-error-text
 *
 * @attr {string} id       - Referenced by the input's `error-message` attribute.
 * @attr {boolean} invalid - Visibility managed automatically by rr-form-field.
 *
 * @slot - The error message text.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @example
 * <rr-form-field label="Password">
 *   <rr-form-field-help-text>
 *     At least 8 characters. <a href="/help">Learn more</a>.
 *   </rr-form-field-help-text>
 *   <rr-text-field invalid error-message="err-required err-length"></rr-text-field>
 *   <rr-form-field-error-text id="err-required">This field is required.</rr-form-field-error-text>
 *   <rr-form-field-error-text id="err-length">Must be at least 8 characters.</rr-form-field-error-text>
 * </rr-form-field>
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
	formFieldStyles,
	formFieldHelpTextStyles,
	formFieldErrorTextStyles,
} from './rr-form-field.styles.js';
import {
	formFieldTemplate,
	formFieldHelpTextTemplate,
	formFieldErrorTextTemplate,
} from './rr-form-field.template.js';

export type LabelAlignment = 'top' | 'left' | 'right';
export type InputSize = 'xs' | 'sm' | 'md';

const HELPER_TAGS = ['rr-form-field-help-text'];

let idCounter = 0;
function generateId(): string {
	return `rr-field-input-${++idCounter}`;
}


/* ============================================================
   rr-form-field
   ============================================================ */

@customElement('rr-form-field')
export class RRFormField extends LitElement {
	static override styles = formFieldStyles;

	/** Label text. When empty no label is rendered but side-alignment indent is preserved. */
	@property({ type: String })
	label = '';

	/**
	 * Controls how the label is positioned relative to the input.
	 *  - 'top'   : label above the input (default)
	 *  - 'left'  : 240 px column, left-aligned text
	 *  - 'right' : 240 px column, right-aligned text
	 *
	 * Collapses to 'top' automatically when the container is < 640 px wide.
	 */
	@property({ type: String, attribute: 'label-alignment', reflect: true })
	labelAlignment: LabelAlignment = 'top';

	/**
	 * Size of the slotted input. Sets the header min-height so the label
	 * vertically centres against the input in left/right label-alignment.
	 */
	@property({ type: String, reflect: true })
	size: InputSize = 'md';

	/**
	 * When true an "Optional" badge is shown next to the label.
	 * Required fields are intentionally left unmarked per design spec.
	 */
	@property({ type: Boolean })
	optional = false;

	/**
	 * The id of the slotted input, used to associate the label via `for`.
	 * Set automatically when the input is slotted — do not set manually.
	 */
	@state()
	labelFor = '';

	private _childObserver: MutationObserver | null = null;
	private _observer: MutationObserver | null = null;

	override render() {
		return formFieldTemplate(this);
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

	override updated(changed: Map<string, unknown>) {
		if (changed.has('size')) {
			const input = this._findInput();
			if (input) this._forwardSize(input);
		}
	}

	/** Forwards the form field's size to the slotted input. */
	private _forwardSize(input: Element) {
		input.setAttribute('size', this.size);
	}

	/** Called when the label header is clicked — focuses the slotted input. */
	focusInput(e: Event) {
		// <label for> cannot cross shadow boundaries so we focus manually.
		e.preventDefault();
		(this._findInput() as HTMLElement | undefined)?.focus();
	}

	private _onSlotChange() {
		this._observer?.disconnect();

		const input = this._findInput();
		if (!input) return;

		// Use the consumer-provided id if available, otherwise generate one.
		// If the element exposes inputId (e.g. rr-text-field), read that as the
		// preferred id. Always set it on the element itself so the label for
		// can resolve it in the light DOM.
		const hasInputId = 'inputId' in input;
		const existingId = hasInputId
			? (input as HTMLElement & { inputId: string }).inputId
			: input.id;
		const generatedId = existingId || generateId();
		input.id = generatedId;
		this.labelFor = generatedId;
		this._forwardSize(input);

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
	 * the `invalid` attribute on the referenced rr-form-field-error-text elements.
	 */
	private _syncErrorText() {
		const input = this._findInput();
		if (!input) return;

		const isInvalid = input.hasAttribute('invalid');
		const referencedIds = (input.getAttribute('error-message') ?? '')
			.split(' ')
			.filter(Boolean);

		const allErrorTexts = Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'rr-form-field-error-text');

		for (const el of allErrorTexts) {
			const shouldShow = isInvalid && referencedIds.includes(el.id);
			el.toggleAttribute('invalid', shouldShow);
		}
	}
}


/* ============================================================
   rr-form-field-help-text
   ============================================================ */

@customElement('rr-form-field-help-text')
export class RRFormFieldHelpText extends LitElement {
	static override styles = formFieldHelpTextStyles;

	override connectedCallback() {
		super.connectedCallback();
		this.slot = 'help';
	}

	override render() {
		return formFieldHelpTextTemplate(this);
	}
}


/* ============================================================
   rr-form-field-error-text
   ============================================================ */

@customElement('rr-form-field-error-text')
export class RRFormFieldErrorText extends LitElement {
	static override styles = formFieldErrorTextStyles;

	/**
	 * When present the error text is visible.
	 * Managed automatically by the parent rr-form-field — do not set manually.
	 */
	@property({ type: Boolean, reflect: true })
	invalid = false;

	override connectedCallback() {
		super.connectedCallback();
		this.slot = 'errors';
	}

	override render() {
		return formFieldErrorTextTemplate(this);
	}
}


declare global {
	interface HTMLElementTagNameMap {
		'rr-form-field': RRFormField;
		'rr-form-field-help-text': RRFormFieldHelpText;
		'rr-form-field-error-text': RRFormFieldErrorText;
	}
}

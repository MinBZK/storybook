/**
 * RegelRecht Form Field Components (Lit + TypeScript)
 *
 * @element rr-form-field
 *
 * @attr {string} label-alignment  - 'top' (default) | 'right' | 'left'
 * @attr {string} label            - Field label text. Omit for no-label layout.
 * @attr {string} supporting-label - Short supporting text below the label. Same typography as optional badge.
 * @attr {boolean} optional        - Shows an optional badge next to the label.
 * @attr {string} optional-label   - Text for the optional badge. Defaults to 'Optioneel'.
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

// Exclude helper elements so _findInput() never returns them instead of the actual input
const HELPER_TAGS = ['rr-form-field-help-text', 'rr-form-field-error-text'];

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
	 * optional badge. Use rr-form-field-help-text for longer descriptive text.
	 */
	@property({ type: String, attribute: 'supporting-label' })
	supportingLabel = '';

	/**
	 * When true an "Optional" badge is shown next to the label.
	 * Required fields are intentionally left unmarked per design spec.
	 */
	@property({ type: Boolean })
	optional = false;

	/** Label text for the optional badge. Defaults to 'Optioneel'. Override for localisation. */
	@property({ type: String, attribute: 'optional-label' })
	optionalLabel = 'Optioneel';

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

	override updated(changed: Map<string, unknown>) {
		if (changed.has('label')) {
			this._onSlotChange();
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._childObserver?.disconnect();
		this._observer?.disconnect();
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

		// For custom elements like rr-text-field, inputId is passed as an attribute
		// and the inner native input gets the id via the template — setting it on
		// the host would create duplicate IDs.
		const hasInputId = 'inputId' in input;
		if (hasInputId) {
			const existingId = (input as HTMLElement & { inputId: string }).inputId;
			const generatedId = existingId || generateId();
			(input as HTMLElement & { inputId: string }).inputId = generatedId;
			this.labelFor = generatedId;
		} else {
			const generatedId = input.id || generateId();
			input.id = generatedId;
			this.labelFor = generatedId;
		}

		if (this.label) {
			input.setAttribute('accessible-label', this.label);
		} else {
			input.removeAttribute('accessible-label');
		}

		// Ensure each help text element has an id so it can be referenced in aria-describedby
		Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'rr-form-field-help-text')
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
	 * the `invalid` attribute on the referenced rr-form-field-error-text elements.
	 * Also sets `aria-describedby` on the input to reference visible error texts.
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

		const helpIds = Array.from(this.children)
			.filter(el => el.tagName.toLowerCase() === 'rr-form-field-help-text' && el.id)
			.map(el => el.id);

		const visibleErrorIds: string[] = [];

		for (const el of allErrorTexts) {
			const shouldShow = isInvalid && referencedIds.includes(el.id);
			el.toggleAttribute('invalid', shouldShow);
			if (shouldShow && el.id) visibleErrorIds.push(el.id);
		}

		// Prepend help text IDs so they are announced first, then error IDs.
		const describedByIds = [...helpIds, ...visibleErrorIds];
		if (describedByIds.length > 0) {
			input.setAttribute('aria-describedby', describedByIds.join(' '));
		} else {
			input.removeAttribute('aria-describedby');
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

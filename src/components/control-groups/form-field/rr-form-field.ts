/**
 * RegelRecht Form Field Components (Lit + TypeScript)
 *
 * @element rr-form-field
 *
 * @attr {string} label           - Field label text. Omit for no-label layout.
 * @attr {string} label-alignment - 'top' (default) | 'left' | 'right'
 * @attr {string} control-size    - 'md' (default) | 'sm' | 'xs' — vertically centres
 *                                  the header against the control in left/right alignment.
 * @attr {boolean} optional       - Shows "Optional" badge next to the label.
 *
 * @slot           - The form control (e.g. rr-text-field). Set `invalid` and
 *                   `error-message="id1 id2"` on the control to wire up error texts.
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
 * @attr {string} id       - Referenced by the control's `error-message` attribute.
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
import { customElement, property, query } from 'lit/decorators.js';
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
export type ControlSize = 'xs' | 'sm' | 'md';

const HELPER_TAGS = ['rr-form-field-help-text', 'rr-form-field-error-text'];


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
	 * Collapses to 'top' automatically when the container is < 640 px wide
	 * (requires a CSS container query context on the host's parent).
	 */
	@property({ type: String, attribute: 'label-alignment', reflect: true })
	labelAlignment: LabelAlignment = 'top';

	/**
	 * Size of the slotted control. Sets the header min-height so the label
	 * vertically centres against the control in left/right label-alignment.
	 */
	@property({ type: String, attribute: 'control-size', reflect: true })
	controlSize: ControlSize = 'md';

	/**
	 * When true an "Optional" badge is shown next to the label.
	 * Required fields are intentionally left unmarked per design spec.
	 */
	@property({ type: Boolean })
	optional = false;

	@query('slot:not([name])')
	private _slot!: HTMLSlotElement;

	private _observer: MutationObserver | null = null;

	override render() {
		return formFieldTemplate(this);
	}

	override firstUpdated() {
		this._slot.addEventListener('slotchange', () => this._onSlotChange());
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._observer?.disconnect();
	}

	private _onSlotChange() {
		this._observer?.disconnect();

		const control = this._findControl();
		if (!control) return;

		this._observer = new MutationObserver(() => this._syncErrorText());
		this._observer.observe(control, {
			attributes: true,
			attributeFilter: ['invalid', 'error-message'],
		});

		this._syncErrorText();
	}

	/** First slotted element that is not a form field helper component. */
	private _findControl(): Element | undefined {
		return this._slot
			.assignedElements({ flatten: true })
			.find(el => !HELPER_TAGS.includes(el.tagName.toLowerCase()));
	}

	/**
	 * Reads `invalid` and `error-message` from the control and toggles
	 * the `invalid` attribute on the referenced rr-form-field-error-text elements.
	 */
	private _syncErrorText() {
		const control = this._findControl();
		if (!control) return;

		const isInvalid = control.hasAttribute('invalid');
		const referencedIds = (control.getAttribute('error-message') ?? '')
			.split(' ')
			.filter(Boolean);

		const allErrorTexts = this._slot
			.assignedElements({ flatten: true })
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
		this.slot = 'help-text';
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

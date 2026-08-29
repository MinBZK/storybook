/**
 * Nederlandse Digitale Dienst Form Field Validation List (Lit + TypeScript)
 *
 * Everything a value has to satisfy, in one list. A requirement you can state
 * up front is an item with a rule, and it checks itself while you type. One
 * only a server can decide is an item without a rule, and the app names it in
 * `unmet` on the control.
 *
 * The list has two modes and `judging` is the switch. Before a verdict it shows
 * its hints, which are the requirements of the field. After one it shows
 * everything the value does not satisfy, and the hints are gone. It throws that
 * switch itself the moment its control turns `invalid`, so when the field is
 * judged is the consumer's decision, and the right moment is on submit.
 *
 * Hints are off by default. A phone number does not need its format spelled out
 * before anyone has typed, while the rules for a password do.
 *
 * There are no checkmarks. The control already shows a validation icon of its
 * own, and repeating that per line says the same thing three times.
 *
 * @element nldd-form-field-validation-list
 *
 * @attr {string} for - Id of the control this list is about. Not needed inside an nldd-form-field, which hands its own control over.
 * @attr {boolean} hint - Show every item before there is a verdict, as the requirements of the field. Overridable per item.
 * @attr {boolean} judging - Hold the value to its rules and show what it fails, instead of stating what the field wants. Turned on by the list itself once its control is `invalid`, and settable by hand.
 *
 * @slot - nldd-form-field-validation-item elements.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * @element nldd-form-field-validation-item
 *
 * @attr {string} match - Regular expression the value has to contain. Not anchored, unlike the native `pattern`: `[A-Z]` means "has a capital in it".
 * @attr {number} minlength - Fewest characters the value may have.
 * @attr {number} maxlength - Most characters the value may have.
 * @attr {boolean} required - The value may not be empty. Use it on a field whose other rules would pass an empty value.
 * @attr {boolean} hint - Show this item before there is a verdict, whatever the list says.
 * @attr {boolean} unmet - Whether the value fails this item. Managed by the list; do not set it yourself.
 * @attr {boolean} visible - Whether the item is on screen. Managed by the list.
 *
 * @slot - The text of the requirement.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Give every item an id that names its field as well as its rule. An id has to
 * be unique in the whole document, and `length` is the first thing three fields
 * in one form will all reach for.
 *
 * @example
 * <nldd-form-field label="Wachtwoord">
 *   <nldd-password-field name="password" invalid unmet="password-breach"></nldd-password-field>
 *   <nldd-form-field-validation-list hint>
 *     <nldd-form-field-validation-item id="password-length" minlength="8">Minimaal 8 tekens</nldd-form-field-validation-item>
 *     <nldd-form-field-validation-item id="password-capital" match="[A-Z]">Een hoofdletter</nldd-form-field-validation-item>
 *     <nldd-form-field-validation-item id="password-breach">Dit wachtwoord staat in een bekend datalek</nldd-form-field-validation-item>
 *   </nldd-form-field-validation-list>
 * </nldd-form-field>
 */
import { LitElement, type PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { formFieldValidationListStyles, formFieldValidationItemStyles } from './form-field-validation-list.styles.js';
import { formFieldValidationListTemplate, formFieldValidationItemTemplate } from './form-field-validation-list.template.js';

/** A control that can report its own validity to the form. */
interface ValidatableControl extends Element {
	internals?: ElementInternals;
	setCustomValidity?: (message: string) => void;
	value?: unknown;
}


/* ============================================================
   nldd-form-field-validation-item
   ============================================================ */

@customElement('nldd-form-field-validation-item')
export class NLDDFormFieldValidationItem extends LitElement {
	static override styles = formFieldValidationItemStyles;

	/** Not anchored, unlike the native `pattern`. See the note at the top. */
	@property({ type: String })
	match = '';

	@property({ type: Number })
	minlength?: number;

	@property({ type: Number })
	maxlength?: number;

	/** For a field whose other rules would pass an empty value. See `test`. */
	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: Boolean, reflect: true })
	hint = false;

	@property({ type: Boolean, reflect: true })
	unmet = false;

	@property({ type: Boolean, reflect: true })
	visible = false;

	/** Whether this item judges itself, or waits for the app to name it. */
	get hasRule(): boolean {
		return this.required
			|| Boolean(this.match)
			|| this.minlength !== undefined
			|| this.maxlength !== undefined;
	}

	/**
	 * Whether `value` satisfies this item, or null when there is nothing to
	 * satisfy because the item carries no rule.
	 *
	 * An empty value is held against the rules like any other, so "minimaal 8
	 * tekens" fails on it, because it does. What keeps a fresh field from
	 * lighting up all of its requirements is not this method but the verdict: an
	 * item only turns critical once the control says `invalid`, and an untouched
	 * field has not been judged yet.
	 */
	test(value: string): boolean | null {
		if (!this.hasRule) return null;
		if (this.required && !value) return false;
		if (this.minlength !== undefined && value.length < this.minlength) return false;
		if (this.maxlength !== undefined && value.length > this.maxlength) return false;
		if (this.match && !new RegExp(this.match, 'u').test(value)) return false;
		return true;
	}

	override connectedCallback() {
		super.connectedCallback();
		this.setAttribute('role', 'listitem');
	}

	override render() {
		return formFieldValidationItemTemplate(this);
	}
}


/* ============================================================
   nldd-form-field-validation-list
   ============================================================ */

@customElement('nldd-form-field-validation-list')
export class NLDDFormFieldValidationList extends LitElement {
	static override styles = formFieldValidationListStyles;

	/** Id of the control, for a list that sits outside an nldd-form-field. */
	@property({ type: String })
	for = '';

	@property({ type: Boolean, reflect: true })
	hint = false;

	/**
	 * Whether the list is judging the value or explaining what the field wants.
	 *
	 * The switch between the two modes. Off, the hints state the requirements;
	 * on, the list is a to-do of everything the value fails. It goes on the
	 * moment the control is `invalid`, and then stays on. A field that has been
	 * judged does not become unjudged: repair the value and the control turns
	 * valid again, but the question the hints answered has been asked and
	 * settled, so bringing them back would undo the one thing the verdict
	 * achieved.
	 *
	 * So when a field starts being judged is decided by whoever writes `invalid`
	 * on the control, and the moment to do that is on submit. Writing it while
	 * someone is still typing turns a field red about a value that is not
	 * finished, which is the one thing this list is built to avoid.
	 *
	 * Set it yourself to flip the mode without a control saying anything, and
	 * clear it to put the field back the way it started, which is what a reset
	 * wants.
	 */
	@property({ type: Boolean, reflect: true })
	judging = false;

	/**
	 * The control this list is about.
	 *
	 * Set by the wrapping nldd-form-field, which already answers "which control
	 * is this field about" for the label and the description. A `for` of its own
	 * wins, and setting this property directly is what a test or a story does.
	 */
	@property({ attribute: false })
	control: Element | null = null;

	/** The value to check, when there is no control to read it from. */
	@property({ attribute: false })
	value?: string;

	@state()
	private _resolved: Element | null = null;

	private _observer: MutationObserver | null = null;
	private _onInput = () => this._evaluate();

	override connectedCallback() {
		super.connectedCallback();
		this._resolve();
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._detach();
	}

	override updated(changed: PropertyValues) {
		if (changed.has('for') || changed.has('control')) this._resolve();
		this._evaluate();
	}

	override render() {
		return formFieldValidationListTemplate(this);
	}

	private get _items(): NLDDFormFieldValidationItem[] {
		return Array.from(this.children)
			.filter((el): el is NLDDFormFieldValidationItem => el instanceof NLDDFormFieldValidationItem);
	}

	/**
	 * Finds the control and starts listening to it.
	 *
	 * `getRootNode()` and not `document`: an IDREF only resolves inside its own
	 * tree, and a consumer who puts this form inside a component of their own
	 * would otherwise find nothing.
	 */
	private _resolve(): void {
		const root = this.getRootNode() as Document | ShadowRoot;
		const next = this.for ? root.getElementById?.(this.for) ?? null : this.control;
		if (next === this._resolved) return;

		this._detach();
		this._resolved = next;
		if (!next) return;

		next.addEventListener('input', this._onInput);
		this._observer = new MutationObserver(() => this._evaluate());
		this._observer.observe(next, { attributes: true, attributeFilter: ['invalid', 'valid', 'unmet'] });
	}

	private _detach(): void {
		this._resolved?.removeEventListener('input', this._onInput);
		this._observer?.disconnect();
		this._observer = null;
	}

	private _currentValue(): string {
		if (this.value !== undefined) return this.value;
		const control = this._resolved as ValidatableControl | null;
		return control?.value === undefined || control.value === null ? '' : String(control.value);
	}

	/**
	 * Decides per item whether it is met, and what that makes visible.
	 *
	 * An item with a rule judges itself; one without waits to be named in
	 * `unmet` on the control. Never both: a rule is held against the value as it
	 * is now, while `unmet` is a snapshot of the last check and therefore older,
	 * so letting the snapshot win would show a mistake that has been fixed.
	 */
	private _evaluate(): void {
		const control = this._resolved;
		// `valid` is the app saying it checked and this field is fine. Believe it
		// over a rule of our own that disagrees: painting a line red underneath a
		// field the app calls good helps nobody, and the disagreement is a rule
		// that was configured wrong.
		const met = control?.hasAttribute('valid') ?? false;
		if (control?.hasAttribute('invalid')) this.judging = true;
		const named = (control?.getAttribute('unmet') ?? '').split(' ').filter(Boolean);
		const value = this._currentValue();

		let anyVisible = false;
		let anyRuleFails = false;
		const messages: string[] = [];

		for (const item of this._items) {
			const rule = item.test(value);
			const failing = rule === null ? named.includes(item.id) : !rule;

			if (import.meta.env?.DEV && rule !== null && named.includes(item.id)) {
				console.warn(
					`<nldd-form-field-validation-list>: item "${item.id}" has a rule of its own and is also named in \`unmet\`. `
					+ 'The rule decides, and the name is ignored: it is a snapshot of the previous check and cannot be newer '
					+ 'than the value. Drop it from `unmet`, or take the rule off the item.',
				);
			}

			item.unmet = this.judging && !met && failing;
			item.visible = item.unmet || (!this.judging && (item.hint || this.hint));
			if (item.visible) anyVisible = true;
			if (rule === false) {
				anyRuleFails = true;
				messages.push(item.textContent?.trim() ?? '');
			}
		}

		this.classList.toggle('has-items', anyVisible);
		this._reportValidity(anyRuleFails, messages);
	}

	/**
	 * Hands the verdict to the control, so a form with a failing rule does not
	 * submit.
	 *
	 * Only the rules. What the app named in `unmet` it already knows, and
	 * reporting that back would be this list telling the app what the app told
	 * it.
	 */
	private _reportValidity(fails: boolean, messages: string[]): void {
		const control = this._resolved as ValidatableControl | null;
		if (!control) return;

		const message = fails ? messages.filter(Boolean).join('. ') : '';
		if (control.internals) {
			control.internals.setValidity(fails ? { customError: true } : {}, message || undefined, control as HTMLElement);
			return;
		}
		control.setCustomValidity?.(message);
	}
}


declare global {
	interface HTMLElementTagNameMap {
		'nldd-form-field-validation-list': NLDDFormFieldValidationList;
		'nldd-form-field-validation-item': NLDDFormFieldValidationItem;
	}
}

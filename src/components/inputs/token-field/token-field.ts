/**
 * Nederlandse Digitale Dienst Token Field Component (Lit + TypeScript)
 *
 * A multi-select input that looks like a normal input field: chosen values show
 * as dismissible tokens in a wrapping row, followed by an inline text input that
 * stretches to fill the remaining space and wraps to a new line (growing the
 * field) when it no longer fits. Options are supplied as a slotted nldd-menu,
 * exactly like nldd-combo-box; the filtering/menu wiring is added in a later
 * phase. This first phase is the frame + token layout + value handling.
 *
 * @element nldd-token-field
 * @attr {string}   values           - Initial token values as a comma-separated string
 *                                     (e.g. "nl, be, de"). Not reflected; the live value is
 *                                     the `.values` array property. Values can't contain commas.
 * @attr {string}   placeholder      - Placeholder shown in the input
 * @attr {string}   type             - Input type forwarded to the inner input (e.g. 'email')
 * @attr {string}   autocomplete     - Autocomplete hint forwarded to the inner input
 * @attr {string}   accessible-label - Accessible label forwarded as aria-label to the input
 * @attr {boolean}  allow-custom     - Allow free-typed values (not just menu options)
 * @attr {boolean}  valid            - Marks the field valid (shows the valid icon)
 * @attr {boolean}  invalid          - Marks the field invalid (shows the invalid icon)
 * @attr {boolean}  no-spellcheck    - Disables browser spellchecking on the inner input
 * @attr {boolean}  readonly         - Readonly: static tokens, no input/picker, read-only surface
 * @attr {boolean}  required         - Marks the field required (invalid when it has no tokens)
 * @attr {boolean}  disabled         - Disabled state
 * @attr {string}   name             - Name for form submission
 * @attr {object}   translations     - Override translation keys; unset keys fall back to Dutch
 *
 * @slot - An nldd-menu with nldd-menu-item options; each item's `value`/`text`
 *         supplies a token's value and its display label.
 *
 * @fires change - When the selected values change; detail: { values: string[] }
 * @fires input  - When the input text changes; detail: { value: string }
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { tokenFieldStyles } from './token-field.styles.js';
import { tokenFieldTemplate } from './token-field.template.js';
import { nlddTokenFieldTranslations, type NLDDTokenFieldTranslations } from './token-field.i18n.js';
import type { NLDDMenu, NLDDMenuItem } from '../../actions/menu/menu.js';
import '../../actions/menu/menu.js';

@customElement('nldd-token-field')
export class NLDDTokenField extends LitElement {
	static formAssociated = true;

	static override styles = tokenFieldStyles;

	// Clicking anywhere in the field focuses the inner input.
	static override shadowRootOptions = {
		...LitElement.shadowRootOptions,
		delegatesFocus: true,
	};

	private _internals = this.attachInternals();
	private _initialValues: string[] = [];

	// Property order matches the story controls (values kept high, above
	// placeholder, per the text-field convention). No `size` axis yet — the field
	// is md-only for now; a sm variant lands later.
	/** Selected token values. The attribute is a comma-separated string used to seed
	 *  the initial values (like native `<input value>`); it is not reflected, so the
	 *  live source is always the `.values` array property. Values can't contain
	 *  commas — set those via the property. */
	@property({
		converter: {
			fromAttribute: (value: string | null): string[] =>
				value ? value.split(',').map((v) => v.trim()).filter(Boolean) : [],
			toAttribute: (): null => null,
		},
	})
	values: string[] = [];

	@property({ type: String })
	placeholder = '';

	/** Input type forwarded to the inner input (e.g. 'email' for the right mobile
	 *  keyboard). Values are still handled as plain strings. */
	@property({ type: String })
	type = 'text';

	@property({ type: String })
	autocomplete = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Allow committing free-typed values (not just menu options). Wiring lands in
	 *  a later phase; here it already governs whether the input stays visible when
	 *  no options remain. */
	@property({ type: Boolean, reflect: true, attribute: 'allow-custom' })
	allowCustom = false;

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true, attribute: 'no-spellcheck' })
	noSpellcheck = false;

	/** Readonly: shows the tokens as static (no dismiss control, no input, no
	 *  picker) with the read-only surface treatment. */
	@property({ type: Boolean, reflect: true })
	readonly = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	name = '';

	@property({ type: Object })
	translations: Partial<NLDDTokenFieldTranslations> = {};

	/** The current text in the inline input; drives the menu filter. */
	@state()
	_text = '';

	/** Whether the option menu is currently open (drives aria-expanded). */
	@state()
	_isOpen = false;

	/** ID of the highlighted menu item, mirrored to aria-activedescendant. */
	@state()
	_highlightedId = '';

	private static _idCounter = 0;
	readonly _menuId = `nldd-token-field-menu-${NLDDTokenField._idCounter++}`;

	private _menu: NLDDMenu | null = null;
	private _resizeObserver: ResizeObserver | null = null;
	/** True between a picker pointerdown-while-open and its trailing click, so the
	 *  click (which follows the native light-dismiss) doesn't reopen the menu. */
	private _pickerPointerdownWhileOpen = false;

	public _t(key: keyof NLDDTokenFieldTranslations): string {
		return this.translations[key] ?? nlddTokenFieldTranslations[key];
	}

	// — Lifecycle ————————————————————————————————————————————————————————————

	override connectedCallback(): void {
		super.connectedCallback();
		this._resizeObserver = new ResizeObserver(() => this._updateMenuWidth());
		this._resizeObserver.observe(this);
		window.addEventListener('scroll', this._handleScrollOrResize, true);
		window.addEventListener('resize', this._handleScrollOrResize);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._resizeObserver?.disconnect();
		this._resizeObserver = null;
		window.removeEventListener('scroll', this._handleScrollOrResize, true);
		window.removeEventListener('resize', this._handleScrollOrResize);
		if (this._menu) {
			this._menu.removeEventListener('toggle', this._handleMenuToggle);
			this._menu.removeEventListener('select', this._handleMenuSelect);
			this._menu.removeEventListener('keydown', this._handleMenuKeydown);
			this._menu = null;
		}
	}

	override firstUpdated(): void {
		this._initialValues = [...this.values];
		this._updateFormValue();
	}

	override updated(changed: Map<string, unknown>): void {
		// A token added or removed changes which options are still available:
		// re-run the text filter (unhides options freed by a removed token) and
		// re-hide the ones now selected. Close the menu if nothing is left to add.
		if (changed.has('values')) {
			this._updateFormValue();
			if (this._menu) {
				this._syncMenuItems();
				if (!this._showInput) this._closeMenu();
			}
		}
		if (changed.has('required')) this._updateValidity();
		if (changed.has('readonly') && this.readonly) this._closeMenu();
		// The input narrows/widens as tokens come and go; keep the open menu's
		// pinned width in step with it (this runs after layout, so the rect is
		// current).
		if (this._isOpen) this._updateMenuWidth();
	}

	// — Form participation ————————————————————————————————————————————————————

	/** Submit one entry per value under `name` (like a multi-select), so a form
	 *  receives `name=value` repeated for each token. */
	private _updateFormValue(): void {
		const data = new FormData();
		for (const value of this.values) data.append(this.name, value);
		this._internals.setFormValue(this.name ? data : null);
		this._updateValidity();
	}

	/** A required field with no tokens is invalid (valueMissing). */
	private _updateValidity(): void {
		if (this.required && this.values.length === 0) {
			this._internals.setValidity(
				{ valueMissing: true },
				this._t('components.token-field.required-error-text'),
				this._input ?? this,
			);
		} else {
			this._internals.setValidity({});
		}
	}

	formResetCallback(): void {
		this.values = [...this._initialValues];
	}

	formDisabledCallback(disabled: boolean): void {
		this.disabled = disabled;
	}

	private get _input(): HTMLInputElement | null {
		return this.shadowRoot?.querySelector<HTMLInputElement>('.token-field__input') ?? null;
	}

	/** The input + picker wrapper — the menu's anchor, so the menu lines up under
	 *  the whole area (including the picker), not just the input. */
	private get _inputArea(): HTMLElement | null {
		return this.shadowRoot?.querySelector<HTMLElement>('.token-field__input-area') ?? null;
	}

	/** Delegate programmatic focus to the inner input. */
	override focus(options?: FocusOptions): void {
		this._input?.focus(options);
	}

	/** A token's display label: the matching slotted menu-item's text, else the
	 *  raw value (covers values whose option is not currently present). */
	/** Slotted menu options not yet selected — what the picker could still add. */
	private get _availableOptionCount(): number {
		let n = 0;
		for (const item of this.querySelectorAll('nldd-menu-item')) {
			const v = item.getAttribute('value');
			if (v != null && !this.values.includes(v)) n++;
		}
		return n;
	}

	/** Hide the input entirely when there is nothing left to do: no options remain
	 *  and free text is not allowed. Readonly fields never show the input. */
	public get _showInput(): boolean {
		return !this.readonly && (this.allowCustom || this._availableOptionCount > 0);
	}

	/** Whether an options menu is slotted — drives the picker button. Free-text-only
	 *  fields (e.g. e-mail addresses) have no menu and get no picker. */
	public get _hasMenu(): boolean {
		return this._menu !== null;
	}

	/** Show the picker only while there are still options left to pick. Once every
	 *  menu item sits in the field there is nothing to open, so it disappears.
	 *  Readonly fields never show the picker. */
	public get _showPicker(): boolean {
		return !this.readonly && this._hasMenu && this._availableOptionCount > 0;
	}

	public _labelFor(value: string): string {
		for (const item of this.querySelectorAll('nldd-menu-item')) {
			if (item.getAttribute('value') === value) {
				return item.getAttribute('text') ?? item.textContent?.trim() ?? value;
			}
		}
		return value;
	}

	public _addValue(value: string): void {
		if (!value || this.values.includes(value)) return; // dedupe
		this.values = [...this.values, value];
		this._emitChange();
	}

	public _removeValue(value: string): void {
		if (!this.values.includes(value)) return;
		this.values = this.values.filter((v) => v !== value);
		this._emitChange();
	}

	private _emitChange(): void {
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { values: [...this.values] },
				bubbles: true,
				composed: true,
			}),
		);
	}

	// — Input handlers ———————————————————————————————————————————————————————

	public _handleInput(e: Event): void {
		this._text = (e.target as HTMLInputElement).value;
		// A comma commits the text before it as a token (typed or pasted) — the
		// Enter-equivalent for free text. Only meaningful with custom values.
		if (this.allowCustom && this._text.includes(',')) {
			this._commitCommaSeparated();
			return;
		}
		this._syncMenuItems();
		if (!this._isOpen) this._openMenu();
		this.dispatchEvent(
			new CustomEvent('input', {
				detail: { value: this._text },
				bubbles: true,
				composed: true,
			}),
		);
	}

	/** Split the input on commas: every complete segment becomes a token; the
	 *  trailing segment (after the last comma) stays in the input to keep typing.
	 *  Emits a single change for the batch. */
	private _commitCommaSeparated(): void {
		const parts = this._text.split(',');
		const remainder = parts.pop() ?? '';
		const next = [...this.values];
		for (const part of parts) {
			const value = part.trim();
			if (value && !next.includes(value)) next.push(value);
		}
		if (next.length !== this.values.length) {
			this.values = next;
			this._emitChange();
		}
		this._text = remainder;
		if (this._input) this._input.value = remainder;
		this._syncMenuItems();
		this.dispatchEvent(
			new CustomEvent('input', {
				detail: { value: this._text },
				bubbles: true,
				composed: true,
			}),
		);
	}

	/** Close the menu when focus leaves the field for anything but the menu. */
	public _handleBlur(e: FocusEvent): void {
		const related = e.relatedTarget as Node | null;
		if (related && this._menu?.contains(related)) return;
		this._closeMenu();
	}

	public _handleKeydown(e: KeyboardEvent): void {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (!this._isOpen) {
					this._syncMenuItems();
					this._openMenu();
				} else {
					this._menu?.moveHighlight('next');
					this._updateActiveDescendant();
				}
				break;
			case 'ArrowUp':
				if (!this._isOpen) return;
				e.preventDefault();
				this._menu?.moveHighlight('prev');
				this._updateActiveDescendant();
				break;
			case 'Enter': {
				// A highlighted option wins; otherwise commit the typed text as a
				// custom token. Works whether the menu is open or not — with no
				// matching options the menu is closed, but Enter should still add
				// the free-text value. preventDefault only when we actually act, so
				// a no-op Enter can still submit an enclosing form.
				const highlighted = this._isOpen ? (this._menu?.getHighlighted() ?? null) : null;
				if (highlighted) {
					e.preventDefault();
					highlighted.select(); // routes through _handleMenuSelect
				} else if (this.allowCustom && this._text.trim()) {
					e.preventDefault();
					this._commitValue(this._text.trim());
				}
				break;
			}
			case 'Escape':
				if (!this._isOpen) return;
				e.preventDefault();
				this._closeMenu();
				break;
			case 'ArrowLeft':
				// At the very start of the input, step left into the tokens.
				if (this._caretAtStart() && this._tokens.length > 0) {
					e.preventDefault();
					this._focusTokenAt(this._tokens.length - 1);
				}
				break;
			case 'Backspace':
				// Empty input: step focus onto the last token first; a second
				// Backspace (now on the focused token) deletes it.
				if (this._text === '' && this._tokens.length > 0) {
					e.preventDefault();
					this._focusTokenAt(this._tokens.length - 1);
				}
				break;
		}
	}

	private _caretAtStart(): boolean {
		const input = this._input;
		return !!input && input.selectionStart === 0 && input.selectionEnd === 0;
	}

	// — Token roving navigation ————————————————————————————————————————————————

	private get _tokens(): HTMLElement[] {
		return Array.from(this.shadowRoot?.querySelectorAll<HTMLElement>('.token-field__token') ?? []);
	}

	/** Focus the token at `index` (clamped); focus the input when there are none. */
	private _focusTokenAt(index: number): void {
		const tokens = this._tokens;
		if (tokens.length === 0) {
			this._input?.focus();
			return;
		}
		tokens[Math.max(0, Math.min(index, tokens.length - 1))].focus();
	}

	/** Arrow keys move between tokens; ArrowRight past the last returns to the
	 *  input; Backspace/Delete removes the token and keeps focus in the row. */
	public _handleTokenKeydown(e: KeyboardEvent, index: number): void {
		switch (e.key) {
			case 'ArrowLeft':
				e.preventDefault();
				this._focusTokenAt(index - 1);
				break;
			case 'ArrowRight':
				e.preventDefault();
				if (index >= this._tokens.length - 1) this._input?.focus();
				else this._focusTokenAt(index + 1);
				break;
			case 'Home':
				e.preventDefault();
				this._focusTokenAt(0);
				break;
			case 'End':
				e.preventDefault();
				this._focusTokenAt(this._tokens.length - 1);
				break;
			case 'Backspace':
			case 'Delete': {
				// Remove the token and return focus to the input, so the next
				// Backspace steps onto the new last token — a repeatable delete cycle.
				e.preventDefault();
				this._removeValue(this.values[index]);
				void this.updateComplete.then(() => this._input?.focus());
				break;
			}
		}
	}

	/** Clicking anywhere in the field (except a token or the picker) just focuses
	 *  the input. The menu is opened deliberately via the picker, typing, or
	 *  ArrowDown — not by clicking the field, which felt too eager. */
	public _handleFieldClick(e: Event): void {
		const target = e.target as HTMLElement;
		if (target.closest('nldd-token') || target.closest('.token-field__picker')) return;
		this._input?.focus();
	}

	/**
	 * The picker (a real button) toggles the menu. Because it opens on `click`
	 * (after the gesture's pointerdown), the auto-popover isn't light-dismissed by
	 * the opening gesture. When the menu is already open, this same gesture's
	 * pointerdown light-dismisses it; the flag makes the trailing click a no-op so
	 * it doesn't flicker back open. Mirrors the combo-box picker.
	 */
	public _handlePickerPointerdown(): void {
		if (this._isOpen) this._pickerPointerdownWhileOpen = true;
	}

	public _togglePicker(): void {
		this._input?.focus();
		if (this._pickerPointerdownWhileOpen) {
			this._pickerPointerdownWhileOpen = false;
			return;
		}
		if (this._isOpen) {
			this._closeMenu();
		} else {
			this._syncMenuItems();
			this._openMenu();
		}
	}

	// — Menu wiring ——————————————————————————————————————————————————————————

	public _onSlotChange(): void {
		this.requestUpdate(); // re-render token labels when options change

		const slot = this.shadowRoot?.querySelector('slot');
		const menu = slot
			?.assignedElements({ flatten: true })
			.find((el) => el.tagName.toLowerCase() === 'nldd-menu') as NLDDMenu | undefined;
		if (!menu) return;

		if (menu === this._menu) return;

		this._menu = menu;
		menu.id = this._menuId;
		menu.anchorElement = this;
		menu.placement = 'bottom-start';
		menu.variant = 'listbox';
		menu.addEventListener('toggle', this._handleMenuToggle);
		menu.addEventListener('select', this._handleMenuSelect);
		menu.addEventListener('keydown', this._handleMenuKeydown);
		this._updateMenuWidth();
		this._hideSelectedMenuItems();
	}

	/** Pin the menu to the native input's width (its anchor) so it lines up under
	 *  the input and never extends past it. */
	private _updateMenuWidth(): void {
		if (!this._menu) return;
		const rect = (this._inputArea ?? this._input ?? this).getBoundingClientRect();
		this._menu.width = `${rect.width}px`;
	}

	private _handleScrollOrResize = (): void => {
		if (!this._isOpen) return;
		this._updateMenuWidth();
		this._menu?.reposition();
	};

	private _handleMenuToggle = (e: Event): void => {
		this._isOpen = (e as ToggleEvent).newState === 'open';
		if (!this._isOpen) {
			this._highlightedId = '';
		} else {
			requestAnimationFrame(() => {
				// The menu clears its highlight on open; seat it on the first option
				// by default so that option is the active descendant and Enter picks
				// it — unless something is already highlighted.
				if (this._menu && !this._menu.getHighlighted()) this._menu.moveHighlight('next');
				this._updateActiveDescendant();
			});
		}
	};

	private _handleMenuSelect = (e: Event): void => {
		const item = e.target as NLDDMenuItem;
		this._commitValue(item.value || item.text);
	};

	/**
	 * Tab inside the menu (a top-layer popover) would move focus to an arbitrary
	 * next element in DOM order. Instead close the menu and return focus to the
	 * input so Tab continues from there — same handling as the combo-box.
	 */
	private _handleMenuKeydown = (e: KeyboardEvent): void => {
		if (e.key !== 'Tab') return;
		e.preventDefault();
		this._closeMenu();
		this._input?.focus();
	};

	/**
	 * Add a value, clear the input, and close the menu — focus returns to the empty
	 * input. The menu only reopens on a deliberate action (typing, ArrowDown, or the
	 * picker), so a focused empty field behaves the same whether it was just focused
	 * or a value was just committed.
	 */
	private _commitValue(value: string): void {
		this._addValue(value);
		this._resetInputText();
		this._input?.focus();
		this._closeMenu();
	}

	public _openMenu(): void {
		if (!this._menu || this.disabled) return;
		if (!('showPopover' in this._menu)) return;
		// Nothing to show (all options selected / filtered out) — don't open an
		// empty menu. Callers sync the items first, so the count is current.
		if (this._visibleOptionCount === 0) return;
		// Guard on the real popover state, not `_isOpen`: the popover toggle event
		// that drives `_isOpen` is async, so right after a menu-item hides the
		// popover `_isOpen` is still stale-true — guarding on it would wrongly skip
		// the reopen. `:popover-open` also prevents the throw on double-show.
		if ((this._menu as HTMLElement).matches(':popover-open')) return;
		// Anchor to the input + picker wrapper so the menu lines up under the whole
		// field row (including the picker), wherever it sits after the tokens.
		this._menu.anchorElement = this._inputArea ?? this._input ?? this;
		this._updateMenuWidth();
		(this._menu as HTMLElement).showPopover();
	}

	public _closeMenu(): void {
		if (!this._menu) return;
		if (!(this._menu as HTMLElement).matches(':popover-open')) return;
		(this._menu as HTMLElement).hidePopover();
	}

	private _updateActiveDescendant(): void {
		this._highlightedId = this._menu?.getHighlightedId() ?? '';
	}

	private _resetInputText(): void {
		this._text = '';
		if (this._input) this._input.value = '';
	}

	/** Options currently shown in the menu (matching the filter and not already
	 *  selected). Zero means there is nothing worth opening the menu for. */
	private get _visibleOptionCount(): number {
		if (!this._menu) return 0;
		return this._menu.querySelectorAll('nldd-menu-item:not([hidden])').length;
	}

	/** Apply the text filter, then hide options already selected. Used after
	 *  typing, selecting, and whenever `values` changes. */
	private _syncMenuItems(): void {
		if (!this._menu) return;
		this._menu.filter(this._text);
		this._hideSelectedMenuItems();
		this._updateActiveDescendant();
		// Don't leave an empty menu open. Without options the empty-state dialog is
		// noise — especially with allow-custom, where the user just types instead.
		if (this._isOpen && this._visibleOptionCount === 0) this._closeMenu();
	}

	/** Hide every option whose value is already a token. The text filter unhides
	 *  matches, so this runs after it. Moves the highlight off an item it hides. */
	private _hideSelectedMenuItems(): void {
		if (!this._menu) return;
		const selected = new Set(this.values);
		let reseat = false;
		for (const el of this._menu.querySelectorAll('nldd-menu-item')) {
			const item = el as NLDDMenuItem;
			if (selected.has(item.value || item.text)) {
				if (item.hasAttribute('highlighted')) reseat = true;
				item.setAttribute('hidden', '');
			}
		}
		if (reseat) this._menu.moveHighlight('next');
	}

	override render() {
		return tokenFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-token-field': NLDDTokenField;
	}
}

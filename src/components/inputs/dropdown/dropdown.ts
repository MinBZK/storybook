/**
 * Nederlandse Digitale Dienst Dropdown Component (Lit + TypeScript)
 *
 * A visual wrapper around a native `<select>` element.
 * The consumer provides a native `<select>` as a slotted child — this way
 * the browser retains full control over form submission, accessibility
 * and keyboard navigation, including `<optgroup>`, `data-*` attributes and
 * dynamic changes to options.
 *
 * @element nldd-dropdown
 * @attr {string} size - Size: 'xs' | 'sm' | 'md' (default: 'md')
 * @attr {boolean} valid - Marks the field as valid
 * @attr {boolean} invalid - Marks the field as invalid
 * @attr {boolean} disabled - Disabled state; also forwarded to the slotted select
 * @attr {boolean} expanded - Reflects whether the native picker popup is open (driven internally)
 * @attr {string} width - Optional fixed width (any CSS length, e.g. "240px"). Default: stretches to fill container.
 * @attr {string} accessible-label - Accessible name, forwarded as aria-label to the slotted select
 *
 * @slot - A native `<select>` element with `<option>` and/or `<optgroup>` children
 *
 * @fires change - Bubbles up from the slotted select; detail: { value: string }
 *
 * @example
 * ```html
 * <nldd-dropdown>
 *   <select name="land" aria-label="Land">
 *     <option value="" disabled selected>Selecteer een land</option>
 *     <option value="nl">Nederland</option>
 *     <option value="be">België</option>
 *   </select>
 * </nldd-dropdown>
 * ```
 */
import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { dropdownStyles } from './dropdown.styles.js';
import { dropdownTemplate } from './dropdown.template.js';
import { isPointerMode } from '../../../utilities/input-modality.js';
import './../../content/icon/icon.js';

export type DropdownSize = 'xs' | 'sm' | 'md';

@customElement('nldd-dropdown')
export class NLDDDropdown extends LitElement {
	static override styles = dropdownStyles;

	@property({ reflect: true, converter: reflectNonDefault<DropdownSize>('md') })
	size: DropdownSize = 'md';

	@property({ type: Boolean, reflect: true })
	valid = false;

	@property({ type: Boolean, reflect: true })
	invalid = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	expanded = false;

	/** Optional fixed width (any CSS length). When unset, the field stretches to fill its container. */
	@property({ type: String, reflect: true })
	width = '';

	/**
	 * Accessible name, forwarded as aria-label to the slotted `<select>`. The
	 * wrapper is not the control, so a name on the wrapper reaches nobody. Leave
	 * it empty and name the `<select>` yourself if you prefer.
	 */
	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@state()
	_displayValue = '';

	private _select: HTMLSelectElement | null = null;

	// — Lifecycle ——————————————————————————————————————————————————————————————

	override updated(changedProperties: Map<string, unknown>): void {
		if (changedProperties.has('disabled')) {
			this._syncDisabled();
		}
		if (changedProperties.has('invalid')) {
			this._syncAriaInvalid();
		}
		if (changedProperties.has('accessibleLabel')) {
			this._syncAccessibleLabel();
		}
		if (changedProperties.has('width')) {
			const w = this.width;
			if (w && w !== 'full' && CSS.supports('width', w)) {
				this.style.setProperty('--_width', w);
			} else {
				this.style.removeProperty('--_width');
			}
		}
	}

	// — Slot ——————————————————————————————————————————————————————————————————

	public _onSlotChange(): void {
		const slot = this.shadowRoot?.querySelector('slot');
		const select = slot?.assignedElements({ flatten: true })
			.find((el): el is HTMLSelectElement => el.tagName === 'SELECT') ?? null;

		if (this._select && this._select !== select) {
			this._select.removeEventListener('change', this._handleSelectChange);
			this._select.removeEventListener('focus', this._handleSelectFocus);
			this._select.removeEventListener('blur', this._handleSelectBlur);
			this._select.removeEventListener('keydown', this._handleSelectKeydown);
			this._select.removeEventListener('toggle', this._handleSelectToggle);
		}

		this._select = select;

		if (!select) {
			this._displayValue = '';
			this.expanded = false;
			return;
		}

		if (import.meta.env?.DEV && !this.accessibleLabel && !select.hasAttribute("aria-label") && !select.hasAttribute("aria-labelledby") && !select.labels?.length) {
			console.warn('<nldd-dropdown>: The slotted <select> has no accessible name. Add an aria-label or aria-labelledby attribute to the <select> element.');
		}

		select.addEventListener('change', this._handleSelectChange);
		select.addEventListener('focus', this._handleSelectFocus);
		select.addEventListener('blur', this._handleSelectBlur);
		select.addEventListener('keydown', this._handleSelectKeydown);
		select.addEventListener('toggle', this._handleSelectToggle);
		this._syncDisabled();
		this._syncAriaInvalid();
		this._syncAccessibleLabel();
		this._syncDisplayValue();
	}

	// — Internal helpers ——————————————————————————————————————————————————————

	private _syncDisabled(): void {
		if (!this._select) return;
		this._select.disabled = this.disabled;
	}

	/** Puts the name on the `<select>`, which is the element assistive software lands on. */
	private _syncAccessibleLabel(): void {
		if (!this._select) return;
		if (this.accessibleLabel) {
			this._select.setAttribute('aria-label', this.accessibleLabel);
		} else {
			this._select.removeAttribute('aria-label');
		}
	}

	private _syncAriaInvalid(): void {
		if (!this._select) return;
		if (this.invalid) {
			this._select.setAttribute('aria-invalid', 'true');
		} else {
			this._select.removeAttribute('aria-invalid');
		}
	}

	private _syncDisplayValue(): void {
		if (!this._select) return;
		this._displayValue = this._select.selectedOptions[0]?.text ?? '';
	}

	private _handleSelectChange = (e: Event): void => {
		e.stopPropagation();
		this._syncDisplayValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { value: this._select?.value ?? '' },
			bubbles: true,
			composed: true,
		}));
	};

	/**
	 * Suppress the native `:focus-visible` ring on the wrapper when focus
	 * came from a pointer. We can't rely on `:focus-visible` alone for
	 * native <select> because Chrome matches it even on mouse click. The
	 * inverted "set when known-to-be-pointer" form is failure-safe — if
	 * input-modality never reports, the attribute stays off and the
	 * default focus ring shows on every focus (keyboard a11y intact).
	 */
	private _handleSelectFocus = (): void => {
		this.toggleAttribute('is-pointer-focus', isPointerMode());
	};

	private _handleSelectBlur = (): void => {
		this.toggleAttribute('is-pointer-focus', false);
		this.expanded = false;
	};

	/** Any key press while focused promotes to keyboard mode — drop the marker. */
	private _handleSelectKeydown = (): void => {
		this.toggleAttribute('is-pointer-focus', false);
	};

	/**
	 * Native <select> dispatches a `toggle` event with `newState` of 'open' or
	 * 'closed' (Chrome 131+, Firefox 134+, Safari 18+). Older browsers
	 * silently skip this — the visual expanded state is then a no-op.
	 */
	private _handleSelectToggle = (e: Event): void => {
		this.expanded = (e as ToggleEvent).newState === 'open';
	};

	/**
	 * Delegates focus to the slotted `<select>`. The wrapper itself is not
	 * focusable, so without this a label pointing at the dropdown has nowhere
	 * to send focus.
	 */
	override focus(options?: FocusOptions): void {
		this._select?.focus(options);
	}

	override render() {
		return dropdownTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-dropdown': NLDDDropdown;
	}
}

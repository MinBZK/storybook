/**
 * Nederlandse Digitale Dienst Toggle Button Component (Lit + TypeScript)
 *
 * A selectable button that toggles between selected and unselected.
 * Available as a button (aria-pressed), checkbox, or radio input.
 *
 * @element nldd-toggle-button
 *
 * @attr {'button' | 'checkbox' | 'radio'} type - Underlying element (default: 'button')
 * @attr {'xs' | 'sm' | 'md' | 'lg'} size - Button size (default: 'md')
 * @attr {boolean} selected - Selected state
 * @attr {boolean} disabled - Disabled state
 * @attr {boolean} no-tab - Takes the control out of the tab order (tabindex="-1"), for a control owned by a roving container (a row of an nldd-list, where the arrow keys move between rows) that manages focus itself. Still mouse- and script-focusable.
 * @attr {string} value - Value for form submission (checkbox/radio)
 * @attr {string} name - Name for form submission (checkbox/radio)
 * @attr {string} text - Button text
 * @attr {string} icon - Icon name for nldd-icon
 * @attr {'text' | 'icon' | 'icon-and-text'} variant - What renders: text, icon, or both. Unset → auto-detect from text/icon attributes.
 * @attr {string} accessible-label - Accessible label; required for icon-only usage
 *
 * @slot icon - Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set.
 *
 * @fires change - When selection changes; detail: { selected: boolean, value: string }
 */

import { LitElement, type PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FormAssociated, type FormValue } from '../../../utilities/form-associated-mixin.js';
import { reflectNonDefault } from '../../../utilities/reflect-non-default.js';
import { toggleButtonStyles } from './toggle-button.styles.js';
import { toggleButtonTemplate } from './toggle-button.template.js';
import './../../content/icon/icon.js';

export type ToggleButtonType = 'button' | 'checkbox' | 'radio';
export type ToggleButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ToggleButtonVariant = 'text' | 'icon' | 'icon-and-text';

@customElement('nldd-toggle-button')
export class NLDDToggleButton extends FormAssociated(LitElement) {

	static override styles = toggleButtonStyles;

	/** Says this is the control an nldd-form-field is about, so the field can
	 *  find it, name it and move focus into it. See nldd-form-field. */
	static isFormInput = true;


	private _initialSelected = false;

	@property({ type: String, reflect: true })
	type: ToggleButtonType = 'button';

	@property({ reflect: true, converter: reflectNonDefault<ToggleButtonSize>('md') })
	size: ToggleButtonSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;
	/** Take the control out of the tab order (`tabindex="-1"`) — for a control
	 *  owned by a roving container (an `nldd-list` sets it on the rows that are
	 *  not the current one) that manages focus itself. Still mouse- and
	 *  script-focusable. */
	@property({ type: Boolean, reflect: true, attribute: 'no-tab' })
	noTab = false;


	@property({ type: String })
	value = 'on';

	@property({ type: String, reflect: true })
	name = '';

	/** Button text. */
	@property({ reflect: true, converter: reflectNonDefault<string>('') })
	text = '';

	/** Icon name for the nldd-icon element. When not set, the icon slot is used; the
	 *  icon and icon-and-text variants show a placeholder icon when neither is provided. */
	@property({ type: String })
	icon = '';

	@property({ reflect: true, converter: reflectNonDefault<ToggleButtonVariant | ''>('') })
	variant: ToggleButtonVariant | '' = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Whether an icon is present via attribute or slot. */
	get _hasIcon(): boolean {
		if (this.icon) return true;
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');
		if (slot && slot.assignedElements().length > 0) return true;
		/* On the first render the shadow slot doesn't exist yet, so fall
		 * back to a light-DOM check so the initial render can see slotted
		 * content. The slotchange handler triggers re-renders for later
		 * changes. */
		return this.querySelector(':scope > [slot="icon"]') !== null;
	}

	private _warnedA11y = false;
	private _warnedEmptyIcon = false;

	override firstUpdated(): void {
		this._initialSelected = this.selected;
	}

	override updated(changed: PropertyValues): void {
		/* A button needs an accessible name. That name comes from either
		 * the visible text or the explicit accessible-label. Without
		 * either, the button is anonymous to assistive tech. */
		const inaccessible = !this.text && !this.accessibleLabel;
		if (import.meta.env?.DEV && inaccessible && !this._warnedA11y) {
			this._warnedA11y = true;
			console.warn('<nldd-toggle-button>: Provide a text or accessible-label attribute for accessibility.');
		} else if (!inaccessible) {
			this._warnedA11y = false;
		}
		/* variant="icon" with no icon attribute and no slotted icon falls back
		 * to a placeholder — flag the likely misconfiguration during development. */
		if (import.meta.env?.DEV && this.variant === 'icon' && !this._hasIcon && !this._warnedEmptyIcon) {
			this._warnedEmptyIcon = true;
			console.warn('<nldd-toggle-button variant="icon">: No icon attribute or slot="icon" content provided. A placeholder icon is shown.');
		} else if (this._hasIcon || this.variant !== 'icon') {
			this._warnedEmptyIcon = false;
		}
		if (changed.has('selected') || changed.has('value') || changed.has('type')) {
			this.commitFormValue();
		}
	}

	override formValue(): FormValue {
		// Only checkbox/radio variants participate in form submission.
		const submits = this.type === 'checkbox' || this.type === 'radio';
		return submits && this.selected ? this.value : null;
	}

	formResetCallback(): void {
		this.selected = this._initialSelected;
	}


	formStateRestoreCallback(state: File | string | FormData | null): void {
		this.selected = state !== null;
	}

	_handleButtonClick(): void {
		if (this.disabled) return;
		this._toggle();
	}

	_handleInputChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.selected = input.checked;
		this._dispatchChange();
	}

	private _toggle(): void {
		this.selected = !this.selected;
		this._dispatchChange();
	}

	private _dispatchChange(): void {
		this.commitFormValue();
		this.dispatchEvent(new CustomEvent('change', {
			detail: { selected: this.selected, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Toggle selected state programmatically.
	 * For type="radio", the button can only be selected, never deselected (native behavior).
	 */
	toggle(): void {
		if (this.disabled) return;
		if (this.type === 'radio' && this.selected) return;
		this._toggle();
	}

	/**
	 * Delegates focus to whichever control this type renders: the `<input>` for
	 * `checkbox` and `radio`, the `<button>` for `button`. Only one of the two
	 * exists at a time. Lets consumers call `toggleButtonEl.focus()` without
	 * reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot
			?.querySelector<HTMLElement>('.toggle-button__input, button.toggle-button')
			?.focus(options);
	}

	override render() {
		return toggleButtonTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-toggle-button': NLDDToggleButton;
	}
}

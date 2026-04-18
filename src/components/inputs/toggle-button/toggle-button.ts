/**
 * Nederlandse Digitale Dienst Toggle Button Component (Lit + TypeScript)
 *
 * A selectable button that toggles between selected and unselected.
 * Available as a button (aria-pressed), checkbox, or radio input.
 *
 * @element nldd-toggle-button
 *
 * @attr {'button' | 'checkbox' | 'radio'} type - Underlying element (default: 'button')
 * @attr {'xs' | 'sm' | 'md'}              size - Button size (default: 'md')
 * @attr {boolean}                         selected         - Selected state
 * @attr {boolean}                         disabled         - Disabled state
 * @attr {string}                          value            - Value for form submission (checkbox/radio)
 * @attr {string}                          name             - Name for form submission (checkbox/radio)
 * @attr {string}                          text             - Button text
 * @attr {string}                          icon             - Icon name for nldd-icon
 * @attr {string}                          accessible-label - Accessible label; required for icon-only usage
 *
 * @slot icon - Slot for a custom icon (e.g. custom SVG). Only used when icon attribute is not set.
 *
 * @fires change - When selection changes; detail: { selected: boolean, value: string }
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toggleButtonStyles } from './toggle-button.styles.ts';
import { toggleButtonTemplate } from './toggle-button.template.ts';
import './../../content/icon/icon.ts';

export type ToggleButtonType = 'button' | 'checkbox' | 'radio';
export type ToggleButtonSize = 'xs' | 'sm' | 'md';

@customElement('nldd-toggle-button')
export class NLDDToggleButton extends LitElement {
	static override styles = toggleButtonStyles;

	@property({ type: String, reflect: true })
	type: ToggleButtonType = 'button';

	@property({ type: String, reflect: true })
	size: ToggleButtonSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = 'on';

	@property({ type: String })
	name = '';

	/** Button text. */
	@property({ type: String })
	text = '';

	/** Icon name for the nldd-icon element. When not set, the icon slot is used. */
	@property({ type: String })
	icon = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	/** Whether an icon is present via attribute or slot. */
	private get _hasIcon(): boolean {
		if (this.icon) return true;
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot[name="icon"]');
		return (slot?.assignedElements().length ?? 0) > 0;
	}

	private _warnedA11y = false;

	override updated(): void {
		const iconOnly = this._hasIcon && !this.text;
		this.toggleAttribute('icon-only', iconOnly);
		const inaccessible = iconOnly && !this.accessibleLabel;
		if (inaccessible && !this._warnedA11y) {
			this._warnedA11y = true;
			console.warn('<nldd-toggle-button>: Icon-only usage requires an accessible-label attribute for accessibility.');
		} else if (!inaccessible) {
			this._warnedA11y = false;
		}
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

	override render() {
		return toggleButtonTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-toggle-button': NLDDToggleButton;
	}
}

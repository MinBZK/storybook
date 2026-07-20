/**
 * Nederlandse Digitale Dienst Radio Button Field Component (Lit + TypeScript)
 *
 * A radio button with an inline label. Use inside nldd-radio-button-group
 * for keyboard navigation and group semantics. The group sets the name.
 *
 * @element nldd-radio-button-field
 * @attr {boolean} checked  - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string}  value    - Value for form submission
 * @attr {string}  name     - Radio group name for form submission, forwarded to the inner nldd-radio-button. Set automatically by nldd-radio-button-group.
 * @attr {boolean} required - Required state, forwarded to the inner nldd-radio-button. Set automatically by nldd-radio-button-group.
 * @attr {string}  label    - Label text for the radio button
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioButtonFieldStyles } from './radio-button-field.styles.js';
import { radioButtonFieldTemplate } from './radio-button-field.template.js';
import type { NLDDRadioButton } from '../radio-button/radio-button.js';

@customElement('nldd-radio-button-field')
export class NLDDRadioButtonField extends LitElement {
	static override styles = radioButtonFieldStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = '';

	/** Set by nldd-radio-button-group. Not part of the public API. */
	@property({ type: String })
	name = '';

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String })
	label = '';

	public _handleLabelClick(e: Event): void {
		if (this.disabled) return;
		if ((e.target as HTMLElement).closest?.('nldd-radio-button')) return;
		const radioButton = this.shadowRoot?.querySelector('nldd-radio-button') as NLDDRadioButton | null;
		radioButton?.select();
	}

	public _handleChange(e: Event): void {
		this.checked = (e as CustomEvent<{ checked: boolean }>).detail.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return radioButtonFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-radio-button-field': NLDDRadioButtonField;
	}
}

/**
 * RegelRecht Radio Button Field Component (Lit + TypeScript)
 *
 * A radio button with an inline label. Use inside rr-radio-button-group
 * for keyboard navigation and group semantics. The group sets the name.
 *
 * @element rr-radio-button-field
 * @attr {boolean} checked  - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string}  value    - Value for form submission
 *
 * @slot - Label text
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioButtonFieldStyles } from './rr-radio-button-field.styles.ts';
import { radioButtonFieldTemplate } from './rr-radio-button-field.template.ts';
import '../radio-button/rr-radio-button.ts';

@customElement('rr-radio-button-field')
export class RRRadioButtonField extends LitElement {
	static override styles = radioButtonFieldStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = '';

	/** Set by rr-radio-button-group. Not part of the public API. */
	@property({ type: String })
	name = '';

	public _handleLabelClick(): void {
		if (this.disabled) return;
		const radioButton = this.shadowRoot?.querySelector('rr-radio-button');
		const input = radioButton?.shadowRoot?.querySelector('input');
		if (!input || input.checked) return;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
	}

	public _handleChange(e: Event): void {
		const target = e.target as HTMLElement;
		const input = (target instanceof HTMLInputElement
			? target
			: target.shadowRoot?.querySelector('input')) as HTMLInputElement | null;
		this.checked = input?.checked ?? false;
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
		'rr-radio-button-field': RRRadioButtonField;
	}
}

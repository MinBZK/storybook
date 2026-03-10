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
import type { RRRadioButton } from '../radio-button/rr-radio-button.js';

let _labelCounter = 0;

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

	@property({ type: Boolean, reflect: true })
	required = false;

	private readonly _labelId = `rr-rbf-label-${++_labelCounter}`;

	public _handleLabelClick(): void {
		if (this.disabled) return;
		const radioButton = this.shadowRoot?.querySelector('rr-radio-button') as RRRadioButton | null;
		radioButton?.select();
	}

	public _handleChange(e: Event): void {
		const detail = (e as CustomEvent).detail;
		if (detail) {
			this.checked = detail.checked;
		} else {
			const input = e.target as HTMLInputElement;
			this.checked = input.checked;
		}
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

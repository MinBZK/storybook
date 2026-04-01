/**
 * RegelRecht Checkbox Field Component (Lit + TypeScript)
 *
 * A checkbox with an inline label for use in forms.
 *
 * @element rr-checkbox-field
 * @attr {boolean} checked       - Checked state
 * @attr {boolean} indeterminate - Indeterminate state
 * @attr {boolean} disabled      - Disabled state
 * @attr {string}  value         - Value for form submission
 * @attr {string}  name          - Name for form submission
 * @attr {string}  label         - Label text for the checkbox
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkboxFieldStyles } from './rr-checkbox-field.styles.ts';
import { checkboxFieldTemplate } from './rr-checkbox-field.template.ts';
import type { RRCheckbox } from '../checkbox/rr-checkbox.js';

@customElement('rr-checkbox-field')
export class RRCheckboxField extends LitElement {
	static override styles = checkboxFieldStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	indeterminate = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = 'on';

	@property({ type: String })
	name = '';

	@property({ type: String, reflect: true })
	label = '';

	public _handleLabelClick(e: Event): void {
		if (this.disabled) return;
		if ((e.target as HTMLElement).closest?.('rr-checkbox')) return;
		const checkbox = this.shadowRoot?.querySelector('rr-checkbox') as RRCheckbox | null;
		checkbox?.toggle();
	}

	public _handleChange(e: Event): void {
		const { checked } = (e as CustomEvent<{ checked: boolean }>).detail;
		this.checked = checked;
		this.indeterminate = false;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return checkboxFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-checkbox-field': RRCheckboxField;
	}
}

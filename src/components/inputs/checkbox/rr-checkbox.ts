/**
 * RegelRecht Checkbox Component (Lit + TypeScript)
 *
 * @element rr-checkbox
 * @attr {boolean} checked       - Checked state
 * @attr {boolean} disabled      - Disabled state
 * @attr {boolean} indeterminate - Indeterminate state (takes precedence over checked visually)
 * @attr {string}  value         - Value for form submission
 * @attr {string}  name          - Name for form submission
 *
 * @fires change - Fired when the checkbox state changes; detail: { checked: boolean, value: string }
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkboxStyles } from './rr-checkbox.styles.ts';
import { checkboxTemplate } from './rr-checkbox.template.ts';

@customElement('rr-checkbox')
export class RRCheckbox extends LitElement {
	static override styles = checkboxStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	indeterminate = false;

	@property({ type: String })
	value = 'on';

	@property({ type: String })
	name = '';

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.indeterminate = input.indeterminate;

		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return checkboxTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-checkbox': RRCheckbox;
	}
}

/**
 * Nederlandse Digitale Dienst Checkbox Component (Lit + TypeScript)
 *
 * @element ndd-checkbox
 * @attr {boolean} checked       - Checked state
 * @attr {boolean} disabled      - Disabled state
 * @attr {boolean} indeterminate - Indeterminate state (takes precedence over checked visually)
 * @attr {string}  value         - Value for form submission
 * @attr {string}  name          - Name for form submission
 * @attr {string}  accessible-label - Accessible label forwarded as aria-label to the native input.
 *   Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries.
 *
 * @fires change - Fired when the checkbox state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { checkboxStyles } from './ndd-checkbox.styles.ts';
import { checkboxTemplate } from './ndd-checkbox.template.ts';

@customElement('ndd-checkbox')
export class NDDCheckbox extends LitElement {
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

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	public toggle(): void {
		if (this.disabled) return;
		this.checked = !this.checked;
		this.indeterminate = false;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

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
		'ndd-checkbox': NDDCheckbox;
	}
}

/**
 * Nederlandse Digitale Dienst Radio Button Component (Lit + TypeScript)
 *
 * WAI-ARIA: Wrap radio buttons in a <fieldset>/<legend> or a container with
 * role="radiogroup" and aria-labelledby for proper group semantics.
 *
 * @example
 * <fieldset>
 *   <legend>Kies een optie</legend>
 *   <ndd-radio-button name="options" value="1">Optie 1</ndd-radio-button>
 *   <ndd-radio-button name="options" value="2">Optie 2</ndd-radio-button>
 * </fieldset>
 *
 * @element ndd-radio-button
 * @attr {boolean} checked  - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string}  accessible-label - Accessible label forwarded as aria-label to the native input.
 *   Note: aria-labelledby is not supported as IDREF resolution cannot cross shadow DOM boundaries.
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string, name: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioButtonStyles } from './ndd-radio-button.styles.ts';
import { radioButtonTemplate } from './ndd-radio-button.template.ts';

@customElement('ndd-radio-button')
export class NDDRadioButton extends LitElement {
	static override styles = radioButtonStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String })
	name = '';

	@property({ type: String })
	value = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	public select(): void {
		if (this.disabled || this.checked) return;
		const input = this.shadowRoot?.querySelector('input') as HTMLInputElement | null;
		if (!input) return;
		input.checked = true;
		input.dispatchEvent(new Event('change', { bubbles: true }));
	}

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value, name: this.name },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return radioButtonTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-radio-button': NDDRadioButton;
	}
}

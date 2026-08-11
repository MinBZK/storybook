/**
 * Nederlandse Digitale Dienst Switch Field Component (Lit + TypeScript)
 *
 * A switch toggle with an inline label for use in forms.
 *
 * @element nldd-switch-field
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value for form submission
 * @attr {string} name - Name for form submission
 * @attr {string} label - Label text for the switch
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { switchFieldStyles } from './switch-field.styles.js';
import { switchFieldTemplate } from './switch-field.template.js';
import type { NLDDSwitch } from '../switch/switch.js';

@customElement('nldd-switch-field')
export class NLDDSwitchField extends LitElement {
	static override styles = switchFieldStyles;

	/** Says this is the control an nldd-form-field is about, so the field can
	 *  find it, name it and move focus into it. See nldd-form-field. */
	static isFormInput = true;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = 'on';

	@property({ type: String })
	name = '';

	@property({ type: String })
	label = '';

	public _handleLabelClick(e: Event): void {
		if (this.disabled) return;
		if ((e.target as HTMLElement).closest?.('nldd-switch')) return;
		const switchEl = this.shadowRoot?.querySelector('nldd-switch') as NLDDSwitch | null;
		switchEl?.toggle();
	}

	public _handleChange(e: Event): void {
		this.checked = (e as CustomEvent<{ checked: boolean }>).detail.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Delegates focus to the inner `<nldd-switch>`, which in turn focuses its
	 * native checkbox input. Lets consumers call `switchFieldEl.focus()` without
	 * reaching into shadow DOM.
	 */
	override focus(options?: FocusOptions): void {
		this.shadowRoot?.querySelector<NLDDSwitch>('nldd-switch')?.focus(options);
	}

	override render() {
		return switchFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'nldd-switch-field': NLDDSwitchField;
	}
}

/**
 * RegelRecht Switch Field Component (Lit + TypeScript)
 *
 * A switch toggle with an inline label for use in forms.
 *
 * @element rr-switch-field
 * @attr {boolean} checked  - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string}  value    - Value for form submission
 * @attr {string}  name     - Name for form submission
 * @attr {string}  label    - Label text for the switch
 *
 * @fires change - When checked state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { switchFieldStyles } from './rr-switch-field.styles.ts';
import { switchFieldTemplate } from './rr-switch-field.template.ts';
import type { RRSwitch } from '../switch/rr-switch.js';

@customElement('rr-switch-field')
export class RRSwitchField extends LitElement {
	static override styles = switchFieldStyles;

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
		if ((e.target as HTMLElement).closest?.('rr-switch')) return;
		const switchEl = this.shadowRoot?.querySelector('rr-switch') as RRSwitch | null;
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

	override render() {
		return switchFieldTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-switch-field': RRSwitchField;
	}
}

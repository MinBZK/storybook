/**
 * RegelRecht Switch Field Component (Lit + TypeScript)
 *
 * Een switch toggle met een inline label voor gebruik in formulieren.
 *
 * @element rr-switch-field
 * @attr {boolean} checked  - Aangevinkte toestand
 * @attr {boolean} disabled - Uitgeschakelde toestand
 * @attr {string}  value    - Waarde voor formulierverwerking
 * @attr {string}  name     - Naam voor formulierverwerking
 * @attr {string}  label    - Label tekst voor de switch
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

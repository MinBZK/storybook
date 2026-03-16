/**
 * RegelRecht Switch Component (Lit + TypeScript)
 *
 * @element rr-switch
 * @attr {boolean} checked           - Whether the switch is on/off
 * @attr {boolean} disabled          - Disabled state
 * @attr {string}  size              - Switch size: 'xs' | 'sm' (default: 'sm')
 * @attr {string}  accessible-label  - Accessible label forwarded as aria-label to the native input.
 *
 * @fires change - When the switch state changes; detail: { checked: boolean }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { switchStyles } from './rr-switch.styles.ts';
import { switchTemplate } from './rr-switch.template.ts';

export type SwitchSize = 'xs' | 'sm';

@customElement('rr-switch')
export class RRSwitch extends LitElement {
	static override styles = switchStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	size: SwitchSize = 'sm';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	public toggle(): void {
		if (this.disabled) return;
		this.checked = !this.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked },
			bubbles: true,
			composed: true,
		}));
	}

	override render() {
		return switchTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-switch': RRSwitch;
	}
}

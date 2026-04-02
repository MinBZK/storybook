/**
 * Nederlandse Digitale Dienst Switch Component (Lit + TypeScript)
 *
 * A toggle control for on/off settings.
 * Prefer ndd-switch-field for labeled usage — it combines the switch with a visible label.
 * Direct use of ndd-switch requires an accessible-label attribute for screen reader accessibility.
 *
 * @element ndd-switch
 * @attr {boolean} checked           - Whether the switch is on/off
 * @attr {boolean} disabled          - Disabled state
 * @attr {string}  size              - Switch size: 'xs' | 'sm' (default: 'sm')
 * @attr {string}  accessible-label  - Accessible label forwarded as aria-label to the native input.
 *                                     Required when using ndd-switch without ndd-switch-field.
 *
 * @fires change - When the switch state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { switchStyles } from './ndd-switch.styles.ts';
import { switchTemplate } from './ndd-switch.template.ts';

export type SwitchSize = 'xs' | 'sm';

@customElement('ndd-switch')
export class NDDSwitch extends LitElement {
	static override styles = switchStyles;

	@property({ type: Boolean, reflect: true })
	checked = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String, reflect: true })
	size: SwitchSize = 'sm';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@property({ type: String })
	value = 'on';

	override firstUpdated(): void {
		if (!this.accessibleLabel) {
			console.warn(
				'<ndd-switch>: No accessible-label provided. Use ndd-switch-field for labeled usage, or provide an accessible-label attribute for screen reader accessibility.'
			);
		}
	}

	public toggle(): void {
		if (this.disabled) return;
		this.checked = !this.checked;
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { checked: this.checked, value: this.value },
				bubbles: true,
				composed: true,
			})
		);
	}

	public _handleChange(e: Event): void {
		if (this.disabled) return;
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.dispatchEvent(
			new CustomEvent('change', {
				detail: { checked: this.checked, value: this.value },
				bubbles: true,
				composed: true,
			})
		);
	}

	override render() {
		return switchTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-switch': NDDSwitch;
	}
}

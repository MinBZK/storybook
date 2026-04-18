/**
 * Nederlandse Digitale Dienst Switch Component (Lit + TypeScript)
 *
 * A toggle control for on/off settings.
 * Prefer nldd-switch-field for labeled usage — it combines the switch with a visible label.
 * Direct use of nldd-switch requires an accessible-label attribute for screen reader accessibility.
 *
 * @element nldd-switch
 * @attr {boolean} checked           - Whether the switch is on/off
 * @attr {boolean} disabled          - Disabled state
 * @attr {string}  size              - Switch size: 'xs' | 'sm' (default: 'sm')
 * @attr {string}  accessible-label  - Accessible label forwarded as aria-label to the native input.
 *                                     Required when using nldd-switch without nldd-switch-field.
 *
 * @fires change - When the switch state changes; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { switchStyles } from './switch.styles.ts';
import { switchTemplate } from './switch.template.ts';

export type SwitchSize = 'xs' | 'sm';

@customElement('nldd-switch')
export class NLDDSwitch extends LitElement {
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
			console.warn('<nldd-switch>: No accessible-label provided. Use nldd-switch-field for labeled usage, or provide an accessible-label attribute for screen reader accessibility.');
		}
	}

	// ## Swipe gesture

	private _pointerStartX: number | null = null;
	private _swiped = false;
	private static readonly SWIPE_THRESHOLD = 10;

	_handlePointerDown(e: PointerEvent): void {
		this._pointerStartX = e.clientX;
		this._swiped = false;
		try { (e.target as Element).setPointerCapture(e.pointerId); } catch { /* synthetic events in tests have no active pointer */ }
	}

	_handlePointerMove(e: PointerEvent): void {
		if (this._pointerStartX === null) return;
		const dx = e.clientX - this._pointerStartX;
		// Once the threshold is crossed, _swiped locks in — matching iOS switch
		// behaviour where intent is set by crossing the threshold, and the final
		// toggle direction is determined by the terminal dx in _handlePointerUp.
		if (Math.abs(dx) >= NLDDSwitch.SWIPE_THRESHOLD) {
			this._swiped = true;
		}
	}

	_handlePointerUp(e: PointerEvent): void {
		if (this._pointerStartX === null) return;
		const dx = e.clientX - this._pointerStartX;
		this._pointerStartX = null;

		if (!this._swiped) return;

		e.preventDefault();
		// Reads the dir HTML attribute from the nearest ancestor. Does not detect
		// RTL set purely via CSS `direction: rtl` (no attribute).
		const isRtl = this.closest('[dir]')?.getAttribute('dir') === 'rtl';
		const shouldCheck = isRtl ? dx < 0 : dx > 0;

		if (shouldCheck !== this.checked) {
			this.toggle();
		}
	}

	_handlePointerCancel(): void {
		this._pointerStartX = null;
		this._swiped = false;
	}

	_handleClick(e: Event): void {
		if (this._swiped) {
			e.preventDefault();
			this._swiped = false;
		}
	}

	// ## Public API

	public toggle(): void {
		if (this.disabled) return;
		this.checked = !this.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	public _handleChange(e: Event): void {
		if (this.disabled) return;
		const input = e.target as HTMLInputElement;
		this.checked = input.checked;
		this.dispatchEvent(new CustomEvent('change', {
			detail: { checked: this.checked, value: this.value },
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
		'nldd-switch': NLDDSwitch;
	}
}

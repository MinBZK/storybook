/**
 * RegelRecht Toggle Button Component (Lit + TypeScript)
 *
 * A selectable button that toggles between selected and unselected.
 * Available as a button (aria-pressed), checkbox, or radio input.
 *
 * Place an rr-icon before the text to add an icon — position is auto-detected.
 *
 * @element rr-toggle-button
 *
 * @attr {'button' | 'checkbox' | 'radio'} type - Underlying element (default: 'button')
 * @attr {'xs' | 'sm' | 'md'}              size - Button size (default: 'md')
 * @attr {boolean}                         selected         - Selected state
 * @attr {boolean}                         disabled         - Disabled state
 * @attr {string}                          value            - Value for form submission (checkbox/radio)
 * @attr {string}                          name             - Name for form submission (checkbox/radio)
 * @attr {string}                          accessible-label - Accessible label; required for icon-only usage
 *
 * @slot - Button content: place an rr-icon before the text for an icon
 *
 * @fires change - When selection changes; detail: { selected: boolean, value: string }
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { toggleButtonStyles } from './rr-toggle-button.styles.ts';
import { toggleButtonTemplate } from './rr-toggle-button.template.ts';
import './../../content/icon/rr-icon.ts';

export type ToggleButtonType = 'button' | 'checkbox' | 'radio';
export type ToggleButtonSize = 'xs' | 'sm' | 'md';

@customElement('rr-toggle-button')
export class RRToggleButton extends LitElement {
	static override styles = toggleButtonStyles;

	@property({ type: String, reflect: true })
	type: ToggleButtonType = 'button';

	@property({ type: String, reflect: true })
	size: ToggleButtonSize = 'md';

	@property({ type: Boolean, reflect: true })
	selected = false;

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: String })
	value = 'on';

	@property({ type: String })
	name = '';

	@property({ type: String, attribute: 'accessible-label' })
	accessibleLabel = '';

	@state()
	_iconName: string | null = null;

	@state()
	_hasText = false;

	private _observer: MutationObserver | null = null;

	override connectedCallback(): void {
		super.connectedCallback();
		this._observer = new MutationObserver(() => this._detectIcon());
		// Observe only direct child additions/removals.
		// Icon name changes do not affect whether an icon is present,
		// and slot assignments are handled by @slotchange in the template.
		this._observer.observe(this, { childList: true });
		this.updateComplete.then(() => this._detectIcon());
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._observer?.disconnect();
		this._observer = null;
	}

	override updated(): void {
		const iconOnly = this._iconName !== null && !this._hasText;
		this.toggleAttribute('icon-only', iconOnly);

		if (iconOnly && !this.accessibleLabel) {
			console.warn('<rr-toggle-button>: Icon-only usage requires an accessible-label attribute for accessibility.');
		}
	}

	private _getEffectiveNodes(): Node[] {
		const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('slot');
		if (!slot) return Array.from(this.childNodes);
		return slot.assignedNodes({ flatten: true });
	}

	_detectIcon(): void {
		const nodes = this._getEffectiveNodes();

		const icon = nodes.find(
			(n): n is Element =>
				n.nodeType === Node.ELEMENT_NODE &&
				(n as Element).tagName.toLowerCase() === 'rr-icon'
		) ?? null;

		this._iconName = icon?.getAttribute('name') ?? null;

		this._hasText = nodes.some(
			n =>
				n.nodeType === Node.TEXT_NODE &&
				n.textContent?.trim() !== ''
		);
	}

	_handleButtonClick(): void {
		if (this.disabled) return;
		this._toggle();
	}

	_handleInputChange(e: Event): void {
		const input = e.target as HTMLInputElement;
		this.selected = input.checked;
		this._dispatchChange();
	}

	private _toggle(): void {
		this.selected = !this.selected;
		this._dispatchChange();
	}

	private _dispatchChange(): void {
		this.dispatchEvent(new CustomEvent('change', {
			detail: { selected: this.selected, value: this.value },
			bubbles: true,
			composed: true,
		}));
	}

	/**
	 * Toggle selected state programmatically.
	 * For type="radio", the button can only be selected, never deselected (native behavior).
	 */
	toggle(): void {
		if (this.disabled) return;
		if (this.type === 'radio' && this.selected) return;
		this._toggle();
	}

	override render() {
		return toggleButtonTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-toggle-button': RRToggleButton;
	}
}

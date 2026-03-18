/**
 * RegelRecht Toggle Button Component (Lit + TypeScript)
 *
 * Een selecteerbare knop die tussen geselecteerd/niet-geselecteerd kan schakelen.
 * Beschikbaar als button (aria-pressed), checkbox of radio input.
 *
 * @element rr-toggle-button
 *
 * @attr {'button' | 'checkbox' | 'radio'} type - Onderliggend element (standaard: 'button')
 * @attr {'xs' | 'sm' | 'md'}              size - Grootte (standaard: 'md')
 * @attr {boolean}                         selected  - Geselecteerde toestand
 * @attr {boolean}                         disabled  - Uitgeschakelde toestand
 * @attr {string}                          value     - Waarde voor formulierverwerking (checkbox/radio)
 * @attr {string}                          name      - Naam voor formulierverwerking (checkbox/radio)
 * @attr {string}                          accessible-label - Toegankelijk label; verplicht bij icoon-only gebruik
 *
 * @slot      - Tekst van de knop
 * @slot icon - Icoon vóór de tekst
 *
 * @fires change - Bij selectieverandering; detail: { selected: boolean, value: string }
 */

import { LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { toggleButtonStyles } from './rr-toggle-button.styles.ts';
import { toggleButtonTemplate } from './rr-toggle-button.template.ts';

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
	_hasText = false;

	@state()
	_hasIcon = false;

	override updated(): void {
		const iconOnly = this._hasIcon && !this._hasText;
		this.toggleAttribute('icon-only', iconOnly);

		if (iconOnly && !this.accessibleLabel) {
			console.warn('<rr-toggle-button>: Icoon-only gebruik vereist een accessible-label attribuut voor toegankelijkheid.');
		}
	}

	_onDefaultSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		const text = slot
			.assignedNodes({ flatten: true })
			.map(n => n.textContent ?? '')
			.join('')
			.trim();
		this._hasText = text.length > 0;
	}

	_onIconSlotChange(e: Event): void {
		const slot = e.target as HTMLSlotElement;
		this._hasIcon = slot.assignedElements({ flatten: true }).length > 0;
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
	 * Selecteer of deselecteer programmatisch.
	 * Bij type="radio" wordt de knop alleen geselecteerd, nooit gedeselecteerd (native gedrag).
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

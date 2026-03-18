/**
 * RegelRecht Toggle Button Group Component (Lit + TypeScript)
 *
 * Groups rr-toggle-button elements and manages selection, keyboard navigation,
 * and forwarding of type, name, size, and disabled state to all buttons.
 *
 * For type="radio" (single-select), arrow keys navigate between buttons and
 * automatically select the focused one.
 * For type="checkbox" (multi-select), multiple buttons can be selected simultaneously.
 *
 * @element rr-toggle-button-group
 *
 * @attr {'button' | 'checkbox' | 'radio'} type     - Selection mode (default: 'checkbox')
 * @attr {string}               name     - Forwarded to all buttons
 * @attr {'xs' | 'sm' | 'md'}  size     - Forwarded to all buttons (default: 'md')
 * @attr {boolean}              disabled - Disables all buttons
 *
 * @slot - rr-toggle-button elements
 *
 * @fires change - Bubbles up from the changed button; detail: { selected: boolean, value: string }
 */

import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { toggleButtonGroupStyles } from './rr-toggle-button-group.styles.ts';
import { toggleButtonGroupTemplate } from './rr-toggle-button-group.template.ts';
import type { RRToggleButton, ToggleButtonSize } from '../toggle-button/rr-toggle-button.js';

type GroupType = 'button' | 'checkbox' | 'radio';

@customElement('rr-toggle-button-group')
export class RRToggleButtonGroup extends LitElement {
	static override styles = toggleButtonGroupStyles;

	@property({ type: String, reflect: true })
	type: GroupType = 'checkbox';

	@property({ type: String })
	name = '';

	@property({ type: String, reflect: true })
	size: ToggleButtonSize = 'md';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this._updateRole();
		this.addEventListener('change', this._handleChange);
		this.addEventListener('keydown', this._handleKeyDown);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('change', this._handleChange);
		this.removeEventListener('keydown', this._handleKeyDown);
	}

	override updated(changed: Map<PropertyKey, unknown>): void {
		if (changed.has('type')) {
			this._updateRole();
		}
		if (changed.has('type') || changed.has('name') || changed.has('size') || changed.has('disabled')) {
			this._syncButtons();
		}
	}

	private _updateRole(): void {
		this.setAttribute('role', this.type === 'radio' ? 'radiogroup' : 'group');
	}

	private _getButtons(): RRToggleButton[] {
		return Array.from(this.querySelectorAll('rr-toggle-button'));
	}

	private _getEnabledButtons(): RRToggleButton[] {
		return this._getButtons().filter(b => !b.disabled);
	}

	private _syncButtons(): void {
		this._getButtons().forEach(button => {
			button.type = this.type;
			button.size = this.size;

			// name is only meaningful for checkbox and radio
			if (this.type !== 'button') {
				button.name = this.name;
			}

			if (this.disabled) {
				if (!button.hasAttribute('disabled')) {
					// Mark as group-disabled so we can restore it when the group re-enables
					button.setAttribute('data-group-disabled', '');
					button.disabled = true;
				}
			} else if (button.hasAttribute('data-group-disabled')) {
				button.removeAttribute('data-group-disabled');
				button.disabled = false;
			}
		});
	}

	private _handleChange = (e: Event): void => {
		if (this.type !== 'radio') return;

		const changedButton = e.target as RRToggleButton;
		if (!changedButton.selected) return;

		// Deselect all other buttons when a radio button is selected
		this._getButtons().forEach(button => {
			if (button !== changedButton) button.selected = false;
		});
	};

	private _handleKeyDown = (e: KeyboardEvent): void => {
		if (this.type !== 'radio') return;
		if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;

		const buttons = this._getEnabledButtons();
		if (buttons.length === 0) return;

		const activeButton = buttons.find(b => b.selected) ?? buttons[0];
		const currentIndex = buttons.indexOf(activeButton);
		const isNext = e.key === 'ArrowDown' || e.key === 'ArrowRight';
		const nextIndex = isNext
			? (currentIndex + 1) % buttons.length
			: (currentIndex - 1 + buttons.length) % buttons.length;

		const nextButton = buttons[nextIndex];
		if (!nextButton) return;

		e.preventDefault();

		activeButton.selected = false;
		nextButton.selected = true;

		const input = nextButton.shadowRoot?.querySelector<HTMLInputElement>('.toggle-button__input');
		input?.focus();

		nextButton.dispatchEvent(new CustomEvent('change', {
			detail: { selected: true, value: nextButton.value },
			bubbles: true,
			composed: true,
		}));
	};

	public _onSlotChange = (): void => {
		this._syncButtons();
	};

	override render() {
		return toggleButtonGroupTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-toggle-button-group': RRToggleButtonGroup;
	}
}

/**
 * RegelRecht Radio Button Group Component (Lit + TypeScript)
 *
 * Groups rr-radio-button-field elements, handles keyboard navigation,
 * and forwards name and disabled state to all child fields.
 * Use inside rr-form-field which provides the group label.
 *
 * @element rr-radio-button-group
 * @attr {string}  name     - Forwarded to all slotted rr-radio-button-field elements
 * @attr {boolean} disabled - Disables all slotted fields
 * @attr {boolean} required - Marks the group as required
 *
 * @slot - Slot for rr-radio-button-field elements
 *
 * @fires change - Bubbles up from the checked field; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioButtonGroupStyles } from './rr-radio-button-group.styles.ts';
import { radioButtonGroupTemplate } from './rr-radio-button-group.template.ts';
import type { RRRadioButtonField } from '../radio-button-field/rr-radio-button-field.js';

@customElement('rr-radio-button-group')
export class RRRadioButtonGroup extends LitElement {
	static override styles = radioButtonGroupStyles;

	@property({ type: String })
	name = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String, attribute: 'aria-labelledby' })
	ariaLabelledby = '';

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('keydown', this._handleKeyDown);
		this.addEventListener('change', this._handleChange);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('keydown', this._handleKeyDown);
		this.removeEventListener('change', this._handleChange);
	}

	override updated(changed: Map<PropertyKey, unknown>): void {
		if (changed.has('name') || changed.has('disabled') || changed.has('required')) {
			this._syncFields();
		}
	}

	private _getFields(): RRRadioButtonField[] {
		return Array.from(this.querySelectorAll('rr-radio-button-field'));
	}

	private _getEnabledFields(): RRRadioButtonField[] {
		return this._getFields().filter(f => !f.disabled);
	}

	private _syncFields(): void {
		this._getFields().forEach(field => {
			field.name = this.name;
			field.required = this.required;
			if (this.disabled) {
				field.setAttribute('data-group-disabled', '');
				field.disabled = true;
			} else if (field.hasAttribute('data-group-disabled')) {
				field.removeAttribute('data-group-disabled');
				field.disabled = false;
			}
		});
	}

	private _handleChange = (e: Event): void => {
		const changedField = e.target as RRRadioButtonField;
		if (!changedField.checked) return;
		this._getFields().forEach(field => {
			if (field !== changedField) field.checked = false;
		});
	};

	private _handleKeyDown = (e: KeyboardEvent): void => {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp' &&
			e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;

		const fields = this._getEnabledFields();
		if (fields.length === 0) return;

		const activeField = fields.find(f => f.checked) ?? fields[0];
		const currentIndex = fields.indexOf(activeField);
		const isNext = e.key === 'ArrowDown' || e.key === 'ArrowRight';
		const nextIndex = isNext
			? (currentIndex + 1) % fields.length
			: (currentIndex - 1 + fields.length) % fields.length;

		const nextField = fields[nextIndex];
		if (!nextField) return;

		e.preventDefault();

		activeField.checked = false;
		nextField.checked = true;

		const input = nextField.shadowRoot
			?.querySelector('rr-radio-button')
			?.shadowRoot?.querySelector('input');
		input?.focus();

		nextField.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: nextField.value },
			bubbles: true,
			composed: true,
		}));
	};

	public _onSlotChange = (): void => {
		this._syncFields();
	};

	override render() {
		return radioButtonGroupTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'rr-radio-button-group': RRRadioButtonGroup;
	}
}

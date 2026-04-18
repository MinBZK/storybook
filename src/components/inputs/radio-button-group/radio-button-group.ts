/**
 * Nederlandse Digitale Dienst Radio Button Group Component (Lit + TypeScript)
 *
 * Groups ndd-radio-button-field elements, handles keyboard navigation,
 * and forwards name and disabled state to all child fields.
 * Use inside ndd-form-field which provides the group label.
 *
 * @element ndd-radio-button-group
 * @attr {string}  name     - Forwarded to all slotted ndd-radio-button-field elements
 * @attr {boolean} disabled - Disables all slotted fields
 * @attr {boolean} required - Marks the group as required
 *
 * @slot - Slot for ndd-radio-button-field elements
 *
 * @fires change - Bubbles up from the checked field; detail: { checked: boolean, value: string }
 */
import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { radioButtonGroupStyles } from './ndd-radio-button-group.styles.ts';
import { radioButtonGroupTemplate } from './ndd-radio-button-group.template.ts';
import type { NDDRadioButtonField } from '../radio-button-field/ndd-radio-button-field.js';

@customElement('ndd-radio-button-group')
export class NDDRadioButtonGroup extends LitElement {
	static override styles = radioButtonGroupStyles;

	@property({ type: String })
	name = '';

	@property({ type: Boolean, reflect: true })
	disabled = false;

	@property({ type: Boolean, reflect: true })
	required = false;

	@property({ type: String, attribute: 'accessible-labelledby' })
	accessibleLabelledBy = '';

	override connectedCallback(): void {
		super.connectedCallback();
		this.setAttribute('role', 'radiogroup');
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
		if (changed.has('accessibleLabelledBy')) {
			if (this.accessibleLabelledBy) {
				this.setAttribute('aria-labelledby', this.accessibleLabelledBy);
			} else {
				this.removeAttribute('aria-labelledby');
			}
		}
		if (changed.has('required')) {
			if (this.required) {
				this.setAttribute('aria-required', 'true');
			} else {
				this.removeAttribute('aria-required');
			}
		}
	}

	private _getFields(): NDDRadioButtonField[] {
		return Array.from(this.querySelectorAll('ndd-radio-button-field'));
	}

	private _getEnabledFields(): NDDRadioButtonField[] {
		return this._getFields().filter(f => !f.disabled);
	}

	private _syncFields(): void {
		this._getFields().forEach(field => {
			field.name = this.name;
			field.required = this.required;
			if (this.disabled) {
				if (!field.hasAttribute('disabled')) {
					field.setAttribute('group-disabled', '');
					field.disabled = true;
				}
			} else if (field.hasAttribute('group-disabled')) {
				field.removeAttribute('group-disabled');
				field.disabled = false;
			}
		});
	}

	private _handleChange = (e: Event): void => {
		const changedField = e.target as NDDRadioButtonField;
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
			?.querySelector('ndd-radio-button')
			?.shadowRoot?.querySelector('input');
		input?.focus();

		nextField.dispatchEvent(new CustomEvent('change', {
			detail: { checked: true, value: nextField.value },
			bubbles: true,
			composed: true,
		}));
	};

	_onSlotChange = (): void => {
		this._syncFields();
	};

	override render() {
		return radioButtonGroupTemplate(this);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'ndd-radio-button-group': NDDRadioButtonGroup;
	}
}

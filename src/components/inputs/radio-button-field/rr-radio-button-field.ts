/**
 * RegelRecht Radio Button Field Component (Lit + TypeScript)
 *
 * A radio button with label for form fields.
 *
 * @element rr-radio-button-field
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value for form submission
 * @attr {string} name - Input name for form submission (group name)
 *
 * @slot - Default slot for label text
 *
 * @fires change - When checked state changes
 *
 * @csspart container - The field container
 * @csspart radio - The radio element
 * @csspart label - The label element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../radio/rr-radio.ts';

@customElement('rr-radio-button-field')
export class RRRadioButtonField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .radio-button-field {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      gap: var(--primitives-space-8);
      padding: 10px 0;
      cursor: pointer;
    }

    .radio-button-field__control {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .radio-button-field__label {
      display: flex;
      flex: 1;
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-100);
      line-height: 1.25em;
      color: var(--semantics-content-color);
      padding-top: 2px; /* Align with radio center */
    }

    /* Disabled state */
    :host([disabled]) .radio-button-field {
      cursor: not-allowed;
    }

    :host([disabled]) .radio-button-field__label {
      opacity: var(--primitives-opacity-disabled);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      :host([disabled]) .radio-button-field__label {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  name = '';

  private _handleChange(e: CustomEvent): void {
    this.checked = e.detail.checked;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { checked: this.checked, value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleClick(): void {
    if (!this.disabled && !this.checked) {
      this.checked = true;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    return html`
      <div class="radio-button-field" part="container" @click=${this._handleClick}>
        <div class="radio-button-field__control">
          <rr-radio
            part="radio"
            size="xs"
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            value=${this.value}
            name=${this.name}
            @change=${this._handleChange}
            @click=${(e: Event) => e.stopPropagation()}
          ></rr-radio>
        </div>
        <span class="radio-button-field__label" part="label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-radio-button-field': RRRadioButtonField;
  }
}

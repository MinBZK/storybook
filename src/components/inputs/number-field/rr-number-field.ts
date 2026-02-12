/**
 * RegelRecht Number Field Component (Lit + TypeScript)
 *
 * @element rr-number-field
 * @attr {number} value - The numeric value
 * @attr {number} min - Minimum allowed value
 * @attr {number} max - Maximum allowed value
 * @attr {number} step - Step increment for buttons
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Input name for form submission
 *
 * @fires input - When value changes
 * @fires change - When value is committed
 *
 * @csspart container - The field container
 * @csspart input - The native input element
 * @csspart decrease-button - The decrease button
 * @csspart increase-button - The increase button
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rr-number-field')
export class RRNumberField extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .number-field {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: var(--semantics-controls-md-min-size);
      background-color: var(--semantics-input-fields-background-color);
      border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
      border-radius: var(--semantics-controls-md-corner-radius);
      box-sizing: border-box;
    }

    .number-field__button {
      /* Reset */
      appearance: none;
      border: none;
      background: transparent;
      margin: 0;
      padding: 0;
      cursor: pointer;

      /* Layout */
      display: flex;
      justify-content: center;
      align-items: center;
      width: var(--semantics-controls-md-min-size);
      height: 100%;
      flex-shrink: 0;

      /* Icon color */
      color: var(--semantics-content-color);
    }

    .number-field__button:hover:not(:disabled) {
      background-color: var(--primitives-color-neutral-100);
    }

    .number-field__button:active:not(:disabled) {
      background-color: var(--primitives-color-neutral-200);
    }

    .number-field__button:disabled {
      cursor: not-allowed;
    }

    .number-field__button svg {
      width: 20px;
      height: 20px;
    }

    .number-field__input {
      display: flex;
      justify-content: center;
      padding: 0 var(--primitives-space-6);
    }

    .number-field__native {
      /* Reset */
      appearance: none;
      border: none;
      background: transparent;
      margin: 0;
      padding: 0;
      outline: none;
      font: inherit;
      box-sizing: border-box;

      /* Typography */
      font: var(--semantics-input-fields-md-text);
      color: var(--semantics-content-color);
      text-align: center;

      /* Layout - auto width based on content */
      width: 3ch;
      min-width: 2ch;
    }

    /* Hide number input spinners */
    .number-field__native::-webkit-outer-spin-button,
    .number-field__native::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .number-field__native[type='number'] {
      -moz-appearance: textfield;
    }

    /* Focus state */
    .number-field:focus-within {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .number-field {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
    }

    :host([disabled]) .number-field__native,
    :host([disabled]) .number-field__button {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .number-field:focus-within {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }
    }
  `;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = -Infinity;

  @property({ type: Number })
  max = Infinity;

  @property({ type: Number })
  step = 1;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  private _updateValue(newValue: number): void {
    const clampedValue = Math.max(this.min, Math.min(this.max, newValue));
    if (clampedValue !== this.value) {
      this.value = clampedValue;
      this.dispatchEvent(new CustomEvent('input', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
      this.dispatchEvent(new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleDecrease(): void {
    this._updateValue(this.value - this.step);
  }

  private _handleIncrease(): void {
    this._updateValue(this.value + this.step);
  }

  private _handleInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    const newValue = parseFloat(input.value);
    if (!isNaN(newValue)) {
      this._updateValue(newValue);
    }
  }

  override render() {
    const canDecrease = this.value > this.min;
    const canIncrease = this.value < this.max;

    return html`
      <div class="number-field" part="container">
        <button
          class="number-field__button"
          part="decrease-button"
          type="button"
          ?disabled=${this.disabled || !canDecrease}
          @click=${this._handleDecrease}
          aria-label="Decrease value"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3.33 9.17h13.34v1.66H3.33z"/>
          </svg>
        </button>
        <div class="number-field__input">
          <input
            class="number-field__native"
            part="input"
            type="number"
            .value=${String(this.value)}
            min=${this.min}
            max=${this.max}
            step=${this.step}
            ?disabled=${this.disabled}
            name=${this.name}
            @input=${this._handleInput}
          />
        </div>
        <button
          class="number-field__button"
          part="increase-button"
          type="button"
          ?disabled=${this.disabled || !canIncrease}
          @click=${this._handleIncrease}
          aria-label="Increase value"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M9.17 3.33v5.84H3.33v1.66h5.84v5.84h1.66v-5.84h5.84V9.17h-5.84V3.33z"/>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-number-field': RRNumberField;
  }
}

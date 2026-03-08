/**
 * RegelRecht Combo Box Field Component (Lit + TypeScript)
 *
 * A text input with dropdown suggestions (autocomplete).
 *
 * @element rr-combo-box-field
 * @attr {string} value - The input value
 * @attr {string} placeholder - Placeholder text
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Input name for form submission
 *
 * @fires input - When input value changes
 * @fires change - When input value is committed
 *
 * @csspart container - The field container
 * @csspart input - The native input element
 * @csspart button - The dropdown button
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

@customElement('rr-combo-box-field')
export class RRComboBoxField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
      --_background-color: var(--semantics-input-fields-background-color);
    }

    :host([hidden]) {
      display: none;
    }

    .combo-box-field {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-height: var(--semantics-controls-md-min-size);
      background-color: var(--_background-color);
      border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
      border-radius: var(--semantics-controls-md-corner-radius);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    .combo-box-field__spacer {
      width: var(--primitives-space-12);
      flex-shrink: 0;
      align-self: stretch;
    }

    .combo-box-field__input {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-width: 0;
      position: relative;
    }

    .combo-box-field__native {
      /* Reset */
      appearance: none;
      border: none;
      background: transparent;
      margin: 0;
      padding: 0;
      outline: none;
      font: inherit;
      width: 100%;
      box-sizing: border-box;

      /* Typography */
      font: var(--semantics-input-fields-md-text-font);
      color: var(--semantics-content-color);

      /* Layout */
      height: var(--semantics-controls-md-min-size);
      line-height: var(--semantics-controls-md-min-size);
    }

    .combo-box-field__native::placeholder {
      color: var(--semantics-input-fields-placeholder-color);
    }

    .combo-box-field__input-shade {
      position: absolute;
      right: 0;
      top: 2px;
      width: 10px;
      height: calc(var(--semantics-controls-md-min-size) - 4px);
      background: linear-gradient(90deg, transparent 0%, var(--_background-color) 100%);
      pointer-events: none;
    }

    .combo-box-field__picker-button {
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
      align-self: stretch;
      flex-shrink: 0;

      /* Icon color */
      color: var(--semantics-content-color);
    }

    .combo-box-field__picker-button:hover:not(:disabled) {
      background-color: var(--primitives-color-neutral-100);
    }

    .combo-box-field__picker-button svg {
      width: 20px;
      height: 20px;
    }

    /* Focus state */
    .combo-box-field:focus-within {
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }

    /* Disabled state */
    :host([disabled]) .combo-box-field {
      opacity: var(--primitives-opacity-disabled);
      cursor: not-allowed;
    }

    :host([disabled]) .combo-box-field__native,
    :host([disabled]) .combo-box-field__picker-button {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .combo-box-field:focus-within {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Selecteer een optie';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  @query('.combo-box-field__native')
  private _input!: HTMLInputElement;

  private _handleInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('input', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handleChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  private _handlePickerClick(): void {
    this.dispatchEvent(new CustomEvent('picker-click', {
      bubbles: true,
      composed: true
    }));
  }

  public focus(): void {
    this._input?.focus();
  }

  public blur(): void {
    this._input?.blur();
  }

  override render() {
    return html`
      <div class="combo-box-field" part="container">
        <div class="combo-box-field__spacer"></div>
        <div class="combo-box-field__input">
          <input
            class="combo-box-field__native"
            part="input"
            type="text"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            name=${this.name}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <div class="combo-box-field__input-shade"></div>
        </div>
        <button
          class="combo-box-field__picker-button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this._handlePickerClick}
          aria-label="Dropdown openen"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10 14.17L5.83 10l-1.42 1.41L10 17l5.59-5.59L14.17 10 10 14.17zM10 5.83L14.17 10l1.42-1.41L10 3 4.41 8.59 5.83 10 10 5.83z"/>
          </svg>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-combo-box-field': RRComboBoxField;
  }
}

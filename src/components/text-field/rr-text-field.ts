/**
 * RegelRecht Text Field Component (Lit + TypeScript)
 *
 * @element rr-text-field
 * @attr {string} value - The input value
 * @attr {string} placeholder - Placeholder text
 * @attr {string} validation - Validation state: 'neutral' | 'valid' | 'invalid'
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Input type: 'text' | 'email' | 'password' | 'tel' | 'url'
 * @attr {string} name - Input name for form submission
 * @attr {boolean} readonly - Readonly state
 * @attr {boolean} required - Required state
 * @attr {string} autocomplete - Autocomplete hint
 *
 * @fires input - When input value changes
 * @fires change - When input value is committed
 *
 * @csspart input - The native input element
 * @csspart container - The field container
 *
 * @cssprop --rr-text-field-background-color - Override background color
 * @cssprop --rr-text-field-border-color - Override border color
 * @cssprop --rr-text-field-text-color - Override text color
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

type Validation = 'neutral' | 'valid' | 'invalid';
type InputType = 'text' | 'email' | 'password' | 'tel' | 'url';

@customElement('rr-text-field')
export class RRTextField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .text-field {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-height: var(--semantics-controls-m-min-size);
      background-color: var(--rr-text-field-background-color, var(--semantics-input-fields-background-color));
      border: var(--semantics-input-fields-border-thickness) solid var(--rr-text-field-border-color, var(--_border-color));
      border-radius: var(--semantics-controls-m-corner-radius);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    /* Validation states */
    :host([validation="neutral"]) .text-field,
    :host(:not([validation])) .text-field {
      --_border-color: var(--semantics-input-fields-border-color);
    }

    :host([validation="valid"]) .text-field {
      --_border-color: var(--semantics-input-fields-is-valid-border-color);
    }

    :host([validation="invalid"]) .text-field {
      --_border-color: var(--semantics-input-fields-is-invalid-border-color);
    }

    .text-field__spacer {
      width: var(--primitives-space-12);
      flex-shrink: 0;
      align-self: stretch;
    }

    .text-field__input {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-width: 0;
      position: relative;
    }

    .text-field__native {
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
      font: var(--semantics-input-fields-text);
      color: var(--rr-text-field-text-color, var(--primitives-color-text));

      /* Layout */
      height: var(--semantics-controls-m-min-size);
      line-height: var(--semantics-controls-m-min-size);
    }

    .text-field__native::placeholder {
      color: var(--semantics-input-fields-placeholder-color);
    }

    .text-field__input-shade {
      position: absolute;
      right: 0;
      top: 2px;
      width: 10px;
      height: calc(var(--semantics-controls-m-min-size) - 4px);
      background: linear-gradient(-90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      pointer-events: none;
    }

    .text-field__validation-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      align-self: stretch;
      flex-shrink: 0;
      padding: 0 var(--primitives-space-12) 0 var(--primitives-space-8);
    }

    .text-field__validation-icon svg {
      width: 24px;
      height: 24px;
    }

    :host([validation="valid"]) .text-field__validation-icon {
      color: var(--semantics-input-fields-is-valid-icon-color);
    }

    :host([validation="invalid"]) .text-field__validation-icon {
      color: var(--semantics-input-fields-is-invalid-icon-color);
    }

    /* Focus state */
    .text-field:focus-within {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .text-field {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
    }

    :host([disabled]) .text-field__native {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .text-field:focus-within {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }

      :host([disabled]) .text-field {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String, reflect: true })
  validation: Validation = 'neutral';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  type: InputType = 'text';

  @property({ type: String })
  name = '';

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  autocomplete = '';

  @query('.text-field__native')
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

  public focus(): void {
    this._input?.focus();
  }

  public blur(): void {
    this._input?.blur();
  }

  private _renderValidationIcon() {
    if (this.validation === 'valid') {
      return html`
        <div class="text-field__validation-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      `;
    }
    if (this.validation === 'invalid') {
      return html`
        <div class="text-field__validation-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
        </div>
      `;
    }
    return nothing;
  }

  override render() {
    return html`
      <div class="text-field" part="container">
        <div class="text-field__spacer"></div>
        <div class="text-field__input">
          <input
            class="text-field__native"
            part="input"
            type=${this.type}
            .value=${this.value}
            placeholder=${this.placeholder || nothing}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            name=${this.name || nothing}
            autocomplete=${this.autocomplete || nothing}
            aria-invalid=${this.validation === 'invalid' ? 'true' : 'false'}
            @input=${this._handleInput}
            @change=${this._handleChange}
          />
          <div class="text-field__input-shade"></div>
        </div>
        ${this._renderValidationIcon()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-text-field': RRTextField;
  }
}

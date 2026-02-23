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
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .text-field {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-height: var(--semantics-controls-md-min-size);
      background-color: var(--rr-text-field-background-color, var(--semantics-input-fields-background-color));
      border: var(--semantics-input-fields-border-thickness) solid var(--rr-text-field-border-color, var(--_border-color));
      border-radius: var(--semantics-controls-md-corner-radius);
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
      font: var(--semantics-input-fields-md-text);
      color: var(--rr-text-field-text-color, var(--semantics-content-color));

      /* Layout - height accounts for container border (44px - 2*2px = 40px) */
      height: calc(var(--semantics-controls-md-min-size) - 2 * var(--semantics-input-fields-border-thickness));
      line-height: calc(var(--semantics-controls-md-min-size) - 2 * var(--semantics-input-fields-border-thickness));
    }

    .text-field__native::placeholder {
      color: var(--semantics-input-fields-placeholder-color);
    }

    .text-field__input-shade {
      position: absolute;
      right: 0;
      top: 2px;
      width: 10px;
      height: calc(var(--semantics-controls-md-min-size) - 2 * var(--semantics-input-fields-border-thickness) - 4px);
      background: linear-gradient(-90deg, var(--semantics-input-fields-end-fade-end-color) 0%, var(--semantics-input-fields-end-fade-start-color) 100%);
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
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }

    /* Disabled state */
    :host([disabled]) .text-field {
      opacity: var(--primitives-opacity-disabled);
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
      // Outline check-circle icon from src/assets/icons/check-circle.svg
      return html`
        <div class="text-field__validation-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM16.7071 9.88664L11 15.5938L7.29289 11.8866L8.70711 10.4724L11 12.7653L15.2929 8.47243L16.7071 9.88664Z"/>
          </svg>
        </div>
      `;
    }
    if (this.validation === 'invalid') {
      // Outline exclamation-circle icon from src/assets/icons/exclamation-circle.svg
      return html`
        <div class="text-field__validation-icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 15C12.6904 15 13.25 15.5596 13.25 16.25C13.25 16.9404 12.6904 17.5 12 17.5C11.3096 17.5 10.75 16.9404 10.75 16.25C10.75 15.5596 11.3096 15 12 15Z"/>
            <path d="M13 13.5H11V6.5H13V13.5Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"/>
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

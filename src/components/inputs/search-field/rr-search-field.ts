/**
 * RegelRecht Search Field Component (Lit + TypeScript)
 *
 * @element rr-search-field
 * @attr {string} value - The search value
 * @attr {string} placeholder - Placeholder text
 * @attr {string} size - Field size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Input name for form submission
 *
 * @fires input - When input value changes
 * @fires change - When input value is committed
 * @fires search - When search is submitted (Enter key)
 *
 * @csspart container - The field container
 * @csspart input - The native input element
 * @csspart icon - The search icon
 */

import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-search-field')
export class RRSearchField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .search-field {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      background-color: var(--semantics-input-fields-background-color);
      border: var(--semantics-input-fields-border-thickness) solid var(--semantics-input-fields-border-color);
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    /* Size: MD (default) */
    :host([size="md"]) .search-field,
    :host(:not([size])) .search-field {
      min-height: var(--semantics-controls-md-min-size);
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    :host([size="md"]) .search-field__native,
    :host(:not([size])) .search-field__native {
      font: var(--semantics-input-fields-md-text);
    }

    :host([size="md"]) .search-field__input-shade,
    :host(:not([size])) .search-field__input-shade {
      height: calc(var(--semantics-controls-md-min-size) - 4px);
    }

    /* Size: SM */
    :host([size="sm"]) .search-field {
      min-height: var(--semantics-controls-sm-min-size);
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    :host([size="sm"]) .search-field__native {
      font-size: var(--primitives-font-size-90);
      font-weight: var(--primitives-font-weight-body-regular);
      line-height: 1em;
    }

    :host([size="sm"]) .search-field__input-shade {
      height: calc(var(--semantics-controls-sm-min-size) - 4px);
    }

    :host([size="sm"]) .search-field__icon svg {
      width: 16px;
      height: 16px;
    }

    .search-field__spacer {
      width: var(--primitives-space-8);
      flex-shrink: 0;
    }

    .search-field__icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      color: var(--semantics-input-fields-placeholder-color);
    }

    .search-field__icon svg {
      width: 24px;
      height: 24px;
    }

    .search-field__input {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-width: 0;
      position: relative;
      padding-right: var(--primitives-space-2);
    }

    .search-field__native {
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
      color: var(--semantics-content-color);

      /* Layout */
      align-self: stretch;
    }

    .search-field__native::placeholder {
      color: var(--semantics-input-fields-placeholder-color);
    }

    .search-field__input-shade {
      position: absolute;
      right: 0;
      top: 2px;
      width: 10px;
      background: linear-gradient(90deg, var(--semantics-input-fields-end-fade-start-color) 0%, var(--semantics-input-fields-end-fade-end-color) 100%);
      pointer-events: none;
    }

    /* Focus state */
    .search-field:focus-within {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .search-field {
      opacity: var(--primitives-opacity-disabled);
      cursor: not-allowed;
    }

    :host([disabled]) .search-field__native {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .search-field:focus-within {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Zoeken';

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  @query('.search-field__native')
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

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      this.dispatchEvent(new CustomEvent('search', {
        detail: { value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  public focus(): void {
    this._input?.focus();
  }

  public blur(): void {
    this._input?.blur();
  }

  override render() {
    return html`
      <div class="search-field" part="container">
        <div class="search-field__spacer"></div>
        <div class="search-field__icon" part="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M2 10c0 4.4 3.6 8 8 8a7.95 7.95 0 0 0 4.9-1.7l5.7 5.7 1.4-1.4-5.7-5.7A7.97 7.97 0 0 0 18 10c0-4.4-3.6-8-8-8s-8 3.6-8 8m2 0c0-3.3 2.7-6 6-6s6 2.7 6 6-2.7 6-6 6-6-2.7-6-6"/>
          </svg>
        </div>
        <div class="search-field__spacer"></div>
        <div class="search-field__input">
          <input
            class="search-field__native"
            part="input"
            type="search"
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            name=${this.name}
            @input=${this._handleInput}
            @change=${this._handleChange}
            @keydown=${this._handleKeydown}
          />
          <div class="search-field__input-shade"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-search-field': RRSearchField;
  }
}

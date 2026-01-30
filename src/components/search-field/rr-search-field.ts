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
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
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
      min-height: var(--semantics-controls-m-min-size);
      border-radius: var(--semantics-controls-m-corner-radius);
    }

    :host([size="md"]) .search-field__native,
    :host(:not([size])) .search-field__native {
      font: var(--semantics-input-fields-text);
    }

    :host([size="md"]) .search-field__input-shade,
    :host(:not([size])) .search-field__input-shade {
      height: calc(var(--semantics-controls-m-min-size) - 4px);
    }

    /* Size: SM */
    :host([size="sm"]) .search-field {
      min-height: var(--semantics-controls-s-min-size);
      border-radius: var(--semantics-controls-s-corner-radius);
    }

    :host([size="sm"]) .search-field__native {
      font-size: var(--primitives-font-size-body-s);
      font-weight: var(--primitives-font-weight-body-regular);
      line-height: 1em;
    }

    :host([size="sm"]) .search-field__input-shade {
      height: calc(var(--semantics-controls-s-min-size) - 4px);
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
      color: var(--primitives-color-text);

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
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%);
      pointer-events: none;
    }

    /* Focus state */
    .search-field:focus-within {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .search-field {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
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
  placeholder = 'Search';

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
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
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

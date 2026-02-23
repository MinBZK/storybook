/**
 * RegelRecht Drop Down Field Component (Lit + TypeScript)
 *
 * @element rr-drop-down-field
 * @attr {string} value - The selected value
 * @attr {string} placeholder - Placeholder text when no value selected
 * @attr {string} size - Field size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} name - Input name for form submission
 *
 * @slot - Default slot for option elements
 *
 * @fires change - When selection changes
 *
 * @csspart container - The field container
 * @csspart select - The native select element
 * @csspart icon - The dropdown icon
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

type Size = 'sm' | 'md';

interface Option {
  value: string;
  label: string;
}

@customElement('rr-drop-down-field')
export class RRDropDownField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .drop-down-field {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: var(--primitives-color-neutral-200);
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
    }

    /* Size: MD (default) */
    :host([size="md"]) .drop-down-field,
    :host(:not([size])) .drop-down-field {
      min-height: var(--semantics-controls-md-min-size);
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    :host([size="md"]) .drop-down-field__value,
    :host(:not([size])) .drop-down-field__value {
      font: var(--semantics-input-fields-md-text);
    }

    :host([size="md"]) .drop-down-field__native,
    :host(:not([size])) .drop-down-field__native {
      font: var(--semantics-input-fields-md-text);
    }

    :host([size="md"]) .drop-down-field__picker-icon,
    :host(:not([size])) .drop-down-field__picker-icon {
      width: var(--semantics-controls-md-min-size);
    }

    :host([size="md"]) .drop-down-field__picker-icon svg,
    :host(:not([size])) .drop-down-field__picker-icon svg {
      width: 24px;
      height: 24px;
    }

    :host([size="md"]) .drop-down-field__input-shade,
    :host(:not([size])) .drop-down-field__input-shade {
      height: calc(var(--semantics-controls-md-min-size) - 4px);
    }

    /* Size: SM */
    :host([size="sm"]) .drop-down-field {
      min-height: var(--semantics-controls-sm-min-size);
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    :host([size="sm"]) .drop-down-field__value {
      font-size: var(--primitives-font-size-90);
      font-weight: var(--primitives-font-weight-body-regular);
      line-height: 1em;
    }

    :host([size="sm"]) .drop-down-field__native {
      font-size: var(--primitives-font-size-90);
      font-weight: var(--primitives-font-weight-body-regular);
      line-height: 1em;
    }

    :host([size="sm"]) .drop-down-field__picker-icon {
      width: var(--semantics-controls-sm-min-size);
    }

    :host([size="sm"]) .drop-down-field__picker-icon svg {
      width: 20px;
      height: 20px;
    }

    :host([size="sm"]) .drop-down-field__input-shade {
      height: calc(var(--semantics-controls-sm-min-size) - 4px);
    }

    .drop-down-field__spacer {
      width: var(--primitives-space-12);
      flex-shrink: 0;
    }

    .drop-down-field__input {
      display: flex;
      flex-direction: row;
      flex: 1;
      min-width: 0;
      position: relative;
      align-items: center;
      align-self: stretch;
    }

    .drop-down-field__value {
      display: flex;
      align-items: center;
      flex: 1;
      color: var(--semantics-content-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .drop-down-field__value--placeholder {
      color: var(--semantics-input-fields-placeholder-color);
    }

    .drop-down-field__native {
      /* Reset */
      appearance: none;
      border: none;
      background: transparent;
      margin: 0;
      padding: 0;
      outline: none;
      cursor: pointer;
      box-sizing: border-box;

      /* Position over the component */
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;

      /* Typography */
      color: var(--semantics-content-color);
    }

    .drop-down-field__input-shade {
      position: absolute;
      right: 0;
      top: 2px;
      width: 10px;
      background: linear-gradient(-90deg, var(--primitives-color-neutral-200) 0%, transparent 100%);
      pointer-events: none;
    }

    .drop-down-field__picker-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      color: var(--semantics-content-color);
    }

    /* Focus state */
    .drop-down-field:focus-within {
      box-shadow: 0 0 0 var(--semantics-focus-ring-center-thickness) var(--semantics-focus-ring-center-color);
      outline: var(--semantics-focus-ring-edge-thickness) double var(--semantics-focus-ring-edge-color);
    }

    /* Disabled state */
    :host([disabled]) .drop-down-field {
      opacity: var(--primitives-opacity-disabled);
      cursor: not-allowed;
    }

    :host([disabled]) .drop-down-field__native {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .drop-down-field:focus-within {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }
    }
  `;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  name = '';

  @property({ type: Array })
  options: Option[] = [];

  @state()
  private _displayValue = '';

  @query('.drop-down-field__native')
  private _select!: HTMLSelectElement;

  override connectedCallback() {
    super.connectedCallback();
    this._updateDisplayValue();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value') || changedProperties.has('options')) {
      this._updateDisplayValue();
    }
  }

  private _updateDisplayValue(): void {
    const option = this.options.find(opt => opt.value === this.value);
    this._displayValue = option?.label || this.value;
  }

  private _handleChange(e: Event): void {
    const select = e.target as HTMLSelectElement;
    this.value = select.value;
    this._updateDisplayValue();
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  public focus(): void {
    this._select?.focus();
  }

  public blur(): void {
    this._select?.blur();
  }

  override render() {
    const showPlaceholder = !this.value && this.placeholder;
    const displayText = showPlaceholder ? this.placeholder : (this._displayValue || this.value);

    return html`
      <div class="drop-down-field" part="container">
        <div class="drop-down-field__spacer"></div>
        <div class="drop-down-field__input">
          <span class="drop-down-field__value ${showPlaceholder ? 'drop-down-field__value--placeholder' : ''}">
            ${displayText}
          </span>
          <select
            class="drop-down-field__native"
            part="select"
            .value=${this.value}
            ?disabled=${this.disabled}
            name=${this.name || nothing}
            @change=${this._handleChange}
          >
            ${this.placeholder ? html`<option value="" disabled ?selected=${!this.value}>${this.placeholder}</option>` : nothing}
            ${this.options.map(opt => html`
              <option value=${opt.value} ?selected=${opt.value === this.value}>${opt.label}</option>
            `)}
            <slot></slot>
          </select>
          <div class="drop-down-field__input-shade"></div>
        </div>
        <div class="drop-down-field__picker-icon" part="icon">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z"/>
          </svg>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-drop-down-field': RRDropDownField;
  }
}

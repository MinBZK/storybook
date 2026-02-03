/**
 * RegelRecht Switch Field Component (Lit + TypeScript)
 *
 * A switch toggle with label for form fields.
 *
 * @element rr-switch-field
 * @attr {boolean} checked - Checked state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value for form submission
 * @attr {string} name - Input name for form submission
 *
 * @slot - Default slot for label text
 *
 * @fires change - When checked state changes
 *
 * @csspart container - The field container
 * @csspart switch - The switch element
 * @csspart label - The label element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../switch/rr-switch.ts';

@customElement('rr-switch-field')
export class RRSwitchField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .switch-field {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: var(--primitives-space-8);
      padding: 6px 0;
      cursor: pointer;
    }

    .switch-field__control {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      align-self: stretch;
      flex-shrink: 0;
    }

    /* Fix inline-block baseline alignment for the switch */
    .switch-field__control rr-switch {
      display: block;
      /* Compensate for font rendering differences vs Figma */
      margin-top: -2px;
    }

    .switch-field__label {
      display: flex;
      align-items: stretch;
      align-self: stretch;
      flex: 1;
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-100);
      line-height: 1.25em;
      color: var(--semantics-content-color);
      padding: 4px 0;
    }

    /* Disabled state */
    :host([disabled]) .switch-field {
      cursor: not-allowed;
    }

    :host([disabled]) .switch-field__label {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      :host([disabled]) .switch-field__label {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = 'on';

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
    if (!this.disabled) {
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    return html`
      <div class="switch-field" part="container" @click=${this._handleClick}>
        <div class="switch-field__control">
          <rr-switch
            part="switch"
            size="sm"
            ?checked=${this.checked}
            ?disabled=${this.disabled}
            value=${this.value}
            name=${this.name}
            @change=${this._handleChange}
            @click=${(e: Event) => e.stopPropagation()}
          ></rr-switch>
        </div>
        <span class="switch-field__label" part="label">
          <slot></slot>
        </span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-switch-field': RRSwitchField;
  }
}

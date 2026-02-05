/**
 * RegelRecht Checkbox Field Component (Lit + TypeScript)
 *
 * A checkbox with label for form fields.
 *
 * @element rr-checkbox-field
 * @attr {boolean} checked - Checked state
 * @attr {boolean} indeterminate - Indeterminate state
 * @attr {boolean} disabled - Disabled state
 * @attr {string} value - Value for form submission
 * @attr {string} name - Input name for form submission
 *
 * @slot - Default slot for label text
 *
 * @fires change - When checked state changes
 *
 * @csspart container - The field container
 * @csspart checkbox - The checkbox element
 * @csspart label - The label element
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../checkbox/rr-checkbox.ts';

@customElement('rr-checkbox-field')
export class RRCheckboxField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .checkbox-field {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      gap: var(--primitives-space-8);
      padding: 10px 0;
    }

    .checkbox-field__control {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .checkbox-field__label {
      display: flex;
      align-items: center;
      align-self: stretch;
      flex: 1;
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-100);
      line-height: var(--primitives-line-height-tight);
      color: var(--semantics-content-color);
    }

    /* Disabled state */
    :host([disabled]) .checkbox-field__label {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      :host([disabled]) .checkbox-field__label {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

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

  private _handleLabelClick(e: Event): void {
    // Prevent double-toggle when clicking directly on the checkbox
    if ((e.target as HTMLElement).closest('rr-checkbox')) {
      return;
    }
    if (!this.disabled) {
      this.checked = !this.checked;
      this.indeterminate = false;
      this.dispatchEvent(new CustomEvent('change', {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true
      }));
    }
  }

  override render() {
    return html`
      <label class="checkbox-field" part="container" @click=${this._handleLabelClick}>
        <div class="checkbox-field__control">
          <rr-checkbox
            part="checkbox"
            ?checked=${this.checked}
            ?indeterminate=${this.indeterminate}
            ?disabled=${this.disabled}
            value=${this.value}
            name=${this.name}
            @change=${this._handleChange}
          ></rr-checkbox>
        </div>
        <span class="checkbox-field__label" part="label">
          <slot></slot>
        </span>
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-checkbox-field': RRCheckboxField;
  }
}

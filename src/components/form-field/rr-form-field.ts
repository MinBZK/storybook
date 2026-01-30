/**
 * RegelRecht Form Field Component (Lit + TypeScript)
 *
 * A generic wrapper for form fields with label and optional description.
 *
 * @element rr-form-field
 * @attr {string} label - Field label text
 * @attr {string} description - Optional description text
 * @attr {boolean} required - Shows required indicator
 * @attr {string} error - Error message (shows in red)
 *
 * @slot - Default slot for form control
 *
 * @csspart container - The field container
 * @csspart label - The label element
 * @csspart description - The description element
 * @csspart error - The error element
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('rr-form-field')
export class RRFormField extends LitElement {
  static override styles = css`
    :host {
      display: block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: var(--primitives-space-4);
    }

    .form-field__label {
      display: flex;
      align-items: baseline;
      gap: var(--primitives-space-4);
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-body-m);
      line-height: 1.25em;
      color: var(--primitives-color-text);
    }

    .form-field__required {
      color: var(--semantics-input-fields-is-invalid-icon-color);
    }

    .form-field__description {
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-body-s);
      line-height: 1.25em;
      color: var(--semantics-input-fields-placeholder-color);
    }

    .form-field__control {
      display: block;
    }

    .form-field__error {
      font-weight: var(--primitives-font-weight-body-regular);
      font-size: var(--primitives-font-size-body-s);
      line-height: 1.25em;
      color: var(--semantics-input-fields-is-invalid-icon-color);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .form-field__error,
      .form-field__required {
        forced-color-adjust: none;
      }
    }
  `;

  @property({ type: String })
  label = '';

  @property({ type: String })
  description = '';

  @property({ type: Boolean })
  required = false;

  @property({ type: String })
  error = '';

  override render() {
    return html`
      <div class="form-field" part="container">
        ${this.label
          ? html`
              <label class="form-field__label" part="label">
                ${this.label}
                ${this.required ? html`<span class="form-field__required">*</span>` : nothing}
              </label>
            `
          : nothing}
        ${this.description
          ? html`<span class="form-field__description" part="description">${this.description}</span>`
          : nothing}
        <div class="form-field__control">
          <slot></slot>
        </div>
        ${this.error
          ? html`<span class="form-field__error" part="error">${this.error}</span>`
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-form-field': RRFormField;
  }
}

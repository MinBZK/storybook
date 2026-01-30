/**
 * RegelRecht Input Field Button Component (Lit + TypeScript)
 *
 * A button designed to be used inside input fields (e.g., clear button, submit).
 *
 * @element rr-input-field-button
 * @attr {string} variant - Button variant: 'clear' | 'submit' | 'picker'
 * @attr {boolean} disabled - Disabled state
 * @attr {string} label - Accessible label
 *
 * @slot - Default slot for icon content
 *
 * @fires click - When button is clicked
 *
 * @csspart button - The button element
 */

import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Variant = 'clear' | 'submit' | 'picker';

@customElement('rr-input-field-button')
export class RRInputFieldButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .input-field-button {
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
      width: var(--semantics-controls-s-min-size);
      height: var(--semantics-controls-s-min-size);
      border-radius: var(--semantics-controls-s-corner-radius);

      /* Icon color */
      color: var(--primitives-color-text);

      /* Transition */
      transition: background-color 0.15s ease;
    }

    .input-field-button:hover:not(:disabled) {
      background-color: var(--primitives-color-neutral-200);
    }

    .input-field-button:active:not(:disabled) {
      background-color: var(--primitives-color-neutral-300);
    }

    .input-field-button:focus-visible {
      outline: var(--semantics-focus-ring-thickness) solid var(--semantics-focus-ring-color);
      outline-offset: 2px;
    }

    .input-field-button:disabled {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
    }

    .input-field-button svg {
      width: 20px;
      height: 20px;
    }

    /* Variant: submit - accent colored */
    :host([variant="submit"]) .input-field-button {
      background-color: var(--semantics-buttons-accent-filled-background-color);
      color: var(--semantics-buttons-accent-filled-color);
    }

    :host([variant="submit"]) .input-field-button:hover:not(:disabled) {
      background-color: var(--primitives-color-accent-75);
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .input-field-button:focus-visible {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: Variant = 'clear';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label = '';

  private _handleClick(e: MouseEvent): void {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  private _renderIcon() {
    switch (this.variant) {
      case 'clear':
        return html`
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        `;
      case 'submit':
        return html`
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-8.707l-3-3a1 1 0 0 0-1.414 1.414L10.586 9H7a1 1 0 1 0 0 2h3.586l-1.293 1.293a1 1 0 1 0 1.414 1.414l3-3a1 1 0 0 0 0-1.414z"/>
          </svg>
        `;
      case 'picker':
        return html`
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10 14.17L5.83 10l-1.42 1.41L10 17l5.59-5.59L14.17 10 10 14.17z"/>
          </svg>
        `;
      default:
        return html`<slot></slot>`;
    }
  }

  override render() {
    return html`
      <button
        class="input-field-button"
        part="button"
        type="button"
        ?disabled=${this.disabled}
        aria-label=${this.label || this.variant}
        @click=${this._handleClick}
      >
        ${this._renderIcon()}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-input-field-button': RRInputFieldButton;
  }
}

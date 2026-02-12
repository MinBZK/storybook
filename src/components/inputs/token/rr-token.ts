/**
 * RegelRecht Token Component (Lit + TypeScript)
 *
 * A tag/chip component for displaying selected values or filters.
 *
 * @element rr-token
 * @attr {string} control - Control type: 'none' | 'dismiss' | 'picker' (default: 'none')
 * @attr {boolean} open - Whether picker menu is open (only for picker control)
 * @attr {boolean} disabled - Disabled state
 *
 * @fires dismiss - When dismiss button is clicked
 * @fires toggle - When picker control is clicked (detail: { open: boolean })
 *
 * @slot - Default slot for token text
 *
 * @csspart token - The token container
 * @csspart text - The text content
 * @csspart icon - The control icon (dismiss or picker)
 */

import { LitElement, html, css, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Control = 'none' | 'dismiss' | 'picker';

@customElement('rr-token')
export class RRToken extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .token {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--semantics-controls-sm-min-size);
      padding: 0 6px;
      border-radius: var(--semantics-controls-sm-corner-radius);
      background-color: var(--_bg-color, var(--semantics-buttons-neutral-tinted-background-color));
      box-sizing: border-box;
      cursor: default;
      transition: background-color 0.15s ease;
    }

    /* Open state (for picker) */
    :host([open]) .token {
      --_bg-color: var(--primitives-color-neutral-400);
    }

    /* Hover state for interactive tokens */
    :host([control='dismiss']) .token:hover,
    :host([control='picker']) .token:hover {
      --_bg-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
    }

    .token__text {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 2px;
      font-size: 18px;
      line-height: 1.25;
      color: var(--primitives-color-neutral-900);
    }

    .token__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      flex-shrink: 0;
    }

    .token__icon svg {
      width: 20px;
      height: 20px;
      color: var(--primitives-color-neutral-900);
    }

    /* Dismiss button */
    .token__dismiss {
      appearance: none;
      border: none;
      background: transparent;
      padding: 0;
      margin: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 100%;
      border-radius: 0 var(--semantics-controls-sm-corner-radius)
        var(--semantics-controls-sm-corner-radius) 0;
    }

    .token__dismiss:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    .token__dismiss:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: -2px;
    }

    /* Picker button */
    :host([control='picker']) .token {
      cursor: pointer;
    }

    :host([control='picker']) .token:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .token {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .token {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .token {
        border: 1px solid CanvasText;
      }

      .token__dismiss:focus-visible,
      :host([control='picker']) .token:focus-visible {
        outline: 2px solid CanvasText !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  control: Control = 'none';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleDismiss(e: Event): void {
    e.stopPropagation();
    if (this.disabled) return;

    this.dispatchEvent(
      new CustomEvent('dismiss', {
        bubbles: true,
        composed: true,
      })
    );
  }

  private _handlePickerClick(): void {
    if (this.disabled) return;

    this.open = !this.open;
    this.dispatchEvent(
      new CustomEvent('toggle', {
        detail: { open: this.open },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderDismissIcon() {
    return svg`
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="5" y1="5" x2="15" y2="15"></line>
        <line x1="15" y1="5" x2="5" y2="15"></line>
      </svg>
    `;
  }

  private _renderChevronIcon() {
    return svg`
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="5 8 10 13 15 8"></polyline>
      </svg>
    `;
  }

  override render() {
    const isPicker = this.control === 'picker';

    return html`
      <div
        class="token"
        part="token"
        role=${isPicker ? 'button' : 'status'}
        tabindex=${isPicker && !this.disabled ? 0 : -1}
        aria-expanded=${isPicker ? this.open : nothing}
        @click=${isPicker ? this._handlePickerClick : nothing}
        @keydown=${isPicker
          ? (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this._handlePickerClick();
              }
            }
          : nothing}
      >
        <span class="token__text" part="text">
          <slot></slot>
        </span>

        ${this.control === 'dismiss'
          ? html`
              <button
                class="token__dismiss"
                part="icon"
                type="button"
                @click=${this._handleDismiss}
                aria-label="Verwijder"
                ?disabled=${this.disabled}
              >
                ${this._renderDismissIcon()}
              </button>
            `
          : nothing}
        ${this.control === 'picker'
          ? html`
              <span class="token__icon" part="icon"> ${this._renderChevronIcon()} </span>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-token': RRToken;
  }
}

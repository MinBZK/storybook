/**
 * RegelRecht Stepper Component (Lit + TypeScript)
 *
 * A numeric stepper control with increment and decrement buttons.
 *
 * @element rr-stepper
 * @attr {number} value - Current value
 * @attr {number} min - Minimum value (default: 0)
 * @attr {number} max - Maximum value (default: 100)
 * @attr {number} step - Step increment (default: 1)
 * @attr {boolean} disabled - Disabled state
 * @attr {string} size - Stepper size: 's' | 'm' (default: 'm')
 *
 * @fires change - When value changes (detail: { value: number })
 *
 * @csspart stepper - The stepper container
 * @csspart button - The increment/decrement buttons
 * @csspart divider - The divider between buttons
 */

import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 's' | 'm';

@customElement('rr-stepper')
export class RRStepper extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .stepper {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: var(--semantics-buttons-neutral-tinted-background-color);
      box-sizing: border-box;
    }

    /* Size: S - Figma: ~64x32px (two 32px buttons) */
    :host([size='s']) .stepper {
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    :host([size='s']) .stepper__button {
      min-width: var(--semantics-controls-sm-min-size);
      min-height: var(--semantics-controls-sm-min-size);
      padding: 0 6px;
    }

    :host([size='s']) .stepper__divider {
      height: 20px;
    }

    :host([size='s']) .stepper__icon {
      width: 20px;
      height: 20px;
    }

    /* Size: M (default) - Figma: ~88x44px (two 44px buttons) */
    :host([size='m']) .stepper,
    :host(:not([size])) .stepper {
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    :host([size='m']) .stepper__button,
    :host(:not([size])) .stepper__button {
      min-width: var(--semantics-controls-md-min-size);
      min-height: var(--semantics-controls-md-min-size);
      padding: 0 8px;
    }

    :host([size='m']) .stepper__divider,
    :host(:not([size])) .stepper__divider {
      height: 28px;
    }

    :host([size='m']) .stepper__icon,
    :host(:not([size])) .stepper__icon {
      width: 24px;
      height: 24px;
    }

    .stepper__button {
      appearance: none;
      border: none;
      background: transparent;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--semantics-buttons-neutral-tinted-content-color);
      transition: background-color 0.15s ease;
    }

    .stepper__button:first-child {
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
    }

    .stepper__button:last-child {
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
    }

    .stepper__button:hover:not(:disabled) {
      background-color: var(--semantics-buttons-neutral-tinted-is-hovered-background-color);
    }

    .stepper__button:active:not(:disabled) {
      background-color: var(--semantics-buttons-neutral-tinted-is-active-background-color);
    }

    .stepper__button:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: -2px;
      z-index: 1;
    }

    .stepper__button:disabled {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      cursor: not-allowed;
    }

    .stepper__divider {
      width: 1px;
      background-color: var(--primitives-color-neutral-400);
      flex-shrink: 0;
    }

    .stepper__icon {
      display: block;
    }

    /* Disabled state for entire component */
    :host([disabled]) .stepper {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
    }

    :host([disabled]) .stepper__button {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .stepper__button {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .stepper {
        border: 1px solid CanvasText;
      }

      .stepper__button:focus-visible {
        outline: 2px solid CanvasText !important;
      }

      .stepper__divider {
        background-color: CanvasText;
      }
    }
  `;

  @property({ type: Number })
  value = 0;

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  private _decrement(): void {
    if (this.disabled) return;

    const newValue = Math.max(this.min, this.value - this.step);
    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  private _increment(): void {
    if (this.disabled) return;

    const newValue = Math.min(this.max, this.value + this.step);
    if (newValue !== this.value) {
      this.value = newValue;
      this._dispatchChange();
    }
  }

  private _dispatchChange(): void {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _renderMinusIcon() {
    return svg`
      <svg class="stepper__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `;
  }

  private _renderPlusIcon() {
    return svg`
      <svg class="stepper__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    `;
  }

  override render() {
    const atMin = this.value <= this.min;
    const atMax = this.value >= this.max;

    return html`
      <div class="stepper" part="stepper" role="group" aria-label="Stepper control">
        <button
          class="stepper__button"
          part="button"
          type="button"
          @click=${this._decrement}
          ?disabled=${this.disabled || atMin}
          aria-label="Decrease value"
        >
          ${this._renderMinusIcon()}
        </button>
        <div class="stepper__divider" part="divider" aria-hidden="true"></div>
        <button
          class="stepper__button"
          part="button"
          type="button"
          @click=${this._increment}
          ?disabled=${this.disabled || atMax}
          aria-label="Increase value"
        >
          ${this._renderPlusIcon()}
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-stepper': RRStepper;
  }
}

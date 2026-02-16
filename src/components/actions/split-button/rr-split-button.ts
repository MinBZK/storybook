/**
 * RegelRecht Split Button Component (Lit + TypeScript)
 *
 * A split button combines a primary action button with a dropdown trigger.
 * The main button performs the default action, while the dropdown icon opens a menu.
 *
 * @element rr-split-button
 * @attr {string} size - Button size: 'sm' | 'md' (default: 'md')
 * @attr {boolean} disabled - Disabled state
 *
 * @slot - Default slot for button label text
 * @slot dropdown-icon - Slot for custom dropdown icon (defaults to chevron-down)
 *
 * @fires click - Fired when the main button is clicked
 * @fires dropdown-click - Fired when the dropdown trigger is clicked
 *
 * @csspart container - The split button container
 * @csspart button - The main action button
 * @csspart divider - The divider between button and dropdown
 * @csspart dropdown - The dropdown trigger button
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'sm' | 'md';

@customElement('rr-split-button')
export class RRSplitButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-flex;
      font-family: var(--rr-font-family-body);
    }

    :host([hidden]) {
      display: none;
    }

    .split-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background-color: var(--semantics-dividers-color);
    }

    /* Size: M (default) */
    :host([size="md"]) .split-button,
    :host(:not([size])) .split-button {
      border-radius: var(--semantics-controls-md-corner-radius);
    }

    :host([size="md"]) .split-button__button,
    :host(:not([size])) .split-button__button {
      min-height: var(--semantics-controls-md-min-size);
      padding: 10px 12px;
      gap: 4px;
      font: var(--semantics-buttons-md-font);
      border-radius: var(--semantics-controls-md-corner-radius) 0 0 var(--semantics-controls-md-corner-radius);
    }

    :host([size="md"]) .split-button__divider,
    :host(:not([size])) .split-button__divider {
      height: 28px;
    }

    :host([size="md"]) .split-button__dropdown,
    :host(:not([size])) .split-button__dropdown {
      padding: 0 8px;
      min-width: var(--semantics-controls-md-min-size);
      min-height: var(--semantics-controls-md-min-size);
      border-radius: 0 var(--semantics-controls-md-corner-radius) var(--semantics-controls-md-corner-radius) 0;
    }

    :host([size="md"]) .split-button__dropdown svg,
    :host(:not([size])) .split-button__dropdown svg {
      width: 24px;
      height: 24px;
    }

    /* Size: S */
    :host([size="sm"]) .split-button {
      border-radius: var(--semantics-controls-sm-corner-radius);
    }

    :host([size="sm"]) .split-button__button {
      min-height: var(--semantics-controls-sm-min-size);
      padding: 6px 8px;
      gap: 2px;
      font: var(--semantics-buttons-sm-font);
      border-radius: var(--semantics-controls-sm-corner-radius) 0 0 var(--semantics-controls-sm-corner-radius);
    }

    :host([size="sm"]) .split-button__divider {
      height: 20px;
    }

    :host([size="sm"]) .split-button__dropdown {
      padding: 0 6px;
      min-width: var(--semantics-controls-sm-min-size);
      min-height: var(--semantics-controls-sm-min-size);
      border-radius: 0 var(--semantics-controls-sm-corner-radius) var(--semantics-controls-sm-corner-radius) 0;
    }

    :host([size="sm"]) .split-button__dropdown svg {
      width: 20px;
      height: 20px;
    }

    /* Common button styles */
    .split-button__button,
    .split-button__dropdown {
      appearance: none;
      border: none;
      margin: 0;
      background: transparent;
      font: inherit;
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      color: var(--semantics-content-color);
      transition: background-color 0.15s ease;
    }

    .split-button__button:hover,
    .split-button__dropdown:hover {
      background-color: var(--semantics-buttons-neutral-transparent-is-hovered-background-color);
    }

    .split-button__button:active,
    .split-button__dropdown:active {
      background-color: var(--semantics-buttons-neutral-transparent-is-active-background-color);
    }

    /* Focus state */
    .split-button__button:focus-visible,
    .split-button__dropdown:focus-visible {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: -2px;
      z-index: 1;
    }

    /* Divider */
    .split-button__divider {
      width: 1px;
      background-color: var(--semantics-buttons-neutral-tinted-divider-color);
      flex-shrink: 0;
    }

    /* Dropdown icon */
    .split-button__dropdown svg {
      fill: none;
      stroke: currentColor;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    /* Disabled state */
    :host([disabled]) .split-button {
      opacity: calc(var(--primitives-opacity-disabled) / 100);
    }

    :host([disabled]) .split-button__button,
    :host([disabled]) .split-button__dropdown {
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .split-button__button,
      .split-button__dropdown {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .split-button__button:focus-visible,
      .split-button__dropdown:focus-visible {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }

      .split-button__divider {
        background-color: CanvasText;
      }
    }
  `;

  @property({ type: String, reflect: true })
  size: Size = 'md';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  private _handleButtonClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    this.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
  }

  private _handleDropdownClick(e: Event) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('dropdown-click', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <div class="split-button" part="container">
        <button
          class="split-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled}
          @click=${this._handleButtonClick}
        >
          <slot></slot>
        </button>
        <div class="split-button__divider" part="divider" role="separator" aria-orientation="vertical"></div>
        <button
          class="split-button__dropdown"
          part="dropdown"
          type="button"
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled}
          aria-haspopup="menu"
          aria-label="More options"
          @click=${this._handleDropdownClick}
        >
          <slot name="dropdown-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7l8 9 8-9"/>
            </svg>
          </slot>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-split-button': RRSplitButton;
  }
}

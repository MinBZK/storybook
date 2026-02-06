/**
 * RegelRecht Switch Component (Lit + TypeScript)
 *
 * @element rr-switch
 * @attr {boolean} checked - Whether the switch is on/off
 * @attr {boolean} disabled - Disabled state
 * @attr {string} size - Switch size: 's' | 'm' (default: 'm')
 *
 * @fires change - When the switch state changes
 *
 * @csspart switch - The switch container element
 * @csspart thumb - The draggable thumb element
 *
 * @cssprop --rr-switch-background-color - Override background color
 * @cssprop --rr-switch-thumb-color - Override thumb color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 's' | 'm';

@customElement('rr-switch')
export class RRSwitch extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
      outline: none;
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
    }

    :host([hidden]) {
      display: none;
    }

    :host([disabled]) {
      cursor: not-allowed;
      opacity: calc(var(--primitives-opacity-disabled) / 100);
      pointer-events: none;
    }

    .switch {
      position: relative;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      background-color: var(
        --rr-switch-background-color,
        var(--_bg-color, var(--components-switch-background-color))
      );
      border: var(--components-switch-border-thickness) solid
        var(--_border-color, var(--components-switch-border-color));
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
      cursor: inherit;
    }

    .switch__thumb {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      background-color: var(
        --rr-switch-thumb-color,
        var(--_thumb-bg, var(--components-switch-thumb-background-color))
      );
      border: var(--components-switch-thumb-border-thickness) solid
        var(--components-switch-thumb-border-color);
      border-radius: 50%;
      transition:
        transform 0.2s ease,
        background-color 0.2s ease,
        border-color 0.2s ease;
      will-change: transform;
    }

    /* Checkmark icon */
    .switch__check {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.15s ease;
      pointer-events: none;
    }

    .switch__check svg {
      fill: var(--components-switch-is-selected-background-color);
    }

    :host([checked]) .switch__check {
      opacity: 1;
    }

    /* Checkmark sizing per size variant */
    :host([size='s']) .switch__check {
      width: 24px;
      height: 24px;
      right: -2px;
      top: -2px;
    }

    :host([size='s']) .switch__check svg {
      width: 24px;
      height: 24px;
    }

    :host([size='m']) .switch__check,
    :host(:not([size])) .switch__check {
      width: 32px;
      height: 32px;
      right: -2px;
      top: -2px;
    }

    :host([size='m']) .switch__check svg,
    :host(:not([size])) .switch__check svg {
      width: 32px;
      height: 32px;
    }

    /* Size: S - Figma specs: 44x24px */
    :host([size='s']) .switch {
      width: 44px;
      height: 24px;
      border-radius: 12px;
      padding: 2px;
    }

    :host([size='s']) .switch__thumb {
      /* Off state: 16x16px per Figma */
      width: 16px;
      height: 16px;
    }

    :host([size='s'][checked]) .switch__thumb {
      /* Checked state: thumb grows to 20x20px per Figma specs */
      width: 20px;
      height: 20px;
      /* Figma: x=22, y=2 → adjusted for size growth */
      transform: translateX(18px);
    }

    /* Size: M (default) - Figma specs: 56x32px */
    :host([size='m']) .switch,
    :host(:not([size])) .switch {
      width: calc(var(--semantics-controls-sm-min-size) * 1.75);
      height: var(--semantics-controls-sm-min-size);
      border-radius: calc(var(--semantics-controls-sm-min-size) / 2);
      padding: 2px;
    }

    :host([size='m']) .switch__thumb,
    :host(:not([size])) .switch__thumb {
      /* Off state: 24x24px (32 - 8) */
      width: calc(var(--semantics-controls-sm-min-size) - 8px);
      height: calc(var(--semantics-controls-sm-min-size) - 8px);
    }

    :host([size='m'][checked]) .switch__thumb,
    :host(:not([size])[checked]) .switch__thumb {
      /* Checked state: thumb grows to 28x28px (32 - 4) per Figma specs */
      width: calc(var(--semantics-controls-sm-min-size) - 4px);
      height: calc(var(--semantics-controls-sm-min-size) - 4px);
      /* Figma: x=26, y=2 → translateX = 26 - 4 (initial) = 22px, but account for size change */
      transform: translateX(
        calc((var(--semantics-controls-sm-min-size) * 1.75) - var(--semantics-controls-sm-min-size) - 2px)
      );
    }

    /* Checked state */
    :host([checked]) .switch {
      --_bg-color: var(--components-switch-is-selected-background-color);
      --_border-color: var(--components-switch-is-selected-background-color);
    }

    :host([checked]) .switch__thumb {
      --_thumb-bg: var(--components-switch-is-selected-thumb-background-color);
      /* Figma: checked thumb has no border */
      border: none;
    }

    /* Focus state */
    :host(:focus-visible) .switch {
      outline: var(--semantics-focus-rings-center-thickness) solid var(--semantics-focus-rings-center-color);
      outline-offset: 2px;
    }

    /* Hover state (only when not disabled) */
    :host(:hover:not([disabled])) .switch {
      filter: brightness(0.95);
    }

    /* Active state (only when not disabled) */
    :host(:active:not([disabled])) .switch {
      filter: brightness(0.9);
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .switch,
      .switch__thumb {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .switch {
        border: 2px solid CanvasText !important;
      }

      :host([checked]) .switch {
        background-color: Highlight !important;
      }

      :host(:focus-visible) .switch {
        outline: 2px solid CanvasText !important;
        outline-offset: 2px !important;
      }

      :host([disabled]) {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  size: Size = 'm';

  override connectedCallback(): void {
    super.connectedCallback();

    // Set ARIA role
    this.setAttribute('role', 'switch');
    this._updateAriaState();

    // Make focusable
    if (!this.hasAttribute('tabindex') && !this.disabled) {
      this.setAttribute('tabindex', '0');
    }

    this.addEventListener('click', this._handleClick);
    this.addEventListener('keydown', this._handleKeyDown);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
    this.removeEventListener('keydown', this._handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('checked')) {
      this._updateAriaState();
    }

    if (changedProperties.has('disabled')) {
      this.setAttribute('aria-disabled', String(this.disabled));
      if (this.disabled) {
        this.removeAttribute('tabindex');
      } else {
        this.setAttribute('tabindex', '0');
      }
    }
  }

  private _updateAriaState(): void {
    this.setAttribute('aria-checked', String(this.checked));
  }

  private _handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this._toggle();
  };

  private _handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) {
      return;
    }

    // Space or Enter toggles the switch
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this._toggle();
    }
  };

  private _toggle(): void {
    this.checked = !this.checked;

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this.checked },
        bubbles: true,
        composed: true,
      })
    );
  }

  override render() {
    return html`
      <div class="switch" part="switch">
        <div class="switch__thumb" part="thumb"></div>
        <div class="switch__check" part="check">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6642 8.70718L9.95711 16.4143L6.25 12.7072L7.66421 11.293L9.95711 13.5859L16.25 7.29297L17.6642 8.70718Z"/>
          </svg>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-switch': RRSwitch;
  }
}

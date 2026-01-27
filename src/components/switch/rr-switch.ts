/**
 * RegelRecht Switch Component (Lit + TypeScript)
 *
 * @element rr-switch
 * @attr {boolean} checked - Whether the switch is on/off
 * @attr {boolean} disabled - Disabled state
 * @attr {string} size - Switch size: 'm' (only one size in Figma design)
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

type Size = 'm';

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
      opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
      pointer-events: none;
    }

    .switch {
      position: relative;
      display: inline-flex;
      align-items: center;
      box-sizing: border-box;
      background-color: var(
        --rr-switch-background-color,
        var(--_bg-color, var(--components-switch-background-color, #ffffff))
      );
      border: var(--components-switch-border-thickness, 2px) solid
        var(--_border-color, var(--components-switch-border-color, #475569));
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
        var(--_thumb-bg, var(--components-switch-thumb-background-color, #ffffff))
      );
      border: var(--components-switch-thumb-border-thickness, 2px) solid
        var(--_thumb-border, var(--components-switch-thumb-border-color, #475569));
      border-radius: 50%;
      transition:
        transform 0.2s ease,
        background-color 0.2s ease,
        border-color 0.2s ease;
      will-change: transform;
    }

    /* Size: M (default) - Figma specs: 56x32px */
    :host([size='m']) .switch,
    :host(:not([size])) .switch {
      width: calc(var(--semantics-controls-s-min-size, 32px) * 1.75);
      height: var(--semantics-controls-s-min-size, 32px);
      border-radius: calc(var(--semantics-controls-s-min-size, 32px) / 2);
      padding: 2px;
    }

    :host([size='m']) .switch__thumb,
    :host(:not([size])) .switch__thumb {
      width: calc(var(--semantics-controls-s-min-size, 32px) - 8px);
      height: calc(var(--semantics-controls-s-min-size, 32px) - 8px);
    }

    :host([size='m'][checked]) .switch__thumb,
    :host(:not([size])[checked]) .switch__thumb {
      transform: translateX(
        calc((var(--semantics-controls-s-min-size, 32px) * 1.75) - var(--semantics-controls-s-min-size, 32px))
      );
    }

    /* Checked state */
    :host([checked]) .switch {
      --_bg-color: var(--components-switch-is-selected-background-color, #154273);
      --_border-color: var(--components-switch-is-selected-background-color, #154273);
    }

    :host([checked]) .switch__thumb {
      --_thumb-bg: var(--components-switch-is-selected-thumb-background-color, #ffffff);
      --_thumb-border: var(--components-switch-is-selected-background-color, #154273);
    }

    /* Focus state */
    :host(:focus-visible) .switch {
      outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
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
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-switch': RRSwitch;
  }
}

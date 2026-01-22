/**
 * RegelRecht Icon Button Component (Lit + TypeScript)
 *
 * @element rr-icon-button
 * @attr {string} variant - Button variant: 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent'
 * @attr {string} size - Button size: 'xs' | 's' | 'm' (default: 'm')
 * @attr {boolean} disabled - Disabled state
 * @attr {string} type - Button type for form submission: 'button' | 'submit' | 'reset'
 * @attr {string} label - Accessible label for the icon button (required for accessibility)
 *
 * @slot - Default slot for icon content
 *
 * @fires click - When button is clicked (not fired when disabled)
 *
 * @csspart button - The native button element
 *
 * @cssprop --rr-icon-button-background-color - Override background color
 * @cssprop --rr-icon-button-color - Override icon color
 * @cssprop --rr-icon-button-border-color - Override border color
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

type Size = 'xs' | 's' | 'm';
type Variant = 'accent-filled' | 'accent-outlined' | 'accent-tinted' | 'neutral-tinted' | 'accent-transparent';
type ButtonType = 'button' | 'submit' | 'reset';

@customElement('rr-icon-button')
export class RRIconButton extends LitElement {
  static override styles = css`
    :host {
      display: inline-block;
      font-family: var(--rr-font-family-sans, 'RijksSansVF', system-ui, sans-serif);
    }

    :host([hidden]) {
      display: none;
    }

    .button {
      /* Reset */
      appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      background: none;
      font: inherit;
      cursor: pointer;

      /* Layout - Square aspect ratio */
      display: inline-flex;
      align-items: center;
      justify-content: center;

      /* Typography */
      font: var(--components-icon-button-font, 550 14px/1.125 RijksSansVF, system-ui);

      /* Animation */
      transition:
        background-color 0.15s ease,
        color 0.15s ease,
        border-color 0.15s ease,
        transform 0.1s ease;

      /* Allow custom overrides */
      background-color: var(--rr-icon-button-background-color, var(--_bg-color));
      color: var(--rr-icon-button-color, var(--_text-color));
      border: var(--_border-width, 0) solid var(--rr-icon-button-border-color, var(--_border-color, transparent));
    }

    .button:active:not(:disabled) {
      transform: scale(0.98);
    }

    /* Size: XS - Square 24x24, Figma: 4px border-radius */
    :host([size='xs']) .button {
      width: var(--semantics-controls-xs-min-size, 24px);
      height: var(--semantics-controls-xs-min-size, 24px);
      min-width: var(--semantics-controls-xs-min-size, 24px);
      min-height: var(--semantics-controls-xs-min-size, 24px);
      border-radius: var(--components-icon-button-xs-corner-radius, 4px);
    }

    /* Size: S - Square 32x32, Figma: 6px border-radius */
    :host([size='s']) .button {
      width: var(--semantics-controls-s-min-size, 32px);
      height: var(--semantics-controls-s-min-size, 32px);
      min-width: var(--semantics-controls-s-min-size, 32px);
      min-height: var(--semantics-controls-s-min-size, 32px);
      border-radius: var(--components-icon-button-s-corner-radius, 6px);
    }

    /* Size: M - Square 44x44 (default), Figma: 8px border-radius */
    :host([size='m']) .button,
    :host(:not([size])) .button {
      width: var(--semantics-controls-m-min-size, 44px);
      height: var(--semantics-controls-m-min-size, 44px);
      min-width: var(--semantics-controls-m-min-size, 44px);
      min-height: var(--semantics-controls-m-min-size, 44px);
      border-radius: var(--components-icon-button-m-corner-radius, 8px);
    }

    /* Variant: accent-filled (default) */
    :host([variant='accent-filled']) .button,
    :host(:not([variant])) .button {
      --_bg-color: var(--semantics-buttons-accent-filled-background-color, #154273);
      --_text-color: var(--semantics-buttons-accent-filled-color, #ffffff);
    }

    :host([variant='accent-filled']) .button:hover:not(:disabled),
    :host(:not([variant])) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-75, #4f7196);
    }

    /* Variant: accent-outlined */
    :host([variant='accent-outlined']) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-accent-outlined-color, #154273);
      --_border-color: var(--semantics-buttons-accent-outlined-border-color, #154273);
      --_border-width: var(--semantics-buttons-accent-outlined-border-thickness, 2px);
    }

    :host([variant='accent-outlined']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-15, #dce3ea);
    }

    /* Variant: accent-tinted */
    :host([variant='accent-tinted']) .button {
      --_bg-color: var(--semantics-buttons-accent-tinted-background-color, #dce3ea);
      --_text-color: var(--semantics-buttons-accent-tinted-color, #154273);
    }

    :host([variant='accent-tinted']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-30, #b9c7d5);
    }

    /* Variant: neutral-tinted */
    :host([variant='neutral-tinted']) .button {
      --_bg-color: var(--semantics-buttons-neutral-tinted-background-color, #e2e8f0);
      --_text-color: var(--semantics-buttons-neutral-tinted-color, #0f172a);
    }

    :host([variant='neutral-tinted']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-neutral-300, #cbd5e1);
    }

    /* Variant: accent-transparent */
    :host([variant='accent-transparent']) .button {
      --_bg-color: transparent;
      --_text-color: var(--semantics-buttons-accent-transparent-color, #154273);
    }

    :host([variant='accent-transparent']) .button:hover:not(:disabled) {
      --_bg-color: var(--primitives-color-accent-15, #dce3ea);
    }

    /* Focus state */
    .button:focus-visible {
      outline: var(--semantics-focus-ring-thickness, 2px) solid var(--semantics-focus-ring-color, #0f172a);
      outline-offset: 2px;
    }

    /* Disabled state */
    :host([disabled]) .button {
      opacity: calc(var(--primitives-opacity-disabled, 38) / 100);
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Icon sizing - size-specific dimensions */
    ::slotted(*) {
      width: var(--_icon-size);
      height: var(--_icon-size);
      flex-shrink: 0;
      display: block;
    }

    /* XS: 24px button -> 12px icon (~50%) */
    :host([size='xs']) {
      --_icon-size: 12px;
    }

    /* S: 32px button -> 16px icon (~50%) */
    :host([size='s']) {
      --_icon-size: 16px;
    }

    /* M: 44px button -> 20px icon (~45%) */
    :host([size='m']),
    :host(:not([size])) {
      --_icon-size: 20px;
    }

    /* Accessibility: Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .button {
        transition: none;
      }
    }

    /* Accessibility: High Contrast Mode */
    @media (forced-colors: active) {
      .button {
        border: 2px solid CanvasText !important;
      }

      :host([disabled]) .button {
        opacity: 0.5 !important;
      }
    }
  `;

  @property({ type: String, reflect: true })
  variant: Variant = 'accent-filled';

  @property({ type: String, reflect: true })
  size: Size = 'm';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  type: ButtonType = 'button';

  @property({ type: String })
  label = '';

  private _handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('click', this._handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleClick);
  }

  override render() {
    return html`
      <button
        class="button"
        part="button"
        type=${this.type}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled}
        aria-label=${this.label}
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'rr-icon-button': RRIconButton;
  }
}
